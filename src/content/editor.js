function Editor(filename) {
  if (!filename)
    throw new Error("filename must be supplied.");
  this.filename = filename;
}

Editor.prototype = {
  CHARSET: 'utf-8',

  bespin: null,

  get fullPath() {
    return FileIO.open(this.filename);
  },

  get url() {
    return FileIO.path(this.fullPath);
  },

  get extension() {
    var i = this.filename.lastIndexOf('.');
    if (i === -1)
      return "js";
    return this.filename.substring(i+1, this.filename.length);
  },

  initUI: function (divId, window, prefs) {
    // Loads and configures the objects that the editor needs
    var m_embedded = tiki.require('Embedded');
    var node = document.getElementById(divId);
    this.bespin = m_embedded.useBespin(node, {
        stealFocus: true,
        language: this.extension,
        settings: {
//            autoindent: prefs.autoindent,
//            codecomplete: prefs.codecomplete,
//            highlightline: prefs.highlightline,
//            smartmove: prefs.smartmove,
//            strictlines: prefs.strictlines,
//            syntaxcheck: prefs.syntaxcheck,
              tabstop: prefs.tabsize,
//            tabmode: prefs.tabmode,
//            tabshowspace: prefs.tabshowspace,
//            tabarrow: prefs.tabarrow,
//            theme: prefs.theme,
//            trimonsave: prefs.trimonsave
        }
    });
    //bespin.setLineNumber(1);
    this.bespin.value = this.load();
  },

  load: function () {
    var file = this.fullPath;
    if (!file.exists()) {
      this.save();
      return "";
    }
    return FileIO.read(file, this.CHARSET);
  },

  save: function () {
    FileIO.write(this.fullPath, this.bespin.value, 'w', this.CHARSET);
  },
  
  saveAs: function (path) {    
    var newFile = FileIO.open(path);
    FileIO.write(newFile, this.bespin.value, 'w', this.CHARSET);
    this.filename = path;
  }
};
