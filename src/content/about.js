const Cc = Components.classes;
const Ci = Components.interfaces;

function init() {
    setTimeout(function () {
	var extManager = Cc["@mozilla.org/extensions/manager;1"].getService(Ci.nsIExtensionManager);
	var addon = extManager.getItemForID("despin@astithas.com");
        var version = document.getElementsByClassName("version")[0];
        version.attributes["value"].nodeValue = addon.version;
    }, 0);
    sizeToContent();
}

