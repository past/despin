
var ENV = {"platform":"classic","mode":"production"};
var SC=SC||{BUNDLE_INFO:{},LAZY_INSTANTIATION:{}};SC.json=JSON;SC.browser=(function(){var c=navigator.userAgent.toLowerCase();
var a=(c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];var b={version:a,safari:(/webkit/).test(c)?a:0,opera:(/opera/).test(c)?a:0,msie:(/msie/).test(c)&&!(/opera/).test(c)?a:0,mozilla:(/mozilla/).test(c)&&!(/(compatible|webkit)/).test(c)?a:0,mobileSafari:(/apple.*mobile.*safari/).test(c)?a:0,windows:!!(/(windows)/).test(c),mac:!!((/(macintosh)/).test(c)||(/(mac os x)/).test(c)),language:(navigator.language||navigator.browserLanguage).split("-",1)[0]};
b.current=b.msie?"msie":b.mozilla?"mozilla":b.safari?"safari":b.opera?"opera":"unknown";
return b})();SC.bundleDidLoad=function(a){var b=this.BUNDLE_INFO[a];if(!b){b=this.BUNDLE_INFO[a]={}
}b.loaded=true};SC.bundleIsLoaded=function(a){var b=this.BUNDLE_INFO[a];return b?!!b.loaded:false
};SC.loadBundle=function(){throw"SC.loadBundle(): SproutCore is not loaded."};SC.setupBodyClassNames=function(){var e=document.body;
if(!e){return}var c,a,f,b,g,d;c=SC.browser.current;a=SC.browser.windows?"windows":SC.browser.mac?"mac":"other-platform";
d=document.documentElement.style;f=(d.MozBoxShadow!==undefined)||(d.webkitBoxShadow!==undefined)||(d.oBoxShadow!==undefined)||(d.boxShadow!==undefined);
b=(d.MozBorderRadius!==undefined)||(d.webkitBorderRadius!==undefined)||(d.oBorderRadius!==undefined)||(d.borderRadius!==undefined);
g=e.className?e.className.split(" "):[];if(f){g.push("box-shadow")}if(b){g.push("border-rad")
}g.push(c);g.push(a);if(SC.browser.mobileSafari){g.push("mobile-safari")}e.className=g.join(" ")
};
"use modules false";"use loader false";if("undefined"===typeof tiki){var tiki=function(){var b=[];
var e={};var c={};function d(g,f){b.push({m:g,a:f})}var a={_modules:c,_factories:e,isBootstrap:true,queue:b,register:function(){d("register",arguments);
return this},script:function(){d("script",arguments);return this},stylesheet:function(){d("stylesheet",arguments);
return this},module:function(g,f){e[g]=f;d("module",arguments);return this},require:function(k){var j,h,l,f,g,i;
j=c[k];if(!j){j=c[k]={};l={id:k};h=e[k];if(typeof h!=="function"){throw (k+" is not function")
}h.call(j,a.require,j,l)}return j},destroy:function(){if(this.isDestroyed){return this
}this.isDestroyed=true;c=e=b=this.queue=null;return this}};return a}()}tiki.register("tiki",{scripts:[{url:"/static/tiki/en/0bc0db20a15cb1574e0e5deef1b477c14c43c8a3/javascript.js",id:"tiki:en/0bc0db20a15cb1574e0e5deef1b477c14c43c8a3/javascript.js"}]});
tiki.module("tiki:core",function(c,a,d){var b;"export setupDisplayNames";"use factory_format function";
var e=[];b=function b(j,g){var f=e;f[0]=g;var i,h;for(i in j){if(!j.hasOwnProperty(i)){continue
}h=j[i];if("function"===typeof h){f[1]=i;h.displayName=f.join(".")}}f.length=0;return j
};a.setupDisplayNames=b});tiki.module("tiki:lib/loader",function(require,exports,module){var core=require("tiki:core");
var promise=require("tiki:lib/promise");var sandbox=require("tiki:lib/sandbox");var Loader,create,setup;
"import core as core";"import lib/promise as promise";"import lib/sandbox as sandbox";
"export package Loader";"export create setup";"use factory_format function";var SCRIPTS="scripts",CATALOG="catalog",MODULES="modules",STYLESHEETS="stylesheets",LOADS="loads";
var MODULE_WRAPPER=["(function(require, exports, module) {",null,"\n});\n//@ sourceURL=",null,"\n"];
var TIKI_ARY=["tiki/",null];var STRING="string";var globals={};var PROMISE_NAME=[];
function promiseName(type,key){PROMISE_NAME[0]=type;PROMISE_NAME[1]=key;return PROMISE_NAME.join("::")
}var object_keys=Object.keys;if(!object_keys){object_keys=function(obj){var k,ret=[];
for(k in obj){if(obj.hasOwnProperty(k)){ret.push(k)}}return ret}}var inTikiCache={};
function inTiki(key){var ret=inTikiCache[key];if(ret){return ret}return(inTikiCache[key]="tiki/"+key)
}Loader=function Loader(id,queue,env){this.id=id;this.scripts=[];this.packages=[];
this.stylesheets=[];this.modules=[];this.sandbox=sandbox.create(id,this,env);this.register("default",{});
this.register("tiki",{});var len=queue?queue.length:0,idx,action;for(idx=0;idx<len;
idx++){action=queue[idx];this[action.m].apply(this,action.a)}this._queue=queue;return this
};Loader.prototype={scripts:null,stylesheets:null,packages:null,sandbox:null,modules:null,destroy:function(){},resolve:function resolve(moduleId,baseId){var path,len,idx,packageId,part,parts;
if(moduleId.match(/(^\.\.?\/)|(\/\.\.?\/)|(\/\.\.?\/?$)/)){if((idx=moduleId.indexOf(":"))>=0){packageId=moduleId.slice(0,idx);
moduleId=moduleId.slice(idx+1);path=[]}else{if(moduleId.match(/^\.\.?\//)){if(!baseId){throw ("base required to resolve relative: "+moduleId)
}idx=baseId.indexOf(":");packageId=baseId.slice(0,idx);baseId=baseId.slice(idx+1);
path=baseId.split("/");path.pop()}else{path=[]}}parts=moduleId.split("/");len=parts.length;
for(idx=0;idx<len;idx++){part=parts[idx];if(part===".."){if(path.length<1){throw"invalid path: "+moduleId
}path.pop()}else{if(part!=="."){path.push(part)}}}moduleId=path.join("/");if(packageId){moduleId=packageId+":"+moduleId
}}if(moduleId.indexOf(":")<0){if(baseId&&(idx=baseId.indexOf(":"))>0){packageId=baseId.slice(0,idx);
moduleId=packageId+":"+moduleId}}return moduleId},canonical:function canonical(moduleId,baseId){var ret=this.resolve(moduleId,baseId),factories=this._factories,catalog=this._catalog,packageId,idx;
if((idx=moduleId.indexOf(":"))<0){if(!catalog||(factories&&factories[ret])){return ret
}if(catalog[moduleId]){return moduleId+":package"}else{if(catalog[inTiki(moduleId)]){return inTiki(moduleId)+":package"
}}}else{packageId=moduleId.slice(0,idx);if(catalog&&!catalog[packageId]&&catalog[inTiki(packageId)]){ret=inTiki(moduleId)
}}return ret},evaluate:function evaluate(moduleText,moduleId){var ret;MODULE_WRAPPER[1]=moduleText;
MODULE_WRAPPER[3]=moduleId||"(unknown module)";ret=MODULE_WRAPPER.join("");ret=eval(ret);
MODULE_WRAPPER[1]=MODULE_WRAPPER[3]=null;return ret},load:function load(moduleId,baseId){var factories=this._factories,factory,packagePart,idx,info,tmp;
moduleId=this.canonical(moduleId,baseId);if(!this.ready(moduleId)){throw (moduleId+" is not ready")
}factory=factories[moduleId];if(factory&&(STRING===typeof factory)){factory=this.evaluate(factory,moduleId);
factories[moduleId]=factory}return factory},global:function(moduleId){var depends,info,len,idx,factories,moduleId,exports,key,packageId,ARY;
moduleId=this.canonical(moduleId);if((idx=moduleId.indexOf(":"))<0){throw"package not found: "+moduleId
}packageId=moduleId.slice(0,idx);ARY=moduleId.split(":");info=this._catalog[packageId];
if(!info){throw (packageId+" is not registered")}depends=info.depends;len=depends?depends.length:0;
if(len<=0){return this}factories=this._factories;if(!factories){return this}for(idx=0;
idx<len;idx++){packageId=depends[idx];if(globals[packageId]){continue}globals[packageId]=true;
if(!this.ready(packageId)){throw ("cannot make "+packageId+" global because it is not ready")
}moduleId=this.canonical(packageId);if(!factories[moduleId]){continue}exports=this.require(moduleId);
for(key in exports){if(!exports.hasOwnProperty(key)){continue}window[key]=exports[key]
}}},register:function(name,desc){if(name.indexOf(":")>0){return this.module(name,desc)
}var catalog=this._catalog,key;if(!catalog){catalog=this._catalog={}}catalog[name]=desc;
var info=desc?desc.packages:null;if(info){for(key in info){if(!info.hasOwnProperty(key)||catalog[key]){continue
}catalog[key]=info[key]}}if(!this._resolved(CATALOG,name)){this.packages.push(name)
}this._promiseFor(CATALOG,name).resolve(name)},script:function script(id){if(!this._resolved(SCRIPTS,id)){this.scripts.push(id)
}this._promiseFor(SCRIPTS,id).resolve(id);return this},stylesheet:function stylesheet(id){if(!this._resolved(STYLESHEETS,id)){this.stylesheets.push(id)
}this._promiseFor(STYLESHEETS,id).resolve(id);return this},module:function module(moduleId,factory){var factories=this._factories;
if(!factories){factories=this._factories={}}factories[moduleId]=factory;if(!this._resolved(MODULES,moduleId)){this.modules.push(moduleId)
}this._promiseFor(MODULES,moduleId).resolve(moduleId)},async:function(packageId){return this._async(packageId,null)
},_async:function(packageId,seen){var ret=this._promiseFor(LOADS,packageId);if(ret.status===promise.PENDING){if(this.ready(packageId)){ret.resolve()
}else{var loader=this;ret.action(function(pr){loader._promiseFor(CATALOG,packageId).then(pr,function(){loader._loadPackage(packageId,pr,seen||{});
pr.resolve()},function(reason){pr.cancel(reason)});loader._loadPackage(packageId,pr,seen||{})
}).run()}}return ret},require:function require(moduleId,packageId){return this.sandbox.require(moduleId,packageId)
},ready:function ready(moduleId){return this._ready(moduleId,null)},_ready:function(moduleId,seen){if(seen){if(seen[moduleId]){return true
}else{seen[moduleId]=true}}var idx,packageId,info,items,loc,scriptId,styleId;idx=moduleId.indexOf(":");
if(idx>=0){packageId=moduleId.slice(0,idx)}else{packageId=moduleId}if(!this._resolved(CATALOG,packageId)){return false
}info=this._catalog[packageId];items=info.depends;loc=items?items.length:0;while(--loc>=0){if(!seen){seen={}
}if(!this._ready(items[loc],seen)){return false}}items=info.stylesheets;loc=items?items.length:0;
while(--loc>=0){styleId=items[loc];if(STRING!==typeof styleId){styleId=styleId.id
}if(!this._resolved(STYLESHEETS,styleId)){return false}}items=info.scripts;loc=items?items.length:0;
while(--loc>=0){scriptId=items[loc];if(STRING!==typeof scriptId){scriptId=scriptId.id
}if(!this._resolved(SCRIPTS,scriptId)){return false}}if(moduleId!==packageId){if(!this._resolved(MODULES,moduleId)){return false
}}return true},main:function(moduleId,method){var r=this.require("system").ready;
if(!r){throw ("cannot register main because system.ready does not exist")}r.main(this,function(){this.async(moduleId).then(this,function(){this.require(moduleId)[method]()
})});return this},_loadScript:function(scriptId){var id,url,pr;if(STRING!==typeof(scriptId)){id=scriptId.id;
url=scriptId.url}else{id=url=scriptId}pr=this._promiseFor(SCRIPTS,id);if(pr.status===promise.PENDING){var loader=this;
pr.action(function(pr){var body=document.body,el;if(!body){promise.cancel("no document to append script")
}el=document.createElement("script");el.setAttribute("src",url);body.appendChild(el);
body=el=null})}return pr},_loadStylesheet:function(styleId){var id,url,pr;if(STRING!==typeof(styleId)){id=styleId.id;
url=styleId.url}else{id=url=styleId}pr=this._promiseFor(STYLESHEETS,id);if(pr.status===promise.PENDING){var loader=this;
pr.action(function(pr){var body=document.body,el;if(!body){pr.cancel("no document to append stylesheet")
}el=document.createElement("link");el.setAttribute("rel","stylesheet");el.setAttribute("href",url);
body.appendChild(el);body=el=null;loader.stylesheet(id)})}return pr},_loadPackage:function(packageId,pr,seen){if(seen){if(seen[packageId]){console.warn("detected cyclical reference to "+packageId+" seen="+object_keys(seen).join(", "));
return}else{seen[packageId]=true}}var info=this._catalog?this._catalog[packageId]:null,items,loc,item,ordered,next,prDepends;
if(!info){return this}items=info.depends;loc=items?items.length:0;prDepends=promise.create(promiseName("load-package",packageId));
while(--loc>=0){prDepends.depends(this._async(items[loc],seen))}pr.depends(prDepends);
prDepends.resolve();items=info.scripts;loc=items?items.length:0;next=null;ordered=info.ordered!==false;
while(--loc>=0){item=this._loadScript(items[loc]);pr.depends(item);if(ordered){if(next){item.then(next,next.run,next.cancel)
}}else{item.run()}next=item}if(next&&ordered){prDepends.then(next,next.run,next.cancel)
}items=info.stylesheets;loc=items?items.length:0;next=null;while(--loc>=0){item=this._loadStylesheet(items[loc]);
pr.depends(item);if(next){item.then(next,next.run,next.cancel)}next=item}if(next){prDepends.then(next,next.run,next.cancel)
}},_promiseFor:function(promiseType,name1,name2){var promises=this._promises,sub1,sub2,ret,Q;
if(!promises){promises=this._promises={}}sub1=promises[promiseType];if(!sub1){sub1=promises[promiseType]={}
}if(name2===undefined){sub2=sub1;name2=name1}else{sub2=sub1[name1];if(!sub2){sub2=sub1[name1]={}
}}ret=sub2[name2];if(!ret){ret=sub2[name2]=promise.create(promiseName(promiseType,name1))
}return ret},_discoveredStylesheets:false,discoverStylesheets:function(){this._discoveredStylesheets=true;
if("undefined"===typeof document){return this}var links=document.getElementsByTagName("link"),loc=links?links.length:0,link;
while(--loc>=0){link=links[loc];if(!link||(link.rel!=="stylesheet")){continue}link=link.getAttribute("loadid")||link.getAttribute("LOADID");
if(link){this.stylesheet(link.toString())}link=link.href;if(link){this.stylesheet(link.toString())
}}link=link=loc=null;return this},_resolved:function(promiseType,name1,name2){if((promiseType===STYLESHEETS)&&!this._discoveredStylesheets){this.discoverStylesheets()
}var ret=this._promises;if(ret){ret=ret[promiseType]}if(ret){ret=ret[name1]}if(ret&&name2){ret=ret[name2]
}return ret?(ret.status===promise.RESOLVED):false},_inspectLoader:function(){var lines=[],modules=this.modules,key,names,len,idx,emitted=false;
lines.push("Loader<id="+this.id+">:");if(this.packages.length>0){lines.push("  packages: "+this.packages.join(","));
lines.push("")}if(this.scripts.length>0){lines.push("  scripts:");len=this.scripts.length;
for(idx=0;idx<len;idx++){lines.push("    "+this.scripts[idx])}lines.push("")}if(this.stylesheets.length>0){lines.push("  stylesheets:");
len=this.scripts.length;for(idx=0;idx<len;idx++){lines.push("    "+this.scripts[idx])
}lines.push("")}if(this.modules.length>0){lines.push("  modules: ");len=this.modules.length;
for(idx=0;idx<len;idx++){lines.push("    "+this.modules[idx])}lines.push("")}return lines.join("\n")
},_inspectModule:function(moduleId){var lines=[],packageId=moduleId.slice(0,moduleId.indexOf(":")),tmp;
if(this._catalog&&!this._catalog[packageId]){tmp="tiki/"+packageId;if(this._catalog[tmp]){packageId=tmp;
moduleId="tiki/"+moduleId}}lines.push(moduleId+" ("+(this.ready(moduleId)?"READY":"NOT READY")+"):");
lines.push(this._inspectPackage(packageId));return lines.join("\n")},_inspectPackage:function(packageId){if(this._catalog&&!this._catalog[packageId]){var tmp="tiki/"+packageId;
if(this._catalog[tmp]){packageId=tmp}}var lines=[],info=this._catalog?this._catalog[packageId]:null,idx,len,item,parts;
lines.push(packageId+" ("+(this.ready(packageId)?"READY":"NOT READY")+"): "+(info?"":"Not in Catalog!"));
if(!info){return lines.join("\n")}len=info.depends?info.depends.length:0;if(len>0){parts=[];
for(idx=0;idx<len;idx++){item=info.depends[idx];parts.push(item+" ("+(this.ready(item)?"READY":"NOT READY")+")")
}lines.push("  depends: "+parts.join(", "))}len=info.scripts?info.scripts.length:0;
if(len>0){lines.push("\n  scripts:");for(idx=0;idx<len;idx++){item=info.scripts[idx];
if(STRING!==typeof item){item=item.id}lines.push("    "+item+" ("+(this._resolved(SCRIPTS,item)?"READY":"NOT READY")+")")
}}len=info.stylesheets?info.stylesheets.length:0;if(len>0){lines.push("\n  stylesheets:");
for(idx=0;idx<len;idx++){item=info.stylesheets[idx];if(STRING!==typeof item){item=item.id
}lines.push("    "+item+"("+(this._resolved(STYLESHEETS,item)?"READY":"NOT READY")+")")
}}return lines.join("\n")},inspect:function(id){if(arguments.length===0){return this._inspectLoader()
}else{if(id.indexOf(":")<0){return this._inspectPackage(id)}else{return this._inspectModule(id)
}}},toString:function(){return"Loader<id="+this.id+">"}};core.setupDisplayNames(Loader.prototype,"Loader");
setup=function setup(curLoader,env){if(curLoader&&!curLoader.isBootstrap){return curLoader
}if(!env){env={}}if(!env.global&&("undefined"!==typeof window)){env.global=window
}if(!env.document&&("undefined"!==typeof document)){env.document=document}var queue=curLoader?curLoader.queue:null,id=curLoader?curLoader.id:"default",ret=new Loader(id,queue,env);
if(curLoader&&curLoader.destroy){curLoader.destroy()}return ret};create=function create(id){return new Loader(id)
};exports.Loader=Loader;exports.create=create;exports.setup=setup});tiki.module("tiki:lib/promise",function(d,f,b){var e=d("tiki:core");
var i,g,c,k,l,h,a;"import core as core";"export package Promise";"export create RESOLVED PENDING CANCELLED BUSY BLOCKED";
"use factory_format function";var j=false;c="resolved";k="pending";l="cancelled";
h="busy";a="blocked";var i=function(m){this.id=m;return this};i.prototype={status:k,outstandingDependencies:0,hasAction:false,resolve:function(n){if(j){console.log(this.id+".resolve() dep="+this.outstandingDependencies+" status="+this.status)
}var m=this.status;if((m===c)||(m===l)){return this}this._value=n;if(this.outstandingDependencies>0){this.status=a
}else{this.status=c;this.value=n;this._notify(c,n)}return this},cancel:function(n){var m=this.status;
if((m===c)||(m===l)){return this}this.status=l;this.value=n;this._notify(l,n);return this
},then:function(o,m,n){var p;if(arguments.length<3&&("function"===typeof o)){n=m;
m=o;o=this}if(m){this._register(c,o,m)}if(n){this._register(l,o,n)}return this},run:function(){if(this.method&&this.status===k){this.status=h;
this.method.call(this.target||this,this)}return this},reset:function(){var m=this.status;
if((m!==h)||(m!==a)){this.status=k}this.value=null;return this},action:function(m,n){if(arguments.length===1){n=m;
m=this}this.target=m;this.method=n;this.hasAction=true;return this},depends:function(m){this.outstandingDependencies++;
if(j){console.log(this.id+".depends("+m.id+") dep="+this.outstandingDependencies+" status="+this.status)
}m.then(this,this._resolveDepends,this._cancelDepends);return this},_resolveDepends:function(n,m){this.outstandingDependencies--;
if(j){console.log("  "+this.id+"._resolveDepends("+m.id+") dep="+this.outstandingDependencies)
}if(this.outstandingDependencies<=0&&(this.status===a)){this.resolve(this.value)}return this
},_cancelDepends:function(m,n){if(j){console.log("  "+this.id+"._cancelDepends("+n.id+") dep="+this.outstandingDependencies)
}this.cancel(m);return this},_notify:function(p,n){var o=this._actions,m,q;o=o?o[p]:null;
m=o?o.length:0;this._actions=null;for(q=0;q<m;q++){this._invoke(o[q].target,o[q].method,n)
}},_invoke:function(n,o,m){if(("string"===typeof o)&&n){o=n[o]}if(!n){n=this}o.call(n,m,this)
},_register:function(m,o,r){var q=this.status,p,n;if((q===c)||(q===l)){if(q===m){this._invoke(o,r,this.value)
}}else{p=this._actions;if(!p){p=this._actions={}}n=p[m];if(!n){n=p[m]=[]}n.push({target:o,method:r})
}},toString:function(){return"Promise<id="+this.id+" status="+this.status+">"}};e.setupDisplayNames(i.prototype,"Promise");
g=function g(m){return new i(m)};f.Promise=i;f.create=g;f.RESOLVED=c;f.PENDING=k;
f.CANCELLED=l;f.BUSY=h;f.BLOCKED=a});tiki.module("tiki:lib/sandbox",function(b,a,d){var e,c;
"export package Sandbox";"export create";"use factory_format function";e=function e(f,m,k){var h={},i=[],j={},n=this;
this.id=f;this.modules=i;this.loader=m;function l(){var p=arguments.length,o;if(p>0){while(--p>0){o=arguments[p];
if(o&&h[o]){delete h[o];i.splice(i.indexOf(o),1)}}}else{h={};i.length=0}}l.displayName="Sandbox.clear";
function g(o,r,u){var v,s,p,t,w;if(r){w=o.indexOf(":");if(w>=0){o=o.slice(0,w)}o=r+":"+o
}o=m.canonical(o,u);if(exp=h[o]){return exp}i.push(o);h[o]=s={};v=function(x,y){return g(x,y,o)
};v.displayName="Sandbox.require";v.loader=m;v.clear=l;v.env=k||{};v.sandbox=this;
p={id:o};var q=m.load(o);if(!q){throw"could not load function for "+o}q.call(s,v,s,p);
return s}this.require=function(o,p){return g(o,p)};this.require.displayName="Sandbox.require"
};e.prototype={};c=function c(h,f,g){return new e(h,f,g)};a.Sandbox=e;a.create=c});
tiki.module("tiki:package",function(c,b,d){var a;a=c("tiki:lib/loader");b.Loader=a.Loader;
a=c("tiki:lib/promise");b.Promise=a.Promise;a=c("tiki:lib/sandbox");b.Sandbox=a.Sandbox
});"use modules false";"use loader false";tiki=tiki.require("tiki:lib/loader").setup(tiki,("undefined"===typeof ENV)?null:ENV);
tiki.script("tiki:en/0bc0db20a15cb1574e0e5deef1b477c14c43c8a3/javascript.js");tiki.register("tiki/platform/classic",{depends:["tiki"],packages:{tiki:{}},scripts:[{url:"/static/tiki/platform/classic/en/9f6d82903c6accdda661e6d567f7d6f7fd335392/javascript.js",id:"tiki/platform/classic:en/9f6d82903c6accdda661e6d567f7d6f7fd335392/javascript.js"}]});
tiki.module("tiki/platform/classic:lib/console",function(c,b,d){var a;"export package console";
"use factory_format function";var e=c.env;a=(e&&e.global)?e.global.console:null;b.console=a
});tiki.module("tiki/platform/classic:lib/event","var info = require('tiki/platform/classic:lib/info');var add,remove,event,ready,unload,NATIVE_EVENTS;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92006-2009 Sprout Systems, Inc. and contributors.\n//            Portions \u00a92008-2009 Apple Inc. All rights reserved.\n// License:   Licened under MIT license (see license.js)\n// ==========================================================================\n/*globals event exports add remove ready unload info NATIVE_EVENTS */\n\n\"import lib/info as info\";\n\"export add remove\";\n\"export package event ready unload NATIVE_EVENTS\";\n\n/**\n  @file\n  \n  Implements a low-level interface for registering interest in native events\n  delivered by the web browser.  If you are implementing this API for a non-\n  browser environment, add() and remove() may do nothing.\n  \n  ready() and unload() should still invoke the passed callback when the \n  JS environment is ready for the app to run and just before the app exits,\n  respectively.\n\n  ready() and unload() should both expect to be called exactly once (by the\n  system event module).  They may throw an error if called more than once.\n*/\n\n\nvar readyCalled  = false, \n    unloadCalled = false,\n    browser      = info.browser,\n    isReady      = false,\n    isUnloaded   = false,\n    ecache       = {};\n    \n\n// returns a handler function for the onready event depending on the browser.    \nfunction readyHandler(callback) {\n  var ret ;\n  \n  // opera - wait until all the stylesheets are made visible\n  if (browser.opera) {\n    ret = function() {\n      if (isReady) return;\n      \n      for (var i = 0; i < document.styleSheets.length; i++) {\n        if (document.styleSheets[i].disabled) {\n          setTimeout(ret, 0);\n          return;\n        }\n      }\n      \n      // and execute any waiting functions\n      isReady = true;\n      callback();\n    };\n    \n  // msie - wait until the doScroll event stops complaining..\n  } else if (browser.msie) {\n    ret = function() {\n      if (isReady) return;\n      try {\n        // If IE is used, use the trick by Diego Perini\n        // http://javascript.nwbox.com/IEContentLoaded/\n        document.documentElement.doScroll(\"left\");\n      } catch( error ) {\n        setTimeout(ret, 0);\n        return;\n      }\n\n      // and execute any waiting functions\n      isReady = true;\n      callback();\n    };\n    \n  // everyone else - just call\n  } else {\n    ret = function() {\n      console.log('ready!');\n      if (isReady) return ;\n      isReady = true;\n      callback();\n    };\n  }\n  \n  return ret ;\n  \n}\n\n/** \n  Invoke the  callback when the browser is ready to handle app code. \n  Throws an exception if it is called more than once.  Uses a built-in \n  listener.\n  \n  @param {Function} callback\n  @returns {void}\n*/\nready = function(callback) {\n  if (readyCalled) throw(\"Cannot call platform.ready() more than once\");\n  readyCalled = true;\n  \n  var handler = readyHandler(callback);\n  \n  // Mozilla, Opera (see further below for it) and webkit nightlies \n  // currently support this event.  Use the handy event callback\n  if (document.addEventListener) {\n    document.addEventListener( \"DOMContentLoaded\", handler, NO );\n  \n  // If IE is used and is not in a frame\n  // Continually check to see if the document is ready\n  } else if (browser.msie && (window === top)) handler();\n\n  // A fallback to window.onload, that will always work\n  add(window, 'load', handler);\n};\n\n\nfunction unloadHandler(callback) {\n  return function() {\n    if (isUnloaded) return ;\n    isUnloaded = true;\n    callback();\n  }; \n}\n\n/**\n  Invoke the callback just before the browser unloads the page.  Throws an \n  error if called more than once.\n  \n  @param {Function} callback\n  @returns {void}\n*/\nunload = function(callback) {\n  if (unloadCalled) throw(\"Cannot call platform.unload() more than once\");\n  unloadCalled = true;\n  add(window, 'unload', unloadHandler(callback));\n};\n\n// ..........................................................\n// EVENT LISTENERS\n// \n\n/**\n  Names of event types natively supported by this library.  Platforms without\n  native event support can return an empty hash.\n*/\nNATIVE_EVENTS = {};\n\n// TODO: make this correct per-browser\n// TODO: add touch events\nvar names = 'mousedown mouseup click dblclick mouseover mouseout selectstart keypress keydown keyup blur focus deactivate change select submit contextmenu dragstart error hashchange help load losecapture readystatechange resize scroll unload'.split(' '), loc = names.length;\nwhile(--loc>=0) NATIVE_EVENTS[names[loc]] = names[loc];\n\n\n// convert 'foo' => 'onfoo' using cache to avoid malloc\nfunction onStr(str) {\n    var ret = ecache[str];\n    if (!ret) ret = ecache[str] = ('on' + str); // avoid mallocs\n    return ret ;\n}\n\n/**\n  Adds a listener for the event.  No need to do any special buffering; just\n  add the listener in a platform-specific way.\n  \n  @param {Object} elem the target element if any.  otherwise use document\n  @param {String} eventType click, mousedown, etc\n  @param {Function} callback function to invoke\n  @returns {void}\n*/\nadd = function(elem, eventType, callback) {\n  if (!NATIVE_EVENTS[eventType]) return ; // ignore for native events\n  if (!elem) elem = require.env.document;\n  if (elem.addEventListener) elem.addEventListener(eventType, callback, NO);\n  else if (elem.attachEvent) elem.attachEvent(onStr(eventType), callback);      \n  else throw(\"cannot add listener to element: \" + elem);\n};\n\n/**\n  Removes a listener for the event.  No need to do any special buffering; just\n  remove the listener in a platform-specific way\n  \n  @param {Object} elem the target element if any. otherwise use document\n  @param {String} eventType click, mousedown, etc\n  @param {Function} func function to invoke\n  @returns {void}\n*/\nremove = function(elem, eventType, func) {\n  if (!NATIVE_EVENTS[eventType]) return ;\n  if (!elem) elem = require.env.document;\n  if (elem.removeEventListener) elem.removeEventListener(eventType, func, NO);\n  else if (elem.detachEvent) elem.detachEvent(onStr(eventType), func);\n  else throw(\"cannot remove listener from element: \" + elem);\n};\n\n// make this API visible as the events property on package\nevent = exports;\n;exports.add = add;\nexports.remove = remove;\nexports.event = event;\nexports.ready = ready;\nexports.unload = unload;\nexports.NATIVE_EVENTS = NATIVE_EVENTS;\n");
tiki.module("tiki/platform/classic:lib/info","var browser,userAgent,info;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals browser userAgent info exports */\n\n\"export browser userAgent\";\n\"export package info\";\n\n/**\n  @file\n\n  Export constants in this module that describe the capabilities of the target\n  platform.  The most important property you can define here is HTML\n*/\n\n\n// ..........................................................\n// BROWSER DESCRIPTION\n// \n\nuserAgent = navigator.userAgent.toLowerCase();\n\nvar version = (userAgent.match( /.+(?:rv|it|ra|ie)[\\/: ]([\\d.]+)/ ) || [])[1];\n\nbrowser = {\n  \n  /** The current browser version */\n  version: version,\n  \n  /** non-zero if webkit-based browser */\n  safari: (/webkit/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is an opera-based browser */\n  opera: (/opera/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is IE */\n  msie: (/msie/).test( userAgent ) && !(/opera/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is a miozilla based browser */\n  mozilla: (/mozilla/).test( userAgent ) && !(/(compatible|webkit)/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is mobile safari */\n  mobileSafari: (/apple.*mobile.*safari/).test(userAgent) ? version : 0,\n  \n  /** non-zero if we are on windows */\n  windows: !!(/(windows)/).test(userAgent),\n  \n  /** non-zero if we are on a mac */\n  mac: !!((/(macintosh)/).test(userAgent) || (/(mac os x)/).test(userAgent)),\n  \n  language: (navigator.language || navigator.browserLanguage).split('-', 1)[0]\n};\n\nbrowser.isOpera = !!browser.opera;\nbrowser.isIe = browser.msie;\nbrowser.isIE = browser.msie;\nbrowser.isSafari = browser.safari;\nbrowser.isMobileSafari = browser.mobileSafari;\nbrowser.isMozilla = browser.mozilla;\nbrowser.isWindows = browser.windows;\nbrowser.isMac = browser.mac;\n\n/**\n  The current browser name.  This is useful for switch statements. \n*/\nbrowser.current = \n  browser.msie ? 'msie' : \n  browser.mozilla ? 'mozilla' : \n  browser.safari ? 'safari' : \n  browser.opera ? 'opera' : 'unknown' ;\n\n\n// make this module visible as \"info\"\ninfo = exports ;\n;exports.browser = browser;\nexports.userAgent = userAgent;\nexports.info = info;\n");
tiki.module("tiki/platform/classic:lib/timer",function(b,a,c){var f,e,d,g;"export schedule repeat cancel";
"export package timer";"use factory_format function";f=function(k,l,j){var h,i;i=j?function(){l.call(j,h)
}:l;h=setTimeout(k,i);l=null;return h};e=function(k,l,j){var h,i;i=j?function(){l.call(j,h)
}:l;h=setInterval(k,i);l=null;return h};d=function(i,h){if(h===undefined){clearTimeout(i);
clearInterval(i)}else{if(h){clearInterval(i)}else{clearTimeout(i)}}};g=a;a.schedule=f;
a.repeat=e;a.cancel=d;a.timer=g});tiki.module("tiki/platform/classic:package",function(c,b,d){var a;
a=c("tiki/platform/classic:lib/console");b.console=a.console;a=c("tiki/platform/classic:lib/event");
b.event=a.event;b.ready=a.ready;b.unload=a.unload;b.NATIVE_EVENTS=a.NATIVE_EVENTS;
a=c("tiki/platform/classic:lib/info");b.info=a.info;a=c("tiki/platform/classic:lib/timer");
b.timer=a.timer});tiki.script("tiki/platform/classic:en/9f6d82903c6accdda661e6d567f7d6f7fd335392/javascript.js");
tiki.register("tiki/system",{depends:["tiki","tiki/platform/classic"],packages:{"tiki/platform/classic":{},tiki:{}},scripts:[{url:"/static/tiki/system/en/2914de37845aac6a9ada3efb6531c59f9735086e/javascript.js",id:"tiki/system:en/2914de37845aac6a9ada3efb6531c59f9735086e/javascript.js"}]});
tiki.module("tiki/system:core","var T_ERROR,T_OBJECT,T_NULL,T_CLASS,T_HASH,T_FUNCTION,T_UNDEFINED,T_NUMBER,T_BOOL,T_ARRAY,T_STRING,T_BOOLEAN,YES,NO,isArray,typeOf,A,generateGuid,guidFor,mixin,setupDisplayNames;// ==========================================================================\n// Project:   SproutCore System Package\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals T_ERROR T_OBJECT T_NULL T_CLASS T_HASH T_FUNCTION T_NUMBER T_BOOL T_ARRAY T_UNDEFINED T_STRING YES NO isArray typeOf A generateGuid guidFor */\n\n\"export T_ERROR T_OBJECT T_NULL T_CLASS T_HASH T_FUNCTION T_UNDEFINED T_NUMBER T_BOOL T_ARRAY T_STRING T_BOOLEAN\";\n\"export YES NO isArray typeOf A generateGuid guidFor mixin setupDisplayNames\";\n\n// define standard type constants\nT_ERROR     = 'error';\nT_OBJECT    = 'object';\nT_NULL      = 'null';\nT_CLASS     = 'class';\nT_HASH      = 'hash';\nT_FUNCTION  = 'function';\nT_UNDEFINED = 'undefined';\nT_NUMBER    = 'number';\nT_BOOL      = 'boolean';\nT_ARRAY     = 'array';\nT_STRING    = 'string';\nT_BOOLEAN   = 'boolean';\n\nYES         = true;\nNO          = false; \n\n/**\n  Returns true if the passed item is an array.  Works regardless of source\n  of array.\n*/\nisArray = function(obj) {\n  if (obj && obj.isArray) return true; // fast path\n  if (!obj) return false;\n  if (T_UNDEFINED !== typeof obj.length) {\n    if ((typeof obj !== T_FUNCTION) && (typeof obj !== T_STRING) && (obj.constructor !== String)) return true;\n  }\n  // TODO: add proper check that works across windows...\n  return false ;  \n};\n\nArray.prototype.isArray = true ;\n  \n/**\n  Returns a consistant type for the passed item.\n\n  Use this instead of the built-in typeOf() to get the type of an item. \n  It will return the same result across all browsers and includes a bit \n  more detail.  Here is what will be returned:\n\n  | Return Value Constant | Meaning |\n  | SC.T_STRING | String primitive |\n  | SC.T_NUMBER | Number primitive |\n  | SC.T_BOOLEAN | Boolean primitive |\n  | SC.T_NULL | Null value |\n  | SC.T_UNDEFINED | Undefined value |\n  | SC.T_FUNCTION | A function |\n  | SC.T_ARRAY | An instance of Array |\n  | SC.T_CLASS | A SproutCore class (created using SC.Object.extend()) |\n  | SC.T_OBJECT | A SproutCore object instance |\n  | SC.T_HASH | A JavaScript object not inheriting from SC.Object |\n\n  @param item {Object} the item to check\n  @returns {String} the type\n*/  \ntypeOf = function typeOf(item) {\n  if (item === undefined) return T_UNDEFINED ;\n  if (item === null) return T_NULL ; \n  \n  var ret = typeof(item) ;\n  if (ret == \"object\") {\n    if (isArray(item)) ret = T_ARRAY ;\n    else if (item instanceof Function) {\n      ret = item.isClass ? T_CLASS : T_FUNCTION ;\n    } else if ((item instanceof Error) || item.isError) ret = T_ERROR;\n    else if (item.isObject) ret = T_OBJECT ;\n    else if (item.isClass) ret = T_CLASS;\n    else if (item.constructor === Object) ret = T_HASH;\n    else if (item.constructor === Number) ret = T_NUMBER;\n    else if (item.constructor === String) ret = T_STRING;\n    else ret = T_OBJECT;\n\n  } else if (ret === T_FUNCTION) ret = item.isClass ? T_CLASS : T_FUNCTION;\n  \n  return ret ;\n};\n  \n/**\n  Converts the passed object to an Array.  If the object appears to be \n  array-like, a new array will be cloned from it.  Otherwise, a new array\n  will be created with the item itself as the only item in the array.\n  \n  @param object {Object} any enumerable or array-like object.\n  @returns {Array} Array of items\n*/\nA = function A(obj) {\n  // null or undefined -- fast path\n  if ((obj === null) || (obj === undefined)) return [] ;\n  \n  // primitive -- fast path\n  if (obj.slice instanceof Function) {\n    // do we have a string?\n    if (typeof(obj) === 'string') return [obj] ;\n    else return obj.slice() ;\n  }\n  \n  // enumerable -- fast path\n  if (obj.toArray) return obj.toArray() ;\n  \n  // if not array-like, then just wrap in array.\n  if (!isArray(obj)) return [obj];\n  \n  // when all else fails, do a manual convert...\n  var ret = [], len = obj.length;\n  while(--len >= 0) ret[len] = obj[len];\n  return ret ;\n};\n  \nvar guidKey = \"_sc_guid_\" + new Date().getTime();\nvar _nextGUID = 0, _numberGuids = [], _stringGuids = [];\n\n/**\n  Generates a new guid, optionally saving the guid to the object that you\n  pass in.  You will rarely need to use this method.  Instead you should\n  call SC.guidFor(obj), which return an existing guid if available.\n\n  @param {Object} obj the object to assign the guid to\n  @returns {String} the guid\n*/\ngenerateGuid = function generateGuid(obj) { \n  var ret = (\"sc\" + (_nextGUID++)); \n  if (obj) obj[guidKey] = ret ;\n  return ret ;\n};\n\n/**\n  Returns a unique GUID for the object.  If the object does not yet have\n  a guid, one will be assigned to it.  You can call this on any object,\n  SC.Object-based or not, but be aware that it will add a _guid property.\n\n  You can also use this method on DOM Element objects.\n\n  @param obj {Object} any object, string, number, Element, or primitive\n  @returns {String} the unique guid for this instance.\n*/\nguidFor = function guidFor(obj) {\n  \n  // special cases where we don't want to add a key to object\n  if (obj === undefined) return \"(undefined)\" ;\n  if (obj === null) return '(null)' ;\n  if (obj === Object) return '(Object)';\n  if (obj === Array) return '(Array)';\n  \n  if (obj[guidKey]) return obj[guidKey] ;\n\n  switch(typeof obj) {\n    case T_NUMBER:\n      return (_numberGuids[obj] = _numberGuids[obj] || (\"nu\" + obj));\n    case T_STRING:\n      return (_stringGuids[obj] = _stringGuids[obj] || (\"st\" + obj));\n    case T_BOOL:\n      return obj ? \"(true)\" : \"(false)\" ;\n    default:\n      return generateGuid(obj);\n  }\n};\n\n/**\n  Mixin the passed properties onto the first parameter.  This is a convenient\n  way to add properties to an object.\n  \n  @param {Hash} t the target object to mixin to\n  @param {Hash..} one or more hashes to mix in\n  @returns {Hash} the first parameter\n*/\nmixin = function mixin(t) {\n  \n  // copy reference to target object\n  var len    = arguments.length,\n      target = arguments[0] || {},\n      idx, options, key, src, copy;\n\n  for (idx=1; idx < len; idx++ ) {\n    if (!(options = arguments[idx])) continue ;\n    for(key in options) {\n      if (!options.hasOwnProperty(key)) continue ;\n\n      src  = target[key];\n      copy = options[key] ;\n      if (target===copy) continue ; // prevent never-ending loop\n      if (copy !== undefined) target[key] = copy ;\n    }\n  }\n  \n  return target;\n};\n\nvar TMP_ARY = [];\n\n/**\n  Iterate over a property, setting display names on functions as needed. \n*/\nsetupDisplayNames = function setupDisplayNames(obj, root) {\n  var a = TMP_ARY;\n  a[0] = root;\n  \n  var k,v;\n  for(k in obj) {\n    if (!obj.hasOwnProperty(k)) continue ;\n    v = obj[k];\n    if ('function' === typeof v) {\n      a[1] = k;\n      v.displayName = a.join('.');\n    }\n  }\n  \n  a.length = 0;\n  return obj;\n};;exports.T_ERROR = T_ERROR;\nexports.T_OBJECT = T_OBJECT;\nexports.T_NULL = T_NULL;\nexports.T_CLASS = T_CLASS;\nexports.T_HASH = T_HASH;\nexports.T_FUNCTION = T_FUNCTION;\nexports.T_UNDEFINED = T_UNDEFINED;\nexports.T_NUMBER = T_NUMBER;\nexports.T_BOOL = T_BOOL;\nexports.T_ARRAY = T_ARRAY;\nexports.T_STRING = T_STRING;\nexports.T_BOOLEAN = T_BOOLEAN;\nexports.YES = YES;\nexports.NO = NO;\nexports.isArray = isArray;\nexports.typeOf = typeOf;\nexports.A = A;\nexports.generateGuid = generateGuid;\nexports.guidFor = guidFor;\nexports.mixin = mixin;\nexports.setupDisplayNames = setupDisplayNames;\n");
tiki.module("tiki/system:lib/event",'var $m__ = require(\'tiki/system:core\'), T_ERROR=$m__.T_ERROR,T_OBJECT=$m__.T_OBJECT,T_NULL=$m__.T_NULL,T_CLASS=$m__.T_CLASS,T_HASH=$m__.T_HASH,T_FUNCTION=$m__.T_FUNCTION,T_UNDEFINED=$m__.T_UNDEFINED,T_NUMBER=$m__.T_NUMBER,T_BOOL=$m__.T_BOOL,T_ARRAY=$m__.T_ARRAY,T_STRING=$m__.T_STRING,T_BOOLEAN=$m__.T_BOOLEAN,YES=$m__.YES,NO=$m__.NO,isArray=$m__.isArray,typeOf=$m__.typeOf,A=$m__.A,generateGuid=$m__.generateGuid,guidFor=$m__.guidFor,mixin=$m__.mixin,setupDisplayNames=$m__.setupDisplayNames;var $m__ = require(\'tiki/system:lib/invocation\'), Invocation=$m__.Invocation;var $m__ = require(\'tiki/system:lib/platform\'), PLATFORM=$m__.PLATFORM,PLATFORM_PACKAGE=$m__.PLATFORM_PACKAGE,info=$m__.info,env=$m__.env;var ready,unload;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals ready unload Invocation */\n\n"import core";\n"import lib/invocation";\n"import lib/platform";\n"export package ready unload";\n\nvar platform = require(PLATFORM_PACKAGE);\n\n// ..........................................................\n// READY HANDLER\n// \n\n// called when the document becomes ready.  work through the queue...\nfunction _ready() {\n  var queue = ready.queue, \n      mainQ = ready.mainQ,\n      len   = queue.length,\n      inv, idx;\n\n  ready.isReady = ready.scheduled = YES ;\n  ready.queue = []; // ok to alloc since it is usually only called once\n  ready.mainQ = [];\n  \n  for(idx=0;idx<len;idx++) {\n    inv = queue[idx];\n    inv.invoke();\n    inv.release(); // return to pool\n  }\n\n  // after calling ready handlers, invoke any main functions to start the app\n  len = mainQ.length;\n  for(idx=0;idx<len;idx++) {\n    inv = mainQ[idx];\n    inv.invoke();\n    inv.release(); // return to pool\n  }\n};\n\n/**\n  Call to register methods you want run when the system is ready for the app\n  to run.\n*/\nready = function(target, method, args) {\n  if (ready.isReady) {\n    Invocation.invoke(target, method, arguments, 2);\n    \n  } else {\n    if (!ready.scheduled && platform) platform.ready(_ready);\n    ready.scheduled = YES ;\n    ready.queue.push(Invocation.create(target, method, arguments, 2));\n  }\n  \n  return this ;\n};\n\nready.isReady = NO ;\nready.queue   = [] ;\nready.scheduled = NO ;\nready.mainQ   = [] ; // invocations for main. called after ready\n\nready.main = function(target, method, args) {\n  if (ready.isReady) {\n    Invocation.invoke(target, method, arguments, 2);\n    \n  } else {\n    if (!ready.scheduled && platform) platform.ready(_ready);\n    ready.scheduled = YES ;\n    ready.mainQ.push(Invocation.create(target, method, arguments, 2));\n  }\n  \n  return this ;\n};\n\n// ..........................................................\n// UNLOAD HANDLER\n// \n\nfunction _unload() {\n  var queue = unload.queue, \n      len   = queue.length,\n      inv, idx;\n\n  unload.isUnloaded = unload.scheduled = YES ;\n  unload.queue = [];\n  \n  for(idx=0;idx<len;idx++) {\n    inv = queue[idx];\n    inv.invoke();\n    inv.release(); // return to pool\n  }\n}\n\n/**\n  Call to register methods you want run when the system is about to unload.\n*/\nunload = function(target, method, args) {\n  if (unload.isUnloaded) {\n    Invocation.invoke(target, method, arguments, 2);\n    \n  } else {\n    if (!unload.scheduled && platform) platform.unload(_unload);\n    unload.scheduled = YES;\n    unload.queue.push(Invocation.create(target, method, arguments, 2));\n  }\n  \n  return this ;\n};\n\nunload.isUnloaded = NO;\nunload.queue      = [];\nunload.scheduled  = NO;\n;exports.ready = ready;\nexports.unload = unload;\n');
tiki.module("tiki/system:lib/global",'var global,reset;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n\n"export package global";\n"export reset";\n\n// exports a global object representing the current global.  you can reset \n// the global by importing this module directly.\n\n// if you have env.global, use that\nreset = function() {\n  global = require.env.global || {} ;\n};\n\nreset();\n;exports.global = global;\nexports.reset = reset;\n');
tiki.module("tiki/system:lib/invocation",'var $m__ = require(\'tiki/system:core\'), T_ERROR=$m__.T_ERROR,T_OBJECT=$m__.T_OBJECT,T_NULL=$m__.T_NULL,T_CLASS=$m__.T_CLASS,T_HASH=$m__.T_HASH,T_FUNCTION=$m__.T_FUNCTION,T_UNDEFINED=$m__.T_UNDEFINED,T_NUMBER=$m__.T_NUMBER,T_BOOL=$m__.T_BOOL,T_ARRAY=$m__.T_ARRAY,T_STRING=$m__.T_STRING,T_BOOLEAN=$m__.T_BOOLEAN,YES=$m__.YES,NO=$m__.NO,isArray=$m__.isArray,typeOf=$m__.typeOf,A=$m__.A,generateGuid=$m__.generateGuid,guidFor=$m__.guidFor,mixin=$m__.mixin,setupDisplayNames=$m__.setupDisplayNames;var $m__ = require(\'tiki/system:mixins/retainable\'), Retainable=$m__.Retainable;var Invocation;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals Invocation */\n\n"import core";\n"import mixins/retainable";\n"export package Invocation";\n\n/**\n  An Invocation captures a target, method and zero or more arguments to be \n  called at a later time.  Invocations are retainable so you can control when\n  they are destroyed.\n  \n  Note that if you pass a string to the method param, this string will not \n  be resolved to a function until you actually invoke it.  This means you can\n  potentially swap out the method between invocations.\n  \n  @since SproutCore 1.1\n*/\nInvocation = function Invocation(target, method, args) {\n  return this.init(target, method, args);\n};\n\nmixin(Invocation.prototype, Retainable, {\n  \n  constructor: Invocation,\n  \n  /**\n    Initializes the invocation.  This is called when you first create the \n    invocation.\n  */\n  init: function(target, method, args, ignore) {\n    if (args && (ignore !== undefined)) {\n      if (args.length>ignore) args = Array.prototype.slice.call(args, ignore);\n      else args = null; // nothing to curry\n    }\n    \n    this.inPool = NO; // for debug\n    this.target = target;\n    this.method = method;\n    this.args   = args;\n    return this ;\n  },\n  \n  /**\n    Destroys the invocation.  Called when the retain count hits zero.  This\n    will return the invocation to the pool.\n  */\n  destroy: function() {\n    // reset retainable\n    this.isDestroyed = NO;\n    this.retainCount = 1;\n    this.inPool      = YES;\n    this.target = this.method = this.args = null;\n    pool.push(this); // add back to pool\n    \n    return this ;\n  },\n  \n  /**\n    Invokes the method.  Any passed arguments will be curried onto existing\n    arguments.\n    \n    @returns {Object} return value of invoked method.\n  */\n  invoke: function() {\n    return Invocation.invoke(this.target, this.method, this.args, undefined, arguments);\n  }\n  \n});\n\nvar pool = [];\n\n/**\n  Creates a new invocation.  This method will use a memory pool if possible to\n  avoid allocing memory.\n  \n  @param {Object} target target to invoke\n  @param {Function|String} method function or name of method to invoke\n  @param {Array} args zero or more arguments.  optional\n  @param {Number} ignore if passed, ignores this many items from the args\n  @returns {Invocation} new instance\n*/\nInvocation.create = function(target, method, args, ignore) {\n  if (pool.length>0) return pool.pop().init(target,method,args,ignore);\n  else return new Invocation(target, method, args, ignore);\n};\n\n/**\n  Invokes the passed target, method, and arguments.  This is an optimized \n  version that may not actually create an invocation.\n*/\n/**\n  Invokes the invocation.  Return value of invocation is returned.  Any \n  additional arguments will be curried onto the end of any existing args.\n*/\nInvocation.invoke = function(target, method, args, ignore, extra) {\n\n  // normalize method\n  if (typeOf(method) === T_STRING) method = target[method];\n  if (!method) throw("Invocation: method " + this.method + " not defined");\n  \n  // normalize arguments - also curry any extra arguments\n  if ((ignore !== undefined) && args) {\n    if (args.length>ignore) args = Array.prototype.slice.call(args, ignore);\n    else args = null;\n  }\n  if (extra && extra.length>0) args = args ? args.concat(extra) : extra;\n  \n  // and finally invoke\n  return args ? method.apply(target, args) : method.call(target);\n};\n\n;exports.Invocation = Invocation;\n');
tiki.module("tiki/system:lib/logger","var core = require('tiki/system:core');var $m__ = require('tiki/system:lib/platform'), PLATFORM=$m__.PLATFORM,PLATFORM_PACKAGE=$m__.PLATFORM_PACKAGE,info=$m__.info,env=$m__.env;var Logger,console;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals Logger console core */\n\n\"import core as core\";\n\"import lib/platform\";\n\"export package Logger console\";\n\n/** \n  @file\n\n  Module defines generic functions that can be used to log output into a \n  string or file.\n  \n  The Logger class defined in this module implements the generic Logger API,\n  which includes warn(), info(), error(), debug() and log().  \n  \n  The console object logs this to a system-provided console (on browsers this\n  is equivalent to the system-provided console).\n\n  @since Tiki 1.0\n*/\n\n// get the platform console\nvar pconsole = require(PLATFORM_PACKAGE).console;\n\n/**\n  Logger class defines a standard logger.  If you attach a console, then the\n  logger will record its own results AND forward any output to the console \n  itself.  \n  \n  A default logger is usually created and exported as \"console\" that will \n  attach to the platform console.  You can create a new logger if you want as \n  well.\n\n  @since Tiki 1.0\n*/\nLogger = function Logger(id, console) {\n  this.id = id ;\n  this.console = console;\n  return this ;\n};\n\nvar COLON = ': ', NEWLINE = \"\\n\", TILDA = ' ~ ';\n\nLogger.prototype = {\n  \n  /**\n    Emits count number of lines (or 100 lines if not specified) as a single\n    string.\n    \n    @property {Number} count number of lines to display. optional\n    @returns {String} logged output\n  */\n  tail: function(count) {\n    var lines = this._lines,\n        len   = lines ? lines.length : 0,\n        idx, ret;\n\n    if (len===0) return '';\n\n    if (count === undefined) count = 100;\n    ret = [];\n    for(idx = Math.max(0, len - count); idx < len; idx++) {\n      \n      if (this.id) {\n        ret.push(this.id);\n        ret.push(TILDA);\n      }\n      if (lines[idx].kind) {\n        ret.push(lines[idx].kind);\n        ret.push(COLON);\n      }\n      ret.push(lines[idx].message);\n      ret.push(NEWLINE);      \n    }\n    \n    return ret.join(\"\");\n  },\n  \n  /**\n    Clears the log contents\n    \n    @returns {Logger} reciever\n  */\n  clear: function() {\n    this._lines = null;\n    return this ;\n  },\n  \n  /**\n    Adds a line to the log.  Pass the log type and message.\n    \n    @param {String} kind kind of log message.  should be WARN, DBEUG, or null\n    @param {String} message message to log\n    @returns {Logger} reciever\n  */\n  push: function(kind, message) {\n    var lines = this._lines;\n    if (!lines) lines = this._lines = [];\n    lines.push({ kind: kind, message: message });\n  },\n  \n  /**\n    Logs a debug statement.\n    \n    @param {String} msg one or more items to log\n    @returns {void} \n  */\n  debug: function(msg) {\n    this.push('DEBUG', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.debug) console.debug.apply(console, arguments);\n  },\n  \n  /**\n    Logs an info statement.\n    \n    @param {String} msg one or more items to log\n    @returns {void}\n  */\n  info: function(msg) {\n    this.push('INFO', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.info) console.info.apply(console, arguments);\n  },\n  \n  /**\n    Logs a warning\n    \n    @param {String} msg one or more items to log\n    @returns {void}\n  */\n  warn: function(msg) {\n    this.push('WARN', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.warn) console.warn.apply(console, arguments);\n  },\n  \n  /**\n    Logs an error.\n    \n    @param {String} msg one or mroe items to log\n    @returns {void}\n  */\n  error: function(msg) {\n    this.push('ERROR', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.error) console.error.apply(console, arguments);\n  },\n  \n  /**\n    Begins a group stack.\n  */\n  group: function(groupName) {\n    this.push('GROUP', groupName);\n    \n    var console = this.console;\n    if (console && console.group) console.group(groupName);\n  },\n  \n  /**\n    Ends a group stack\n  */\n  groupEnd: function(groupName) {\n    this.push('','');\n    \n    var console = this.console;\n    if (console && console.groupEnd) console.groupEnd(groupName);\n  },\n  \n  toString: function() {\n    var len = this._lines ? this._lines.length : 0;\n    return \"Logger<id=\" + this.id + \" size=\" + len + \">\";\n  }\n    \n};\nLogger.prototype.log = Logger.prototype.info;\n\nconsole = new Logger('console', pconsole);\n;exports.Logger = Logger;\nexports.console = console;\n");
tiki.module("tiki/system:lib/platform",function(b,a,c){var f,g,e,d;"export package PLATFORM PLATFORM_PACKAGE info env";
"use factory_format function";g=null;f=platform="unknown";d=b.env;if(d){platform=f=d.PLATFORM||d.platform;
g=d.PLATFORM_PACKAGE||d.platformPackage;if(!g&&platform){g="platform/"+platform}}e=b(g).info;
a.PLATFORM=f;a.PLATFORM_PACKAGE=g;a.info=e;a.env=d});tiki.module("tiki/system:mixins/retainable",'var Retainable;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals Retainable */\n\n\n"export package Retainable";\n\n/**\n  Makes an object retainable.  Retainable objects have a retain count you can\n  increment and decrement.  When the retain count reaches zero, the object is\n  destroyed (by calling destroy).  \n  \n  Use this mixin for objects that need to have their memory carefully \n  controlled (such as events).  This also allows you to write objects that\n  are pooled.\n  \n  @since SproutCore 1.1\n*/\nRetainable = {\n  \n  /**\n    Number of objects retaining this object.  When this reaches zero, the\n    object will be destroyed.\n  */\n  retainCount: 1,\n  \n  /**\n    Becomes true when the object is destroyed.\n  */\n  isDestroyed: false,\n  \n  /**\n    Call to retain the object\n    \n    @returns {Object} receiver\n  */\n  retain: function() {\n    this.retainCount++;\n    return this ;\n  },\n  \n  /** \n    Call to release the object.  May cause it to be destroyed.\n    \n    @returns {Object} receiver\n  */\n  release: function() {\n    if (--this.retainCount <= 0) this.__destroy();\n    return this;\n  },\n  \n  __destroy: function() {\n    if (!this.isDestroyed) {\n      this.isDestroyed = true;\n      if (this.destroy) this.destroy();\n    }\n  }\n  \n};\n\n\n;exports.Retainable = Retainable;\n');
tiki.module("tiki/system:package",function(c,b,d){var a;a=c("tiki/system:lib/event");
b.ready=a.ready;b.unload=a.unload;a=c("tiki/system:lib/global");b.global=a.global;
a=c("tiki/system:lib/invocation");b.Invocation=a.Invocation;a=c("tiki/system:lib/logger");
b.Logger=a.Logger;b.console=a.console;a=c("tiki/system:lib/platform");b.PLATFORM=a.PLATFORM;
b.PLATFORM_PACKAGE=a.PLATFORM_PACKAGE;b.info=a.info;b.env=a.env;a=c("tiki/system:mixins/retainable");
b.Retainable=a.Retainable});tiki.script("tiki/system:en/2914de37845aac6a9ada3efb6531c59f9735086e/javascript.js");
tiki.register("sproutcore/runtime",{depends:["tiki/system"],packages:{"tiki/system":{}},scripts:[{url:"/static/sproutcore/runtime/en/1a415d7e025bbaaf9462034aaa4d4e00db320bf1/javascript.js",id:"sproutcore/runtime:en/1a415d7e025bbaaf9462034aaa4d4e00db320bf1/javascript.js"}]});
/* @license
==========================================================================
SproutCore Costello -- Property Observing Library
Copyright ©2006-2009, Sprout Systems, Inc. and contributors.
Portions copyright ©2008-2009 Apple Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com

==========================================================================
@license */
"use modules false";
tiki.module("sproutcore/runtime:core",function(d,e,b){var a=d("tiki/system:package");
var c,i,h,f;"require license";"import tiki/system:package as system";"export package SC SproutCore YES NO";
h=true;f=false;var g="undefined";if(g===typeof console){console=a.console}if(g===typeof sc_require){sc_require=function(){}
}if(g===typeof sc_resource){sc_resource=function(){}}c=i={};c.global=function(j,k){a.global[j]=k;
return c};c.global.remove=function(j){delete a.global[j];return c};c.global("SC",c);
c.mixin=function(){var n=arguments[0]||{};var j=1;var m=arguments.length;var k;if(m===1){n=this||{};
j=0}for(;j<m;j++){if(!(k=arguments[j])){continue}for(var l in k){if(!k.hasOwnProperty(l)){continue
}var o=k[l];if(n===o){continue}if(o!==undefined){n[l]=o}}}return n};c.supplement=function(){var n=arguments[0]||{};
var j=1;var m=arguments.length;var k;if(m===1){n=this||{};j=0}for(;j<m;j++){if(!(k=arguments[j])){continue
}for(var l in k){if(!k.hasOwnProperty(l)){continue}var o=n[l];var p=k[l];if(n===p){continue
}if(p!==undefined&&o===undefined){n[l]=p}}}return n};c.extend=c.mixin;c.mixin({T_ERROR:"error",T_OBJECT:"object",T_NULL:"null",T_CLASS:"class",T_HASH:"hash",T_FUNCTION:"function",T_UNDEFINED:"undefined",T_NUMBER:"number",T_BOOL:"boolean",T_ARRAY:"array",T_STRING:"string",typeOf:function(k){if(k===undefined){return c.T_UNDEFINED
}if(k===null){return c.T_NULL}var j=typeof(k);if(j=="object"){if(k instanceof Array){j=c.T_ARRAY
}else{if(k instanceof Function){j=k.isClass?c.T_CLASS:c.T_FUNCTION}else{if(c.Error&&(k instanceof c.Error)){j=c.T_ERROR
}else{if(k.isObject===true){j=c.T_OBJECT}else{j=c.T_HASH}}}}}else{if(j===c.T_FUNCTION){j=(k.isClass)?c.T_CLASS:c.T_FUNCTION
}}return j},none:function(j){return j===null||j===undefined},empty:function(j){return j===null||j===undefined||j===""
},isArray:function(l){if(l&&l.objectAt){return h}var j=(l?l.length:null),k=c.typeOf(l);
return !(c.none(j)||(k===c.T_FUNCTION)||(k===c.T_STRING)||l.setInterval)},makeArray:function(j){return c.isArray(j)?j:c.A(j)
},A:function(l){if(c.none(l)){return[]}if(l.slice instanceof Function){if(typeof(l)==="string"){return[l]
}else{return l.slice()}}if(l.toArray){return l.toArray()}if(!c.isArray(l)){return[l]
}var k=[],j=l.length;while(--j>=0){k[j]=l[j]}return k},guidKey:"_sc_guid_"+new Date().getTime(),_nextGUID:0,_numberGuids:[],_stringGuids:{},_keyCache:{},guidFor:function(k){if(k===undefined){return"(undefined)"
}if(k===null){return"(null)"}if(k===Object){return"(Object)"}if(k===Array){return"(Array)"
}var j=this.guidKey;if(k[j]){return k[j]}switch(typeof k){case c.T_NUMBER:return(this._numberGuids[k]=this._numberGuids[k]||("nu"+k));
case c.T_STRING:return(this._stringGuids[k]=this._stringGuids[k]||("st"+k));case c.T_BOOL:return(k)?"(true)":"(false)";
default:return c.generateGuid(k)}},keyFor:function(m,l){var k,j=this._keyCache[m];
if(!j){j=this._keyCache[m]={}}k=j[l];if(!k){k=j[l]=m+"_"+l}return k},generateGuid:function(k){var j=("sc"+(this._nextGUID++));
if(k){k[this.guidKey]=j}return j},hashFor:function(j){return(j&&j.hash&&(typeof j.hash===c.T_FUNCTION))?j.hash():this.guidFor(j)
},isEqual:function(k,j){if(k===null){return j===null}else{if(k===undefined){return j===undefined
}else{return this.hashFor(k)===this.hashFor(j)}}},compare:function(s,q){var p=c.typeOf(s);
var n=c.typeOf(q);var t=c.ORDER_DEFINITION.indexOf(p);var k=c.ORDER_DEFINITION.indexOf(n);
if(t<k){return -1}if(t>k){return 1}switch(p){case c.T_BOOL:case c.T_NUMBER:if(s<q){return -1
}if(s>q){return 1}return 0;case c.T_STRING:if(s.localeCompare(q)<0){return -1}if(s.localeCompare(q)>0){return 1
}return 0;case c.T_ARRAY:var m=Math.min(s.length,q.length);var j=0;var o=0;while(j===0&&o<m){j=arguments.callee(s[o],q[o]);
if(j!==0){return j}o++}if(s.length<q.length){return -1}if(s.length>q.length){return 1
}return 0;case c.T_OBJECT:if(s.constructor.isComparable===h){return s.constructor.compare(s,q)
}return 0;default:return 0}},K:function(){return this},EMPTY_ARRAY:[],EMPTY_HASH:{},EMPTY_RANGE:{start:0,length:0},beget:function(l){if(c.none(l)){return null
}var j=c.K;j.prototype=l;var k=new j();j.prototype=null;if(c.typeOf(l.didBeget)===c.T_FUNCTION){k=l.didBeget(k)
}return k},copy:function(k){var j=k;if(k&&k.isCopyable){return k.copy()}switch(c.typeOf(k)){case c.T_ARRAY:if(k.clone&&c.typeOf(k.clone)===c.T_FUNCTION){j=k.clone()
}else{j=k.slice()}break;case c.T_HASH:case c.T_OBJECT:if(k.clone&&c.typeOf(k.clone)===c.T_FUNCTION){j=k.clone()
}else{j={};for(var l in k){j[l]=k[l]}}}return j},merge:function(){var l={},k=arguments.length,j;
for(j=0;j<k;j++){c.mixin(l,arguments[j])}return l},keys:function(l){var j=[];for(var k in l){j.push(k)
}return j},inspect:function(m){var j,k=[];for(var l in m){j=m[l];if(j==="toString"){continue
}if(c.typeOf(j)===c.T_FUNCTION){j="function() { ... }"}k.push(l+": "+j)}return"{"+k.join(" , ")+"}"
},tupleForPropertyPath:function(n,j){if(c.typeOf(n)===c.T_ARRAY){return n}var l;var k=n.indexOf("*");
if(k<0){k=n.lastIndexOf(".")}l=(k>=0)?n.slice(k+1):n;var m=this.objectForPropertyPath(n,j,k);
return(m&&l)?[m,l]:null},objectForPropertyPath:function(o,l,m){var p,k,n,j;if(!l){l=a.global
}if(c.typeOf(o)===c.T_STRING){if(m===undefined){m=o.length}p=0;while((l)&&(p<m)){k=o.indexOf(".",p);
if((k<0)||(k>m)){k=m}n=o.slice(p,k);l=l.get?l.get(n):l[n];p=k+1}if(p<m){l=undefined
}}else{p=0;j=o.length;n=null;while((p<j)&&l){n=o[p++];if(n){l=(l.get)?l.get(n):l[n]
}}if(p<j){l=undefined}}return l},STRINGS:{},stringsFor:function(k,j){c.mixin(c.STRINGS,j);
return this}});c.clone=c.copy;c.$A=c.A;c.didLoad=c.K;c.ORDER_DEFINITION=[c.T_ERROR,c.T_UNDEFINED,c.T_NULL,c.T_BOOL,c.T_NUMBER,c.T_STRING,c.T_ARRAY,c.T_HASH,c.T_OBJECT,c.T_FUNCTION,c.T_CLASS];
c.mixin(Function.prototype,{property:function(){this.dependentKeys=c.$A(arguments);
var j=c.guidFor(this);this.cacheKey="__cache__"+j;this.lastSetValueKey="__lastValue__"+j;
this.isProperty=h;return this},cacheable:function(j){this.isProperty=h;if(!this.dependentKeys){this.dependentKeys=[]
}this.isCacheable=(j===undefined)?h:j;return this},idempotent:function(j){this.isProperty=h;
if(!this.dependentKeys){this.dependentKeys=[]}this.isVolatile=(j===undefined)?h:j;
return this},observes:function(j){var n=arguments.length,k=null,m=null;while(--n>=0){var l=arguments[n];
if((l.indexOf(".")<0)&&(l.indexOf("*")<0)){if(!k){k=this.localPropertyPaths=[]}k.push(l)
}else{if(!m){m=this.propertyPaths=[]}m.push(l)}}return this}});String.prototype.fmt=function(){var k=arguments;
var j=0;return this.replace(/%@([0-9]+)?/g,function(l,m){m=(m)?parseInt(m,0)-1:j++;
l=k[m];return((l===null)?"(null)":(l===undefined)?"":l).toString()})};String.prototype.loc=function(){var j=c.STRINGS[this]||this;
return j.fmt.apply(j,arguments)};String.prototype.w=function(){var l=[],m=this.split(" "),k=m.length;
for(var j=0;j<k;++j){var n=m[j];if(n.length!==0){l.push(n)}}return l};e.SC=c;e.SproutCore=i;
e.YES=h;e.NO=f});tiki.module("sproutcore/runtime:mixins/array",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:mixins/observable");c("sproutcore/runtime:mixins/enumerable");
c("sproutcore/runtime:system/range_observer");"import core";"import mixins/observable";
"import mixins/enumerable";"import system/range_observer";"export package";h.OUT_OF_RANGE_EXCEPTION="Index out of range";
h.Array={isSCArray:e,replace:function(i,k,j){throw"replace() must be implemented to support SC.Array"
},objectAt:function(i){if(i<0){return undefined}if(i>=this.get("length")){return undefined
}return this.get(i)},"[]":function(i,j){if(j!==undefined){this.replace(0,this.get("length"),j)
}return this}.property(),insertAt:function(i,j){if(i>this.get("length")){throw h.OUT_OF_RANGE_EXCEPTION
}this.replace(i,0,[j]);return this},removeAt:function(l,i){var k=0,j=[];if(typeof l===h.T_NUMBER){if((l<0)||(l>=this.get("length"))){throw h.OUT_OF_RANGE_EXCEPTION
}if(i===undefined){this.replace(l,1,j);return this}else{l=h.IndexSet.create(l,i)}}this.beginPropertyChanges();
l.forEachRange(function(n,m){n-=k;k+=m;this.replace(n,m,j)},this);this.endPropertyChanges();
return this},removeObject:function(j){var k=this.get("length")||0;while(--k>=0){var i=this.objectAt(k);
if(i==j){this.removeAt(k)}}return this},removeObjects:function(i){this.beginPropertyChanges();
i.forEach(function(j){this.removeObject(j)},this);this.endPropertyChanges();return this
},pushObject:function(i){this.insertAt(this.get("length"),i);return i},pushObjects:function(i){this.beginPropertyChanges();
i.forEach(function(j){this.pushObject(j)},this);this.endPropertyChanges();return this
},popObject:function(){var i=this.get("length");if(i===0){return undefined}var j=this.objectAt(i-1);
this.removeAt(i-1);return j},shiftObject:function(){if(this.get("length")===0){return undefined
}var i=this.objectAt(0);this.removeAt(0);return i},unshiftObject:function(i){this.insertAt(0,i);
return i},unshiftObjects:function(i){this.beginPropertyChanges();i.forEach(function(j){this.unshiftObject(j)
},this);this.endPropertyChanges();return this},isEqual:function(i){if(!i){return false
}if(i==this){return true}var j=i.get("length");if(j!=this.get("length")){return false
}while(--j>=0){if(!h.isEqual(i.objectAt(j),this.objectAt(j))){return false}}return true
},compact:function(){return this.without(null)},without:function(j){if(this.indexOf(j)<0){return this
}var i=[];this.forEach(function(l){if(l!==j){i[i.length]=l}});return i},uniq:function(){var i=[];
this.forEach(function(j){if(i.indexOf(j)<0){i[i.length]=j}});return i},rangeObserverClass:h.RangeObserver,addRangeObserver:function(l,n,p,m){var i=this._array_rangeObservers;
if(!i){i=this._array_rangeObservers=h.CoreSet.create()}var o=this.rangeObserverClass;
var j=g;var k=o.create(this,l,n,p,m,j);i.add(k);if(!this._array_isNotifyingRangeObservers){this._array_isNotifyingRangeObservers=e;
this.addObserver("[]",this,this._array_notifyRangeObservers)}return k},updateRangeObserver:function(j,i){return j.update(this,i)
},removeRangeObserver:function(k){var j=k.destroy(this);var i=this._array_rangeObservers;
if(i){i.remove(k)}return j},enumerableContentDidChange:function(p,o,n){var i=this._array_rangeObservers,l=this._array_oldLength,m,k,j;
this.beginPropertyChanges();this.notifyPropertyChange("length");if(i&&i.length>0){if(l===undefined){l=0
}this._array_oldLength=m=this.get("length");if(p===undefined){p=0}if(n===undefined){n=m-l
}if(n!==0||o===undefined){k=m-p;if(n<0){k-=n}}else{k=o}j=this._array_rangeChanges;
if(!j){j=this._array_rangeChanges=h.IndexSet.create()}j.add(p,k)}this.notifyPropertyChange("[]");
this.endPropertyChanges();return this},_array_notifyRangeObservers:function(){var k=this._array_rangeObservers,l=this._array_rangeChanges,j=k?k.length:0,i,m;
if(j>0&&l&&l.length>0){for(i=0;i<j;i++){k[i].rangeDidChange(l)}l.clear()}}};h.mixin(Array.prototype,h.Array);
h.Array=h.mixin({},h.Enumerable,h.Array);h.Array.slice=function(j,l){var i=[];var k=this.get("length");
if(h.none(j)){j=0}if(h.none(l)||(l>k)){l=k}while(j<l){i[i.length]=this.objectAt(j++)
}return i};h.Array.indexOf=function(l,k){var j,i=this.get("length");if(k===undefined){k=0
}else{k=(k<0)?Math.ceil(k):Math.floor(k)}if(k<0){k+=i}for(j=k;j<i;j++){if(this.objectAt(j)===l){return j
}}return -1};if(!Array.prototype.indexOf){Array.prototype.indexOf=h.Array.indexOf
}h.Array.lastIndexOf=function(l,k){var j,i=this.get("length");if(k===undefined){k=i-1
}else{k=(k<0)?Math.ceil(k):Math.floor(k)}if(k<0){k+=i}for(j=k;j>=0;j--){if(this.objectAt(j)===l){return j
}}return -1};if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=h.Array.lastIndexOf
}(function(){h.mixin(Array.prototype,{replace:function(l,o,n){if(this.isFrozen){throw h.FROZEN_ERROR
}if(!n||n.length===0){this.splice(l,o)}else{var m=[l,o].concat(n);this.splice.apply(this,m)
}var k=n?(n.get?n.get("length"):n.length):0;this.enumerableContentDidChange(l,o,k-o);
return this},unknownProperty:function(l,m){var k=this.reducedProperty(l,m);if((m!==undefined)&&k===undefined){k=this[l]=m
}return k}});var j=Array.prototype.indexOf;if(!j||(j===h.Array.indexOf)){Array.prototype.indexOf=function(n,m){var l,k=this.length;
if(m===undefined){m=0}else{m=(m<0)?Math.ceil(m):Math.floor(m)}if(m<0){m+=k}for(l=m;
l<k;l++){if(this[l]===n){return l}}return -1}}var i=Array.prototype.lastIndexOf;if(!i||(i===h.Array.lastIndexOf)){Array.prototype.lastIndexOf=function(n,m){var l,k=this.length;
if(m===undefined){m=k-1}else{m=(m<0)?Math.ceil(m):Math.floor(m)}if(m<0){m+=k}for(l=m;
l>=0;l--){if(this[l]===n){return l}}return -1}}})()});tiki.module("sproutcore/runtime:mixins/comparable",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";"export package";h.Comparable={isComparable:e,compare:function(j,i){throw"%@.compare() is not implemented".fmt(this.toString())
}}});tiki.module("sproutcore/runtime:mixins/copyable",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";"export package";h.Copyable={isCopyable:e,copy:function(){throw"%@.copy() is not implemented"
},frozenCopy:function(){var i=this.get?this.get("isFrozen"):this.isFrozen;if(i===e){return this
}else{if(i===undefined){throw"%@ does not support freezing"}else{return this.copy().freeze()
}}}};h.mixin(Array.prototype,h.Copyable);Array.prototype.copy=Array.prototype.slice
});tiki.module("sproutcore/runtime:mixins/delegate_support",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";"export package";h.DelegateSupport={delegateFor:function(k){var j=1,i=arguments.length,l;
while(j<i){l=arguments[j];if(l&&l[k]!==undefined){return l}j++}return(this[k]!==undefined)?this:null
},invokeDelegateMethod:function(k,i,j){j=h.A(arguments);j=j.slice(2,j.length);if(!k||!k[i]){k=this
}var l=k[i];return l?l.apply(k,j):null},getDelegateProperty:function(l,m){var j=1,i=arguments.length,k;
while(j<i){k=arguments[j++];if(k&&k[l]!==undefined){return k.get?k.get(l):k[l]}}return(this[l]!==undefined)?this.get(l):undefined
}}});tiki.module("sproutcore/runtime:mixins/enumerable",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:system/enumerator");"import core";"import system/enumerator";
"export package";h.Enumerable={isEnumerable:e,nextObject:function(i,k,j){return this.objectAt?this.objectAt(i):this[i]
},firstObject:function(){if(this.get("length")===0){return undefined}if(this.objectAt){return this.objectAt(0)
}var j=h.Enumerator._popContext(),i;i=this.nextObject(0,null,j);j=h.Enumerator._pushContext(j);
return i}.property(),enumerator:function(){return h.Enumerator.create(this)},forEach:function(o,n){if(typeof o!=="function"){throw new TypeError()
}var j=this.get?this.get("length"):this.length;if(n===undefined){n=null}var m=null;
var k=h.Enumerator._popContext();for(var i=0;i<j;i++){var l=this.nextObject(i,m,k);
o.call(n,l,i,this);m=l}m=null;k=h.Enumerator._pushContext(k);return this},getEach:function(i){return this.map(function(j){return j?(j.get?j.get(i):j[i]):null
},this)},setEach:function(i,j){this.forEach(function(k){if(k){if(k.set){k.set(i,j)
}else{k[i]=j}}},this);return this},map:function(p,o){if(typeof p!=="function"){throw new TypeError()
}var j=this.get?this.get("length"):this.length;if(o===undefined){o=null}var k=[];
var n=null;var l=h.Enumerator._popContext();for(var i=0;i<j;i++){var m=this.nextObject(i,n,l);
k[i]=p.call(o,m,i,this);n=m}n=null;l=h.Enumerator._pushContext(l);return k},mapProperty:function(i){return this.map(function(j){return j?(j.get?j.get(i):j[i]):null
})},filter:function(p,o){if(typeof p!=="function"){throw new TypeError()}var j=this.get?this.get("length"):this.length;
if(o===undefined){o=null}var k=[];var n=null;var l=h.Enumerator._popContext();for(var i=0;
i<j;i++){var m=this.nextObject(i,n,l);if(p.call(o,m,i,this)){k.push(m)}n=m}n=null;
l=h.Enumerator._pushContext(l);return k},sortProperty:function(j){var k=(typeof j===h.T_STRING)?arguments:j,i=k.length,l;
if(this instanceof Array){l=this}else{l=[];this.forEach(function(m){l.push(m)})}if(!l){return[]
}return l.sort(function(o,n){var m,q,s,r,p=0;for(m=0;p===0&&m<i;m++){q=k[m];s=o?(o.get?o.get(q):o[q]):null;
r=n?(n.get?n.get(q):n[q]):null;p=h.compare(s,r)}return p})},filterProperty:function(r,n){var l=this.get?this.get("length"):this.length;
var m=[];var q=null;var j=h.Enumerator._popContext();for(var o=0;o<l;o++){var k=this.nextObject(o,q,j);
var p=k?(k.get?k.get(r):k[r]):null;var i=(n===undefined)?!!p:h.isEqual(p,n);if(i){m.push(k)
}q=k}q=null;j=h.Enumerator._pushContext(j);return m},find:function(p,l){if(typeof p!=="function"){throw new TypeError()
}var k=this.get?this.get("length"):this.length;if(l===undefined){l=null}var o=null,j,q=g,m=null;
var i=h.Enumerator._popContext();for(var n=0;n<k&&!q;n++){j=this.nextObject(n,o,i);
if(q=p.call(l,j,n,this)){m=j}o=j}j=o=null;i=h.Enumerator._pushContext(i);return m
},findProperty:function(q,n){var k=this.get?this.get("length"):this.length;var r=g,l=null,p=null,j,o;
var i=h.Enumerator._popContext();for(var m=0;m<k&&!r;m++){j=this.nextObject(m,p,i);
o=j?(j.get?j.get(q):j[q]):null;r=(n===undefined)?!!o:h.isEqual(o,n);if(r){l=j}p=j
}p=j=null;i=h.Enumerator._pushContext(i);return l},every:function(p,o){if(typeof p!=="function"){throw new TypeError()
}var j=this.get?this.get("length"):this.length;if(o===undefined){o=null}var k=e;var n=null;
var l=h.Enumerator._popContext();for(var i=0;k&&(i<j);i++){var m=this.nextObject(i,n,l);
if(!p.call(o,m,i,this)){k=g}n=m}n=null;l=h.Enumerator._pushContext(l);return k},everyProperty:function(q,m){var k=this.get?this.get("length"):this.length;
var l=e;var p=null;var i=h.Enumerator._popContext();for(var n=0;l&&(n<k);n++){var j=this.nextObject(n,p,i);
var o=j?(j.get?j.get(q):j[q]):null;l=(m===undefined)?!!o:h.isEqual(o,m);p=j}p=null;
i=h.Enumerator._pushContext(i);return l},some:function(p,o){if(typeof p!=="function"){throw new TypeError()
}var j=this.get?this.get("length"):this.length;if(o===undefined){o=null}var k=g;var n=null;
var l=h.Enumerator._popContext();for(var i=0;(!k)&&(i<j);i++){var m=this.nextObject(i,n,l);
if(p.call(o,m,i,this)){k=e}n=m}n=null;l=h.Enumerator._pushContext(l);return k},someProperty:function(q,m){var k=this.get?this.get("length"):this.length;
var l=g;var p=null;var i=h.Enumerator._popContext();for(var n=0;!l&&(n<k);n++){var j=this.nextObject(n,p,i);
var o=j?(j.get?j.get(q):j[q]):null;l=(m===undefined)?!!o:h.isEqual(o,m);p=j}p=null;
i=h.Enumerator._pushContext(i);return l},reduce:function(o,p,q){if(typeof o!=="function"){throw new TypeError()
}var k=this.get?this.get("length"):this.length;if(k===0&&p===undefined){throw new TypeError()
}var l=p;var n=null;var i=h.Enumerator._popContext();for(var m=0;m<k;m++){var j=this.nextObject(m,n,i);
if(j!==null){if(l===undefined){l=j}else{l=o.call(null,l,j,m,this,q)}}n=j}n=null;i=h.Enumerator._pushContext(i);
if(l===undefined){throw new TypeError()}return l},invoke:function(p){var m=this.get?this.get("length"):this.length;
if(m<=0){return[]}var q;var o=[];var k=arguments.length;if(k>1){for(q=1;q<k;q++){o.push(arguments[q])
}}var n=[];var r=null;var j=h.Enumerator._popContext();for(q=0;q<m;q++){var l=this.nextObject(q,r,j);
var i=l?l[p]:null;if(i){n[q]=i.apply(l,o)}r=l}r=null;j=h.Enumerator._pushContext(j);
return n},invokeWhile:function(l,q){var n=this.get?this.get("length"):this.length;
if(n<=0){return null}var r;var p=[];var k=arguments.length;if(k>2){for(r=2;r<k;r++){p.push(arguments[r])
}}var o=l;var s=null;var j=h.Enumerator._popContext();for(r=0;(o===l)&&(r<n);r++){var m=this.nextObject(r,s,j);
var i=m?m[q]:null;if(i){o=i.apply(m,p)}s=m}s=null;j=h.Enumerator._pushContext(j);
return o},toArray:function(){var i=[];this.forEach(function(j){i.push(j)},this);return i
}};h._buildReducerFor=function(i,j){return function(l,m){var n=this[i];if(h.typeOf(n)!==h.T_FUNCTION){return this.unknownProperty?this.unknownProperty(l,m):null
}else{var k=h.Enumerable.reduce.call(this,n,null,j);return k}}.property("[]")};h.Reducers={"[]":function(i,j){return this
}.property(),enumerableContentDidChange:function(j,i){this.notifyPropertyChange("[]");
return this},reducedProperty:function(r,o,n){if(!r||r.charAt(0)!=="@"){return undefined
}var l=r.match(/^@([^(]*)(\(([^)]*)\))?$/);if(!l||l.length<2){return undefined}var q=l[1];
var s=l[3];q="reduce"+q.slice(0,1).toUpperCase()+q.slice(1);var i=this[q];if(h.typeOf(i)!==h.T_FUNCTION){return undefined
}if(n===g){return h.Enumerable.reduce.call(this,i,null,s)}var k=h._buildReducerFor(q,s);
var j=this.constructor.prototype;if(j){j[r]=k;var m=j._properties||[];m.push(r);j._properties=m;
this.registerDependentKey(r,"[]")}return h.Enumerable.reduce.call(this,i,null,s)},reduceMax:function(i,l,j,m,k){if(k&&l){l=l.get?l.get(k):l[k]
}if(i===null){return l}return(l>i)?l:i},reduceMaxObject:function(j,m,k,n,l){var i=j,o=m;
if(l){if(m){o=m.get?m.get(l):m[l]}if(j){i=j.get?j.get(l):j[l]}}if(i===null){return m
}return(o>i)?m:j},reduceMin:function(i,l,j,m,k){if(k&&l){l=l.get?l.get(k):l[k]}if(i===null){return l
}return(l<i)?l:i},reduceMinObject:function(j,m,k,n,l){var i=j,o=m;if(l){if(m){o=m.get?m.get(l):m[l]
}if(j){i=j.get?j.get(l):j[l]}}if(i===null){return m}return(o<i)?m:j},reduceAverage:function(j,n,l,o,m){if(m&&n){n=n.get?n.get(m):n[m]
}var k=(j||0)+n;var i=o.get?o.get("length"):o.length;if(l>=i-1){k=k/i}return k},reduceSum:function(i,l,j,m,k){if(k&&l){l=l.get?l.get(k):l[k]
}return(i===null)?l:i+l}};h.mixin(h.Enumerable,h.Reducers);h.mixin(Array.prototype,h.Reducers);
Array.prototype.isEnumerable=e;(function(){var i={nextObject:h.Enumerable.nextObject,enumerator:h.Enumerable.enumerator,firstObject:h.Enumerable.firstObject,sortProperty:h.Enumerable.sortProperty,mapProperty:function(o){var m=this.length;
var n=[];for(var l=0;l<m;l++){var p=this[l];n[l]=p?(p.get?p.get(o):p[o]):null}return n
},filterProperty:function(p,r){var n=this.length;var o=[];for(var m=0;m<n;m++){var q=this[m];
var s=q?(q.get?q.get(p):q[p]):null;var l=(r===undefined)?!!s:h.isEqual(s,r);if(l){o.push(q)
}}return o},find:function(r,q){if(typeof r!=="function"){throw new TypeError()}var m=this.length;
if(q===undefined){q=null}var o,n=null,p=g;for(var l=0;l<m&&!p;l++){o=this[l];if(p=r.call(q,o,l,this)){n=o
}}o=null;return n},findProperty:function(o,r){var m=this.length;var p,s,q=g,n=null;
for(var l=0;l<m&&!q;l++){s=(p=this[l])?(p.get?p.get(o):p[o]):null;q=(r===undefined)?!!s:h.isEqual(s,r);
if(q){n=p}}p=null;return n},everyProperty:function(o,q){var m=this.length;var n=e;
for(var l=0;n&&(l<m);l++){var p=this[l];var r=p?(p.get?p.get(o):p[o]):null;n=(q===undefined)?!!r:h.isEqual(r,q)
}return n},someProperty:function(o,q){var m=this.length;var n=g;for(var l=0;!n&&(l<m);
l++){var p=this[l];var r=p?(p.get?p.get(o):p[o]):null;n=(q===undefined)?!!r:h.isEqual(r,q)
}return n},invoke:function(n){var m=this.length;if(m<=0){return[]}var l;var p=[];
var r=arguments.length;if(r>1){for(l=1;l<r;l++){p.push(arguments[l])}}var o=[];for(l=0;
l<m;l++){var q=this[l];var s=q?q[n]:null;if(s){o[l]=s.apply(q,p)}}return o},invokeWhile:function(n,s){var p=this.length;
if(p<=0){return null}var t;var r=[];var m=arguments.length;if(m>2){for(t=2;t<m;t++){r.push(arguments[t])
}}var q=n;for(t=0;(q===n)&&(t<p);t++){var o=this[t];var l=o?o[s]:null;if(l){q=l.apply(o,r)
}}return q},toArray:function(){var m=this.length;if(m<=0){return[]}var n=[];for(var l=0;
l<m;l++){var o=this[l];n.push(o)}return n},getEach:function(o){var n=[];var m=this.length;
for(var l=0;l<m;l++){var p=this[l];n[l]=p?(p.get?p.get(o):p[o]):null}return n},setEach:function(n,o){var m=this.length;
for(var l=0;l<m;l++){var p=this[l];if(p){if(p.set){p.set(n,o)}else{p[n]=o}}}return this
}};var k={forEach:function(p,o){if(typeof p!=="function"){throw new TypeError()}var m=this.length;
if(o===undefined){o=null}for(var l=0;l<m;l++){var n=this[l];p.call(o,n,l,this)}return this
},map:function(q,p){if(typeof q!=="function"){throw new TypeError()}var m=this.length;
if(p===undefined){p=null}var n=[];for(var l=0;l<m;l++){var o=this[l];n[l]=q.call(p,o,l,this)
}return n},filter:function(q,p){if(typeof q!=="function"){throw new TypeError()}var m=this.length;
if(p===undefined){p=null}var n=[];for(var l=0;l<m;l++){var o=this[l];if(q.call(p,o,l,this)){n.push(o)
}}return n},every:function(q,p){if(typeof q!=="function"){throw new TypeError()}var m=this.length;
if(p===undefined){p=null}var n=e;for(var l=0;n&&(l<m);l++){var o=this[l];if(!q.call(p,o,l,this)){n=g
}}return n},some:function(q,p){if(typeof q!=="function"){throw new TypeError()}var m=this.length;
if(p===undefined){p=null}var n=g;for(var l=0;(!n)&&(l<m);l++){var o=this[l];if(q.call(p,o,l,this)){n=e
}}return n},reduce:function(r,n,q){if(typeof r!=="function"){throw new TypeError()
}var m=this.length;if(m===0&&n===undefined){throw new TypeError()}var o=n;for(var l=0;
l<m;l++){var p=this[l];if(p!==null){if(o===undefined){o=p}else{o=r.call(null,o,p,l,this,q)
}}}if(o===undefined){throw new TypeError()}return o}};for(var j in k){if(!k.hasOwnProperty(j)){continue
}if(!Array.prototype[j]||((typeof Prototype==="object")&&Prototype.Version.match(/^1\.6/))){Array.prototype[j]=k[j]
}}h.mixin(Array.prototype,i)})()});tiki.module("sproutcore/runtime:mixins/freezable",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";"export package";h.FROZEN_ERROR=new Error("Cannot modify a frozen object");
h.Freezable={isFreezable:e,isFrozen:g,freeze:function(){if(this.set){this.set("isFrozen",e)
}else{this.isFrozen=e}return this}};h.mixin(Array.prototype,h.Freezable)});tiki.module("sproutcore/runtime:mixins/observable",function(d,e,b){var a=d("sproutcore/runtime:core"),c=a.SC,j=a.SproutCore,i=a.YES,f=a.NO;
d("sproutcore/runtime:private/observer_set");d("sproutcore/runtime:private/chain_observer");
"import core";"import private/observer_set";"import private/chain_observer";"export package";
var h=false;c.LOG_OBSERVERS=f;c.Observable={isObservable:i,automaticallyNotifiesObserversFor:function(k){return i
},get:function(m){var l=this[m],k;if(l===undefined){return this.unknownProperty(m)
}else{if(l&&l.isProperty){if(l.isCacheable){k=this._kvo_cache;if(!k){k=this._kvo_cache={}
}return(k[l.cacheKey]!==undefined)?k[l.cacheKey]:(k[l.cacheKey]=l.call(this,m))}else{return l.call(this,m)
}}else{return l}}},set:function(r,p){var l=this[r],s=this.automaticallyNotifiesObserversFor(r),o=p,m,k,q,n;
if(this._kvo_cacheable&&(k=this._kvo_cache)){m=this._kvo_cachedep;if(!m||(m=m[r])===undefined){m=this._kvo_computeCachedDependentsFor(r)
}if(m){q=m.length;while(--q>=0){n=m[q];k[n.cacheKey]=k[n.lastSetValueKey]=undefined
}}}if(l&&l.isProperty){k=this._kvo_cache;if(l.isVolatile||!k||(k[l.lastSetValueKey]!==p)){if(!k){k=this._kvo_cache={}
}k[l.lastSetValueKey]=p;if(s){this.propertyWillChange(r)}o=l.call(this,r,p);if(l.isCacheable){k[l.cacheKey]=o
}if(s){this.propertyDidChange(r,o,i)}}}else{if(l===undefined){if(s){this.propertyWillChange(r)
}this.unknownProperty(r,p);if(s){this.propertyDidChange(r,o)}}else{if(this[r]!==p){if(s){this.propertyWillChange(r)
}o=this[r]=p;if(s){this.propertyDidChange(r,o)}}}}return this},unknownProperty:function(k,l){if(!(l===undefined)){this[k]=l
}return l},beginPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
return this},endPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
var l=this._kvo_changeLevel,k=this._kvo_changes;if((l<=0)&&k&&(k.length>0)&&!c.Observers.isObservingSuspended){this._notifyPropertyObservers()
}return this},propertyWillChange:function(k){return this},propertyDidChange:function(v,t,m){this._kvo_revision=(this._kvo_revision||0)+1;
var l=this._kvo_changeLevel||0,q,u,r,k,n,p=c.LOG_OBSERVERS&&!(this.LOG_OBSERVING===f);
if(this._kvo_cacheable&&(k=this._kvo_cache)){if(!m){n=this[v];if(n&&n.isProperty){k[n.cacheKey]=k[n.lastSetValueKey]=undefined
}}q=this._kvo_cachedep;if(!q||(q=q[v])===undefined){q=this._kvo_computeCachedDependentsFor(v)
}if(q){u=q.length;while(--u>=0){r=q[u];k[r.cacheKey]=k[r.lastSetValueKey]=undefined
}}}var o=c.Observers.isObservingSuspended;if((l>0)||o){var s=this._kvo_changes;if(!s){s=this._kvo_changes=c.CoreSet.create()
}s.add(v);if(o){if(p){console.log("%@%@: will not notify observers because observing is suspended".fmt(c.KVO_SPACES,this))
}c.Observers.objectHasPendingChanges(this)}}else{this._notifyPropertyObservers(v)
}return this},registerDependentKey:function(r,m){var o=this._kvo_dependents,l=this[r],s,q,k,p,n;
if(c.typeOf(m)===c.T_ARRAY){s=m;k=0}else{s=arguments;k=1}q=s.length;if(!o){this._kvo_dependents=o={}
}while(--q>=k){p=s[q];n=o[p];if(!n){n=o[p]=[]}n.push(r)}},_kvo_addCachedDependents:function(l,p,r,m){var k=p.length,o,n,q;
while(--k>=0){n=p[k];m.add(n);o=this[n];if(o&&(o instanceof Function)&&o.isProperty){if(o.isCacheable){l.push(o)
}if((q=r[n])&&q.length>0){this._kvo_addCachedDependents(l,q,r,m)}}}},_kvo_computeCachedDependentsFor:function(m){var n=this._kvo_cachedep,p=this._kvo_dependents,o=p?p[m]:null,k,l;
if(!n){n=this._kvo_cachedep={}}if(!o||o.length===0){return n[m]=null}k=n[m]=[];l=c._TMP_SEEN_SET=(c._TMP_SEEN_SET||c.CoreSet.create());
l.add(m);this._kvo_addCachedDependents(k,o,p,l);l.clear();if(k.length===0){k=n[m]=null
}return k},_kvo_for:function(m,l){var k=this[m];if(!this._kvo_cloned){this._kvo_cloned={}
}if(!k){k=this[m]=(l===undefined)?[]:l.create();this._kvo_cloned[m]=i}else{if(!this._kvo_cloned[m]){k=this[m]=k.copy();
this._kvo_cloned[m]=i}}return k},addObserver:function(m,p,r,l){var n,k,o,q;if(r===undefined){r=p;
p=this}if(!p){p=this}if(c.typeOf(r)===c.T_STRING){r=p[r]}if(!r){throw"You must pass a method to addObserver()"
}m=m.toString();if(m.indexOf(".")>=0){k=c._ChainObserver.createChain(this,m,p,r,l);
k.masterTarget=p;k.masterMethod=r;this._kvo_for(c.keyFor("_kvo_chains",m)).push(k)
}else{if((this[m]===undefined)&&(m.indexOf("@")===0)){this.get(m)}if(p===this){p=null
}n=c.keyFor("_kvo_observers",m);this._kvo_for(n,c.ObserverSet).add(p,r,l);this._kvo_for("_kvo_observed_keys",c.CoreSet).add(m)
}if(this.didAddObserver){this.didAddObserver(m,p,r)}return this},removeObserver:function(m,p,r){var n,o,l,q,k;
if(r===undefined){r=p;p=this}if(!p){p=this}if(c.typeOf(r)===c.T_STRING){r=p[r]}if(!r){throw"You must pass a method to addObserver()"
}m=m.toString();if(m.indexOf(".")>=0){n=c.keyFor("_kvo_chains",m);if(o=this[n]){o=this._kvo_for(n);
k=o.length;while(--k>=0){l=o[k];if(l&&(l.masterTarget===p)&&(l.masterMethod===r)){o[k]=l.destroyChain()
}}}}else{if(p===this){p=null}n=c.keyFor("_kvo_observers",m);if(q=this[n]){q=this._kvo_for(n);
q.remove(p,r);if(q.targets<=0){this._kvo_for("_kvo_observed_keys",c.CoreSet).remove(m)
}}}if(this.didRemoveObserver){this.didRemoveObserver(m,p,r)}return this},hasObserverFor:function(l){c.Observers.flush(this);
var n=this[c.keyFor("_kvo_observers",l)],m=this[c.keyFor("_kvo_local",l)],k;if(m&&m.length>0){return i
}if(n&&n.getMembers().length>0){return i}return f},initObservable:function(){if(this._observableInited){return
}this._observableInited=i;if(!h){h=i;d("sproutcore/runtime:system/binding");d("sproutcore/runtime:private/observer_queue")
}var o,v,t,s,q,n,u;if(v=this._observers){var p=v.length;for(o=0;o<p;o++){t=v[o];q=this[t];
n=q.propertyPaths;u=(n)?n.length:0;for(var l=0;l<u;l++){var w=n[l];var k=w.indexOf(".");
if(k<0){this.addObserver(w,this,q)}else{if(w.indexOf("*")===0){this.addObserver(w.slice(1),this,q)
}else{var r=null;if(k===0){r=this;w=w.slice(1)}else{if(k===4&&w.slice(0,5)==="this."){r=this;
w=w.slice(5)}else{if(k<0&&w.length===4&&w==="this"){r=this;w=""}}}c.Observers.addObserver(w,this,q,r)
}}}}}this.bindings=[];if(v=this._bindings){for(o=0;o<v.length;o++){t=v[o];s=this[t];
var m=t.slice(0,-7);this[t]=this.bind(m,s)}}if(v=this._properties){for(o=0;o<v.length;
o++){t=v[o];if(s=this[t]){if(s.isCacheable){this._kvo_cacheable=i}if(s.dependentKeys&&(s.dependentKeys.length>0)){this.registerDependentKey(t,s.dependentKeys)
}}}}},observersForKey:function(k){var l=this._kvo_for("_kvo_observers",k);return l.getMembers()||[]
},_notifyPropertyObservers:function(D){if(!this._observableInited){this.initObservable()
}c.Observers.flush(this);var q=c.LOG_OBSERVERS&&!(this.LOG_OBSERVING===f);var y,B,w,n,x,v,A;
var z,t,k,p,C,m,s,o;var l,r,u;if(q){r=c.KVO_SPACES=(c.KVO_SPACES||"")+"  ";console.log('%@%@: notifying observers after change to key "%@"'.fmt(r,this,D))
}n=this["_kvo_observers_*"];this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;while(((B=this._kvo_changes)&&(B.length>0))||D){A=++this.propertyRevision;
if(!B){B=c.CoreSet.create()}this._kvo_changes=null;if(D==="*"){B.add("*");B.addEach(this._kvo_for("_kvo_observed_keys",c.CoreSet))
}else{if(D){B.add(D)}}if(w=this._kvo_dependents){for(x=0;x<B.length;x++){D=B[x];v=w[D];
if(v&&(s=v.length)){if(q){console.log("%@...including dependent keys for %@: %@".fmt(r,D,v))
}u=this._kvo_cache;if(!u){u=this._kvo_cache={}}while(--s>=0){B.add(D=v[s]);if(o=this[D]){this[o.cacheKey]=undefined;
u[o.cacheKey]=u[o.lastSetValueKey]=undefined}}}}}while(B.length>0){D=B.pop();y=this[c.keyFor("_kvo_observers",D)];
if(y){z=y.getMembers();t=z.length;for(p=0;p<t;p++){k=z[p];if(k[3]===A){continue}C=k[0]||this;
m=k[1];l=k[2];k[3]=A;if(q){console.log('%@...firing observer on %@ for key "%@"'.fmt(r,C,D))
}if(l!==undefined){m.call(C,this,D,null,l,A)}else{m.call(C,this,D,null,A)}}}z=this[c.keyFor("_kvo_local",D)];
if(z){t=z.length;for(p=0;p<t;p++){k=z[p];m=this[k];if(m){if(q){console.log('%@...firing local observer %@.%@ for key "%@"'.fmt(r,this,k,D))
}m.call(this,this,D,null,A)}}}if(n&&D!=="*"){z=n.getMembers();t=z.length;for(p=0;
p<t;p++){k=z[p];C=k[0]||this;m=k[1];l=k[2];if(q){console.log('%@...firing * observer on %@ for key "%@"'.fmt(r,C,D))
}if(l!==undefined){m.call(C,this,D,null,l,A)}else{m.call(C,this,D,null,A)}}}if(this.propertyObserver){if(q){console.log('%@...firing %@.propertyObserver for key "%@"'.fmt(r,this,D))
}this.propertyObserver(this,D,null,A)}}if(B){B.destroy()}D=null}this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
if(q){c.KVO_SPACES=r.slice(0,-2)}return i},bind:function(k,m,o){var n;if(o!==undefined){m=[m,o]
}var l=c.typeOf(m);if(l===c.T_STRING||l===c.T_ARRAY){n=this[k+"BindingDefault"]||c.Binding;
n=n.beget().from(m)}else{n=m}n=n.to(k,this).connect();this.bindings.push(n);return n
},didChangeFor:function(k){k=c.hashFor(k);var l=this._kvo_didChange_valueCache;if(!l){l=this._kvo_didChange_valueCache={}
}var p=this._kvo_didChange_revisionCache;if(!p){p=this._kvo_didChange_revisionCache={}
}var o=l[k]||{};var t=p[k]||{};var n=false;var m=this._kvo_revision||0;var r=arguments.length;
while(--r>=1){var s=arguments[r];if(t[s]!=m){var q=this.get(s);if(o[s]!==q){n=true;
o[s]=q}}t[s]=m}l[k]=o;p[k]=t;return n},setIfChanged:function(k,l){return(this.get(k)!==l)?this.set(k,l):this
},getPath:function(l){var k=c.tupleForPropertyPath(l,this);if(k===null||k[0]===null){return undefined
}return k[0].get(k[1])},setPath:function(m,l){if(m.indexOf(".")>=0){var k=c.tupleForPropertyPath(m,this);
if(!k||!k[0]){return null}k[0].set(k[1],l)}else{this.set(m,l)}return this},setPathIfChanged:function(m,l){if(m.indexOf(".")>=0){var k=c.tupleForPropertyPath(m,this);
if(!k||!k[0]){return null}if(k[0].get(k[1])!==l){k[0].set(k[1],l)}}else{this.setIfChanged(m,l)
}return this},getEach:function(){var m=c.A(arguments);var l=[];for(var k=0;k<m.length;
k++){l[l.length]=this.getPath(m[k])}return l},incrementProperty:function(k){this.set(k,(this.get(k)||0)+1);
return this.get(k)},decrementProperty:function(k){this.set(k,(this.get(k)||0)-1);
return this.get(k)},toggleProperty:function(k,l,m){if(l===undefined){l=true}if(m===undefined){m=false
}l=(this.get(k)==l)?m:l;this.set(k,l);return this.get(k)},notifyPropertyChange:function(k,l){this.propertyWillChange(k);
this.propertyDidChange(k,l);return this},allPropertiesDidChange:function(){this._kvo_cache=null;
this._notifyPropertyObservers("*");return this},addProbe:function(k){this.addObserver(k,c.logChange)
},removeProbe:function(k){this.removeObserver(k,c.logChange)},logProperty:function(){var l=c.$A(arguments);
for(var k=0;k<l.length;k++){var m=l[k];console.log("%@:%@: ".fmt(c.guidFor(this),m),this.get(m))
}},propertyRevision:1};c.logChange=function g(m,k,l){console.log("CHANGE: %@[%@] => %@".fmt(m,k,m.get(k)))
};c.mixin(Array.prototype,c.Observable)});tiki.module("sproutcore/runtime:private/chain_observer",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";h._ChainObserver=function(i){this.property=i};h._ChainObserver.createChain=function(l,r,n,i,j){var k=r.split("."),p=new h._ChainObserver(k[0]),o=p,m=k.length;
for(var q=1;q<m;q++){o=o.next=new h._ChainObserver(k[q])}p.objectDidChange(l);o.target=n;
o.method=i;o.context=j;return p};h._ChainObserver.prototype={isChainObserver:true,object:null,property:null,next:null,target:null,method:null,objectDidChange:function(i){if(i===this.object){return
}if(this.object&&this.object.removeObserver){this.object.removeObserver(this.property,this,this.propertyDidChange)
}this.object=i;if(this.object&&this.object.addObserver){this.object.addObserver(this.property,this,this.propertyDidChange)
}this.propertyDidChange()},propertyDidChange:function(){var j=this.object;var m=this.property;
var l=(j&&j.get)?j.get(m):null;if(this.next){this.next.objectDidChange(l)}var n=this.target,o=this.method,k=this.context;
if(n&&o){var i=j?j.propertyRevision:null;if(k){o.call(n,j,m,l,k,i)}else{o.call(n,j,m,l,i)
}}},destroyChain:function(){var i=this.object;if(i&&i.removeObserver){i.removeObserver(this.property,this,this.propertyDidChange)
}if(this.next){this.next.destroyChain()}this.next=this.target=this.method=this.object=this.context=null;
return null}}});tiki.module("sproutcore/runtime:private/observer_queue",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:system/set");"import core";"import system/set";h.Observers={queue:[],addObserver:function(k,l,m,j){var i;
if(h.typeOf(k)===h.T_STRING){i=h.tupleForPropertyPath(k,j)}else{i=k}if(i){i[0].addObserver(i[1],l,m)
}else{this.queue.push([k,l,m,j])}},removeObserver:function(n,o,p,l){var k,j,i,m;i=h.tupleForPropertyPath(n,l);
if(i){i[0].removeObserver(i[1],o,p)}k=this.queue.length;j=this.queue;while(--k>=0){m=j[k];
if((m[0]===n)&&(m[1]===o)&&(m[2]==p)&&(m[3]===l)){j[k]=null}}},addPendingRangeObserver:function(i){var j=this.rangeObservers;
if(!j){j=this.rangeObservers=h.CoreSet.create()}j.add(i);return this},_TMP_OUT:[],flush:function(i){var m=this.queue;
if(m&&m.length>0){var p=(this.queue=[]);var q=m.length;while(--q>=0){var r=m[q];if(!r){continue
}var n=h.tupleForPropertyPath(r[0],r[3]);if(n){n[0].addObserver(n[1],r[1],r[2])}else{p.push(r)
}}}if(i._kvo_needsRangeObserver){var o=this.rangeObservers,l=o?o.get("length"):0,j=this._TMP_OUT,k;
for(q=0;q<l;q++){k=o[q];if(k.setupPending(i)){j.push(k)}}if(j.length>0){o.removeEach(j)
}j.length=0;i._kvo_needsRangeObserver=g}},isObservingSuspended:0,_pending:h.CoreSet.create(),objectHasPendingChanges:function(i){this._pending.add(i)
},suspendPropertyObserving:function(){this.isObservingSuspended++},resumePropertyObserving:function(){var k;
if(--this.isObservingSuspended<=0){k=this._pending;this._pending=h.CoreSet.create();
var j,i=k.length;for(j=0;j<i;j++){k[j]._notifyPropertyObservers()}k.clear();k=null
}}}});tiki.module("sproutcore/runtime:private/observer_set",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";h.ObserverSet={targets:0,_membersCacheIsValid:g,add:function(l,n,j){var k=(l)?h.guidFor(l):"__this__";
var i=this[k];if(!i){i=this[k]=h.CoreSet.create();i.target=l;i.isTargetSet=e;this.targets++
}i.add(n);if(j!==undefined){var m=i.contexts;if(!j){m={}}m[h.guidFor(n)]=j}this._membersCacheIsValid=g
},remove:function(k,l){var j=(k)?h.guidFor(k):"__this__";var i=this[j];if(!i){return g
}i.remove(l);if(i.length<=0){i.target=null;i.isTargetSet=g;i.contexts=null;delete this[j];
this.targets--}else{if(i.contexts){delete i.contexts[h.guidFor(l)]}}this._membersCacheIsValid=g;
return e},invokeMethods:function(){for(var j in this){if(!this.hasOwnProperty(j)){continue
}var k=this[j];if(k&&k.isTargetSet){var i=k.length;var l=k.target;while(--i>=0){k[i].call(l)
}}}},getMembers:function(){if(this._membersCacheIsValid){return this._members}if(!this._members){this._members=[]
}else{this._members.length=0}var j=this._members;for(var k in this){if(!this.hasOwnProperty(k)){continue
}var l=this[k];if(l&&l.isTargetSet){var i=l.length;var m=l.target;var o=l.contexts;
if(o){while(--i>=0){var n=l[i];j.push([m,n,o[h.guidFor(n)]])}}else{while(--i>=0){j.push([m,l[i]])
}}}}this._membersCacheIsValid=e;return j},clone:function(){var j,l,k,i=h.ObserverSet.create();
for(k in this){if(!this.hasOwnProperty(k)){continue}j=this[k];if(j&&j.isTargetSet){l=j.clone();
l.target=j.target;if(j.contexts){l.contexts=h.clone(j.contexts)}i[k]=l}}i.targets=this.targets;
i._membersCacheIsValid=g;return i},create:function(){return h.beget(this)}};h.ObserverSet.slice=h.ObserverSet.clone
});tiki.module("sproutcore/runtime:system/binding",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:system/set");"import core";"import system/set";"export package";
h.LOG_BINDINGS=g;h.BENCHMARK_BINDING_NOTIFICATIONS=g;h.BENCHMARK_BINDING_SETUP=g;
h.MULTIPLE_PLACEHOLDER="@@MULT@@";h.NULL_PLACEHOLDER="@@NULL@@";h.EMPTY_PLACEHOLDER="@@EMPTY@@";
h.Binding={beget:function(j){var i=h.beget(this);i.parentBinding=this;if(j!==undefined){i=i.from(j)
}return i},builder:function(){var j=this;var i=function(k){return j.beget().from(k)
};i.beget=function(){return j.beget()};return i},from:function(j,i){if(!j){return this
}var k=(this===h.Binding)?this.beget():this;k._fromPropertyPath=j;k._fromRoot=i;k._fromTuple=null;
return k},to:function(j,i){var k=(this===h.Binding)?this.beget():this;k._toPropertyPath=j;
k._toRoot=i;k._toTuple=null;return k},connect:function(){if(this.isConnected){return this
}this.isConnected=e;this._connectionPending=e;this._syncOnConnect=e;h.Binding._connectQueue.add(this);
return this},_connect:function(){if(!this._connectionPending){return}this._connectionPending=g;
var k,i;var j=h.BENCHMARK_BINDING_SETUP;if(j){h.Benchmark.start("SC.Binding.connect()")
}k=this._fromPropertyPath;i=this._fromRoot;if(h.typeOf(k)===h.T_STRING){if(k.indexOf(".")===0){k=k.slice(1);
if(!i){i=this._toRoot}}else{if(k.indexOf("*")===0){k=[this._fromRoot||this._toRoot,k.slice(1)];
i=null}}}h.Observers.addObserver(k,this,this.fromPropertyDidChange,i);if(!this._oneWay){k=this._toPropertyPath;
i=this._toRoot;h.Observers.addObserver(k,this,this.toPropertyDidChange,i)}if(j){h.Benchmark.end("SC.Binding.connect()")
}if(this._syncOnConnect){this._syncOnConnect=g;if(j){h.Benchmark.start("SC.Binding.connect().sync")
}this.sync();if(j){h.Benchmark.end("SC.Binding.connect().sync")}}},disconnect:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._connectionPending=g}else{h.Observers.removeObserver(this._fromPropertyPath,this,this.fromPropertyDidChange,this._fromRoot);
if(!this._oneWay){h.Observers.removeObserver(this._toPropertyPath,this,this.toPropertyDidChange,this._toRoot)
}}this.isConnected=g;return this},fromPropertyDidChange:function(k,j){var i=k?k.get(j):null;
if(i!==this._bindingValue){this._setBindingValue(k,j);this._changePending=e;h.Binding._changeQueue.add(this)
}},toPropertyDidChange:function(k,j){if(this._oneWay){return}var i=k.get(j);if(i!==this._transformedBindingValue){this._setBindingValue(k,j);
this._changePending=e;h.Binding._changeQueue.add(this)}},_setBindingValue:function(j,i){this._bindingSource=j;
this._bindingKey=i},_computeBindingValue:function(){var o=this._bindingSource,m=this._bindingKey,k;
if(!o){return}this._bindingValue=k=o.getPath(m);var n=this._transforms;if(n){var j=n.length;
for(var i=0;i<j;i++){var l=n[i];k=l(k,this)}}if(this._noError&&h.typeOf(k)===h.T_ERROR){k=null
}this._transformedBindingValue=k},_connectQueue:h.CoreSet.create(),_alternateConnectQueue:h.CoreSet.create(),_changeQueue:h.CoreSet.create(),_alternateChangeQueue:h.CoreSet.create(),_changePending:g,flushPendingChanges:function(){if(this._isFlushing){return g
}this._isFlushing=e;h.Observers.suspendPropertyObserving();var j=g;var k=h.LOG_BINDINGS;
var i,l;while((i=this._connectQueue).length>0){this._connectQueue=this._alternateConnectQueue;
this._alternateConnectQueue=i;while(l=i.pop()){l._connect()}}while((i=this._changeQueue).length>0){if(k){console.log("Begin: Trigger changed bindings")
}j=e;this._changeQueue=this._alternateChangeQueue;this._alternateChangeQueue=i;while(l=i.pop()){l.applyBindingValue()
}if(k){console.log("End: Trigger changed bindings")}}this._isFlushing=g;h.Observers.resumePropertyObserving();
return j},applyBindingValue:function(){this._changePending=g;this._computeBindingTargets();
this._computeBindingValue();var i=this._bindingValue;var j=this._transformedBindingValue;
var k=h.BENCHMARK_BINDING_NOTIFICATIONS;var l=h.LOG_BINDINGS;if(!this._oneWay&&this._fromTarget){if(l){console.log("%@: %@ -> %@".fmt(this,i,j))
}if(k){h.Benchmark.start(this.toString()+"->")}this._fromTarget.setPathIfChanged(this._fromPropertyKey,i);
if(k){h.Benchmark.end(this.toString()+"->")}}if(this._toTarget){if(l){console.log("%@: %@ <- %@".fmt(this,i,j))
}if(k){h.Benchmark.start(this.toString()+"<-")}this._toTarget.setPathIfChanged(this._toPropertyKey,j);
if(k){h.Benchmark.start(this.toString()+"<-")}}},sync:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._syncOnConnect=e}else{this._computeBindingTargets();
var k=this._fromTarget;var j=this._fromPropertyKey;if(!k||!j){return this}var i=k.getPath(j);
if(i!==this._bindingValue){this._setBindingValue(k,j);this._changePending=e;h.Binding._changeQueue.add(this)
}}return this},_syncOnConnect:g,_computeBindingTargets:function(){if(!this._fromTarget){var k,j,i;
k=this._fromPropertyPath;j=this._fromRoot;if(h.typeOf(k)===h.T_STRING){if(k.indexOf(".")===0){k=k.slice(1);
if(!j){j=this._toRoot}}else{if(k.indexOf("*")===0){k=[j||this._toRoot,k.slice(1)];
j=null}}}i=h.tupleForPropertyPath(k,j);if(i){this._fromTarget=i[0];this._fromPropertyKey=i[1]
}}if(!this._toTarget){k=this._toPropertyPath;j=this._toRoot;i=h.tupleForPropertyPath(k,j);
if(i){this._toTarget=i[0];this._toPropertyKey=i[1]}}},oneWay:function(k,i){if((i===undefined)&&(h.typeOf(k)===h.T_BOOL)){i=k;
k=null}var j=this.from(k);if(j===h.Binding){j=j.beget()}j._oneWay=(i===undefined)?e:i;
return j},transform:function(j){var k=(this===h.Binding)?this.beget():this;var i=k._transforms;
if(i&&(i===k.parentBinding._transform)){i=k._transforms=i.slice()}if(!i){i=k._transforms=[]
}i.push(j);return k},resetTransforms:function(){var i=(this===h.Binding)?this.beget():this;
i._transforms=null;return i},noError:function(k,i){if((i===undefined)&&(h.typeOf(k)===h.T_BOOL)){i=k;
k=null}var j=this.from(k);if(j===h.Binding){j=j.beget()}j._noError=(i===undefined)?e:i;
return j},single:function(j,i){if(i===undefined){i=h.MULTIPLE_PLACEHOLDER}return this.from(j).transform(function(m,l){if(m&&m.isEnumerable){var k=m.get("length");
m=(k>1)?i:(k<=0)?null:m.firstObject()}return m})},notEmpty:function(j,i){if(i===undefined){i=h.EMPTY_PLACEHOLDER
}return this.from(j).transform(function(l,k){if(h.none(l)||(l==="")||(h.isArray(l)&&l.length===0)){l=i
}return l})},notNull:function(j,i){if(i===undefined){i=h.EMPTY_PLACEHOLDER}return this.from(j).transform(function(l,k){if(h.none(l)){l=i
}return l})},multiple:function(i){return this.from(i).transform(function(j){if(!h.isArray(j)){j=(j==null)?[]:[j]
}return j})},bool:function(i){return this.from(i).transform(function(j){var k=h.typeOf(j);
if(k===h.T_ERROR){return j}return(k==h.T_ARRAY)?(j.length>0):(j==="")?g:!!j})},not:function(i){return this.from(i).transform(function(j){var k=h.typeOf(j);
if(k===h.T_ERROR){return j}return !((k==h.T_ARRAY)?(j.length>0):(j==="")?g:!!j)})
},isNull:function(i){return this.from(i).transform(function(j){var k=h.typeOf(j);
return(k===h.T_ERROR)?j:h.none(j)})},toString:function(){var k=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var j=this._toRoot?"<%@>:%@".fmt(this._toRoot,this._toPropertyPath):this._toPropertyPath;
var i=this._oneWay?"[oneWay]":"";return"SC.Binding%@(%@ -> %@)%@".fmt(h.guidFor(this),k,j,i)
}};h.binding=function(j,i){return h.Binding.from(j,i)}});tiki.module("sproutcore/runtime:system/cookie",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:system/object");"import core";"import system/object";"export package";
h.Cookie=h.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:g,isCookie:e,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var j=this.get("name"),q=this.get("value"),k=this.get("expires"),s=this.get("path"),m=this.get("domain"),i=this.get("secure");
var p="";if(k&&(h.typeOf(k)===h.T_NUMBER||(h.DateTime&&k.get&&k.get("milliseconds"))||h.typeOf(k.toUTCString)===h.T_FUNCTION)){var l;
if(h.typeOf(k)===h.T_NUMBER){l=new Date();l.setTime(l.getTime()+(k*24*60*60*1000))
}else{if(h.DateTime&&k.get&&k.get("milliseconds")){l=new Date(k.get("milliseconds"))
}else{if(h.typeOf(k.toUTCString)===h.T_FUNCTION){l=k}}}if(l){p="; expires="+l.toUTCString()
}}var r=s?"; path="+s:"";var o=m?"; domain="+m:"";var n=i?"; secure":"";document.cookie=[j,"=",encodeURIComponent(q),p,r,o,n].join("");
return this}});h.Cookie.mixin({find:function(j){if(document.cookie&&document.cookie!=""){var m=document.cookie.split(";");
for(var l=0;l<m.length;l++){var k=String(m[l]).trim();if(k.substring(0,j.length+1)===(j+"=")){return h.Cookie.create({name:j,value:decodeURIComponent(k.substring(j.length+1))})
}}}return null}})});tiki.module("sproutcore/runtime:system/enumerator",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";"export package";h.Enumerator=function(i){this.enumerable=i;this.reset();
return this};h.Enumerator.prototype={nextObject:function(){var k=this._index;var i=this._length;
if(k>=i){return undefined}var j=this.enumerable.nextObject(k,this._previousObject,this._context);
this._previousObject=j;this._index=k+1;if(k>=i){this._context=h.Enumerator._pushContext(this._context)
}return j},reset:function(){var j=this.enumerable;if(!j){throw h.$error("Enumerator has been destroyed")
}this._length=j.get?j.get("length"):j.length;var i=this._length;this._index=0;this._previousObject=null;
this._context=(i>0)?h.Enumerator._popContext():null},destroy:function(){this.enumerable=this._length=this._index=this._previousObject=this._context=null
}};h.Enumerator.create=function(i){return new h.Enumerator(i)};h.Enumerator._popContext=function(){var i=this._contextCache?this._contextCache.pop():null;
return i||{}};h.Enumerator._pushContext=function(j){this._contextCache=this._contextCache||[];
var i=this._contextCache;i.push(j);return null}});tiki.module("sproutcore/runtime:system/error",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
"import core";"export package";h.Error=h.Object.extend({code:-1,message:"",errorValue:null,errorObject:function(){return this
}.property().cacheable(),label:null,toString:function(){return"SC.Error:%@:%@ (%@)".fmt(h.guidFor(this),this.get("message"),this.get("code"))
},isError:e});h.Error.desc=function(l,i,m,k){var j={message:l};if(i!==undefined){j.label=i
}if(k!==undefined){j.code=k}if(m!==undefined){j.errorValue=m}return this.create(j)
};h.$error=function(j,i,k,l){return h.Error.desc(j,i,k,l)};h.ok=function(i){return(i!==false)&&!(i&&i.isError)
};h.$ok=h.ok;h.val=function(i){if(i&&i.isError){return i.get?i.get("errorValue"):null
}else{return i}};h.$val=h.val;h.Error.HAS_MULTIPLE_VALUES=-100});tiki.module("sproutcore/runtime:system/index_set",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:mixins/enumerable");c("sproutcore/runtime:mixins/observable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:mixins/copyable");
"import core";"import mixins/enumerable";"import mixins/observable";"import mixins/freezable";
"import mixins/copyable";"export package";h.IndexSet=h.mixin({},h.Enumerable,h.Observable,h.Freezable,h.Copyable,{_sc_sliceContent:function(l){if(l.length<1000){return l.slice()
}var k=0,i=[],j=l[0];while(j!==0){i[k]=j;k=(j<0)?(0-j):j;j=l[k]}i[k]=0;this._hint(0,k,i);
return i},create:function(k,j){var i=h.beget(this);i.initObservable();if(k&&k.isIndexSet){i._content=this._sc_sliceContent(k._content);
i.max=k.max;i.length=k.length;i.source=k.source}else{i._content=[0];if(k!==undefined){i.add(k,j)
}}return i},isIndexSet:e,HINT_SIZE:256,length:0,max:0,min:function(){var i=this._content,j=i[0];
return(j===0)?-1:(j>0)?0:Math.abs(j)}.property("[]").cacheable(),firstObject:function(){return(this.get("length")>0)?this.get("min"):undefined
}.property(),rangeStartForIndex:function(k){var n=this._content,i=this.get("max"),j,m,l;
if(k>=i){return i}if(Math.abs(n[k])>k){return k}l=k-(k%h.IndexSet.HINT_SIZE);j=n[l];
if(j<0||j>k){j=l}m=Math.abs(n[j]);while(m<k){j=m;m=Math.abs(n[j])}return j},isEqual:function(k){if(k===this){return e
}if(!k||!k.isIndexSet||(k.max!==this.max)||(k.length!==this.length)){return g}var m=this._content,j=k._content,l=0,i=m[l];
do{if(j[l]!==i){return g}l=Math.abs(i);i=m[l]}while(l!==0);return e},indexBefore:function(j){if(j===0){return -1
}j--;var k=this._content,i=this.get("max"),l=this.rangeStartForIndex(j);if(!k){return null
}while((l===i)||(k[l]<0)){if(l===0){return -1}j=l-1;l=this.rangeStartForIndex(j)}return j
},indexAfter:function(j){var l=this._content,i=this.get("max"),m,k;if(!l||(j>=i)){return -1
}j++;m=this.rangeStartForIndex(j);k=l[m];while(k<0){if(k===0){return -1}j=m=Math.abs(k);
k=l[m]}return j},contains:function(o,k){var j,n,i,m,l;if(k===undefined){if(o===null||o===undefined){return g
}if(typeof o===h.T_NUMBER){k=1}else{if(o&&o.isIndexSet){if(o===this){return e}j=o._content;
n=0;i=j[n];while(i!==0){if((i>0)&&!this.contains(n,i-n)){return g}n=Math.abs(i);i=j[n]
}return e}else{k=o.length;o=o.start}}}m=this.rangeStartForIndex(o);l=this._content[m];
return(l>0)&&(m<=o)&&(l>=(o+k))},intersects:function(n,k){var j,m,i,l;if(k===undefined){if(typeof n===h.T_NUMBER){k=1
}else{if(n&&n.isIndexSet){if(n===this){return e}j=n._content;m=0;i=j[m];while(i!==0){if((i>0)&&this.intersects(m,i-m)){return e
}m=Math.abs(i);i=j[m]}return g}else{k=n.length;n=n.start}}}m=this.rangeStartForIndex(n);
j=this._content;i=j[m];l=n+k;while(m<l){if(i===0){return g}if((i>0)&&(i>n)){return e
}m=Math.abs(i);i=j[m]}return g},without:function(j,i){if(j===this){return h.IndexSet.create()
}return this.clone().remove(j,i)},replace:function(k,i){if(i===undefined){if(typeof k===h.T_NUMBER){i=1
}else{if(k&&k.isIndexSet){this._content=this._sc_sliceContent(k._content);this.beginPropertyChanges().set("max",k.max).set("length",k.length).set("source",k.source).enumerableContentDidChange().endPropertyChanges();
return this}else{i=k.length;k=k.start}}}var j=this.length;this._content.length=1;
this._content[0]=0;this.length=this.max=0;return this.add(k,i)},add:function(i,j){if(this.isFrozen){throw h.FROZEN_ERROR
}var m,q,l;if(i&&i.isIndexSet){m=i._content;if(!m){return this}q=0;l=m[0];while(l!==0){if(l>0){this.add(q,l-q)
}q=l<0?0-l:l;l=m[q]}return this}else{if(j===undefined){if(i===null||i===undefined){return this
}else{if(typeof i===h.T_NUMBER){j=1}else{j=i.length;i=i.start}}}else{if(j===null){j=1
}}}if(j<=0){return this}var n=this.get("max"),k=n,p,o;m=this._content;if(i===n){if(i>0){q=this.rangeStartForIndex(i-1);
l=m[q];if(l>0){delete m[n];m[q]=n=i+j;i=q}else{m[n]=n=i+j}}else{m[i]=n=j}m[n]=0;this.set("max",n);
this.set("length",this.length+j);j=n-i}else{if(i>n){m[n]=0-i;m[i]=i+j;m[i+j]=0;this.set("max",i+j);
this.set("length",this.length+j);j=i+j-n;i=n}else{q=this.rangeStartForIndex(i);l=m[q];
n=i+j;p=0;if((i>0)&&(q===i)&&(l<=0)){q=this.rangeStartForIndex(i-1);l=m[q]}if(l<0){m[q]=0-i;
if(Math.abs(l)>n){m[i]=0-n;m[n]=l}else{m[i]=l}}else{i=q;if(l>n){n=l}}q=i;while(q<n){o=m[q];
if(o===0){m[n]=0;l=n;p+=n-q}else{l=Math.abs(o);if(l>n){m[n]=o;l=n}if(o<0){p+=l-q}}delete m[q];
q=l}if((q=m[n])>0){delete m[n];n=q}m[i]=n;if(n>k){this.set("max",n)}this.set("length",this.get("length")+p);
j=n-i}}this._hint(i,j);if(p!==0){this.enumerableContentDidChange()}return this},remove:function(i,j){if(this.isFrozen){throw h.FROZEN_ERROR
}if(j===undefined){if(i===null||i===undefined){return this}else{if(typeof i===h.T_NUMBER){j=1
}else{if(i.isIndexSet){i.forEachRange(this.remove,this);return this}else{j=i.length;
i=i.start}}}}if(j<=0){return this}var n=this.get("max"),k=n,m=this._content,r,l,q,o,p;
if(i>=n){return this}r=this.rangeStartForIndex(i);l=m[r];p=i+j;q=0;if((i>0)&&(r===i)&&(l>0)){r=this.rangeStartForIndex(i-1);
l=m[r]}if(l>0){m[r]=i;if(l>p){m[i]=p;m[p]=l}else{m[i]=l}}else{i=r;l=Math.abs(l);if(l>p){p=l
}}r=i;while(r<p){o=m[r];if(o===0){m[p]=0;l=p}else{l=Math.abs(o);if(l>p){m[p]=o;l=p
}if(o>0){q+=l-r}}delete m[r];r=l}if((r=m[p])<0){delete m[p];p=Math.abs(r)}if(m[p]===0){delete m[p];
m[i]=0;this.set("max",i)}else{m[i]=0-p}this.set("length",this.get("length")-q);j=p-i;
this._hint(i,j);if(q!==0){this.enumerableContentDidChange()}return this},_hint:function(o,l,k){if(k===undefined){k=this._content
}var j=h.IndexSet.HINT_SIZE,i=Math.abs(k[o]),n=o-(o%j)+j,m=o+l;while(n<m){while((i!==0)&&(i<=n)){o=i;
i=Math.abs(k[o])}if(i===0){delete k[n]}else{if(n!==o){k[n]=o}}n+=j}},clear:function(){if(this.isFrozen){throw h.FROZEN_ERROR
}var i=this.length;this._content.length=1;this._content[0]=0;this.set("length",0).set("max",0);
if(i>0){this.enumerableContentDidChange()}},addEach:function(j){if(this.isFrozen){throw h.FROZEN_ERROR
}this.beginPropertyChanges();var i=j.get("length");if(j.isSCArray){while(--i>=0){this.add(j.objectAt(i))
}}else{if(j.isEnumerable){j.forEach(function(k){this.add(k)},this)}}this.endPropertyChanges();
return this},removeEach:function(j){if(this.isFrozen){throw h.FROZEN_ERROR}this.beginPropertyChanges();
var i=j.get("length");if(j.isSCArray){while(--i>=0){this.remove(j.objectAt(i))}}else{if(j.isEnumerable){j.forEach(function(k){this.remove(k)
},this)}}this.endPropertyChanges();return this},clone:function(){return h.IndexSet.create(this)
},inspect:function(){var m=this._content,j=m.length,i=0,k=[],l;for(i=0;i<j;i++){l=m[i];
if(l!==undefined){k.push("%@:%@".fmt(i,l))}}return"SC.IndexSet<%@>".fmt(k.join(" , "))
},forEachRange:function(n,l){var j=this._content,m=0,i=j[m],k=this.source;if(l===undefined){l=null
}while(i!==0){if(i>0){n.call(l,m,i-m,this,k)}m=Math.abs(i);i=j[m]}return this},forEachIn:function(j,k,r,n){var o=this._content,q=0,p=0,l=j+k,i=this.source,m=o[q];
if(n===undefined){n=null}while(m!==0){if(q<j){q=j}while((q<m)&&(q<l)){r.call(n,q++,p++,this,i)
}if(q>=l){q=m=0}else{q=Math.abs(m);m=o[q]}}return this},lengthIn:function(o,l){var i=0;
if(l===undefined){if(o===null||o===undefined){return 0}else{if(typeof o===h.T_NUMBER){l=1
}else{if(o.isIndexSet){o.forEachRange(function(q,p){i+=this.lengthIn(q,p)},this);
return i}else{l=o.length;o=o.start}}}}if(this.get("length")===0){return 0}var k=this._content,n=0,j=k[n],m=o+l;
while(n<m&&j!==0){if(j>0){i+=(j>m)?m-n:j-n}n=Math.abs(j);j=k[n]}return i},source:null,indexOf:function(l,k){var n=this.source;
if(!n){throw"%@.indexOf() requires source".fmt(this)}var j=n.get("length"),m=this._content,o=m[0]<0?Math.abs(m[0]):0,i;
while(o>=0&&o<j){i=n.indexOf(l,o);if(i<0){return -1}if(this.contains(i)){return i
}o=i+1}return -1},lastIndexOf:function(l,k){var m=this.source;if(!m){throw"%@.lastIndexOf() requires source".fmt(this)
}var j=m.get("length"),n=this.max-1,i;if(n>=j){n=j-1}while(n>=0){i=m.lastIndexOf(l,n);
if(i<0){return -1}if(this.contains(i)){return i}n=i+1}return -1},forEachObject:function(o,m){var l=this.source;
if(!l){throw"%@.forEachObject() requires source".fmt(this)}var k=this._content,n=0,i=0,j=k[n];
if(m===undefined){m=null}while(j!==0){while(n<j){o.call(m,l.objectAt(n),n,l,this);
n++}n=Math.abs(j);j=k[n]}return this},addObject:function(k,l){var m=this.source;if(!m){throw"%@.addObject() requires source".fmt(this)
}var j=m.get("length"),n=0,i;while(n>=0&&n<j){i=m.indexOf(k,n);if(i>=0){this.add(i);
if(l){return this}n=i++}else{return this}}return this},addObjects:function(j,i){j.forEach(function(k){this.addObject(k,i)
},this);return this},removeObject:function(k,l){var m=this.source;if(!m){throw"%@.removeObject() requires source".fmt(this)
}var j=m.get("length"),n=0,i;while(n>=0&&n<j){i=m.indexOf(k,n);if(i>=0){this.remove(i);
if(l){return this}n=i+1}else{return this}}return this},removeObjects:function(j,i){j.forEach(function(k){this.removeObject(k,i)
},this);return this},LOG_OBSERVING:g,forEach:function(o,m){var k=this._content,n=0,i=0,l=this.source,j=k[n];
if(m===undefined){m=null}while(j!==0){while(n<j){o.call(m,n++,i++,this,l)}n=Math.abs(j);
j=k[n]}return this},nextObject:function(n,j,k){var m=this._content,l=k.next,i=this.get("max");
if(j===null){j=l=0}else{if(j>=i){delete k.next;return null}else{j++}}if(j===l){do{j=Math.abs(l);
l=m[j]}while(l<0);k.next=l}return j},toString:function(){var i=[];this.forEachRange(function(k,j){i.push(j===1?k:"%@..%@".fmt(k,k+j-1))
},this);return"SC.IndexSet<%@>".fmt(i.join(","))},max:0});h.IndexSet.slice=h.IndexSet.copy=h.IndexSet.clone;
h.IndexSet.EMPTY=h.IndexSet.create().freeze()});tiki.module("sproutcore/runtime:system/logger",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:system/object");"import core";"import system/object";"export package";
h.LOGGER_LOG_DELIMITER=", ";h.LOGGER_LOG_ERROR="ERROR: ";h.LOGGER_LOG_INFO="INFO: ";
h.LOGGER_LOG_WARN="WARNING: ";h.Logger=h.Object.create({exists:function(){return typeof(this.get("reporter"))!=="undefined"&&this.get("reporter")!=null
}.property("reporter").cacheable(),fallBackOnAlert:g,fallBackOnLog:e,format:e,reporter:console,log:function(){var i=this.get("reporter");
if(this.get("exists")&&typeof(i.log)==="function"){if(this.get("format")){i.log(this._argumentsToString.apply(this,arguments))
}else{i.log.apply(i,arguments)}return true}else{if(this.fallBackOnAlert){var j=this.get("format")?this._argumentsToString.apply(this,arguments):arguments;
if(this.get("exists")&&typeof(i.alert)==="function"){i.alert(j)}else{alert(j)}return true
}}return false},dir:function(){var i=this.get("reporter");if(this.get("exists")&&typeof(i.dir)==="function"){i.dir.apply(i,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},dirxml:function(){var i=this.get("reporter");
if(this.get("exists")&&typeof(i.dirxml)==="function"){i.dirxml.apply(i,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},error:function(){var j=this.get("reporter");
if(this.get("exists")&&typeof(j.error)==="function"){j.error.apply(j,arguments);return true
}else{if(this.fallBackOnLog){var i=this._argumentsToArray(arguments);if(typeof(i.unshift)==="function"){i.unshift(h.LOGGER_LOG_ERROR)
}return this.log.apply(this,i)}}return false},group:function(j){var i=this.get("reporter");
if(this.get("exists")&&typeof(i.group)==="function"){i.group(j);return true}return false
},groupEnd:function(){var i=this.get("reporter");if(this.get("exists")&&typeof(i.groupEnd)==="function"){i.groupEnd();
return true}return false},info:function(){var j=this.get("reporter");if(this.get("exists")&&typeof(j.info)==="function"){j.info.apply(j,arguments);
return true}else{if(this.fallBackOnLog){var i=this._argumentsToArray(arguments);if(typeof(i.unshift)==="function"){i.unshift(h.LOGGER_LOG_INFO)
}return this.log.apply(this,i)}}return false},profile:function(){var i=this.get("reporter");
if(this.get("exists")&&typeof(i.profile)==="function"){i.profile();return true}return false
},profileEnd:function(){var i=this.get("reporter");if(this.get("exists")&&typeof(i.profileEnd)==="function"){i.profileEnd();
return true}return false},time:function(j){var i=this.get("reporter");if(this.get("exists")&&typeof(i.time)==="function"){i.time(j);
return true}return false},timeEnd:function(j){var i=this.get("reporter");if(this.get("exists")&&typeof(i.timeEnd)==="function"){i.timeEnd(j);
return true}return false},trace:function(){var i=this.get("reporter");if(this.get("exists")&&typeof(i.trace)==="function"){i.trace();
return true}return false},warn:function(){var j=this.get("reporter");if(this.get("exists")&&typeof(j.warn)==="function"){j.warn.apply(j,arguments);
return true}else{if(this.fallBackOnLog){var i=this._argumentsToArray(arguments);if(typeof(i.unshift)==="function"){i.unshift(h.LOGGER_LOG_WARN)
}return this.log.apply(this,i)}}return false},_argumentsToArray:function(l){if(!l){return[]
}var j=[];for(var k=0;k<l.length;k++){j[k]=l[k]}return j},_argumentsToString:function(){var k="";
for(var j=0;j<arguments.length-1;j++){k+=arguments[j]+h.LOGGER_LOG_DELIMITER}k+=arguments[arguments.length-1];
return k}})});tiki.module("sproutcore/runtime:system/object",function(f,g,b){var a=f("sproutcore/runtime:core"),d=a.SC,j=a.SproutCore,i=a.YES,h=a.NO;
f("sproutcore/runtime:mixins/observable");f("sproutcore/runtime:system/set");"import core";
"import mixins/observable";"import system/set";"export package";d.BENCHMARK_OBJECTS=h;
d._object_extend=function c(q,p){if(!p){throw"SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"
}q._kvo_cloned=null;var G,w,C,o,r=q.concatenatedProperties,u=d.K;var m,l;w=(r)?r.length:0;
var k=(w>0)?{}:null;while(--w>=0){G=r[w];m=q[G];l=p[G];if(m){if(!(m instanceof Array)){m=d.$A(m)
}k[G]=(l)?m.concat(l):l}else{if(!(l instanceof Array)){l=d.$A(l)}k[G]=l}}var F=q._bindings,v=h;
var D=q._observers,E=h;var s=q._properties,n=h;var z,t,x;var B=q.outlets,A=h;if(p.outlets){B=(B||d.EMPTY_ARRAY).concat(p.outlets);
A=i}for(G in p){if(G==="_kvo_cloned"){continue}if(!p.hasOwnProperty(G)){continue}var y=(k.hasOwnProperty(G)?k[G]:null)||p[G];
if(G.slice(-7)==="Binding"){if(!v){F=(F||d.EMPTY_ARRAY).slice();v=i}if(F===null){F=(q._bindings||d.EMPTY_ARRAY).slice()
}F[F.length]=G}else{if(y&&(y instanceof Function)){if(!y.superclass&&(y!==(o=q[G]))){y.superclass=y.base=o||u
}if(y.propertyPaths){if(!E){D=(D||d.EMPTY_ARRAY).slice();E=i}D[D.length]=G}else{if(z=y.localPropertyPaths){t=z.length;
while(--t>=0){x=q._kvo_for(d.keyFor("_kvo_local",z[t]),d.Set);x.add(G);q._kvo_for("_kvo_observed_keys",d.CoreSet).add(z[t])
}}else{if(y.dependentKeys){if(!n){s=(s||d.EMPTY_ARRAY).slice();n=i}s[s.length]=G}else{if(y.autoconfiguredOutlet){if(!A){B=(B||d.EMPTY_ARRAY).slice();
A=i}B[B.length]=G}}}}}}q[G]=y}if(p.hasOwnProperty("toString")){G="toString";y=(k.hasOwnProperty(G)?k[G]:null)||p[G];
if(!y.superclass&&(y!==(o=q[G]))){y.superclass=y.base=o||u}q[G]=y}q._bindings=F||[];
q._observers=D||[];q._properties=s||[];q.outlets=B||[];return q};d.Object=function(k){return this._object_init(k)
};d.mixin(d.Object,{mixin:function(l){var k=arguments.length,m;for(m=0;m<k;m++){d.mixin(this,arguments[m])
}return this},superclass:null,extend:function(o){var n=d.BENCHMARK_OBJECTS;if(n){d.Benchmark.start("SC.Object.extend")
}var q,m=function(r){return this._object_init(r)};for(q in this){if(!this.hasOwnProperty(q)){continue
}m[q]=this[q]}if(this.hasOwnProperty("toString")){m.toString=this.toString}m.superclass=this;
d.generateGuid(m);m.subclasses=d.Set.create();this.subclasses.add(m);var p=(m.prototype=d.beget(this.prototype));
var l,k=arguments.length;for(l=0;l<k;l++){d._object_extend(p,arguments[l])}p.constructor=m;
if(n){d.Benchmark.end("SC.Object.extend")}return m},create:function(k){var l=this;
return new l(arguments)},isClass:i,subclasses:d.Set.create(),toString:function(){return d._object_className(this)
},subclassOf:function(l){if(this===l){return h}var k=this;while(k=k.superclass){if(k===l){return i
}}return h},hasSubclass:function(k){return(k&&k.subclassOf)?k.subclassOf(this):h},kindOf:function(k){return(this===k)||this.subclassOf(k)
}});d.Object.prototype={_kvo_enabled:i,_object_init:function(m){var l,k=(m)?m.length:0;
for(l=0;l<k;l++){d._object_extend(this,m[l])}d.generateGuid(this);this.init();var n=this.initMixin;
k=(n)?n.length:0;for(l=0;l<k;l++){n[l].call(this)}return this},mixin:function(){var l,k=arguments.length;
for(l=0;l<k;l++){d.mixin(this,arguments[l])}for(l=0;l<k;l++){var m=arguments[l].initMixin;
if(m){m.call(this)}}return this},init:function(){this.initObservable();return this
},isDestroyed:h,destroy:function(){if(this.get("isDestroyed")){return this}this.set("isDestroyed",i);
var l,m=this.destroyMixin,k=(m)?m.length:0;for(l=0;l<k;l++){m[l].call(this)}return this
},isObject:true,respondsTo:function(k){return !!(d.typeOf(this[k])===d.T_FUNCTION)
},tryToPerform:function(l,m,k){return this.respondsTo(l)&&(this[l](m,k)!==h)},superclass:function(l){var k=arguments.callee.caller;
if(!k){throw"superclass cannot determine the caller method"}return k.superclass?k.superclass.apply(this,arguments):null
},instanceOf:function(k){return this.constructor===k},kindOf:function(k){return this.constructor.kindOf(k)
},toString:function(){if(!this._object_toString){var k=d._object_className(this.constructor);
var l="%@:%@".fmt(k,d.guidFor(this));if(k){this._object_toString=l}else{return l}}return this._object_toString
},awake:function(k){this.outlets.forEach(function(l){this.get(l)},this);this.bindings.invoke("sync")
},invokeOnce:function(k){d.RunLoop.currentRunLoop.invokeOnce(this,k);return this},invokeLast:function(k){d.RunLoop.currentRunLoop.invokeLast(this,k);
return this},concatenatedProperties:["concatenatedProperties","initMixin","destroyMixin"]};
d.Object.prototype.constructor=d.Object;d.mixin(d.Object.prototype,d.Observable);
function e(){if(d._object_foundObjectClassNames){return}d._object_foundObjectClassNames=true;
var l=[];var k=function(m,n,q){q--;if(l.indexOf(n)>=0){return}l.push(n);for(var o in n){if(o=="__scope__"){continue
}if(o=="superclass"){continue}if(!o.match(/^[A-Z0-9]/)){continue}var r=(m)?[m,o].join("."):o;
var p=n[o];switch(d.typeOf(p)){case d.T_CLASS:if(!p._object_className){p._object_className=r
}if(q>=0){k(r,p,q)}break;case d.T_OBJECT:if(q>=0){k(r,p,q)}break;case d.T_HASH:if(((m)||(r==="SC"))&&(q>=0)){k(r,p,q)
}break;default:break}}};k(null,f("system:package").global,2)}d.instanceOf=function(k,l){return !!(k&&k.constructor===l)
};d.kindOf=function(k,l){if(k&&!k.isClass){k=k.constructor}return !!(k&&k.kindOf(l))
};d._object_className=function(l){if(!d.isReady){return""}if(!l._object_className){e()
}if(l._object_className){return l._object_className}var k=l;while(k&&!k._object_className){k=k.superclass
}return(k&&k._object_className)?k._object_className:"Anonymous"}});tiki.module("sproutcore/runtime:system/range_observer",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:private/observer_queue");c("sproutcore/runtime:system/index_set");
"import core";"import private/observer_queue";"import system/index_set";"export package";
h.RangeObserver={isRangeObserver:e,toString:function(){var i=this.indexes?this.indexes.toString():"SC.IndexSet<..>";
return i.replace("IndexSet","RangeObserver(%@)".fmt(h.guidFor(this)))},create:function(l,n,m,o,k,i){var j=h.beget(this);
j.source=l;j.indexes=n?n.frozenCopy():null;j.target=m;j.method=o;j.context=k;j.isDeep=i||g;
j.beginObserving();return j},extend:function(m){var l=h.beget(this),k=arguments,j=k.length,i;
for(i=0;i<j;i++){h.mixin(l,k[i])}return l},destroy:function(i){this.endObserving();
return this},update:function(i,j){if(this.indexes&&this.indexes.isEqual(j)){return this
}this.indexes=j?j.frozenCopy():null;this.endObserving().beginObserving();return this
},beginObserving:function(){if(!this.isDeep){return this}var j=this.observing;if(!j){j=this.observing=h.CoreSet.create()
}var i=this._beginObservingForEach;if(!i){i=this._beginObservingForEach=function(k){var l=this.source.objectAt(k);
if(l&&l.addObserver){j.push(l);l._kvo_needsRangeObserver=e}}}this.indexes.forEach(i,this);
this.isObserving=g;h.Observers.addPendingRangeObserver(this);return this},setupPending:function(i){var l=this.observing;
if(this.isObserving||!l||(l.get("length")===0)){return e}if(l.contains(i)){this.isObserving=e;
var j=this._setupPendingForEach;if(!j){var k=this.source,m=this.objectPropertyDidChange;
j=this._setupPendingForEach=function(n){var q=this.source.objectAt(n),o=h.guidFor(q),p;
if(q&&q.addObserver){l.push(q);q.addObserver("*",this,m);p=this[o];if(p===undefined||p===null){this[o]=n
}else{if(p.isIndexSet){p.add(n)}else{p=this[o]=h.IndexSet.create(p).add(n)}}}}}this.indexes.forEach(j,this);
return e}else{return g}},endObserving:function(){if(!this.isDeep){return this}var m=this.observing;
if(this.isObserving){var j=this.objectPropertyDidChange,k=this.source,i,n,l;if(m){n=m.length;
for(i=0;i<n;i++){l=m[i];l.removeObserver("*",this,j);this[h.guidFor(l)]=null}m.length=0
}this.isObserving=g}if(m){m.clear()}return this},rangeDidChange:function(j){var i=this.indexes;
if(!j||!i||i.intersects(j)){this.endObserving();this.method.call(this.target,this.source,null,"[]",j,this.context);
this.beginObserving()}return this},objectPropertyDidChange:function(l,n,o,i){var m=this.context,p=this.method,k=h.guidFor(l),j=this[k];
if(j&&!j.isIndexSet){j=this[k]=h.IndexSet.create(j).freeze()}if(m){p.call(this.target,this.source,l,n,j,m,i)
}else{p.call(this.target,this.source,l,n,j,i)}}}});tiki.module("sproutcore/runtime:system/run_loop",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:private/observer_set");c("sproutcore/runtime:system/object");
"import core";"import private/observer_set";"import system/object";"export package";
h.RunLoop=h.Object.extend({beginRunLoop:function(){this._start=new Date().getTime();
if(h.LOG_BINDINGS||h.LOG_OBSERVERS){console.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start))
}return this},endRunLoop:function(){var i;if(h.LOG_BINDINGS||h.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ flushing application queues")
}do{i=this.flushApplicationQueues();if(!i){i=this._flushinvokeLastQueue()}}while(i);
this._start=null;if(h.LOG_BINDINGS||h.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ End")
}return this},invokeOnce:function(i,j){if(j===undefined){j=i;i=this}if(h.typeOf(j)===h.T_STRING){j=i[j]
}if(!this._invokeQueue){this._invokeQueue=h.ObserverSet.create()}this._invokeQueue.add(i,j);
return this},invokeLast:function(i,j){if(j===undefined){j=i;i=this}if(h.typeOf(j)===h.T_STRING){j=i[j]
}if(!this._invokeLastQueue){this._invokeLastQueue=h.ObserverSet.create()}this._invokeLastQueue.add(i,j);
return this},flushApplicationQueues:function(){var j=g;var i=this._invokeQueue;if(i&&i.targets>0){this._invokeQueue=null;
j=e;i.invokeMethods()}return h.Binding.flushPendingChanges()||j},_flushinvokeLastQueue:function(){var i=this._invokeLastQueue,j=g;
if(i&&i.targets>0){this._invokeLastQueue=null;j=e;if(j){i.invokeMethods()}}return j
}});h.RunLoop.currentRunLoop=null;h.RunLoop.runLoopClass=h.RunLoop;h.RunLoop.begin=function(){var i=this.currentRunLoop;
if(!i){i=this.currentRunLoop=this.runLoopClass.create()}i.beginRunLoop();return this
};h.RunLoop.end=function(){var i=this.currentRunLoop;if(!i){throw"SC.RunLoop.end() called outside of a runloop!"
}i.endRunLoop();return this};h.run=function(j,i){h.RunLoop.begin();j.call(i);h.RunLoop.end()
}});tiki.module("sproutcore/runtime:system/selection_set",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:system/object");c("sproutcore/runtime:mixins/enumerable");c("sproutcore/runtime:mixins/copyable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:system/set");c("sproutcore/runtime:system/index_set");
"import core";"import system/object";"import mixins/enumerable";"import mixins/copyable";
"import mixins/freezable";"import system/set";"import system/index_set";"export package";
h.SelectionSet=h.Object.extend(h.Enumerable,h.Freezable,h.Copyable,{isSelectionSet:e,length:function(){var i=0,j=this._sets,k=this._objects;
if(k){i+=k.get("length")}if(j){j.forEach(function(l){i+=l.get("length")})}return i
}.property().cacheable(),sources:function(){var k=[],l=this._sets,j=l?l.length:0,i,n,m;
for(i=0;i<j;i++){n=l[i];if(n&&n.get("length")>0&&n.source){k.push(n.source)}}return k
}.property().cacheable(),indexSetForSource:function(m){if(!m||!m.isSCArray){return null
}var j=this._indexSetCache,l=this._objects,k,i;if(!j){j=this._indexSetCache={}}k=j[h.guidFor(m)];
if(k&&k._sourceRevision&&(k._sourceRevision!==m.propertyRevision)){k=null}if(!k){k=this._indexSetForSource(m,g);
if(k&&k.get("length")===0){k=null}if(l){if(k){k=k.copy()}l.forEach(function(n){if((i=m.indexOf(n))>=0){if(!k){k=h.IndexSet.create()
}k.add(i)}},this)}if(k){k=j[h.guidFor(m)]=k.frozenCopy();k._sourceRevision=m.propertyRevision
}}return k},_indexSetForSource:function(n,o){if(o===undefined){o=e}var l=h.guidFor(n),k=this[l],m=this._sets,i=m?m.length:0,j=null;
if(k>=i){k=null}if(h.none(k)){if(o&&!this.isFrozen){this.propertyWillChange("sources");
if(!m){m=this._sets=[]}j=m[i]=h.IndexSet.create();j.source=n;this[l]=i;this.propertyDidChange("sources")
}}else{j=m?m[k]:null}return j},add:function(i,j,l){if(this.isFrozen){throw h.FROZEN_ERROR
}var o,n,r,q,k,m,p,s;if(j===undefined&&l===undefined){if(!i){throw"Must pass params to SC.SelectionSet.add()"
}if(i.isIndexSet){return this.add(i.source,i)}if(i.isSelectionSet){o=i._sets;s=i._objects;
n=o?o.length:0;this.beginPropertyChanges();for(r=0;r<n;r++){q=o[r];if(q&&q.get("length")>0){this.add(q.source,q)
}}if(s){this.addObjects(s)}this.endPropertyChanges();return this}}q=this._indexSetForSource(i,e);
k=this.get("length");p=q.get("length");m=k-p;q.add(j,l);this._indexSetCache=null;
m+=q.get("length");if(m!==k){this.propertyDidChange("length");this.enumerableContentDidChange();
if(p===0){this.notifyPropertyChange("sources")}}return this},remove:function(i,j,l){if(this.isFrozen){throw h.FROZEN_ERROR
}var o,n,r,q,k,m,p,s;if(j===undefined&&l===undefined){if(!i){throw"Must pass params to SC.SelectionSet.remove()"
}if(i.isIndexSet){return this.remove(i.source,i)}if(i.isSelectionSet){o=i._sets;s=i._objects;
n=o?o.length:0;this.beginPropertyChanges();for(r=0;r<n;r++){q=o[r];if(q&&q.get("length")>0){this.remove(q.source,q)
}}if(s){this.removeObjects(s)}this.endPropertyChanges();return this}}q=this._indexSetForSource(i,e);
k=this.get("length");m=k-q.get("length");if(q&&(s=this._objects)){if(l!==undefined){j=h.IndexSet.create(j,l);
l=undefined}s.forEach(function(t){r=i.indexOf(t);if(j.contains(r)){s.remove(t);m--
}},this)}q.remove(j,l);p=q.get("length");m+=p;this._indexSetCache=null;if(m!==k){this.propertyDidChange("length");
this.enumerableContentDidChange();if(p===0){this.notifyPropertyChange("sources")}}return this
},contains:function(j,l,i){if(l===undefined&&i===undefined){return this.containsObject(j)
}var k=this.indexSetForSource(j);if(!k){return g}return k.contains(l,i)},intersects:function(j,l,i){var k=this.indexSetForSource(j,g);
if(!k){return g}return k.intersects(l,i)},_TMP_ARY:[],addObject:function(j){var k=this._TMP_ARY,i;
k[0]=j;i=this.addObjects(k);k.length=0;return i},addObjects:function(i){var l=this._objects,j,k;
if(!l){l=this._objects=h.CoreSet.create()}j=l.get("length");l.addEach(i);k=l.get("length");
this._indexSetCache=null;if(k!==j){this.propertyDidChange("length");this.enumerableContentDidChange()
}return this},removeObject:function(j){var k=this._TMP_ARY,i;k[0]=j;i=this.removeObjects(k);
k.length=0;return i},removeObjects:function(j){var m=this._objects,k,l,i;if(!m){return this
}k=m.get("length");m.removeEach(j);l=m.get("length");if(i=this._sets){i.forEach(function(n){k+=n.get("length");
n.removeObjects(j);l+=n.get("length")},this)}this._indexSetCache=null;if(l!==k){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(k){var m=this._objects;
if(m&&m.contains(k)){return e}var l=this._sets,j=l?l.length:0,i,n;for(i=0;i<j;i++){n=l[i];
if(n&&n.indexOf(k)>=0){return e}}return g},constrain:function(l){var m,j,i,k;this.beginPropertyChanges();
this.get("sources").forEach(function(n){if(n===l){return}var o=this._indexSetForSource(l,g);
if(o){this.remove(l,o)}},this);m=this._indexSetForSource(l,g);if(m&&((i=m.get("max"))>(j=l.get("length")))){this.remove(l,j,i-j)
}if(k=this._objects){k.forEach(function(n){if(l.indexOf(n)<0){this.removeObject(n)
}},this)}this.endPropertyChanges();return this},isEqual:function(o){var n,l,j,i,k,m;
if(!o||!o.isSelectionSet){return g}if(o===this){return e}if((this._sets===o._sets)&&(this._objects===o._objects)){return e
}if(this.get("length")!==o.get("length")){return g}n=this._objects;l=o._objects;if(n||l){if((n?n.get("length"):0)!==(l?l.get("length"):0)){return g
}if(n&&!n.isEqual(l)){return g}}k=this.get("sources");i=k.get("length");for(j=0;j<i;
j++){m=k.objectAt(j);n=this._indexSetForSource(m,g);l=this._indexSetForSource(m,g);
if(!!l!==!!n){return g}if(n&&!n.isEqual(l)){return g}}return e},clear:function(){if(this.isFrozen){throw h.FROZEN_ERROR
}if(this._sets){this._sets.length=0}if(this._objects){this._objects=null}this._indexSetCache=null;
this.propertyDidChange("length");this.enumerableContentDidChange();this.notifyPropertyChange("sources");
return this},copy:function(){var k=this.constructor.create(),l=this._sets,j=l?l.length:0,i,m;
if(l&&j>0){l=k._sets=l.slice();for(i=0;i<j;i++){if(!(m=l[i])){continue}m=l[i]=m.copy();
k[h.guidFor(m.source)]=i}}if(this._objects){k._objects=this._objects.copy()}return k
},freeze:function(){if(this.isFrozen){return this}var i=this._sets,j=i?i.length:0,k;
while(--j>=0){if(k=i[j]){k.freeze()}}if(this._objects){this._objects.freeze()}return arguments.callee.base.apply(this,arguments)
},toString:function(){var i=this._sets||[];i=i.map(function(j){return j.toString().replace("SC.IndexSet",h.guidFor(j.source))
},this);if(this._objects){i.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(h.guidFor(this),i.join(","))
},firstObject:function(){var j=this._sets,k=this._objects;if(j&&j.get("length")>0){var m=j?j[0]:null,l=m?m.source:null,i=m?m.firstObject():-1;
if(l&&i>=0){return l.objectAt(i)}}return k?k.firstObject():undefined}.property(),nextObject:function(k,m,j){var l,i;
if(k===0){l=j.objects=[];this.forEach(function(n){l.push(n)},this);j.max=l.length
}l=j.objects;i=l[k];if(k+1>=j.max){j.objects=j.max=null}return i},forEach:function(o,m){var k=this._sets,l=this._objects,j=k?k.length:0,n,i;
for(i=0;i<j;i++){n=k[i];if(n){n.forEachObject(o,m)}}if(l){l.forEach(o,m)}return this
}});h.SelectionSet.prototype.clone=h.SelectionSet.prototype.copy;h.SelectionSet.EMPTY=h.SelectionSet.create().freeze()
});tiki.module("sproutcore/runtime:system/set",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:mixins/enumerable");c("sproutcore/runtime:mixins/copyable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:mixins/observable");
"import core";"import mixins/enumerable";"import mixins/copyable";"import mixins/freezable";
"import mixins/observable";"export package";h.Set=h.mixin({},h.Enumerable,h.Observable,h.Freezable,{create:function(j){var k,i,l=h.Set._pool,m=this.isObservable;
if(!m&&j===undefined&&l.length>0){k=l.pop()}else{k=h.beget(this);if(m){k.initObservable()
}if(j&&j.isEnumerable&&j.get("length")>0){k.isObservable=g;if(j.isSCArray){i=j.get?j.get("length"):j.length;
while(--i>=0){k.add(j.objectAt(i))}}else{if(j.isSet){i=j.length;while(--i>=0){k.add(j[i])
}}else{j.forEach(function(n){k.add(n)},this)}}k.isObservable=m}}return k},isSet:e,length:0,firstObject:function(){return(this.length>0)?this[0]:undefined
}.property(),clear:function(){if(this.isFrozen){throw h.FROZEN_ERROR}this.length=0;
return this},contains:function(j){if(j===null){return g}var i=this[h.hashFor(j)];
return(!h.none(i)&&(i<this.length)&&(this[i]===j))},isEqual:function(i){if(!i||!i.isSet||(i.get("length")!==this.get("length"))){return g
}var j=this.get("length");while(--j>=0){if(!i.contains(this[j])){return g}}return e
},add:function(l){if(this.isFrozen){throw h.FROZEN_ERROR}if(l===null||l===undefined){return this
}var k=h.hashFor(l);var j=this[k];var i=this.length;if((j===null||j===undefined)||(j>=i)||(this[j]!==l)){this[i]=l;
this[k]=i;this.length=i+1}if(this.isObservable){this.enumerableContentDidChange()
}return this},addEach:function(k){if(this.isFrozen){throw h.FROZEN_ERROR}if(!k||!k.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var i,j=this.isObservable;if(j){this.beginPropertyChanges()}if(k.isSCArray){i=k.get("length");
while(--i>=0){this.add(k.objectAt(i))}}else{if(k.isSet){i=k.length;while(--i>=0){this.add(k[i])
}}else{k.forEach(function(l){this.add(l)},this)}}if(j){this.endPropertyChanges()}return this
},remove:function(l){if(this.isFrozen){throw h.FROZEN_ERROR}if(h.none(l)){return this
}var k=h.hashFor(l);var j=this[k];var i=this.length;if(h.none(j)||(j>=i)||(this[j]!==l)){return this
}delete this[k];if(j<(i-1)){l=this[j]=this[i-1];this[h.hashFor(l)]=j}this.length=i-1;
if(this.isObservable){this.enumerableContentDidChange()}return this},pop:function(){if(this.isFrozen){throw h.FROZEN_ERROR
}var i=(this.length>0)?this[this.length-1]:null;if(i){this.remove(i)}return i},removeEach:function(k){if(this.isFrozen){throw h.FROZEN_ERROR
}if(!k||!k.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)}var i,j=this.isObservable;
if(j){this.beginPropertyChanges()}if(k.isSCArray){i=k.get("length");while(--i>=0){this.remove(k.objectAt(i))
}}else{if(k.isSet){i=k.length;while(--i>=0){this.remove(k[i])}}else{k.forEach(function(l){this.remove(l)
},this)}}if(j){this.endPropertyChanges()}return this},copy:function(){return this.constructor.create(this)
},destroy:function(){this.isFrozen=g;if(!this.isObservable){h.Set._pool.push(this.clear())
}return this},forEach:function(k,l){var j=this.length;if(!l){l=this}for(var i=0;i<j;
i++){k.call(l,this[i],i,this)}return this},toString:function(){var j=this.length,i,k=[];
for(i=0;i<j;i++){k[i]=this[i]}return"SC.Set<%@>".fmt(k.join(","))},_pool:[],isObservable:e});
h.Set.constructor=h.Set;h.Set.clone=h.Set.copy;h.Set.push=h.Set.unshift=h.Set.add;
h.Set.shift=h.Set.pop;h.Set.addObject=h.Set.add;h.Set.removeObject=h.Set.remove;h.Set._pool=[];
h.CoreSet=h.beget(h.Set);h.CoreSet.isObservable=g;h.CoreSet.constructor=h.CoreSet
});tiki.module("sproutcore/runtime:system/sparse_array",function(c,b,d){var a=c("sproutcore/runtime:core"),h=a.SC,f=a.SproutCore,e=a.YES,g=a.NO;
c("sproutcore/runtime:system/index_set");c("sproutcore/runtime:system/object");c("sproutcore/runtime:mixins/enumerable");
c("sproutcore/runtime:mixins/array");c("sproutcore/runtime:mixins/delegate_support");
"import core";"import system/index_set";"import system/object";"import mixins/enumerable";
"import mixins/array";"import mixins/delegate_support";"export package";h.SparseArray=h.Object.extend(h.Enumerable,h.Array,h.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var i=this.delegate;
if(i&&h.none(this._length)&&i.sparseArrayDidRequestLength){this._requestingLength++;
i.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(i){if(h.none(i)){this._sa_content=null
}if(i!==this._length){this._length=i;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:[],objectAt:function(i){var k=this._sa_content,j;
if(!k){k=this._sa_content=[]}if((j=k[i])===undefined){this.requestIndex(i);j=k[i]
}return j},definedIndexes:function(l){var k=h.IndexSet.create(),m=this._sa_content,j,i;
if(!m){return k.freeze()}if(l){l.forEach(function(n){if(m[n]!==undefined){k.add(n)
}})}else{i=m.length;for(j=0;j<i;j++){if(m[j]!==undefined){k.add(j)}}}return k.freeze()
},_TMP_RANGE:{},requestIndex:function(j){var k=this.delegate;if(!k){return this}var i=this.get("rangeWindowSize"),m=j;
if(i>1){m=m-Math.floor(m%i)}if(i<1){i=1}this._requestingIndex++;if(k.sparseArrayDidRequestRange){var l=this._TMP_RANGE;
if(this.wasRangeRequested(m)===-1){l.start=m;l.length=i;k.sparseArrayDidRequestRange(this,l);
this.requestedRangeIndex.push(m)}}else{if(k.sparseArrayDidRequestIndex){while(--i>=0){k.sparseArrayDidRequestIndex(this,m+i)
}}}this._requestingIndex--;return this},wasRangeRequested:function(l){var k,j;for(k=0,j=this.requestedRangeIndex.length;
k<j;k++){if(this.requestedRangeIndex[k]===l){return k}}return -1},rangeRequestCompleted:function(k){var j=this.wasRangeRequested(k);
if(j>=0){this.requestedRangeIndex.removeAt(j,1);return e}return g},provideObjectsInRange:function(j,m){var k=this._sa_content;
if(!k){k=this._sa_content=[]}var l=j.start,i=j.length;while(--i>=0){k[l+i]=m[i]}if(this._requestingIndex<=0){this.enumerableContentDidChange()
}return this},_TMP_PROVIDE_ARRAY:[],_TMP_PROVIDE_RANGE:{length:1},provideObjectAtIndex:function(k,j){var l=this._TMP_PROVIDE_ARRAY,i=this._TMP_PROVIDE_RANGE;
l[0]=j;i.start=k;return this.provideObjectsInRange(i,l)},objectsDidChangeInRange:function(i){var j=this._sa_content;
if(j){if(i.start===0&&h.maxRange(i)>=j.length){this._sa_content=null}else{var l=i.start,k=Math.min(l+i.length,j.length);
while(--k>=l){j[k]=undefined}}}this.enumerableContentDidChange(i);return this},indexOf:function(k){var i=this.delegate;
if(i&&i.sparseArrayDidRequestIndexOf){return i.sparseArrayDidRequestIndexOf(this,k)
}else{var j=this._sa_content;if(!j){j=this._sa_content=[]}return j.indexOf(k)}},replace:function(j,o,m){m=m||[];
var k=this.delegate;if(k){if(!k.sparseArrayShouldReplace||!k.sparseArrayShouldReplace(this,j,o,m)){return this
}}var l=this._sa_content;if(!l){l=this._sa_content=[]}l.replace(j,o,m);var i=m?(m.get?m.get("length"):m.length):0;
var n=i-o;if(!h.none(this._length)){this.propertyWillChange("length");this._length+=n;
this.propertyDidChange("length")}this.enumerableContentDidChange(j,o,n);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
h.SparseArray.array=function(i){return this.create({_length:i||0})}});tiki.module("sproutcore/runtime:package",function(c,b,d){var a;
a=c("sproutcore/runtime:core");b.SC=a.SC;b.SproutCore=a.SproutCore;b.YES=a.YES;b.NO=a.NO;
c("sproutcore/runtime:mixins/array");c("sproutcore/runtime:mixins/comparable");c("sproutcore/runtime:mixins/copyable");
c("sproutcore/runtime:mixins/delegate_support");c("sproutcore/runtime:mixins/enumerable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:mixins/observable");
c("sproutcore/runtime:system/binding");c("sproutcore/runtime:system/cookie");c("sproutcore/runtime:system/enumerator");
c("sproutcore/runtime:system/error");c("sproutcore/runtime:system/index_set");c("sproutcore/runtime:system/logger");
c("sproutcore/runtime:system/object");c("sproutcore/runtime:system/range_observer");
c("sproutcore/runtime:system/run_loop");c("sproutcore/runtime:system/selection_set");
c("sproutcore/runtime:system/set");c("sproutcore/runtime:system/sparse_array")});
tiki.script("sproutcore/runtime:en/1a415d7e025bbaaf9462034aaa4d4e00db320bf1/javascript.js");
tiki.register("sproutcore/datastore",{depends:["sproutcore/runtime"],packages:{"sproutcore/runtime":{}},scripts:[{url:"/static/sproutcore/datastore/en/03fb4a845dd24dd06461a3e068a1e76c8370d052/javascript.js",id:"sproutcore/datastore:en/03fb4a845dd24dd06461a3e068a1e76c8370d052/javascript.js"}]});
tiki.global("sproutcore/datastore");tiki.script("sproutcore/datastore:en/03fb4a845dd24dd06461a3e068a1e76c8370d052/javascript.js");
tiki.register("sproutcore/foundation",{depends:["sproutcore/runtime"],packages:{"sproutcore/runtime":{}},scripts:[{url:"/static/sproutcore/foundation/en/ed50641e9278e55501165cb24eee859fe1f0ac61/javascript.js",id:"sproutcore/foundation:en/ed50641e9278e55501165cb24eee859fe1f0ac61/javascript.js"}]});
tiki.global("sproutcore/foundation");SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var c=this._deprecatedLanguageCodes||[];c.push(this.language);
var b=c.length;var a=null;while(!a&&--b>=0){a=String[c[b]]}if(a){this.hasStrings=YES;
this.strings=a}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(a,b){return this.strings[a]||b||a
}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var c=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var b=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var d=((c)?SC.browser.language:null)||b||SC.browser.language||"en";d=SC.Locale.normalizeLanguage(d);
var a=this.localeClassFor(d);if(d!=this.currentLanguage){this.currentLanguage=d;this.currentLocale=a.create()
}return this.currentLocale},localeClassFor:function(c){c=SC.Locale.normalizeLanguage(c);
var b,a=this.locales[c];if(!a&&((b=c.split("-")[0])!==c)&&(a=this.locales[b])){a=this.locales[c]=a.extend()
}if(!a){a=this.locales[c]=this.locales.en.extend()}return a},define:function(b,c){var a;
if(c===undefined&&(SC.typeOf(b)!==SC.T_STRING)){a=this;c=b}else{a=SC.Locale.localeClassFor(b)
}SC.mixin(a.prototype,c);return a},options:function(){return this.prototype},addStrings:function(b){var a=this.prototype.strings;
if(a){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(a)
}}else{a=this.prototype.strings={}}if(b){this.prototype.strings=SC.mixin(a,b)}this.prototype.hasStrings=YES;
return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(a){if(!a){return"en"
}return SC.Locale._map[a.toLowerCase()]||a},_assignLocales:function(){for(var a in this.locales){this.locales[a].prototype.language=a
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var a=SC.Object.extend.apply(this,arguments);a.addStrings=SC.Locale.addStrings;
a.define=SC.Locale.define;a.options=SC.Locale.options;a.toString=SC.Locale.toString;
return a}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(c,b){var a=SC.Locale.localeClassFor(c);a.addStrings(b);return this
};sc_require("system/locale");SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.mixin({data:function(c,b,d){c=(c===window)?"@window":c;
var e=SC.hashFor(c);var a=SC._data_cache;if(!a){SC._data_cache=a={}}var f=a[e];if(b&&!f){a[e]=f={}
}if(f&&(d!==undefined)){f[b]=d}return(b)?f[b]:f},removeData:function(d,c){d=(d===window)?"@window":d;
var e=SC.hashFor(d);var a=SC._data_cache;if(!a){return undefined}var f=a[e];if(!f){return undefined
}var b=(c)?f[c]:f;if(c){delete f[c]}else{delete a[e]}return b}});SC.mixin(Function.prototype,{invokeLater:function(g,a){if(a===undefined){a=1
}var e=this;if(arguments.length>2){var b=SC.$A(arguments).slice(2,arguments.length);
b.unshift(g);var d=this,c=e;e=function(){return c.apply(d,b.slice(1))}}return SC.Timer.schedule({target:g,action:e,interval:a})
}});SC.Controller=SC.Object.extend({isEditable:YES});SC.mixin(SC.Object.prototype,{invokeLater:function(b,a){if(a===undefined){a=1
}var e=b,c,d;if(arguments.length>2){c=SC.$A(arguments).slice(2);if(SC.typeOf(e)===SC.T_STRING){e=this[b]
}d=e;e=function(){return d.apply(this,c)}}return SC.Timer.schedule({target:this,action:e,interval:a})
},invokeWith:function(b,c,d){if(d===undefined){d=c;c=this}if(!c){c=this}if(SC.typeOf(d)===SC.T_STRING){d=c[d]
}var a=this.getPath(b);d.call(c,a,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var a=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return a},scheduleTimer:function(b,a){this._timerQueue=b.removeFromTimerQueue(this._timerQueue);
this._timerQueue=b.scheduleInTimerQueue(this._timerQueue,a);return this},cancelTimer:function(a){this._timerQueue=a.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var d=this.get("startTime");this._firing=YES;var e=this.TIMER_ARRAY;this._timerQueue=this._timerQueue.collectExpiredTimers(e,d);
var c,b=e.length;for(c=0;c<b;c++){e[c].fire()}var a=e.length>0;e.length=0;this._firing=NO;
return a},scheduleNextTimeout:function(){var d=this._timerQueue;var b=NO;if(!d){if(this._timeout){clearTimeout(this._timeout)
}}else{var c=d._timerQueueRunTime;if(this._timeoutAt!==c){if(this._timeout){clearTimeout(this._timeout)
}var a=Math.max(0,c-Date.now());this._timeout=setTimeout(this._timeoutDidFire,a);
this._timeoutAt=c}b=YES}return b},_timeoutDidFire:function(){var a=SC.RunLoop.currentRunLoop;
a._timeout=a._timeoutAt=null;SC.RunLoop.begin().end()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
/* @license

Portions of this software are copyright Yahoo, Inc, used under the following license:

Software License Agreement (BSD License)
Copyright (c) 2009, Yahoo! Inc.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the
following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Sources of Intellectual Property Included in the YUI Library
Where not otherwise indicated, all YUI content is authored by Yahoo! engineers and consists of Yahoo!-owned intellectual property. YUI is issued by Yahoo! under the BSD license above. In some specific instances, YUI will incorporate work done by developers outside of Yahoo! with their express permission.

*/
SC.BRANCH_OPEN=17;
SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(b,c,a){var d=b.get("selection");
return d?d.contains(c,a):NO},contentIndexIsEnabled:function(b,c,a){return b.get("isEnabled")
},contentGroupIndexes:function(a,b){return null},contentIndexIsGroup:function(b,c,a){return NO
},contentIndexOutlineLevel:function(b,c,a){return -1},contentIndexDisclosureState:function(b,c,a){return SC.LEAF_NODE
},contentIndexExpand:function(b,c,a){console.log("contentIndexExpand(%@, %@, %@)".fmt(b,c,a))
},contentIndexCollapse:function(b,c,a){console.log("contentIndexCollapse(%@, %@, %@)".fmt(b,c,a))
}};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],_display_contentDidChange:function(e,a,d){if((d=this.get("content"))!=this._display_content){var c=this._display_contentPropertyDidChange;
var b=this._display_content;if(b){if(SC.isArray(b)){b.invoke("removeObserver","*",this,c)
}else{if(b.removeObserver){b.removeObserver("*",this,c)}}}b=this._display_content=d;
if(b){if(SC.isArray(b)){b.invoke("addObserver","*",this,c)}else{if(b.addObserver){b.addObserver("*",this,c)
}}}this.allPropertiesDidChange();this.endPropertyChanges()}}.observes("content"),_display_contentPropertyDidChange:function(e,c,d,b){if(c==="*"){this.displayDidChange()
}else{var a=this.get("contentDisplayProperties");if(a&&a.indexOf(c)>=0){this.displayDidChange()
}}}};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.String={loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var a=SC.Locale.currentLocale.locWithDefault(this)||this;return a.fmt.apply(a,arguments)
},locWithDefault:function(b){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var c=SC.Locale.currentLocale.locWithDefault(b)||this;var a=SC.$A(arguments);a.shift();
return c.fmt.apply(c,a)},capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(c,a,b){return(b)?(a+b.toUpperCase()):a
}).capitalize()},titleize:function(){var a=this.replace(/([a-z])([A-Z])/g,"$1_$2");
return a.replace(SC.STRING_TITLEIZE_REGEXP,function(c,d,b){return(b)?(" "+b.toUpperCase()):" "
}).capitalize()},camelize:function(){var b=this.replace(SC.STRING_TITLEIZE_REGEXP,function(e,f,d){return(d)?d.toUpperCase():""
});var c=b.charAt(0),a=c.toLowerCase();return(c!==a)?(a+b.slice(1)):b},classify:function(){var a=this.replace(SC.STRING_TITLEIZE_REGEXP,function(e,f,d){return(d)?d.toUpperCase():""
});var c=a.charAt(0),b=c.toUpperCase();return(c!==b)?(b+a.slice(1)):a},decamelize:function(){return this.replace(/([a-z])([A-Z])/g,"$1_$2").toLowerCase()
},dasherize:function(){return this.decamelize().replace(/[ _]/g,"-")},humanize:function(){return this.decamelize().replace(/[\-_]/g," ")
},removeDiacritics:function(){var a=SC.diacriticMappingTable;if(!a){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
a=SC.diacriticMappingTable}var d,e;var b="";var f=this.length;for(var c=0;c<=f;++c){d=this.charAt(c);
e=a[d];if(e){b+=e}else{b+=d}}return b},trim:function(){return this.replace(/^\s+|\s+$/g,"")
},trimLeft:function(){return this.replace(/^\s+/g,"")},trimRight:function(){return this.replace(/\s+$/g,"")
}};SC.String.strip=SC.String.trim;SC.supplement(String.prototype,SC.String);String.prototype.loc=SC.String.loc;
SC.String.fmt=String.prototype.fmt;sc_require("mixins/string");SC.MIXED_STATE="__MIXED__";
SC.HUGE_CONTROL_SIZE="sc-huge-size";SC.LARGE_CONTROL_SIZE="sc-large-size";SC.REGULAR_CONTROL_SIZE="sc-regular-size";
SC.SMALL_CONTROL_SIZE="sc-small-size";SC.TINY_CONTROL_SIZE="sc-tiny-size";SC.Control={initMixin:function(){this._control_contentDidChange()
},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(b,a){return this.updatePropertyFromContent("value",a,"contentValueKey")
},updatePropertyFromContent:function(f,b,e,d){var c=b==="*";if(e===undefined){e="content%@Key".fmt(f.capitalize())
}if(d===undefined){d=this.get("content")}e=this[e]?this.get(e):this.getDelegateProperty(e,this.displayDelegate);
if(e&&(c||b===e)){var a=(d)?(d.get?d.get(e):d[e]):null;this.set(f,a)}return this},updateContentWithValueObserver:function(){var a=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate);
var b=this.get("content");if(!a||!b){return}var c=this.get("value");if(typeof b.setIfChanged===SC.T_FUNCTION){b.setIfChanged(a,c)
}else{if(b[a]!==c){b[a]=c}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var a,c,b;
if(a=this.get("fieldLabel")){return a}c=this.get("fieldKey")||this.constructor.toString();
b=(c||"").humanize().capitalize();return"ErrorLabel.%@".fmt(c).locWithDefault("FieldKey.%@".fmt(c).locWithDefault(b))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(a,e){var c=this.get("isSelected"),b=!this.get("isEnabled");
var d=this._CONTROL_TMP_CLASSNAMES;d.mixed=c===SC.MIXED_STATE;d.sel=c&&(c!==SC.MIXED_STATE);
d.active=this.get("isActive");a.setClass(d).addClass(this.get("controlSize"));if(!e&&this.$input){this.$input().attr("disabled",b)
}},_control_content:null,_control_contentDidChange:function(){var b=this.get("content");
if(this._control_content===b){return}var c=this.contentPropertyDidChange;var a=this._control_content;
if(a&&a.removeObserver){a.removeObserver("*",this,c)}this._control_content=b;if(b&&b.addObserver){b.addObserver("*",this,c)
}this.contentPropertyDidChange(b,"*")}.observes("content")};SC.Editable={isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.set("isEditing",YES);this.becomeFirstResponder();
return YES},discardEditing:function(){return !this.get("isEditing")},commitEditing:function(){if(!this.get("isEditing")){return YES
}this.set("isEditing",NO);this.resignFirstResponder();return YES}};SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(c,f){var b=this._scsel_selection,g=b?b.get("length"):0,d,e,a;
if((f===undefined)||!this.get("allowsSelection")){f=b}a=(f&&f.isEnumerable)?f.get("length"):0;
if((a>1)&&!this.get("allowsMultipleSelection")){if(g>1){f=SC.SelectionSet.create().addObject(b.get("firstObject")).freeze();
a=1}else{f=b;a=g}}if((a===0)&&!this.get("allowsEmptySelection")){if(g===0){f=this.get("firstSelectableObject");
if(f){f=SC.SelectionSet.create().addObject(f).freeze()}else{f=SC.SelectionSet.EMPTY
}a=f.get("length")}else{f=b;a=g}}if(a===0){f=SC.SelectionSet.EMPTY}f=f.frozenCopy();
this._scsel_selection=f;return f}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var a=this.get("selection");
return !!a&&(a.get("length")>0)}.property("selection").cacheable(),selectObjects:function(b,c){if(!b||b.get("length")===0){if(!c){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var a=this.get("selection");if(c&&a){a=a.copy()}else{a=SC.SelectionSet.create()
}a.addObjects(b).freeze();this.set("selection",a);return this},selectObject:function(a,b){if(a===null){if(!b){this.set("selection",null)
}return this}else{return this.selectObjects([a],b)}},deselectObjects:function(b){if(!b||b.get("length")===0){return this
}var a=this.get("selection");if(!a||a.get("length")===0){return this}a=a.copy().removeObjects(b).freeze();
this.set("selection",a.freeze());return this},deselectObject:function(a){if(!a){return this
}else{return this.deselectObjects([a])}},updateSelectionAfterContentChange:function(){var e=this.get("arrangedObjects"),f=this.get("selection"),d=f,c,b,a;
if(d&&e&&d.get("sources").indexOf(e)>=0){c=d.indexSetForSource(e);b=e.get("length");
a=c?c.get("max"):0;if(a>b){d=d.copy().remove(e,b,a-b).freeze();this.set("selection",d)
}}if(d===f){b=f?f.get("length"):0;a=e?e.get("length"):0;if((b===0)&&!this.get("allowsEmptySelection")&&a>0){this.notifyPropertyChange("selection")
}}return this}};SC.StaticLayout={hasStaticLayout:YES,useStaticLayout:NO,renderMixin:function(a,b){a.setClass("sc-static-layout",this.get("useStaticLayout"))
},clippingFrame:null,parentViewDidResize:null,beginLiveResize:null,endLiveResize:null,viewDidResize:null};
SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(b,a){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(b,a){this.setIfChanged("treeItemIsExpanded",NO)},treeItemExpand:function(b,a){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(e,c){var d=this.get("treeItemChildren"),b,g,a,f;
if(!d){return null}b=SC.IndexSet.create();g=d.get("length");for(a=0;a<g;a++){if(!(f=d.objectAt(a))){continue
}if(!f.get("treeItemChildren")){continue}if(f.treeItemDisclosureState(this,a)!==SC.LEAF_NODE){b.add(a)
}}return b.get("length")>0?b:null}};SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()
},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(c){var a=SC.VALIDATE_OK;
if(this._validator){var b=this.get("ownerForm");if(c){a=this._validator.validatePartial(b,this);
if((a==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(b,this)==SC.VALIDATE_OK)){a=SC.VALIDATE_OK
}}else{a=this._validator.validateChange(b,this)}}return a},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(a){var b=a.getCharString();if(!b){return YES}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,b):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(b,a){return this._validator?this._validator.objectForFieldValue(b,this.get("ownerForm"),this):b
},fieldValueForObject:function(a){return this._validator?this._validator.fieldValueForObject(a,this.get("ownerForm"),this):a
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),updateLayerMixin:function(a){a.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var a=this.get("ownerForm");var b=SC.Validator.findFor(a,this,this.get("validator"));
if(b!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(a,this)
}this._validator=b;if(this._validator){this._validator.attachTo(a,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};SC.browser=(function(){var c=navigator.userAgent.toLowerCase();
var a=(c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];var b={version:a,safari:(/webkit/).test(c)?a:0,opera:(/opera/).test(c)?a:0,msie:(/msie/).test(c)&&!(/opera/).test(c)?a:0,mozilla:(/mozilla/).test(c)&&!(/(compatible|webkit)/).test(c)?a:0,mobileSafari:(/apple.*mobile.*safari/).test(c)?a:0,windows:!!(/(windows)/).test(c),mac:!!((/(macintosh)/).test(c)||(/(mac os x)/).test(c)),language:(navigator.language||navigator.browserLanguage).split("-",1)[0]};
SC.extend(b,{isOpera:!!b.opera,isIe:!!b.msie,isIE:!!b.msie,isSafari:!!b.safari,isMobileSafari:!!b.mobileSafari,isMozilla:!!b.mozilla,isWindows:!!b.windows,isMac:!!b.mac,current:b.msie?"msie":b.mozilla?"mozilla":b.safari?"safari":b.opera?"opera":"unknown"});
return b})();SC.Builder=function(a){return SC.Builder.create(a)};SC.Builder.create=function create(c){var b=SC.mixin(SC.beget(this.fn),c||{});
if(c.hasOwnProperty("toString")){b.toString=c.toString}var a=function(){var d=SC.beget(b);
d.defaultClass=this;d.constructor=a;return d.init.apply(d,arguments)};a.fn=a.prototype=b;
a.extend=SC.Builder.create;a.mixin=SC.Builder.mixin;return a};SC.Builder.mixin=function(){var b=arguments.length,a;
for(a=0;a<b;a++){SC.mixin(this,arguments[a])}return this};SC.Builder.fn={init:function(a){if(a!==undefined){if(SC.typeOf(a)===SC.T_ARRAY){var b=a.length;
while(--b>=0){this[b]=a.objectAt?a.objectAt(b):a[b]}this.length=a.length}else{this[0]=a;
this.length=1}}return this},size:function(){return this.length},pushStack:function(){var a=this.constructor.apply(this,arguments);
a.prevObject=this;return a},end:function(){return this.prevObject||this.constructor()
},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var a=SC.Enumerable,c=SC.Builder.fn,b,d;for(b in a){if(!a.hasOwnProperty(b)){continue
}d=Array.prototype[b]||a[b];c[b]=d}})();sc_require("system/builder");SC.CoreQuery=(function(){var u=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,e=/^.[^:#\[\.]*$/,f;
var s=SC.browser.msie?"styleFloat":"cssFloat";var m=(SC.browser.safari&&parseInt(SC.browser.version,0)<417)?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var p=new RegExp("^("+m+"+)(#)("+m+"+)");var j=new RegExp("^([#.]?)("+m+"*)");var d=new RegExp("([#.]?)("+m+"*)","g");
var i=["Left","Right"];var c=["Top","Bottom"];var k={position:"absolute",visibility:"hidden",display:"block"};
var r=function r(x,w,C){var B=w=="width"?x.offsetWidth:x.offsetHeight;var z=0,v=0,A=C.length,y;
while(--A>=0){y=C[A];z+=parseFloat(b.curCSS(x,"padding"+y,true))||0;v+=parseFloat(b.curCSS(x,"border"+y+"Width",true))||0
}B-=Math.round(z+v);return B};var g=SC.guidKey,q=0,t={},a=/z-?index|font-?weight|opacity|zoom|line-?height/i,n=document.defaultView||{};
var l=function l(w){if(!SC.browser.safari){return false}var v=n.getComputedStyle(w,null);
return !v||v.getPropertyValue("color")==""};function h(v,w){return v[0]&&parseInt(b.curCSS(v[0],w,true),10)||0
}var o,b;b=o=SC.Builder.create({jquery:"SC.CoreQuery",init:function(v,x){v=v||document;
if(v.nodeType){this[0]=v;this.length=1;return this}else{if(typeof v==="string"){var w=u.exec(v);
if(w&&(w[1]||!x)){if(w[1]){v=b.clean([w[1]],x)}else{var y=document.getElementById(w[3]);
if(y){if(y.id!=w[3]){return b().find(v)}return b(y)}v=[]}}else{return b(x).find(v)
}}else{if(SC.typeOf(v)===SC.T_FUNCTION){return SC.ready(v)}}}return this.setArray(b.makeArray(v))
},size:function(){return this.length},get:function(v){return v===f?b.makeArray(this):this[v]
},find:function(v){var w=b.map(this,function(x){return b.find(v,x)});return this.pushStack(w)
},filter:function(v){return this.pushStack((SC.typeOf(v)===SC.T_FUNCTION)&&b.grep(this,function(x,w){return v.call(x,w)
})||b.multiFilter(v,this))},not:function(v){if(typeof v==="string"){if(e.test(v)){return this.pushStack(b.multiFilter(v,this,true))
}else{v=b.multiFilter(v,this)}}var w=v.length&&v[v.length-1]!==f&&!v.nodeType;return this.filter(function(){return w?b.inArray(this,v)<0:this!=v
})},setArray:function(v){this.length=0;Array.prototype.push.apply(this,v);return this
},map:function(v){return this.pushStack(b.map(this,function(x,w){return v.call(x,w,x)
}))},each:function(w,v){return b.each(this,w,v)},index:function(v){if(v&&v.jquery){v=v[0]
}return Array.prototype.indexOf.call(this,v)},eq:function(v){return this.slice(v,+v+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},add:function(v){return this.pushStack(b.merge(this.get(),typeof v==="string"?b(v):b.makeArray(v)).uniq())
},attr:function(w,y,x){var v=w;if(typeof w==="string"){if(y===f){return this[0]&&b[x||"attr"](this[0],w)
}else{v={};v[w]=y}}return this.each(function(z){for(w in v){b.attr((x)?this.style:this,w,b.prop(this,v[w],x,z,w))
}})},html:function(v){return v===f?(this[0]?this[0].innerHTML.replace(/ CQ\d+="(?:\d+|null)"/g,""):null):this.empty().append(v)
},andSelf:function(){return this.add(this.prevObject)},is:function(v){return !!v&&b.multiFilter(v,this).length>0
},hasClass:function(v){return Array.prototype.every.call(this,function(w){return(w.nodeType!=1)||b.className.has(w,v)
})},val:function(B){if(B===f){var v=this[0];if(v){if(b.nodeName(v,"option")){return(v.attributes.value||{}).specified?v.value:v.text
}if(b.nodeName(v,"select")){var z=v.selectedIndex,C=[],D=v.options,y=v.type=="select-one";
if(z<0){return null}var w,A=y?z+1:D.length;for(w=y?z:0;w<A;w++){var x=D[w];if(x.selected){B=b(x).val();
if(y){return B}C.push(B)}}return C}return(v.value||"").replace(/\r/g,"")}return f
}else{if(typeof B==="number"){B+=""}this.each(function(){if(this.nodeType!=1){return
}if(SC.typeOf(B)===SC.T_ARRAY&&(/radio|checkbox/).test(this.type)){this.checked=(b.inArray(this.value,B)>=0||b.inArray(this.name,B)>=0)
}else{if(b.nodeName(this,"select")){var E=b.makeArray(B);b("option",this).each(function(){this.selected=(b.inArray(this.value,E)>=0||b.inArray(this.text,E)>=0)
});if(!E.length){this.selectedIndex=-1}}else{this.value=B}}})}return this},clone:function(){var v=this.map(function(){if(SC.browser.msie&&!b.isXMLDoc(this)){var y=this.cloneNode(true),x=document.createElement("div");
x.appendChild(y);return b.clean([x.innerHTML])[0]}else{return this.cloneNode(true)
}});var w=v.find("*").andSelf().each(function(){if(this[SC.guidKey]!==f){this[SC.guidKey]=null
}});return v},css:function(v,w){if((v=="width"||v=="height")&&parseFloat(w,0)<0){w=f
}return this.attr(v,w,"curCSS")},text:function(w){if(typeof w!=="object"&&w!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(w))
}var v="";b.each(w||this,function(){b.each(this.childNodes,function(){if(this.nodeType!=8){v+=this.nodeType!=1?this.nodeValue:b.fn.text([this])
}})});return v},show:function(){var v=SC.$.isVisible;this.each(function(){if(!v(this)){this.style.display=this.oldblock||"";
if(b.css(this,"display")=="none"){var w=b("<"+this.tagName+"/>");b("body").append(w);
this.style.display=w.css("display");if(this.style.display==="none"){this.style.display="block"
}w.remove();w=null}}});return this},hide:function(){var v=SC.$.isVisible;this.each(function(){if(v(this)){this.oldblock=this.oldblock||b.css(this,"display");
this.style.display="none"}});return this},domManip:function(x,y,w,A){var z=this.length>1,v;
return this.each(function(){if(!v){v=b.clean(x,this.ownerDocument);if(w){v.reverse()
}}var B=this;if(y&&b.nodeName(this,"table")&&b.nodeName(v[0],"tr")){B=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}b.each(v,function(){var C=z?b(this).clone(true)[0]:this;A.call(B,C)})})},append:function(){return this.domManip(arguments,true,false,function(v){if(this.nodeType==1){this.appendChild(v)
}})},prepend:function(){return this.domManip(arguments,true,true,function(v){if(this.nodeType==1){this.insertBefore(v,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(v){this.parentNode.insertBefore(v,this)
})},after:function(){return this.domManip(arguments,false,true,function(v){this.parentNode.insertBefore(v,this.nextSibling)
})},replaceWith:function(v){return this.after(v).remove()},removeData:function(v){return this.each(function(){SC.removeData(this,v)
})}});o.mixin({nodeName:function(w,v){return w.nodeName&&w.nodeName.toUpperCase()==v.toUpperCase()
},map:function(v,A){var w=[];for(var x=0,y=v.length;x<y;x++){var z=A(v[x],x);if(z!=null){w[w.length]=z
}}return w.concat.apply([],w)},each:function(x,B,w){var v,y=0,z=x.length;if(w){if(z===f){for(v in x){if(B.apply(x[v],w)===false){break
}}}else{for(;y<z;){if(B.apply(x[y++],w)===false){break}}}}else{if(z===f){for(v in x){if(B.call(x[v],v,x[v])===false){break
}}}else{for(var A=x[0];y<z&&B.call(A,y,A)!==false;A=x[++y]){}}}return x},isXMLDoc:function(v){return v.documentElement&&!v.body||v.tagName&&v.ownerDocument&&!v.ownerDocument.body
},clean:function(v,x){var w=[];x=x||document;if(typeof x.createElement=="undefined"){x=x.ownerDocument||x[0]&&x[0].ownerDocument||document
}b.each(v,function(B,D){if(typeof D==="number"){D+=""}if(!D){return}if(typeof D==="string"){D=D.replace(/(<(\w+)[^>]*?)\/>/g,function(G,H,F){return F.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?G:H+"></"+F+">"
});var A=D.replace(/^\s+/,"").substring(0,10).toLowerCase(),E=x.createElement("div");
var C=!A.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!A.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||A.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!A.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!A.indexOf("<td")||!A.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!A.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||SC.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
E.innerHTML=C[1]+D+C[2];while(C[0]--){E=E.lastChild}if(SC.browser.msie){var z=!A.indexOf("<table")&&A.indexOf("<tbody")<0?E.firstChild&&E.firstChild.childNodes:C[1]=="<table>"&&A.indexOf("<tbody")<0?E.childNodes:[];
for(var y=z.length-1;y>=0;--y){if(b.nodeName(z[y],"tbody")&&!z[y].childNodes.length){z[y].parentNode.removeChild(z[y])
}}if(/^\s/.test(D)){E.insertBefore(x.createTextNode(D.match(/^\s*/)[0]),E.firstChild)
}}D=b.makeArray(E.childNodes)}if(D.length===0&&(!b.nodeName(D,"form")&&!b.nodeName(D,"select"))){return
}if(D[0]===f||b.nodeName(D,"form")||D.options){w.push(D)}else{w=b.merge(w,D)}});return w
},find:function(I,w){if(typeof I!="string"){return[I]}if(I.indexOf(",")>=0){var D=I.split(",").map(function(K){return b.find(K,w)
});return D.concat.apply([],D).uniq()}if(w&&w.nodeType!=1&&w.nodeType!=9){return[]
}w=w||document;var D=[w],F,v=YES;var z=I.match(d),C=z.length,y;for(var G=0;G<C;G++){I=z[G];
if(I===" "||I===""){v=YES}else{if(v){y=j.exec(I);if((y[1]==="")&&(G<(C-1))&&(z[G+1].charAt(0)==="#")){I=z[G+1];
z[G+1]=z[G];y=j.exec(I)}var B=[],A=D.length,E,H,x=y[2],J;for(E=0;E<A;E++){H=D[E];
switch(y[1]){case"":if(!x){x="*"}if(x=="*"&&H.nodeName.toLowerCase()=="object"){x="param"
}B=b.merge(B,H.getElementsByTagName(x));break;case"#":if(H===document){J=document.getElementById(x);
if(SC.browser.msie&&J&&J.getAttribute("id")!==x){J=NO}else{if(J){B.push(J)}J=YES}}else{J=NO
}if(!J){J=H.getElementsByTagName("*");J=Array.prototype.find.call(J,function(K){return K.getAttribute&&(K.getAttribute("id")===x)
});if(J){B.push(J)}}break;case".":if(H.getElementsByClassName){B=b.merge(B,H.getElementsByClassName(x))
}else{B=b.merge(B,b.classFilter(H.getElementsByTagName("*"),x))}break;default:}}delete D;
D=B;v=NO}else{D=b.filter(I,D)}}}if(D&&D[0]==w){D.shift()}return D.uniq()},classFilter:function(A,v,z){v=" "+v+" ";
var x=[];for(var w=0;A[w];w++){var y=(" "+A[w].className+" ").indexOf(v)>=0;if(!z&&y||z&&!y){x.push(A[w])
}}return x},filter:function(w,A,z){var v=j.exec(w),B=v[2],y=v[1],x;if(y==="."){return b.classFilter(b.makeArray(A),B,z)
}else{if(y==="#"){x=function(D){var C=D&&D.getAttribute&&(D.getAttribute("id")===B);
return(z)?!C:C}}else{x=function(D){var C=b.nodeName(D,B);return(z)?!C:C}}return Array.prototype.filter.call(b.makeArray(A),x)
}},multiFilter:function(y,v,x){y=(y.indexOf(","))?y.split(","):[y];var A=y.length,z,w=[];
while(--A>=0){z=b.filter(y[A].trim(),v,x);w=x?v=z:b.merge(z,w)}return w},merge:function(y,v){var w=0,x,z=y.length;
if(SC.browser.msie){while(x=v[w++]){if(x.nodeType!=8){y[z++]=x}}}else{while(x=v[w++]){y[z++]=x
}}return y},makeArray:function(x){var v=[];if(x!=null){var w=x.length;if(w==null||typeof x==="string"||x.setInterval){v[0]=x
}else{while(w){v[--w]=x[w]}}}return v},inArray:function(v,w){return(w.indexOf)?w.indexOf(v):Array.prototype.indexOf.call(w,v)
},boxModel:!SC.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":s,cssFloat:s,styleFloat:s,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan"},prop:function(y,z,x,w,v){if(SC.typeOf(z)===SC.T_FUNCTION){z=z.call(y,w)
}return z&&(typeof z==="number")&&x=="curCSS"&&!a.test(v)?z+"px":z},grep:function(w,A,v){var x=[];
for(var y=0,z=w.length;y<z;y++){if(!v!=!A(w[y],y)){x.push(w[y])}}return x},className:{add:function(w,x){var v=b.className.has;
b.each((x||"").split(/\s+/),function(y,z){if(w.nodeType==1&&!v(w.className,z)){w.className+=(w.className?" ":"")+z
}})},remove:function(v,w){if(v.nodeType==1){v.className=w!==f?b.grep(v.className.split(/\s+/),function(x){return !b.className.has(w,x)
}).join(" "):""}},has:function(w,v){return w&&b.inArray(v,(w.className||w).toString().split(/\s+/))>-1
}},swap:function(A,z,C,B,v){var w={};for(var y in z){w[y]=A.style[y];A.style[y]=z[y]
}var x=C(A,B,v);for(var y in z){A.style[y]=w[y]}return x},css:function(x,v,y){if(v=="width"||v=="height"){var A,z=(v=="width")?i:c,w=k;
A=SC.$.isVisible(x)?r(x,v,z):b.swap(x,w,r,v,z);return Math.max(0,A)}return b.curCSS(x,v,y)
},curCSS:function(B,w,x){var G,v=B.style;if(w=="opacity"&&SC.browser.msie){G=b.attr(v,"opacity");
return G==""?"1":G}if(SC.browser.opera&&w==="display"){var H=v.outline;v.outline="0 solid black";
v.outline=H}var y=w.match(/float/i);if(y){w=s}if(!x&&v&&v[w]){G=v[w]}else{if(n.getComputedStyle){if(y){w="float"
}w=w.replace(/([A-Z])/g,"-$1").toLowerCase();var I=n.getComputedStyle(B,null);if(I&&!l(B,n)){G=I.getPropertyValue(w)
}else{var A=[],J=[],K=B,D=0,F,C;for(;K&&l(K);K=K.parentNode){J.unshift(K)}for(C=J.length;
D<C;D++){if(l(J[D])){A[D]=J[D].style.display;J[D].style.display="block"}}G=(w=="display"&&A[J.length-1]!=null)?"none":(I&&I.getPropertyValue(w))||"";
for(D=0,F=A.length;D<F;D++){if(A[D]!=null){J[D].style.display=A[D]}}}if(w=="opacity"&&G==""){G="1"
}}else{if(B.currentStyle){G=B.currentStyle[w]||B.currentStyle[w.camelize()];if(!(/^\d+(px)?$/i).test(G)&&(/^\d/).test(G)){var z=v.left,E=B.runtimeStyle.left;
B.runtimeStyle.left=B.currentStyle.left;v.left=G||0;G=v.pixelLeft+"px";v.left=z;B.runtimeStyle.left=E
}}}}return G},dir:function(x,w){var v=[],y=x[w];while(y&&y!=document){if(y.nodeType==1){v.push(y)
}y=y[w]}return v},nth:function(z,v,x,y){v=v||1;var w=0;for(;z;z=z[x]){if(z.nodeType==1&&++w==v){break
}}return z},sibling:function(x,w){var v=[];for(;x;x=x.nextSibling){if(x.nodeType==1&&x!=w){v.push(x)
}}return v},attr:function(w,v,C){if(!w||w.nodeType==3||w.nodeType==8){return f}var x=!b.isXMLDoc(w),B=C!==f,z=SC.browser.msie;
v=x&&b.props[v]||v;if(w.tagName){var A=/href|src|style/.test(v);if(v=="selected"&&w.parentNode){w.parentNode.selectedIndex
}if(v in w&&x&&!A){if(B){if(v=="type"&&b.nodeName(w,"input")&&w.parentNode){throw"type property can't be changed"
}w[v]=C}if(b.nodeName(w,"form")&&w.getAttributeNode(v)){return w.getAttributeNode(v).nodeValue
}if(v=="tabIndex"){var D=w.getAttributeNode("tabIndex");return D&&D.specified?D.value:w.nodeName.match(/(button|input|object|select|textarea)/i)?0:w.nodeName.match(/^(a|area)$/i)&&w.href?0:f
}return w[v]}if(z&&x&&v==="style"){return b.attr(w.style,"cssText",C)}if(B){w.setAttribute(v,""+C)
}var y=(z&&x&&A)?w.getAttribute(v,2):w.getAttribute(v);return y===null?f:y}if(z&&v=="opacity"){if(B){w.zoom=1;
w.filter=(w.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(C,0)+""=="NaN"?"":"alpha(opacity="+C*100+")")
}return w.filter&&w.filter.indexOf("opacity=")>=0?(parseFloat(w.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}v=v.camelize();if(B){w[v]=C}return w[v]}});b.fn.init.prototype=b.fn;b.each({parent:function(v){return v.parentNode
},parents:function(v){return b.dir(v,"parentNode")},next:function(v){return b.nth(v,2,"nextSibling")
},prev:function(v){return b.nth(v,2,"previousSibling")},nextAll:function(v){return b.dir(v,"nextSibling")
},prevAll:function(v){return b.dir(v,"previousSibling")},siblings:function(v){return b.sibling(v.parentNode.firstChild,v)
},children:function(v){return b.sibling(v.firstChild)},contents:function(v){return b.nodeName(v,"iframe")?v.contentDocument||v.contentWindow.document:b.makeArray(v.childNodes)
}},function(v,w){b.fn[v]=function(x){var y=b.map(this,w);if(x&&typeof x=="string"){y=b.multiFilter(x,y)
}return this.pushStack(y.uniq())}});b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(v,w){b.fn[v]=function(){var x=arguments;
return this.each(function(){for(var y=0,z=x.length;y<z;y++){b(x[y])[w](this)}})}});
b.each({removeAttr:function(v){b.attr(this,v,"");if(this.nodeType==1){this.removeAttribute(v)
}},addClass:function(v){b.className.add(this,v)},removeClass:function(v){b.className.remove(this,v)
},toggleClass:function(v){b.className[b.className.has(this,v)?"remove":"add"](this,v)
},remove:function(v){if(!v||b.filter(v,[this]).length){if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){while(this.firstChild){this.removeChild(this.firstChild)}}},function(v,w){b.fn[v]=function(){return this.each(w,arguments)
}});b.each(["Height","Width"],function(y,w){var z=w.toLowerCase();b.fn[z]=function(A){if(this[0]===window){if(SC.browser.opera){ret=document.body["client"+w]
}else{if(SC.browser.safari){ret=window["inner"+w]}else{if(document.compatMode){ret=documentElement["client"+w]
}else{ret=document.body["client"+w]}}}}else{if(this[0]===document){ret=Math.max(Math.max(document.body["scroll"+w],document.documentElement["scroll"+w]),Math.max(document.body["offset"+w],document.documentElement["offset"+w]))
}else{if(A==f){return this.length?b.css(this[0],z):null}else{return this.css(z,(typeof A==="string")?A:A+"px")
}}}return ret};var v=y?"Left":"Top",x=y?"Right":"Bottom";b.fn["inner"+w]=function(){return this[w.toLowerCase()]()+h(this,"padding"+v)+h(this,"padding"+x)
};b.fn["outer"+w]=function(A){return this["inner"+w]()+h(this,"border"+v+"Width")+h(this,"border"+x+"Width")+(A?h(this,"margin"+v)+h(this,"margin"+x):0)
}});o.fn.offset=function(){var w=0,E=0,x=this[0],J=SC.browser,A;if(!x){return f}function z(K){I(b.curCSS(K,"borderLeftWidth",true),b.curCSS(K,"borderTopWidth",true))
}function I(K,L){w+=parseInt(K,10)||0;E+=parseInt(L,10)||0}var G=x.parentNode,D=x,v=x.offsetParent,F=x.ownerDocument,H=J.safari&&parseInt(J.version,0)<522&&!(/adobeair/i).test(J.userAgent),C=b.curCSS,y=b.css(x,"position")=="fixed";
if(!(J.mozilla&&x==document.body)&&x.getBoundingClientRect){var B=x.getBoundingClientRect();
I(B.left+Math.max(F.documentElement.scrollLeft,F.body.scrollLeft),B.top+Math.max(F.documentElement.scrollTop,F.body.scrollTop));
I(-F.documentElement.clientLeft,-F.documentElement.clientTop)}else{I(x.offsetLeft,x.offsetTop);
while(v){I(v.offsetLeft,v.offsetTop);if(J.mozilla&&!(/^t(able|d|h)$/i).test(v.tagName)||J.safari&&!H){z(v)
}if(!y&&C(v,"position")=="fixed"){y=true}D=(/^body$/i).test(v.tagName)?D:v;v=v.offsetParent
}while(G&&G.tagName&&!(/^body|html$/i).test(G.tagName)){if(!(/^inline|table.*$/i).test(C(G,"display"))){I(-G.scrollLeft,-G.scrollTop)
}if(J.mozilla&&C(G,"overflow")!="visible"){z(G)}G=G.parentNode}if((H&&(y||C(D,"position")=="absolute"))||(J.mozilla&&C(D,"position")!="absolute")){I(-F.body.offsetLeft,-F.body.offsetTop)
}if(y){I(Math.max(F.documentElement.scrollLeft,F.body.scrollLeft),Math.max(F.documentElement.scrollTop,F.body.scrollTop))
}}A={top:E,left:w};return A};o.fn.mixin({position:function(){var z=0,y=0,w;if(this[0]){var x=this.offsetParent(),A=this.offset(),v=/^body|html$/i.test(x[0].tagName)?{top:0,left:0}:x.offset();
A.top-=h(this,"marginTop");A.left-=h(this,"marginLeft");v.top+=h(x,"borderTopWidth");
v.left+=h(x,"borderLeftWidth");w={top:A.top-v.top,left:A.left-v.left}}return w},offsetParent:function(){var v=this[0].offsetParent||document.body;
while(v&&(!(/^body|html$/i).test(v.tagName)&&b.css(v,"position")=="static")){v=v.offsetParent
}return b(v)}});b.each(["Left","Top"],function(w,v){var x="scroll"+v;b.fn[x]=function(y){if(!this[0]){return
}return y!=f?this.each(function(){this==window||this==document?window.scrollTo(!w?y:b(window).scrollLeft(),w?y:b(window).scrollTop()):this[x]=y
}):this[0]==window||this[0]==document?self[w?"pageYOffset":"pageXOffset"]||b.boxModel&&document.documentElement[x]||document.body[x]:this[0][x]
}});return o}());SC.$=(typeof jQuery=="undefined")?SC.CoreQuery:jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var c=[];
var b=this.length,a=0;for(a=0;a<b;a++){c[a]="%@: %@".fmt(a,(this[a])?this[a].toString():"(null)")
}return"<$:%@>(%@)".fmt(SC.guidFor(this),c.join(" , "))},isVisible:function(){return Array.prototype.every.call(this,function(a){return SC.$.isVisible(a)
})},first:function(){return this.pushStack([this[0]])},last:function(){return this.pushStack([this[this.length-1]])
},view:function(){return this.map(function(){var b=null,a=SC.viewKey,d=this,c;while(!b&&d&&(d!==document)){if(c=d.getAttribute("id")){b=SC.View.views[c]
}d=d.parentNode}d=null;return b})},setClass:function(d,c){if(SC.none(d)){return this
}var e=SC.typeOf(d)!==SC.T_STRING;var a=this._fixupClass,b;this.each(function(){if(this.nodeType!==1){return
}var h=this.className.split(/\s+/),g=NO;if(e){for(var f in d){if(!d.hasOwnProperty(f)){continue
}g=a(h,f,d[f])||g}}else{g=a(h,d,c)}if(g){this.className=h.join(" ")}});return this
},_fixupClass:function(d,a,c){var b=d.indexOf(a);if(c){if(b<0){d.push(a);return YES
}}else{if(b>=0){d[b]=null;return YES}}return NO},within:function(e){e=SC.$(e);var d,c,g,b,a=e.length;
var f=this.length;while(!d&&(--f>=0)){g=this[f];for(b=0;!d&&(b<a);b++){c=e[b];while(c&&(c!==g)){c=c.parentNode
}d=c===g}}g=c=null;return d}});(function(){var c={};var f={find:function(i,h){return(h!==undefined)?SC.Enumerable.find.call(this,i,h):c.find.call(this,i)
},filter:function(i,h){return(h!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,i,h)):c.filter.call(this,i)
},filterProperty:function(h,i){return this.pushStack(SC.Enumerable.filterProperty.call(this,h,i))
},indexOf:SC.$.index,map:function(i,h){return(h!==undefined)?SC.Enumerable.map.call(this,i,h):c.map.call(this,i)
}};var g=SC.$.jquery==="SC.CoreQuery";var d=SC.$.fn,a=g?f:SC.Enumerable;for(var b in a){if(!a.hasOwnProperty(b)){continue
}var e=a[b];if(b in f){c[b]=d[b];e=f[b]}d[b]=e}})();SC.mixin(SC.$,{isVisible:function(a){var b=SC.$;
return("hidden"!=a.type)&&(b.css(a,"display")!="none")&&(b.css(a,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(d){if(d){this.originalEvent=d;
var g=SC.Event._props,c=g.length,b=c;while(--b>=0){var e=g[b];this[e]=d[e]}}this.timeStamp=this.timeStamp||Date.now();
if(!this.target){this.target=this.srcElement||document}if(this.target.nodeType===3){this.target=this.target.parentNode
}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var h=document.documentElement,a=document.body;
this.pageX=this.clientX+(h&&h.scrollLeft||a&&a.scrollLeft||0)-(h.clientLeft||0);this.pageY=this.clientY+(h&&h.scrollTop||a&&a.scrollTop||0)-(h.clientTop||0)
}if(!this.which&&((this.charCode||d.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(SC.browser.safari&&d.wheelDelta!==undefined){this.wheelDelta=this.wheelDeltaY=0-(d.wheelDeltaY||d.wheelDelta);
this.wheelDeltaX=0-(d.wheelDeltaX||0)}else{if(!SC.none(d.detail)){var f=Math.floor(d.detail*2);
if(d.axis&&(d.axis===d.HORIZONTAL_AXIS)){this.wheelDeltaX=f;this.wheelDeltaY=this.wheelDelta=0
}else{this.wheelDeltaY=this.wheelDelta=f;this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-d.wheelDelta:d.wheelDelta;
this.wheelDeltaX=0}}return this};SC.mixin(SC.Event,{create:function(a){return new SC.Event(a)
},add:function(e,d,f,g,c){if(e&&e.isCoreQuery){if(e.length>0){e.forEach(function(h){this.add(h,d,f,g,c)
},this);return this}else{e=e.get(0)}}if(!e){return this}if(e.nodeType==3||e.nodeType==8){return SC.Event
}if(SC.browser.msie&&e.setInterval){e=window}if(SC.typeOf(f)===SC.T_FUNCTION){c=g;
g=f;f=null}else{if(f&&SC.typeOf(g)===SC.T_STRING){g=f[g]}}var b=SC.data(e,"events")||SC.data(e,"events",{});
var a=b[d];if(!a){a=b[d]={};this._addEventListener(e,d)}a[SC.guidFor(g)]=[f,g,c];
SC.Event._global[d]=YES;e=b=a=null;return this},remove:function(f,e,g,h){if(f&&f.isCoreQuery){if(f.length>0){f.forEach(function(i){this.remove(i,e,g,h)
},this);return this}else{f=f.get(0)}}if(!f){return this}if(f.nodeType==3||f.nodeType==8){return SC.Event
}if(SC.browser.msie&&f.setInterval){f=window}var a,d,c=SC.data(f,"events");if(!c){return this
}if(e===undefined){for(e in c){this.remove(f,e)}}else{if(a=c[e]){var b=NO;if(g||h){if(SC.typeOf(g)===SC.T_FUNCTION){h=g;
g=null}else{if(SC.typeOf(h)===SC.T_STRING){h=g[h]}}delete c[SC.guidFor(h)];d=null;
for(d in a){break}if(d===null){b=YES}}else{b=YES}if(b){delete c[e];this._removeEventListener(f,e)
}d=null;for(d in c){break}if(!d){SC.removeData(f,"events");delete this._elements[SC.guidFor(f)]
}}}f=c=a=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(d,c,b){var a=SC.Event.create({type:c,target:d,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(c)<0),cancelled:NO,normalized:YES});
if(b){SC.mixin(a,b)}return a},trigger:function(c,b,i,j){if(c&&c.isCoreQuery){if(c.length>0){c.forEach(function(m){this.trigger(m,b,i,j)
},this);return this}else{c=c.get(0)}}if(!c){return this}if(c.nodeType==3||c.nodeType==8){return undefined
}i=SC.A(i);var h,k=SC.typeOf(c[b]||null)===SC.T_FUNCTION;var a=i[0];if(!a||!a.preventDefault){a=this.simulateEvent(c,b);
i.unshift(a)}a.type=b;var g=c;do{h=SC.Event.handle.apply(g,i);g=(g===document)?null:(g.parentNode||document)
}while(!h&&a.bubbles&&g);g=null;var d=c["on"+b];var l=SC.CoreQuery.nodeName(c,"a")&&b==="click";
if((!k||l)&&d&&d.apply(c,i)===NO){h=NO}if(k&&j!==NO&&h!==NO&&!l){this.triggered=YES;
try{c[b]()}catch(f){}}this.triggered=NO;return h},handle:function(b){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var c,g,e,i,d,h;h=SC.A(arguments);h[0]=b=SC.Event.normalizeEvent(b||window.event);
d=(SC.data(this,"events")||{})[b.type];if(!d){return NO}for(var j in d){var k=d[j];
var a=k[1];b.handler=a;b.data=b.context=k[2];var f=k[0]||this;g=a.apply(f,h);if(c!==NO){c=g
}if(g===NO){b.preventDefault();b.stopPropagation()}}return c},unload:function(){var a,b=this._elements;
for(a in b){this.remove(b[a])}for(a in b){delete b[a]}delete this._elements},special:{ready:{setup:function(){SC._bindReady();
return},teardown:function(){return}},mouseenter:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseover",SC.Event.special.mouseover.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseover",SC.Event.special.mouseover.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseenter";return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(d,c){var b=d.relatedTarget;
while(b&&b!=c){try{b=b.parentNode}catch(a){b=c}}return b===c},_addEventListener:function(d,c){var e,b=this.special[c];
if(!b||b.setup.call(d)===NO){var a=SC.guidFor(d);this._elements[a]=d;e=SC.data(d,"listener")||SC.data(d,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[a],arguments)
});if(d.addEventListener){d.addEventListener(c,e,NO)}else{if(d.attachEvent){d.attachEvent("on"+c,e)
}}}d=b=e=null},_removeEventListener:function(c,b){var d,a=SC.Event.special[b];if(!a||(a.teardown.call(c)===NO)){d=SC.data(c,"listener");
if(d){if(c.removeEventListener){c.removeEventListener(b,d,NO)}else{if(c.detachEvent){c.detachEvent("on"+b,d)
}}}}c=a=d=null},_elements:{},normalizeEvent:function(a){if(a==window.event){return SC.Event.create(a)
}else{return a.normalized?a:SC.Event.create(a)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,allowDefault:function(){this.hasCustomEventHandling=YES;
return this},preventDefault:function(){var a=this.originalEvent;if(a){if(a.preventDefault){a.preventDefault()
}a.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var a=this.originalEvent;
if(a){if(a.stopPropagation){a.stopPropagation()}a.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){return(this.charCode>0)?String.fromCharCode(this.which):null
},commandCodes:function(){var e=this.keyCode,b=null,c=null,a="",d;if(e){b=SC.FUNCTION_KEYS[e];
if(!b&&(this.altKey||this.ctrlKey||this.metaKey)){b=SC.PRINTABLE_KEYS[e]}if(b){if(this.altKey){a+="alt_"
}if(this.ctrlKey||this.metaKey){a+="ctrl_"}if(this.shiftKey){a+="shift_"}}}if(!b){e=this.which;
c=b=String.fromCharCode(e);d=b.toLowerCase();if(this.metaKey){a="meta_";b=d}else{b=null
}}if(b){b=a+b}return[b,c]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload);
SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("cursorStyle")||SC.DEFAULT_CURSOR;var b=this.constructor.sharedStyleSheet();
if(b.insertRule){b.insertRule(".%@ {cursor: %@;}".fmt(SC.guidFor(this),a),b.cssRules?b.cssRules.length:0)
}else{if(b.addRule){b.addRule("."+SC.guidFor(this),"cursor: "+a)}}this.cursorStyle=a;
this.className=SC.guidFor(this);return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var d=this.get("cursorStyle")||SC.DEFAULT_CURSOR;
var f=this._rule;if(f){f.style.cursor=d;return}var c="."+this.get("className");var e=this.constructor.sharedStyleSheet();
var g=(e.cssRules?e.cssRules:e.rules)||[];for(var b=0,a=g.length;b<a;++b){f=g[b];
if(f.selectorText===c){this._rule=f;f.style.cursor=d;break}}}.observes("cursorStyle")});
SC.Cursor.sharedStyleSheet=function(){var b=this._styleSheet;if(!b){b=document.createElement("style");
b.type="text/css";var a=document.getElementsByTagName("head")[0];if(!a){a=document.documentElement
}a.appendChild(b);b=document.styleSheets[document.styleSheets.length-1];this._styleSheet=b
}return b};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomeFirstResponder:function(){var a=this.get("pane")||this.get("responderContext")||this.pane();
if(a&&this.get("acceptsFirstResponder")){if(a.get("firstResponder")!==this){a.makeFirstResponder(this)
}}return this},resignFirstResponder:function(){var a=this.get("pane")||this.get("responderContext");
if(a&&(a.get("firstResponder")===this)){a.makeFirstResponder(null)}return YES},willLoseFirstResponder:function(a){},didBecomeFirstResponder:function(a){}});
sc_require("system/browser");sc_require("system/event");sc_require("system/cursor");
sc_require("system/responder");sc_require("mixins/string");SC.viewKey=SC.guidKey+"_view";
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.ANCHOR_TOP={top:0};SC.ANCHOR_LEFT={left:0};
SC.ANCHOR_TOP_LEFT={top:0,left:0};SC.ANCHOR_BOTTOM={bottom:0};SC.ANCHOR_RIGHT={right:0};
SC.ANCHOR_BOTTOM_RIGHT={bottom:0,right:0};SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.EMPTY_CHILD_VIEWS_ARRAY=[];
SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;SC.View=SC.Responder.extend(SC.DelegateSupport,{concatenatedProperties:"outlets displayProperties layoutProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var a=this;
while(a&&!a.isPane){a=a.get("parentView")}return a}.property("parentView").cacheable(),page:null,splitView:function(){var a=this;
while(a&&!a.isSplitView){a=a.get("parentView")}return a}.property("parentView").cacheable(),parentView:null,backgroundColor:null,isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var a=this.get("isEnabled"),b;
if(a&&(b=this.get("parentView"))){a=b.get("isEnabledInPane")}return a}.property("parentView","isEnabled"),isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:NO,recomputeIsVisibleInWindow:function(c){var e=this.get("isVisibleInWindow");
var g=this.get("isVisible"),d;if(g){g=(c===undefined)?((d=this.get("parentView"))?d.get("isVisibleInWindow"):NO):c
}if(e!==g){this.set("isVisibleInWindow",g);this._needsVisibiltyChange=YES;var f=this.get("childViews"),b=f.length,a;
for(a=0;a<b;a++){f[a].recomputeIsVisibleInWindow(g)}if(g){if(this.parentViewDidResize){this.parentViewDidResize()
}if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}this.set("layerNeedsUpdate",YES);if(!g&&this.get("isFirstResponder")){this.resignFirstResponder()
}}return this}.observes("isVisible"),childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,insertBefore:function(b,d){b.beginPropertyChanges();
if(b.get("parentView")){b.removeFromParent()}if(this.willAddChild){this.willAddChild(b,d)
}if(b.willAddToParent){b.willAddToParent(this,d)}b.set("parentView",this);var a,c=this.get("childViews");
if(c.needsClone){this.set(c=[])}a=(d)?c.indexOf(d):c.length;if(a<0){a=c.length}c.insertAt(a,b);
b.parentViewDidChange();b.layoutDidChange();if(this.didAddChild){this.didAddChild(b,d)
}if(b.didAddToParent){b.didAddToParent(this,d)}b.endPropertyChanges();return this
},removeChild:function(b){if(!b){return this}if(b.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,b)
}if(b.willRemoveFromParent){b.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(b)
}b.set("parentView",null);var c=this.get("childViews");var a=c.indexOf(b);if(a>=0){c.removeAt(a)
}b.parentViewDidChange();if(this.didRemoveChild){this.didRemoveChild(b)}if(b.didRemoveFromParent){b.didRemoveFromParent(this)
}return this},removeAllChildren:function(){var b=this.get("childViews"),a;while(a=b.objectAt(b.get("length")-1)){this.removeChild(a)
}return this},removeFromParent:function(){var a=this.get("parentView");if(a){a.removeChild(this)
}return this},replaceChild:function(a,b){a.beginPropertyChanges();b.beginPropertyChanges();
this.beginPropertyChanges();this.insertBefore(a,b).removeChild(b);this.endPropertyChanges();
b.endPropertyChanges();a.endPropertyChanges();return this},replaceAllChildren:function(c){var b=c.get("length"),a;
this.beginPropertyChanges();this.destroyLayer().removeAllChildren();for(a=0;a<b;a++){this.appendChild(c.objectAt(a))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(a){return this.insertBefore(a,null)
},parentViewDidChange:function(){this.recomputeIsVisibleInWindow();this.set("layerLocationNeedsUpdate",YES);
this.invokeOnce(this.updateLayerLocationIfNeeded);this._invalidatePaneCacheForSelfAndAllChildViews();
return this}.observes("isVisible"),_invalidatePaneCacheForSelfAndAllChildViews:function(){this.notifyPropertyChange("pane");
var c=this.get("childViews");var b=c.length;for(var a=0;a<b;++a){var d=c[a];if(d._invalidatePaneCacheForSelfAndAllChildViews){d._invalidatePaneCacheForSelfAndAllChildViews()
}}},layer:function(a,c){if(c!==undefined){this._view_layer=c}else{c=this._view_layer;
if(!c){var b=this.get("parentView");if(b){b=b.get("layer")}if(b){this._view_layer=c=this.findLayerInParentLayer(b)
}b=null}}return c}.property("isVisibleInWindow").cacheable(),$:function(c){var a,b=this.get("layer");
a=!b?SC.$([]):(c===undefined)?SC.$(b):SC.$(c,b);b=null;return a},containerLayer:function(){return this.get("layer")
}.property("layer").cacheable(),layerId:function(){return SC.guidFor(this)}.property().cacheable(),findLayerInParentLayer:function(d){var a=this.get("layerId");
var f,c,b,h,e;if(d.getElementById){e=d.getElementById(a)}else{e=document.getElementById(a)
}if(SC.browser.msie&&e&&e.id!==a){e=null}if(!e&&d.querySelector){}if(!e){e=d.firstChild;
var g=[];g.push(d);while(g.length!==0){f=g[0];g.shift();if(f.id===a){h=true;e=f;break
}for(c=0,b=f.childNodes.length;c<b;c++){g.push(f.childNodes[c])}}if(!h){e=null}}return e
},displayDidChange:function(){this.set("layerNeedsUpdate",YES);return this},layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(){var a=this.get("isVisibleInWindow");
if((a||this._needsVisibiltyChange)&&this.get("layerNeedsUpdate")){this._needsVisibiltyChange=NO;
if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}else{this.set("layerNeedsUpdate",NO)
}return this},updateLayer:function(){var a=this.renderContext(this.get("layer"));
this.prepareContext(a,NO);a.update();if(this.didUpdateLayer){this.didUpdateLayer()
}return this},renderContext:function(a){return SC.RenderContext(a)},createLayer:function(){if(this.get("layer")){return this
}var a=this.renderContext(this.get("tagName"));this.prepareContext(a,YES);this.set("layer",a.element());
this._notifyDidCreateLayer();return this},_notifyDidCreateLayer:function(){if(this.didCreateLayer){this.didCreateLayer()
}var c=this.didCreateLayerMixin,b,a;if(c){b=c.length;for(a=0;a<b;++a){c[a].call(this)
}}var d=this.get("childViews");b=d.length;for(a=0;a<b;++a){if(!d[a]){continue}d[a]._notifyDidCreateLayer()
}},destroyLayer:function(){var a=this.get("layer");if(a){this._notifyWillDestroyLayer();
if(a.parentNode){a.parentNode.removeChild(a)}a=null}return this},replaceLayer:function(){this.destroyLayer();
this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded)
},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var c=this.willDestroyLayerMixin,b,a;if(c){b=c.length;for(a=0;a<b;++a){c[a].call(this)
}}var d=this.get("childViews");b=d.length;for(a=0;a<b;++a){d[a]._notifyWillDestroyLayer()
}this.set("layer",null)},prepareContext:function(f,h){var e,b,a,d,c,g;if(h){d=this.layerId?this.get("layerId"):SC.guidFor(this);
f.id(d).classNames(this.get("classNames"),YES);this.renderLayout(f,h)}else{f.resetClassNames();
f.classNames(this.get("classNames"),YES)}if(this.get("isTextSelectable")){f.addClass("allow-select")
}if(!this.get("isEnabled")){f.addClass("disabled")}if(!this.get("isVisible")){f.addClass("hidden")
}if(this.get("isFirstResponder")){f.addClass("focus")}c=this.get("backgroundColor");
if(c){f.addStyle("backgroundColor",c)}g=this.get("cursor");if(g){f.addClass(g.get("className"))
}this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);this.render(f,h);if(e=this.renderMixin){b=e.length;
for(a=0;a<b;++a){e[a].call(this,f,h)}}this.endPropertyChanges()},renderChildViews:function(e,f){var d=this.get("childViews"),b=d.length,a,c;
for(a=0;a<b;++a){c=d[a];if(!c){continue}e=e.begin(c.get("tagName"));c.prepareContext(e,f);
e=e.end()}return e},render:function(a,b){if(b){this.renderChildViews(a,b)}},tagName:"div",classNames:["sc-view"],toolTip:null,isTextSelectable:NO,displayProperties:["isFirstResponder","isVisible"],cursor:null,layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(a){if(this.get("layerLocationNeedsUpdate")){this.set("layerLocationNeedsUpdate",NO);
this.updateLayerLocation()}return this},updateLayerLocation:function(){var e=this.get("layer");
var d=this.get("parentView");var b=d?d.get("containerLayer"):null;if(e&&e.parentNode&&e.parentNode!==b){e.parentNode.removeChild(e)
}if(!d){if(e&&e.parentNode){e.parentNode.removeChild(e)}}else{if(!b){if(e){if(e.parentNode){e.parentNode.removeChild(e)
}this.destroyLayer()}}else{if(!e){this.createLayer();e=this.get("layer")}var f=d.get("childViews");
var c=f.objectAt(f.indexOf(this)+1);var a=(c)?c.get("layer"):null;if(c&&(!a||a.parentNode!==b)){c.updateLayerLocationIfNeeded();
a=c.get("layer")}if((e.parentNode!==b)||(e.nextSibling!==a)){b.insertBefore(e,a);
if(this.parentViewDidResize){this.parentViewDidResize()}}}}b=d=e=null;return this
},nextResponder:function(){return this.get("parentView")}.property("parentView").cacheable(),acceptsFirstResponder:NO,isKeyResponder:NO,willLoseKeyResponderTo:function(a){},willBecomeKeyResponderFrom:function(a){},didLoseKeyResponderTo:function(a){},didBecomeKeyResponderFrom:function(a){},interpretKeyEvents:function(b){var a=b.commandCodes(),d=a[0],e=a[1],g;
if(!d&&!e){return null}if(d){var h=SC.MODIFIED_KEY_BINDINGS[d]||SC.BASE_KEY_BINDINGS[d.match(/[^_]+$/)[0]];
if(h){var f=this,c=this.get("pane"),i=null;while(f&&!(i=f.tryToPerform(h,b))){f=(f===c)?null:f.get("nextResponder")
}return i}}if(e&&this.respondsTo("insertText")){g=this.insertText(e,b);return g?(g===YES?this:g):null
}return null},insertText:function(a){return NO},performKeyEquivalent:function(e,c){var d=NO,f=this.get("childViews"),b=f.length,a=-1;
while(!d&&(++a<b)){d=f[a].performKeyEquivalent(e,c)}return d},nextKeyView:null,nextValidKeyView:function(){var a=SC.CoreSet.create(),b=this._computeNextValidKeyView(a);
a.destroy();return b}.property("nextKeyView"),_computeNextValidKeyView:function(c){var d=this.get("nextKeyView"),e,b,a;
c.add(this);if(!d){e=this.get("parentView");b=e?e.get("childViews"):null;a=b?b.indexOf(this):-1;
if(a<0){d=null}else{if(a+1>=b.get("length")){d=b.objectAt(0)}else{d=b.objectAt(a+1)
}}}if(d&&!d.get("acceptsFirstResponder")){if(c.contains(d)){d=null}else{d=d._computeNextValidKeyView(c)
}}return d},previousKeyView:null,previousValidKeyView:function(){var a=SC.CoreSet.create(),b=this._computePreviousValidKeyView(a);
a.destroy();return b}.property("previousKeyView"),_computePreviousValidKeyView:function(c){var d=this.get("previousKeyView"),e,b,a;
c.add(this);if(!d){e=this.get("parentView");b=e?e.get("childViews"):null;a=b?b.indexOf(this):-1;
if(a<0){d=null}else{if(a>0){d=b.objectAt(a-1)}else{d=b.objectAt(b.get("length")-1)
}}}if(d&&!d.get("acceptsFirstResponder")){if(c.contains(d)){d=null}else{d=d._computePreviousValidKeyView(c)
}}return d},init:function(){var e,g,c,b,a,d,h;arguments.callee.base.apply(this,arguments);
if(!this.get("isMaterialized")){SC.View.views[this.get("layerId")]=this}var f=this.get("childViews");
this.childViews=f?f.slice():[];this.createChildViews();h=this.get("displayProperties");
b=h.length;while(--b>=0){this.addObserver(h[b],this,this.displayDidChange)}if(this.get("isDropTarget")){SC.Drag.addDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.addScrollableView(this)}},awake:function(){arguments.callee.base.apply(this,arguments);
var c=this.get("childViews"),b=c.length,a;for(a=0;a<b;++a){if(!c[a]){continue}c[a].awake()
}},destroy:function(){if(this.get("isDestroyed")){return this}arguments.callee.base.apply(this,arguments);
this.removeFromParent();this._destroy();if(this.get("isDropTarget")){SC.Drag.removeDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.removeScrollableView(this)}return this},_destroy:function(){if(this.get("isDestroyed")){return this
}this.destroyLayer();var c=this.get("childViews"),b=c.length,a;if(b){c=c.slice();
for(a=0;a<b;++a){c[a]._destroy()}}delete SC.View.views[this.get("layerId")];delete this._CQ;
delete this.page;this.set("isDestroyed",YES);return this},createChildViews:function(){var f=this.get("childViews"),b=f.length,a,e,d,c;
this.beginPropertyChanges();for(a=0;a<b;++a){if(e=(c=f[a])){if(typeof e===SC.T_STRING){c=this[e]
}else{e=null}if(!c){console.error("No view with name "+e+" has been found in "+this.toString());
continue}if(c.isClass){c=this.createChildView(c);if(e){this[e]=c}}}f[a]=c}this.endPropertyChanges();
return this},createChildView:function(a,b){if(!b){b={}}b.owner=b.parentView=this;
b.isVisibleInWindow=this.get("isVisibleInWindow");if(!b.page){b.page=this.page}a=a.create(b);
return a},adjust:function(a,d){var b=SC.clone(this.get("layout")),c=NO,f;if(a===undefined){return this
}if(SC.typeOf(a)===SC.T_STRING){f=b[a];if(SC.none(d)){if(f!==undefined){c=YES}delete b[a]
}else{if(f!==d){c=YES}b[a]=d}}else{var e=a;for(a in e){if(!e.hasOwnProperty(a)){continue
}d=e[a];f=b[a];if(d===null){if(f!==undefined){c=YES}delete b[a]}else{if(d!==undefined){if(f!==d){c=YES
}b[a]=d}}}}if(c){this.set("layout",b)}return this},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(i,d){var c=0,b=0,g=0,e=0,a=this,h;
if(this.get("useStaticLayout")){throw"convertFrameToView is not available with static layout"
}while(a){h=a.get("frame");c+=h.x;b+=h.y;a=a.get("layoutView")}if(d){a=d;while(a){h=a.get("frame");
g+=h.x;e+=h.y;a=a.get("layoutView")}}c=i.x+c-g;b=i.y+b-e;return{x:c,y:b,width:i.width,height:i.height}
},convertFrameFromView:function(b,a){var j=0,h=0,g=0,e=0,i=this,c,d;if(this.get("useStaticLayout")){throw"convertFrameToView is not available with static layout"
}while(i){d=i.get("frame");j+=d.x;h+=d.y;i=i.get("parentView")}if(a){i=a;while(i){d=i.get("frame");
g+=d.x;e+=d.y;i=i.get("parentView")}}j=b.x-j+g;h=b.y-h+e;return{x:j,y:h,width:b.width,height:b.height}
},scrollToVisible:function(){var a=this.get("parentView");while(a&&!a.get("isScrollable")){a=a.get("parentView")
}if(a){a.scrollToVisible();return a.scrollToVisible(this)}else{return NO}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("layout","useStaticLayout").cacheable(),computeFrameWithParentFrame:function(a){var g=this.get("layout");
var h={},c,e,d=SC.LAYOUT_AUTO;var b=this.get("useStaticLayout");if(g.width!==undefined&&g.width===SC.LAYOUT_AUTO&&b!==undefined&&!b){c=SC.Error.desc("%@.layout() you cannot use width:auto if staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(c.toString());throw c}if(g.height!==undefined&&g.height===SC.LAYOUT_AUTO&&b!==undefined&&!b){c=SC.Error.desc("%@.layout() you cannot use height:auto if staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(c.toString());throw c}if(b){return null}if(!SC.none(g.left)){h.x=Math.floor(g.left);
if(g.width!==undefined){if(g.width===d){h.width=d}else{h.width=Math.floor(g.width)
}}else{if(!a){a=this.computeParentDimensions(g)}h.width=Math.floor(a.width-h.x-(g.right||0))
}}else{if(!SC.none(g.right)){if(!a){a=this.computeParentDimensions(g)}if(SC.none(g.width)){h.width=a.width-g.right;
h.x=0}else{if(g.width===d){h.width=d}else{h.width=Math.floor(g.width||0)}h.x=Math.floor(a.width-g.right-h.width)
}}else{if(!SC.none(g.centerX)){if(!a){a=this.computeParentDimensions(g)}if(g.width===d){h.width=d
}else{h.width=Math.floor(g.width||0)}h.x=Math.floor((a.width-h.width)/2+g.centerX)
}else{h.x=0;if(SC.none(g.width)){if(!a){a=this.computeParentDimensions(g)}h.width=Math.floor(a.width)
}else{if(g.width===d){h.width=d}else{h.width=Math.floor(g.width||0)}}}}}if(!SC.none(g.top)){h.y=Math.floor(g.top);
if(g.height!==undefined){if(g.height===d){h.height=d}else{h.height=Math.floor(g.height)
}}else{if(!a){a=this.computeParentDimensions(g)}h.height=Math.floor(a.height-h.y-(g.bottom||0))
}}else{if(!SC.none(g.bottom)){if(!a){a=this.computeParentDimensions(g)}if(SC.none(g.height)){h.height=a.height-g.bottom;
h.y=0}else{if(g.height===d){h.height=d}else{h.height=Math.floor(g.height||0)}h.y=Math.floor(a.height-g.bottom-h.height)
}}else{if(!SC.none(g.centerY)){if(!a){a=this.computeParentDimensions(g)}if(g.height===d){h.height=d
}else{h.height=Math.floor(g.height||0)}h.y=Math.floor((a.height-h.height)/2+g.centerY)
}else{h.y=0;if(SC.none(g.height)){if(!a){a=this.computeParentDimensions(g)}h.height=Math.floor(a.height)
}else{if(g.height===d){h.height=d}else{h.height=Math.floor(g.height||0)}}}}}if(h.height===d||h.width===d){e=this.get("layer");
if(h.height===d){h.height=e?e.clientHeight:0}if(h.width===d){h.width=e?e.clientWidth:0
}}if(!SC.none(g.maxHeight)&&(h.height>g.maxHeight)){h.height=g.maxHeight}if(!SC.none(g.minHeight)&&(h.height<g.minHeight)){h.height=g.minHeight
}if(!SC.none(g.maxWidth)&&(h.width>g.maxWidth)){h.width=g.maxWidth}if(!SC.none(g.minWidth)&&(h.width<g.minWidth)){h.width=g.minWidth
}if(h.height<0){h.height=0}if(h.width<0){h.width=0}return h},computeParentDimensions:function(e){var b,c=this.get("parentView"),a=(c)?c.get("frame"):null;
if(a){b={width:a.width,height:a.height}}else{var d=e;b={width:(d.left||0)+(d.width||0)+(d.right||0),height:(d.top||0)+(d.height||0)+(d.bottom||0)}
}return b},clippingFrame:function(){var b=this.get("parentView"),c=this.get("frame"),a=c;
if(b){b=b.get("clippingFrame");a=SC.intersectRects(b,c)}a.x-=c.x;a.y-=c.y;return a
}.property("parentView","frame").cacheable(),_sc_view_clippingFrameDidChange:function(){var d=this.get("childViews"),b=d.length,a,c;
for(a=0;a<b;++a){c=d[a];if(!c.hasStaticLayout){c.notifyPropertyChange("clippingFrame")
}}}.observes("clippingFrame"),parentViewDidResize:function(){var a=this.get("layout");
var b=((a.left!==undefined)&&(a.top!==undefined)&&(a.width!==undefined)&&(a.height!==undefined));
if(!b){this.notifyPropertyChange("frame");this.viewDidResize()}},viewDidResize:function(){var d=this.childViews,b=d.length,a,c;
for(a=0;a<b;++a){c=d[a];if(c.parentViewDidResize){c.parentViewDidResize()}}}.observes("layout"),beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var d=this.get("childViews"),b=d.length,a,c;for(a=0;a<b;++a){c=d[a];if(c.beginLiveResize){c.beginLiveResize()
}}return this},endLiveResize:function(){var d=this.get("childViews"),b=d.length,a,c;
for(a=b-1;a>=0;--a){c=d[a];if(c.endLiveResize){c.endLiveResize()}}if(this.didEndLiveResize){this.didEndLiveResize()
}return this},layoutStyle:function(){var b=this.get("layout"),d={},a=null,e,j=SC.LAYOUT_AUTO;
var k=this.get("useStaticLayout");if(b.width!==undefined&&b.width===SC.LAYOUT_AUTO&&!k){e=SC.Error.desc("%@.layout() you cannot use width:auto if  staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(e.toString());throw e}if(b.height!==undefined&&b.height===SC.LAYOUT_AUTO&&!k){e=SC.Error.desc("%@.layout() you cannot use height:auto if  staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(e.toString());throw e}if(!SC.none(b.left)){d.left=Math.floor(b.left);
if(b.width!==undefined){if(b.width===SC.LAYOUT_AUTO){d.width=SC.LAYOUT_AUTO}else{d.width=Math.floor(b.width)
}d.right=null}else{d.width=null;d.right=Math.floor(b.right||0)}d.marginLeft=0}else{if(!SC.none(b.right)){d.right=Math.floor(b.right);
d.marginLeft=0;if(SC.none(b.width)){d.left=0;d.width=null}else{d.left=null;if(b.width===SC.LAYOUT_AUTO){d.width=SC.LAYOUT_AUTO
}else{d.width=Math.floor(b.width||0)}}}else{if(!SC.none(b.centerX)){d.left="50%";
d.width=Math.floor(b.width||0);d.marginLeft=Math.floor(b.centerX-d.width/2);d.right=null
}else{if(!SC.none(b.width)){d.left=0;d.right=null;if(b.width===SC.LAYOUT_AUTO){d.width=SC.LAYOUT_AUTO
}else{d.width=Math.floor(b.width)}d.marginLeft=0}else{d.left=0;d.right=0;d.width=null;
d.marginLeft=0}}}}d.minWidth=(b.minWidth===undefined)?null:b.minWidth;d.maxWidth=(b.maxWidth===undefined)?null:b.maxWidth;
if(!SC.none(b.top)){d.top=Math.floor(b.top);if(b.height!==undefined){if(b.height===SC.LAYOUT_AUTO){d.height=SC.LAYOUT_AUTO
}else{d.height=Math.floor(b.height)}d.bottom=null}else{d.height=null;d.bottom=Math.floor(b.bottom||0)
}d.marginTop=0}else{if(!SC.none(b.bottom)){d.marginTop=0;d.bottom=Math.floor(b.bottom);
if(SC.none(b.height)){d.top=0;d.height=null}else{d.top=null;if(b.height===SC.LAYOUT_AUTO){d.height=SC.LAYOUT_AUTO
}else{d.height=Math.floor(b.height||0)}}}else{if(!SC.none(b.centerY)){d.top="50%";
d.height=Math.floor(b.height||0);d.marginTop=Math.floor(b.centerY-d.height/2);d.bottom=null
}else{if(!SC.none(b.height)){d.top=0;d.bottom=null;if(b.height===SC.LAYOUT_AUTO){d.height=SC.LAYOUT_AUTO
}else{d.height=Math.floor(b.height||0)}d.marginTop=0}else{d.top=0;d.bottom=0;d.height=null;
d.marginTop=0}}}}d.minHeight=(b.minHeight===undefined)?null:b.minHeight;d.maxHeight=(b.maxHeight===undefined)?null:b.maxHeight;
d.zIndex=SC.none(b.zIndex)?null:b.zIndex.toString();d.backgroundPosition=SC.none(b.backgroundPosition)?null:b.backgroundPosition.toString();
var h=SC._VIEW_DEFAULT_DIMS,c=h.length,f;while(--c>=0){f=h[c];if(d[f]===0){d[f]=null
}}for(var i in d){var g=d[i];if(typeof g===SC.T_NUMBER){d[i]=(g+"px")}}return d}.property().cacheable(),layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){this.beginPropertyChanges();
if(this.frame){this.notifyPropertyChange("frame")}this.notifyPropertyChange("layoutStyle");
this.endPropertyChanges();var a=this.get("layoutView");if(a){a.set("childViewsNeedLayout",YES);
a.layoutDidChangeFor(this);if(a.get("childViewsNeedLayout")){a.invokeOnce(a.layoutChildViewsIfNeeded)
}}return this}.observes("layout"),childViewsNeedLayout:NO,layoutDidChangeFor:function(b){var a=this._needLayoutViews;
if(!a){a=this._needLayoutViews=SC.CoreSet.create()}a.add(b)},layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);this.layoutChildViews()
}return this},layoutChildViews:function(){var f=this._needLayoutViews,b=f?f.length:0,a;
var c,e,d;for(a=0;a<b;a++){c=f[a];c.updateLayout()}c=e=d=null;f.clear()},updateLayout:function(){var b=this.get("layer"),a;
if(b){a=this.renderContext(b);this.renderLayout(a);a.update()}b=null;return this},renderLayout:function(a,b){a.addStyle(this.get("layoutStyle"))
},isView:YES,selectStart:function(a){return this.get("isTextSelectable")}});SC.View.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a},layout:function(a){this.prototype.layout=a;return this},classNames:function(a){a=(this.prototype.classNames||[]).concat(a);
this.prototype.classNames=a;return this},tagName:function(a){this.prototype.tagName=a;
return this},childView:function(a){var b=this.prototype.childViews||[];if(b===this.superclass.prototype.childViews){b=b.slice()
}b.push(a);this.prototype.childViews=b;return this},bind:function(b,d){var c=this.prototype,a=this.superclass.prototype;
var e=c._bindings;if(!e||e===a._bindings){e=c._bindings=(e||[]).slice()}b=b+"Binding";
c[b]=d;e.push(b);return this},prop:function(a,b){this.prototype[a]=b;return this},localization:function(b,a){if(a){b.rootElement=SC.$(a).get(0)
}return b},viewFor:function(d,c){var b=SC.$A(arguments);if(SC.none(d)){b.shift()}else{b[0]={rootElement:SC.$(d).get(0)}
}var a=this.create.apply(this,arguments);b=b[0]=null;return a},create:function(){var b=this,a=new b(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(a,SC.$A(arguments))}return a},loc:function(e){var b=e.childViews;
delete e.childViews;this.applyLocalizedAttributes(e);if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))
}var d=this.prototype.childViews,a=d.length;while(--a>=0){var c=d[a];e=b[a];if(e&&c&&c.loc){c.loc(e)
}}return this},applyLocalizedAttributes:function(a){SC.mixin(this.prototype,a)},views:{}});
SC.outlet=function(a){return function(b){return(this[b]=SC.objectForPropertyPath(a,this))
}.property()};SC.View.unload=function(){var a=SC.View.views;if(a){for(var b in a){if(!a.hasOwnProperty(b)){continue
}delete a[b]}}};SC.Event.add(window,"unload",SC.View,SC.View.unload);sc_require("views/view");
SC.Pane=SC.View.extend({isPane:YES,page:null,rootResponder:null,currentWindowSize:null,computeParentDimensions:function(){var a=this.get("currentWindowSize");
return{width:(a)?a.width:1000,height:(a)?a.height:1000}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property(),windowSizeDidChange:function(b,a){this.set("currentWindowSize",a);this.parentViewDidResize();
return this},sendEvent:function(c,a,d){var b;if(!d){d=this.get("firstResponder")}while(d&&!d.tryToPerform(c,a)){d=(d===this)?null:d.get("nextResponder")
}if(!d&&(d=this.get("defaultResponder"))){if(typeof d===SC.T_STRING){d=SC.objectForPropertyPath(d)
}if(!d){d=null}else{if(d.isResponderContext){d=d.sendAction(c,this,a)}else{d=d.tryToPerform(c,a)?d:null
}}}return a.mouseHandler||d},defaultResponder:null,nextResponder:function(){return null
}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(a){var c=this.get("firstResponder"),b=this.get("isKeyPane");
if(c===a){return this}if(c){c.willLoseFirstResponder(c)}if(b){if(c){c.willLoseKeyResponderTo(a)
}if(a){a.willBecomeKeyResponderFrom(c)}}if(c){c.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",a);if(a){a.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",b).endPropertyChanges()
}if(b){if(a){a.didBecomeKeyResponderFrom(c)}if(c){c.didLoseKeyResponderTo(a)}}if(a){a.didBecomeFirstResponder(a)
}return this},_forwardKeyChange:function(d,b,g,f){var c,a,e;if(d&&(a=this.get("firstResponder"))){e=(g)?g.get("firstResponder"):null;
c=this.get("firstResponder");if(c){c[b](e)}if((f!==undefined)&&a){a.set("isKeyResponder",f)
}}},willLoseKeyPaneTo:function(a){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",a,NO);
return this},willBecomeKeyPaneFrom:function(a){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",a,YES);
return this},didLoseKeyPaneTo:function(b){var a=this.get("isKeyPane");this.set("isKeyPane",NO);
this._forwardKeyChange(a,"didLoseKeyResponderTo",b);return this},didBecomeKeyPaneFrom:function(b){var a=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!a,"didBecomeKeyResponderFrom",b,YES);
return this},isMainPane:NO,focusFrom:function(a){},blurTo:function(a){},blurMainTo:function(a){this.set("isMainPane",NO)
},focusMainFrom:function(a){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}var b=this.get("layer");if(b.parentNode){b.parentNode.removeChild(b)}b=null;this.resignKeyPane();
var a=this.rootResponder;if(this.get("isMainPane")){a.makeMainPane(null)}a.panes.remove(this);
this.rootResponder=null;this.set("isPaneAttached",NO);this.parentViewDidChange();
return this},appendTo:function(b){var a=this.get("layer");if(!a){a=this.createLayer().get("layer")
}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,null);
b=a=null;return this.paneDidAttach()},prependTo:function(b){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,b.firstChild);b=a=null;return this.paneDidAttach()},before:function(c){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;
if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,c);
b=c=a=null;return this.paneDidAttach()},after:function(c){var a=this.get("layer");
if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,c.nextSibling);b=c=a=null;return this.paneDidAttach()},removeFromParent:function(){},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();return this},isPaneAttached:NO,recomputeIsVisibleInWindow:function(c){var d=this.get("isVisibleInWindow");
var f=this.get("isPaneAttached")&&this.get("isVisible");if(d!==f){this.set("isVisibleInWindow",f);
if(f&&this.get("layerNeedsUpdate")){this.updateLayerIfNeeded()}if(f&&this.get("childViewsNeedLayout")){this.layoutChildViewsIfNeeded()
}var e=this.get("childViews"),b=e.length,a;for(a=0;a<b;a++){e[a].recomputeIsVisibleInWindow(f)
}if(!f&&this.get("isFirstResponder")){this.resignFirstResponder()}}if(f){if(this.parentViewDidResize){this.parentViewDidResize()
}if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}return this},updateLayerLocation:function(){return this},init:function(){var a=!!this.get("layer");
arguments.callee.base.apply(this,arguments);if(a){this.paneDidAttach()}},classNames:"sc-pane".w()});
sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var a=this.get("parentObserver");
return a?a.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var e=this.get("item"),b,f,a,d,c;
if(!e){return SC.IndexSet.EMPTY}else{if(e.isTreeItemContent){f=this.get("parentItem");
a=this.get("index");return e.treeItemBranchIndexes(f,a)}else{d=this.get("children");
if(!d){return null}c=SC.IndexSet.create();b=d.get("length");f=e;for(a=0;a<b;a++){if(!(e=d.objectAt(a))){continue
}if(!this._computeChildren(e,f,a)){continue}if(this._computeDisclosureState(e,f,a)!==SC.LEAF_NODE){c.add(a)
}}return c.get("length")>0?c:null}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(d){var a=this.get("length"),f=this.get("item"),b=this._objectAtCache,h=d,g=0,c,e;
if(d>=a){return undefined}if(this.get("isHeaderVisible")){if(d===0){return f}else{h--
}}f=null;if(!b){b=this._objectAtCache=[]}if((f=b[d])!==undefined){return f}e=this.get("children");
if(!e){return undefined}if(c=this.get("branchIndexes")){c.forEach(function(l){if(f||(l>h)){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){f=k.objectAt(h-l);
h=-1}else{h-=j-1}},this)}if(h>=0){f=e.objectAt(h)}b[d]=f;return f},replace:function(a,b,j,d){var i=a,g=null,e,f,h;
if(d===undefined){d=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){i--}if(i<0){throw"Tree Item cannot replace itself"
}if(e=this.get("branchIndexes")){e.forEach(function(k){if(g||(k>=i)){return}if(!(g=this.branchObserverAt(k))){return
}f=g.get("length");if((k+f===i)&&d===SC.DROP_AFTER){i-=k}else{if(k+f>i){i-=k}else{i-=f-1;
g=null}}},this)}if(g){g.replace(i,b,j,d);return this}h=i+b;if(b>1&&e){e.forEachIn(i,e.get("max")-i,function(k){if(k>h){return
}if(!(g=this.branchObserverAt(k))){return}f=g.get("length");h-=f-1},this)}b=h-i;var c=this.get("children");
if(!c){throw"cannot replace() tree item with no children"}if((b<0)||(h>c.get("length"))){throw"replace() range must lie within a single tree item"
}c.replace(i,b,j,d);return this},observerContentDidChange:function(g,f,e){this.invalidateBranchObserversAt(g);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var b=this.get("length"),c=this._computeLength(),a=this.get("parentObserver"),d;
if(b!==c){this.set("length",c)}if(!this._notifyParent){return this}if(a){d=SC.IndexSet.create(this.get("index"));
a._childrenRangeDidChange(a.get("children"),null,"[]",d)}else{if(b===c){f=this.expandChildIndex(g+f);
g=this.expandChildIndex(g);f=f-g;e=0}else{g=this.expandChildIndex(g);f=c-g;e=c-b}this.enumerableContentDidChange(g,f,e)
}},expandChildIndex:function(c){var b=c;if(this.get("isHeaderVisible")){c++}var a=this.get("branchIndexes");
if(!a||a.get("length")===0){return b}a.forEachIn(0,c,function(d){b+=this.branchObserverAt(d).get("length")-1
},this);return b},_contentGroupIndexes:NO,contentGroupIndexes:function(g,e){if(e!==this){return null
}var f=this._contentGroupIndexes;if(f!==NO){return f}if(this.get("parentObserver")){return null
}var j=this.get("item"),i,b,d,h,c,a;if(j&&j.isTreeItemContent){i=j.get("treeItemIsGrouped")
}else{i=!!this.delegate.get("treeItemIsGrouped")}if(i){f=SC.IndexSet.create();b=this.get("branchIndexes");
a=this.get("children");d=a?a.get("length"):0;h=c=0;if(b){b.forEach(function(l){f.add(h,(l+1)-c);
h+=(l+1)-c;c=l+1;var k=this.branchObserverAt(l);if(k){h+=k.get("length")-1}},this)
}if(c<d){f.add(h,d-c)}}else{f=null}this._contentGroupIndexes=f;return f},contentIndexIsGroup:function(b,d,a){var c=this.contentGroupIndexes(b,d);
return c?c.contains(a):NO},contentIndexOutlineLevel:function(j,g,e){if(g!==this){return -1
}var a=this._outlineLevelCache;if(a&&(a[e]!==undefined)){return a[e]}if(!a){a=this._outlineLevelCache=[]
}var f=this.get("length"),k=e,d=0,h=null,c,b,i;if(e>=f){return -1}if(this.get("isHeaderVisible")){if(e===0){return a[0]=this.get("outlineLevel")-1
}else{k--}}if(c=this.get("branchIndexes")){c.forEach(function(n){if((h!==null)||(n>k)){return
}var m=this.branchObserverAt(n),l;if(!m){return}l=m.get("length");if(n+l>k){h=m.contentIndexOutlineLevel(j,m,k-n);
k=-1}else{k-=l-1}},this)}if(k>=0){h=this.get("outlineLevel")}a[e]=h;return h},contentIndexDisclosureState:function(j,g,e){if(g!==this){return -1
}var a=this._disclosureStateCache;if(a&&(a[e]!==undefined)){return a[e]}if(!a){a=this._disclosureStateCache=[]
}var f=this.get("length"),k=e,d=0,h=null,c,b,i;if(e>=f){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(e===0){return a[0]=this.get("disclosureState")
}else{k--}}if(c=this.get("branchIndexes")){c.forEach(function(n){if((h!==null)||(n>k)){return
}var m=this.branchObserverAt(n),l;if(!m){return}l=m.get("length");if(n+l>k){h=m.contentIndexDisclosureState(j,m,k-n);
k=-1}else{k-=l-1}},this)}if(k>=0){h=SC.LEAF_NODE}a[e]=h;return h},contentIndexExpand:function(b,f,a){var c,g=a,d,e;
if(f!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._expand(this.get("item"));
return}else{g--}}if(c=this.get("branchIndexes")){c.forEach(function(k){if(k>=g){return
}var j=this.branchObserverAt(k),h;if(!j){return}h=j.get("length");if(k+h>g){j.contentIndexExpand(b,j,g-k);
g=-1}else{g-=h-1}},this)}if(g>=0){d=this.get("children");e=d?d.objectAt(g):null;if(e){this._expand(e,this.get("item"),g)
}}},contentIndexCollapse:function(b,f,a){var c,d,e,g=a;if(f!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._collapse(this.get("item"));
return}else{g--}}if(c=this.get("branchIndexes")){c.forEach(function(k){if(k>=g){return
}var j=this.branchObserverAt(k),h;if(!j){return}h=j.get("length");if(k+h>g){j.contentIndexCollapse(b,j,g-k);
g=-1}else{g-=h-1}},this)}if(g>=0){d=this.get("children");e=d?d.objectAt(g):null;if(e){this._collapse(e,this.get("item"),g)
}}},branchObserverAt:function(d){var g=this._branchObserversByIndex,c=this._branchObserverIndexes,e,h,b,j,a,f,i;
if(!g){g=this._branchObserversByIndex=[]}if(!c){c=this._branchObserverIndexes=SC.IndexSet.create()
}if(e=g[d]){return e}a=this.get("children");j=a?a.objectAt(d):null;if(!j){return null
}g[d]=e=SC.TreeItemObserver.create({item:j,delegate:this.get("delegate"),parentObserver:this,index:d,outlineLevel:this.get("outlineLevel")+1});
c.add(d);return e},invalidateBranchObserversAt:function(c){var b=this._branchObserversByIndex,a=this._branchObserverIndexes;
if(!b||b.length<=c){return this}if(c<0){c=0}a.forEachIn(c,a.get("max")-c,function(e){var d=b[e];
if(d){d.destroy()}},this);b.length=c;return this},init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("item");if(!a){throw"SC.TreeItemObserver.item cannot be null"}a.addObserver("*",this,this._itemPropertyDidChange);
this._itemPropertyDidChange(a,"*");this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);
this._objectAtCache=null;var c=this.get("item");if(c){c.removeObserver("*",this,this._itemPropertyDidChange)
}var a=this._children,b=this._childrenRangeObserver;if(a&&b){a.removeRangeObserver(b)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(f,b){var a=this.get("children"),e=this.get("disclosureState"),d=this.get("item"),c;
this.beginPropertyChanges();c=this._computeDisclosureState(d);if(e!==c){this.set("disclosureState",c)
}c=this._computeChildren(d);if(a!==c){this.set("children",c)}this.endPropertyChanges()
},_childrenDidChange:function(){var c=this.get("disclosureState"),d=c===SC.BRANCH_OPEN?this.get("children"):null,b=this._children,a=this._childrenRangeObserver;
if(b===d){return this}if(a){b.removeRangeObserver(a)}if(d){this._childrenRangeObserver=d.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=d;this._childrenRangeDidChange(d,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(f,i,h,d){var a=this.get("children"),e=a?a.get("length"):0,c=d?d.get("min"):0,g=d?d.get("max"):e,b=this._childrenLen||0;
this._childrenLen=e;this.observerContentDidChange(c,g-c,e-b)},_computeDisclosureState:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return SC.LEAF_NODE}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}return d.treeItemDisclosureState(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}return d.get(c)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED}}},_collapse:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return this}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}d.treeItemCollapse(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}d.setIfChanged(c,NO)}}return this},_expand:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return this}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}d.treeItemExpand(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}d.setIfChanged(c,YES)}}return this},_computeChildren:function(c){var a,b;
if(!c){return null}else{if(c.isTreeItemContent){return c.get("treeItemChildren")}else{b=this._treeItemChildrenKey;
if(!b){a=this.get("delegate");b=a?a.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=b}return c.get(b)}}},_computeLength:function(){var b=this.get("isHeaderVisible")?1:0,d=this.get("disclosureState"),c=this.get("children"),a;
if((d===SC.BRANCH_OPEN)&&c){b+=c.get("length");if(a=this.get("branchIndexes")){a.forEach(function(e){var f=this.branchObserverAt(e);
b+=f.get("length")-1},this)}}return b}});sc_require("system/responder");SC.ResponderContext=SC.Responder.extend({isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(a){var b=a.get("nextResponder");
if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b,this)}else{if(!b&&(a!==this)){b=this
}}return b},responderNameFor:function(a){if(!a){return"(No Responder)"}else{if(a._scrc_name){return a._scrc_name
}}var b=this.NAMESPACE;this._findResponderNamesFor(this,3,b?[this.NAMESPACE]:[]);
return a._scrc_name||a.toString()},_findResponderNamesFor:function(a,e,d){var b,c;
for(b in a){if(b==="nextResponder"){continue}c=a[b];if(c&&c.isResponder){if(c._scrc_name){continue
}d.push(b);c._scrc_name=d.join(".");if(e>0){this._findResponderNamesFor(c,e-1,d)}d.pop()
}}},makeFirstResponder:function(a){var e=this.get("firstResponder"),c=this.get("nextResponder"),d=this.get("trace"),b;
if(this._locked){if(d){console.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(a)))
}this._pendingResponder=a;return}if(d){console.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(a)))
}this._locked=YES;this._pendingResponder=null;b=a?this.nextResponderFor(a):null;while(b){if(b.get("hasFirstResponder")){break
}b=(b===c)?null:this.nextResponderFor(b)}if(!b){b=c}this._notifyWillLoseFirstResponder(e,e,b);
if(e){e.set("isFirstResponder",NO)}this.set("firstResponder",a);if(a){a.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(a,a,b);this._locked=NO;if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);
this._pendingResponder=null}return this},_notifyWillLoseFirstResponder:function(b,d,a){if(d===a){return
}d.willLoseFirstResponder(b);d.set("hasFirstResponder",NO);var c=this.nextResponderFor(d);
if(c){this._notifyWillLoseFirstResponder(b,c,a)}},_notifyDidBecomeFirstResponder:function(b,d,a){if(d===a){return
}var c=this.nextResponderFor(d);if(c){this._notifyDidBecomeFirstResponder(b,c,a)}d.set("hasFirstResponder",YES);
d.didBecomeFirstResponder(b)},sendAction:function(g,d,c){var a=this.get("firstResponder"),e=this.get("nextResponder"),f=this.get("trace"),h=NO,b;
this._locked=YES;if(f){console.log("%@: begin action '%@' (%@, %@)".fmt(this,g,d,c))
}while(!h&&a){if(a.tryToPerform){h=a.tryToPerform(g,d,c)}if(!h){a=(a===e)?null:this.nextResponderFor(a)
}}if(f){if(!h){console.log("%@:  action '%@' NOT HANDLED".fmt(this,g))}else{console.log("%@: action '%@' handled by %@".fmt(this,g,this.responderNameFor(a)))
}}this._locked=NO;if(b=this._pendingResponder){this._pendingResponder=null;this.makeFirstResponder(b)
}return a}});sc_require("system/responder_context");SC.Application=SC.ResponderContext.extend({});
sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,stats:{},globalStartTime:null,start:function(b,a,e,d){if(!this.enabled){return
}var f=(e||Date.now()),c;if(a){c=this._subStatFor(b,a)}else{c=this._statFor(b)}if(d&&c._starts.length>0){c._starts.push("ignore")
}else{c._starts.push(f)}c._times.push({start:f,_subStats:{}});return b},end:function(c,b,f){var e;
if(!this.enabled){return}if(b){e=this._subStatFor(c,b)}else{e=this._statFor(c)}var g=e._starts.pop();
if(!g){console.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(c));
return}if(g=="ignore"){return}var a=(f||Date.now());var d=a-g;e._times[e._times.length-1].end=a;
e._times[e._times.length-1].dur=d;e.amt+=d;e.runs++;if(this.verbose){this.log(c)}},setGlobalStartTime:function(a){this.globalStartTime=a
},bench:function(e,d,a){if(!d){d="bench%@".fmt(this._benchCount++)}if(!a){a=1}var b;
while(--a>=0){var c=SC.Benchmark.start(d);b=e();SC.Benchmark.end(c)}return b},install:function(a,d,b){a["b__"+d]=a[d];
var c=a["b__"+d];a[d]=function(){var f="%@(%@)".fmt(d,$A(arguments).join(", "));SC.Benchmark.start(f,b);
var e=c.apply(this,arguments);SC.Benchmark.end(f);return e}},restore:function(a,b){a[b]=a["b__"+b]
},report:function(c){if(c){return this._genReport(c)}var b=[];for(var a in this.stats){if(!this.stats.hasOwnProperty(a)){continue
}b.push(this._genReport(a))}return b.join("\n")},timelineReport:function(a){a=(a)?"SproutCore Application":a;
var b=[a,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var d=this._compileChartData(true);for(var c=0;c<d.length;c++){if(d[c][4]){b.push(this._timelineGenSubReport(d[c]))
}else{b.push(this._timelineGenReport(d[c]))}}return b.join("\n")},timelineChart:function(s){var o=0;
this.hideChart();var m=this._compileChartData(false);var j=m.length;if(j===0){return
}var b=this.globalStartTime?this.globalStartTime:m[0][1];var d=m[j-1][2]-b;var n=50+j*30;
var p=Math.ceil(d/200)+1;var r=p*50;var c=document.createElement("div");c.className="sc-benchmark-graph";
document.body.appendChild(c);var t=document.createElement("div");t.innerHTML=((s)?s:"SproutCore Application")+(" - Total Captured Time: "+d+" ms - Points Captured: "+j)+' [<a href="javascript:SC.Benchmark.hideChart();">Hide Chart</a>]';
t.className="sc-benchmark-title";c.appendChild(t);var f=document.createElement("div");
f.className="sc-benchmark-top";f.style.width=r+"px";c.appendChild(f);for(o=0;o<p;
o++){var q=document.createElement("div");q.className="sc-benchmark-tick";q.style.left=(o*50)+"px";
q.style.height=n+"px";var e=document.createElement("div");e.className="sc-benchmark-tick-label";
e.style.left=(o*50)+"px";e.innerHTML=o*200+" ms";c.appendChild(q);c.appendChild(e)
}for(o=0;o<j;o++){var k=document.createElement("div");k.style.top=(75+(o*30))+"px";
k.style.width=r+"px";k.className=(o%2===0)?"sc-benchmark-row even":"sc-benchmark-row";
c.appendChild(k);var l=document.createElement("div");var h=m[o][1];var g=m[o][2];
var a=m[o][3];l.innerHTML="&nbsp;"+(m[o][0]+" <span class='sc-benchmark-emphasis'>"+a+"ms</span>");
l.className="sc-benchmark-bar";l.style.cssText="left:"+(((h-b)/4))+"px; width: "+((a/4))+"px; top: "+(53+(o*30))+"px;";
l.title="start: "+(h-b)+" ms, end: "+(g-b)+" ms, duration: "+a+" ms";c.appendChild(l)
}this._graph=c},hideChart:function(){if(this._graph){try{document.body.removeChild(this._graph)
}catch(a){}}},log:function(a){console.log(this.report(a))},startProfile:function(a){if(!this.enabled){return
}if(console&&console.profile){console.profile(a)}},endProfile:function(a){if(!this.enabled){return
}if(console&&console.profileEnd){console.profileEnd(a)}},_compileChartData:function(g){var l=[],a;
for(var m in this.stats){var e=this.stats[m];for(var f=0;f<e._times.length;f++){var n=e._times[f];
a=(e._times.length>1)?(f+1)+" - "+m:m;l.push([a,n.start,n.end,n.dur,false]);if(g){var b=n._subStats;
for(var c in b){var h=b[c];for(var d=0;d<h._times.length;d++){var o=h._times[d];a=(h._times.length>1)?(d+1)+" - "+c:c;
l.push([a,o.start,o.end,o.dur,true])}}}}}l.sort(function(j,i){if(j[1]<i[1]){return -1
}else{if(j[1]==i[1]){if(j[3]&&!i[3]){return -1}if(!j[3]&&i[3]){return 1}return 0}}return 1
});return l},_genReport:function(a){var b=this._statFor(a);var c=(b.runs>0)?(Math.floor(b.amt*1000/b.runs)/1000):0;
return"BENCH %@ msec: %@ (%@x)".fmt(c,(b.name||a),b.runs)},_timelineGenReport:function(a){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_timelineGenSubReport:function(a){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_subStatFor:function(d,c){var e=this.stats[c]._times.length;
if(e===0){return}var a=this.stats[c]._times[this.stats[c]._times.length-1]._subStats;
var b=a[d];if(!b){a[d]={runs:0,amt:0,name:d,_starts:[],_times:[]};b=a[d]}return b
},_statFor:function(b){var a=this.stats[b];if(!a){a=this.stats[b]={runs:0,amt:0,name:b,_starts:[],_times:[]};
a=this.stats[b]}return a},reset:function(){this.stats={}},_bench:function(b,a){SC.Benchmark.bench(b,a,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.mixin({logBundleLoading:NO,bundleIsLoaded:function(a){var b=SC.BUNDLE_INFO[a];
return b?!!b.loaded:NO},_scb_bundleDidLoad:function(b,h,a,j){var d,n;if(SC.typeOf(h)===SC.T_STRING){n=SC.objectForPropertyPath(h)
}if(SC.typeOf(a)===SC.T_STRING){d=SC.objectForPropertyPath(a,n)}if(!d){if(SC.LAZY_INSTANTIATION[b]){var l=SC.LAZY_INSTANTIATION[b];
if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is marked for lazy instantiation, instantiating it now…".fmt(b))
}for(var f=0,c=l.length;f<c;f++){try{l[f]()}catch(g){console.log("SC.loadBundle(): Failted to lazily instatiate entry for  '%@'".fmt(b))
}}delete SC.LAZY_INSTANTIATION[b];if(SC.typeOf(h)===SC.T_STRING){n=SC.objectForPropertyPath(h)
}if(SC.typeOf(a)===SC.T_STRING){d=SC.objectForPropertyPath(a,n)}if(!a){throw"SC.loadBundle(): could not find callback for lazily instantiated bundle '%@'".fmt(b)
}}else{throw"SC.loadBundle(): could not find callback for '%@'".fmt(b)}}if(!j){j=[]
}j.push(b);var k=!!SC.RunLoop.currentRunLoop;if(k){SC.RunLoop.begin()}d.apply(n,j);
if(k){SC.RunLoop.end()}},tryToLoadBundle:function(d,e,f,b){var a,c;if(SC.typeOf(e)===SC.T_STRING){c=SC.objectForPropertyPath(e)
}if(SC.typeOf(f)===SC.T_STRING){a=SC.objectForPropertyPath(f,c)}if(a||SC.LAZY_INSTANTIATION[d]){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' found through other means, will attempt to load…".fmt(d))
}SC.BUNDLE_INFO[d]={loaded:YES};return SC.BUNDLE_INFO[d]}return NO},loadBundle:function(s,w,d){var p,t;
if(d===undefined&&SC.typeOf(w)===SC.T_FUNCTION){d=w;w=null}var m=SC.BUNDLE_INFO[s],v,u;
var c=SC.A(arguments).slice(3);if(SC.logBundleLoading){console.log("SC.loadBundle(): Attempting to load '%@'".fmt(s))
}if(!m){if(SC.logBundleLoading){console.log("SC.loadBundle(): Attemping to load %@ without SC.BUNDLE_INFO entry… could be loaded through other means.".fmt(s))
}m=this.tryToLoadBundle(s,w,d,c)}if(!m){throw"SC.loadBundle(): could not find bundle '%@'".fmt(s)
}else{if(m.loaded){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' already loaded, skipping.".fmt(s))
}if(d){if(SC.isReady){SC._scb_bundleDidLoad(s,w,d,c)}else{SC.ready(SC,function(){SC._scb_bundleDidLoad(s,w,d,c)
})}}}else{if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is not loaded, loading now.".fmt(s))
}v=m.callbacks||[];if(d){v.push(function(){SC._scb_bundleDidLoad(s,w,d,c)});m.callbacks=v
}if(!m.loading){var b=m.requires||[];var f=YES;for(p=0,t=b.length;p<t;++p){var n=b[p];
var j=SC.BUNDLE_INFO[n];if(!j){throw"SC.loadBundle(): could not find required bundle '%@' for bundle '%@'".fmt(n,s)
}else{if(j.loading){f=NO;break}else{if(j.loaded){continue}else{f=NO;var o=j.dependents;
if(!o){j.dependents=o=[]}o.push(s);if(SC.logBundleLoading){console.log("SC.loadBundle(): '%@' depends on '%@', loading dependency…".fmt(s,n))
}SC.loadBundle(n);break}}}}if(f){var k,e,g,a,h,l;h=document.getElementsByTagName("head")[0];
if(!h){h=document.documentElement}k=m.styles||[];for(p=0,t=k.length;p<t;++p){g=k[p];
if(g.length>0){a=document.createElement("link");a.setAttribute("href",g);a.setAttribute("rel","stylesheet");
a.setAttribute("type","text/css");h.appendChild(a)}}var i=this._jsBundleLoadQueue;
if(!i){this._jsBundleLoadQueue=i={}}i[s]=[];var r=i[s];e=m.scripts||[];for(p=0,t=e.length;
p<t;++p){g=e[p];if(g.length>0){r.push(g)}}m.loading=YES;this.scriptDidLoad(s)}}}}},scriptDidLoad:function(c){var a=this._jsBundleLoadQueue;
if(a){var e=a[c];if(e){var b=e.shift();if(SC.logBundleLoading){console.log("SC.scriptDidLoad(): Loading next file in '%@' -> '%@'".fmt(c,b))
}var d=document.createElement("script");d.setAttribute("type","text/javascript");
d.setAttribute("src",b);document.body.appendChild(d)}}},bundleDidLoad:function(d){var f=SC.BUNDLE_INFO[d],e,c;
if(!f){f=SC.BUNDLE_INFO[d]={loaded:YES};return}if(f.loaded&&SC.logBundleLoading){console.log("SC.bundleDidLoad() called more than once for bundle '%@'. Skipping.".fmt(d));
return}delete f.loading;f.loaded=YES;if(SC.isReady){SC._invokeCallbacksForBundle(d)
}else{SC.ready(SC,function(){SC._invokeCallbacksForBundle(d)})}var g=f.dependents||[];
for(var b=0,a=g.length;b<a;++b){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, loading '%@' that depended on it.".fmt(d,g[b]))
}SC.loadBundle(g[b])}},_invokeCallbacksForBundle:function(c){var e=SC.BUNDLE_INFO[c],d;
if(!e){return}if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, invoking callbacks.".fmt(c))
}d=e.callbacks||[];SC.RunLoop.begin();for(var b=0,a=d.length;b<a;++b){d[b]()}SC.RunLoop.end()
}});sc_require("system/locale");SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageCache=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(a,e,f,d){var b=SC.typeOf(e);
if(SC.none(f)&&SC.typeOf(e)===SC.T_FUNCTION){e=null;f=e}if(SC.typeOf(f)===SC.T_STRING){f=e[f]
}if(SC.none(d)){d=SC.none(e)&&SC.none(f)}var c=this._imageEntryFor(a);if(c.status===this.IMAGE_LOADED){if(f){f.call(e||c.image,c.url,c.image)
}}else{if(e||f){this._addCallback(c,e,f)}c.retainCount++;this._scheduleImageEntry(c,d)
}},releaseImage:function(a,d,e){var c=this._imageEntryFor(a,NO);if(!c){return this
}if(--c.retainCount<=0){this._deleteEntry(c)}else{if(d||e){var b=SC.typeOf(d);if(SC.none(e)&&SC.typeOf(d)===SC.T_FUNCTION){d=null;
e=d}if(SC.typeOf(e)===SC.T_STRING){e=d[e]}this._removeCallback(c,d,e)}}},reloadImage:function(a){var b=this._imageEntryFor(a,NO);
if(b&&b.status===this.IMAGE_LOADED){b.status=this.IMAGE_WAITING}},loadNextImage:function(){var c=null,a;
if(this.get("activeRequests")>=this.get("loadLimit")){return}a=this._foregroundQueue;
while(a.length>0&&!c){c=a.shift()}if(!c){a=this._backgroundQueue;while(a.length>0&&!c){c=a.shift()
}}this.set("isLoading",!!c);if(c){var b=c.image;b.onabort=this._imageDidAbort;b.onerror=this._imageDidError;
b.onload=this._imageDidLoad;b.src=c.url;this._loading.push(c);this.incrementProperty("activeRequests");
this.loadNextImage()}},_imageEntryFor:function(c,a){if(a===undefined){a=YES}var d=this._images[c];
if(!d&&a){var b=new Image();d=this._images[c]={url:c,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:b};
b.entry=d}return d},_deleteEntry:function(a){this._unscheduleEntry(a);delete this._images[a.url]
},_addCallback:function(c,d,e){var b=c.callbacks;var a=b.find(function(f){return f[0]===d&&f[1]===e
},this);if(!a){b.push([d,e])}b=null;return this},_removeCallback:function(b,c,d){var a=b.callbacks;
a.forEach(function(f,e){if(f[0]===c&&f[1]===d){a[e]=null}},this);a=null;return this
},_scheduleImageEntry:function(d,c){var b=this._backgroundQueue;var e=this._foregroundQueue;
if(d.status===this.IMAGE_LOADED){return this}if((d.status===this.IMAGE_QUEUE)&&!c&&d.isBackground){b[b.indexOf(d)]=null;
d.status=this.IMAGE_WAITING}if(d.status!==this.IMAGE_QUEUE){var a=(c)?b:e;a.push(d);
d.status=this.IMAGE_QUEUE;d.isBackground=c}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)
}this.set("isLoading",YES);return this},_unscheduleImageEntry:function(b){if(b.status!==this.IMAGE_QUEUE){return this
}var a=b.isBackground?this._backgroundQueue:this._foregroundQueue;a[a.indexOf(b)]=null;
if(this._loading.indexOf(b)>=0){a.image.abort();this.imageStatusDidChange(b,this.ABORTED)
}return this},_imageDidAbort:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ABORTED)
},_imageDidError:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ERROR)
},_imageDidLoad:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.LOADED)
},imageStatusDidChange:function(c,a){if(!c){return}var b=c.url;var d;switch(a){case this.LOADED:d=c.image;
break;case this.ABORTED:d=SC.IMAGE_ABORTED_ERROR;break;case this.ERROR:d=SC.IMAGE_FAILED_ERROR;
break;default:d=SC.IMAGE_FAILED_ERROR;break}c.callbacks.forEach(function(f){var g=f[0],h=f[1];
h.call(g,b,d)},this);c.callbacks=[];c.status=(a===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;
var e=c.image;if(e){e.onload=e.onerror=e.onabort=null;if(a!==this.LOADED){c.image=null
}}this._loading[this._loading.indexOf(c)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.Page=SC.Object.extend({owner:null,get:function(a){var b=this[a];if(b&&b.isClass){this[a]=b=b.create({page:this});
if(!this.get("inDesignMode")){b.awake()}return b}else{return arguments.callee.base.apply(this,arguments)
}},awake:function(){for(var a in this){if(!this.hasOwnProperty(a)){continue}var b=this[a];
if(b&&b.isViewClass){this[a]=b=b.create({page:this})}}return this},getIfConfigured:function(b){var a=this[b];
return(a&&a.isViewClass)?null:this.get(b)},loc:function(c){for(var b in c){if(!c.hasOwnProperty(b)){continue
}var a=this[b];if(!a||!a.isViewClass){continue}a.loc(c[b])}return this}});SC.Page.design=SC.Page.create;
SC.Page.localization=function(a){return a};sc_require("system/event");SC.mixin({_isReadyBound:NO,_bindReady:function(){if(this._isReadyBound){return
}this._isReadyBound=YES;tiki.require("system").ready(this,this._didBecomeReady)},_readyQueue:[],_afterReadyQueue:[],isReady:NO,_didBecomeReady:function(){if(SC.isReady){return
}if(typeof SC.mapDisplayNames===SC.T_FUNCTION){SC.mapDisplayNames()}SC.Locale.createCurrentLocale();
if(document&&document.getElementsByTagName){var d=document.getElementsByTagName("body")[0];
if(d){var g=d.className;var c=SC.Locale.currentLanguage.toLowerCase();d.className=(g&&g.length>0)?[g,c].join(" "):c
}}SC.Benchmark.start("ready");SC.RunLoop.begin();var i,b,h,e;do{b=SC._readyQueue;
SC._readyQueue=[];for(h=0,e=b.length;h<e;h++){i=b[h];var f=i[0]||document;var a=i[1];
if(a){a.call(f)}}}while(SC._readyQueue.length>0);SC.isReady=YES;SC._readyQueue=null;
SC.Event.trigger("ready",null,document,NO);if(SC.removeLoading){SC.$("#loading").remove()
}if((SC.mode===SC.APP_MODE)&&(typeof main!="undefined")&&(main instanceof Function)&&!SC.suppressMain){main()
}if(SC.routes&&SC.routes.ping){SC.routes.ping()}SC.RunLoop.end();SC.Benchmark.end("ready");
SC.Benchmark.log()},ready:function(b,c){var a=this._readyQueue;if(c===undefined){c=b;
b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!c){return this}if(this.isReady){return c.call(b||document)
}a.push([b,c]);return this}});SC._bindReady();SC.removeLoading=YES;SC.APP_MODE="APP_MODE";
SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;sc_require("system/builder");SC.MODE_REPLACE="replace";
SC.MODE_APPEND="append";SC.MODE_PREPEND="prepend";SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(b,a){if(b===undefined){b="div"
}if(a){this.prevObject=a;this.strings=a.strings;this.offset=a.length+a.offset}if(!this.strings){this.strings=[]
}this.needsContent=YES;if(SC.typeOf(b)===SC.T_STRING){this._tagName=b.toLowerCase();
this._needsTag=YES;var d=this;while(d){d.length++;d=d.prevObject}this.strings.push(null);
this._selfClosing=this.SELF_CLOSING.contains(this._tagName)}else{this._elem=b;this._needsTag=NO;
this.length=0;this.needsContent=NO}return this},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(b){var a=this.strings||[];
return(b===undefined)?a.slice(this.offset,this.length):a[b+this.offset]},push:function(d){var b=this.strings,a=arguments.length;
if(!b){this.strings=b=[]}if(a>1){b.push.apply(b,arguments)}else{b.push(d)}var e=this;
while(e){e.length+=a;e=e.prevObject}this.needsContent=YES;return this},text:function(c){var b=arguments.length,a=0;
for(a=0;a<b;a++){this.push(SC.RenderContext.escapeHTML(arguments[a]))}return this
},join:function(b){if(this._needsTag){this.end()}var a=this.strings;return a?a.join(b||""):""
},begin:function(a){return SC.RenderContext(a,this)},element:function(){if(this._elem){return this._elem
}var a,b;if(!SC.RenderContext.factory){SC.RenderContext.factory=document.createElement("div")
}SC.RenderContext.factory.innerHTML=this.join();if(SC.RenderContext.factory.innerHTML.length>0){b=SC.RenderContext.factory.firstChild.cloneNode(true);
SC.RenderContext.factory.innerHTML=""}else{b=null}return b},remove:function(a){if(!a){return
}var b,c=this._elem;if(!c||!c.removeChild){return}b=document.getElementById(a);if(b){b=c.removeChild(b);
b=null}},update:function(){var a=this._elem,e=this.updateMode,i,g,k,c,h,d,f;if(!a){return
}if(this.length>0){if(e===SC.MODE_REPLACE){a.innerHTML=this.join()}else{c=a.cloneNode(false);
c.innerHTML=this.join();f=(e===SC.MODE_APPEND)?null:a.firstChild;h=c.firstChild;while(h){d=h.nextSibling;
a.insertBefore(h,d);h=d}h=d=c=f=null}}if(this._attrsDidChange&&(g=this._attrs)){for(i in g){if(!g.hasOwnProperty(i)){continue
}if(g[i]===null){a.removeAttribute(i)}else{SC.$(a).attr(i,g[i])}}}if(this._classNamesDidChange&&(g=this._classNames)){SC.$(a).attr("class",g.join(" "))
}if(this._idDidChange&&(g=this._id)){SC.$(a).attr("id",g)}if(this._stylesDidChange&&(k=this._styles)){var b=this._STYLE_PAIR_ARRAY,j=this._JOIN_ARRAY;
for(i in k){if(!k.hasOwnProperty(i)){continue}g=k[i];if(g===null){continue}if(typeof g===SC.T_NUMBER){g=g.toString()+"px"
}b[0]=i.dasherize();b[1]=g;j.push(b.join(": "))}SC.$(a).attr("style",j.join("; "));
j.length=0}a=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var l=this._TAG_ARRAY,b,j,h;
var i=this._attrs,d=this._classNames;var a=this._id,k=this._styles;l[0]="<";l[1]=this._tagName;
if(i||d||k||a){if(!i){i=this._DEFAULT_ATTRS}if(a){i.id=a}if(d){i["class"]=d.join(" ")
}if(k){j=this._JOIN_ARRAY;b=this._STYLE_PAIR_ARRAY;for(h in k){if(!k.hasOwnProperty(h)){continue
}b[0]=h.dasherize();b[1]=k[h];if(b[1]===null){continue}if(typeof b[1]===SC.T_NUMBER){b[1]="%@px".fmt(b[1])
}j.push(b.join(": "))}i.style=j.join("; ");j.length=0}l.push(" ");for(h in i){if(!i.hasOwnProperty(h)){continue
}if(i[h]===null){continue}l.push(h);l.push('="');l.push(i[h]);l.push('" ')}if(i===this._DEFAULT_ATTRS){delete i.style;
delete i["class"];delete i.id}}var g=this.strings;var f=(this._selfClosing===NO)?NO:(this.length===1);
l.push(f?" />":">");g[this.offset]=l.join("");l.length=0;if(!f){l[0]="</";l[1]=this._tagName;
l[2]=">";g.push(l.join(""));var e=this;while(e){e.length++;e=e.prevObject}l.length=0
}this._elem=null;return this.prevObject||this},tag:function(a,b){return this.begin(a,b).end()
},tagName:function(a){if(a===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=a;this._tagNameDidChange=YES;return this
}},id:function(a){if(a===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=a;this._idDidChange=YES;return this}},classNames:function(b,a){if(b===undefined){if(!this._classNames&&this._elem){this._classNames=(this._elem.getAttribute("class")||"").split(" ")
}if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();this._cloneClassNames=NO
}if(!this._classNames){this._classNames=[]}return this._classNames}else{this._classNames=b;
this._cloneClassNames=a||NO;this._classNamesDidChange=YES;return this}},hasClass:function(a){return this.classNames().indexOf(a)>=0
},addClass:function(a){var b=this.classNames();if(b.indexOf(a)<0){b.push(a);this._classNamesDidChange=YES
}return this},removeClass:function(b){var c=this._classNames,a;if(!c&&this._elem){c=this._classNames=(this._elem.getAttribute("class")||"").split(" ")
}if(c&&(a=c.indexOf(b))>=0){if(this._cloneClassNames){c=this._classNames=c.slice();
this._cloneClassNames=NO}c[a]=null;this._classNamesDidChange=YES}return this},resetClassNames:function(){this._classNames=[];
this._classNamesDidChange=YES;return this},setClass:function(d,c){var f,a,b,e;if(c!==undefined){return c?this.addClass(d):this.removeClass(d)
}else{f=this._classNames;if(!f&&this._elem){f=this._classNames=(this._elem.getAttribute("class")||"").split(" ")
}if(!f){f=this._classNames=[]}if(this._cloneClassNames){f=this._classNames=f.slice();
this._cloneClassNames=NO}e=NO;for(b in d){if(!d.hasOwnProperty(b)){continue}a=f.indexOf(b);
if(d[b]){if(a<0){f.push(b);e=YES}}else{if(a>=0){f[a]=null;e=YES}}}if(e){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/\s*([^:\s]+)\s*:\s*([^;\s]+)\s*;?/g,styles:function(d,e){var a,c,b;
if(d===undefined){if(!this._styles&&this._elem){a=SC.$(this._elem).attr("style");
if(a&&(a=a.toString()).length>0){if(SC.browser.msie){a=a.toLowerCase()}d={};c=this._STYLE_REGEX;
c.lastIndex=0;while(b=c.exec(a)){d[b[1].camelize()]=b[2]}this._styles=d;this._cloneStyles=NO
}else{this._styles={}}}else{if(!this._styles){this._styles={}}else{if(this._cloneStyles){this._styles=SC.beget(this._styles);
this._cloneStyles=NO}}}return this._styles}else{this._styles=d;this._cloneStyles=e||NO;
this._stylesDidChange=YES;return this}},addStyle:function(a,e){var b,d=NO,c=this.styles();
if(typeof a===SC.T_STRING){if(e===undefined){return c[a]}else{if(c[a]!==e){c[a]=e;
this._stylesDidChange=YES}}}else{for(b in a){if(!a.hasOwnProperty(b)){continue}e=a[b];
if(c[b]!==e){c[b]=e;d=YES}}if(d){this._stylesDidChange=YES}}return this},removeStyle:function(a){if(!this._styles&&!this._elem){return this
}var b=this.styles();if(b[a]){b[a]=null;this._stylesDidChange=YES}},attr:function(a,e){var c,b=this._attrs,d=NO;
if(!b){this._attrs=b={}}if(typeof a===SC.T_STRING){if(e===undefined){return b[a]}else{if(b[a]!==e){b[a]=e;
this._attrsDidChange=YES}}}else{for(c in a){if(!a.hasOwnProperty(c)){continue}e=a[c];
if(b[c]!==e){b[c]=e;d=YES}}if(d){this._attrsDidChange=YES}}return this}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;
SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(d){var c,b,a;if(SC.none(d)){return d}c=this.escapeHTMLElement;
if(!c){c=this.escapeHTMLElement=document.createElement("div")}b=this.escapeTextNode;
if(!b){b=this.escapeTextNode=document.createTextNode("");c.appendChild(b)}b.data=d;
a=c.innerHTML;if(SC.RenderContext._safari3){a=a.replace(/>/g,"&gt;")}b=c=null;return a
};SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var a=this.get("request");
while(a.get("source")){a=a.get("source")}return a}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,encodedBody:null,body:function(){var a=this.get("encodedBody");
if(a&&this.get("isJSON")){try{a=SC.json.decode(a)}catch(b){return SC.Error.create({message:b.name+": "+b.message,label:"Response",errorValue:this})
}}return a}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,fire:function(){var a=this.get("request"),b=a?a.get("source"):null;
if(b&&b.willSend){b.willSend(a,this)}a.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}if(!this.get("isCancelled")&&b&&b.didSend){b.didSend(a,this)}},invokeTransport:function(){this.receive(function(a){this.set("status",200)
},this)},receive:function(d,a){var b=this.get("request");var c=b?b.get("source"):null;
if(c&&c.willReceive){c.willReceive(b,this)}d.call(a,!this.get("isCancelled"));if(!this.get("isCancelled")&&c&&c.didReceive){c.didReceive(b,this)
}if(!this.get("isCancelled")){this.notify()}SC.Request.manager.transportDidClose(this);
return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},cancelTransport:function(){},_notifyListener:function(b,a){var e=b[a],f,d,c;
if(!e){return NO}f=(e.params||[]).copy();f.unshift(this);d=e.target;c=e.action;if(SC.typeOf(c)===SC.T_STRING){c=d[c]
}return c.apply(d,f)},notify:function(){var b=this.get("listeners"),a=this.get("status"),c=Math.floor(a/100)*100,d=NO;
if(!b){return this}SC.RunLoop.begin();d=this._notifyListener(b,a);if(!d){d=this._notifyListener(b,c)
}if(!d){d=this._notifyListener(b,0)}SC.RunLoop.end();return this},toString:function(){var a=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(a,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var c=this.get("rawRequest"),b=c?c.getAllResponseHeaders():null,a={};
if(!b){return a}b.split("\n").forEach(function(g){var d=g.indexOf(":"),e,f;if(d>=0){e=g.slice(0,d);
f=g.slice(d+1).trim();a[e]=f}},this);return a}.property("status").cacheable(),header:function(a){var b=this.get("rawRequest");
return b?b.getResponseHeader(a):null},encodedBody:function(){var b=this.get("rawRequest"),a;
if(!b){a=null}else{if(this.get("isXML")){a=b.responseXML}else{a=b.responseText}}return a
}.property("status").cacheable(),cancelTransport:function(){var a=this.get("rawRequest");
if(a){a.abort()}this.set("rawRequest",null)},invokeTransport:function(){var d,g,b,c,f;
function e(){for(var h=0;h<arguments.length;h++){try{var j=arguments[h]();return j
}catch(k){}}return NO}d=e(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")});this.set("rawRequest",d);
c=!!this.getPath("request.isAsynchronous");if(c){if(!SC.browser.msie){SC.Event.add(d,"readystatechange",this,this.finishRequest,d)
}else{g=this;b=function(){if(!g){return null}var h=g.finishRequest();g=null;return h
};d.onreadystatechange=b}}d.open(this.get("type"),this.get("address"),c);f=this.getPath("request.headers");
for(var a in f){d.setRequestHeader(a,f[a])}d.send(this.getPath("request.encodedBody"));
if(!c){this.finishRequest()}return d},finishRequest:function(c){var e=this.get("rawRequest"),a=e.readyState,d,b,f;
if(a===4){this.receive(function(g){if(!g){return}b=-1;try{b=e.status||0}catch(h){}if((b<200)||(b>=300)){f=e.statusText;
d=SC.$error(f||"HTTP Request failed","Request",b);d.set("errorValue",this);this.set("isError",YES);
this.set("errorObject",d)}this.set("status",b)},this)}if(a===4){e.onreadystatechange=function(){}
}}});sc_require("system/response");SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,headers:function(){var a=this._headers;
if(!a){a=this._headers={}}return a}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",body:null,encodedBody:function(){var a=this.get("body");
if(a&&this.get("isJSON")){a=SC.json.encode(a)}return a}.property("isJSON","isXML","body").cacheable(),willSend:function(b,a){},didSend:function(b,a){},willReceive:function(b,a){},didReceive:function(b,a){},COPY_KEYS:"isAsynchronous isJSON isXML address type body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var a={},d=this.COPY_KEYS,f=d.length,b,c,e;
while(--f>=0){b=d[f];if(this.hasOwnProperty(b)){a[b]=this.get(b)}}if(this.hasOwnProperty("listeners")){a.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){a._headers=SC.copy(this._headers)}a.source=this.get("source")||this;
return this.constructor.create(a)},header:function(a,b){var c;if(SC.typeOf(a)===SC.T_STRING){c=this._headers;
if(arguments.length===1){return c?c[a]:null}else{this.propertyWillChange("headers");
if(!c){c=this._headers={}}c[a]=b;this.propertyDidChange("headers");return this}}else{if(b===undefined){c=a;
this.beginPropertyChanges();for(a in c){if(!c.hasOwnProperty(a)){continue}this.header(a,c[a])
}this.endPropertyChanges();return this}}return this},json:function(a){if(a===undefined){a=YES
}if(a){this.set("isXML",NO)}return this.set("isJSON",a)},xml:function(a){if(a===undefined){a=YES
}if(a){this.set("isJSON",NO)}return this.set("isXML",a)},_prep:function(){var a=!!this.header("Content-Type");
if(this.get("isJSON")&&!a){this.header("Content-Type","application/json")}else{if(this.get("isXML")&&!a){this.header("Content-Type","text/xml")
}}return this},send:function(a){if(a){this.set("body",a)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var a=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(a)
},notify:function(a,e,d){var c=YES,f;if(SC.typeOf(a)!==SC.T_NUMBER){f=SC.A(arguments).slice(2);
d=e;e=a;a=0;c=NO}else{f=SC.A(arguments).slice(3)}var b=this.get("listeners");if(!b){this.set("listeners",b={})
}b[a]={target:e,action:d,params:f};return this}});SC.Request.mixin({getUrl:function(a){return SC.Request.create().set("address",a).set("type","GET")
},postUrl:function(b,a){var c=SC.Request.create().set("address",b).set("type","POST");
if(a){c.set("body",a)}return c},deleteUrl:function(a){return SC.Request.create().set("address",a).set("type","DELETE")
},putUrl:function(b,a){var c=SC.Request.create().set("address",b).set("type","PUT");
if(a){c.set("body",a)}return c}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(b){if(!b){return null
}var a=b.get("responseClass").create({request:b});this.get("pending").pushObject(a);
this.fireRequestIfNeeded();return a},cancel:function(b){var d=this.get("pending"),c=this.get("inflight"),a;
if(d.indexOf(b)>=0){this.propertyWillChange("pending");d.removeObject(b);this.propertyDidChange("pending");
return YES}else{if(c.indexOf(b)>=0){b.cancel();c.removeObject(b);this.fireRequestIfNeeded();
return YES}else{return NO}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(a){a.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var d=this.get("pending"),c=this.get("inflight"),a=this.get("maxRequests"),b;
if((d.length>0)&&(c.length<a)){b=d.shiftObject();c.pushObject(b);b.fire()}},transportDidClose:function(a){this.get("inflight").removeObject(a);
this.fireRequestIfNeeded()}});sc_require("system/ready");SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create()},mainPane:null,makeMainPane:function(b){var a=this.get("mainPane");
if(a===b){return this}this.beginPropertyChanges();if(this.get("keyPane")===a){this.makeKeyPane(b)
}this.set("mainPane",b);if(a){a.blurMainTo(b)}if(b){b.focusMainFrom(a)}this.endPropertyChanges();
return this},keyPane:null,previousKeyPanes:[],makeKeyPane:function(f){var e,a,d;if(f){if(!f.get("acceptsKeyPane")){return this
}else{var a=this.get("keyPane");if(a===f){return this}else{if(a){d=this.get("previousKeyPanes");
d.push(a)}e=f}}}else{a=this.get("keyPane");d=this.get("previousKeyPanes");var e=null;
while(d.length>0){var c=d.pop();if(c.get("isPaneAttached")&&c.get("acceptsKeyPane")){e=c;
break}}}if(!e){var b=this.get("mainPane");if(b.get("acceptsKeyPane")){e=b}}if(a){a.willLoseKeyPaneTo(e)
}if(e){e.willBecomeKeyPaneFrom(a)}this.set("keyPane",e);if(e){e.didBecomeKeyPaneFrom(a)
}if(a){a.didLoseKeyPaneTo(e)}return this},computeWindowSize:function(){return{width:640,height:480}
},defaultResponder:null,sendAction:function(c,d,b,e,a){d=this.targetForAction(c,d,b,e);
if(d&&d.isResponderContext){return !!d.sendAction(c,b,a)}else{return d&&d.tryToPerform(c,b)
}},_responderFor:function(c,a){var b=c?c.get("defaultResponder"):null;if(c){c=c.get("firstResponder")||c;
do{if(c.respondsTo(a)){return c}}while(c=c.get("nextResponder"))}if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if(!b){return null}else{if(b.isResponderContext){return b}else{if(b.respondsTo(a)){return b
}else{return null}}}},targetForAction:function(b,e,d,f){if(!b||(SC.typeOf(b)!==SC.T_STRING)){return null
}if(e){if(SC.typeOf(e)===SC.T_STRING){e=SC.objectForPropertyPath(e)}if(e){if(e.respondsTo&&!e.respondsTo(b)){e=null
}else{if(SC.typeOf(e[b])!==SC.T_FUNCTION){e=null}}}return e}if(f){return this._responderFor(f,b)
}var a=this.get("keyPane"),c=this.get("mainPane");if(a&&(a!==f)){e=this._responderFor(a,b)
}if(!e&&c&&(c!==a)){e=this._responderFor(c,b)}if(!e&&(e=this.get("defaultResponder"))){if(SC.typeOf(e)===SC.T_STRING){e=SC.objectForPropertyPath(e);
if(e){this.set("defaultResponder",e)}}if(e){if(e.respondsTo&&!e.respondsTo(b)){e=null
}else{if(SC.typeOf(e[b])!==SC.T_FUNCTION){e=null}}}}return e},targetViewForEvent:function(a){return a.target?SC.$(a.target).view()[0]:null
},sendEvent:function(c,a,d){var e,b;SC.RunLoop.begin();if(d){e=d.get("pane")}else{e=this.get("keyPane")||this.get("mainPane")
}b=(e)?e.sendEvent(c,a,d):null;SC.RunLoop.end();return b},listenFor:function(b,a){b.forEach(function(c){var d=this[c];
if(d){SC.Event.add(a,c,this,d)}},this);a=null;return this},setup:function(){}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var a;
a=SC.RootResponder.responder=SC.RootResponder.create();a.setup()});SC.routes=SC.Object.create({location:function(b,c){if(c!==undefined){if(c===null){c=""
}if(typeof(c)=="object"){var d=c.route?c.route.split("&"):[""];var a=d.shift();var e={};
d.forEach(function(g){var f=g.split("=");e[f[0]]=f[1]});for(b in c){if(!c.hasOwnProperty(b)){continue
}if(b!="route"){e[b]=encodeURIComponent(""+c[b])}}d=[a];for(b in e){if(!e.hasOwnProperty(b)){continue
}d.push([b,e[b]].join("="))}c=d.join("&")}if(this._location!=c){this._location=c;
this._setWindowLocation(c)}}return this._location}.property(),ping:function(){if(!this._didSetupHistory){this._didSetupHistory=true;
this._setupHistory()}this._checkWindowLocation()},add:function(a,c,d){if(d===undefined&&SC.typeOf(c)===SC.T_FUNCTION){d=c;
c=null}else{if(SC.typeOf(d)===SC.T_STRING){d=c[d]}}var b=a.split("/");if(!this._routes){this._routes=SC.routes._Route.create()
}this._routes.addRoute(b,c,d);return this},gotoRoute:function(a){var e={},d,b,c,f;
this._lastRoute=a;d=a.split("&");if(d&&d.length>0){a=d.shift();d.forEach(function(g){var h=g.split("=");
if(h&&h.length>1){e[h[0]]=decodeURIComponent(h[1])}})}else{a=""}d=a.split("/");if(!this._routes){this._routes=SC.routes._Route.create()
}b=this._routes.functionForRoute(d,e);if(b){c=b._target;f=b._method;if(f){f.call(c,e)
}}},init:function(){arguments.callee.base.call(this);if(SC.browser.isSafari&&!(SC.browser.safari>=3)){SC.mixin(this,this.browserFuncs.safari)
}else{if(SC.browser.isIE){SC.mixin(this,this.browserFuncs.ie)}else{if(SC.browser.isMozilla){SC.mixin(this,this.browserFuncs.firefox)
}}}this._didSetupHistory=false},invokeCheckWindowLocation:function(c){var b=this.__checkWindowLocation,a=this;
if(!b){b=this.__checkWindowLocation=function(){a._checkWindowLocation()}}setTimeout(b,c)
},browserFuncs:{safari:{_setupHistory:function(){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
this._cloc=a;this._backStack=[];this._backStack.length=history.length;this._backStack.push(a);
this._forwardStack=[];this.invokeCheckWindowLocation(1000)},_checkWindowLocation:function(){var b=(history.length-this._lastLength)!==0;
var e=(b)?(history.length-this._backStack.length):0;this._lastLength=history.length;
if(b){console.log("historyDidChange")}if(e){if(e<0){this._forwardStack.push(this._cloc);
for(var a=0;a<Math.abs(e+1);a++){this._forwardStack.push(this._backStack.pop())}this._cloc=this._backStack.pop()
}else{this._backStack.push(this._cloc);for(a=0;a<(e-1);a++){this._backStack.push(this._forwardStack.pop())
}this._cloc=this._forwardStack.pop()}}else{if(b&&this._locationDidChange){this.gotoRoute(this._cloc);
this._locationDidChange=false}}var d=this._cloc;var c=this.get("location");if(d!=c){this.set("location",(d)?d:"");
this.gotoRoute(d)}this.invokeCheckWindowLocation(50)},_setWindowLocation:function(b){var a=this._cloc;
if(a!=b){this._backStack.push(this._cloc);this._forwardStack.length=0;this._cloc=b;
location.hash=(b&&b.length>0)?b:"";this._locationDidChange=true}}},ie:{_setupHistory:function(){this.invokeCheckWindowLocation(1000)
},_checkWindowLocation:function(){var b=this.get("location");var a=location.hash;
a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!=b){this.set("location",(a)?a:"")}this.invokeCheckWindowLocation(100)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?b:"#"}this.gotoRoute(b)}},firefox:{_checkWindowLocation:function(){var b=this.get("location");
var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!=b){SC.RunLoop.begin();
this.set("location",(a)?a:"");SC.RunLoop.end()}this.invokeCheckWindowLocation(150)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?b:"#"}this.gotoRoute(b)}}},_setupHistory:function(){var a=this;
this.invokeCheckWindowLocation(1000)},_checkWindowLocation:function(){var b=this.get("location");
var a=decodeURI(location.hash);a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!==b){SC.RunLoop.begin();
this.set("location",(a)?a:"");SC.RunLoop.end()}this.invokeCheckWindowLocation(150)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?encodeURI(b):"#"}this.gotoRoute(b)},_routes:null,_Route:SC.Object.extend({_target:null,_method:null,_static:null,_dynamic:null,_wildcard:null,addRoute:function(d,c,f){if(!d||d.length===0){this._target=c;
this._method=f}else{var b=d.shift();var e=null;switch(b.slice(0,1)){case":":b=b.slice(1,b.length);
var a=this._dynamic[b]||[];e=SC.routes._Route.create();a.push(e);this._dynamic[b]=a;
break;case"*":b=b.slice(1,b.length);this._wildcard=b;this._target=c;this._method=f;
break;default:a=this._static[b]||[];e=SC.routes._Route.create();a.push(e);this._static[b]=a
}if(e){e.addRoute(d,c,f)}}},functionForRoute:function(c,b){if(!c||c.length===0){return this
}else{var a=c.shift(),f=null,j,h,e,d;j=this._static[a];if(j){for(e=0,d=j.length;(e<d)&&(f===null);
e++){var g=c.slice();f=j[e].functionForRoute(g,b)}}if(f===null){for(var i in this._dynamic){j=this._dynamic[i];
if(j){for(e=0,d=j.length;(e<d)&&(f===null);e++){g=c.slice();f=j[e].functionForRoute(g,b);
if(f&&b){b[i]=a}}}if(f){break}}}if((f===null)&&this._wildcard){c.unshift(a);if(b){b[this._wildcard]=c.join("/")
}f=this}return f}},init:function(){arguments.callee.base.call(this);this._static={};
this._dynamic={}}})});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var b=this.get("start");
var a=this.get("end");if((b)===-1||(a===-1)){return -1}else{return a-b}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var a=this.get("length");if(a&&a>0){if(a===1){return"[%@ character selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.time=function(a){var b=SC.beget(fn);
b.value=timeOffset;return b};(function(){var a=new Date();SC.mixin(SC.time,{month:function(c,b){a.setTime(c);
if(b===undefined){return a.getMonth()}a.setMonth(b);return a.getTime()},utc:function(b){a.setTime(b);
return b+(a.getTimezoneOffset()*60*1000)},local:function(b){a.setTime(b);return b-(a.getTimezoneOffset()*60*1000)
},parse:function(b){},format:function(b){}})})();SC.time.fmt=SC.time.format;SC.time.fn={done:function(){return this.value
}};"month day year".split(" ").forEach(function(a){SC.time.fn[a]=function(b){if(b===undefined){return SC.time[a](this.value)
}else{this.value=SC.time[a](this.value,b);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(a){return(a<0||a>9?"":"0")+a}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{now:function(){return new Date().getTime()},isDate:function(c,b){var a=Date.getDateFromFormat(c,b);
if(a==0){return false}return true},compareDates:function(e,f,c,d){var b=Date.getDateFromFormat(e,f);
var a=Date.getDateFromFormat(c,d);if(b==0||a==0){return -1}else{if(b>a){return 1}}return 0
},getDateFromFormat:function(z,q){z=z+"";q=q+"";var w=0;var l=0;var s="";var f="";
var v="";var h,g;var b=new Date();var j=b.getFullYear();var u=b.getMonth()+1;var t=1;
var d=b.getHours();var r=b.getMinutes();var n=b.getSeconds();var k="";var o=SC.Locale.currentLocale;
while(l<q.length){s=q.charAt(l);f="";while((q.charAt(l)==s)&&(l<q.length)){f+=q.charAt(l++)
}if(f=="yyyy"||f=="yy"||f=="y"){if(f=="yyyy"){h=4;g=4}if(f=="yy"){h=2;g=2}if(f=="y"){h=2;
g=4}j=Date._getInt(z,w,h,g);if(j==null){return 0}w+=j.length;if(j.length==2){if(j>70){j=1900+(j-0)
}else{j=2000+(j-0)}}}else{if(f=="MMM"||f=="NNN"){u=0;for(var p=0;p<MONTH_NAMES.length;
p++){var e=MONTH_NAMES[p];if(z.substring(w,w+e.length).toLowerCase()==e.toLowerCase()){if(f=="MMM"||(f=="NNN"&&p>11)){u=p+1;
if(u>12){u-=12}w+=e.length;break}}}if((u<1)||(u>12)){return 0}}else{if(f=="EE"||f=="E"){for(var p=0;
p<DAY_NAMES.length;p++){var m=DAY_NAMES[p];if(z.substring(w,w+m.length).toLowerCase()==m.toLowerCase()){w+=m.length;
break}}}else{if(f=="MM"||f=="M"){u=Date._getInt(z,w,f.length,2);if(u==null||(u<1)||(u>12)){return 0
}w+=u.length}else{if(f=="dd"||f=="d"){t=Date._getInt(z,w,f.length,2);if(t==null||(t<1)||(t>31)){return 0
}w+=t.length}else{if(f=="hh"||f=="h"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<1)||(d>12)){return 0
}w+=d.length}else{if(f=="HH"||f=="H"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<0)||(d>23)){return 0
}w+=d.length}else{if(f=="KK"||f=="K"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<0)||(d>11)){return 0
}w+=d.length}else{if(f=="kk"||f=="k"){d=Date._getInt(z,w,f.length,2);if(d==null||(d<1)||(d>24)){return 0
}w+=d.length;d--}else{if(f=="mm"||f=="m"){r=Date._getInt(z,w,f.length,2);if(r==null||(r<0)||(r>59)){return 0
}w+=r.length}else{if(f=="ss"||f=="s"){n=Date._getInt(z,w,f.length,2);if(n==null||(n<0)||(n>59)){return 0
}w+=n.length}else{if(f=="a"){if(z.substring(w,w+2).toLowerCase()=="am"){k="AM"}else{if(z.substring(w,w+2).toLowerCase()=="pm"){k="PM"
}else{return 0}}w+=2}else{if(z.substring(w,w+f.length)!=f){return 0}else{w+=f.length
}}}}}}}}}}}}}}if(w!=z.length){return 0}if(u==2){if(((j%4==0)&&(j%100!=0))||(j%400==0)){if(t>29){return 0
}}else{if(t>28){return 0}}}if((u==4)||(u==6)||(u==9)||(u==11)){if(t>30){return 0}}if(d<12&&k=="PM"){d=d-0+12
}else{if(d>11&&k=="AM"){d-=12}}var a=new Date(j,u-1,t,d,r,n);return a.getTime()},parseDate:function(k){var g=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var b=new Array("generalFormats",g?"dateFirst":"monthFirst",g?"monthFirst":"dateFirst");
var h=null;h=0;var e=new Date().getTime();switch(k.toLowerCase()){case"yesterday".loc():h=e-(24*60*60*1000);
break;case"today".loc():case"now".loc():h=e;break;case"tomorrow".loc():h=e+(24*60*60*1000);
break}if(h>0){return new Date(h)}for(var f=0;f<b.length;f++){var a=window[b[f]];for(var c=0;
c<a.length;c++){h=Date.getDateFromFormat(k,a[c]);if(h==0){h=Date.getDateFromFormat(k,a[c]+" H:m:s")
}if(h==0){h=Date.getDateFromFormat(k,a[c]+" h:m:s a")}if(h!=0){return new Date(h)
}}}return null},_isInteger:function(c){var b="1234567890";for(var a=0;a<c.length;
a++){if(b.indexOf(c.charAt(a))==-1){return false}}return true},_getInt:function(f,d,e,c){for(var a=c;
a>=e;a--){var b=f.substring(d,d+a);if(b.length<e){return null}if(Date._isInteger(b)){return b
}}return null}});SC.mixin(Date.prototype,{format:function(D){D=D+"";var I=this;var l="";
var v=0;var G="";var f="";var j=I.getFullYear()+"";var g=I.getMonth()+1;var F=I.getDate();
var o=I.getDay();var n=I.getHours();var x=I.getMinutes();var q=I.getSeconds();var t,u,b,r,J,e,C,B,z,p,N,n,L,i,a,A;
var w=new Object();if(j.length<4){j=""+(j-0+1900)}w.y=""+j;w.yyyy=j;w.yy=j.substring(2,4);
w.M=g;w.MM=LZ(g);w.MMM=MONTH_NAMES[g-1];w.NNN=MONTH_NAMES[g+11];w.d=F;w.dd=LZ(F);
w.E=DAY_NAMES[o+7];w.EE=DAY_NAMES[o];w.H=n;w.HH=LZ(n);if(n==0){w.h=12}else{if(n>12){w.h=n-12
}else{w.h=n}}w.hh=LZ(w.h);if(n>11){w.K=n-12}else{w.K=n}w.k=n+1;w.KK=LZ(w.K);w.kk=LZ(w.k);
if(n>11){w.a="PM"}else{w.a="AM"}w.m=x;w.mm=LZ(x);w.s=q;w.ss=LZ(q);while(v<D.length){G=D.charAt(v);
f="";while((D.charAt(v)==G)&&(v<D.length)){f+=D.charAt(v++)}if(w[f]!=null){l=l+w[f]
}else{l=l+f}}return l},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.Timer=SC.Object.extend({target:null,action:null,isPooled:YES,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var e=this.get("startTime");if(!e||e===0){return -1}var a=this.get("interval"),c=this.get("lastFireTime");
if(c<e){c=e}var b;if(this.get("repeats")){if(a===0){b=c}else{b=e+(Math.floor((c-e)/a)+1)*a
}}else{b=e+a}var d=this.get("until");if(d&&d>0&&b>d){b=d}return b}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var a=this.get("fireTime"),b=this.get("lastFireTime");if(a>=b){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,a)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var b=Date.now();this.set("lastFireTime",b);var a=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(a>b){this.schedule()}else{this.invalidate()
}},performAction:function(){var a=SC.typeOf(this.action);if(a==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(a===SC.T_STRING){if(this.action.indexOf(".")>=0){var e=this.action.split(".");
var c=e.pop();var d=SC.objectForPropertyPath(e,window);var b=d.get?d.get(c):d[c];
if(b&&SC.typeOf(b)==SC.T_FUNCTION){b.call(d,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:YES,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(b){if(!b){b=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var c=this.RESET_DEFAULTS;for(var a in c){if(!c.hasOwnProperty(a)){continue
}this[a]=SC.none(b[a])?c[a]:b[a]}this.propertyDidChange("fireTime");return this},removeFromTimerQueue:function(c){var b=this._timerQueuePrevious,a=this._timerQueueNext;
if(!b&&!a&&c!==this){return c}if(b){b._timerQueueNext=a}if(a){a._timerQueuePrevious=b
}this._timerQueuePrevious=this._timerQueueNext=null;return(c===this)?a:c},scheduleInTimerQueue:function(c,b){this._timerQueueRunTime=b;
var a=c;var d=null;while(a&&a._timerQueueRunTime<b){d=a;a=a._timerQueueNext}if(d){d._timerQueueNext=this;
this._timerQueuePrevious=d}if(a){a._timerQueuePrevious=this;this._timerQueueNext=a
}return(a===c)?this:c},collectExpiredTimers:function(c,a){if(this._timerQueueRunTime>a){return this
}c.push(this);var b=this._timerQueueNext;this._timerQueueNext=null;if(b){b._timerQueuePrevious=null
}return b?b.collectExpiredTimers(c,a):null}});SC.Timer.schedule=function(a){var b;
if(!a||SC.none(a.isPooled)||a.isPooled){b=this.timerFromPool(a)}else{b=this.create(a)
}return b.schedule()};SC.Timer.timerFromPool=function(a){var b=this._timerPool;if(!b){b=this._timerPool=[]
}var c=b.pop();if(!c){c=this.create()}return c.reset(a)};SC.Timer.returnTimerToPool=function(a){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(a);return this};SC.UserDefaults=SC.Object.extend({userDomain:null,appDomain:null,_defaults:null,defaults:function(a){this._defaults=a;
this.allPropertiesDidChange()},readDefault:function(f){var d=undefined;f=this._normalizeKeyName(f);
var a=this._userKeyName(f);if(this._written){d=this._written[a]}var c=window.localStorage;
if(!c&&window.globalStorage){c=window.globalStorage[window.location.hostname]}if(c){d=c[["SC.UserDefaults",a].join("@")];
if(!SC.none(d)){try{d=SC.json.decode(d)}catch(g){d=undefined}}else{d=undefined}}var b=this.delegate;
if(b&&b.userDefaultsNeedsDefault){d=b.userDefaultsNeedsDefault(this,f,a)}if((d===undefined)&&this._defaults){d=this._defaults[a]||this._defaults[f]
}return d},writeDefault:function(e,f){e=this._normalizeKeyName(e);var a=this._userKeyName(e);
var c=this._written;if(!c){c=this._written={}}c[a]=f;var d=window.localStorage;if(!d&&window.globalStorage){d=window.globalStorage[window.location.hostname]
}if(d){d[["SC.UserDefaults",a].join("@")]=SC.json.encode(f)}var b=this.delegate;if(b&&b.userDefaultsDidChange){b.userDefaultsDidChange(this,e,f,a)
}return this},resetDefault:function(e){var d=this._normalizeKeyName(e);var a=this._userKeyName(d);
this.propertyWillChange(e);this.propertyWillChange(d);var b=this._written;if(b){delete b[a]
}var c=window.localStorage;if(!c&&window.globalStorage){c=window.globalStorage[window.location.hostname]
}if(c){delete c[["SC.UserDefaults",a].join("@")]}this.propertyDidChange(e);this.propertyDidChange(d);
return this},unknownProperty:function(a,b){if(b===undefined){return this.readDefault(a)
}else{this.writeDefault(a,b);return b}},_normalizeKeyName:function(a){if(a.indexOf(":")<0){var b=this.get("appDomain")||"app";
a=[b,a].join(":")}return a},_userKeyName:function(b){var a=this.get("userDomain")||"(anonymous)";
return[a,b].join("@")},_domainDidChange:function(){var a=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
a=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
a=YES}if(a){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
this._scud_userDomain=this.get("userDomain");this._scud_appDomain=this.get("appDomain")
}});SC.userDefaults=SC.UserDefaults.create();sc_require("system/browser");SC.mixin({_downloadFrames:0,_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight"],download:function(e){var a=document.createElement("iframe");
var d="DownloadFrame_"+this._downloadFrames;SC.$(a).attr("id",d);a.style.border="10px";
a.style.width="0px";a.style.height="0px";a.style.position="absolute";a.style.top="-10000px";
a.style.left="-10000px";if(!SC.browser.isSafari){SC.$(a).attr("src",e)}document.getElementsByTagName("body")[0].appendChild(a);
if(SC.browser.isSafari){SC.$(a).attr("src",e)}this._downloadFrames=this._downloadFrames+1;
if(!SC.browser.isSafari){var c=function(){document.body.removeChild(document.getElementById(d));
d=null};var b=c.invokeLater(null,2000)}a=null},normalizeURL:function(a){if(a.slice(0,1)=="/"){a=window.location.protocol+"//"+window.location.host+a
}else{if((a.slice(0,5)=="http:")||(a.slice(0,6)=="https:")){}else{a=window.location.href+"/"+a
}}return a},minX:function(a){return a.x||0},maxX:function(a){return(a.x||0)+(a.width||0)
},midX:function(a){return(a.x||0)+((a.width||0)/2)},minY:function(a){return a.y||0
},maxY:function(a){return(a.y||0)+(a.height||0)},midY:function(a){return(a.y||0)+((a.height||0)/2)
},centerX:function(b,a){return(a.width-b.width)/2},centerY:function(b,a){return(a.height-b.height)/2
},pointInRect:function(a,b){return(a.x>=SC.minX(b))&&(a.y>=SC.minY(b))&&(a.x<=SC.maxX(b))&&(a.y<=SC.maxY(b))
},rectsEqual:function(b,a,c){if(!b||!a){return(b==a)}if(SC.none(c)){c=0.1}if((b.y!=a.y)&&(Math.abs(b.y-a.y)>c)){return NO
}if((b.x!=a.x)&&(Math.abs(b.x-a.x)>c)){return NO}if((b.width!=a.width)&&(Math.abs(b.width-a.width)>c)){return NO
}if((b.height!=a.height)&&(Math.abs(b.height-a.height)>c)){return NO}return YES},intersectRects:function(b,a){var c={x:Math.max(SC.minX(b),SC.minX(a)),y:Math.max(SC.minY(b),SC.minY(a)),width:Math.min(SC.maxX(b),SC.maxX(a)),height:Math.min(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},unionRects:function(b,a){var c={x:Math.min(SC.minX(b),SC.minX(a)),y:Math.min(SC.minY(b),SC.minY(a)),width:Math.max(SC.maxX(b),SC.maxX(a)),height:Math.max(SC.maxY(b),SC.maxX(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},cloneRect:function(a){return{x:a.x,y:a.y,width:a.width,height:a.height}
},stringFromRect:function(a){return"{%@, %@, %@, %@}".fmt(a.x,a.y,a.width,a.height)
},stringFromLayout:function(e){var d=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"];
var a=[];var c=d.length;while(--c>=0){var b=d[c];if(e.hasOwnProperty(b)){a.push(b+":"+e[b])
}}return"{"+a.join(", ")+"}"},heightForString:function(g,d,c,f){var e=this._heightCalcElement,b,a;
b=(f&&SC.typeOf(f)===SC.T_ARRAY)?f.join(" "):"";if(!d){d=100}if(!e){e=this._heightCalcElement=document.createElement("div");
document.body.insertBefore(e,null)}c="%@; width: %@px; left: %@px; position: absolute".fmt(c,d,(-1*d));
e.setAttribute("style",c);if(b!==""){e.setAttribute("class",b)}e.textContent=g;a=e.clientHeight;
e=null;return a},metricsForString:function(k,n,a){var j=this._metricsCalculationElement,d,m,g,o,c;
g=SC.A(a).join(" ");if(!j){j=this._metricsCalculationElement=document.createElement("div");
document.body.insertBefore(j,null)}if(SC.typeOf(n)!=SC.T_STRING){var f=null;if(document.defaultView&&document.defaultView.getComputedStyle){f=document.defaultView.getComputedStyle(n,null)
}else{f=n.currentStyle}c=f.cssText;if(!c||c.trim()===""){var l=this._copy_computed_props;
for(var h=0;h<l.length;h++){var b=l[h],e=f[b];j.style[b]=e}SC.mixin(j.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"})
}else{j.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}f=null}else{c=n;j.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}if(typeof j.innerText!="undefined"){j.innerText=k}else{j.textContent=k}j.className=g;
var p={width:j.clientWidth,height:j.clientHeight};j.innerHTML="";j.className="";j.setAttribute("style","");
j=null;return p},viewportOffset:function(c){if(c.getBoundingClientRect){var d=c.getBoundingClientRect();
return{x:d.left,y:d.top}}var i=0;var e=0;var h=c;var b=SC.browser.mozilla>=3;while(h){e+=(h.offsetTop||0);
if(!b||(h!==c)){e+=(h.clientTop||0)}i+=(h.offsetLeft||0);if(!b||(h!==c)){i+=(h.clientLeft||0)
}if(SC.browser.mozilla){var g=SC.$(h).attr("overflow");if(g!=="visible"){var f=parseInt(SC.$(h).attr("borderLeftWidth"),0)||0;
var j=parseInt(SC.$(h).attr("borderTopWidth"),0)||0;if(c!==h){f*=2;j*=2}i+=f;e+=j
}var a=h.offsetParent;if((SC.browser.mozilla>=3)&&a){e-=a.clientTop;i-=a.clientLeft
}}if(h.offsetParent==document.body&&SC.$(h).attr("position")=="absolute"){break}h=h.offsetParent
}h=c;while(h){if(!SC.browser.isOpera||h.tagName=="BODY"){e-=h.scrollTop||0;i-=h.scrollLeft||0
}h=h.parentNode}return{x:i,y:e}},ZERO_POINT:{x:0,y:0},ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(b,a){return(b>=0)&&(b>=a.start)&&(b<(a.start+a.length))
},minRange:function(a){return a.start},maxRange:function(a){return(a.length<0)?-1:(a.start+a.length)
},unionRanges:function(c,b){if((c===null)||(c.length<0)){return b}if((b===null)||(b.length<0)){return c
}var d=Math.min(c.start,b.start);var a=Math.max(SC.maxRange(c),SC.maxRange(b));return{start:d,length:a-d}
},intersectRanges:function(c,b){if((c===null)||(b===null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var d=Math.max(SC.minRange(c),SC.minRange(b));
var a=Math.min(SC.maxRange(c),SC.maxRange(b));if(a<d){return SC.RANGE_NOT_FOUND}return{start:d,length:a-d}
},subtractRanges:function(c,b){if((c===null)||(b===null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var a=Math.max(SC.minRange(c),SC.minRange(b));
var d=Math.min(SC.maxRange(c),SC.maxRange(b));if(a<d){return SC.RANGE_NOT_FOUND}return{start:d,length:a-d}
},cloneRange:function(a){return{start:a.start,length:a.length}},rangesEqual:function(b,a){if(b===a){return true
}if(b===null){return a.length<0}if(a===null){return b.length<0}return(b.start==a.start)&&(b.length==a.length)
},convertHsvToHex:function(j,w,o){var a=0;var k=0;var n=0;if(o>0){var e=(j==1)?0:Math.floor(j*6);
var l=(j==1)?0:(j*6)-e;var d=o*(1-w);var c=o*(1-(w*l));var u=o*(1-(w*(1-l)));var m=[[o,u,d],[c,o,d],[d,o,u],[d,c,o],[u,d,o],[o,d,c]];
a=Math.round(255*m[e][0]);k=Math.round(255*m[e][1]);n=Math.round(255*m[e][2])}return this.parseColor("rgb("+a+","+k+","+n+")")
},convertHexToHsv:function(g){var c=this.expandColor(g);var a=Math.max(Math.max(c[0],c[1]),c[2]);
var d=Math.min(Math.min(c[0],c[1]),c[2]);var f=(a==d)?0:((a==c[0])?((c[1]-c[2])/(a-d)/6):((a==c[1])?((c[2]-c[0])/(a-d)/6+1/3):((c[0]-c[1])/(a-d)/6+2/3)));
f=(f<0)?(f+1):((f>1)?(f-1):f);var e=(a===0)?0:(1-d/a);var b=a/255;return[f,e,b]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(b){var c,e,d,a;
c=this.parseColor(b);if(c){e=parseInt(c.slice(1,3),16);d=parseInt(c.slice(3,5),16);
a=parseInt(c.slice(5,7),16);return[e,d,a]}},parseColor:function(d){var e=0,a="#",c;
if(c=this.PARSE_COLOR_RGBRE.exec(d)){var b;for(e=1;e<=3;e++){b=Math.max(0,Math.min(255,parseInt(c[e],0)));
a+=this.toColorPart(b)}return a}if(c=this.PARSE_COLOR_HEXRE.exec(d)){if(c[1].length==3){for(e=0;
e<3;e++){a+=c[1].charAt(e)+c[1].charAt(e)}return a}return"#"+c[1]}return false},toColorPart:function(a){if(a>255){a=255
}var b=a.toString(16);if(a<16){return"0"+b}return b},getStyle:function(a,b){var c="";
if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(d,e){return e.toUpperCase()
});c=a.currentStyle[b]}}return c}});sc_require("views/view");SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(a){this.removeAllChildren();
if(a){this.appendChild(a)}},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("nowShowing");if(a&&a.length>0){this.nowShowingDidChange()}},nowShowingDidChange:function(){var b=this.get("nowShowing");
var a=null;if(SC.typeOf(b)===SC.T_STRING){if(b===SC.CONTENT_SET_DIRECTLY){return}if(b&&b.length>0){if(b.indexOf(".")>0){a=SC.objectForPropertyPath(b,null)
}else{a=SC.objectForPropertyPath(b,this.get("page"))}}}else{a=b}if(a&&!(a instanceof SC.View)){a=null
}this.set("contentView",a)}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});sc_require("views/view");sc_require("mixins/control");
sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,followSafariTabFocusBehavior:NO,_field_isMouseDown:NO,fieldValue:function(){var a=this.get("value");
if(SC.typeOf(a)===SC.T_ERROR){a=a.get("value")}return this.fieldValueForObject(a)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(b){if(SC.none(b)){b=""
}var a=this.$input();if(a.val()!==b){a.val(b)}return this},getFieldValue:function(){return this.$input().val()
},_field_fieldValueDidChange:function(a){SC.RunLoop.begin();this.fieldValueDidChange(NO);
SC.RunLoop.end()},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
this.setIfChanged("value",b)},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))
}.observes("value"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},updateLayer:function(){arguments.callee.base.apply(this,arguments)},mouseDown:function(a){this._field_isMouseDown=YES;
a.allowDefault();return YES},mouseOut:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}a.allowDefault();return YES},mouseOver:function(a){this.set("isActive",this._field_isMouseDown);
a.allowDefault();return YES},mouseUp:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;a.allowDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
a.becomeFirstResponder();return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},acceptsFirstResponder:function(){if(!this.get("followSafariTabFocusBehavior")){return this.get("isEnabled")
}return NO}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input().get(0).focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},_field_setFieldValue:function(b){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){b=this.fieldValueForObject(b)}var a=this.setFieldValue(b);
this.propertyDidChange("fieldValue");return a},_field_getFieldValue:function(){var a=this.getFieldValue();
if(this.objectForFieldValue){a=this.objectForFieldValue(a)}return a}});sc_require("views/view");
sc_require("mixins/control");SC.IMAGE_STATE_NONE="none";SC.IMAGE_STATE_LOADING="loading";
SC.IMAGE_STATE_LOADED="loaded";SC.IMAGE_STATE_FAILED="failed";SC.IMAGE_STATE_SPRITE="sprite";
SC.BLANK_IMAGE_URL="/static/sproutcore/foundation/en/ed50641e9278e55501165cb24eee859fe1f0ac61/blank.gif";
SC.ImageView=SC.View.extend(SC.Control,{classNames:"sc-image-view",tagName:"img",status:SC.IMAGE_STATE_NONE,value:null,useImageCache:YES,canLoadInBackground:NO,localize:YES,displayProperties:"status toolTip".w(),render:function(c,f){var a=this.get("status"),d=this.get("value");
if(a===SC.IMAGE_STATE_NONE&&d){this._image_valueDidChange()}a=this.get("status");
var e=(a===SC.IMAGE_STATE_LOADED)?d:SC.BLANK_IMAGE_URL;if(a===SC.IMAGE_STATE_SPRITE){c.addClass(d)
}c.attr("src",e);var b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}c.attr("title",b);c.attr("alt",b)}},_image_valueDidChange:function(){var b=this.get("value"),c;
if(b&&b.isEnumerable){b=b.firstObject()}c=SC.ImageView.valueIsUrl(b);if(c&&this.get("useImageCache")){var a=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
this._loadingUrl=b;SC.imageCache.loadImage(b,this,this.imageDidLoad,a);if(this._loadingUrl){this.set("status",SC.IMAGE_STATE_LOADING)
}}else{this._loadingUrl=null;this.set("status",(c)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_SPRITE);
this.displayDidChange()}}.observes("value"),imageDidLoad:function(a,b){if(a===this._loadingUrl){this._loadingUrl=null
}if(this.get("value")===a){this.set("status",SC.$ok(b)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_FAILED);
this.displayDidChange()}}});SC.ImageView.valueIsUrl=function(a){return a?a.indexOf("/")>=0:NO
};sc_require("views/view");sc_require("mixins/control");SC.ALIGN_LEFT="left";SC.ALIGN_RIGHT="right";
SC.ALIGN_CENTER="center";SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,{classNames:["sc-label-view"],fontWeight:SC.REGULAR_WEIGHT,escapeHTML:true,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:false,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,exampleInlineTextFieldView:SC.InlineTextFieldView,icon:null,textAlign:SC.ALIGN_LEFT,isInlineEditorMultiline:NO,displayValue:function(){var f=this.get("value");
var d=this.getDelegateProperty("formatter",this.displayDelegate);if(d){var e=(SC.typeOf(d)===SC.T_FUNCTION)?d(f,this):d.fieldValueForObject(f,this);
if(!SC.none(e)){f=e}}if(SC.typeOf(f)===SC.T_ARRAY){var c=[];for(var b=0;b<f.get("length");
b++){var a=f.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}c.push(a)}f=c.join(",")
}if(!SC.none(f)&&f.toString){f=f.toString()}if(f&&this.getDelegateProperty("localize",this.displayDelegate)){f=f.loc()
}if(this.get("escapeHTML")){f=SC.RenderContext.escapeHTML(f)}return f}.property("value","localize","formatter","escapeHTML").cacheable(),isEditable:NO,isEditableBindingDefault:SC.Binding.bool(),isEditing:NO,validator:null,doubleClick:function(a){return this.beginEditing()
},beginEditing:function(){if(this.get("isEditing")){return YES}if(!this.get("isEditable")){return NO
}var b=this.$();var d=this.get("value")||"";var c=SC.viewportOffset(b[0]);var a=this.convertFrameFromView(this.get("frame"),null);
c.width=a.width;c.height=a.height;SC.InlineTextFieldView.beginEditing({frame:c,delegate:this,exampleElement:b,value:d,multiline:this.get("isInlineEditorMultiline"),isCollection:NO,validator:this.get("validator"),exampleInlineTextFieldView:this.get("exampleInlineTextFieldView")})
},discardEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.discardEditing()
},commitEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.commitEditing()
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(a){this._oldOpacity=this.$().css("opacity");
this.$().css("opacity",0)},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(a,b){this.setIfChanged("value",b);
this.$().css("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
},displayProperties:"displayValue textAlign fontWeight icon".w(),_TEMPORARY_CLASS_HASH:{},render:function(c,h){var f=this.get("displayValue"),e=this.get("icon"),g=this.get("hint");
if(e){var a=(e.indexOf("/")>=0)?e:"/static/sproutcore/foundation/en/ed50641e9278e55501165cb24eee859fe1f0ac61/blank.gif";
var d=(a===e)?"":e;e='<img src="%@" alt="" class="icon %@" />'.fmt(a,d);c.push(e)
}if(g&&(!f||f==="")){c.push('<span class="sc-hint">',g,"</span>")}else{c.push(f)}c.addStyle("text-align",this.get("textAlign")).addStyle("font-weight",this.get("fontWeight"));
var b=this._TEMPORARY_CLASS_HASH;b.icon=!!this.get("icon");c.setClass(b);if(this.get("isEditing")){c.addStyle("opacity",0)
}}});sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],isPassword:NO,isTextArea:NO,hint:null,isEditing:NO,leftAccessoryView:null,rightAccessoryView:null,_isFocused:NO,isEditable:function(){return this.get("isEnabled")
}.property("isEnabled").cacheable(),selection:function(l,j){var d=this.$input().get(0);
var e,a,c;if(j===undefined){if(d){a=null;c=null;if(!d.value){a=c=0}else{if("selectionStart" in d){a=d.selectionStart
}if("selectionEnd" in d){c=d.selectionEnd}if(a===null||c===null){var k=document.selection;
if(k){var i=k.type;if(i&&(i==="None"||i==="Text")){e=k.createRange();if(!this.get("isTextArea")){var b=e.text.length;
a=Math.abs(e.moveStart("character",0-(d.value.length+1)));c=a+b}else{var h=e.duplicate();
h.moveToElementText(d);h.setEndPoint("EndToStart",e);a=h.text.length;c=a+e.text.length
}}}}}return SC.TextSelection.create({start:a,end:c})}else{return null}}else{if(!j||!j.kindOf||!j.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(d){var g,f;if("selectionStart" in d){d.selectionStart=j.get("start");g=YES}if("selectionEnd" in d){d.selectionEnd=j.get("end");
f=YES}if(!g||!f){e=d.createTextRange();a=j.get("start");e.move("character",a);e.moveEnd("character",j.get("end")-a);
e.select()}}}}.property("fieldValue").cacheable(),displayProperties:"hint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){this.accessoryViewObserver()
},accessoryViewObserver:function(){var f;var h=["leftAccessoryView","rightAccessoryView"];
var a=h.length;for(var b=0;b<a;b++){var e=h[b];var d=this["_"+e];var g=this.get(e);
if(!(d&&g&&(d===g))){if(d){f=d.get("classNames");f=f.without("sc-text-field-accessory-view");
d.set("classNames",f);this.removeChild(d);d=null;this["_"+e]=null}if(g){if(g.isClass){g=g.create({layoutView:this})
}f=g.get("classNames");var c="sc-text-field-accessory-view";if(f.indexOf(c)<0){f.push(c)
}this.appendChild(g);this["_"+e]=g}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){var b=this.get("rightAccessoryView");if(b&&b.get){var c=b.get("layout");
if(c){c.left=null;if(!c.right){c.right=0}b.adjust({layout:c})}}}arguments.callee.base.apply(this,arguments)
},render:function(c,a){arguments.callee.base.apply(this,arguments);var e=this.get("isEnabled")?"":'disabled="disabled"';
var b=SC.guidFor(this);var h=this.get("isPassword")?"password":"text";if(this.get("isTextArea")){c.addClass("text-area")
}var i=this.get("fieldValue");if(SC.none(i)){i=""}c.setClass("not-empty",i.length>0);
var g=this._getAccessoryViewWidths();var d=g.left;var f=g.right;if(d){d+="px"}if(f){f+="px"
}this._renderField(c,a,i,d,f);if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),_renderField:function(c,a,l,d,i){var f=this.get("hint");
if(a||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;var g=this.get("isEnabled")?"":'disabled="disabled"';
var b=SC.guidFor(this);c.push('<span class="border"></span>');var m="";if(d||i){m='style="';
if(d){m+="left: "+d+"; "}if(i){m+="right: "+i+";"}m+='"'}c.push('<span class="padding" %@>'.fmt(m));
c.push('<span class="sc-hint">',f,"</span>");if(this.get("isTextArea")){c.push('<textarea name="%@" %@>%@</textarea></span>'.fmt(b,g,l))
}else{var j=this.get("isPassword")?"password":"text";c.push('<input type="%@" name="%@" %@ value="%@"/></span>'.fmt(j,b,g,l))
}}else{var k=this.$(".sc-hint");if(f!==this._textField_currentHint){this._textField_currentHint=f;
k.text(f)}var h=this.$input()[0];if(h){if(!this.get("isEnabled")){h.disabled="true"
}else{h.disabled=null}var e=h.parentNode;if(d){if(e.style.left!==d){e.style.left=d
}}else{e.style.left=null}if(i){if(e.style.right!==i){e.style.right=i}}else{e.style.right=null
}}}},_getAccessoryViewWidths:function(){var c={};var j=["left","right"];var d=j.length;
for(var f=0;f<d;f++){var g=j[f];var k=this.get(g+"AccessoryView");if(k&&k.get){var b=k.get("frame");
if(b){var a=b.width;if(a){var h=k.get("layout");if(h){var e=h[g];a+=e}c[g]=a}}}}return c
},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);var a=this.$input();
SC.Event.add(a,"focus",this,this._textField_fieldDidFocus);SC.Event.add(a,"blur",this,this._textField_fieldDidBlur);
SC.Event.add(a,"select",this,this._textField_selectionDidChange);if(SC.browser.mozilla){this._cacheInputElement=this.$input();
this._cachePaddingElement=this.$(".padding")}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);
var a=this.$input();SC.Event.remove(a,"focus",this,this._textField_fieldDidFocus);
SC.Event.remove(a,"blur",this,this._textField_fieldDidBlur);SC.Event.remove(a,"select",this,this._textField_selectionDidChange)
},_textField_fieldDidFocus:function(a){SC.RunLoop.begin();this.fieldDidFocus();SC.RunLoop.end()
},_textField_fieldDidBlur:function(a){SC.RunLoop.begin();this.fieldDidBlur();SC.RunLoop.end()
},fieldDidFocus:function(a){this.beginEditing()},fieldDidBlur:function(){this.commitEditing()
},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(SC.browser.mozilla){var h,d,c,i,b,g,e,f;
e=this._cacheInputElement;f=this._cachePaddingElement;if(f&&f[0]){g=f[0];b=SC.$(g).offset();
if(e[0].tagName.toLowerCase()==="input"){h=b.top+this._topOffsetForFirefoxCursorFix
}else{h=b.top}d=b.left;c=g.offsetWidth;i=g.offsetHeight;var a="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(h,d,c,i);
if(!this._prevStyle||this._prevStyle!=a){e.attr("style",a)}this._prevStyle=a}}return this
},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(a){if(this.get("isVisibleInWindow")){this.$input()[0].focus();
if(!this._txtFieldMouseDown){if(SC.browser.mozilla){this.invokeOnce(this._selectRootElement)
}else{if(SC.browser.safari){this.invokeLater(this._selectRootElement,1)}else{this._selectRootElement()
}}}}},willLoseKeyResponderTo:function(a){},_selectRootElement:function(){this.$input()[0].select()
},didLoseKeyResponderTo:function(a){this.$input()[0].blur()},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(b){if((b.which===13)&&!this.get("isTextArea")){return NO
}if(b.which===27){return NO}if(b.which===9&&!this.get("isTextArea")){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
a.becomeFirstResponder();return YES}if(b.which===8){b.dontForceDeleteKey=YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},keyUp:function(a){this.notifyPropertyChange("selection");
if(this._isKeyDown){this.invokeLater(this.fieldValueDidChange,1,YES)}this._isKeyDown=NO;
a.allowDefault();return YES},mouseDown:function(a){this._txtFieldMouseDown=YES;if(!this.get("isEnabled")){a.stop();
return YES}else{if((this.value&&this.value.length===0)||!this.value){return YES}else{if(SC.browser.mozilla){this.$input()[0].focus()
}return arguments.callee.base.apply(this,arguments)}}},mouseUp:function(a){this._txtFieldMouseDown=NO;
this.notifyPropertyChange("selection");if(!this.get("isEnabled")){a.stop();return YES
}else{if((this.value&&this.value.length===0)||!this.value){this.$input()[0].focus();
return YES}else{return arguments.callee.base.apply(this,arguments)}}},selectStart:function(a){return YES
}});sc_require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},paneDidAttach:function(){var b=arguments.callee.base.apply(this,arguments);
var a=this.rootResponder;a.makeMainPane(this);if(!a.get("keyRootView")){a.makeKeyPane(this)
}return b},acceptsKeyPane:YES,classNames:["sc-main"]});tiki.script("sproutcore/foundation:en/ed50641e9278e55501165cb24eee859fe1f0ac61/javascript.js");
tiki.register("sproutcore/desktop",{depends:["sproutcore/runtime","sproutcore/datastore","sproutcore/foundation"],packages:{"sproutcore/runtime":{},"sproutcore/foundation":{},"sproutcore/datastore":{}},scripts:[{url:"/static/sproutcore/desktop/en/401f741f60c74ac80f68ac40328f274b54416791/javascript.js",id:"sproutcore/desktop:en/401f741f60c74ac80f68ac40328f274b54416791/javascript.js"}]});
tiki.global("sproutcore/desktop");SC.stringsFor("English",{"Invalid.CreditCard(%@)":"%@ is not a valid credit card number","Invalid.Email(%@)":"%@ is not a valid email address","Invalid.NotEmpty(%@)":"%@ must not be empty","Invalid.Password":"Your passwords do not match.  Please try typing them again.","Invalid.General(%@)":"%@ is invalid.  Please try again.","Invalid.Number(%@)":"%@ is not a number."});
SC.allowsBackspaceToPreviousPage=NO;SC.BORDER_BEZEL="sc-bezel-border";SC.BORDER_BLACK="sc-black-border";
SC.BORDER_GRAY="sc-gray-border";SC.BORDER_TOP="sc-top-border";SC.BORDER_BOTTOM="sc-bottom-border";
SC.BORDER_NONE=null;SC.Border={borderStyle:SC.BORDER_GRAY,_BORDER_REGEXP:(/-border$/),renderMixin:function(a,c){var b=this.get("borderStyle");
if(b){if(this._BORDER_REGEXP.exec(b)){a.addClass(b)}else{content.addStyle("border","1px %@ solid".fmt(b))
}}}};SC.Scrollable={isScrollable:true,verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("innerFrame").height
}.property("innerFrame"),horizontalPageScroll:function(){return this.get("innerFrame").width
}.property("innerFrame"),hasVerticalScroller:function(){return this.get("scrollFrame").height>this.get("innerFrame").height
}.property("scrollFrame"),hasHorizontalScroller:function(){return this.get("scrollFrame").width>this.get("innerFrame").width
}.property("scrollFrame"),scrollBy:function(a){var b=this.get("scrollFrame");var c=this.get("innerFrame");
if(!this.get("hasVerticalScroller")){a.y=0}if(b.height<=c.height){a.y=0}if(!this.get("hasHorizontalScroller")){a.x=0
}if(b.width<=c.width){a.x=0}var d={x:b.x-(a.x||0),y:b.y-(a.y||0)};this.set("scrollFrame",d);
d=this.get("scrollFrame");return{x:d.x-b.x,y:d.y-b.y}},scrollTo:function(a,b){this.set("scrollFrame",{x:0-a,y:0-b})
},scrollToVisible:function(b){var e=this.get("innerFrame");var d=this.get("scrollFrame");
var a=this.convertFrameFromView(b.get("frame"),b);a.x-=(e.x+d.x);a.y-=(e.y+d.y);var c={x:0-d.x,y:0-d.y,width:e.width,height:e.height};
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));this.scrollTo(c.x,c.y)},scrollDownLine:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalLineScroll")*a}).y},scrollUpLine:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalLineScroll")*a}).y},scrollRightLine:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalLineScroll")*a}).x},scrollLeftLine:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalLineScroll")*a}).x},scrollDownPage:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalPageScroll")*a}).y},scrollUpPage:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalPageScroll")*a}).y},scrollRightPage:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalPageScroll")*a}).x},scrollLeftPage:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalPageScroll")*a}).x}};SC.DRAG_LINK=4;
SC.DRAG_COPY=1;SC.DRAG_MOVE=2;SC.DRAG_NONE=0;SC.DRAG_ANY=7;SC.DRAG_AUTOSCROLL_ZONE_THICKNESS=20;
SC.Drag=SC.Object.extend({source:null,ghostView:null,ghostActsLikeCursor:NO,dragView:null,ghost:YES,slideBack:YES,mouseDownEvent:null,ghostOffset:{x:0,y:0},location:{},dataTypes:function(){if(this.dataSource){return this.dataSource.get("dragDataTypes")||[]
}var d=this.data;if(d){var a=[];for(var b in d){if(d.hasOwnProperty(b)){a.push(b)
}}return a}var c=this.get("source");if(c&&c.dragDataTypes){return c.get("dragDataTypes")||[]
}return[]}.property().cacheable(),hasDataType:function(a){return(this.get("dataTypes").indexOf(a)>=0)
},dataForType:function(a){if(this.dataSource){return this.dataSource.dragDataForType(this,a)
}else{if(this.data){return this.data[a]}else{var b=this.get("source");if(b&&SC.typeOf(b.dragDataForType)==SC.T_FUNCTION){return b.dragDataForType(this,a)
}else{return null}}}},dataSource:null,data:null,allowedDragOperations:SC.DRAG_ANY,_dragInProgress:YES,startDrag:function(){this._createGhostView();
var n=this.event;var h={x:n.pageX,y:n.pageY};this.set("location",h);var b=this.dragView;
var d=b.get("pane");var o=b.get("parentView");var k=b.get("clippingFrame");var i=o?o.convertFrameToView(b.get("frame"),null):b.get("frame");
var j=d?d.get("frame"):{x:0,y:0};b.adjust({top:i.y+j.y,left:i.x+j.x,width:i.width,height:i.height});
var e=b.get("frame");var m=i;if(this.ghostActsLikeCursor){this.ghostOffset={x:14,y:14}
}else{this.ghostOffset={x:(h.x-m.x),y:(h.y-m.y)}}if(!this._ghostViewHidden){this._positionGhostView(n)
}this.ghostView.rootResponder.dragDidStart(this);var a=this.source;if(a&&a.dragDidBegin){a.dragDidBegin(this,h)
}var c=this._dropTargets();for(var l=0,g=c.length;l<g;l++){c[l].tryToPerform("dragStarted",this,n)
}},mouseDragged:function(a){var b=this._autoscroll(a);var f=this.get("location");
if(!b&&(a.pageX==f.x)&&(a.pageY==f.y)){return}f={x:a.pageX,y:a.pageY};this.set("location",f);
var d=this.source;var c=this._lastTarget;var e=this._findDropTarget(a);var g=SC.DRAG_NONE;
while(e&&(e!=c)&&(g==SC.DRAG_NONE)){if(e&&d&&d.dragSourceOperationMaskFor){g=d.dragSourceOperationMaskFor(this,e)
}else{g=SC.DRAG_ANY}if((g!=SC.DRAG_NONE)&&e&&e.computeDragOperations){g=g&e.computeDragOperations(this,a,g)
}else{g=SC.DRAG_NONE}this.allowedDragOperations=g;if(g==SC.DRAG_NONE){e=this._findNextDropTarget(e)
}}if(e!=c){if(c&&c.dragExited){c.dragExited(this,a)}if(e){if(e.dragEntered){e.dragEntered(this,a)
}if(e.dragUpdated){e.dragUpdated(this,a)}}this._lastTarget=e}else{if(e&&e.dragUpdated){e.dragUpdated(this,a)
}}if(d&&d.dragDidMove){d.dragDidMove(this,f)}if(!this._ghostViewHidden){this._positionGhostView(a)
}},mouseUp:function(l){var g={x:l.pageX,y:l.pageY},h=this._lastTarget,d=this.allowedDragOperations;
this.set("location",g);try{if(h&&h.acceptDragOperation&&h.acceptDragOperation(this,d)){d=h.performDragOperation?h.performDragOperation(this,d):SC.DRAG_NONE
}else{d=SC.DRAG_NONE}}catch(i){console.error("Exception in SC.Drag.mouseUp(acceptDragOperation|performDragOperation): %@".fmt(i))
}try{if(h&&h.dragExited){h.dragExited(this,l)}}catch(j){console.error("Exception in SC.Drag.mouseUp(target.dragExited): %@".fmt(j))
}var c=this._dropTargets();for(var k=0,f=c.length;k<f;k++){try{c[k].tryToPerform("dragEnded",this,l)
}catch(b){console.error("Exception in SC.Drag.mouseUp(dragEnded on %@): %@".fmt(c[k],b))
}}this._destroyGhostView();var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,g,d)
}this._lastTarget=null;this._dragInProgress=NO},_createGhostView:function(){var b=this,c=this.dragView.get("frame"),a;
a=this.ghostView=SC.Pane.create({classNames:["sc-ghost-view"],layout:{top:c.y,left:c.x,width:c.width,height:c.height},owner:this,didCreateLayer:function(){if(b.dragView){var d=b.dragView.get("layer");
if(d){this.get("layer").appendChild(d.cloneNode(true))}}}});a.append()},_positionGhostView:function(a){var c=this.get("location");
c.x-=this.ghostOffset.x;c.y-=this.ghostOffset.y;var b=this.ghostView;if(b){b.adjust({top:c.y,left:c.x});
b.invokeOnce("updateLayout")}},_ghostViewHidden:NO,hideGhostView:function(){if(this.ghostView&&!this._ghostViewHidden){this.ghostView.remove();
this._ghostViewHidden=YES}},unhideGhostView:function(){if(this._ghostViewHidden){this._ghostViewHidden=NO;
this._createGhostView()}},_destroyGhostView:function(){if(this.ghostView){this.ghostView.remove();
this.ghostView=null;this._ghostViewHidden=NO}},_dropTargets:function(){if(this._cachedDropTargets){return this._cachedDropTargets
}var b=[];var d=SC.Drag._dropTargets;for(var c in d){if(d.hasOwnProperty(c)){b.push(d[c])
}}var f={};var e=SC.Drag._dropTargets;var a=function(g){if(!g){return 0}var i=SC.guidFor(g);
var h=f[i];if(!h){h=1;while(g=g.get("parentView")){if(e[SC.guidFor(g)]!==undefined){h++
}}f[i]=h}return h};b.sort(function(h,g){if(h===g){return 0}h=a(h);g=a(g);return(h>g)?-1:1
});this._cachedDropTargets=b;return b},_findDropTarget:function(c){var g={x:c.pageX,y:c.pageY};
var e,f;var d=this._dropTargets();for(var b=0,a=d.length;b<a;b++){e=d[b];if(!e.get("isVisibleInWindow")){continue
}f=e.convertFrameToView(e.get("clippingFrame"),null);if(SC.pointInRect(g,f)){return e
}}return null},_findNextDropTarget:function(a){var b=SC.Drag._dropTargets;while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a
}}return null},_autoscroll:function(l){if(!l){l=this._lastAutoscrollEvent}if(!this._dragInProgress){return NO
}var g=l?{x:l.pageX,y:l.pageY}:this.get("location"),h=this._findScrollableView(g),m=null,k,c,d,i,b,a,e;
while(h&&!m){k=h.get("canScrollVertical")?1:0;c=h.get("canScrollHorizontal")?1:0;
if(k||c){a=h.get("containerView");if(a){e=h.convertFrameToView(a.get("frame"),null)
}else{k=c=0}}if(k){i=SC.maxY(e);d=i-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.y>=d&&g.y<=i){k=1
}else{d=SC.minY(e);i=d+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.y>=d&&g.y<=i){k=-1}else{k=0
}}}if(c){i=SC.maxX(e);d=i-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.x>=d&&g.x<=i){c=1
}else{d=SC.minX(e);i=d+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.x>=d&&g.x<=i){c=-1}else{c=0
}}}if(k||c){m=h}else{h=this._findNextScrollableView(h)}}if(m&&(this._lastScrollableView===m)){if((Date.now()-this._hotzoneStartTime)>100){this._horizontalScrollAmount*=1.05;
this._verticalScrollAmount*=1.05}}else{this._lastScrollableView=m;this._horizontalScrollAmount=15;
this._verticalScrollAmount=15;this._hotzoneStartTime=(m)?Date.now():null;c=k=0}if(m&&(c||k)){var j={x:c*this._horizontalScrollAmount,y:k*this._verticalScrollAmount};
m.scrollBy(j)}if(m){if(l){this._lastAutoscrollEvent={pageX:l.pageX,pageY:l.pageY}
}this.invokeLater(this._autoscroll,100,null);return YES}else{this._lastAutoscrollEvent=null;
return NO}},_scrollableViews:function(){if(this._cachedScrollableView){return this._cachedScrollableView
}var a=[];var c=SC.Drag._scrollableViews;for(var b in c){if(c.hasOwnProperty(b)){a.push(c[b])
}}a=a.sort(function(f,d){var e=f;while(e=e.get("parentView")){if(d==e){return -1}}return 1
});this._cachedScrollableView=a;return a},_findScrollableView:function(f){var c=this._scrollableViews(),b=c?c.length:0,d,e,a;
for(a=0;a<b;a++){d=c[a];if(!d.get("isVisibleInWindow")){continue}e=d.convertFrameToView(d.get("clippingFrame"),null);
if(SC.pointInRect(f,e)){return d}}return null},_findNextScrollableView:function(a){var b=SC.Drag._scrollableViews;
while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a}}return null}});SC.Drag.mixin({start:function(b){var a=this.create(b);
a.startDrag();return a},_dropTargets:{},_scrollableViews:{},addDropTarget:function(a){this._dropTargets[SC.guidFor(a)]=a
},removeDropTarget:function(a){delete this._dropTargets[SC.guidFor(a)]},addScrollableView:function(a){this._scrollableViews[SC.guidFor(a)]=a
},removeScrollableView:function(a){delete this._scrollableViews[SC.guidFor(a)]}});
SC.MODIFIED_KEY_BINDINGS={"ctrl_.":"cancel",shift_tab:"insertBacktab",shift_left:"moveLeftAndModifySelection",shift_right:"moveRightAndModifySelection",shift_up:"moveUpAndModifySelection",shift_down:"moveDownAndModifySelection",alt_left:"moveLeftAndModifySelection",alt_right:"moveRightAndModifySelection",alt_up:"moveUpAndModifySelection",alt_down:"moveDownAndModifySelection",ctrl_a:"selectAll"};
SC.BASE_KEY_BINDINGS={escape:"cancel",backspace:"deleteBackward","delete":"deleteForward","return":"insertNewline",tab:"insertTab",left:"moveLeft",right:"moveRight",up:"moveUp",down:"moveDown",home:"moveToBeginningOfDocument",end:"moveToEndOfDocument",pagedown:"pageDown",pageup:"pageUp"};
SC.CAPTURE_BACKSPACE_KEY=NO;SC.PANEL_ORDER_LAYER=4096;SC.PALETTE_ORDER_LAYER=8192;
SC.POPUP_ORDER_LAYER=12288;SC.RootResponder=SC.RootResponder.extend({platform:"desktop",focusedPane:function(){var a=this.get("orderedPanes");
return a[a.length-1]}.property("orderedPanes"),orderedPanes:null,orderBefore:function(c,g){var a=this.get("focusedPane");
var h=this.get("orderedPanes").without(c);var f,i,d,e;var b=c.get("orderLayer");if(g){f=h.length;
i=h.indexOf(g);d=g.get("orderLayer");if(d<b){while((g.get("orderLayer")<b)&&(++i<f)){g=h[i]
}if(i>=f){g=null}}else{if(d>b){while((g.get("orderLayer")>b)&&(--i>=0)){g=h[i]}g=(i<0)?h[0]:h[i+1]
}}}else{i=h.length;while((--i>=0)&&!g){g=h[i];if(g.get("orderLayer")>b){g=null}}if(i<0){g=h[0]
}else{g=h[i+1]}}if(g){i=h.indexOf(g);h.insertAt(i,c)}else{h.push(c)}this.set("orderedPanes",h);
e=this.get("focusedPane");if(e!==a){if(a){a.blurTo(e)}if(e){e.focusFrom(a)}}return this
},orderOut:function(e){var d=this.get("focusedPane"),c=this.get("keyPane");var b=this.get("orderedPanes").without(e);
this.set("orderedPanes",b);if(d===e){var a=this.get("focusedPane");if(d){d.blurTo(a)
}if(a){a.focusFrom(d)}if(c===e){this.makeKeyPane(a)}}else{if(c===e){this.makeKeyPane(null)
}}return this},init:function(){arguments.callee.base.apply(this,arguments);this.orderedPanes=[]
},setup:function(){this.listenFor("keydown keyup mousedown mouseup click dblclick mouseout mouseover mousemove selectstart".w(),document).listenFor("resize focus blur".w(),window);
if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var b=this;document.onkeypress=function(c){c=SC.Event.normalizeEvent(c);
return b.keypress.call(b,c)};SC.Event.add(window,"unload",this,function(){document.onkeypress=null
})}else{SC.Event.add(document,"keypress",this,this.keypress)}}"drag selectstart".w().forEach(function(d){var e=this[d];
if(e){if(SC.browser.msie){var c=this;document.body["on"+d]=function(f){return e.call(c,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+d]=null})}else{SC.Event.add(document,d,this,e)
}}},this);var a=SC.browser.mozilla?"DOMMouseScroll":"mousewheel";SC.Event.add(document,a,this,this.mousewheel);
this.set("currentWindowSize",this.computeWindowSize());this.focus()},attemptKeyEquivalent:function(b){var e=null;
var d=b.commandCodes()[0];if(!d){return NO}var a=this.get("keyPane"),f=this.get("mainPane"),c=this.get("mainMenu");
if(a){e=a.performKeyEquivalent(d,b)}if(!e&&f&&(f!==a)){e=f.performKeyEquivalent(d,b)
}if(!e&&c){e=c.performKeyEquivalent(d,b)}return e},currentWindowSize:null,computeWindowSize:function(){var a;
if(window.innerHeight){a={width:window.innerWidth,height:window.innerHeight}}else{if(document.documentElement&&document.documentElement.clientHeight){a={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}
}else{if(document.body){a={width:document.body.clientWidth,height:document.body.clientHeight}
}}}return a},resize:function(){this._resize();return YES},_resize:function(){var a=this.computeWindowSize(),b=this.get("currentWindowSize");
this.set("currentWindowSize",a);if(!SC.rectsEqual(a,b)){if(this.panes){SC.RunLoop.begin();
this.panes.invoke("windowSizeDidChange",b,a);SC.RunLoop.end()}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.RunLoop.begin();this.set("hasFocus",YES);SC.RunLoop.end()}return YES},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.RunLoop.begin();this.set("hasFocus",NO);SC.RunLoop.end()}return YES},dragDidStart:function(a){this._mouseDownView=a;
this._drag=a},_lastModifiers:null,_handleModifierChanges:function(b){var a;a=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});
var c=false;if(b.altKey!==a.alt){a.alt=b.altKey;c=true}if(b.ctrlKey!==a.ctrl){a.ctrl=b.ctrlKey;
c=true}if(b.shiftKey!==a.shift){a.shift=b.shiftKey;c=true}b.modifiers=a;return(c)?(this.sendEvent("flagsChanged",b)?b.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(a){return !!(a.altKey||a.ctrlKey||a.metaKey||((a.charCode!==a.which)&&SC.FUNCTION_KEYS[a.which]))
},_isModifierKey:function(a){return !!SC.MODIFIER_KEYS[a.charCode]},keydown:function(a){if(!a.kindOf){this._ffevt=null
}else{a=this._ffevt}if(a===null){return YES}if(SC.browser.mozilla&&(a.which===8)){return true
}var b=this._handleModifierChanges(a);var d=a.target||a.srcElement;var c=(a.which===8)&&!SC.allowsBackspaceToPreviousPage&&(d===document.body);
if(this._isModifierKey(a)){return(c?NO:b)}b=YES;if(this._isFunctionOrNonPrintableKey(a)){if(SC.browser.mozilla&&a.keyCode>=37&&a.keyCode<=40){this._ffevt=a;
SC.RunLoop.begin();this.invokeLater(this.keydown,50);SC.RunLoop.end()}b=this.sendEvent("keyDown",a);
if(!b){b=!this.attemptKeyEquivalent(a)}else{b=a.hasCustomEventHandling;if(b){c=NO
}}}return c?NO:b},keypress:function(a){var b;if(SC.browser.mozilla&&(a.which===8)){b=this.sendEvent("keyDown",a);
return b?(SC.allowsBackspaceToPreviousPage||a.hasCustomEventHandling):YES}else{if(a.charCode!==undefined&&a.charCode===0){return YES
}return this.sendEvent("keyDown",a)?a.hasCustomEventHandling:YES}},keyup:function(a){if(this._ffevt){this._ffevt=null
}var b=this._handleModifierChanges(a);if(this._isModifierKey(a)){return b}return this.sendEvent("keyUp",a)?a.hasCustomEventHandling:YES
},mousedown:function(c){try{this.focus();if(SC.browser.msie){this._lastMouseDownX=c.clientX;
this._lastMouseDownY=c.clientY}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>200)){this._clickCount=1
}c.clickCount=this._clickCount;var b=this.targetViewForEvent(c);var a=null;if(b){a=b.get("pane").get("firstResponder")
}if(a&&a.kindOf(SC.InlineTextFieldView)&&a!==b){a.resignFirstResponder()}b=this._mouseDownView=this.sendEvent("mouseDown",c,b);
if(b&&b.respondsTo("mouseDragged")){this._mouseCanDrag=YES}}catch(d){console.warn("Exception during mousedown: %@".fmt(d));
this._mouseDownView=null;this._mouseCanDrag=NO;throw d}return b?c.hasCustomEventHandling:YES
},mouseup:function(b){try{if(this._drag){this._drag.tryToPerform("mouseUp",b);this._drag=null
}var c=null,a=this._mouseDownView;this._lastMouseUpAt=Date.now();b.clickCount=this._clickCount;
if(a){c=this.sendEvent("mouseUp",b,a);if(!c&&(this._clickCount===2)){c=this.sendEvent("doubleClick",b,a)
}if(!c){c=this.sendEvent("click",b,a)}}if(!c){a=this.targetViewForEvent(b);if(this._clickCount===2){c=this.sendEvent("doubleClick",b,a)
}if(!c){c=this.sendEvent("click",b,a)}}this._mouseCanDrag=NO;this._mouseDownView=null
}catch(d){this._drag=null;this._mouseCanDrag=NO;this._mouseDownView=null;throw d}return(c)?b.hasCustomEventHandling:YES
},dblclick:function(a){if(SC.browser.isIE){this._clickCount=2;this.mouseup(a)}},mousewheel:function(b){try{var a=this.targetViewForEvent(b);
var c=this.sendEvent("mouseWheel",b,a)}catch(d){throw d}return(c)?b.hasCustomEventHandling:YES
},_lastHovered:null,mousemove:function(d){SC.RunLoop.begin();try{this.focus();if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==d.clientX&&this._lastMouseDownY!==d.clientY){this._drag.tryToPerform("mouseDragged",d)
}}else{this._drag.tryToPerform("mouseDragged",d)}}else{var c=this._lastHovered||[];
var f=[];var b=this.targetViewForEvent(d);var i;while(b&&(b!==this)){if(c.indexOf(b)!==-1){b.tryToPerform("mouseMoved",d);
f.push(b)}else{b.tryToPerform("mouseEntered",d);f.push(b)}b=b.get("nextResponder")
}for(var h=0,a=c.length;h<a;h++){b=c[h];i=b.respondsTo("mouseExited");if(i&&!(f.indexOf(b)!==-1)){b.tryToPerform("mouseExited",d)
}}this._lastHovered=f;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==d.clientX&&this._lastMouseDownY!==d.clientY){this._mouseDownView.tryToPerform("mouseDragged",d)
}}else{this._mouseDownView.tryToPerform("mouseDragged",d)}}}}catch(g){throw g}SC.RunLoop.end()
},_mouseCanDrag:YES,selectstart:function(b){var a=this.sendEvent("selectStart",b,this.targetViewForEvent(b));
return(a!==null?YES:NO)&&(this._mouseCanDrag?NO:YES)},drag:function(){return false
}});sc_require("core");SC.UndoManager=SC.Object.extend({undoActionName:function(){return this.undoStack?this.undoStack.name:null
}.property("undoStack"),redoActionName:function(){return this.redoStack?this.redoStack.name:null
}.property("redoStack"),canUndo:function(){return this.undoStack!=null}.property("undoStack"),canRedo:function(){return this.redoStack!=null
}.property("redoStack"),undo:function(){this._undoOrRedo("undoStack","isUndoing")
},redo:function(){this._undoOrRedo("redoStack","isRedoing")},isUndoing:false,isRedoing:false,groupingLevel:0,registerUndo:function(b,a){this.beginUndoGroup(a);
this._activeGroup.actions.push(b);this.endUndoGroup(a)},beginUndoGroup:function(b){if(this._activeGroup){this.groupingLevel++
}else{var a=this.isUndoing?"redoStack":"undoStack";this._activeGroup={name:b,actions:[],prev:this.get(a)};
this.set(a,this._activeGroup);this.groupingLevel=1}},endUndoGroup:function(a){if(!this._activeGroup){raise("endUndoGroup() called outside group.")
}if(this.groupingLevel>1){this.groupingLevel--}else{this._activeGroup=null;this.groupingLevel=0
}this.propertyDidChange(this.isUndoing?"redoStack":"undoStack")},setActionName:function(a){if(!this._activeGroup){raise("setActionName() called outside group.")
}this._activeGroup.name=a},_activeGroup:null,undoStack:null,redoStack:null,_undoOrRedo:function(a,c){if(this._activeGroup){return false
}if(this.get(a)==null){return true}this.set(c,true);var e=this.get(a);this.set(a,e.prev);
var b;var d=e.actions.length>1;if(d){this.beginUndoGroup(e.name)}while(b=e.actions.pop()){b()
}if(d){this.endUndoGroup(e.name)}this.set(c,false)}});SC.NATURAL_SCROLLER_THICKNESS=16;
SC.ScrollerView=SC.View.extend({classNames:["sc-scroller-view"],scrollerThickness:SC.NATURAL_SCROLLER_THICKNESS,value:function(a,c){if(c!==undefined){if(c>=0){this._value=c
}}else{var b=this._value||0;return Math.min(b,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,ownerScrollValueKey:function(){var a=null;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a="verticalScrollOffset";
break;case SC.LAYOUT_HORIZONTAL:a="horizontalScrollOffset";break;default:a=null}return a
}.property("layoutDirection").cacheable(),displayProperties:"maximum isEnabled layoutDirection".w(),render:function(b,c){var a=this.get("maximum");
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.addClass("sc-vertical");
if(c){b.push('<div class="sc-inner" style="height: %@px;">&nbsp;</div>'.fmt(a))}else{this.$("div")[0].style.height=a+"px"
}break;case SC.LAYOUT_HORIZONTAL:b.addClass("sc-horizontal");if(c){b.push('<div class="sc-inner" style="width: %@px;">&nbsp;</div>'.fmt(a))
}else{this.$("div")[0].style.width=a+"px"}break;default:throw"You must set a layoutDirection for your scroller class."
}b.setClass("disabled",!this.get("isEnabled"))},didCreateLayer:function(){var c=this._sc_scroller_scrollDidChange;
SC.Event.add(this.$(),"scroll",this,c);var b=this.get("value");var a=this.get("layer");
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a.scrollTop=b;break;case SC.LAYOUT_HORIZONTAL:a.scrollLeft=b;
break}},willDestroyLayer:function(){var a=this._sc_scroller_scrollDidChange;SC.Event.remove(this.$(),"scroll",this,a)
},_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var a=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(a,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var b=Date.now(),d=this._sc_lastScroll;
if(d&&(b-d)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=b;SC.RunLoop.begin();if(!this.get("isEnabled")){return}var c=this.get("layer"),a=0;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:this._sc_scrollValue=a=c.scrollTop;
break;case SC.LAYOUT_HORIZONTAL:this._sc_scrollValue=a=c.scrollLeft;break}this.set("value",a);
SC.RunLoop.end()},_sc_scroller_valueDidChange:function(){var a=this.get("value");
if(a!==this._sc_scrollValue){var b=this.get("layer");if(b){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.scrollTop=a;
break;case SC.LAYOUT_HORIZONTAL:b.scrollLeft=a;break}}}}.observes("value")});sc_require("views/scroller");
sc_require("mixins/border");SC.ScrollView=SC.View.extend(SC.Border,{classNames:["sc-scroll-view"],isScrollable:YES,contentView:null,horizontalScrollOffset:0,verticalScrollOffset:0,maximumHorizontalScrollOffset:function(){if(!this.get("canScrollHorizontal")){return 0
}var b=this.get("contentView");var a=b?b.get("frame").width:0;if(b.calculatedWidth&&b.calculatedWidth!==0){a=b.calculatedWidth
}var c=this.get("containerView").get("frame").width;return Math.max(0,a-c)}.property(),maximumVerticalScrollOffset:function(){if(!this.get("canScrollVertical")){return 0
}var a=this.get("contentView");var b=(a&&a.get("frame"))?a.get("frame").height:0;
if(a.calculatedHeight&&a.calculatedHeight!==0){b=a.calculatedHeight}var c=this.get("containerView").get("frame").height;
return Math.max(0,b-c)}.property(),verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("frame").height
}.property("frame"),horizontalPageScroll:function(){return this.get("frame").width
}.property("frame"),hasHorizontalScroller:YES,horizontalScrollerView:SC.ScrollerView,isHorizontalScrollerVisible:YES,canScrollHorizontal:function(){return !!(this.get("hasHorizontalScroller")&&this.get("horizontalScrollerView")&&this.get("isHorizontalScrollerVisible"))
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:YES,hasVerticalScroller:YES,verticalScrollerView:SC.ScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:function(){return !!(this.get("hasVerticalScroller")&&this.get("verticalScrollerView")&&this.get("isVerticalScrollerVisible"))
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,containerView:SC.ContainerView,scrollTo:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}if(!SC.none(a)){a=Math.max(0,Math.min(this.get("maximumHorizontalScrollOffset"),a));
this.set("horizontalScrollOffset",a)}if(!SC.none(b)){b=Math.max(0,Math.min(this.get("maximumVerticalScrollOffset"),b));
this.set("verticalScrollOffset",b)}return this},scrollBy:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}a=(a)?this.get("horizontalScrollOffset")+a:null;b=(b)?this.get("verticalScrollOffset")+b:null;
return this.scrollTo(a,b)},scrollToVisible:function(b){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var d=this.get("contentView");if(!d){return NO}var a=b.get("frame");if(!a){return NO
}a=d.convertFrameFromView(a,b.get("parentView"));var c=SC.cloneRect(this.get("containerView").get("frame"));
c.x=this.get("horizontalScrollOffset");c.y=this.get("verticalScrollOffset");var f=c.x,e=c.y;
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));if((f!==c.x)||(e!==c.y)){this.scrollTo(c.x,c.y);
return YES}else{return NO}},scrollDownLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalLineScroll")*a)
},scrollUpLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-this.get("verticalLineScroll")*a)
},scrollRightLine:function(a){if(a===undefined){a=1}return this.scrollTo(this.get("horizontalLineScroll")*a,null)
},scrollLeftLine:function(a){if(a===undefined){a=1}return this.scrollTo(0-this.get("horizontalLineScroll")*a,null)
},scrollDownPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalPageScroll")*a)
},scrollUpPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-(this.get("verticalPageScroll")*a))
},scrollRightPage:function(a){if(a===undefined){a=1}return this.scrollBy(this.get("horizontalPageScroll")*a,null)
},scrollLeftPage:function(a){if(a===undefined){a=1}return this.scrollBy(0-(this.get("horizontalPageScroll")*a),null)
},tile:function(){var a=this.get("hasHorizontalScroller")?this.get("horizontalScrollerView"):null;
var d=a&&this.get("isHorizontalScrollerVisible");var f=this.get("hasVerticalScroller")?this.get("verticalScrollerView"):null;
var c=f&&this.get("isVerticalScrollerVisible");var b=this.get("containerView");var i={left:0,top:0};
var h;var e=((d)?a.get("scrollerThickness"):0);var g=(c)?f.get("scrollerThickness"):0;
if(d){a.set("layout",{left:0,bottom:0,right:g-1,height:e});i.bottom=e-1}else{i.bottom=0
}if(a){a.set("isVisible",d)}if(c){e=e+this.get("verticalScrollerBottom");f.set("layout",{top:0,bottom:e,right:0,width:g});
i.right=g-1}else{i.right=0}if(f){f.set("isVisible",c)}b.set("layout",i)},scrollerVisibilityDidChange:function(){this.tile()
}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible"),_scroll_wheelDeltaX:0,_scroll_wheelDeltaY:0,mouseWheel:function(a){this._scroll_wheelDeltaX+=a.wheelDeltaX;
this._scroll_wheelDeltaY+=a.wheelDeltaY;this.invokeLater(this._scroll_mouseWheel,10);
return YES},_scroll_mouseWheel:function(){this.scrollBy(this._scroll_wheelDeltaX,this._scroll_wheelDeltaY);
this._scroll_wheelDeltaX=this._scroll_wheelDeltaY=0},createChildViews:function(){var b=[],a;
if(SC.none(a=this.containerView)){a=SC.ContainerView}b.push(this.containerView=this.createChildView(a,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if(a=this.horizontalScrollerView){if(this.get("hasHorizontalScroller")){a=this.horizontalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_HORIZONTAL,valueBinding:"*owner.horizontalScrollOffset"});
b.push(a)}else{this.horizontalScrollerView=null}}if(a=this.verticalScrollerView){if(this.get("hasVerticalScroller")){a=this.verticalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_VERTICAL,valueBinding:"*owner.verticalScrollOffset"});
b.push(a)}else{this.verticalScrollerView=null}}this.childViews=b;this.contentViewDidChange();
this.tile()},init:function(){arguments.callee.base.apply(this,arguments);this._scroll_contentView=this.get("contentView");
var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var c=this.get("contentView"),a=this._scroll_contentView;
var b=this.contentViewFrameDidChange;if(c!==a){if(a){a.removeObserver("frame",this,b)
}this._scroll_contentView=c;if(c){c.addObserver("frame",this,b)}this.containerView.set("contentView",c);
this.contentViewFrameDidChange()}}.observes("contentView"),oldMaxHOffset:0,oldMaxVOffset:0,contentViewFrameDidChange:function(){var j=this.get("contentView"),i=(j)?j.get("frame"):null,b=(i)?i.width:0,l=(i)?i.height:0,g=this.get("frame");
this._scroll_contentWidth=b;this._scroll_contentHeight=l;if(this.get("hasHorizontalScroller")&&(j=this.get("horizontalScrollerView"))){b-=1;
if(this.get("autohidesHorizontalScroller")){this.set("isHorizontalScrollerVisible",b>g.width)
}j.setIfChanged("maximum",b)}if(this.get("hasVerticalScroller")&&(j=this.get("verticalScrollerView"))){l-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",l>g.height)
}l-=this.get("verticalScrollerBottom");j.setIfChanged("maximum",l)}if(!this.get("isVerticalScrollerVisible")&&(this.get("verticalScrollOffset")!==0)&&this.get("autohidesVerticalScroller")){this.set("verticalScrollOffset",0)
}if(!this.get("isHorizontalScrollerVisible")&&(this.get("horizontalScrollOffset")!==0)&&this.get("autohidesHorizontalScroller")){this.set("horizontalScrollOffset",0)
}var k=this.get("maximumVerticalScrollOffset"),h=this.get("verticalScrollOffset"),e=this.get("maximumHorizontalScrollOffset"),a=this.get("horizontalScrollOffset");
var d=k&&this.get("hasVerticalScroller")&&k<h;var c=e&&this.get("hasHorizontalScroller")&&e<a;
if(d||c){this.forceDimensionsRecalculation(c,d,h,a)}},_scroll_horizontalScrollOffsetDidChange:function(){var b=this.get("horizontalScrollOffset");
b=Math.max(0,Math.min(this.get("maximumHorizontalScrollOffset"),b));var a=this.get("contentView");
if(a){a.adjust("left",0-b)}}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){var c=this.get("verticalScrollOffset");
c=Math.max(0,Math.min(this.get("maximumVerticalScrollOffset"),c));var b=this.get("contentView");
var a=this.get("containerView");if(b){b.adjust("top",0-c)}}.observes("verticalScrollOffset"),forceDimensionsRecalculation:function(b,c,e,a){var f=a;
var d=e;this.scrollTo(0,0);if(b&&c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),this.get("maximumVerticalScrollOffset"))
}if(b&&!c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),d)}if(!b&&c){this.scrollTo(f,this.get("maximumVerticalScrollOffset"))
}}});tiki.script("sproutcore/desktop:en/401f741f60c74ac80f68ac40328f274b54416791/javascript.js");
tiki.register("sproutcore",{depends:["sproutcore/desktop"],packages:{"sproutcore/desktop":{}},scripts:[{url:"/static/sproutcore/en/1791a39f63c21d70c9e77714656c356b40642ed2/javascript.js",id:"sproutcore:en/1791a39f63c21d70c9e77714656c356b40642ed2/javascript.js"}]});
tiki.global("sproutcore");
/* @license
==========================================================================
SproutCore -- JavaScript Application Framework
copyright 2006-2008, Sprout Systems, Inc. and contributors.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com


==========================================================================
@license */
tiki.script("sproutcore:en/1791a39f63c21d70c9e77714656c356b40642ed2/javascript.js");
tiki.register("sproutcore/empty_theme",{scripts:[{url:"/static/sproutcore/empty_theme/en/21c3b7b16d7ef39d60d2651975590828812f3ad9/javascript.js",id:"sproutcore/empty_theme:en/21c3b7b16d7ef39d60d2651975590828812f3ad9/javascript.js"}]});
tiki.global("sproutcore/empty_theme");tiki.script("sproutcore/empty_theme:en/21c3b7b16d7ef39d60d2651975590828812f3ad9/javascript.js");
tiki.register("sproutcore/standard_theme",{depends:["sproutcore/empty_theme"],packages:{"sproutcore/empty_theme":{}},scripts:[{url:"/static/sproutcore/standard_theme/en/897bb7af6f36da7f9944239957d9a0f238a5c4ed/javascript.js",id:"sproutcore/standard_theme:en/897bb7af6f36da7f9944239957d9a0f238a5c4ed/javascript.js"}]});
tiki.global("sproutcore/standard_theme");tiki.script("sproutcore/standard_theme:en/897bb7af6f36da7f9944239957d9a0f238a5c4ed/javascript.js");
tiki.register("browserup",{depends:["tiki","tiki/system"],packages:{"tiki/system":{},tiki:{}},scripts:[{url:"/static/browserup/en/c72f1c333efc19fa18133f6b37612c00da77d1a6/javascript.js",id:"browserup:en/c72f1c333efc19fa18133f6b37612c00da77d1a6/javascript.js"}]});
tiki.module("browserup:array",'// Array additions.\n\n// ES5 draft:\n// http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf\n\n// ES5 15.4.3.2 \nif (!Array.isArray) {\n    Array.isArray = function(obj) {\n        return Object.prototype.toString.call(obj) == "[object Array]";\n    };\n}\n\n// ES5 15.4.4.18\nif (!Array.prototype.forEach) {\n    Array.prototype.forEach =  function(block, thisObject) {\n        var len = this.length >>> 0;\n        for (var i = 0; i < len; i++) {\n            if (i in this) {\n                block.call(thisObject, this[i], i, this);\n            }\n        }\n    };\n}\n\n// ES5 15.4.4.19\n// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map\nif (!Array.prototype.map) {\n    Array.prototype.map = function(fun /*, thisp*/) {\n        var len = this.length >>> 0;\n        if (typeof fun != "function")\n          throw new TypeError();\n\n        var res = new Array(len);\n        var thisp = arguments[1];\n        for (var i = 0; i < len; i++) {\n            if (i in this)\n                res[i] = fun.call(thisp, this[i], i, this);\n        }\n\n        return res;\n    };\n}\n;');
tiki.module("browserup:function","// From Narwhal\nFunction.prototype.bind = function () {\n    var args = Array.prototype.slice.call(arguments);\n    var self = this;\n    var bound = function () {\n        return self.call.apply(\n            self,\n            args.concat(\n                Array.prototype.slice.call(arguments)\n            )\n        );\n    };\n    bound.name = this.name;\n    bound.displayName = this.displayName;\n    bound.length = this.length;\n    bound.unbound = self;\n    return bound;\n};\n\n;");
tiki.module("browserup:package","require('function');\nrequire('array');\n;");tiki.script("browserup:en/c72f1c333efc19fa18133f6b37612c00da77d1a6/javascript.js");
tiki.register("bespin",{depends:["tiki","tiki/system","sproutcore","sproutcore/empty_theme","sproutcore/standard_theme","browserup"],packages:{"sproutcore/empty_theme":{},"sproutcore/standard_theme":{},"tiki/system":{},sproutcore:{},browserup:{},tiki:{}},scripts:[{url:"/static/bespin/en/614012e975a60c9ae7e6ad329e6fe36808d1e2a7/javascript.js",id:"bespin:en/614012e975a60c9ae7e6ad329e6fe36808d1e2a7/javascript.js"}]});
tiki.module("bespin:actions",function(c,a,d){var b=c("package");var g=c("sproutcore/runtime:package").SC;
var f=c("cursor");var e=c("util/clipboard");a.Actions=g.Object.extend({editor:null,ignoreRepaints:false,currentEditItem:undefined,editDepth:0,beginEdit:function(h){if(this.editDepth==0){this.currentEditItem=a.ActionHistoryItem.create({name:h,editor:this.editor});
this.currentEditItem.begin()}this.editDepth++},endEdit:function(){if(this.editDepth<=0){return
}this.editDepth--;if(this.editDepth==0){this.currentEditItem.end();this.editor.historyManager.add(this.currentEditItem);
this.currentEditItem=undefined}},handleCursorSelection:function(h){if(h.event.shiftKey){if(!this.editor.selection){this.editor.setSelection({startPos:f.copyPos(h.pos)})
}this.editor.setSelection({startPos:this.editor.selection.startPos,endPos:f.copyPos(this.editor.cursorManager.getCursorPosition())})
}else{this.editor.setSelection(undefined)}},moveCursor:function(i,h){var j=this.editor.cursorManager[i](h);
this.handleCursorSelection(h);this.repaint();h.pos=j.newPos;return h},moveCursorLeft:function(h){return this.moveCursor("moveLeft",h)
},moveCursorRight:function(h){return this.moveCursor("moveRight",h)},moveCursorUp:function(h){return this.moveCursor("moveUp",h)
},moveCursorDown:function(h){return this.moveCursor("moveDown",h)},moveToLineStart:function(h){return this.moveCursor("moveToLineStart",h)
},moveToLineEnd:function(h){return this.moveCursor("moveToLineEnd",h)},moveToFileTop:function(h){return this.moveCursor("moveToTop",h)
},moveToFileBottom:function(h){return this.moveCursor("moveToBottom",h)},movePageUp:function(h){return this.moveCursor("movePageUp",h)
},movePageDown:function(h){return this.moveCursor("movePageDown",h)},moveWordLeft:function(h){return this.moveCursor("smartMoveLeft",h)
},moveWordRight:function(h){return this.moveCursor("smartMoveRight",h)},deleteWordLeft:function(h){this.beginEdit("deleteWordLeft");
this.deleteChunk({endPos:h.pos,pos:this.moveCursor("smartMoveLeft",h).pos});this.endEdit();
return h},deleteWordRight:function(h){this.beginEdit("deleteWordRight");this.deleteChunk({pos:h.pos,endPos:this.moveCursor("smartMoveRight",h).pos});
this.endEdit();return h},applyState:function(k){if(this.testHistory.length==0){return
}else{if(k<0){k=-1}else{if(k>=this.testHistory.length){return}}}this.testHistoryPosition=k;
var j=this.testHistory[Math.max(0,this.testHistoryPosition)];var i=j.after;var h=j.uiAfter;
if(k<0){i=j.before;h=j.uiBefore}this.editor.model.applyState(i);this.editor.setState(h)
},undo:function(){this.editor.historyManager.undo()},redo:function(){this.editor.historyManager.redo()
},selectAll:function(h){if(this.editor.model.isEmpty()){return}h.startPos={row:0,col:0};
h.endPos={row:this.editor.model.getRowCount()-1,col:this.editor.editorView.getRowScreenLength(this.editor.model.getRowCount()-1)};
this.select(h)},select:function(h){if(h.startPos){this.editor.setSelection({startPos:h.startPos,endPos:h.endPos});
this.editor.cursorManager.moveCursor(h.endPos)}else{this.editor.setSelection(undefined)
}},insertTab:function(i){if(this.editor.readonly){return}var k=b.get("settings");
if(this.editor.getSelection()&&!i.undoInsertTab){this.indent(i);return}var j=i.tab;
var h=this.editor.cursorManager.getCharacterLength("\t");if(!j||!h){if(k&&k.isSettingOn("tabmode")){j="\t"
}else{j="";var l=h;while(l-->0){j+=" "}h=j.length}}this.beginEdit("insertTab");delete this.editor.selection;
this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition({row:i.pos.row,col:i.pos.col}),j);
this.editor.cursorManager.moveCursor({row:i.pos.row,col:i.pos.col+h});this.repaint();
this.endEdit()},indent:function(r){this.beginEdit("indent");var o=b.get("settings");
var t=this.editor.getSelection();var h=false;if(t===undefined){h=true;var p=this.editor.getCursorPos();
var i=this.editor.getModelPos();t={startPos:{row:p.row,col:0},endPos:{row:p.row,col:this.editor.model.getRowMetadata(p.row).lineLength},startModelPos:{row:i.row,col:0},endModelPos:{row:i.row,col:this.editor.model.getRowMetadata(i.row).lineLengthWithoutTabExpansion}};
this.editor.setSelection(t)}var v=t.startPos.row;var q=t.endPos.row;var l=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(q).join(""));
var m=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(r.pos.row).join(""));
var n;var k="";if(o&&o.isSettingOn("tabmode")){k="\t"}else{var j=this.editor.getTabSize();
while(j-->0){k+=" "}}for(var s=v;s<=q;s++){if(k!="\t"){n=this.editor.cursorManager.getLeadingWhitespace(s);
n=this.editor.cursorManager.getNextTablevelRight(n)-n;n=k.substring(0,n)}else{n="\t"
}this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition({row:s,col:0}),n)
}var u=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(r.pos.row).join(""))-m;
t.endPos.col+=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(q).join(""))-l;
this.editor.setSelection(t);this.editor.cursorManager.moveCursor({col:r.pos.col+u});
if(h){this.editor.setSelection(undefined)}this.repaint();this.endEdit()},unindent:function(p){this.beginEdit("unindent");
var r=this.editor.getSelection();var h=false;if(r===undefined){h=true;var n=this.editor.getCursorPos();
var i=this.editor.getModelPos();r={startPos:{row:n.row,col:0},endPos:{row:n.row,col:this.editor.model.getRowMetadata(n.row).lineLength},startModelPos:{row:i.row,col:0},endModelPos:{row:i.row,col:this.editor.model.getRowMetadata(i.row).lineLengthWithoutTabExpansion}};
this.editor.setSelection(r)}var t=r.startPos.row;var o=r.endPos.row;var l=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(o).join(""));
var u=false;var m;var k;for(var q=t;q<=o;q++){u=this.editor.model.getRowArray(q);
if(u.length>0&&u[0]=="\t"){m=1;k=this.editor.getTabSize()}else{var j=this.editor.cursorManager.getLeadingWhitespace(q);
m=this.editor.cursorManager.getContinuousSpaceCount(0,this.editor.getTabSize(),q);
k=m}if(m){this.editor.model.deleteCharacters(this.editor.cursorManager.getModelPosition({row:q,col:0}),m)
}if(q==t){r.startPos.col=Math.max(0,r.startPos.col-k)}if(q==o){if(!u){u=this.editor.model.getRowArray(q)
}var s=l-this.editor.cursorManager.getStringLength(u.join(""));r.endPos.col=Math.max(0,r.endPos.col-s);
p.pos.col=Math.max(0,p.pos.col-s)}}this.editor.setSelection(r);this.editor.cursorManager.moveCursor({col:p.pos.col});
if(h){this.editor.setSelection(undefined)}this.repaint();this.endEdit()},cutSelection:function(h){if(this.editor.readonly){return
}this.beginEdit("cut");this.copySelection(h);this.deleteSelection(h);this.endEdit()
},copySelection:function(h){var i=this.editor.getSelection();if(i){var j=this.editor.model.getChunk(i);
if(j){e.manual.copy(j)}}},pasteFromClipboard:function(h){if(this.editor.readonly){return
}var i=(h.clipboard)?h.clipboard:e.manual.data();if(i===undefined){return}h.chunk=i;
this.beginEdit("paste");this.insertChunk(h);this.endEdit()},insertChunk:function(h){if(this.editor.readonly){return
}this.beginEdit("insertChunk");if(this.editor.selection){this.deleteSelection()}var i=f.copyPos(this.editor.cursorManager.getCursorPosition());
i=this.editor.model.insertChunk(this.editor.cursorManager.getModelPosition(i),h.chunk);
i=this.editor.cursorManager.getCursorPosition(i);this.editor.cursorManager.moveCursor(i);
this.repaint();this.endEdit();return i},deleteChunk:function(j){if(this.editor.readonly){return
}this.beginEdit("deleteChunk");var i=(j.startPos!=undefined)?j.startPos:f.copyPos(j.pos);
var k=this.editor.getSelection({startPos:i,endPos:j.endPos});var h=this.editor.model.deleteChunk(k);
this.editor.cursorManager.moveCursor(k.startPos);this.editor.setSelection(undefined);
this.repaint();this.endEdit();return k.startPos},joinLine:function(i){if(this.editor.readonly){return
}this.beginEdit("joinLine");if(i.joinDirection=="up"){if(i.pos.row==0){return}var h=this.editor.editorView.getRowScreenLength(i.pos.row-1);
this.editor.model.joinRow(i.pos.row-1);this.editor.cursorManager.moveCursor({row:i.pos.row-1,col:h})
}else{if(i.pos.row>=this.editor.model.getRowCount()-1){return}this.editor.model.joinRow(i.pos.row)
}this.endEdit();this.repaint()},killLine:function(h){if(this.editor.readonly){return
}this.beginEdit("killLine");this.editor.setSelection({startPos:{row:h.pos.row,col:0},endPos:{row:h.pos.row+1,col:0}});
this.cutSelection(h);this.endEdit()},deleteSelection:function(h){if(this.editor.readonly){return
}var i=this.editor.getSelection();return this.deleteChunk({startPos:i.startPos,endPos:i.endPos,clearSelection:true})
},backspace:function(j){if(this.editor.readonly){return}this.beginEdit("backspace");
if(this.editor.selection){this.deleteSelection(j)}else{if(j.pos.col>0){var k=b.get("settings");
if(k&&k.isSettingOn("smartmove")){var i=this.editor.getTabSize();var h=this.editor.cursorManager.getContinuousSpaceCount(j.pos.col,this.editor.cursorManager.getNextTablevelLeft(j.pos.col));
if(h==i){var l=j.pos;this.editor.selection={startPos:{row:l.row,col:l.col-i},endPos:{row:l.row,col:l.col}};
this.deleteSelection(j);this.endEdit();return}}this.editor.cursorManager.moveCursor({col:Math.max(0,j.pos.col-1)});
j.pos.col-=1;this.deleteCharacter(j)}else{j.joinDirection="up";this.joinLine(j)}}this.endEdit()
},deleteKey:function(j){if(this.editor.readonly){return}this.beginEdit("deleteKey");
if(this.editor.selection){this.deleteSelection(j)}else{if(j.pos.col<this.editor.editorView.getRowScreenLength(j.pos.row)){var k=b.get("settings");
if(k&&k.isSettingOn("smartmove")){var i=this.editor.getTabSize();var h=this.editor.cursorManager.getContinuousSpaceCount(j.pos.col,this.editor.cursorManager.getNextTablevelRight(j.pos.col));
if(h==i){var l=j.pos;this.editor.selection={startPos:{row:l.row,col:l.col},endPos:{row:l.row,col:l.col+i}};
this.deleteSelection(j);this.endEdit();return}}this.deleteCharacter(j)}else{j.joinDirection="down";
this.joinLine(j)}}this.endEdit()},deleteCharacter:function(j){if(this.editor.readonly){return
}if(j.pos.col<this.editor.editorView.getRowScreenLength(j.pos.row)){this.beginEdit("deleteCharacter");
var i=this.editor.cursorManager.getModelPosition(j.pos);var k=1;var h=this.editor.model.deleteCharacters(i,k);
this.repaint();this.endEdit()}},newline:function(h){if(this.editor.readonly){return
}var i=b.get("settings");var j;if(i&&i.isSettingOn("autoindent")){j=b.util.leadingWhitespace(this.editor.model.getRowArray(h.pos.row))
}else{j=[]}h.chunk="\n"+j.join("");this.insertChunk(h)},newlineBelow:function(h){this.newline(this.moveToLineEnd(h))
},insertCharacter:function(h){if(this.editor.readonly){return}this.beginEdit("insertCharacter");
var j=h.pos;if(this.editor.selection){j=this.deleteSelection(h)}this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(j),h.newchar);
this.editor.cursorManager.moveRight(true);var i=b.get("settings");if(i&&i.isSettingOn("closepairs")){switch(h.newchar){case"(":this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(),")");
break;case"[":this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(),"]");
break;case"{":this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(),"}");
break;case"<":break;case'"':break;case"'":break}}this.repaint();this.endEdit()},moveCursorRowToCenter:function(h){var j=this.editor.getCursorPos().row;
var i=Math.floor(this.editor.ui.visibleRows/2);if(j>(this.editor.ui.firstVisibleRow+i)){this.editor.cursorManager.moveCursor({row:this.editor.getCursorPos().row+i})
}else{this.editor.cursorManager.moveCursor({row:this.editor.getCursorPos().row-i})
}this.editor.editorView.ensureCursorVisible();this.editor.cursorManager.moveCursor({row:j})
},getOppositeCase:function(h){if(!h){return undefined}switch(h){case"u":return"l";
case"l":return"u"}},selectionChangeCase:function(j){if(this.editor.readonly){return
}if(this.editor.selection){this.beginEdit("selectionChangeCase");if(!j.selectionObject){j.selectionObject=this.editor.getSelection()
}var l=this.editor.model.getChunk(j.selectionObject);var h=l.split("\n");for(var k in h){switch(j.stringCase){case"l":h[k]=h[k].toLowerCase();
break;case"u":h[k]=h[k].toUpperCase();break}}var m=h.join("\n");this.editor.model.deleteChunk(j.selectionObject);
this.editor.model.insertChunk(j.selectionObject.startModelPos,m);this.select(j.selectionObject);
this.endEdit()}},startSearch:function(m,h,i){if(m==""){this.editor.ui.setSearchString(false);
this.editor.paint(true);document.getElementById("searchresult").style.display="none";
return false}if(m==this.editor.ui.searchString&&h=="toolbar"){if(!i){this.findNext()
}else{this.findPrev()}document.getElementById("searchresult").style.display="block";
return}this.editor.ui.setSearchString(m);var j=this.editor.model.getCountOfString(m);
if(j!=0){var n=f.copyPos(this.editor.cursorManager.getCursorPosition());if(!this.editor.ui.actions.findNext(null,true)){this.editor.cursorManager.moveCursor({col:0,row:0});
this.editor.ui.actions.findNext()}}var l;switch(h){case"commandLine":l="Found "+j+" match";
if(j>1){l+="es"}l+=" for your search for <em>"+m+"</em>";b.get("commandLine").showHint(l);
break;case"searchwindow":var k=b.get("filesearch");if(k){k.setMatchesCount(j)}break;
case"toolbar":l=+j+" Match";if(j>1){l+="es"}document.getElementById("searchfeedback").innerHTML=l;
document.getElementById("searchresult").style.display="block";break}this.editor.paint(true)
},findNext:function(h,k){if(!this.editor.ui.searchString){return}var l=f.copyPos(this.editor.cursorManager.getModelPosition());
var j=this.editor.getSelection();if(k&&j!==undefined){l.col-=j.endModelPos.col-j.startModelPos.col+1
}var i=this.editor.model.findNext(l.row,l.col,this.editor.ui.searchString);if(!i){i=this.editor.model.findNext(0,0,this.editor.ui.searchString)
}if(i){this.editor.setSelection({startPos:this.editor.cursorManager.getCursorPosition(i.startPos),endPos:this.editor.cursorManager.getCursorPosition(i.endPos)});
this.editor.cursorManager.moveCursor(this.editor.cursorManager.getCursorPosition(i.endPos));
this.editor.editorView.ensureCursorVisible(true);this.repaint();return true}else{return false
}},findPrev:function(){if(!this.editor.ui.searchString){return}var j=this.editor.cursorManager.getModelPosition();
var i=this.editor.model.findPrev(j.row,j.col,this.editor.ui.searchString);if(!i){var h=this.editor.model.getRowCount()-1;
i=this.editor.model.findPrev(h,this.editor.model.getRowArray(h).length-1,this.editor.ui.searchString)
}if(i){this.editor.setSelection({startPos:this.editor.cursorManager.getCursorPosition(i.startPos),endPos:this.editor.cursorManager.getCursorPosition(i.endPos)});
this.editor.cursorManager.moveCursor(this.editor.cursorManager.getCursorPosition(i.endPos));
this.editor.editorView.ensureCursorVisible(true);this.repaint();return true}else{return false
}},escape:function(){b.publish("ui:escape");if(this.editor.ui.searchString){this.editor.ui.setSearchString(false)
}},toggleQuickopen:function(){var h=b.get("quickopen");if(h){h.toggle()}},togglePieMenu:function(){b.getComponent("piemenu",function(h){h.toggle()
})},focusCommandline:function(){b.getComponent("popup",function(h){h.show("output","Command Line")
})},focusFileBrowser:function(){b.getComponent("popup",function(h){h.show("files","File Explorer")
})},repaint:function(){if(!this.ignoreRepaints){this.editor.editorView.ensureCursorVisible();
this.editor.paint()}},replace:function(h){this.beginEdit("replace");this.editor.model.replace(h.search,h.replace);
this.repaint();this.endEdit()},gotoLine:function(){b.getComponent("commandLine",function(h){h.setCommandText("goto ");
b.getComponent("popup",function(i){i.show("output")})})},cmdFilesearch:function(){b.getComponent("commandLine",function(h){h.setCommandText("search ");
b.getComponent("popup",function(i){i.show("output")})})},previousFile:function(){b.get("editSession").goToPreviousFile()
},nextFile:function(){b.get("editSession").goToNextFile()}});a.ActionHistoryItem=g.Object.extend({begin:function(i,h){this.startIndex=this.editor.historyManager.getCurrent();
if(i){this.editorBefore=i}else{this.editorBefore=this.editor.getState()}if(h){this.modelBefore=h
}else{this.modelBefore=this.editor.model.getState()}},end:function(i,h){this.editor.historyManager.truncate(this.startIndex);
if(i){this.editorAfter=i}else{this.editorAfter=this.editor.getState()}if(h){this.modelAfter=h
}else{this.modelAfter=this.editor.model.getState()}},undo:function(){this.editor.model.applyState(this.modelBefore);
this.editor.setState(this.editorBefore);this.editor.editorView.ensureCursorVisible();
this.editor.paint()},redo:function(){this.editor.model.applyState(this.modelAfter);
this.editor.setState(this.editorAfter);this.editor.editorView.ensureCursorVisible();
this.editor.paint()}})});tiki.module("bespin:boot",function(b,a,c){var e=b("sproutcore/runtime:package").SC;
var d=tiki.require("bespin:embed");e.ready(function(){var f=document.querySelectorAll(".bespin");
for(var j=0;j<f.length;j++){var k=f[j];var h=k.getAttribute("data-bespinoptions");
var g=d.useBespin(k,JSON.parse(h));k.bespin=g}if(window.onBespinLoad){window.onBespinLoad()
}});window.onload=e.didLoad});tiki.module("bespin:builtins",function(b,a,c){a.metadata={"Base Syntax":{provides:[{ep:"entrypoint",name:"syntax.engine",description:"Syntax highlighting engines"},{ep:"syntax.engine",name:"simple",pointer:"bespin/syntax/simple:Model"},{ep:"entrypoint",name:"syntax.simple.highlighter",description:"Highlighter code for the simple syntax highlighter."},{ep:"syntax.simple.highlighter",name:"JavaScript",extensions:["js","json","javascript","ecmascript","jsm","java"],pointer:"bespin/syntax/simple/javascript:JavaScript"},{ep:"syntax.simple.highlighter",name:"C",extensions:["c","h"],pointer:"bespin/syntax/simple/c:C"},{ep:"syntax.simple.highlighter",name:"CSharp",extensions:["cs"],pointer:"bespin/syntax/simple/csharp:CSharp"},{ep:"syntax.simple.highlighter",name:"CSS",extensions:["css"],pointer:"bespin/syntax/simple/css:CSS"},{ep:"syntax.simple.highlighter",name:"HTML",extensions:["html","htm","xml","xhtml","shtml"],pointer:"bespin/syntax/simple/html:HTML"},{ep:"syntax.simple.highlighter",name:"PHP",extensions:["php","php3","php4","php5"],pointer:"bespin/syntax/simple/php:PHP"},{ep:"syntax.simple.highlighter",name:"Python",extensions:["py","python"],pointer:"bespin/syntax/simple/python:Python"},{ep:"syntax.simple.highlighter",name:"Ruby",extensions:["rb","ruby"],pointer:"bespin/syntax/simple/ruby:Ruby"}]}}
});tiki.module("bespin:command",function(d,b,e){var c=d("package");var f=d("sproutcore/runtime:package").SC;
var a=d("util/tokenobject").TokenObject;b.Store=f.Object.extend({commands:{},aliases:{},command:null,parent:null,init:function(){if(this.parent){this.containerCommand=this.command;
this.command.takes=["*"];this.command.subcommands=this;this.parent.addCommand(this.command)
}},addCommand:function(g){if(!g){return}g.parent=this;this.commands[g.name]=g;if(g.takes&&Array.isArray(g.takes)){g=this.normalizeTakes(g)
}if(g.withKey){c.getComponent("editor",function(h){h.bindCommand(g.name,g.withKey)
})}if(g.aliases){g.aliases.forEach(function(h){this.aliases[h]=g.name},this)}g.getFullCommandName=function(){var h=this.name;
if(this.parent){h=this.parent.getFullCommandName()+" "+h}return h.trim()};if(!g.findCompletions){g.findCompletions=function(h,i){h.hint=this.completeText;
i(h)}}},removeCommand:function(g){if(!g){return}delete this.commands[g.name]},getFullCommandName:function(){var g=this.containerCommand?this.containerCommand.name:"";
if(this.parent){g=this.parent.getFullCommandName()+" "+g}return g.trim()},filterOptionsByPrefix:function(g,h){return g.filter(function(i){return i.substr(0,h.length)===h
})},findCommand:function(g){var h=g.trim().split(/\s+/);var j=h.shift();var i=this.commands[j]||this.commands[this.aliases[j]];
if(!i){if(h.length>0){return null}else{return this}}if(i.subcommands){return i.subcommands.findCommand(h.join(" "))
}else{return i}},findCompletions:function(i,m){if(i.action.length>1){i.error="No matches";
m(i);return}var k=i.action[0];if(k.length==0&&this.parent==null){m(i);return}var h=[];
for(var l in this.commands){if(l.indexOf(k)==0){h.push(l)}}for(var g in this.aliases){if(g.indexOf(k)==0){h.push(g)
}}if(h.length==1){var j=h[0];l=this.commands[j]||this.commands[this.aliases[j]];if(this.commandTakesArgs(l)){j=j+" "
}i.autofill=i.prefix+j;i.hint=l.preview}else{if(h.length==0){i.error="No matches"
}else{h.sort(function(o,n){return o.localeCompare(n)});i.options=h}}m(i);return},commandTakesArgs:function(g){return g.takes!=undefined
},getArgs:function(h,j){if(!j.takes){return undefined}var g;var i=h.join(" ");if(j.takes["*"]){g=new a({input:i});
g.rawinput=i;g.varargs=g.pieces}else{if(j.takes&&j.takes.order.length<2){g=i}else{g=new a({input:i,options:{params:j.takes.order.join(" ")}});
g.rawinput=i}}return g},normalizeTakes:function(h){var g=h.takes;h.takes={order:g};
g.forEach(function(i){h.takes[i]={"short":i[0]}});return h},getHelp:function(n,s){var h=[];
var k,g;if(this.commands[n]){k=this.commands[n];h.push(k.description?k.description:k.preview)
}else{var p=false;var q="";if(this.containerCommand){q=" for "+this.containerCommand.name
}if(n){if(n=="hidden"){n="";p=true}h.push("<h2>Commands starting with '"+n+"':</h2>")
}else{h.push("<h2>Available Commands:</h2>")}var m=[];for(g in this.commands){m.push(g)
}var o=m.sort();h.push("<table>");for(var l=0;l<o.length;l++){g=o[l];k=this.commands[g];
if(!p&&k.hidden){continue}if(n&&g.indexOf(n)!=0){continue}var r=(k.takes)?" ["+k.takes.order.join("] [")+"]":"";
h.push("<tr>");h.push("<th>"+g+"</th>");h.push("<td>"+k.preview+"</td>");h.push("<td>"+r+"</td>");
h.push("</tr>")}h.push("</table>")}var j=h.join("");if(s&&s.prefix){j=s.prefix+"<br/>"+j
}if(s&&s.suffix){j=j+"<br/>"+s.suffix}return j}});b.store=new b.Store();b.executeExtensionCommand=function(){var h=arguments;
var g=this;this.load(function(i){i.apply(g,h)})};c.subscribe("extension:loaded:bespin.command",function(g){g.execute=b.command.executeExtensionCommand;
b.store.addCommand(g)});c.subscribe("extension:removed:bespin.command",function(g){b.store.removeCommand(g)
});b.store.addCommand({name:"help",takes:["search"],preview:"show commands",description:"The <u>help</u> gives you access to the various commands in the Bespin system.<br/><br/>You can narrow the search of a command by adding an optional search params.<br/><br/>If you pass in the magic <em>hidden</em> parameter, you will find subtle hidden commands.<br/><br/>Finally, pass in the full name of a command and you can get the full description, which you just did to see this!",completeText:"optionally, narrow down the search",execute:function(h,g){var i=this.parent.getHelp(g,{prefix:"<h2>Welcome to Bespin - Code in the Cloud</h2><ul><li><a href='http://labs.mozilla.com/projects/bespin' target='_blank'>Home Page</a><li><a href='https://wiki.mozilla.org/Labs/Bespin' target='_blank'>Wiki</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/UserGuide' target='_blank'>User Guide</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/Tips' target='_blank'>Tips and Tricks</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/FAQ' target='_blank'>FAQ</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/DeveloperGuide' target='_blank'>Developers Guide</a></ul>",suffix:"For more information, see the <a href='https://wiki.mozilla.org/Labs/Bespin'>Bespin Wiki</a>."});
h.addOutput(i)}})});tiki.module("bespin:cursor",function(c,a,d){var b=c("package");
var e=c("sproutcore/runtime:package").SC;a.CursorManager=e.Object.extend({editor:null,init:function(){this.position={row:0,col:0};
this.virtualCol=0;b.subscribe("settings:set:strictlines",function(h){var g=b.get("settings");
if(g.isValueOn(h.value)){var f=a.copyPos(this.position);this.checkPastEndOfLine(f)
}}.bind(this));arguments.callee.base.apply(this,arguments)},getCursorPosition:function(g){if(g==undefined){return this.position
}var m=a.copyPos(g);var h=[];if(this.editor.model.hasRow(m.row)){h=this.editor.model.getRowArray(m.row)
}var f=this.editor.getTabSize();if(h.indexOf("\t")!=-1){var k=0,l=0;for(var j=0;j<g.col;
j++){if(h[j]=="\t"){m.col+=f-1-(l%f);k++;l=0}else{l++;k=0}}}return m},getModelPosition:function(m){m=(m!=undefined)?m:this.position;
var g=a.copyPos(m);var k=[];if(this.editor.model.hasRow(m.row)){k=this.editor.model.getRowArray(m.row)
}var f=this.editor.getTabSize();if(k.indexOf("\t")!=-1){var j=0;for(var l=0;l<g.col;
l++){var h=j;if(k[l]=="\t"){h=Math.floor((j+f)/f)*f}else{h+=1}if(h>g.col){break}j=h
}g.col=l}return g},getCharacterLength:function(h,g){if(h.length>1){return}if(g==undefined){g=this.position.col
}if(h=="\t"){var f=this.editor.getTabSize();return f-(g%f)}else{return 1}},getStringLength:function(h){if(!h||h.length==0){return 0
}var g=0;h=h.split("");for(var f=0;f<h.length;f++){g+=this.getCharacterLength(h[f],g)
}return g},getLeadingWhitespace:function(h){var g=this.editor.model.getRowArray(h).join("");
var f=/^(\s+).*/.exec(g);return(f&&f.length==2?this.getStringLength(f[1]):0)},getContinuousSpaceCount:function(k,l,i){i=i||this.position.row;
var g=b.get("settings");var n=this.editor.model.getRowArray(i);var m=(k<l?1:-1);var f=n.length;
k=k+(m==1?0:-1);l=l+(m==1?0:-1);k=this.getModelPosition({col:k,row:i}).col;l=this.getModelPosition({col:l,row:i}).col;
if(g&&g.isSettingOn("strictlines")){k=Math.min(k,f);l=Math.min(l,f)}var h=0;for(var j=k;
j!=l;j+=m){if(j<f){if(n[j]!=" "){break}}h++}return h},getNextTablevelLeft:function(g){var f=this.editor.getTabSize();
g=g||this.position.col;g--;return Math.floor(g/f)*f},getNextTablevelRight:function(g){var f=this.editor.getTabSize();
g=g||this.position.col;g++;return Math.ceil(g/f)*f},moveToLineStart:function(){var g=a.copyPos(this.position);
var f=this.getLeadingWhitespace(g.row);if(this.position.col==0){this.moveCursor({col:f})
}else{if(this.position.col==f){this.moveCursor({col:0})}else{if(f!=this.editor.editorView.getRowScreenLength(this.editor.cursorManager.getCursorPosition().row)){this.moveCursor({col:f})
}else{this.moveCursor({col:0})}}}return{oldPos:g,newPos:a.copyPos(this.position)}
},moveToLineEnd:function(){var f=a.copyPos(this.position);this.moveCursor({col:this.editor.editorView.getRowScreenLength(f.row)});
return{oldPos:f,newPos:a.copyPos(this.position)}},moveToTop:function(){var f=a.copyPos(this.position);
this.editor.cursorManager.moveCursor({row:0,col:0});return{oldPos:f,newPos:a.copyPos(this.position)}
},moveToBottom:function(){var f=a.copyPos(this.position);var g=this.editor.model.getRowCount()-1;
this.editor.cursorManager.moveCursor({row:g,col:this.editor.editorView.getRowScreenLength(g)});
return{oldPos:f,newPos:a.copyPos(this.position)}},moveUp:function(){var f=a.copyPos(this.position);
this.moveCursor({row:f.row-1,col:Math.max(f.col,this.virtualCol)});this.checkPastEndOfLine(f);
return{oldPos:f,newPos:a.copyPos(this.position)}},moveDown:function(){var f=a.copyPos(this.position);
this.moveCursor({row:Math.max(0,f.row+1),col:Math.max(f.col,this.virtualCol)});this.checkPastEndOfLine(f);
return{oldPos:f,newPos:a.copyPos(this.position)}},moveLeft:function(h){var j=b.get("settings");
var g=a.copyPos(this.position);var i=(h.event?h.event.shiftKey:false);if(!this.editor.getSelection()||i){if(j&&j.isSettingOn("smartmove")){var f=this.getContinuousSpaceCount(g.col,this.getNextTablevelLeft());
if(f==this.editor.getTabSize()){this.moveCursor({col:g.col-f});return{oldPos:g,newPos:a.copyPos(this.position)}
}}if((j&&j.isSettingOn("strictlines"))&&(this.position.col==0)){this.moveUp();if(g.row>0){this.moveToLineEnd()
}}else{this.moveCursor({row:g.row,col:Math.max(0,g.col-1)})}}else{this.moveCursor(this.editor.getSelection().startPos)
}return{oldPos:g,newPos:a.copyPos(this.position)}},moveRight:function(h){var j=b.get("settings");
var g=a.copyPos(this.position);var i=(h.event?h.event.shiftKey:false);if(!this.editor.getSelection()||i){if((j&&j.isSettingOn("smartmove"))&&h!=true){var f=this.getContinuousSpaceCount(g.col,this.getNextTablevelRight());
if(f==this.editor.getTabSize()){this.moveCursor({col:g.col+f});return{oldPos:g,newPos:a.copyPos(this.position)}
}}if((j&&j.isSettingOn("strictlines"))&&(this.position.col>=this.editor.editorView.getRowScreenLength(this.position.row))){this.moveDown();
if(g.row<this.editor.model.getRowCount()-1){this.moveCursor({col:0})}}else{this.moveCursor({col:this.position.col+1})
}}else{this.moveCursor(this.editor.getSelection().endPos)}return{oldPos:g,newPos:a.copyPos(this.position)}
},movePageUp:function(){var f=a.copyPos(this.position);this.moveCursor({row:Math.max(this.editor.editorView.firstVisibleRow-this.editor.editorView.visibleRows,0)});
this.checkPastEndOfLine(f);return{oldPos:f,newPos:a.copyPos(this.position)}},movePageDown:function(){var f=a.copyPos(this.position);
this.moveCursor({row:Math.min(this.position.row+this.editor.editorView.visibleRows,this.editor.model.getRowCount()-1)});
this.checkPastEndOfLine(f);return{oldPos:f,newPos:a.copyPos(this.position)}},checkPastEndOfLine:function(g){var i=b.get("settings");
var f=i?i.isSettingOn("strictlines"):false;var h=this.editor.editorView.getRowScreenLength(this.position.row);
if(f&&this.position.col>h){this.moveToLineEnd();this.virtualCol=Math.max(g.col,this.virtualCol)
}},smartMoveLeft:function(){var h=a.copyPos(this.position);var i=this.editor.editorView.getRowString(h.row);
var k,g;if(this.position.col==0){this.moveUp();this.moveToLineEnd()}else{if(i.length<this.position.col){this.moveToLineEnd()
}var f=this.position.col;var j=false;while(f>0){f--;k=i.charAt(f);g=k.charCodeAt(0);
if(g==32){j=true}else{f++;break}}if(!j){while(f>0){f--;k=i.charAt(f);g=k.charCodeAt(0);
if((g<65)||(g>122)){if(f!=this.position.col-1){f++}break}}}this.moveCursor({col:f})
}return{oldPos:h,newPos:a.copyPos(this.position)}},smartMoveRight:function(){var h=a.copyPos(this.position);
var i=this.editor.editorView.getRowString(h.row);if(i.length<=this.position.col){this.moveDown();
this.moveToLineStart()}else{var k,g;var f=this.position.col;var j=false;while(f<i.length){k=i[f];
g=k.charCodeAt(0);if(g==32){j=true;f++}else{break}}if(!j){while(f<i.length){f++;if(i.length==f){this.moveToLineEnd();
f=-1;break}k=i[f];g=k.charCodeAt(0);if((g<65)||(g>122)){break}}}if(f!=-1){this.moveCursor({col:f})
}}return{oldPos:h,newPos:a.copyPos(this.position)}},moveCursor:function(i){if(!i){return
}if(i.col===undefined){i.col=this.position.col}if(i.row===undefined){i.row=this.position.row
}this.virtualCol=0;var h=this.position;var j=Math.min(i.row,this.editor.model.getRowCount()-1);
if(j<0){j=0}var g=this.isInvalidCursorPosition(j,i.col);if(g){if(h.row!=i.row){i.col=g.right
}else{if(h.col<i.col){i.col=g.right}else{if(h.col>i.col){i.col=g.left}else{i.col=g.right
}}}}this.position={row:j,col:i.col};var f=b.get("editor").editorView;f.showCursor=true;
f.toggleCursorAllowed=false;f.cursorDidMove(this,this.position)},isInvalidCursorPosition:function(l,g){var j=this.editor.model.getRowArray(l);
var k=0;for(var h=0;h<j.length;h++){if(j[h].charCodeAt(0)==9){var f=this.editor.getTabSize()-(k%this.editor.getTabSize());
if((g>k)&&(g<(k+f))){return{left:k,right:k+f,half:f/2}}k+=f-1}k++}return undefined
}});a.buildArgs=function(f){return{pos:a.copyPos(f||b.get("editor").getCursorPos())}
};a.changePos=function(f,g){return{pos:a.copyPos(g||b.get("editor").getCursorPos())}
};a.copyPos=function(f){return{row:f.row,col:f.col}};a.posEquals=function(g,f){if(g==f){return true
}if(!g||!f){return false}return(g.col==f.col)&&(g.row==f.row)}});tiki.module("bespin:editor",function(g,r,b){var o=g("sproutcore/runtime:package").SC;
var m=g("bespin:package");var a=g("util/util");var k=g("util/keys");var c=g("util/canvas");
var q=g("util/cookie");var l=g("util/mousewheelevent");var f=g("util/clipboard");
var p=g("settings");var i=g("events");var n=g("syntax");var e=g("cursor");var h=g("actions");
var d=g("model");var j=g("history")});tiki.module("bespin:editor/controller",function(h,s,c){var o=h("sproutcore/runtime:package").SC;
var n=h("package");var a=h("util/util");var d=h("util/canvas");var q=h("util/cookie");
var m=h("util/keys");var p=h("settings");var i=h("events");var f=h("cursor");var e=h("model");
var l=h("history");var k=h("editor/views/editor");var b=h("editor/views/scroll");
s.EditorController=o.Object.extend({containerBinding:".editorView.layer",requires:{settings:"settings",commandLine:"commandLine",session:"session",file:"file"},init:function(){this.debugMode=false;
this.model=e.DocumentModel.create({editor:this});this.cursorManager=f.CursorManager.create({editor:this});
this.ui=b.BespinScrollView.create({contentView:k.EditorView.extend({editor:this,content:this.model})});
this.editorView=this.ui.contentView;console.log(this.ui);this.theme=h("theme")["default"];
this.editorKeyListener=s.DefaultEditorKeyListener.create({editor:this});this.historyManager=l.HistoryManager.create({editor:this});
i.subscribe();this.editorView.installKeyListener(this.editorKeyListener);var u={value:1};
console.log(u.value==1);u.value=2;console.log(u.value==2);u.value++;console.log(u.value==3);
var t={_value:1};t.__defineGetter__("value",function(){return this._value});t.__defineSetter__("value",function(v){this._value=v
});console.log(t.value==1);t.value=2;console.log(t.value==2);t.value++;console.log(t.value==3);
arguments.callee.base.apply(this,arguments)},getContent:function(){return this.model.getDocument()
},setContent:function(t){return this.model.insertDocument(t)},setLineNumber:function(t){this.moveAndCenter(t)
},setSetting:function(t,u){this.settings.setValue(t,u)},onchange:function(t){n.subscribe("editor:document:changed",t)
},executeCommand:function(u){try{this.commandLine.executeCommand(u)}catch(t){}},getSelection:function(v){v=(v!=undefined)?v:this.selection;
if(!v){return undefined}var u=v.startPos;var t=v.endPos;if((t.row<u.row)||((t.row==u.row)&&(t.col<u.col))){var w=u;
u=t;t=w}return{startPos:f.copyPos(u),endPos:f.copyPos(t),startModelPos:this.getModelPos(u),endModelPos:this.getModelPos(t)}
},getCursorPos:function(t){return this.cursorManager.getCursorPosition(t)},getModelPos:function(t){return this.cursorManager.getModelPosition(t)
},computeLayout:function(){var u={left:0,top:0,width:this.container.clientWidth,height:this.container.clientHeight};
var t=this.container;while(t!==null){if(!isNaN(t.offsetLeft)){u.left+=t.offsetLeft
}if(!isNaN(t.offsetTop)){u.top+=t.offsetTop}t=t.parentNode}return u},moveCursor:function(t){this.cursorManager.moveCursor(t)
},resetView:function(t){this.cursorManager.moveCursor(t.cursor);this.setSelection(t.selection);
this.ui.horizontalScrollOffset=0;this.ui.verticalScrollOffset=0},basicView:function(){this.cursorManager.moveCursor({row:0,col:0});
this.setSelection(undefined);this.ui.horizontalScrollOffset=0;this.ui.verticalScrollOffset=0
},getCurrentView:function(){return{cursor:this.getCursorPos(),offset:{x:this.horizontalScrollOffset,y:this.verticalScrollOffset},selection:this.selection}
},getState:function(){return{cursor:this.getCursorPos(),selection:this.getSelection()}
},setState:function(t){this.cursorManager.moveCursor(t.cursor);this.setSelection(t.selection);
this.editorView.ensureCursorVisible();this.paint(false)},defaultTabSize:4,getTabSize:function(){var u=this.defaultTabSize;
var t=parseInt(this.settings.getValue("tabsize"),10);if(t>0){u=t}return u},getSelectionAsText:function(){var u="";
var t=this.getSelection();if(t){u=this.model.getChunk(t)}return u},setSelection:function(t){this.selection=t
},paint:function(v){var u=this.editorView.get("canvas");if(!u){return}var t=d.fix(u.getContext("2d"));
this.editorView.paint(t,v)},changeKeyListener:function(t){this.editorView.installKeyListener(t);
this.editorKeyListener=t},setFocus:function(t){this.editorView.setFocus(t)},setReadOnly:function(t){this.readonly=t
},dispose:function(){this.ui.dispose()},bindKey:function(x,w,u){console.warn("Use of editor.bindKey(",x,w,u,") seems doomed to fail");
var A=m.fillArguments(w);var v=A.key;var t=A.modifiers;if(!v){return}var y=m.toKeyCode(v);
var z="Execute command: '"+x+"'";x=this.editorView.actions[x]||function(){n.commandLine.executeCommand(command,true)
};if(y&&x){if(u){this.editorKeyListener.bindKeyStringSelectable(t,y,x,z)}else{this.editorKeyListener.bindKeyString(t,y,x,z)
}}},bindCommand:function(x,t){var y=m.fillArguments(t);var v=m.toKeyCode(y.key);var u=function(){this.commandLine.executeCommand(x,true)
};var w="Execute command: '"+x+"'";this.editorKeyListener.bindKeyString(y.modifiers,v,u,w)
},moveAndCenter:function(u){if(!u){return}var t=u-1;this.cursorManager.moveCursor({row:t,col:0});
if((t<this.editorView.firstVisibleRow)||(t>=this.editorView.firstVisibleRow+this.editorView.visibleRows)){this.editorView.actions.moveCursorRowToCenter()
}},newFile:function(x,v,u){x=x||this.session.project;v=v||"new.txt";var t=this;var w=function(){if(this.settings.isSettingOff("collaborate")){t.model.insertDocument(u||"");
t.cursorManager.moveCursor({row:0,col:0});t.setFocus(true)}n.publish("editor:openfile:opensuccess",{project:x,file:{name:v,content:u||"",timestamp:new Date().getTime()}});
n.publish("editor:dirty")};this.file.newFile(x,v,w)},saveFile:function(A,t,z,w){A=A||this.session.project;
t=t||this.session.path;var u="viewData_"+A+"_"+t.split("/").join("_");var B=JSON.stringify(this.getCurrentView());
q.set(u,B,{expires:7});var x={name:t,content:this.model.getDocument(),timestamp:new Date().getTime()};
var y=function(){document.title=t+" - editing with Bespin";this.commandLine.showHint("Saved file: "+x.name);
n.publish("editor:clean");if(a.isFunction(z)){z()}};var v=function(C){this.commandLine.showHint("Save failed: "+C.responseText);
if(a.isFunction(w)){w()}};n.publish("editor:savefile:before",{filename:t});this.file.saveFile(A,x,y,v)
},openFile:function(z,u,v){var w,y;var t=this;z=z||this.session.project;u=u||this.session.path;
v=v||{};var x=v.fromFileHistory||false;if(this.session.checkSameFile(z,u)&&!v.reload){if(v.line){this.commandLine.executeCommand("goto "+v.line,true)
}return}if(this.dirty&&!this.session.shouldCollaborate()){w=function(A){this.commandLine.showHint("Trying to save current file. Failed: "+A.responseText)
};y=function(){t.openFile(z,u,v)};this.saveFile(null,null,y,w);return}if(v.force){this.file.whenFileDoesNotExist(z,u,{execute:function(){t.newFile(z,u,v.content||"")
},elseFailed:function(){v.force=false;t.openFile(z,u,v)}});return}w=function(){n.publish("editor:openfile:openfail",{project:z,filename:u})
};y=function(A){if(!A){w();return}if(A.content!==undefined){t.model.insertDocument(A.content);
t.cursorManager.moveCursor({row:0,col:0});t.setFocus(true)}this.session.setProjectPath(z,u);
if(v.line){this.commandLine.executeCommand("goto "+v.line,true)}t._addHistoryItem(z,u,x);
n.publish("editor:openfile:opensuccess",{project:z,file:A})};n.publish("editor:openfile:openbefore",{project:z,filename:u});
this.file.editFile(z,u,y,w)},_addHistoryItem:function(y,t,x){var w=this.settings.getObject("_lastused");
if(!w){w=[]}var u={project:y,filename:t};if(!x){this.session.addFileToHistory(u)}var v=[];
w.forEach(function(z){if(z.project!=u.project||z.filename!=u.filename){v.unshift(z)
}});v.unshift(u);w=v;if(w.length>10){w=w.slice(0,10)}this.settings.setObject("_lastused",w)
}});s.DefaultEditorKeyListener=o.Object.extend({editor:null,skipKeypress:false,defaultKeyMap:{},keyMapDescriptions:{},init:function(){this.keyMap=this.defaultKeyMap
},bindKey:function(x,z,y,w,u,v,t){this.defaultKeyMap[[x,z,y,w,u]]=(typeof v=="string")?function(){var A=A(v);
n.publish(A.name,A.args)}:v.bind(this.editor.editorView.actions);if(t){this.keyMapDescriptions[[x,z,y,w,u]]=t
}},bindKeyForPlatform:function(v,A,y,u){var t=a.getOS();var x=v[t]||v.WINDOWS;if(!x){return
}var w=m.fillArguments(x);var z=(u)?"bindKeyStringSelectable":"bindKeyString";this[z](w.modifiers,m.toKeyCode(w.key),A,y)
},bindKeyString:function(u,y,x,t){var A=(u.toUpperCase().indexOf("CTRL")!=-1);var w=(u.toUpperCase().indexOf("ALT")!=-1);
var z=(u.toUpperCase().indexOf("META")!=-1)||(u.toUpperCase().indexOf("APPLE")!=-1);
var v=(u.toUpperCase().indexOf("SHIFT")!=-1);if(u.toUpperCase().indexOf("CMD")!=-1){if(a.isMac){z=true
}else{A=true}}return this.bindKey(y,z,A,w,v,x,t)},bindKeyStringSelectable:function(u,w,v,t){this.bindKeyString(u,w,v,t);
this.bindKeyString("SHIFT "+u,w,v)},getPrintableChar:function(t){if(t.charCode>255){return false
}if(t.charCode<32){return false}if((t.altKey||t.metaKey||t.ctrlKey)&&(t.charCode>65&&t.charCode<123)){return false
}return String.fromCharCode(t.charCode)},onkeydown:function(x){if(!this.editor.editorView.hasFocus()){console.log("ignoring keyboard event, we don't have focus",x);
return}var u={event:x,pos:f.copyPos(this.editor.cursorManager.getCursorPosition())};
this.skipKeypress=false;this.returnValue=false;var w=this.keyMap[[x.keyCode,x.metaKey,x.ctrlKey,x.altKey,x.shiftKey]];
var t=false;if(a.isFunction(w)){t=true;try{w(u)}catch(v){console.log("Action caused an error! ",v)
}this.lastAction=w}if(x.metaKey||x.ctrlKey||x.altKey){this.skipKeypress=true;this.returnValue=true
}if(t||!m.passThroughToBrowser(x)){a.stopEvent(x)}},onkeypress:function(w){if(!this.editor.editorView.hasFocus()){console.log("ignoring keyboard event, we don't have focus",w);
return}if((w.metaKey||w.ctrlKey)&&w.charCode>=48&&w.charCode<=57){return}var t=this.getPrintableChar(w);
if(t){this.skipKeypress=false}else{if(this.skipKeypress){if(!m.passThroughToBrowser(w)){a.stopEvent(w)
}return this.returnValue}}var u={event:w,pos:f.copyPos(this.editor.cursorManager.getCursorPosition())};
var x=this.editor.editorView.actions;if(t){u.newchar=String.fromCharCode(w.charCode);
x.insertCharacter(u)}else{var v=this.keyMap[[w.keyCode,w.metaKey,w.ctrlKey,w.altKey,w.shiftKey]];
if(this.lastAction==v){delete this.lastAction}else{if(typeof v=="function"){v(u)}}}a.stopEvent(w)
}});var r=function(t){var v={};if(t.indexOf(";")<0){v.name=t}else{var u=t.split(";");
v.name=u[0];v.args=a.queryToObject(u[1],",")}return v};n.subscribe("settings:set:trimonsave",function(u){var t=n.get("settings");
if(t.isValueOn(u.value)){j=n.subscribe("editor:savefile:before",function(v){n.get("commandLine").executeCommand("trim",true)
})}else{n.unsubscribe(j)}});var j;n.subscribe("editor:openfile:opensuccess",function(u){var z=n.get("editSession");
var A=u.project||z.project;var t=u.file.name;try{var v="viewData_"+A+"_"+t.split("/").join("_");
var w=q.get(v);if(w){n.get("editor").resetView(JSON.parse(w))}else{n.get("editor").basicView()
}}catch(y){console.log("Error setting in the view: ",y)}document.title=t+" - editing with Bespin";
n.publish("url:change",{project:A,path:t});if(u.file.name==null){console.error("event.file.name falsy")
}if(u.project){z.project=u.project}z.path=u.file.name;var B=a.path.fileType(u.file.name);
if(B){n.publish("settings:language",{language:B})}var x=A+"/"+t;if(g[x]){n.publish("settings:language",{language:g[x]})
}});var g={"BespinSettings/config":"js"};n.subscribe("settings:set:keybindings",function(u){var t=n.get("editor");
if(u.value=="emacs"){t.bindKey("moveCursorLeft","ctrl b");t.bindKey("moveCursorRight","ctrl f");
t.bindKey("moveCursorUp","ctrl p");t.bindKey("moveCursorDown","ctrl n");t.bindKey("moveToLineStart","ctrl a");
t.bindKey("moveToLineEnd","ctrl e")}})});tiki.module("bespin:editor/views/editor",function(require,exports,module){var SC=require("sproutcore/runtime:package").SC;
var bespin=require("package");var syntax=require("syntax");var actions=require("actions");
var keys=require("util/keys");var clipboard=require("util/clipboard");var cursor=require("cursor");
var scroller=require("editor/views/scroller");var SelectionHelper=SC.Object.extend({editor:null,getRowSelectionPositions:function(rowIndex){var startCol;
var endCol;var selection=this.editor.getSelection();if(!selection){return undefined
}if((selection.endPos.row<rowIndex)||(selection.startPos.row>rowIndex)){return undefined
}startCol=(selection.startPos.row<rowIndex)?0:selection.startPos.col;endCol=(selection.endPos.row>rowIndex)?-1:selection.endPos.col;
return{startCol:startCol,endCol:endCol}}});exports.EditorView=SC.View.extend({classNames:"sc-canvas-view",displayProperties:["value","shouldAutoResize"],tagName:"canvas",rowLengthCache:[],searchString:null,toggleCursorFullRepaintCounter:0,toggleCursorFrequency:250,toggleCursorAllowed:true,horizontalScrollCanvas:null,verticalScrollCanvas:null,LINE_HEIGHT:23,BOTTOM_SCROLL_AFFORDANCE:30,GUTTER_INSETS:{top:0,left:6,right:10,bottom:6},LINE_INSETS:{top:0,left:5,right:0,bottom:6},FALLBACK_CHARACTER_WIDTH:10,DEBUG_GUTTER_WIDTH:18,DEBUG_GUTTER_INSETS:{top:2,left:2,right:2,bottom:2},showCursor:true,hasFocus:false,onInitActions:[],inited:false,lastLineCount:0,lastCursorPos:null,padding:{bottom:0,right:0},hasPadding:true,init:function(){var settings=bespin.get("settings");
var pluginCatalog=bespin.get("plugins");var ep=pluginCatalog.getExtensionPoint("syntax.engine");
this.syntaxModel=syntax.Model.create();if(ep.extensions.length>0){ep.extensions[0].load(function(model){this.syntaxModel=model.create()
}.bind(this))}this.selectionHelper=SelectionHelper.create({editor:this.editor});this.actions=actions.Actions.create({editor:this.editor});
var wheelEventName=(window.onmousewheel?"onmousewheel":"DOMMouseScroll");setTimeout(function(){this.toggleCursor()
}.bind(this),this.toggleCursorFrequency);arguments.callee.base.apply(this,arguments)
},render:function(context,firstTime){context.attr("moz-opaque","true");context.attr("tabindex","1");
context.push("canvas tag not supported by your browser")},didCreateLayer:function(){var canvas=this.$()[0];
this.set("canvas",canvas);SC.Event.add(canvas,"blur",this,function(ev){this.focus=true;
return true});SC.Event.add(canvas,"focus",this,function(ev){this.focus=true;return true
});var editorWrapper=EditorWrapper.create({editor:this.editor,ui:this});clipboard.setup(editorWrapper);
this.onInitActions.forEach(function(action){action()});this.inited=true},onInit:function(action){if(this.inited){action();
return}this.onInitActions.push(action)},convertClientPointToCursorPoint:function(pos){var settings=bespin.get("settings");
var x,y;var content=this.get("content");var charWidth=this.get("charWidth");var lineHeight=this.get("lineHeight");
if(pos.y<0){y=0}else{if(pos.y>=(lineHeight*content.getRowCount())){y=content.getRowCount()-1
}else{var ty=pos.y;y=Math.floor(ty/lineHeight)}}if(pos.x<=(this.get("gutterWidth")+this.LINE_INSETS.left)){x=-1
}else{var tx=pos.x-this.get("gutterWidth")-this.LINE_INSETS.left;x=Math.round(tx/charWidth);
if((settings&&settings.isSettingOn("strictlines"))){var maxcol=this.getRowScreenLength(y);
if(x>=maxcol){x=this.getRowScreenLength(y)}}}return{row:y,col:x}},absoluteCoordinatesForEvent:function(ev){return this.convertFrameFromView({x:ev.clientX,y:ev.clientY})
},setSelection:function(e){var content=this.get("content");var absolutePoint=this.absoluteCoordinatesForEvent(e);
var clientY=absolutePoint.y,clientX=absolutePoint.x;if(!this.selectMouseDownPos){return
}var down=cursor.copyPos(this.selectMouseDownPos);var point={x:clientX,y:clientY};
var up=this.convertClientPointToCursorPoint(point);if(down.col==-1){down.col=0;var lineMarker=bespin.get("parser").getLineMarkers()[down.row+1];
if(lineMarker){bespin.get("commandLine").showHint(lineMarker.msg)}}if(up.col==-1){up.col=0
}var modelstart=this.editor.getModelPos(down);var modelend=this.editor.getModelPos(up);
var backwards=false;if(modelend.row<modelstart.row||(modelend.row==modelstart.row&&modelend.col<modelstart.col)){backwards=true;
var temp=modelstart;modelstart=modelend;modelend=temp}if(!content.hasRow(modelstart.row)){modelstart.row=content.getRowCount()-1
}if(!content.hasRow(modelend.row)){modelend.row=content.getRowCount()-1}var detail=this.selectMouseDetail;
var startPos,endPos;if(detail==1){if(cursor.posEquals(modelstart,modelend)){this.editor.setSelection(undefined)
}else{this.editor.setSelection({startPos:this.editor.getCursorPos(backwards?modelend:modelstart),endPos:this.editor.getCursorPos(backwards?modelstart:modelend)})
}this.editor.moveCursor(this.editor.getCursorPos(backwards?modelstart:modelend))}else{if(detail==2){var row=content.rows[modelstart.row];
var cursorAt=row[modelstart.col];var isDelimiter=function(item){var delimiters=["="," ","\t",">","<",".","(",")","{","}",":",'"',"'",";"];
if(delimiters.indexOf(item)>-1){return true}return false};var comparator;if(!cursorAt){this.editor.setSelection({startPos:this.editor.getCursorPos({row:modelstart.row,col:0}),endPos:this.editor.getCursorPos({row:modelstart.row,col:row.length})})
}else{if(isDelimiter(cursorAt.charAt(0))){comparator=function(letter){if(isDelimiter(letter)){return false
}return true};startPos=content.findBefore(modelstart.row,modelstart.col,comparator);
endPos=content.findAfter(modelend.row,modelend.col,comparator);this.editor.setSelection({startPos:this.editor.getCursorPos(backwards?endPos:startPos),endPos:this.editor.getCursorPos(backwards?startPos:endPos)});
this.editor.moveCursor(this.editor.getCursorPos(backwards?startPos:endPos))}else{comparator=function(letter){if(isDelimiter(letter)){return true
}return false};startPos=content.findBefore(modelstart.row,modelstart.col,comparator);
endPos=content.findAfter(modelend.row,modelend.col,comparator);this.editor.setSelection({startPos:this.editor.getCursorPos(backwards?endPos:startPos),endPos:this.editor.getCursorPos(backwards?startPos:endPos)});
this.editor.moveCursor(this.editor.getCursorPos(backwards?startPos:endPos))}}}else{if(detail>2){startPos={row:modelstart.row,col:0};
endPos={row:modelend.row,col:0};if(this.editor.model.hasRow(endPos.row+1)){endPos.row=endPos.row+1
}else{endPos.col=this.editor.model.getRowArray(endPos.row).length}startPos=this.editor.getCursorPos(startPos);
endPos=this.editor.getCursorPos(endPos);this.editor.setSelection({startPos:backwards?endPos:startPos,endPos:backwards?startPos:endPos});
this.editor.moveCursor(backwards?startPos:endPos)}}}if(clientY<0){}else{if(clientY>=this.getHeight()){}}this.editor.paint()
},toggleCursor:function(){if(this.toggleCursorAllowed){this.showCursor=!this.showCursor
}else{this.toggleCursorAllowed=true}if(++this.toggleCursorFullRepaintCounter>0){this.toggleCursorFullRepaintCounter=0;
this.editor.paint(true)}else{this.editor.paint()}setTimeout(function(){this.toggleCursor()
}.bind(this),this.toggleCursorFrequency)},ensureCursorVisible:function(softEnsure){},handleFocus:function(e){var content=this.get("content");
content.clear();content.insertCharacters({row:0,col:0},e.type);return true},mouseDragged:function(e){if(this.selectMouseDownPos){this.setSelection(e)
}return true},mouseDown:function(e){var absolutePoint=this.absoluteCoordinatesForEvent(e);
var clientY=absolutePoint.y,clientX=absolutePoint.x;var point;if(this.editor.debugMode){if(clientX<this.DEBUG_GUTTER_WIDTH){console.log("Clicked in debug gutter");
point={x:clientX,y:clientY};var p=this.convertClientPointToCursorPoint(point);var editSession=bespin.get("editSession");
if(p&&editSession){bespin.getComponent("breakpoints",function(breakpoints){breakpoints.toggleBreakpoint({project:editSession.project,path:editSession.path,lineNumber:p.row});
this.editor.paint(true)},this)}return true}}this.selectMouseDetail=e.detail;if(e.shiftKey){this.selectMouseDownPos=(this.editor.selection)?this.editor.selection.startPos:this.editor.getCursorPos();
this.setSelection(e)}else{point={x:clientX,y:clientY};this.selectMouseDownPos=this.convertClientPointToCursorPoint(point)
}this.get("canvas").focus();return this.handleMouse(e)},mouseUp:function(e){if(this.selectMouseDownPos){this.setSelection(e);
this.selectMouseDownPos=undefined;this.selectMouseDetail=undefined;return false}return true
},click:function(e){e.type="click";return this.handleMouse(e)},handleMouse:function(e){var absolutePoint=this.absoluteCoordinatesForEvent(e);
var clientY=absolutePoint.y,clientX=absolutePoint.x;var scrolled=false;var w=this.editor.container.clientWidth;
var h=this.editor.container.clientHeight;var p={x:clientX,y:clientY};return true},setFocus:function(focus){this.onInit(function(){if(this.focus!=focus){var canvas=this.get("canvas");
if(focus){canvas.focus()}else{canvas.blur()}this.focus=focus}}.bind(this))},hasFocus:function(focus){return this.focus
},_getFocusElement:function(){return this.get("canvas")},installKeyListener:function(listener){this.onInit(function(){this.realInstallKeyListener(listener)
}.bind(this))},realInstallKeyListener:function(listener){var scope=this.get("canvas");
if(this.oldkeydown){SC.Event.remove(scope,"keydown",this,this.oldkeydown)}if(this.oldkeypress){SC.Event.remove(scope,"keypress",this,this.oldkeypress)
}this.oldkeydown=function(ev){listener.onkeydown(ev);return true};this.oldkeypress=function(ev){listener.onkeypress(ev);
return true};SC.Event.add(scope,"keydown",this,this.oldkeydown);SC.Event.add(scope,"keypress",this,this.oldkeypress);
var Key=keys.Key;listener.bindKeyStringSelectable("",keys.Key.LEFT_ARROW,this.actions.moveCursorLeft,"Move Cursor Left");
listener.bindKeyStringSelectable("",keys.Key.RIGHT_ARROW,this.actions.moveCursorRight,"Move Cursor Right");
listener.bindKeyStringSelectable("",keys.Key.UP_ARROW,this.actions.moveCursorUp,"Move Cursor Up");
listener.bindKeyStringSelectable("",keys.Key.DOWN_ARROW,this.actions.moveCursorDown,"Move Cursor Down");
listener.bindKeyForPlatform({MAC:"ALT LEFT_ARROW",WINDOWS:"CTRL LEFT_ARROW"},this.actions.moveWordLeft,"Move Word Left",true);
listener.bindKeyForPlatform({MAC:"ALT RIGHT_ARROW",WINDOWS:"CTRL RIGHT_ARROW"},this.actions.moveWordRight,"Move Word Right",true);
listener.bindKeyStringSelectable("",keys.Key.HOME,this.actions.moveToLineStart,"Move to start of line");
listener.bindKeyForPlatform({MAC:"APPLE LEFT_ARROW",WINDOWS:"ALT LEFT_ARROW"},this.actions.moveToLineStart,"Move to start of line",true);
listener.bindKeyStringSelectable("",keys.Key.END,this.actions.moveToLineEnd,"Move to end of line");
listener.bindKeyForPlatform({MAC:"APPLE RIGHT_ARROW",WINDOWS:"ALT RIGHT_ARROW"},this.actions.moveToLineEnd,"Move to end of line",true);
listener.bindKeyString("CTRL",keys.Key.K,this.actions.killLine,"Kill entire line");
listener.bindKeyString("CMD",keys.Key.L,this.actions.gotoLine,"Goto Line");listener.bindKeyString("CTRL",keys.Key.L,this.actions.moveCursorRowToCenter,"Move cursor to center of page");
listener.bindKeyStringSelectable("",keys.Key.BACKSPACE,this.actions.backspace,"Backspace");
listener.bindKeyStringSelectable("CTRL",keys.Key.BACKSPACE,this.actions.deleteWordLeft,"Delete a word to the left");
listener.bindKeyString("",keys.Key.DELETE,this.actions.deleteKey,"Delete");listener.bindKeyString("CTRL",keys.Key.DELETE,this.actions.deleteWordRight,"Delete a word to the right");
listener.bindKeyString("",keys.Key.ENTER,this.actions.newline,"Insert newline");listener.bindKeyString("CMD",keys.Key.ENTER,this.actions.newlineBelow,"Insert newline at end of current line");
listener.bindKeyString("",keys.Key.TAB,this.actions.insertTab,"Indent / insert tab");
listener.bindKeyString("SHIFT",keys.Key.TAB,this.actions.unindent,"Unindent");listener.bindKeyString("CMD",keys.Key.SQUARE_BRACKET_CLOSE,this.actions.indent,"Indent");
listener.bindKeyString("CMD",keys.Key.SQUARE_BRACKET_OPEN,this.actions.unindent,"Unindent");
listener.bindKeyString("",keys.Key.ESCAPE,this.actions.escape,"Clear fields and dialogs");
listener.bindKeyString("CMD",keys.Key.A,this.actions.selectAll,"Select All");listener.bindKeyString("CMD",keys.Key.I,this.actions.toggleQuickopen,"Toggle Quickopen");
listener.bindKeyString("CMD",keys.Key.J,this.actions.focusCommandline,"Open Command line");
listener.bindKeyString("CMD",keys.Key.O,this.actions.focusFileBrowser,"Open File Browser");
listener.bindKeyString("CMD",keys.Key.F,this.actions.cmdFilesearch,"Search in this file");
listener.bindKeyString("CMD",keys.Key.G,this.actions.findNext,"Find Next");listener.bindKeyString("SHIFT CMD",keys.Key.G,this.actions.findPrev,"Find Previous");
listener.bindKeyString("CTRL",keys.Key.M,this.actions.togglePieMenu,"Open Pie Menu");
listener.bindKeyString("CMD",keys.Key.Z,this.actions.undo,"Undo");listener.bindKeyString("SHIFT CMD",keys.Key.Z,this.actions.redo,"Redo");
listener.bindKeyString("CMD",keys.Key.Y,this.actions.redo,"Redo");listener.bindKeyStringSelectable("CMD",keys.Key.UP_ARROW,this.actions.moveToFileTop,"Move to top of file");
listener.bindKeyStringSelectable("CMD",keys.Key.DOWN_ARROW,this.actions.moveToFileBottom,"Move to bottom of file");
listener.bindKeyStringSelectable("CMD",keys.Key.HOME,this.actions.moveToFileTop,"Move to top of file");
listener.bindKeyStringSelectable("CMD",keys.Key.END,this.actions.moveToFileBottom,"Move to bottom of file");
listener.bindKeyStringSelectable("",keys.Key.PAGE_UP,this.actions.movePageUp,"Move a page up");
listener.bindKeyStringSelectable("",keys.Key.PAGE_DOWN,this.actions.movePageDown,"Move a page down");
listener.bindKeyStringSelectable("ALT",keys.Key.UP_ARROW,this.actions.movePageUp,"Move up a block");
listener.bindKeyStringSelectable("ALT",keys.Key.DOWN_ARROW,this.actions.movePageDown,"Move down a block");
listener.bindKeyString("CMD ALT",keys.Key.LEFT_ARROW,this.actions.previousFile);listener.bindKeyString("CMD ALT",keys.Key.RIGHT_ARROW,this.actions.nextFile)
},getWidth:function(){return this.get("gutterWidth")+this.get("textWidth")+this.get("padding").right
},getHeight:function(){return this.get("lineHeight")*this.get("content").getRowCount()+this.get("padding").bottom
},charWidth:function(key,value){var ctx=this.get("canvas").getContext("2d");if(ctx.measureText!==undefined){return ctx.measureText("M").width
}return this.FALLBACK_CHARACTER_WIDTH}.property().cacheable(),lineHeight:function(key,value){var ctx=this.get("canvas").getContext("2d");
if(ctx.measureText!==undefined){var t=ctx.measureText("M");if(!isNaN(t.ascent)){return Math.floor(t.ascent*2.8)
}}return this.LINE_HEIGHT}.property().cacheable(),gutterWidth:function(){var width=this.GUTTER_INSETS.left+this.GUTTER_INSETS.right+this.get("content").getRowCount().toString().length*this.get("charWidth");
if(this.editor.debugMode){width+=this.DEBUG_GUTTER_WIDTH}return width}.property("content","charWidth"),textWidth:function(key,value){return this.get("charWidth")*(this.getMaxCols(0,this.get("content").getRowCount()-1)+1)
}.property("content","charWidth"),computeLayout:function(minimumSize){var frame=this.get("frame");
return{left:frame.x,top:frame.y,width:minimumSize!=null?Math.max(this.getWidth(),minimumSize.width):this.getWidth(),height:minimumSize!=null?Math.max(this.getHeight(),minimumSize.height):this.getHeight()}
},layoutStyle:function(key,value){return{}}.property().cacheable(),resetCanvas:function(){},fillText:function(ctx,text,x,y){ctx.fillText(text,x,y)
},fillTextWithTransparency:function(ctx,text,x,y){ctx.globalAlpha=0.3;ctx.fillText(text,x,y);
ctx.globalAlpha=1},resizeCanvasIfNeeded:function(){var canvas=this.get("canvas");
var parentLayer=this.get("parentView").get("layer");if(parentLayer.clientWidth!==0&&parentLayer.clientHeight!==0){if(parentLayer.clientWidth!==canvas.width){canvas.width=parentLayer.clientWidth
}if(parentLayer.clientHeight!==canvas.height){canvas.height=parentLayer.clientHeight
}}},computeContainerSize:function(){var parentLayer=this.get("parentView").get("layer");
var size={width:parentLayer.clientWidth,height:parentLayer.clientHeight};return size.width==0&&size.height==0?null:size
},resizeCanvasToFit:function(size){var canvas=this.get("canvas");if(size.width!==canvas.width){canvas.width=size.width
}if(size.height!==canvas.height){canvas.height=size.height}},paint:function(ctx,fullRefresh){var content=this.get("content");
fullRefresh=true;var ed=this.editor;var c=this.get("canvas");var theme=ed.theme;var x,y;
var cy;var currentLine;var lastLineToRender;var Rect=scroller.Rect;this.resizeCanvasIfNeeded();
var refreshCanvas=fullRefresh;if(!refreshCanvas){refreshCanvas=(this.selectMouseDownPos)
}if(!refreshCanvas){refreshCanvas=(this.lastLineCount!=content.getRowCount())}this.lastLineCount=content.getRowCount();
var cwidth=this.getWidth();var cheight=this.getHeight();var lineHeight=this.get("lineHeight");
this.visibleRows=Math.ceil(cheight/lineHeight);this.firstVisibleRow=0;lastLineToRender=this.firstVisibleRow+this.visibleRows;
if(lastLineToRender>(content.getRowCount()-1)){lastLineToRender=content.getRowCount()-1
}var virtualheight=this.getHeight();var virtualwidth=this.get("textWidth");if(this.editor.debugMode&&bespin.get("editSession")){bespin.getComponent("breakpoints",function(bpmanager){var points=bpmanager.getBreakpoints(bespin.get("editSession").project,bespin.get("editSession").path);
points.forEach(function(point){breakpoints[point.lineNumber]=point})})}if(!refreshCanvas){var dirty=content.getDirtyRows();
if((this.lastCursorPos)&&(this.lastCursorPos.row!=ed.cursorManager.getCursorPosition().row)){dirty[this.lastCursorPos.row]=true
}dirty[ed.cursorManager.getCursorPosition().row]=true}this.lastCursorPos=cursor.copyPos(ed.cursorManager.getCursorPosition());
ctx.save();var layout=this.get("layout");ctx.translate(layout.left,layout.top);var clippingFrame=this.get("clippingFrame");
if(refreshCanvas){ctx.fillStyle=theme.backgroundStyle;ctx.fillRect(clippingFrame.x,clippingFrame.y,clippingFrame.width,clippingFrame.height);
ctx.fillStyle=theme.gutterStyle;ctx.fillRect(0,clippingFrame.y,this.get("gutterWidth"),clippingFrame.height)
}if(refreshCanvas){if(bespin.get("parser")){for(currentLine=this.firstVisibleRow;
currentLine<=lastLineToRender;currentLine++){if(lineMarkers[currentLine]){y=lineHeight*(currentLine-1);
cy=y+(lineHeight-this.LINE_INSETS.bottom);ctx.fillStyle=this.editor.theme["lineMarker"+lineMarkers[currentLine].type+"Color"];
ctx.fillRect(0,y,this.get("gutterWidth"),lineHeight)}}}y=(lineHeight*this.firstVisibleRow);
for(currentLine=this.firstVisibleRow;currentLine<=lastLineToRender;currentLine++){x=0;
if(this.editor.debugMode){if(breakpoints[currentLine]){var bpx=x+this.DEBUG_GUTTER_INSETS.left;
var bpy=y+this.DEBUG_GUTTER_INSETS.top;var bpw=this.DEBUG_GUTTER_WIDTH-this.DEBUG_GUTTER_INSETS.left-this.DEBUG_GUTTER_INSETS.right;
var bph=lineHeight-this.DEBUG_GUTTER_INSETS.top-this.DEBUG_GUTTER_INSETS.bottom;var bpmidpointx=bpx+parseInt(bpw/2,10);
var bpmidpointy=bpy+parseInt(bph/2,10);ctx.strokeStyle="rgb(128, 0, 0)";ctx.fillStyle="rgb(255, 102, 102)";
ctx.beginPath();ctx.arc(bpmidpointx,bpmidpointy,bpw/2,0,Math.PI*2,true);ctx.closePath();
ctx.fill();ctx.stroke()}x+=this.DEBUG_GUTTER_WIDTH}x+=this.GUTTER_INSETS.left;cy=y+(lineHeight-this.LINE_INSETS.bottom);
ctx.fillStyle=theme.lineNumberColor;ctx.font=this.editor.theme.lineNumberFont;ctx.fillText(currentLine+1,x,cy);
y+=lineHeight}}ctx.save();ctx.beginPath();ctx.rect(this.get("gutterWidth"),0,cwidth-this.get("gutterWidth"),cheight);
ctx.closePath();ctx.clip();var charWidth=this.get("charWidth");var firstColumn=0;
var lastColumn=firstColumn+(Math.ceil((cwidth-this.get("gutterWidth"))/charWidth));
y=(lineHeight*this.firstVisibleRow);var cc;var ce;var ri;var regionlen;var tx,tw,tsel;
var settings=bespin.get("settings");var searchStringLength=(this.searchString?this.searchString.length:-1);
for(currentLine=this.firstVisibleRow;currentLine<=lastLineToRender;currentLine++){x=this.get("gutterWidth");
if(!refreshCanvas){if(!dirty[currentLine]){y+=lineHeight;continue}ctx.save();ctx.beginPath();
ctx.rect(x,y,cwidth,lineHeight);ctx.closePath();ctx.clip();if((currentLine%2)==1){ctx.fillStyle=theme.backgroundStyle;
ctx.fillRect(x,y,cwidth,lineHeight)}}if((settings&&settings.isSettingOn("highlightline"))&&(currentLine==ed.cursorManager.getCursorPosition().row)){ctx.fillStyle=theme.highlightCurrentLineColor;
ctx.fillRect(x,y,cwidth,lineHeight)}else{if((currentLine%2)==0){ctx.fillStyle=theme.zebraStripeColor;
ctx.fillRect(x,y,cwidth,lineHeight)}}x+=this.LINE_INSETS.left;cy=y+(lineHeight-this.LINE_INSETS.bottom);
var selections=this.selectionHelper.getRowSelectionPositions(currentLine);if(selections){tx=x+(selections.startCol*charWidth);
tw=(selections.endCol==-1)?(lastColumn-firstColumn)*charWidth:(selections.endCol-selections.startCol)*charWidth;
ctx.fillStyle=theme.editorSelectedTextBackground;ctx.fillRect(tx,y,tw,lineHeight)
}var lineMetadata=content.getRowMetadata(currentLine);var lineText=lineMetadata.lineText;
var searchIndices=lineMetadata.searchIndices;var lineInfo=this.syntaxModel.getSyntaxStylesPerLine(lineText,currentLine,this.editor.language);
var readOnlyAwareFill=ed.readonly?this.fillTextWithTransparency:this.fillText;for(ri=0;
ri<lineInfo.regions.length;ri++){var styleInfo=lineInfo.regions[ri];for(var style in styleInfo){if(!styleInfo.hasOwnProperty(style)){continue
}var thisLine="";var styleArray=styleInfo[style];var currentColumn=0;for(var si=0;
si<styleArray.length;si++){var range=styleArray[si];for(;currentColumn<range.start;
currentColumn++){thisLine+=" "}thisLine+=lineInfo.text.substring(range.start,range.stop);
currentColumn=range.stop}ctx.fillStyle=this.editor.theme[style]||"white";ctx.font=this.editor.theme.editorTextFont;
readOnlyAwareFill(ctx,thisLine,x,cy)}}if(searchIndices){if(selections){tsel={startCol:0,endCol:lineText.length};
if(selections.startCol!=-1){tsel.startCol=selections.startCol}if(selections.endCol!=-1){tsel.endCol=selections.endCol
}}else{tsel=false}for(var i=0;i<searchIndices.length;i++){var index=ed.cursorManager.getCursorPosition({col:searchIndices[i],row:currentLine}).col;
tx=x+index*charWidth;ctx.fillStyle=this.editor.theme.searchHighlight;ctx.fillRect(tx,y,searchStringLength*charWidth,lineHeight);
if(tsel){var indexStart=index;var indexEnd=index+searchStringLength;if(tsel.startCol<indexEnd&&tsel.endCol>indexStart){indexStart=Math.max(indexStart,tsel.startCol);
indexEnd=Math.min(indexEnd,tsel.endCol);ctx.fillStyle=this.editor.theme.searchHighlightSelected;
ctx.fillRect(x+indexStart*charWidth,y,(indexEnd-indexStart)*charWidth,lineHeight)
}}ctx.fillStyle=this.editor.theme.editorTextColor||"white";ctx.fillText(lineText.substring(index,index+searchStringLength),tx,cy)
}}if(settings&&(settings.isSettingOn("tabarrow")||settings.isSettingOn("tabshowspace"))){if(lineMetadata.tabExpansions.length>0){for(i=0;
i<lineMetadata.tabExpansions.length;i++){var expansion=lineMetadata.tabExpansions[i];
var lx=x+(expansion.start*charWidth);var showTabSpace=settings&&settings.isSettingOn("tabshowspace");
if(showTabSpace){var sw=(expansion.end-expansion.start)*charWidth;ctx.fillStyle=this.editor.theme.tabSpace||"white";
ctx.fillRect(lx,y,sw,lineHeight)}var showTabNib=settings&&settings.isSettingOn("tabarrow");
if(showTabNib){cy=y+(lineHeight/2);var cx=lx+(charWidth/2);tw=4;var th=6;tx=parseInt(cx-(tw/2),10);
var ty=parseInt(cy-(th/2),10);ctx.globalAlpha=0.3;ctx.beginPath();ctx.fillStyle=this.editor.theme.plain||"white";
ctx.moveTo(tx,ty);ctx.lineTo(tx,ty+th);ctx.lineTo(tx+tw,ty+parseInt(th/2,10));ctx.closePath();
ctx.fill();ctx.globalAlpha=1}}}}y+=lineHeight}if(this.focus){if(this.showCursor){if(ed.theme.cursorType=="underline"){x=this.get("gutterWidth")+this.LINE_INSETS.left+ed.cursorManager.getCursorPosition().col*charWidth;
y=(ed.getCursorPos().row*lineHeight)+(lineHeight-5);ctx.fillStyle=ed.theme.cursorStyle;
ctx.fillRect(x,y,charWidth,3)}else{x=this.get("gutterWidth")+this.LINE_INSETS.left+ed.cursorManager.getCursorPosition().col*charWidth;
y=(ed.cursorManager.getCursorPosition().row*lineHeight);ctx.fillStyle=ed.theme.cursorStyle;
ctx.fillRect(x,y,1,lineHeight)}}}else{x=this.get("gutterWidth")+this.LINE_INSETS.left+ed.cursorManager.getCursorPosition().col*charWidth;
y=(ed.cursorManager.getCursorPosition().row*lineHeight);ctx.fillStyle=ed.theme.unfocusedCursorFillStyle;
ctx.strokeStyle=ed.theme.unfocusedCursorStrokeStyle;ctx.fillRect(x,y,charWidth,lineHeight);
ctx.strokeRect(x,y,charWidth,lineHeight)}var session=bespin.get("editSession");if(session){var userEntries=session.getUserEntries();
if(userEntries){userEntries.forEach(function(userEntry){if(!userEntry.clientData.isMe){x=this.gutterWidth+this.LINE_INSETS.left+userEntry.clientData.cursor.start.col*charWidth;
y=userEntry.clientData.cursor.start.row*lineHeight;ctx.fillStyle="#ee8c00";ctx.fillRect(x,y,1,lineHeight);
var prevFont=ctx.font;ctx.font="6pt Monaco, Lucida Console, monospace";ctx.fillText(userEntry.handle,x+3,y+lineHeight+4);
ctx.font=prevFont}}.bind(this))}}if(this.changes){this.changes.forEach(function(change){ctx.strokeStyle="#211A16";
ctx.beginPath();x=this.gutterWidth+this.LINE_INSETS.left+180*charWidth;y=change.start.row*lineHeight;
ctx.moveTo(x,y);x=this.gutterWidth+this.LINE_INSETS.left+change.start.col*charWidth;
ctx.lineTo(x,y);y+=lineHeight;ctx.lineTo(x,y);x=this.gutterWidth+this.LINE_INSETS.left;
ctx.lineTo(x,y);y=(change.end.row+1)*lineHeight;ctx.lineTo(x,y);x=this.gutterWidth+this.LINE_INSETS.left+change.end.col*charWidth;
ctx.lineTo(x,y);y=change.end.row*lineHeight;ctx.lineTo(x,y);x=this.gutterWidth+this.LINE_INSETS.left+180*charWidth;
ctx.lineTo(x,y);y=change.start.row*lineHeight;ctx.lineTo(x,y);ctx.stroke()}.bind(this))
}ctx.restore();ctx.restore()},getRowString:function(row){var content=this.get("content");
return content.getRowMetadata(row).lineText},getRowScreenLength:function(row){return this.getRowString(row).length
},getMaxCols:function(firstRow,lastRow){var cols=0;for(var i=firstRow;i<=lastRow;
i++){cols=Math.max(cols,this.getRowScreenLength(i))}return cols},setSearchString:function(str){var content=this.get("content");
if(str&&str!=""){this.searchString=str}else{delete this.searchString}content.searchStringChanged(this.searchString);
this.editor.paint(true)},setChanges:function(changes){this.changes=changes;console.log("changes=",this.changes)
},_scrollToFrameVisible:function(frame){var clippingFrame=this.get("clippingFrame");
var padding=this.get("padding");var preferredFrame={x:clippingFrame.x,y:clippingFrame.y,width:clippingFrame.width-padding.right,height:clippingFrame.height-padding.bottom};
var targetX;var frameRight=frame.x+frame.width;if(frame.x<preferredFrame.x){targetX=frame.x
}else{if(frameRight>=preferredFrame.x+preferredFrame.width){targetX=frameRight-preferredFrame.width
}else{targetX=preferredFrame.x}}var targetY;var frameBottom=frame.y+frame.height;
if(frame.y<preferredFrame.y){targetY=frame.y}else{if(frameBottom>=preferredFrame.y+preferredFrame.height){targetY=frameBottom-preferredFrame.height
}else{targetY=preferredFrame.y}}if(targetX===preferredFrame.x&&targetY===preferredFrame.y){return false
}var scrollable=this;do{scrollable=scrollable.get("parentView");if(scrollable===null){return false
}}while(scrollable.get("isScrollable")!==true);scrollable.scrollToVisible();return scrollable.scrollTo(targetX,targetY)
},_scrollToCharVisible:function(pos){var charWidth=this.get("charWidth");var lineHeight=this.get("lineHeight");
return this._scrollToFrameVisible({x:this.get("gutterWidth")+pos.col*charWidth,y:pos.row*lineHeight,width:charWidth,height:lineHeight})
},_scrollToCursorVisible:function(){var cursorPos=this.editor.cursorManager.getCursorPosition();
return this._scrollToCharVisible(cursorPos)},_updateCanvasSize:function(){var containerSize=this.computeContainerSize();
if(containerSize!=null){this.resizeCanvasToFit(containerSize)}var layout=this.computeLayout(containerSize);
this.adjust(layout)},cursorDidMove:function(sender,newPosition){this._updateCanvasSize();
this._scrollToCursorVisible()},dispose:function(){}});bespin.subscribe("settings:set:cursorblink",function(event){var ms=parseInt(event.value,10);
if(ms){var editor=bespin.get("editor");editor.ui.toggleCursorFrequency=ms}});bespin.subscribe("settings:set:fontsize",function(event){var editor=bespin.get("editor");
var fontsize=parseInt(event.value,10);editor.theme.editorTextFont=editor.theme.editorTextFont.replace(/[0-9]{1,}pt/,fontsize+"pt");
editor.theme.lineNumberFont=editor.theme.lineNumberFont.replace(/[0-9]{1,}pt/,fontsize+"pt")
});bespin.subscribe("settings:set:theme",function(event){var editor=bespin.get("editor");
var settings=bespin.get("settings");var theme=event.value;var checkSetAndExit=function(){var themeSettings=themes[theme];
if(themeSettings){if(themeSettings!=editor.theme){editor.theme=themeSettings;bespin.publish("settings:set:fontsize",{value:settings.getValue("fontsize")})
}return true}return false};if(theme){if(checkSetAndExit()){return true}try{var req=require;
req.call(window,"themes."+theme);if(checkSetAndExit()){return true}}catch(e){console.log("Unable to load theme: "+theme,e)
}var onSuccess=function(file){try{eval(file.content)}catch(e){console.log("Error with theme loading: ",e)
}if(!checkSetAndExit()){bespin.get("commandLine").addErrorOutput("Sorry old chap. No theme called '"+theme+"'. Fancy making it?")
}};var onFailure=function(){bespin.get("commandLine").addErrorOutput("Sorry old chap. No theme called '"+theme+"'. Fancy making it?")
};bespin.get("files").loadContents(bespin.userSettingsProject,"/themes/"+theme+".js",onSuccess,onFailure)
}});var EditorWrapper=SC.Object.extend({editor:null,ui:null,focus:function(){this.ui.setFocus(true)
},hasFocus:function(){return this.ui.hasFocus()},getFocusElement:function(){return this.ui._getFocusElement()
},removeSelection:function(){var selectionObject=this.editor.getSelection();var text=null;
if(selectionObject){var text=this.editor.model.getChunk(selectionObject);if(text&&text!=""){this.ui.actions.beginEdit("cut");
this.ui.actions.deleteSelection(selectionObject);this.ui.actions.endEdit()}}return text
},getSelection:function(){return this.editor.getSelectionAsText()},replaceSelection:function(text){var args=cursor.buildArgs();
args.chunk=text;if(args.chunk){this.ui.actions.beginEdit("paste");this.ui.actions.insertChunk(args);
this.ui.actions.endEdit()}},installEditorOnly:function(){this.editor.bindKey("copySelection","CMD C");
this.editor.bindKey("pasteFromClipboard","CMD V");this.editor.bindKey("cutSelection","CMD X")
}})});tiki.module("bespin:editor/views/scroll",function(c,b,d){var e=c("sproutcore/runtime:package").SC;
var a=c("editor/views/scroller");b.BespinScrollView=e.ScrollView.extend({hasHorizontalScroller:true,autohidesHorizontalScroller:false,horizontalScrollerView:a.BespinScrollerView,hasVerticalScroller:true,autohidesVerticalScroller:false,verticalScrollerView:a.BespinScrollerView,horizontalScrollerThickness:24,verticalScrollerThickness:24,tile:function(){var k=this.get("horizontalScrollerView");
var l=this.get("verticalScrollerView");var g=this.get("isHorizontalScrollerVisible");
var h=this.get("isVerticalScrollerVisible");var j=this.get("horizontalScrollerThickness");
var f=this.get("verticalScrollerThickness");if(g){var k=this.get("horizontalScrollerView");
k.set("scrollerThickness",j);k.set("padding",{top:0,bottom:6,left:6,right:6+f});k.set("layout",{left:0,bottom:0,right:0,height:j})
}if(h){var l=this.get("verticalScrollerView");l.set("scrollerThickness",f);l.set("padding",{left:0,right:6,top:6,bottom:6+j});
l.set("layout",{top:0,right:0,bottom:0,width:f})}this.get("containerView").set("layout",{left:0,bottom:0,top:0,right:0});
var i=this.get("contentView");if(i.get("hasPadding")===true){this.get("contentView").set("padding",{bottom:j+6,right:f+6})
}}})});tiki.module("bespin:editor/views/scroller",function(e,c,f){var h=e("sproutcore/runtime:package").SC;
var d=3;var b=5;var g=15;var a=8;c.BespinScrollerView=h.View.extend({classNames:["bespin-scroller-view"],_mouseDownScreenPoint:null,_mouseDownValue:null,_isMouseOver:false,_value:0,_bespinScrollerView_valueDidChange:function(){h.RunLoop.begin();
this.set("layerNeedsUpdate",true);h.RunLoop.end()}.observes("value"),_bespinScrollerView_maximumDidChange:function(){h.RunLoop.begin();
this.set("layerNeedsUpdate",true);h.RunLoop.end()}.observes("maximum"),theme:{backgroundStyle:"#2A211C",partialNibStyle:"rgba(100, 100, 100, 0.3)",partialNibArrowStyle:"rgba(255, 255, 255, 0.3)",partialNibStrokeStyle:"rgba(150, 150, 150, 0.3)",fullNibStyle:"rgb(100, 100, 100)",fullNibArrowStyle:"rgb(255, 255, 255)",fullNibStrokeStyle:"rgb(150, 150, 150)",scrollTrackFillStyle:"rgba(50, 50, 50, 0.8)",scrollTrackStrokeStyle:"rgb(150, 150, 150)",scrollBarFillStyle:"rgba(0, 0, 0, %a)",scrollBarFillGradientTopStart:"rgba(90, 90, 90, %a)",scrollBarFillGradientTopStop:"rgba(40, 40, 40, %a)",scrollBarFillGradientBottomStart:"rgba(22, 22, 22, %a)",scrollBarFillGradientBottomStop:"rgba(44, 44, 44, %a)"},scrollerThickness:h.NATURAL_SCROLLER_THICKNESS,minimumHandleSize:20,lineHeight:15,layoutDirection:h.LAYOUT_VERTICAL,isEnabled:true,ownerScrollValueKey:function(){switch(this.get("layoutDirection")){case h.LAYOUT_VERTICAL:return"verticalScrollOffset";
case h.LAYOUT_HORIZONTAL:return"horizontalScrollOffset"}return null}.property("layoutDirection").cacheable(),padding:{left:0,bottom:0,top:0,right:0},_clientFrame:function(){var j=this.get("frame"),i=this.get("padding");
return{x:i.left,y:i.top,width:j.width-(i.left+i.right),height:j.height-(i.top+i.bottom)}
}.property("frame","padding").cacheable(),_clientThickness:function(){var j=this.get("padding");
var i=this.get("scrollerThickness");switch(this.get("layoutDirection")){case h.LAYOUT_VERTICAL:return i-(j.left+j.right);
case h.LAYOUT_HORIZONTAL:return i-(j.top+j.bottom)}}.property("layoutDirection","padding","scrollerThickness").cacheable(),_gutterFrame:function(){var i=this.get("_clientFrame");
var j=this.get("_clientThickness");switch(this.get("layoutDirection")){case h.LAYOUT_VERTICAL:return{x:i.x,y:i.y+g,width:j,height:Math.max(0,i.height-2*g)};
case h.LAYOUT_HORIZONTAL:return{x:i.x+g,y:i.y,width:Math.max(0,i.width-2*g),height:j}
}}.property("_clientFrame","_clientThickness","layoutDirection").cacheable(),_gutterLength:function(){var j=this.get("_gutterFrame");
var i;switch(this.get("layoutDirection")){case h.LAYOUT_HORIZONTAL:i=j.width;break;
case h.LAYOUT_VERTICAL:i=j.height;break}return i}.property("_gutterFrame","layoutDirection").cacheable(),_frameLength:function(){var i=this.get("frame");
switch(this.get("layoutDirection")){case h.LAYOUT_HORIZONTAL:return i.width;case h.LAYOUT_VERTICAL:return i.height
}}.property("frame","layoutDirection").cacheable(),_clientLength:function(){var i=this.get("_clientFrame");
switch(this.get("layoutDirection")){case h.LAYOUT_HORIZONTAL:return i.width;case h.LAYOUT_VERTICAL:return i.height
}}.property("_clientFrame","layoutDirection").cacheable(),_handleFrame:function(){var k=this.get("value");
var n=this.get("maximum");var m=this.get("frame");var i=this.get("_clientFrame");
var l=this.get("_gutterFrame");var j=this.get("_clientThickness");switch(this.get("layoutDirection")){case h.LAYOUT_VERTICAL:return{x:i.x,y:i.y+g+k*l.height/n,width:j,height:m.height*l.height/n};
case h.LAYOUT_HORIZONTAL:return{x:i.x+g+k*l.width/n,y:i.y,width:m.width*l.width/n,height:j}
}}.property("_clientFrame","_clientThickness","_gutterFrame","maximum","value").cacheable(),maximumValue:function(){return Math.max(this.get("maximum")-this.get("_frameLength"),0)
}.property("_frameLength","maximum").cacheable(),value:function(j,k){var i=this.get("maximumValue");
if(k!==undefined){if(k<0){k=0}else{if(k>i){k=i}}this._value=k}else{return Math.min(this._value||0,i)
}}.property("maximumValue").cacheable(),maximum:0,_segmentForMouseEvent:function(j){var i=this.convertFrameFromView({x:j.pageX,y:j.pageY});
var k=this.get("_clientFrame");if(!h.pointInRect(i,k)){return null}var m=this.get("layoutDirection");
switch(m){case h.LAYOUT_HORIZONTAL:if(i.x<g){return"nib-start"}if(i.x>=k.width-g){return"nib-end"
}break;case h.LAYOUT_VERTICAL:if(i.y<g){return"nib-start"}if(i.y>=k.height-g){return"nib-end"
}break}var l=this.get("_handleFrame");if(h.pointInRect(i,l)){return"handle"}switch(m){case h.LAYOUT_HORIZONTAL:if(i.x<l.x){return"gutter-before"
}else{if(i.x>=l.x+l.width){return"gutter-after"}}break;case h.LAYOUT_VERTICAL:if(i.y<l.y){return"gutter-before"
}else{if(i.y>=l.y+l.height){return"gutter-after"}}break}console.assert(false,"_segmentForMouseEvent: point ",i," outside view with handle frame ",l," and client frame ",k)
},mouseEntered:function(i){h.RunLoop.begin();this._isMouseOver=true;this.set("layerNeedsUpdate",true);
h.RunLoop.end()},mouseExited:function(i){h.RunLoop.begin();this._isMouseOver=false;
this.set("layerNeedsUpdate",true);h.RunLoop.end()},mouseWheel:function(i){h.RunLoop.begin();
var j;switch(this.get("layoutDirection")){case h.LAYOUT_HORIZONTAL:j=i.wheelDeltaX;
break;case h.LAYOUT_VERTICAL:j=i.wheelDeltaY;break}this.set("value",this.get("value")+2*j);
h.RunLoop.end()},mouseDown:function(i){h.RunLoop.begin();var k=this.get("value");
var j=this.get("_gutterLength");switch(this._segmentForMouseEvent(i)){case"nib-start":this.set("value",k-this.get("lineHeight"));
break;case"nib-end":this.set("value",k+this.get("lineHeight"));break;case"gutter-before":this.set("value",k-j);
break;case"gutter-after":this.set("value",k+j);break;case"handle":switch(this.get("layoutDirection")){case h.LAYOUT_HORIZONTAL:this._mouseDownScreenPoint=i.clientX;
break;case h.LAYOUT_VERTICAL:this._mouseDownScreenPoint=i.clientY;break}break}h.RunLoop.end()
},mouseUp:function(i){this._mouseDownScreenPoint=null;this._mouseDownValue=null},mouseMoved:function(j){h.RunLoop.begin();
if(this._mouseDownScreenPoint!==null){var k;switch(this.get("layoutDirection")){case h.LAYOUT_HORIZONTAL:k=j.clientX;
break;case h.LAYOUT_VERTICAL:k=j.clientY;break}var i=k-this._mouseDownScreenPoint;
var m=this.get("maximum");var l=this.get("_gutterLength");this.set("value",this.get("value")+i*m/l);
this._mouseDownScreenPoint=k}h.RunLoop.end()},_paintNib:function(i){var m=this.get("theme");
var k,j,n;if(this._isMouseOver){k=m.fullNibStyle;j=m.fullNibArrowStyle;n=m.fullNibStrokeStyle
}else{k=m.partialNibStyle;j=m.partialNibArrowStyle;n=m.partialNibStrokeStyle}var l=Math.floor(g/2);
i.fillStyle=k;i.beginPath();i.arc(0,0,Math.floor(g/2),0,Math.PI*2,true);i.closePath();
i.fill();i.strokeStyle=n;i.stroke();i.fillStyle=j;i.beginPath();i.moveTo(0,-l+d);
i.lineTo(-l+d,l-b);i.lineTo(l-d,l-b);i.closePath();i.fill()},_paintNibs:function(j){var i=this._isMouseOver;
var k=this.get("_clientThickness");var l=this.get("value");if(i||l!==0){j.save();
j.translate(a,k/2);j.rotate(Math.PI*1.5);j.moveTo(0,0);this._paintNib(j);j.restore()
}if(i||l!==this.get("maximumValue")){j.save();j.translate(this.get("_clientLength")-a,k/2);
j.rotate(Math.PI*0.5);j.moveTo(0,0);this._paintNib(j);j.restore()}},_paint:function(){var j=this.$("canvas")[0];
var i=this.get("frame");if(j.width!==i.width){j.width=i.width}if(j.height!==i.height){j.height=i.height
}var w=j.getContext("2d");var k=(w.globalAlpha)?w.globalAlpha:1;var m=this.get("theme");
w.clearRect(0,0,i.width,i.height);if(this.get("isEnabled")===false||o<=u){return}w.save();
var t=this.get("padding");w.translate(t.left,t.top);var p=this.get("_handleFrame");
var o=this.get("_gutterLength");var l=this.get("layoutDirection");var s=this.get("_clientThickness");
var n=s/2;var v,u;switch(l){case h.LAYOUT_VERTICAL:v=p.y-t.top;u=p.height;w.translate(s+1,0);
w.rotate(Math.PI*0.5);break;case h.LAYOUT_HORIZONTAL:v=p.x-t.left;u=p.width;break
}if(this._isMouseOver===false){w.globalAlpha=0.3}else{var r=this.get("_clientLength");
w.fillStyle=m.scrollTrackFillStyle;w.fillRect(a+0.5,0.5,r-2*a,s-1);w.strokeStyle=m.scrollTrackStrokeStyle;
w.strokeRect(a+0.5,0.5,r-2*a,s-1)}var x=function(){w.beginPath();w.arc(v+n+0.5,n,n-0.5,Math.PI/2,3*Math.PI/2,false);
w.arc(v+u-n-0.5,n,n-0.5,3*Math.PI/2,Math.PI/2,false);w.lineTo(v+n+0.5,s-0.5);w.closePath()
};x();var q=w.createLinearGradient(v,0,v,s);q.addColorStop(0,m.scrollBarFillGradientTopStart.replace(/%a/,k));
q.addColorStop(0.4,m.scrollBarFillGradientTopStop.replace(/%a/,k));q.addColorStop(0.41,m.scrollBarFillStyle.replace(/%a/,k));
q.addColorStop(0.8,m.scrollBarFillGradientBottomStart.replace(/%a/,k));q.addColorStop(1,m.scrollBarFillGradientBottomStop.replace(/%a/,k));
w.fillStyle=q;w.fill();w.save();w.clip();w.fillStyle=m.scrollBarFillStyle.replace(/%a/,k);
w.beginPath();w.moveTo(v+n*0.4,n*0.6);w.lineTo(v+n*0.9,s*0.4);w.lineTo(v,s*0.4);w.closePath();
w.fill();w.beginPath();w.moveTo(v+u-(n*0.4),0+(n*0.6));w.lineTo(v+u-(n*0.9),0+(s*0.4));
w.lineTo(v+u,0+(s*0.4));w.closePath();w.fill();w.restore();w.save();x();w.strokeStyle=m.scrollTrackStrokeStyle;
w.stroke();w.restore();if(this._isMouseOver===false){w.globalAlpha=1}this._paintNibs(w);
w.restore()},didCreateLayer:function(){this._paint()},render:function(i,k){if(!k){this._paint();
return}var j=this.get("frame");i.push('<canvas width="%@" height="%@">'.fmt(j.width,j.height))
}})});tiki.module("bespin:embed",function(e,i,c){e("util/globals");var d=e("sproutcore/runtime:package").SC;
var g=e("package");var j=e("util/util");var f=e("settings");var h=e("plugins");var a=e("builtins");
var l=e("editor");var b=e("editor/controller").EditorController;var k=h.Catalog.create();
k.load(a.metadata);g.register("plugins",k);i.useBespin=function(o,n){n=n||{};if(j.isString(o)){o=document.getElementById(o)
}if(!o){throw new Error("useBespin requires a element parameter to attach to")}var p=o.innerHTML;
var m=b.create({container:o});d.run(function(){g.register("editor",m);var r=d.Pane.create({layout:m.computeLayout(),layoutStyle:function(s,t){return{width:"100%",height:"100%"}
}.property().cacheable()});r.appendChild(m.ui,null);d.$(o).css("position","relative");
o.innerHTML="";r.appendTo(o);if(n.initialContent){p=n.initialContent}m.model.insertDocument(p);
if(n.settings){for(var q in n.settings){if(n.settings.hasOwnProperty(q)){m.setSetting(q,n.settings[q])
}}}if(n.stealFocus){m.setFocus(true)}if(n.lineNumber){m.setLineNumber(n.lineNumber)
}});return m}});tiki.module("bespin:events",function(d,b,e){var c=d("package");var a=d("util/util");
b.subscribe=function(){c.subscribe("url:change",function(g){var j=a.queryToObject(location.hash.substring(1));
j.project=g.project;j.path=g.path;var i=[];for(var f in j){var h=j[f];i.push(f+"="+h)
}window.location.hash=i.join("&")});c.subscribe("url:changed",function(f){c.get("editor").openFile(null,f.now.get("path"))
});c.subscribe("cmdline:focus",function(f){c.get("editor").setFocus(false)});c.subscribe("cmdline:blur",function(f){c.get("editor").setFocus(true)
});c.subscribe("editor:document:changed",function(f){c.publish("editor:dirty")});
c.subscribe("editor:dirty",function(f){c.get("editor").dirty=true});c.subscribe("editor:clean",function(f){c.get("editor").dirty=false
})}});tiki.module("bespin:history",function(c,a,d){var b=c("package");var e=c("sproutcore/runtime:package").SC;
a.HistoryManager=e.Object.extend({history:[],historyPosition:-1,disableAdding:false,clear:function(){this.history=[];
this.historyPosition=-1;this.disableAdding=false},getRange:function(g,f){},replaceRange:function(h,f,g){this.history.splice(h,f-h+1,g)
},truncate:function(f){this.history.length=f+1;this.historyPosition=Math.min(this.historyPosition,this.history.length-1)
},getCurrent:function(){return this.historyPosition},undo:function(){if(this.historyPosition<0){return
}var g=this.history[this.historyPosition];this.disableAdding=true;try{g.undo()}catch(f){console.error("There was an error in an undo action: ");
console.error(f)}this.disableAdding=false;this.historyPosition--},redo:function(){if(this.historyPosition>=this.history.length-1){return
}var f=this.history[this.historyPosition+1];this.disableAdding=true;try{f.redo()}catch(g){console.error("There was an error in an undo action: ");
console.error(g)}this.disableAdding=false;this.historyPosition++},add:function(f){if(this.disableAdding){return
}this.history.length=this.historyPosition+1;this.history.push(f);this.historyPosition++
},canUndo:function(){return this.historyPosition>-1},canRedo:function(){return this.historyPosition<this.history.length-1
}});b.subscribe("editor:openfile:opensuccess",function(){b.get("editor").historyManager.clear()
})});tiki.module("bespin:model",function(d,b,e){var g=d("sproutcore/runtime:package").SC;
var c=d("package");var a=d("util/util");var f=d("cursor");b.DocumentModel=g.Object.extend({editor:null,init:function(){this.clear()
},addHistoryItem:function(h,i){this.history.length=this.historyIndex+1;this.history.push({func:h,data:i});
this.historyIndex++},performHistoryItem:function(i){var h=i.func;var j=i.data;switch(h){case"deleteCharacters":this.deleteCharacters(j.pos,j.characters.length,true);
break;case"insertCharacters":this.insertCharacters(j.pos,j.characters,true);break;
case"deleteChunk":this.deleteChunk(j.selection,j.chunk,true);break;case"insertChunk":this.insertChunk(j.selection.startModelPos,j.chunk,true);
break;case"joinRow":this.joinRow(j.selection.startModelPos.row,true);break;case"replaceRow":this.replaceRow(j.row,i.undo?j.oldline:j.newline,true);
break}},unperformHistoryItem:function(i){var h=i.func;var j=i.data;switch(h){case"deleteCharacters":h="insertCharacters";
break;case"insertCharacters":h="deleteCharacters";break;case"deleteChunk":h="insertChunk";
break;case"insertChunk":h="deleteChunk";break;case"joinRow":h="insertChunk";break
}this.performHistoryItem({func:h,data:j,undo:true})},applyState:function(j){if(j>=this.history.length||j<-1){return
}else{if(j==this.historyIndex){return}}var h,k;if(j>this.historyIndex){for(h=this.historyIndex+1;
h<=j;h++){k=this.history[h];this.performHistoryItem(k)}}else{for(h=this.historyIndex;
h>j;h--){k=this.history[h];this.unperformHistoryItem(k)}}this.historyIndex=j},getState:function(){return this.historyIndex
},isEmpty:function(){if(this.rows.length>1){return false}if(this.rows.length==1&&this.rows[0].length>0){return false
}return true},getDirtyRows:function(){var h=(this.dirtyRows)?this.dirtyRows:[];this.dirtyRows=null;
return h},setRowDirty:function(h){if(!this.dirtyRows){this.dirtyRows=new Array(this.rows.length)
}this.dirtyRows[h]=true},isRowDirty:function(h){if(!this.dirtyRows){return true}return this.dirtyRows[h]
},setRowArray:function(i,h){if(!Array.isArray(h)){h=h.split("")}this.rows[i]=h},getRowArray:function(h){while(this.rows.length<=h){this.rows.push([])
}return this.rows[h]},hasRow:function(h){return(this.rows[h])},insertCharacters:function(h,i,l){var k=this.getRowArray(h.row);
while(k.length<h.col){k.push(" ")}var j=(h.col>0)?k.splice(0,h.col):[];j=j.concat(i.split(""));
this.rows[h.row]=j.concat(k);this.setRowDirty(h.row);if(!l){this.addHistoryItem("insertCharacters",{pos:f.copyPos(h),characters:i})
}},getDocument:function(){var i=[];for(var h=0;h<this.getRowCount();h++){i[h]=this.getRowArray(h).join("")
}return i.join("\n")},insertDocument:function(i){this.clear();var j=i.split("\n");
for(var h=0;h<j.length;h++){this.insertCharacters({row:h,col:0},j[h],true)}},changeEachRow:function(i){for(var h=0;
h<this.getRowCount();h++){var j=this.getRowArray(h);j=i(j);this.setRowArray(h,j)}},replace:function(l,k){var m=new RegExp(l,"g");
for(var h=0;h<this.getRowCount();h++){var i=this.getRowArray(h).join("");var j=i.replace(m,k);
if(j!=i){this.replaceRow(h,j)}}},replaceRow:function(k,h,j){var i=this.getRowArray(k).join("");
this.rows[k]=h.split("");if(!j){this.addHistoryItem("replaceRow",{row:k,oldline:i,newline:h})
}},deleteCharacters:function(i,j,m){var l=this.getRowArray(i.row);var k=(i.col+j-1)-l.length;
if(k>0){j-=k}if(j>0){this.setRowDirty(i.row);this.editor.editorView.syntaxModel.invalidateCache(i.row);
var h=l.splice(i.col,j).join("");if(!m){this.addHistoryItem("deleteCharacters",{pos:f.copyPos(i),characters:h})
}return h}return""},clear:function(){this.rows=[];this.cacheRowMetadata=[];this.history=[];
this.historyIndex=-1},deleteRows:function(j,h){var i=(j+h-1)-this.rows.length;if(i>0){h-=i
}if(h>0){this.rows.splice(j,h);this.cacheRowMetadata.splice(j,h)}},splitRow:function(h){this.editor.editorView.syntaxModel.invalidateCache(h.row);
this.setRowDirty(h.row);var l=this.getRowArray(h.row);var i=[];if(h.col<l.length){i=i.concat(l.splice(h.col))
}if(h.row==(this.rows.length-1)){this.rows.push(i)}else{var j=this.rows.splice(0,h.row+1);
j.push(i);j=j.concat(this.rows);this.rows=j;var k=this.cacheRowMetadata.splice(0,h.row+1);
k.push(undefined);this.cacheRowMetadata=k.concat(this.cacheRowMetadata)}},joinRow:function(m,k){this.editor.editorView.syntaxModel.invalidateCache(m);
this.setRowDirty(m);if(m>=this.rows.length-1){return}var j=this.getRowArray(m);var i=this.rows[m+1];
var h=j.length;this.rows[m]=j.concat(i);this.rows.splice(m+1,1);this.cacheRowMetadata.splice(m+1,1);
if(!k){var l={row:m,col:h};this.addHistoryItem("joinRow",{selection:{startModelPos:l,endModelPos:l},chunk:"\n"})
}},getRowCount:function(){return this.rows.length},getChunk:function(l){var k=l.startModelPos;
var m=l.endModelPos;var o,p;var h="";o=k.col;var n=this.getRowArray(k.row);p=(m.row==k.row)?m.col:n.length;
if(p>n.length){p=n.length}h+=n.join("").substring(o,p);for(var j=k.row+1;j<m.row;
j++){h+="\n";h+=this.getRowArray(j).join("")}if(k.row!=m.row){o=0;p=m.col;n=this.getRowArray(m.row);
if(p>n.length){p=n.length}h+="\n"+n.join("").substring(o,p)}return h},deleteChunk:function(o,n){var m=this.getChunk(o);
var h=o.startModelPos;var l=o.endModelPos;this.editor.editorView.syntaxModel.invalidateCache(h.row);
var j,i;j=h.col;var p=this.getRowArray(h.row);i=(l.row==h.row)?l.col:p.length;if(i>p.length){i=p.length
}var k={row:h.row,col:j};this.deleteCharacters(k,i-j,true);if(h.row!=l.row){j=0;i=l.col;
p=this.getRowArray(l.row);if(i>p.length){i=p.length}k={row:l.row,col:j};this.deleteCharacters(k,i-j,true)
}if((l.row-h.row)>1){this.deleteRows(h.row+1,l.row-h.row-1)}if(l.row!=h.row){this.joinRow(h.row,true)
}if(!n){this.addHistoryItem("deleteChunk",{selection:{startModelPos:f.copyPos(o.startModelPos),endModelPos:f.copyPos(o.endModelPos)},chunk:m})
}return m},insertChunk:function(j,l,n){this.editor.editorView.syntaxModel.invalidateCache(j.row);
var k=l.split("\n");var h=f.copyPos(j);for(var m=0;m<k.length;m++){this.insertCharacters(h,k[m],true);
h.col=h.col+k[m].length;if(m<k.length-1){this.splitRow(h);h.col=0;h.row=h.row+1}}if(!n){this.addHistoryItem("insertChunk",{selection:{startModelPos:f.copyPos(j),endModelPos:f.copyPos(h)},chunk:l})
}return h},getStringIndicesInRow:function(k,j){j=j.toLowerCase();k=this.getRowArray(k).join("").toLowerCase();
if(k.indexOf(j)==-1){return false}var h=[];var l=0;var i=k.indexOf(j);do{h.push(i);
i=k.indexOf(j,i+1)}while(i!=-1);return h},getCountOfString:function(l){var k=0;var i;
var j;for(var h=0;h<this.getRowCount();h++){j=this.getStringIndicesInRow(h,l);if(j){k+=j.length
}}return k},searchStringChanged:function(i){for(var h=0;h<this.cacheRowMetadata.length;
h++){if(this.cacheRowMetadata[h]){if(i){this.cacheRowMetadata[h].searchIndices=this.getStringIndicesInRow(h,i)
}else{this.cacheRowMetadata[h].searchIndices=false}}}},findPrev:function(m,i,l){var k;
var j=l.length;for(var h=m;h>-1;h--){k=this.getStringIndicesInRow(h,l);if(!k){continue
}for(var n=k.length-1;n>-1;n--){if(k[n]<(i-j)||m!=h){return{startPos:{col:k[n],row:h},endPos:{col:k[n]+j,row:h}}
}}}return false},findNext:function(l,i,k){var j;for(var h=l;h<this.getRowCount();
h++){j=this.getStringIndicesInRow(h,k);if(!j){continue}for(var m=0;m<j.length;m++){if(j[m]>i||l!=h){return{startPos:{col:j[m],row:h},endPos:{col:j[m]+k.length,row:h}}
}}}return false},findBefore:function(l,j,i){var h=this.getRowArray(l);if(!a.isFunction(i)){i=function(n){if(n.charAt(0)==" "){return true
}var m=n.charCodeAt(0);return(m<48)||(m>122)}}if(j>=h.length){j=Math.max(h.length-1,0)
}while(j>0){var k=h[j];if(!k){continue}if(i(k)){j++;break}j--}return{row:l,col:j}
},findAfter:function(l,j,i){var h=this.getRowArray(l);if(!a.isFunction(i)){i=function(n){if(n.charAt(0)==" "){return true
}var m=n.charCodeAt(0);return(m<48)||(m>122)}}while(j<h.length){j++;var k=h[j];if(!k){continue
}if(i(k)){break}}return{row:l,col:j}},getRowMetadata:function(r){if(!this.isRowDirty(r)&&this.cacheRowMetadata[r]){return this.cacheRowMetadata[r]
}var q={tabExpansions:[]};var n=this.editor.model.getRowArray(r);var o=n.join("");
var i=this.editor.getTabSize();q.lineTextWithoutTabExpansion=o;q.lineLengthWithoutTabExpansion=n.length;
for(var h=0;h<o.length;h++){if(o.charCodeAt(h)==9){var l=i-(h%i);var m="";for(var k=1;
k<l;k++){m+=" "}var j=(h==0)?"":o.substring(0,h);var p=(h<o.length-1)?o.substring(h+1):"";
o=j+" "+m+p;q.tabExpansions.push({start:j.length,end:j.length+m.length+1});h+=l-1
}}q.lineText=o;q.lineLength=q.lineText.length;if(this.editor.editorView.searchString){q.searchIndices=this.getStringIndicesInRow(r,this.editor.editorView.searchString)
}else{q.searchIndices=false}this.cacheRowMetadata[r]=q;return q}})});tiki.module("bespin:package",function(c,b,d){var f=c("sproutcore/runtime:package").SC;
c("browserup:package");f.mixin(b,{versionNumber:"tip",versionCodename:"DEVELOPMENT MODE",apiVersion:"dev",userSettingsProject:"BespinSettings"});
b.displayVersion=function(g){g=document.getElementById(g)||document.getElementById("version");
if(!g){return}g.innerHTML='<a href="https://wiki.mozilla.org/Labs/Bespin/ReleaseNotes" title="Read the release notes">Version <span class="versionnumber">'+this.versionNumber+'</span> "'+this.versionCodename+'"</a>'
};var e=c("util/hub");b.publish=e.publish;b.subscribe=e.subscribe;b.unsubscribe=e.unsubscribe;
b.fireAfter=e.fireAfter;var a=c("util/container");b.register=a.register;b.unregister=a.unregister;
b.get=a.get;b.getComponent=a.getComponent});tiki.module("bespin:plugins",function(b,a,c){var d=b("sproutcore/runtime:package").SC;
a.Extension=d.Object.extend({load:function(h,e){e=e||"pointer";var f=this.get(e).split(":");
var g=f[0];tiki.async(g).then(function(i){if(h){if(f[1]){h(i[f[1]])}else{h(i)}}})
}});a.ExtensionPoint=d.Object.extend({init:function(){this.extensions=[];this.handlers=[]
},addExtension:function(e){this.extensions.push(e)},active:function(e){this.handlers.forEach(function(f){if(f.activate){f.load(function(g){g(e)
},"activate")}})}});a.Plugin=d.Object.extend({activate:function(){var e=this.provides;
self=this;this.provides.forEach(function(g){var f=self.get("catalog").getExtensionPoint(g.ep);
f.active(g)})}});a.Catalog=d.Object.extend({init:function(){this.points={};this.plugins={}
},getExtensionPoint:function(e){if(this.points[e]===undefined){this.points[e]=a.ExtensionPoint.create({name:e,catalog:this})
}return this.points[e]},registerExtensionPoint:function(f){var e=this.getExtensionPoint(f.name);
e.handlers.push(f)},load:function(l){for(var e in l){var k=l[e];if(k.active===undefined){k.active=true
}k.catalog=this;if(k.provides){var j=k.provides;for(var g=0;g<j.length;g++){var m=a.Extension.create(j[g]);
j[g]=m;var f=m.ep;if(f=="extensionpoint"){this.registerExtensionPoint(m)}else{var n=this.getExtensionPoint(m.ep);
n.addExtension(m)}}}else{k.provides=[]}var h=a.Plugin.create(k);if(h.active){h.activate()
}this.plugins[e]=h}}});a.thing1=function(e){print("Thing1")};a.thing2=function(e){print("Thing2")
};a.thing3=function(e){print("Thing3: "+e)}});tiki.module("bespin:settings",function(e,c,f){var d=e("package");
var b=e("util/util");var a=e("theme");var h=e("sproutcore/runtime:package").SC;c.factory=function(i){i(c.Core.create({store:c.InMemory}))
};function g(){return{tabsize:"4",tabmode:"off",tabarrow:"on",fontsize:"10",consolefontsize:"11",autocomplete:"off",closepairs:"off",collaborate:"off",language:"auto",strictlines:"on",syntaxcheck:"off",syntaxengine:"simple",syntaxmarkers:"all",preview:"window",smartmove:"on",jslint:""}
}d.subscribe("settings:set",function(j){var i=d.get("settings");i.setValue(j.key,j.value)
});c.Core=h.Object.extend({store:null,init:function(){this.store=new (this.store||c.ServerFile)(this)
},setValue:function(i,j){this.store.setValue(i,j);d.publish("settings:set:"+i,{value:j})
},getValue:function(i){return this.store.getValue(i)},unsetValue:function(i){this.store.unsetValue(i)
},list:function(){var j=[];var i=this.store.settings;for(var k in i){if(i.hasOwnProperty(k)){j.push({key:k,value:i[k]})
}}return j},isValueOn:function(i){return i=="on"||i=="true"},isValueOff:function(i){return i=="off"||i=="false"||i===undefined
},isSettingOn:function(i){return this.isValueOn(this.getValue(i))},isSettingOff:function(i){return this.isValueOff(this.getValue(i))
},setObject:function(i,j){this.setValue(i,JSON.stringify(j))},getObject:function(i){try{return JSON.parse(this.getValue(i))
}catch(j){console.log("Error in getObject: "+j);return{}}}});c.InMemory=h.Object.extend({init:function(i){this.parent=i;
this.settings=g()},setValue:function(i,j){this.settings[i]=j},getValue:function(i){return this.settings[i]
},unsetValue:function(i){delete this.settings[i]}});c.Cookie=h.Object.extend({init:function(j){var k=1;
this.cookieSettings={expires:k/24,path:"/"};var i=JSON.parse(cookie.get("settings"));
if(i){this.settings=i}else{this.settings={tabsize:"2",fontsize:"10",autocomplete:"off",collaborate:"off"};
cookie.set("settings",JSON.stringify(this.settings),this.cookieSettings)}},setValue:function(i,j){this.settings[i]=j;
cookie.set("settings",JSON.stringify(this.settings),this.cookieSettings)},getValue:function(i){return this.settings[i]
},unsetValue:function(i){delete this.settings[i];cookie.set("settings",JSON.stringify(this.settings),this.cookieSettings)
}});c.ServerAPI=h.Object.extend({init:function(i){this.self=this;this.parent=i;this.server=d.get("server");
this.settings=g();this.server.listSettings(function(j){self.settings=j;if(j.tabsize===undefined){self.settings=g();
self.server.setSettings(self.settings)}})},setValue:function(i,j){this.settings[i]=j;
this.server.setSetting(i,j)},getValue:function(i){return this.settings[i]},unsetValue:function(i){delete this.settings[i];
this.server.unsetSetting(i)}});c.ServerFile=h.Object.extend({init:function(i){this.parent=i;
this.server=d.get("server");this.settings=g();this.loaded=false;this._load()},setValue:function(i,j){this.settings[i]=j;
if(i[0]!="_"){this._save()}},getValue:function(i){return this.settings[i]},unsetValue:function(i){delete this.settings[i];
this._save()},_save:function(){if(!this.loaded){return}var j="";for(var i in this.settings){if(this.settings.hasOwnProperty(i)){j+=i+" "+this.settings[i]+"\n"
}}d.get("files").saveFile(d.userSettingsProject,{name:"settings",content:j,timestamp:new Date().getTime()})
},_load:function(){var j=this;var i=function(){if(!j.loaded){j.loaded=true}};var k=function(m){m.content.split(/\n/).forEach(function(n){if(n.match(/^\s*#/)){return
}if(n.match(/\S+\s+\S+/)){var o=n.split(/\s+/);j.settings[o[0].trim()]=o[1].trim()
}});for(var l in j.settings){d.publish("settings:set:"+l,{value:j.settings[l]})}i()
};d.fireAfter(["authenticated"],function(){d.get("files").loadContents(d.userSettingsProject,"settings",k,i)
})}});c.URL=h.Object.extend({init:function(i){this.results=b.queryToObject(this.stripHash(i||window.location.hash))
},getValue:function(i){return this.results[i]},setValue:function(i,j){this.results[i]=j
},stripHash:function(i){var j=i.split("");j.shift();return j.join("")}})});tiki.module("bespin:syntax",function(d,a,e){var c=d("package");
var h=d("sproutcore/runtime:package").SC;a.Model=h.Object.extend({language:"",lineCache:[],invalidateCache:function(i){delete this.lineCache[i]
},invalidateEntireCache:function(){this.lineCache=[]},addToCache:function(i,j){this.lineCache[i]=j
},getFromCache:function(i){return this.lineCache[i]},mergeSyntaxResults:function(m){var k=0;
for(var j=0;j<m.length;j++){var l=l[j]}},getSyntaxStylesPerLine:function(j,i,k){return{text:j,regions:[{plain:[{start:0,stop:j.length}]}]}
},getSyntaxStyles:function(m,l,o,n){var k={};for(var j=l;j<=o;j++){k[j]=this.getSyntaxStylesPerLine(m[j],j,n)
}return k}});var g,b;var f={};a.Resolver={setEngine:function(i){var j=f[i];if(i==g){return this
}if(j){g=i;if(b){delete b}if(j.worker){}else{b=new f[i].Model();b.workerEnabled=false
}}else{console.log("no such engine: ",i)}return this},getModel:function(){return b
}}});tiki.module("bespin:theme",function(b,a,c){var d=b("sproutcore/runtime:package").SC;
a.coffee={backgroundStyle:"#2A211C",gutterStyle:"#4c4a41",lineNumberColor:"#e5c138",lineNumberFont:"10pt Monaco, Lucida Console, monospace",lineMarkerErrorColor:"#CC4444",lineMarkerWarningColor:"#B8860B",lineMarkerMessageColor:"green",zebraStripeColor:"#2A211C",highlightCurrentLineColor:"#3a312b",editorTextFont:"10pt Monaco, Lucida Console, monospace",editorTextColor:"rgb(230, 230, 230)",editorSelectedTextColor:"rgb(240, 240, 240)",editorSelectedTextBackground:"#526DA5",cursorStyle:"#879aff",cursorType:"ibeam",unfocusedCursorStrokeStyle:"#FF0033",unfocusedCursorFillStyle:"#73171E",partialNibStyle:"rgba(100, 100, 100, 0.3)",partialNibArrowStyle:"rgba(255, 255, 255, 0.3)",partialNibStrokeStyle:"rgba(150, 150, 150, 0.3)",fullNibStyle:"rgb(100, 100, 100)",fullNibArrowStyle:"rgb(255, 255, 255)",fullNibStrokeStyle:"rgb(150, 150, 150)",scrollTrackFillStyle:"rgba(50, 50, 50, 0.8)",scrollTrackStrokeStyle:"rgb(150, 150, 150)",scrollBarFillStyle:"rgba(0, 0, 0, %a)",scrollBarFillGradientTopStart:"rgba(90, 90, 90, %a)",scrollBarFillGradientTopStop:"rgba(40, 40, 40, %a)",scrollBarFillGradientBottomStart:"rgba(22, 22, 22, %a)",scrollBarFillGradientBottomStop:"rgba(44, 44, 44, %a)",tabSpace:"#392A25",searchHighlight:"#B55C00",searchHighlightSelected:"#FF9A00",plain:"#bdae9d",keyword:"#42a8ed",string:"#039a0a",comment:"#666666","c-comment":"#666666",punctuation:"#888888",attribute:"#BF9464",test:"rgb(255,0,0)",cdata:"#bdae9d","attribute-value":"#039a0a",tag:"#46a8ed",color:"#c4646b","tag-name":"#46a8ed",value:"#039a0a",important:"#990000",sizes:"#990000",cssclass:"#BF9464",cssid:"#46a8ed",atom:"#aa4444",variable:"#00cccc",variabledef:"#4422cc",localvariable:"#cc2277",property:"#66bb33",operator:"#88bbff",error:"#FF0000",processing:"#999999",entity:"#AA2222",text:"#00BB00","compile-time-constant":"#776088","predefined-constant":"#33CC33","reserved-language-construct":"#00FF00","predefined-function":"#22FF22","predefined-class":"#22FF22",literal:"#DD4411",identifier:"#22FF22",func:"#2200FF",type:"#8822FF",decorator:"#2222FF"};
a.coffeezebra={};d.mixin(a.coffeezebra,a.coffee);a.coffeezebra.zebraStripeColor="#FFFFFF";
a["default"]=a.coffee});tiki.module("bespin:util/bootstrap_worker",function(require,exports,module){var NATIVE_JSON=this.JSON?true:false;
var __GLOBAL__=this;if(!__GLOBAL__.console){__GLOBAL__.console={log:function(msg){postMessage("log="+msg)
}}}var loadDone=function(){if(theObject.initialize){theObject.initialize()}};var internalMessageIdentifier="__IMPORT_SCRIPT__";
var SCRIPT_COUNT=0;var LOADED_SCRIPTS=0;var EMULATE_LOAD=false;if(typeof google!="undefined"&&google.gears&&google.gears.workerPool){var wp=google.gears.workerPool;
wp.onmessage=function(a,b,message){var sender=message.sender;postMessage=function(data){wp.sendMessage(data,sender)
};onmessage({data:message.body})};__GLOBAL__.importScripts=function(){var global=this;
var src="";var i=0;var load=function(url,callback){var request=google.gears.factory.create("beta.httprequest");
request.open("GET",url);request.onreadystatechange=function(){if(request.readyState==4){if(request.status>=200&&request.status<400){var res=request.responseText;
src+=res+"\n";callback()}else{throw new Error("Error fetching script "+url+". Response code: "+request.status+" Response text: "+request.responseText)
}}};request.send()};var urls=Array.prototype.splice.call(arguments,0);var loader=function(){var url=urls.shift();
if(url){load(url,loader)}else{try{global.eval(src)}catch(e){console.log("Error evaluating source ",e)
}loadDone()}};loader()}}if(typeof importScripts=="undefined"){EMULATE_LOAD=true;var loadCounter=0;
__GLOBAL__.importScripts=function(){for(var i=0;i<arguments.length;++i){var script=arguments[i];
postMessage(internalMessageIdentifier+"["+(SCRIPT_COUNT++)+", '"+script+"']");++loadCounter
}};var loaded=[];var nextLoad=0;__GLOBAL__.__evalScriptFromImport=function(index,source){loaded[index]=source;
for(var i=nextLoad;i<loaded.length;++i){if(loaded[i]){nextLoad=i+1;try{__GLOBAL__.eval(loaded[i])
}catch(e){console.log("Error evaluating script from import: ",e)}if(loadCounter==i){loadDone()
}}else{break}}}}if(!NATIVE_JSON){origPostMessage=postMessage;postMessage=function(data){if(typeof data!="string"){data=JSON.stringify(data)
}origPostMessage(data)}}onmessage=function(event){var body=event.data;var dataIsString=false;
if(typeof body=="string"){if(body.indexOf("// YOUcannotGuessMe")==0){if(EMULATE_LOAD){__GLOBAL__.__evalScriptFromImport(SCRIPT_COUNT++,body)
}else{try{__GLOBAL__.eval(body)}catch(e){console.log("Unable to evaluate onmessage() "+e)
}loadDone()}return}else{if(body.indexOf("__IMPORT_SCRIPT__")==0){var source=body.substr("__IMPORT_SCRIPT__".length);
var match=source.match(/^\/\/(\d+)/);if(match){var index=parseInt(match[1],10);__evalScriptFromImport(index,source)
}return}else{dataIsString=true;try{body=JSON.parse(body)}catch(e){throw e+""+body
}}}}if(body.event){bespin.receive(body);return}var method=body.method;var o=theObject;
var ret=o[body.method].apply(o,body.paras);var data={method:body.method,returnValue:ret,callIndex:body.callIndex};
postMessage(data)};var eventIndex=0;var eventCallbacks=[];bespin={subscribe:function(name,callback){postMessage({type:"subscribe",name:name,index:eventIndex});
eventCallbacks[eventIndex]=function(){callback.apply(this,arguments)};eventIndex++
},publish:function(name,event){postMessage({type:"publish",name:name,event:event})
},receive:function(info){eventCallbacks[info.index](info.event)}};if(!this.JSON){JSON=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"
};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}if(typeof value.toJSON==="function"){return stringify(value.toJSON())
}a=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){l=value.length;
for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||"null")}return"["+a.join(",")+"]"
}if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==="string"){v=stringify(value[k],whitelist);
if(v){a.push(stringify(k)+":"+v)}}}}else{for(k in value){if(typeof k==="string"){v=stringify(value[k],whitelist);
if(v){a.push(stringify(k)+":"+v)}}}}return"{"+a.join(",")+"}"}}return{stringify:stringify,parse:function(text,filter){var j;
function walk(k,v){var i,n;if(v&&typeof v==="object"){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);
if(n!==undefined){v[i]=n}else{delete v[i]}}}}return filter(k,v)}if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof filter==="function"?walk("",j):j}throw new SyntaxError("parseJSON")
}}}()}});tiki.module("bespin:util/canvas",function(b,a,c){a.fix=function(d){if(!d.fillText&&d.mozDrawText){d.fillText=function(g,e,h,f){d.translate(e,h);
d.mozTextStyle=d.font;d.mozDrawText(g);d.translate(-e,-h)}}if(!d.measureText&&d.mozMeasureText){d.measureText=function(f){if(d.font){d.mozTextStyle=d.font
}var e=d.mozMeasureText(f);return{width:e}}}if(d.measureText&&!d.html5MeasureText){d.html5MeasureText=d.measureText;
d.measureText=function(f){var e=d.html5MeasureText(f);e.ascent=d.html5MeasureText("m").width;
return e}}if(!d.fillText){d.fillText=function(){}}if(!d.measureText){d.measureText=function(){return 10
}}return d}});tiki.module("bespin:util/clipboard",function(d,f,b){var c=d("sproutcore/runtime:package").SC;
var h=d("util/util");var j=d("util/keys");var e=null;f.setup=function(k){if(e){e.uninstall()
}if(false&&h.isWebKit){e=a.create({editorWrapper:k});e.install()}else{e=i.create({editorWrapper:k});
e.install()}};var g=c.Object.extend({_hasFocus:false,init:function(){this.textarea=document.createElement("textarea");
this.textarea.className="bespin-clipboardproxy";this.textarea.tabIndex=-1;this.textarea.style.position="absolute";
this.textarea.style.zIndex="999";this.textarea.style.top="-10000px";this.textarea.style.width=0;
this.textarea.style.height=0;document.body.appendChild(this.textarea)},takeFocus:function(k){k=k||"Hello";
this.textarea.value=k;this.textarea.focus();this.textarea.select();this._hasFocus=true
},hasFocus:function(k){return this._hasFocus},focusLost:function(){this._hasFocus=false
},getValue:function(){return this.textarea.value},dispose:function(){document.body.removeChild(this.textarea)
}});var a=c.Object.extend({editorWrapper:null,install:function(){var m=g.create();
var l=document;var k=function(q){if(!this.editorWrapper.hasFocus()){return}q.preventDefault();
m.takeFocus()}.bind(this);l.addEventListener("beforecopy",k,false);l.addEventListener("beforecut",k,false);
var n=function(q){if(!m.hasFocus()){return}var r=this.editorWrapper.getSelection();
if(r&&r!=""){q.clipboardData.setData("text/plain",r)}console.log("onCopy",q,r);this.editorWrapper.focus();
m.focusLost();h.stopEvent(q)}.bind(this);l.addEventListener("copy",n);var o=function(q){if(!m.hasFocus()){return
}var r=this.editorWrapper.removeSelection();if(r){q.clipboardData.setData("text/plain",r)
}console.log("onCut",q,r);this.editorWrapper.focus();m.focusLost();h.stopEvent(q)
}.bind(this);l.addEventListener("cut",o);var p=function(q){if(!this.editorWrapper.hasFocus()){return
}var r=q.clipboardData.getData("text/plain");this.editorWrapper.replaceSelection(r);
console.log("onPaste",q,r);this.editorWrapper.focus();m.focusLost();h.stopEvent(q)
}.bind(this);l.addEventListener("paste",p);this.uninstall=function(){l.removeEventListener("beforecopy",k,false);
l.removeEventListener("beforecut",k,false);l.removeEventListener("beforepaste",k,false);
l.removeEventListener("copy",n,false);l.removeEventListener("cut",o,false);l.removeEventListener("paste",p,false);
m.dispose()}},uninstall:function(){}});var i=c.Object.extend({editorWrapper:null,install:function(){this.proxy=g.create();
var k=function(m){var n;if((h.isMac&&m.metaKey)||m.ctrlKey){if(m.keyCode==j.Key.C){n=this.editorWrapper.getSelection();
if(n&&n!=""){this.copyToClipboard(n)}}else{if(m.keyCode==j.Key.X){n=this.editorWrapper.removeSelection();
this.copyToClipboard(n)}else{if(m.keyCode==j.Key.V){this.pasteFromClipboard()}}}}}.bind(this);
var l=this.editorWrapper.getFocusElement();l.addEventListener("keydown",k,false);
this.uninstall=function(){l.removeEventListener("keydown",k,false);this.proxy.dispose()
}},copyToClipboard:function(k){this.proxy.takeFocus(k);setTimeout(function(){this.editorWrapper.focus()
}.bind(this),10)},pasteFromClipboard:function(){this.proxy.takeFocus();setTimeout(function(){var k=this.proxy.getValue();
this.editorWrapper.replaceSelection(k);this.editorWrapper.focus()}.bind(this),0)},uninstall:function(){}});
f.manual=function(){var l;var k=window.netscape?netscape.security.PrivilegeManager:null;
return{copy:function(r){try{if(k.enablePrivilege){k.enablePrivilege("UniversalXPConnect")
}else{l=r;return}}catch(n){l=r;return}var q=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
q.data=r;var m=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
if(!m){return false}m.addDataFlavor("text/unicode");m.setTransferData("text/unicode",q,r.length*2);
var p=Components.interfaces.nsIClipboard;var o=Components.classes["@mozilla.org/widget/clipboard;1"].getService(p);
if(!o){return false}o.setData(m,null,p.kGlobalClipboard)},data:function(){try{if(privilegeManager.enablePrivilege){privilegeManager.enablePrivilege("UniversalXPConnect")
}else{return l}}catch(n){return l}var p=Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
if(!p){return false}var m=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
if(!m){return false}m.addDataFlavor("text/unicode");p.getData(m,p.kGlobalClipboard);
var r={};var o={};var q="";m.getTransferData("text/unicode",r,o);if(r){r=r.value.QueryInterface(Components.interfaces.nsISupportsString)
}if(r){q=r.data.substring(0,o.value/2)}return q}}}()});tiki.module("bespin:util/container",function(d,b,e){var a=d("util/util");
var c={};b.register=function(j,m){c[j]=m;console.log("container.register",j,m);if(m.requires){var k={};
for(var p in m.requires){if(m.requires.hasOwnProperty(p)){var i=m.requires[p];k[p]=i
}}var n=function(){var r=0;for(var q in k){if(m.requires.hasOwnProperty(p)){r++}}if(r==0){if(m.afterContainerSetup){m.afterContainerSetup()
}}};n();for(var p in k){if(m.requires.hasOwnProperty(p)){var i=k[p];var l=function(q){m[p]=q;
b.register(i,q);delete k[p];n()};var h=m.requires[i];var o=b.get(h);if(o){l(o)}else{g(i,l)
}}}}return m};b.unregister=function(h){delete c[h]};b.get=function(h){return c[h]
};b.getComponent=function(l,k,i){i=i||window;var h=b.get(l);if(h){k.call(i,h)}else{var j=function(m){b.register(l,m);
k.call(i,m)};g(l,j)}};b.dummyFactory=function(h){h({})};var f=d;function g(m,j){var h=b.factories[m];
if(!h){console.error("No component ",m)}else{if(a.isFunction(h)){h(j)}else{var k=h.split(":");
if(k.length!=2){console.error("Can't split ",h,"into 2 parts on ':'")}else{var i=f(k[0]);
var l=i[k[1]];if(a.isFunction(l)){l(j)}else{j(l)}}}}}b.factories={settings:"settings:factory",session:"util/container:dummyFactory",file:"util/container:dummyFactory",popup:function(h){b.plugins.loadOne("popup",function(i){h(new i.Window())
})},piemenu:function(h){b.plugins.loadOne("piemenu",function(j){var i=new j.Window();
setTimeout(function(){h(i)},25)})},commandLine:function(h){h({})},debugbar:function(h){b.plugins.loadOne("debugbar",function(i){h(new i.EvalCommandLineInterface("debugbar_command",null,{idPrefix:"debugbar_",parentElement:document.getElementById("debugbar")}))
})},breakpoints:function(h){b.plugins.loadOne("breakpoints",function(i){h(new i())
})}}});tiki.module("bespin:util/cookie",function(c,b,d){var a=function(f,e){return f.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(g){if(e&&e.indexOf(g)!=-1){return g
}return"\\"+g})};b.get=function(e){var g=new RegExp("(?:^|; )"+a(e)+"=([^;]*)");var f=document.cookie.match(g);
return f?decodeURIComponent(f[1]):undefined};b.set=function(g,j,h){h=h||{};if(typeof h.expires=="number"){var f=new Date();
f.setTime(f.getTime()+h.expires*24*60*60*1000);h.expires=f}if(h.expires&&h.expires.toUTCString){h.expires=h.expires.toUTCString()
}j=encodeURIComponent(j);var e=g+"="+j,i;for(i in h){e+="; "+i;var k=h[i];if(k!==true){e+="="+k
}}document.cookie=e};b.remove=function(e){b.set(e,"",{expires:-1})};b.isSupported=function(){if(!("cookieEnabled" in navigator)){b.set("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=b.get("__djCookieTest__")=="CookiesAllowed";if(navigator.cookieEnabled){b.remove("__djCookieTest__")
}}return navigator.cookieEnabled}});tiki.module("bespin:util/globals",function(b,a,d){var e=b("sproutcore/runtime:package").SC;
if(!Array.isArray){Array.isArray=function(f){return(f&&Object.prototype.toString.call(f)=="[object Array]")
}}e.Object.prototype.sc_super=function c(){c.caller.base.apply(this,c.caller.arguments)
}});tiki.module("bespin:util/hub",function(b,a,d){var e={};var c={};a.publish=function(g,f){if(window.globalStorage&&window.globalStorage[location.hostname]&&window.globalStorage[location.hostname].debug){console.log("Publish",g,f)
}c[g]=true;var g="bespin:"+g;f=Array.isArray(f)?f:[f||{}];var h=e[g];if(h){h.apply(null,f)
}};a.subscribe=function(f,l,h){var f="bespin:"+f;var g=l.bind(h);var j=e[f];if(!j||!j._listeners){var i=j;
var j=function(){var n=arguments.callee._listeners;var p=arguments.callee.target;
var o=p&&p.apply(this,arguments);var n=[].concat(n);for(var m in n){if(!(m in Array.prototype)){n[m].apply(this,arguments)
}}return o};j.target=i;j._listeners=[];e[f]=j}var k=j._listeners.push(g);return[f,k]
};a.unsubscribe=function(i){if(i){var f=i[0];var h=i[1];var g=e[f];if(g&&g._listeners&&h--){delete g._listeners[h]
}}};a.fireAfter=function(l,k){if(!Array.isArray(l)){throw new Error("fireAfter() takes an array of topics. '"+l+"' is not an array.")
}var j=l.length;var f=function(){if(j==0){k()}};for(var h=0;h<l.length;++h){var g=l[h];
if(c[g]){--j}else{a.subscribe(g,function(){--j;f()})}f()}}});tiki.module("bespin:util/keys",function(d,c,f){var a=d("util/util");
c.Key={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:a.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:a.isMac&&!a.isAIR?(a.isSafari?91:224):17,FORWARD_SLASH:191,TILDE:192,SQUARE_BRACKET_OPEN:219,BACK_SLASH:220,SQUARE_BRACKET_CLOSE:221,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};
c.KeyCodeToName={};for(var e in c.Key){var g=c.Key[e];if(typeof g=="number"){c.KeyCodeToName[g]=e
}}c.toKeyCode=function(h){return c.Key[h.toUpperCase()]};c.fillArguments=function(i,h){var j=i.split(" ");
h=h||{};h.key=j.pop();if(j.length==0){h.modifiers="none"}else{h.modifiers=j.join(",")
}return h};var b=["k","l","n","o","t","w","+","-","~","0","1","2","3","4","5","6","7","8","9"];
c.PassThroughCharCodes=b.map(function(h){return h.charCodeAt(0)});c.PassThroughKeyCodes=(function(){return[c.Key.C,c.Key.X,c.Key.V,c.Key.K,c.Key.L,c.Key.N,c.Key.O,c.Key.T,c.Key.W,c.Key.NUMPAD_PLUS,c.Key.NUMPAD_MINUS,c.Key.TILDE,c.Key.ZERO,c.Key.ONE,c.Key.TWO,c.Key.THREE,c.Key.FOUR,c.Key.FIVE,c.Key.SIX,c.Key.SEVEN,c.Key.EIGHT,c.Key.NINE]
})();c.passThroughToBrowser=function(i){if(!i.ctrlKey){return true}else{if(i.metaKey||i.altKey||i.ctrlKey){if(i.type=="keypress"){var h=c.PassThroughCharCodes.some(function(j){return(j==i.charCode)
});if(h){return true}}else{var h=c.PassThroughKeyCodes.some(function(j){return(j==i.keyCode)
});if(h){return true}}}}return false}});tiki.module("bespin:util/mousewheelevent",function(b,a,c){var d=b("sproutcore/runtime:package").SC;
d.mixin(a,{wheel:function(e){var f=0;if(!e){e=window.event}if(e.wheelDelta){f=-e.wheelDelta/40;
if(window.opera&&window.opera.version()<9.2){f=-f}}else{if(e.detail){f=e.detail}}return f
},axis:function(f){var e="vertical";if(f.axis){if(f.axis==f.HORIZONTAL_AXIS){e="horizontal"
}}else{if(f.wheelDeltaY||f.wheelDeltaX){if(f.wheelDeltaX==f.wheelDelta){e="horizontal"
}}else{if(f.shiftKey){e="horizontal"}}}return e}})});tiki.module("bespin:util/path",function(b,a,c){a.combine=function(){var d=Array.prototype.slice.call(arguments);
var e=d.join("/");e=e.replace(/\/\/+/g,"/");e=e.replace(/^\s+|\s+$/g,"");return e
};a.directory=function(e){var d=e.split("/");if(d.length==1){return""}else{if((d.length==2)&&d[d.length-1]==""){return e
}else{return d.slice(0,d.length-1).join("/")}}};a.makeDirectory=function(d){if(!/\/$/.test(d)){d+="/"
}return d};a.combineAsDirectory=function(){return this.makeDirectory(this.combine.apply(this,arguments))
};a.escape=function(){return escape(this.combine.apply(this,arguments))};a.trimLeadingSlash=function(d){if(d.indexOf("/")==0){d=d.substring(1,d.length)
}return d},a.fileType=function(e){if(e.indexOf(".")>=0){var d=e.split(".");if(d.length>1){return d[d.length-1]
}}}});tiki.module("bespin:util/tokenobject",function(c,a,d){var b=c("package");a.TokenObject=SC.Object.extend({input:null,options:{},init:function(){this._splitterRegex=new RegExp(this.options.splitBy||"\\s+");
this.pieces=this.tokenize(this.input.split(this._splitterRegex));if(this.options.params){this._nametoindex={};
var f=this.options.params.split(" ");for(var e=0;e<f.length;e++){this._nametoindex[f[e]]=e;
if(!this.options.noshortcutvalues){this[f[e]]=this.pieces[e]}}}arguments.callee.base.apply(this,arguments)
},tokenize:function(f){var i=[];var e;while(e=f.shift()){if(e[0]=='"'||e[0]=="'"){var h=[e.substring(1,e.length)];
var g;while(g=f.shift()){if(g[g.length-1]=='"'||g[g.length-1]=="'"){h.push(g.substring(0,g.length-1));
break}else{h.push(g)}}i.push(h.join(" "))}else{i.push(e)}}return i},param:function(e){return(typeof e=="number")?this.pieces[e]:this.pieces[this._nametoindex[e]]
},length:function(){return this.pieces.length}})});tiki.module("bespin:util/util",function(d,b,f){b.queryToObject=function(l,k){var j={};
var i=l.split(k||"&");var m=decodeURIComponent;i.forEach(function(o){if(o.length){var p=o.split("=");
var n=m(p.shift());var q=m(p.join("="));if(b.isString(j[n])){j[n]=[j[n]]}if(Array.isArray(j[n])){j[n].push(q)
}else{j[n]=q}}});return j};var g=0;var a={};b.rateLimit=function(i,j,k){if(i){var l=g++;
return function(){if(a[l]){clearTimeout(a[l])}a[l]=setTimeout(function(){k.apply(j,arguments);
delete a[l]},i)}}};b.isString=function(i){return(typeof i=="string"||i instanceof String)
};b.isFunction=(function(){var i=function(k){var j=typeof k;return k&&(j=="function"||k instanceof Function)&&!k.nodeType
};return b.isSafari?function(j){if(typeof j=="function"&&j=="[object NodeList]"){return false
}return i(j)}:i})();b.endsWith=function(j,i){return j.match(new RegExp(i+"$"))};b.include=function(j,i){return j.indexOf(i)>-1
};b.indexOfProperty=function(m,j,l){for(var k=0;k<m.length;k++){if(m[k][j]==l){return k
}}return null};b.last=function(i){if(Array.isArray(i)){return i[i.length-1]}};b.shrinkArray=function(k){var i=[];
var j=true;k.reverse().forEach(function(l){if(j&&l===undefined){return}j=false;i.push(l)
});return i.reverse()};b.makeArray=function(l,m){if(l<1){return[]}if(!m){m=" "}var j=[];
for(var k=0;k<l;k++){j.push(m)}return j};b.repeatString=function(j,m){var l="";for(var k=0;
k<m;k++){l+=j}return l};b.leadingSpaces=function(l){var j=0;for(var k=0;k<l.length;
k++){if(l[k]==" "||l[k]==""||l[k]===undefined){j++}else{return j}}return j};b.leadingTabs=function(l){var k=0;
for(var j=0;j<l.length;j++){if(l[j]=="\t"||l[j]==""||l[j]===undefined){k++}else{return k
}}return k};b.leadingWhitespace=function(l){var k=[];for(var j=0;j<l.length;j++){if(l[j]==" "||l[j]=="\t"||l[j]==""||l[j]===undefined){k.push(l[j])
}else{return k}}return k};b.englishFromCamel=function(i){i.replace(/([A-Z])/g,function(j){return" "+j.toLowerCase()
}).trim()};b.OS={LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"};var e=navigator.userAgent;
var h=navigator.appVersion;b.isLinux=h.indexOf("Linux")>=0;b.isWindows=h.indexOf("Win")>=0;
b.isWebKit=parseFloat(e.split("WebKit/")[1])||undefined;b.isChrome=parseFloat(e.split("Chrome/")[1])||undefined;
b.isMac=h.indexOf("Macintosh")>=0;if(e.indexOf("AdobeAIR")>=0){b.isAIR=1}var c=Math.max(h.indexOf("WebKit"),h.indexOf("Safari"),0);
if(c&&!b.isChrome){b.isSafari=parseFloat(h.split("Version/")[1]);if(!b.isSafari||parseFloat(h.substr(c+7))<=419.3){b.isSafari=2
}}if(e.indexOf("Gecko")>=0&&!b.isWebKit){b.isMozilla=parseFloat(h)}b.getOS=function(){if(b.isMac){return b.OS.MAC
}else{if(b.isLinux){return b.OS.LINUX}else{return b.OS.WINDOWS}}};b.contains=document.compareDocumentPosition?function(j,i){return j.compareDocumentPosition(i)&16
}:function(j,i){return j!==i&&(j.contains?j.contains(i):true)};b.stopEvent=function(i){i.preventDefault();
i.stopPropagation()};b.randomPassword=function(l){l=l||16;var k="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
var j="";for(var i=0;i<l;i++){var m=Math.floor(Math.random()*k.length);j+=k.charAt(m)
}return j};b.isEmpty=function(j){for(var i in j){if(j.hasOwnProperty(i)){return false
}}return true};b.isMyProject=function(i){return i.indexOf("+")==-1};b.formatDate=function(i){if(!i){return"Unknown"
}return i.getDate()+" "+b.formatDate.shortMonths[i.getMonth()]+" "+i.getFullYear()
};b.formatDate.shortMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
});tiki.script("bespin:en/614012e975a60c9ae7e6ad329e6fe36808d1e2a7/javascript.js");tiki.require("bespin:boot");