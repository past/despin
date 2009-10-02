
function JetpackCodeEditor(filename) {
  if (!filename)
    throw new Error("filename must be supplied.");
  this.filename = filename;
}

JetpackCodeEditor.prototype = {
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
    var useBespin = false;
    var save;

    // Bespin currently only supports clipboard copy/paste on
    // OS X, so we'll only enable it on that platform; otherwise,
    // a vanilla text area widget provides a better user
    // experience. :(
    if (window.navigator &&
        window.navigator.oscpu.indexOf("Mac OS X") != -1)
      useBespin = true;

    if (useBespin) {
      self._component = new bespin.editor.Component(
        divId,
        {language: "js",
         loadfromdiv: false});
      self._component.setContent(self.loadData());
      save = function() { self.saveData(self._component.getContent()); };
    } else {
      var element = window.document.getElementById(divId);
      var editor = window.document.createElement('textarea');
      element.appendChild(editor);
      editor.style.width = "100%";
      editor.style.height = element.style.height;
      editor.style.border = "none";
      editor.style.color = "#bdae98";
      editor.style.backgroundColor = "#2a211c";
      editor.style.padding = "0.5em";
      editor.value = self.loadData();
      save = function() { self.saveData(editor.value); };
    }

    window.addEventListener("blur", save, false);
    window.addEventListener("unload", save, false);
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
  },

  registerFeed: function registerFeed(feedManager) {
    feedManager.addSubscribedFeed({url: this.url,
                                   type: "jetpack",
                                   sourceUrl: this.url,
                                   sourceCode: this.loadData(),
                                   canAutoUpdate: true,
                                   isBuiltIn: true});
  }
};
