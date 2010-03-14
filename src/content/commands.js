/* -*- mode: JavaScript; c-basic-offset: 4; tab-width: 4; indent-tabs-mode: nil -*- */
/* ex: set tabstop=4 expandtab: */
/*
 * Copyright (c) 2009 Panagiotis Astithas
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

var commands;
if (!commands) commands = {};

const Cc = Components.classes;
const Ci = Components.interfaces;

commands.prefs = {};

commands.onLoad = function () {
    // Register to receive notifications of preference changes
    this.prefBranch = Cc["@mozilla.org/preferences-service;1"]
        .getService(Ci.nsIPrefService).getBranch("extensions.despin.");
    this.prefBranch.QueryInterface(Ci.nsIPrefBranch2);
    this.prefBranch.addObserver("", this, false);
    // Read the application preferences.
    commands.prefs.saveOnClose = this.prefBranch.getBoolPref("saveOnClose");
    commands.prefs.autoindent = this.prefBranch.getBoolPref("autoindent") ? 'on' : 'off';
    commands.prefs.codecomplete = this.prefBranch.getBoolPref("codecomplete") ? 'on' : 'off';
    commands.prefs.highlightline = this.prefBranch.getBoolPref("highlightline") ? 'on' : 'off';
    commands.prefs.smartmove = this.prefBranch.getBoolPref("smartmove") ? 'on' : 'off';
    commands.prefs.strictlines = this.prefBranch.getBoolPref("strictlines") ? 'on' : 'off';
    commands.prefs.syntaxcheck = this.prefBranch.getBoolPref("syntaxcheck") ? 'on' : 'off';
    commands.prefs.tabsize = this.prefBranch.getIntPref("tabsize");
    commands.prefs.tabmode = this.prefBranch.getBoolPref("tabmode") ? 'spaces' : 'tabs';
    commands.prefs.tabshowspace = this.prefBranch.getBoolPref("tabshowspace") ? 'on' : 'off';
    commands.prefs.tabarrow = this.prefBranch.getBoolPref("tabarrow") ? 'on' : 'off';
    commands.prefs.theme = this.prefBranch.getCharPref("theme");
    commands.prefs.trimonsave = this.prefBranch.getBoolPref("trimonsave") ? 'on' : 'off';

    $("#open").click(function(event) {
        commands.open();
    });
    $("#save").click(function(event) {
        commands.save();
    });
    $("#saveas").click(function(event) {
        commands.saveAs();
    });
    $("#print").click(function(event) {
        commands.print();
    });
    $("#scratch").click(function(event) {
        commands.openScratchpad();
    });
    $("#options").click(function(event) {
        commands.showPreferences();
    });
    commands.resize();
    var filename = decodeURI(window.location.hash.slice(1));
    if (filename)
        commands.load(filename);
    else
        commands.openScratchpad();
    window.addEventListener("resize", commands.resize, false);
    window.addEventListener("unload", commands.onUnload, false);
    if (this.saveOnClose)
        this.setAutoSave();
}

commands.onUnload = function () {
    commands.prefBranch.removeObserver("", this);
}

commands.observe = function (subject, topic, data) {
    if (topic != "nsPref:changed")
        return;

    switch(data) {
    case "saveOnClose":
        this.saveOnClose = this.prefBranch.getBoolPref("saveOnClose");
        if (this.saveOnClose)
            this.setAutoSave();
        else
            this.removeAutoSave();
        break;
    case "autoindent":
        this.prefs.autoindent = this.prefBranch.getBoolPref("autoindent") ? 'on' : 'off';
        break;
    case "codecomplete":
        this.prefs.codecomplete = this.prefBranch.getBoolPref("codecomplete") ? 'on' : 'off';
        break;
    case "highlightline":
        this.prefs.highlightline = this.prefBranch.getBoolPref("highlightline") ? 'on' : 'off';
        break;
    case "smartmove":
        this.prefs.smartmove = this.prefBranch.getBoolPref("smartmove") ? 'on' : 'off';
        break;
    case "strictlines":
        this.prefs.strictlines = this.prefBranch.getBoolPref("strictlines") ? 'on' : 'off';
        break;
    case "syntaxcheck":
        this.prefs.syntaxcheck = this.prefBranch.getBoolPref("syntaxcheck") ? 'on' : 'off';
        break;
    case "tabmode":
        this.prefs.tabmode = this.prefBranch.getBoolPref("tabmode") ? 'spaces' : 'tabs';
        break;
    case "tabsize":
        this.prefs.tabsize = this.prefBranch.getIntPref("tabsize");
        break;
    case "tabshowspace":
        this.prefs.autoindent = this.prefBranch.getBoolPref("tabshowspace") ? 'on' : 'off';
        break;
    case "tabarrow":
        this.prefs.tabarrow = this.prefBranch.getBoolPref("tabarrow") ? 'on' : 'off';
        break;
    case "trimonsave":
        this.prefs.trimonsave = this.prefBranch.getBoolPref("trimonsave") ? 'on' : 'off';
        break;
    case "theme":
        this.prefs.theme = this.prefBranch.getCharPref("theme");
        break;
    }
}

commands.open = function () {
    var nsIFilePicker = Ci.nsIFilePicker;
    var picker = Cc["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    picker.init(window, "Select file", nsIFilePicker.modeOpen);
    var result = picker.show();

    if (result == nsIFilePicker.returnOK)
        commands.load(picker.file.path);

    return result == nsIFilePicker.returnOK;
}

commands.save = function () {
    commands.editor.save();
}

commands.saveAs = function () {
    var nsIFilePicker = Ci.nsIFilePicker;
    var picker = Cc["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    picker.init(window, "Select file", nsIFilePicker.modeSave);
    var result = picker.show();

    if (result == nsIFilePicker.returnOK || result == nsIFilePicker.returnReplace) {
        commands.editor.saveAs(picker.file.path);
        commands.updateTitle(picker.file.path);
    }
    return result == nsIFilePicker.returnOK;
}

commands.print = function () {
    $("#printable-contents").html("<pre>" + commands.editor.bespin.value + "</pre>");
    window.print();
}

commands.openScratchpad = function () {
    var file = DirIO.get('ProfD');
    file.append("despin-scratchpad");
    if (!file.exists())
      FileIO.create(file);
    commands.load(file.path);
}

commands.showPreferences = function () {
    window.openDialog("chrome://despin/content/options.xul", "preferences",
        "chrome,resizable,centerscreen,modal,dialog");
}

commands.load = function (path) {
    // Save the current file before opening the new one.
    if (commands.saveOnClose && commands.editor)
        commands.editor.save();
    var editor = new Editor(path);
    // Store the reference to the editor.
    commands.editor = editor;
    
    commands.updateTitle(path);
    editor.initUI('editor', window, commands.prefs);
}

// Helper method to update the document title with the specified file path.
commands.updateTitle = function (path) {
    document.title = commands.getFilename(path) + " (" + path + ")";
}

// Helper method to extract the actual filename from the specified full path.
commands.getFilename = function (path) {
    var separator;
    if (window.navigator && window.navigator.oscpu.indexOf("Windows") != -1)
        separator = path.lastIndexOf('\\');
    else
        separator = path.lastIndexOf('/');
    return (separator === -1) ? path : path.substring(separator + 1, path.length);
}

commands.resize = function () {
    // Resize the editor to fill the window.
    $("#editor").height($(document).height() - $("#toolbar").outerHeight(true));
}

commands.setAutoSave = function () {
    window.addEventListener("blur", this.onBlur, false);
    window.addEventListener("unload", this.onBlur, false);
}

commands.removeAutoSave = function () {
    window.removeEventListener("blur", this.onBlur, false);
    window.removeEventListener("unload", this.onBlur, false);
}

commands.onBlur = function () {
    commands.editor.save();
}
