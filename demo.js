/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla Skywriter.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *      Kevin Dangoor (kdangoor@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


define(function(require, exports, module) {

exports.launch = function(env) {

    var event = require("pilot/event");
    var Editor = require("ace/editor").Editor;
    var Renderer = require("ace/virtual_renderer").VirtualRenderer;
    var theme = require("ace/theme/textmate");
    var EditSession = require("ace/edit_session").EditSession;

    var JavaScriptMode = require("ace/mode/javascript").Mode;
    var CssMode = require("ace/mode/css").Mode;
    var HtmlMode = require("ace/mode/html").Mode;
    var XmlMode = require("ace/mode/xml").Mode;
    var PythonMode = require("ace/mode/python").Mode;
    var PhpMode = require("ace/mode/php").Mode;
    var JavaMode = require("ace/mode/java").Mode;
    var RubyMode = require("ace/mode/ruby").Mode;
    var CCPPMode = require("ace/mode/c_cpp").Mode;
    var CoffeeMode = require("ace/mode/coffee").Mode;
    var PerlMode = require("ace/mode/perl").Mode;
    var TextMode = require("ace/mode/text").Mode;
    var UndoManager = require("ace/undomanager").UndoManager;

    var vim = require("ace/keyboard/keybinding/vim").Vim;
    var emacs = require("ace/keyboard/keybinding/emacs").Emacs;
    var HashHandler = require("ace/keyboard/hash_handler").HashHandler;

    var keybindings = {
      // Null = use "default" keymapping
      ace: null,
      vim: vim,
      emacs: emacs
    }

    var docs = {};

    docs.scratch = new EditSession('');
    docs.scratch.setMode(new TextMode());
    docs.scratch.setUndoManager(new UndoManager());

    var container = document.getElementById("editor");
    env.editor = new Editor(new Renderer(container, theme));

    var modes = {
        text: new TextMode(),
        xml: new XmlMode(),
        html: new HtmlMode(),
        css: new CssMode(),
        javascript: new JavaScriptMode(),
        python: new PythonMode(),
        php: new PhpMode(),
        java: new JavaMode(),
        ruby: new RubyMode(),
        c_cpp: new CCPPMode(),
        coffee: new CoffeeMode(),
        perl: new PerlMode()
    };

    function getMode() {
        return modes[modeEl.value];
    }

    bindButton("load", function() {
        var fp = filePicker.FilePicker("Open file");
        fp.show(function(path) {
            var contents = file.read(path);
            env.editor.getSession().setValue(contents);
            /*docs[path] = new EditSession(contents);
            docs[path].setMode(new JavaScriptMode());
            docs[path].setUndoManager(new UndoManager());
            var container = document.getElementById("editor");
            env.editor = new Editor(new Renderer(container, theme));
            env.editor.setSession(docs[path]);*/
        });
    });

    bindButton("save", function() {
        var fp = filePicker.FilePicker("Save file", "save");
        fp.show(function(path) {
            file.write(path, env.editor.getSession().getValue());
        });
    });

    function bindButton(id, callback) {
        var el = document.getElementById(id);
        var onClick = function() {
            callback(el.value);
        };
        el.onclick = onClick;
    }

    function onResize() {
        container.style.width = (document.documentElement.clientWidth) + "px";
        container.style.height = (document.documentElement.clientHeight - 60 - 22) + "px";
        env.editor.resize();
    };

    window.onresize = onResize;
    onResize();

    event.addListener(container, "dragover", function(e) {
        return event.preventDefault(e);
    });

    event.addListener(container, "drop", function(e) {
        try {
            var file = e.dataTransfer.files[0];
        } catch(e) {
            return event.stopEvent();
        }

        if (window.FileReader) {
            var reader = new FileReader();
            reader.onload = function(e) {
                env.editor.getSelection().selectAll();

                var mode = "text";
                if (/^.*\.js$/i.test(file.name)) {
                    mode = "javascript";
                } else if (/^.*\.xml$/i.test(file.name)) {
                    mode = "xml";
                } else if (/^.*\.html$/i.test(file.name)) {
                    mode = "html";
                } else if (/^.*\.css$/i.test(file.name)) {
                    mode = "css";
                } else if (/^.*\.py$/i.test(file.name)) {
                    mode = "python";
                } else if (/^.*\.php$/i.test(file.name)) {
                    mode = "php";
                } else if (/^.*\.java$/i.test(file.name)) {
                    mode = "java";
                } else if (/^.*\.rb$/i.test(file.name)) {
                    mode = "ruby";
                } else if (/^.*\.(c|cpp|h|hpp|cxx)$/i.test(file.name)) {
                    mode = "c_cpp";
                } else if (/^.*\.coffee$/i.test(file.name)) {
                    mode = "coffee";
                } else if (/^.*\.(pl|pm)$/i.test(file.name)) {
                    mode = "perl";
                }

                env.editor.onTextInput(reader.result);

                modeEl.value = mode;
                env.editor.getSession().setMode(modes[mode]);
            };
            reader.readAsText(file);
        }

        return event.preventDefault(e);
    });

    window.env = env;
};

});
