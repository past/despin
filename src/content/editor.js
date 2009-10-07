function Editor(filename) {
  if (!filename)
    throw new Error("filename must be supplied.");
  this.filename = filename;
}

Editor.prototype = {
  CHARSET: 'utf-8',

  _component: null,

  get fullPath() {
    return FileIO.open(this.filename);
  },

  get url() {
    return FileIO.path(this.fullPath);
  },

  initUI: function (divId, window) {
    // Loads and configures the objects that the editor needs
    this._component = new bespin.editor.Component(
        divId,
        {language: "js",
         loadfromdiv: false});
    this._component.setContent(this.load());
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
    FileIO.write(this.fullPath, this._component.getContent(), 'w', this.CHARSET);
  }
};
