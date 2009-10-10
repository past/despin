function loadDespin() {
    var newTab = gBrowser.addTab('chrome://despin/content/editor.html');
    newTab.label = "Despin";
    gBrowser.selectedTab = newTab;
    setTimeout(function () {
        gBrowser.setIcon(newTab, "chrome://despin/skin/logo.png");
    }, 500);
}

