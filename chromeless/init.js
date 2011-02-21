// Chromeless doesn't have console.error, so we need to provide one for Ace.
console.error = console.log;

var catalog = require("support/pilot/lib/pilot/plugin_manager.js").catalog;
catalog.registerPlugins(plugins).then(function() {
    var env = require("support/pilot/lib/pilot/environment").create();
    catalog.startupPlugins({ env: env }).then(function() {
        require("main").init(env);
    });
});

