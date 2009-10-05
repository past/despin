function Editor(filename) {
  if (!filename)
    throw new Error("filename must be supplied.");
  this.filename = filename;
}

Editor.prototype = {
  CHARSET: 'utf-8',

  _component: null,

  get fullPath() {
    var file = FileIO.open(this.filename);
    return file;
  },

  get url() {
    return FileIO.path(this.fullPath);
  },

  initUI: function initUI(divId, window) {
    // Loads and configures the objects that the editor needs
    var self = this;
    var save;

    self._component = new bespin.editor.Component(
        divId,
        {language: "js",
         loadfromdiv: false});
    self._component.setContent(self.loadData());
    self.save = function() { self.saveData(self._component.getContent()); };

    window.addEventListener("blur", self.save, false);
    window.addEventListener("unload", self.save, false);
  },

  loadData: function loadData() {
    var file = this.fullPath;
    if (!file.exists()) {
      this.saveData("");
      return "";
    }
    return FileIO.read(file, this.CHARSET);
  },

  saveData: function saveData(data) {
    var file = this.fullPath;
    if (!file.exists())
      FileIO.create(file);
    FileIO.write(file, data, 'w', this.CHARSET);
  }
};
