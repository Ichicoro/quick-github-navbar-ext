// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3fApi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
// eslint-disable-next-line import/no-unassigned-import
var _webextBaseCss = require("webext-base-css");
var _optionsCss = require("./options.css");
// Don't forget to import this wherever you use it
var _webextensionPolyfill = require("webextension-polyfill");
var _webextensionPolyfillDefault = parcelHelpers.interopDefault(_webextensionPolyfill);
var _optionsStorageJs = require("./options-storage.js");
var _optionsStorageJsDefault = parcelHelpers.interopDefault(_optionsStorageJs);
const rangeInputs = [
    ...document.querySelectorAll('input[type="range"][name^="color"]')
];
const numberInputs = [
    ...document.querySelectorAll('input[type="number"][name^="color"]')
];
const output = document.querySelector(".color-output");
function updateOutputColor() {
    output.style.backgroundColor = `rgb(${rangeInputs[0].value}, ${rangeInputs[1].value}, ${rangeInputs[2].value})`;
}
function updateInputField(event) {
    numberInputs[rangeInputs.indexOf(event.currentTarget)].value = event.currentTarget.value;
}
for (const input of rangeInputs){
    input.addEventListener("input", updateOutputColor);
    input.addEventListener("input", updateInputField);
}
async function init() {
    await (0, _optionsStorageJsDefault.default).syncForm("#options-form");
    updateOutputColor();
}
init();

},{"webext-base-css":"hUchq","./options.css":"c1KMF","webextension-polyfill":"kPFTQ","./options-storage.js":"5VeG8","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"hUchq":[function() {},{}],"c1KMF":[function() {},{}],"kPFTQ":[function(require,module,exports) {
(function(global, factory) {
    if (typeof define === "function" && define.amd) define("webextension-polyfill", [
        "module"
    ], factory);
    else {
        var mod;
        factory(module);
    }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function(module) {
    /* webextension-polyfill - v0.8.0 - Tue Apr 20 2021 11:27:38 */ /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */ /* vim: set sts=2 sw=2 et tw=80: */ /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */ "use strict";
    if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
        // optimization for Firefox. Since Spidermonkey does not fully parse the
        // contents of a function until the first time it's called, and since it will
        // never actually need to be called, this allows the polyfill to be included
        // in Firefox nearly for free.
        const wrapAPIs = (extensionAPIs)=>{
            // NOTE: apiMetadata is associated to the content of the api-metadata.json file
            // at build time by replacing the following "include" with the content of the
            // JSON file.
            const apiMetadata = {
                "alarms": {
                    "clear": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "clearAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "get": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "bookmarks": {
                    "create": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getChildren": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getRecent": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getSubTree": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getTree": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "move": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeTree": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "search": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                },
                "browserAction": {
                    "disable": {
                        "minArgs": 0,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "enable": {
                        "minArgs": 0,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "getBadgeBackgroundColor": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getBadgeText": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getPopup": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getTitle": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "openPopup": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "setBadgeBackgroundColor": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setBadgeText": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setIcon": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "setPopup": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setTitle": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    }
                },
                "browsingData": {
                    "remove": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "removeCache": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeCookies": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeDownloads": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeFormData": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeHistory": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeLocalStorage": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removePasswords": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removePluginData": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "settings": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "commands": {
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "contextMenus": {
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                },
                "cookies": {
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAllCookieStores": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "set": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "devtools": {
                    "inspectedWindow": {
                        "eval": {
                            "minArgs": 1,
                            "maxArgs": 2,
                            "singleCallbackArg": false
                        }
                    },
                    "panels": {
                        "create": {
                            "minArgs": 3,
                            "maxArgs": 3,
                            "singleCallbackArg": true
                        },
                        "elements": {
                            "createSidebarPane": {
                                "minArgs": 1,
                                "maxArgs": 1
                            }
                        }
                    }
                },
                "downloads": {
                    "cancel": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "download": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "erase": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getFileIcon": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "open": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "pause": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeFile": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "resume": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "search": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "show": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    }
                },
                "extension": {
                    "isAllowedFileSchemeAccess": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "isAllowedIncognitoAccess": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "history": {
                    "addUrl": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "deleteAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "deleteRange": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "deleteUrl": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getVisits": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "search": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "i18n": {
                    "detectLanguage": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAcceptLanguages": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "identity": {
                    "launchWebAuthFlow": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "idle": {
                    "queryState": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "management": {
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getSelf": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "setEnabled": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "uninstallSelf": {
                        "minArgs": 0,
                        "maxArgs": 1
                    }
                },
                "notifications": {
                    "clear": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "create": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getPermissionLevel": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                },
                "pageAction": {
                    "getPopup": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getTitle": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "hide": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setIcon": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "setPopup": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setTitle": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "show": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    }
                },
                "permissions": {
                    "contains": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "request": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "runtime": {
                    "getBackgroundPage": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getPlatformInfo": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "openOptionsPage": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "requestUpdateCheck": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "sendMessage": {
                        "minArgs": 1,
                        "maxArgs": 3
                    },
                    "sendNativeMessage": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "setUninstallURL": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "sessions": {
                    "getDevices": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getRecentlyClosed": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "restore": {
                        "minArgs": 0,
                        "maxArgs": 1
                    }
                },
                "storage": {
                    "local": {
                        "clear": {
                            "minArgs": 0,
                            "maxArgs": 0
                        },
                        "get": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "getBytesInUse": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "remove": {
                            "minArgs": 1,
                            "maxArgs": 1
                        },
                        "set": {
                            "minArgs": 1,
                            "maxArgs": 1
                        }
                    },
                    "managed": {
                        "get": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "getBytesInUse": {
                            "minArgs": 0,
                            "maxArgs": 1
                        }
                    },
                    "sync": {
                        "clear": {
                            "minArgs": 0,
                            "maxArgs": 0
                        },
                        "get": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "getBytesInUse": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "remove": {
                            "minArgs": 1,
                            "maxArgs": 1
                        },
                        "set": {
                            "minArgs": 1,
                            "maxArgs": 1
                        }
                    }
                },
                "tabs": {
                    "captureVisibleTab": {
                        "minArgs": 0,
                        "maxArgs": 2
                    },
                    "create": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "detectLanguage": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "discard": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "duplicate": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "executeScript": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getCurrent": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getZoom": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getZoomSettings": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "goBack": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "goForward": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "highlight": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "insertCSS": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "move": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "query": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "reload": {
                        "minArgs": 0,
                        "maxArgs": 2
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeCSS": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "sendMessage": {
                        "minArgs": 2,
                        "maxArgs": 3
                    },
                    "setZoom": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "setZoomSettings": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "update": {
                        "minArgs": 1,
                        "maxArgs": 2
                    }
                },
                "topSites": {
                    "get": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "webNavigation": {
                    "getAllFrames": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getFrame": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "webRequest": {
                    "handlerBehaviorChanged": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "windows": {
                    "create": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getCurrent": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getLastFocused": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                }
            };
            if (Object.keys(apiMetadata).length === 0) throw new Error("api-metadata.json has not been included in browser-polyfill");
            /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */ class DefaultWeakMap extends WeakMap {
                constructor(createItem, items){
                    super(items);
                    this.createItem = createItem;
                }
                get(key) {
                    if (!this.has(key)) this.set(key, this.createItem(key));
                    return super.get(key);
                }
            }
            /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */ const isThenable = (value)=>{
                return value && typeof value === "object" && typeof value.then === "function";
            };
            /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */ const makeCallback = (promise, metadata)=>{
                return (...callbackArgs)=>{
                    if (extensionAPIs.runtime.lastError) promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                    else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) promise.resolve(callbackArgs[0]);
                    else promise.resolve(callbackArgs);
                };
            };
            const pluralizeArguments = (numArgs)=>numArgs == 1 ? "argument" : "arguments";
            /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */ const wrapAsyncFunction = (name, metadata)=>{
                return function asyncFunctionWrapper(target, ...args) {
                    if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                    if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                    return new Promise((resolve, reject)=>{
                        if (metadata.fallbackToNoCallback) // This API method has currently no callback on Chrome, but it return a promise on Firefox,
                        // and so the polyfill will try to call it with a callback first, and it will fallback
                        // to not passing the callback if the first call fails.
                        try {
                            target[name](...args, makeCallback({
                                resolve,
                                reject
                            }, metadata));
                        } catch (cbError) {
                            console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                            target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                            // use the unsupported callback anymore.
                            metadata.fallbackToNoCallback = false;
                            metadata.noCallback = true;
                            resolve();
                        }
                        else if (metadata.noCallback) {
                            target[name](...args);
                            resolve();
                        } else target[name](...args, makeCallback({
                            resolve,
                            reject
                        }, metadata));
                    });
                };
            };
            /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */ const wrapMethod = (target, method, wrapper)=>{
                return new Proxy(method, {
                    apply (targetMethod, thisObj, args) {
                        return wrapper.call(thisObj, target, ...args);
                    }
                });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */ const wrapObject = (target, wrappers = {}, metadata = {})=>{
                let cache = Object.create(null);
                let handlers = {
                    has (proxyTarget, prop) {
                        return prop in target || prop in cache;
                    },
                    get (proxyTarget, prop, receiver) {
                        if (prop in cache) return cache[prop];
                        if (!(prop in target)) return undefined;
                        let value1 = target[prop];
                        if (typeof value1 === "function") {
                            // This is a method on the underlying object. Check if we need to do
                            // any wrapping.
                            if (typeof wrappers[prop] === "function") // We have a special-case wrapper for this method.
                            value1 = wrapMethod(target, target[prop], wrappers[prop]);
                            else if (hasOwnProperty(metadata, prop)) {
                                // This is an async method that we have metadata for. Create a
                                // Promise wrapper for it.
                                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                                value1 = wrapMethod(target, target[prop], wrapper);
                            } else // This is a method that we don't know or care about. Return the
                            // original method, bound to the underlying object.
                            value1 = value1.bind(target);
                        } else if (typeof value1 === "object" && value1 !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) // This is an object that we need to do some wrapping for the children
                        // of. Create a sub-object wrapper for it with the appropriate child
                        // metadata.
                        value1 = wrapObject(value1, wrappers[prop], metadata[prop]);
                        else if (hasOwnProperty(metadata, "*")) // Wrap all properties in * namespace.
                        value1 = wrapObject(value1, wrappers[prop], metadata["*"]);
                        else {
                            // We don't need to do any wrapping for this property,
                            // so just forward all access to the underlying object.
                            Object.defineProperty(cache, prop, {
                                configurable: true,
                                enumerable: true,
                                get () {
                                    return target[prop];
                                },
                                set (value) {
                                    target[prop] = value;
                                }
                            });
                            return value1;
                        }
                        cache[prop] = value1;
                        return value1;
                    },
                    set (proxyTarget, prop, value, receiver) {
                        if (prop in cache) cache[prop] = value;
                        else target[prop] = value;
                        return true;
                    },
                    defineProperty (proxyTarget, prop, desc) {
                        return Reflect.defineProperty(cache, prop, desc);
                    },
                    deleteProperty (proxyTarget, prop) {
                        return Reflect.deleteProperty(cache, prop);
                    }
                }; // Per contract of the Proxy API, the "get" proxy handler must return the
                // original value of the target if that value is declared read-only and
                // non-configurable. For this reason, we create an object with the
                // prototype set to `target` instead of using `target` directly.
                // Otherwise we cannot return a custom object for APIs that
                // are declared read-only and non-configurable, such as `chrome.devtools`.
                //
                // The proxy handlers themselves will still use the original `target`
                // instead of the `proxyTarget`, so that the methods and properties are
                // dereferenced via the original targets.
                let proxyTarget = Object.create(target);
                return new Proxy(proxyTarget, handlers);
            };
            /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */ const wrapEvent = (wrapperMap)=>({
                    addListener (target, listener, ...args) {
                        target.addListener(wrapperMap.get(listener), ...args);
                    },
                    hasListener (target, listener) {
                        return target.hasListener(wrapperMap.get(listener));
                    },
                    removeListener (target, listener) {
                        target.removeListener(wrapperMap.get(listener));
                    }
                });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener)=>{
                if (typeof listener !== "function") return listener;
                /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */ return function onRequestFinished(req) {
                    const wrappedReq = wrapObject(req, {}, {
                        getContent: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    });
                    listener(wrappedReq);
                };
            }); // Keep track if the deprecation warning has been logged at least once.
            let loggedSendResponseDeprecationWarning = false;
            const onMessageWrappers = new DefaultWeakMap((listener)=>{
                if (typeof listener !== "function") return listener;
                /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */ return function onMessage(message1, sender, sendResponse) {
                    let didCallSendResponse = false;
                    let wrappedSendResponse;
                    let sendResponsePromise = new Promise((resolve)=>{
                        wrappedSendResponse = function(response) {
                            if (!loggedSendResponseDeprecationWarning) {
                                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                                loggedSendResponseDeprecationWarning = true;
                            }
                            didCallSendResponse = true;
                            resolve(response);
                        };
                    });
                    let result;
                    try {
                        result = listener(message1, sender, wrappedSendResponse);
                    } catch (err1) {
                        result = Promise.reject(err1);
                    }
                    const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
                    // wrappedSendResponse synchronously, we can exit earlier
                    // because there will be no response sent from this listener.
                    if (result !== true && !isResultThenable && !didCallSendResponse) return false;
                     // A small helper to send the message if the promise resolves
                    // and an error if the promise rejects (a wrapped sendMessage has
                    // to translate the message into a resolved promise or a rejected
                    // promise).
                    const sendPromisedResult = (promise)=>{
                        promise.then((msg)=>{
                            // send the message value.
                            sendResponse(msg);
                        }, (error)=>{
                            // Send a JSON representation of the error if the rejected value
                            // is an instance of error, or the object itself otherwise.
                            let message;
                            if (error && (error instanceof Error || typeof error.message === "string")) message = error.message;
                            else message = "An unexpected error occurred";
                            sendResponse({
                                __mozWebExtensionPolyfillReject__: true,
                                message
                            });
                        }).catch((err)=>{
                            // Print an error on the console if unable to send the response.
                            console.error("Failed to send onMessage rejected reply", err);
                        });
                    }; // If the listener returned a Promise, send the resolved value as a
                    // result, otherwise wait the promise related to the wrappedSendResponse
                    // callback to resolve and send it as a response.
                    if (isResultThenable) sendPromisedResult(result);
                    else sendPromisedResult(sendResponsePromise);
                     // Let Chrome know that the listener is replying.
                    return true;
                };
            });
            const wrappedSendMessageCallback = ({ reject , resolve  }, reply)=>{
                if (extensionAPIs.runtime.lastError) {
                    // Detect when none of the listeners replied to the sendMessage call and resolve
                    // the promise to undefined as in Firefox.
                    // See https://github.com/mozilla/webextension-polyfill/issues/130
                    if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) resolve();
                    else reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (reply && reply.__mozWebExtensionPolyfillReject__) // Convert back the JSON representation of the error into
                // an Error instance.
                reject(new Error(reply.message));
                else resolve(reply);
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args)=>{
                if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                return new Promise((resolve, reject)=>{
                    const wrappedCb = wrappedSendMessageCallback.bind(null, {
                        resolve,
                        reject
                    });
                    args.push(wrappedCb);
                    apiNamespaceObj.sendMessage(...args);
                });
            };
            const staticWrappers = {
                devtools: {
                    network: {
                        onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                    }
                },
                runtime: {
                    onMessage: wrapEvent(onMessageWrappers),
                    onMessageExternal: wrapEvent(onMessageWrappers),
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                        minArgs: 1,
                        maxArgs: 3
                    })
                },
                tabs: {
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                        minArgs: 2,
                        maxArgs: 3
                    })
                }
            };
            const settingMetadata = {
                clear: {
                    minArgs: 1,
                    maxArgs: 1
                },
                get: {
                    minArgs: 1,
                    maxArgs: 1
                },
                set: {
                    minArgs: 1,
                    maxArgs: 1
                }
            };
            apiMetadata.privacy = {
                network: {
                    "*": settingMetadata
                },
                services: {
                    "*": settingMetadata
                },
                websites: {
                    "*": settingMetadata
                }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };
        if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
         // The build process adds a UMD wrapper around this file, which makes the
        // `module` variable available.
        module.exports = wrapAPIs(chrome);
    } else module.exports = browser;
});

},{}],"5VeG8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _webextOptionsSync = require("webext-options-sync");
var _webextOptionsSyncDefault = parcelHelpers.interopDefault(_webextOptionsSync);
exports.default = new (0, _webextOptionsSyncDefault.default)({
    defaults: {
        colorRed: 244,
        colorGreen: 67,
        colorBlue: 54,
        text: "Set a text!"
    },
    migrations: [
        (0, _webextOptionsSyncDefault.default).migrations.removeUnused, 
    ],
    logging: true
});

},{"webext-options-sync":"5Apzs","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"5Apzs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>OptionsSync);
var _webextDetectPage = require("webext-detect-page");
function throttle(delay, noTrailing, callback, debounceMode) {
    var timeoutID;
    var cancelled = false;
    var lastExec = 0;
    function clearExistingTimeout() {
        timeoutID && clearTimeout(timeoutID);
    }
    if ("boolean" != typeof noTrailing) {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = void 0;
    }
    function wrapper() {
        for(var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++)arguments_[_key] = arguments[_key];
        var self = this;
        var elapsed = Date.now() - lastExec;
        if (!cancelled) {
            debounceMode && !timeoutID && exec();
            clearExistingTimeout();
            void 0 === debounceMode && elapsed > delay ? exec() : true !== noTrailing && (timeoutID = setTimeout(debounceMode ? clear : exec, void 0 === debounceMode ? delay - elapsed : delay));
        }
        function exec() {
            lastExec = Date.now();
            callback.apply(self, arguments_);
        }
        function clear() {
            timeoutID = void 0;
        }
    }
    wrapper.cancel = function() {
        clearExistingTimeout();
        cancelled = true;
    };
    return wrapper;
}
class TypeRegistry {
    constructor(initial = {}){
        this.registeredTypes = initial;
    }
    get(type) {
        return void 0 !== this.registeredTypes[type] ? this.registeredTypes[type] : this.registeredTypes.default;
    }
    register(type, item) {
        void 0 === this.registeredTypes[type] && (this.registeredTypes[type] = item);
    }
    registerDefault(item) {
        this.register("default", item);
    }
}
class KeyExtractors extends TypeRegistry {
    constructor(options){
        super(options);
        this.registerDefault((el)=>el.getAttribute("name") || "");
    }
}
class InputReaders extends TypeRegistry {
    constructor(options1){
        super(options1);
        this.registerDefault((el)=>el.value);
        this.register("checkbox", (el)=>null !== el.getAttribute("value") ? el.checked ? el.getAttribute("value") : null : el.checked);
        this.register("select", (el)=>(function(elem) {
                var value, option, i;
                var options = elem.options;
                var index = elem.selectedIndex;
                var one = "select-one" === elem.type;
                var values = one ? null : [];
                var max = one ? index + 1 : options.length;
                i = index < 0 ? max : one ? index : 0;
                for(; i < max; i++)if (((option = options[i]).selected || i === index) && !option.disabled && !(option.parentNode.disabled && "optgroup" === option.parentNode.tagName.toLowerCase())) {
                    value = option.value;
                    if (one) return value;
                    values.push(value);
                }
                return values;
            })(el));
    }
}
class KeyAssignmentValidators extends TypeRegistry {
    constructor(options){
        super(options);
        this.registerDefault(()=>true);
        this.register("radio", (el)=>el.checked);
    }
}
function keySplitter(key) {
    let matches = key.match(/[^[\]]+/g);
    let lastKey;
    if (key.length > 1 && key.indexOf("[]") === key.length - 2) {
        lastKey = matches.pop();
        matches.push([
            lastKey
        ]);
    }
    return matches;
}
function getElementType(el) {
    let typeAttr;
    let tagName = el.tagName;
    let type = tagName;
    if ("input" === tagName.toLowerCase()) {
        typeAttr = el.getAttribute("type");
        type = typeAttr || "text";
    }
    return type.toLowerCase();
}
function getInputElements(element, options) {
    return Array.prototype.filter.call(element.querySelectorAll("input,select,textarea"), (el)=>{
        if ("input" === el.tagName.toLowerCase() && ("submit" === el.type || "reset" === el.type)) return false;
        let myType = getElementType(el);
        let identifier = options.keyExtractors.get(myType)(el);
        let foundInInclude = -1 !== (options.include || []).indexOf(identifier);
        let foundInExclude = -1 !== (options.exclude || []).indexOf(identifier);
        let foundInIgnored = false;
        let reject = false;
        if (options.ignoredTypes) for (let selector of options.ignoredTypes)el.matches(selector) && (foundInIgnored = true);
        reject = !foundInInclude && (!!options.include || foundInExclude || foundInIgnored);
        return !reject;
    });
}
function assignKeyValue(obj, keychain, value) {
    if (!keychain) return obj;
    var key = keychain.shift();
    obj[key] || (obj[key] = Array.isArray(key) ? [] : {});
    0 === keychain.length && (Array.isArray(obj[key]) ? null !== value && obj[key].push(value) : obj[key] = value);
    keychain.length > 0 && assignKeyValue(obj[key], keychain, value);
    return obj;
}
function serialize(element, options = {}) {
    let data = {};
    options.keySplitter = options.keySplitter || keySplitter;
    options.keyExtractors = new KeyExtractors(options.keyExtractors || {});
    options.inputReaders = new InputReaders(options.inputReaders || {});
    options.keyAssignmentValidators = new KeyAssignmentValidators(options.keyAssignmentValidators || {});
    Array.prototype.forEach.call(getInputElements(element, options), (el)=>{
        let type = getElementType(el);
        let key = options.keyExtractors.get(type)(el);
        let value = options.inputReaders.get(type)(el);
        if (options.keyAssignmentValidators.get(type)(el, key, value)) {
            let keychain = options.keySplitter(key);
            data = assignKeyValue(data, keychain, value);
        }
    });
    return data;
}
class InputWriters extends TypeRegistry {
    constructor(options){
        super(options);
        this.registerDefault((el, value)=>{
            el.value = value;
        });
        this.register("checkbox", (el, value)=>{
            null === value ? el.indeterminate = true : el.checked = Array.isArray(value) ? -1 !== value.indexOf(el.value) : value;
        });
        this.register("radio", function(el, value) {
            void 0 !== value && (el.checked = el.value === value.toString());
        });
        this.register("select", setSelectValue);
    }
}
function setSelectValue(elem, value) {
    var optionSet, option;
    var options = elem.options;
    var values = function(arr) {
        var ret = [];
        null !== arr && (Array.isArray(arr) ? ret.push.apply(ret, arr) : ret.push(arr));
        return ret;
    }(value);
    var i = options.length;
    for(; i--;){
        option = options[i];
        if (values.indexOf(option.value) > -1) {
            option.setAttribute("selected", true);
            optionSet = true;
        }
    }
    optionSet || (elem.selectedIndex = -1);
}
function keyJoiner(parentKey, childKey) {
    return parentKey + "[" + childKey + "]";
}
function flattenData(data, parentKey, options = {}) {
    let flatData = {};
    let keyJoiner$1 = options.keyJoiner || keyJoiner;
    for(let keyName in data){
        if (!data.hasOwnProperty(keyName)) continue;
        let value = data[keyName];
        let hash = {};
        parentKey && (keyName = keyJoiner$1(parentKey, keyName));
        if (Array.isArray(value)) {
            hash[keyName + "[]"] = value;
            hash[keyName] = value;
        } else "object" == typeof value ? hash = flattenData(value, keyName, options) : hash[keyName] = value;
        Object.assign(flatData, hash);
    }
    return flatData;
}
function deserialize(form, data, options = {}) {
    let flattenedData = flattenData(data, null, options);
    options.keyExtractors = new KeyExtractors(options.keyExtractors || {});
    options.inputWriters = new InputWriters(options.inputWriters || {});
    Array.prototype.forEach.call(getInputElements(form, options), (el)=>{
        let type = getElementType(el);
        let key = options.keyExtractors.get(type)(el);
        options.inputWriters.get(type)(el, flattenedData[key]);
    });
}
var lzString = {
    exports: {}
};
module = lzString, LZString = function() {
    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for(var i = 0; i < alphabet.length; i++)baseReverseDic[alphabet][alphabet.charAt(i)] = i;
        }
        return baseReverseDic[alphabet][character];
    }
    var LZString1 = {
        compressToBase64: function(input) {
            if (null == input) return "";
            var res = LZString1._compress(input, 6, function(a) {
                return keyStrBase64.charAt(a);
            });
            switch(res.length % 4){
                default:
                case 0:
                    return res;
                case 1:
                    return res + "===";
                case 2:
                    return res + "==";
                case 3:
                    return res + "=";
            }
        },
        decompressFromBase64: function(input) {
            return null == input ? "" : "" == input ? null : LZString1._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrBase64, input.charAt(index));
            });
        },
        compressToUTF16: function(input) {
            return null == input ? "" : LZString1._compress(input, 15, function(a) {
                return f(a + 32);
            }) + " ";
        },
        decompressFromUTF16: function(compressed) {
            return null == compressed ? "" : "" == compressed ? null : LZString1._decompress(compressed.length, 16384, function(index) {
                return compressed.charCodeAt(index) - 32;
            });
        },
        compressToUint8Array: function(uncompressed) {
            var compressed = LZString1.compress(uncompressed);
            var buf = new Uint8Array(2 * compressed.length);
            for(var i = 0, TotalLen = compressed.length; i < TotalLen; i++){
                var current_value = compressed.charCodeAt(i);
                buf[2 * i] = current_value >>> 8;
                buf[2 * i + 1] = current_value % 256;
            }
            return buf;
        },
        decompressFromUint8Array: function(compressed) {
            if (null == compressed) return LZString1.decompress(compressed);
            var buf = new Array(compressed.length / 2);
            for(var i = 0, TotalLen = buf.length; i < TotalLen; i++)buf[i] = 256 * compressed[2 * i] + compressed[2 * i + 1];
            var result = [];
            buf.forEach(function(c) {
                result.push(f(c));
            });
            return LZString1.decompress(result.join(""));
        },
        compressToEncodedURIComponent: function(input) {
            return null == input ? "" : LZString1._compress(input, 6, function(a) {
                return keyStrUriSafe.charAt(a);
            });
        },
        decompressFromEncodedURIComponent: function(input) {
            if (null == input) return "";
            if ("" == input) return null;
            input = input.replace(/ /g, "+");
            return LZString1._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrUriSafe, input.charAt(index));
            });
        },
        compress: function(uncompressed) {
            return LZString1._compress(uncompressed, 16, function(a) {
                return f(a);
            });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
            if (null == uncompressed) return "";
            var i, value, ii, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0;
            for(ii = 0; ii < uncompressed.length; ii += 1){
                context_c = uncompressed.charAt(ii);
                if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                }
                context_wc = context_w + context_c;
                if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc;
                else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for(i = 0; i < context_numBits; i++){
                                context_data_val <<= 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 8; i++){
                                context_data_val = context_data_val << 1 | 1 & value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value >>= 1;
                            }
                        } else {
                            value = 1;
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1 | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 16; i++){
                                context_data_val = context_data_val << 1 | 1 & value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value >>= 1;
                            }
                        }
                        if (0 == --context_enlargeIn) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | 1 & value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value >>= 1;
                        }
                    }
                    if (0 == --context_enlargeIn) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                }
            }
            if ("" !== context_w) {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for(i = 0; i < context_numBits; i++){
                            context_data_val <<= 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 8; i++){
                            context_data_val = context_data_val << 1 | 1 & value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value >>= 1;
                        }
                    } else {
                        value = 1;
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 16; i++){
                            context_data_val = context_data_val << 1 | 1 & value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value >>= 1;
                        }
                    }
                    if (0 == --context_enlargeIn) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                } else {
                    value = context_dictionary[context_w];
                    for(i = 0; i < context_numBits; i++){
                        context_data_val = context_data_val << 1 | 1 & value;
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else context_data_position++;
                        value >>= 1;
                    }
                }
                if (0 == --context_enlargeIn) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
            }
            value = 2;
            for(i = 0; i < context_numBits; i++){
                context_data_val = context_data_val << 1 | 1 & value;
                if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                } else context_data_position++;
                value >>= 1;
            }
            for(;;){
                context_data_val <<= 1;
                if (context_data_position == bitsPerChar - 1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                }
                context_data_position++;
            }
            return context_data.join("");
        },
        decompress: function(compressed) {
            return null == compressed ? "" : "" == compressed ? null : LZString1._decompress(compressed.length, 32768, function(index) {
                return compressed.charCodeAt(index);
            });
        },
        _decompress: function(length, resetValue, getNextValue) {
            var i, w, bits, resb, maxpower, power, c, dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], data = {
                val: getNextValue(0),
                position: resetValue,
                index: 1
            };
            for(i = 0; i < 3; i += 1)dictionary[i] = i;
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            for(; power != maxpower;){
                resb = data.val & data.position;
                data.position >>= 1;
                if (0 == data.position) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
            }
            switch(bits){
                case 0:
                    bits = 0;
                    maxpower = Math.pow(2, 8);
                    power = 1;
                    for(; power != maxpower;){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (0 == data.position) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 1:
                    bits = 0;
                    maxpower = Math.pow(2, 16);
                    power = 1;
                    for(; power != maxpower;){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (0 == data.position) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 2:
                    return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            for(;;){
                if (data.index > length) return "";
                bits = 0;
                maxpower = Math.pow(2, numBits);
                power = 1;
                for(; power != maxpower;){
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (0 == data.position) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                switch(c = bits){
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        for(; power != maxpower;){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (0 == data.position) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        for(; power != maxpower;){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (0 == data.position) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 2:
                        return result.join("");
                }
                if (0 == enlargeIn) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                if (dictionary[c]) entry = dictionary[c];
                else {
                    if (c !== dictSize) return null;
                    entry = w + w.charAt(0);
                }
                result.push(entry);
                dictionary[dictSize++] = w + entry.charAt(0);
                w = entry;
                if (0 == --enlargeIn) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
            }
        }
    };
    return LZString1;
}(), null != module && (module.exports = LZString);
var module, LZString;
class OptionsSync {
    constructor({ defaults: defaults = {} , storageName: storageName = "options" , migrations: migrations = [] , logging: logging = true , storageType: storageType = "sync"  } = {}){
        Object.defineProperty(this, "storageName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "storageType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_form", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_migrations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.storageName = storageName;
        this.defaults = defaults;
        this.storageType = storageType;
        this._handleFormInput = (delay = 300, atBegin = this._handleFormInput.bind(this), void 0 === callback ? throttle(delay, atBegin, false) : throttle(delay, callback, false !== atBegin));
        var delay, atBegin, callback;
        this._handleStorageChangeOnForm = this._handleStorageChangeOnForm.bind(this);
        logging || (this._log = ()=>{});
        this._migrations = this._runMigrations(migrations);
    }
    get storage() {
        return chrome.storage[this.storageType];
    }
    async getAll() {
        await this._migrations;
        return this._getAll();
    }
    async setAll(newOptions) {
        await this._migrations;
        return this._setAll(newOptions);
    }
    async set(newOptions) {
        return this.setAll({
            ...await this.getAll(),
            ...newOptions
        });
    }
    async syncForm(form) {
        this._form = form instanceof HTMLFormElement ? form : document.querySelector(form);
        this._form.addEventListener("input", this._handleFormInput);
        this._form.addEventListener("submit", this._handleFormSubmit);
        chrome.storage.onChanged.addListener(this._handleStorageChangeOnForm);
        this._updateForm(this._form, await this.getAll());
    }
    async stopSyncForm() {
        if (this._form) {
            this._form.removeEventListener("input", this._handleFormInput);
            this._form.removeEventListener("submit", this._handleFormSubmit);
            chrome.storage.onChanged.removeListener(this._handleStorageChangeOnForm);
            delete this._form;
        }
    }
    _log(method, ...args) {
        console[method](...args);
    }
    async _getAll() {
        return new Promise((resolve, reject)=>{
            this.storage.get(this.storageName, (result)=>{
                chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(this._decode(result[this.storageName]));
            });
        });
    }
    async _setAll(newOptions) {
        this._log("log", "Saving options", newOptions);
        return new Promise((resolve, reject)=>{
            this.storage.set({
                [this.storageName]: this._encode(newOptions)
            }, ()=>{
                chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve();
            });
        });
    }
    _encode(options) {
        const thinnedOptions = {
            ...options
        };
        for (const [key, value] of Object.entries(thinnedOptions))this.defaults[key] === value && delete thinnedOptions[key];
        this._log("log", "Without the default values", thinnedOptions);
        return lzString.exports.compressToEncodedURIComponent(JSON.stringify(thinnedOptions));
    }
    _decode(options) {
        let decompressed = options;
        "string" == typeof options && (decompressed = JSON.parse(lzString.exports.decompressFromEncodedURIComponent(options)));
        return {
            ...this.defaults,
            ...decompressed
        };
    }
    async _runMigrations(migrations) {
        if (0 === migrations.length || !(0, _webextDetectPage.isBackground)() || !await async function() {
            return new Promise((resolve)=>{
                const callback = (installType)=>{
                    if ("development" !== installType) {
                        chrome.runtime.onInstalled.addListener(()=>{
                            resolve(true);
                        });
                        setTimeout(resolve, 500, false);
                    } else resolve(true);
                };
                chrome.management?.getSelf ? chrome.management.getSelf(({ installType: installType  })=>{
                    callback(installType);
                }) : callback("unknown");
            });
        }()) return;
        const options = await this._getAll();
        const initial = JSON.stringify(options);
        this._log("log", "Found these stored options", {
            ...options
        });
        this._log("info", "Will run", migrations.length, 1 === migrations.length ? "migration" : " migrations");
        for (const migrate of migrations)migrate(options, this.defaults);
        initial !== JSON.stringify(options) && await this._setAll(options);
    }
    async _handleFormInput({ target: target  }) {
        const field = target;
        if (field.name) {
            await this.set(this._parseForm(field.form));
            field.form.dispatchEvent(new CustomEvent("options-sync:form-synced", {
                bubbles: true
            }));
        }
    }
    _handleFormSubmit(event) {
        event.preventDefault();
    }
    _updateForm(form, options) {
        const currentFormState = this._parseForm(form);
        for (const [key, value] of Object.entries(options))currentFormState[key] === value && delete options[key];
        const include = Object.keys(options);
        include.length > 0 && deserialize(form, options, {
            include: include
        });
    }
    _parseForm(form) {
        const include = [];
        for (const field of form.querySelectorAll("[name]"))field.validity.valid && !field.disabled && include.push(field.name.replace(/\[.*]/, ""));
        return serialize(form, {
            include: include
        });
    }
    _handleStorageChangeOnForm(changes, areaName) {
        areaName !== this.storageType || !changes[this.storageName] || document.hasFocus() && this._form.contains(document.activeElement) || this._updateForm(this._form, this._decode(changes[this.storageName].newValue));
    }
}
Object.defineProperty(OptionsSync, "migrations", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        removeUnused (options, defaults) {
            for (const key of Object.keys(options))key in defaults || delete options[key];
        }
    }
});

},{"webext-detect-page":"gkIGC","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"gkIGC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "disableWebextDetectPageCache", ()=>disableWebextDetectPageCache);
parcelHelpers.export(exports, "isWebPage", ()=>isWebPage);
parcelHelpers.export(exports, "isExtensionContext", ()=>isExtensionContext);
parcelHelpers.export(exports, "isContentScript", ()=>isContentScript);
parcelHelpers.export(exports, "isBackground", ()=>isBackground);
parcelHelpers.export(exports, "isBackgroundPage", ()=>isBackgroundPage);
parcelHelpers.export(exports, "isBackgroundWorker", ()=>isBackgroundWorker);
parcelHelpers.export(exports, "isOptionsPage", ()=>isOptionsPage);
parcelHelpers.export(exports, "isDevToolsPage", ()=>isDevToolsPage);
parcelHelpers.export(exports, "isFirefox", ()=>isFirefox);
parcelHelpers.export(exports, "isChrome", ()=>isChrome);
parcelHelpers.export(exports, "isSafari", ()=>isSafari);
parcelHelpers.export(exports, "contextNames", ()=>contextNames);
parcelHelpers.export(exports, "getContextName", ()=>getContextName);
let cache = true;
function disableWebextDetectPageCache() {
    cache = false;
}
function isCurrentPathname(path) {
    if (!path) return false;
    try {
        const { pathname  } = new URL(path, location.origin);
        return pathname === location.pathname;
    } catch  {
        return false;
    }
}
function getManifest(_version) {
    return globalThis.chrome?.runtime?.getManifest?.();
}
function once(function_) {
    let result;
    return ()=>{
        if (!cache || typeof result === "undefined") result = function_();
        return result;
    };
}
const isWebPage = once(()=>globalThis.location?.protocol.startsWith("http"));
const isExtensionContext = once(()=>typeof globalThis.chrome?.extension === "object");
const isContentScript = once(()=>isExtensionContext() && isWebPage());
const isBackground = ()=>isBackgroundPage() || isBackgroundWorker();
const isBackgroundPage = once(()=>{
    const manifest = getManifest(2);
    if (manifest && isCurrentPathname(manifest.background_page || manifest.background?.page)) return true;
    return Boolean(manifest?.background?.scripts && isCurrentPathname("/_generated_background_page.html"));
});
const isBackgroundWorker = once(()=>isCurrentPathname(getManifest(3)?.background?.service_worker));
const isOptionsPage = once(()=>{
    if (!isExtensionContext() || !chrome.runtime.getManifest) return false;
    const { options_ui: optionsUi  } = chrome.runtime.getManifest();
    if (typeof optionsUi?.page !== "string") return false;
    const url = new URL(optionsUi.page, location.origin);
    return url.pathname === location.pathname;
});
const isDevToolsPage = once(()=>{
    if (!isExtensionContext() || !chrome.devtools) return false;
    const { devtools_page: devtoolsPage  } = chrome.runtime.getManifest();
    if (typeof devtoolsPage !== "string") return false;
    const url = new URL(devtoolsPage, location.origin);
    return url.pathname === location.pathname;
});
const isFirefox = ()=>globalThis.navigator?.userAgent.includes("Firefox");
const isChrome = ()=>globalThis.navigator?.userAgent.includes("Chrome");
const isSafari = ()=>!isChrome() && globalThis.navigator?.userAgent.includes("Safari");
const contextNames = {
    contentScript: isContentScript,
    background: isBackground,
    options: isOptionsPage,
    devToolsPage: isDevToolsPage,
    extension: isExtensionContext,
    web: isWebPage
};
function getContextName() {
    for (const [name, test] of Object.entries(contextNames)){
        if (test()) return name;
    }
    return "unknown";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"8ISrk":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["3fApi"], "3fApi", "parcelRequire94c2")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCJzb3VyY2Uvb3B0aW9ucy1zdG9yYWdlLmpzIiwibm9kZV9tb2R1bGVzL3dlYmV4dC1vcHRpb25zLXN5bmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2ViZXh0LWRldGVjdC1wYWdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bmFzc2lnbmVkLWltcG9ydFxuaW1wb3J0ICd3ZWJleHQtYmFzZS1jc3MnO1xuaW1wb3J0ICcuL29wdGlvbnMuY3NzJztcblxuLy8gRG9uJ3QgZm9yZ2V0IHRvIGltcG9ydCB0aGlzIHdoZXJldmVyIHlvdSB1c2UgaXRcbmltcG9ydCBicm93c2VyIGZyb20gJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc7XG5cbmltcG9ydCBvcHRpb25zU3RvcmFnZSBmcm9tICcuL29wdGlvbnMtc3RvcmFnZS5qcyc7XG5cbmNvbnN0IHJhbmdlSW5wdXRzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYW5nZVwiXVtuYW1lXj1cImNvbG9yXCJdJyldO1xuY29uc3QgbnVtYmVySW5wdXRzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl1bbmFtZV49XCJjb2xvclwiXScpXTtcbmNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvci1vdXRwdXQnKTtcblxuZnVuY3Rpb24gdXBkYXRlT3V0cHV0Q29sb3IoKSB7XG5cdG91dHB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiKCR7cmFuZ2VJbnB1dHNbMF0udmFsdWV9LCAke3JhbmdlSW5wdXRzWzFdLnZhbHVlfSwgJHtyYW5nZUlucHV0c1syXS52YWx1ZX0pYDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5wdXRGaWVsZChldmVudCkge1xuXHRudW1iZXJJbnB1dHNbcmFuZ2VJbnB1dHMuaW5kZXhPZihldmVudC5jdXJyZW50VGFyZ2V0KV0udmFsdWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xufVxuXG5mb3IgKGNvbnN0IGlucHV0IG9mIHJhbmdlSW5wdXRzKSB7XG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlT3V0cHV0Q29sb3IpO1xuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZUlucHV0RmllbGQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0KCkge1xuXHRhd2FpdCBvcHRpb25zU3RvcmFnZS5zeW5jRm9ybSgnI29wdGlvbnMtZm9ybScpO1xuXHR1cGRhdGVPdXRwdXRDb2xvcigpO1xufVxuXG5pbml0KCk7XG4iLCIvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC44LjAgLSBUdWUgQXByIDIwIDIwMjEgMTE6Mjc6MzggKi9cbi8qIC0qLSBNb2RlOiBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGpzLWluZGVudC1sZXZlbDogMiAtKi0gKi9cbi8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG4vKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgY29uc3QgQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFID0gXCJUaGUgbWVzc2FnZSBwb3J0IGNsb3NlZCBiZWZvcmUgYSByZXNwb25zZSB3YXMgcmVjZWl2ZWQuXCI7XG4gIGNvbnN0IFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORyA9IFwiUmV0dXJuaW5nIGEgUHJvbWlzZSBpcyB0aGUgcHJlZmVycmVkIHdheSB0byBzZW5kIGEgcmVwbHkgZnJvbSBhbiBvbk1lc3NhZ2Uvb25NZXNzYWdlRXh0ZXJuYWwgbGlzdGVuZXIsIGFzIHRoZSBzZW5kUmVzcG9uc2Ugd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIHNwZWNzIChTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvcnVudGltZS9vbk1lc3NhZ2UpXCI7XG5cbiAgLy8gV3JhcHBpbmcgdGhlIGJ1bGsgb2YgdGhpcyBwb2x5ZmlsbCBpbiBhIG9uZS10aW1lLXVzZSBmdW5jdGlvbiBpcyBhIG1pbm9yXG4gIC8vIG9wdGltaXphdGlvbiBmb3IgRmlyZWZveC4gU2luY2UgU3BpZGVybW9ua2V5IGRvZXMgbm90IGZ1bGx5IHBhcnNlIHRoZVxuICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAvLyBuZXZlciBhY3R1YWxseSBuZWVkIHRvIGJlIGNhbGxlZCwgdGhpcyBhbGxvd3MgdGhlIHBvbHlmaWxsIHRvIGJlIGluY2x1ZGVkXG4gIC8vIGluIEZpcmVmb3ggbmVhcmx5IGZvciBmcmVlLlxuICBjb25zdCB3cmFwQVBJcyA9IGV4dGVuc2lvbkFQSXMgPT4ge1xuICAgIC8vIE5PVEU6IGFwaU1ldGFkYXRhIGlzIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGFwaS1tZXRhZGF0YS5qc29uIGZpbGVcbiAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgLy8gSlNPTiBmaWxlLlxuICAgIGNvbnN0IGFwaU1ldGFkYXRhID0ge1xuICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImNsZWFyQWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRSZWNlbnRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0U3ViVHJlZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiYnJvd3NlckFjdGlvblwiOiB7XG4gICAgICAgIFwiZGlzYWJsZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW5hYmxlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwib3BlblBvcHVwXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInNldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlQ2FjaGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVEb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlRm9ybURhdGFcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVMb2NhbFN0b3JhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlUGFzc3dvcmRzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0dGluZ3NcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImNvb2tpZXNcIjoge1xuICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWxsQ29va2llU3RvcmVzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgXCJpbnNwZWN0ZWRXaW5kb3dcIjoge1xuICAgICAgICAgIFwiZXZhbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYW5lbHNcIjoge1xuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAzLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDMsXG4gICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZWxlbWVudHNcIjoge1xuICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiZG93bmxvYWRzXCI6IHtcbiAgICAgICAgXCJjYW5jZWxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZXJhc2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0RmlsZUljb25cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwicGF1c2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXN1bWVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICBcImlzQWxsb3dlZEZpbGVTY2hlbWVBY2Nlc3NcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNBbGxvd2VkSW5jb2duaXRvQWNjZXNzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJoaXN0b3J5XCI6IHtcbiAgICAgICAgXCJhZGRVcmxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcImRlbGV0ZVJhbmdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImRlbGV0ZVVybFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBY2NlcHRMYW5ndWFnZXNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImlkZW50aXR5XCI6IHtcbiAgICAgICAgXCJsYXVuY2hXZWJBdXRoRmxvd1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiaWRsZVwiOiB7XG4gICAgICAgIFwicXVlcnlTdGF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibWFuYWdlbWVudFwiOiB7XG4gICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRTZWxmXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInNldEVuYWJsZWRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibm90aWZpY2F0aW9uc1wiOiB7XG4gICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInBlcm1pc3Npb25zXCI6IHtcbiAgICAgICAgXCJjb250YWluc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlcXVlc3RcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInJ1bnRpbWVcIjoge1xuICAgICAgICBcImdldEJhY2tncm91bmRQYWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcGVuT3B0aW9uc1BhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVxdWVzdFVwZGF0ZUNoZWNrXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICB9LFxuICAgICAgICBcInNlbmROYXRpdmVNZXNzYWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInNldFVuaW5zdGFsbFVSTFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwic2Vzc2lvbnNcIjoge1xuICAgICAgICBcImdldERldmljZXNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVzdG9yZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgIFwibG9jYWxcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibWFuYWdlZFwiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwidGFic1wiOiB7XG4gICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZHVwbGljYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImV4ZWN1dGVTY3JpcHRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0Wm9vbVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ29CYWNrXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdvRm9yd2FyZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiaW5zZXJ0Q1NTXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVsb2FkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0Wm9vbVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgXCJnZXRBbGxGcmFtZXNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0RnJhbWVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIndlYlJlcXVlc3RcIjoge1xuICAgICAgICBcImhhbmRsZXJCZWhhdmlvckNoYW5nZWRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIndpbmRvd3NcIjoge1xuICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoT2JqZWN0LmtleXMoYXBpTWV0YWRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBXZWFrTWFwIHN1YmNsYXNzIHdoaWNoIGNyZWF0ZXMgYW5kIHN0b3JlcyBhIHZhbHVlIGZvciBhbnkga2V5IHdoaWNoIGRvZXNcbiAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAqICAgICAgICBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGluIG9yZGVyIHRvIGNyZWF0ZSB0aGUgdmFsdWUgZm9yIGFueVxuICAgICAqICAgICAgICBrZXkgd2hpY2ggZG9lcyBub3QgZXhpc3QsIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGFjY2Vzc2VkLiBUaGVcbiAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICovXG4gICAgY2xhc3MgRGVmYXVsdFdlYWtNYXAgZXh0ZW5kcyBXZWFrTWFwIHtcbiAgICAgIGNvbnN0cnVjdG9yKGNyZWF0ZUl0ZW0sIGl0ZW1zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5jcmVhdGVJdGVtID0gY3JlYXRlSXRlbTtcbiAgICAgIH1cblxuICAgICAgZ2V0KGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICB0aGlzLnNldChrZXksIHRoaXMuY3JlYXRlSXRlbShrZXkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBvYmplY3Qgd2l0aCBhIGB0aGVuYCBtZXRob2QsIGFuZCBjYW5cbiAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICovXG4gICAgY29uc3QgaXNUaGVuYWJsZSA9IHZhbHVlID0+IHtcbiAgICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIGNhbGxlZCwgd2lsbCByZXNvbHZlIG9yIHJlamVjdFxuICAgICAqIHRoZSBnaXZlbiBwcm9taXNlIGJhc2VkIG9uIGhvdyBpdCBpcyBjYWxsZWQ6XG4gICAgICpcbiAgICAgKiAtIElmLCB3aGVuIGNhbGxlZCwgYGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcmAgY29udGFpbnMgYSBub24tbnVsbCBvYmplY3QsXG4gICAgICogICB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICogICByZXNvbHZlZCB0byB0aGF0IHZhbHVlLlxuICAgICAqIC0gT3RoZXJ3aXNlLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB0byBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGVcbiAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb21pc2VcbiAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAqICAgICAgICBwcm9taXNlLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVzb2x2ZVxuICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZWplY3RcbiAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZWplY3Rpb24gZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSB3cmFwcGVkIG1ldGhvZCB3aGljaCBoYXMgY3JlYXRlZCB0aGUgY2FsbGJhY2suXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICovXG4gICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICByZXR1cm4gKC4uLmNhbGxiYWNrQXJncykgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyB8fFxuICAgICAgICAgICAgICAgICAgIChjYWxsYmFja0FyZ3MubGVuZ3RoIDw9IDEgJiYgbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgIT09IGZhbHNlKSkge1xuICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSAobnVtQXJncykgPT4gbnVtQXJncyA9PSAxID8gXCJhcmd1bWVudFwiIDogXCJhcmd1bWVudHNcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAqICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG11c3QgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggZmV3ZXIgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4QXJnc1xuICAgICAqICAgICAgICBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG1heSBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbihvYmplY3QsIC4uLiopfVxuICAgICAqICAgICAgIFRoZSBnZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFzeW5jRnVuY3Rpb25XcmFwcGVyKHRhcmdldCwgLi4uYXJncykge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVGhpcyBBUEkgbWV0aG9kIGhhcyBjdXJyZW50bHkgbm8gY2FsbGJhY2sgb24gQ2hyb21lLCBidXQgaXQgcmV0dXJuIGEgcHJvbWlzZSBvbiBGaXJlZm94LFxuICAgICAgICAgICAgLy8gYW5kIHNvIHRoZSBwb2x5ZmlsbCB3aWxsIHRyeSB0byBjYWxsIGl0IHdpdGggYSBjYWxsYmFjayBmaXJzdCwgYW5kIGl0IHdpbGwgZmFsbGJhY2tcbiAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe3Jlc29sdmUsIHJlamVjdH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBBUEkgbWV0aG9kIGRvZXNuJ3Qgc2VlbSB0byBzdXBwb3J0IHRoZSBjYWxsYmFjayBwYXJhbWV0ZXIsIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmYWxsaW5nIGJhY2sgdG8gY2FsbCBpdCB3aXRob3V0IGEgY2FsbGJhY2s6IFwiLCBjYkVycm9yKTtcblxuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7XG5cbiAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBBUEkgbWV0aG9kIG1ldGFkYXRhLCBzbyB0aGF0IHRoZSBuZXh0IEFQSSBjYWxscyB3aWxsIG5vdCB0cnkgdG9cbiAgICAgICAgICAgICAgLy8gdXNlIHRoZSB1bnN1cHBvcnRlZCBjYWxsYmFjayBhbnltb3JlLlxuICAgICAgICAgICAgICBtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICBtZXRhZGF0YS5ub0NhbGxiYWNrID0gdHJ1ZTtcblxuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5ub0NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe3Jlc29sdmUsIHJlamVjdH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGFuIGV4aXN0aW5nIG1ldGhvZCBvZiB0aGUgdGFyZ2V0IG9iamVjdCwgc28gdGhhdCBjYWxscyB0byBpdCBhcmVcbiAgICAgKiBpbnRlcmNlcHRlZCBieSB0aGUgZ2l2ZW4gd3JhcHBlciBmdW5jdGlvbi4gVGhlIHdyYXBwZXIgZnVuY3Rpb24gcmVjZWl2ZXMsXG4gICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICogdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIG9yaWdpbmFsIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgKiAgICAgICAgVGhlIG9yaWdpbmFsIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgd3JhcHBlZCBtZXRob2QgYmVsb25ncyB0by5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgKiAgICAgICAgb2JqZWN0IHdoaWNoIGlzIGNyZWF0ZWQgdG8gd3JhcCB0aGUgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHdyYXBwZXJcbiAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgKiAgICAgICAgb2YgdGhlIHdyYXBwZWQgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgKiAgICAgICAgQSBQcm94eSBvYmplY3QgZm9yIHRoZSBnaXZlbiBtZXRob2QsIHdoaWNoIGludm9rZXMgdGhlIGdpdmVuIHdyYXBwZXJcbiAgICAgKiAgICAgICAgbWV0aG9kIGluIGl0cyBwbGFjZS5cbiAgICAgKi9cbiAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb3h5KG1ldGhvZCwge1xuICAgICAgICBhcHBseSh0YXJnZXRNZXRob2QsIHRoaXNPYmosIGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gICAgLyoqXG4gICAgICogV3JhcHMgYW4gb2JqZWN0IGluIGEgUHJveHkgd2hpY2ggaW50ZXJjZXB0cyBhbmQgd3JhcHMgY2VydGFpbiBtZXRob2RzXG4gICAgICogYmFzZWQgb24gdGhlIGdpdmVuIGB3cmFwcGVyc2AgYW5kIGBtZXRhZGF0YWAgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgKiAgICAgICAgVGhlIHRhcmdldCBvYmplY3QgdG8gd3JhcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbd3JhcHBlcnMgPSB7fV1cbiAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyB3cmFwcGVyIGZ1bmN0aW9ucyBmb3Igc3BlY2lhbCBjYXNlcy4gQW55XG4gICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICogICAgICAgIG1ldGhvZCBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUuIFRoZXNlXG4gICAgICogICAgICAgIHdyYXBwZXIgbWV0aG9kcyBhcmUgaW52b2tlZCBhcyBkZXNjcmliZWQgaW4ge0BzZWUgd3JhcE1ldGhvZH0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW21ldGFkYXRhID0ge31dXG4gICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgbWV0YWRhdGEgdXNlZCB0byBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlXG4gICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICogICAgICAgIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZSB3aGljaCBoYXMgYSBjb3JyZXNwb25kaW5nIG1ldGFkYXRhIG9iamVjdFxuICAgICAqICAgICAgICBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYG1ldGFkYXRhYCB0cmVlIGlzIHJlcGxhY2VkIHdpdGggYW5cbiAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICogICAgICAgIHtAc2VlIHdyYXBBc3luY0Z1bmN0aW9ufVxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICovXG4gICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgIGxldCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBsZXQgaGFuZGxlcnMgPSB7XG4gICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldCB8fCBwcm9wIGluIGNhY2hlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghKHByb3AgaW4gdGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXRbcHJvcF07XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAvLyBhbnkgd3JhcHBpbmcuXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd3JhcHBlcnNbcHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgc3BlY2lhbC1jYXNlIHdyYXBwZXIgZm9yIHRoaXMgbWV0aG9kLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gYXN5bmMgbWV0aG9kIHRoYXQgd2UgaGF2ZSBtZXRhZGF0YSBmb3IuIENyZWF0ZSBhXG4gICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gd3JhcEFzeW5jRnVuY3Rpb24ocHJvcCwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCB0aGF0IHdlIGRvbid0IGtub3cgb3IgY2FyZSBhYm91dC4gUmV0dXJuIHRoZVxuICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBtZXRob2QsIGJvdW5kIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICBoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAvLyBvZi4gQ3JlYXRlIGEgc3ViLW9iamVjdCB3cmFwcGVyIGZvciBpdCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjaGlsZFxuICAgICAgICAgICAgLy8gbWV0YWRhdGEuXG4gICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgXCIqXCIpKSB7XG4gICAgICAgICAgICAvLyBXcmFwIGFsbCBwcm9wZXJ0aWVzIGluICogbmFtZXNwYWNlLlxuICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnkgd3JhcHBpbmcgZm9yIHRoaXMgcHJvcGVydHksXG4gICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIHtcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldChwcm94eVRhcmdldCwgcHJvcCwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZpbmVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCwgZGVzYykge1xuICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCBkZXNjKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWxldGVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGNhY2hlLCBwcm9wKTtcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgLy8gb3JpZ2luYWwgdmFsdWUgb2YgdGhlIHRhcmdldCBpZiB0aGF0IHZhbHVlIGlzIGRlY2xhcmVkIHJlYWQtb25seSBhbmRcbiAgICAgIC8vIG5vbi1jb25maWd1cmFibGUuIEZvciB0aGlzIHJlYXNvbiwgd2UgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgLy8gT3RoZXJ3aXNlIHdlIGNhbm5vdCByZXR1cm4gYSBjdXN0b20gb2JqZWN0IGZvciBBUElzIHRoYXRcbiAgICAgIC8vIGFyZSBkZWNsYXJlZCByZWFkLW9ubHkgYW5kIG5vbi1jb25maWd1cmFibGUsIHN1Y2ggYXMgYGNocm9tZS5kZXZ0b29sc2AuXG4gICAgICAvL1xuICAgICAgLy8gVGhlIHByb3h5IGhhbmRsZXJzIHRoZW1zZWx2ZXMgd2lsbCBzdGlsbCB1c2UgdGhlIG9yaWdpbmFsIGB0YXJnZXRgXG4gICAgICAvLyBpbnN0ZWFkIG9mIHRoZSBgcHJveHlUYXJnZXRgLCBzbyB0aGF0IHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGFyZVxuICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cbiAgICAgIGxldCBwcm94eVRhcmdldCA9IE9iamVjdC5jcmVhdGUodGFyZ2V0KTtcbiAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNldCBvZiB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgb2JqZWN0LCB3aGljaCBoYW5kbGVzXG4gICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgKlxuICAgICAqIEEgc2luZ2xlIHdyYXBwZXIgaXMgY3JlYXRlZCBmb3IgZWFjaCBsaXN0ZW5lciBmdW5jdGlvbiwgYW5kIHN0b3JlZCBpbiBhXG4gICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgKiByZXRyaWV2ZSB0aGUgb3JpZ2luYWwgd3JhcHBlciwgc28gdGhhdCAgYXR0ZW1wdHMgdG8gcmVtb3ZlIGFcbiAgICAgKiBwcmV2aW91c2x5LWFkZGVkIGxpc3RlbmVyIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0RlZmF1bHRXZWFrTWFwPGZ1bmN0aW9uLCBmdW5jdGlvbj59IHdyYXBwZXJNYXBcbiAgICAgKiAgICAgICAgQSBEZWZhdWx0V2Vha01hcCBvYmplY3Qgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHdyYXBwZXJcbiAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAqICAgICAgICBhbiBleGlzdGluZyBvbmUgd2hlbiBpdCBkb2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgKi9cbiAgICBjb25zdCB3cmFwRXZlbnQgPSB3cmFwcGVyTWFwID0+ICh7XG4gICAgICBhZGRMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyLCAuLi5hcmdzKSB7XG4gICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgfSxcblxuICAgICAgaGFzTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmVMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAqIGBnZXRDb250ZW50KClgIHByb3BlcnR5IHdoaWNoIHJldHVybnMgYSBgUHJvbWlzZWAgcmF0aGVyIHRoYW4gdXNpbmcgYVxuICAgICAgICogY2FsbGJhY2sgQVBJLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICAgICAqICAgICAgICBUaGUgSEFSIGVudHJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldHdvcmsgcmVxdWVzdC5cbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICBjb25zdCB3cmFwcGVkUmVxID0gd3JhcE9iamVjdChyZXEsIHt9IC8qIHdyYXBwZXJzICovLCB7XG4gICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgbWluQXJnczogMCxcbiAgICAgICAgICAgIG1heEFyZ3M6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGxpc3RlbmVyKHdyYXBwZWRSZXEpO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIEtlZXAgdHJhY2sgaWYgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgaGFzIGJlZW4gbG9nZ2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgbGV0IGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IGZhbHNlO1xuXG4gICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAqIGl0cyByZXR1cm4gdmFsdWUsIHJhdGhlciB0aGFuIGJ5IHJldHVybmluZyBhIHNlbnRpbmVsIHZhbHVlIGFuZCBjYWxsaW5nIGFcbiAgICAgICAqIGNhbGxiYWNrLiBJZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UsIHRoZSByZXNwb25zZSBpc1xuICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZW5kZXJcbiAgICAgICAqICAgICAgICBEZXRhaWxzIGFib3V0IHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAqICAgICAgICBBIGNhbGxiYWNrIHdoaWNoLCB3aGVuIGNhbGxlZCB3aXRoIGFuIGFyYml0cmFyeSBhcmd1bWVudCwgc2VuZHNcbiAgICAgICAqICAgICAgICB0aGF0IHZhbHVlIGFzIGEgcmVzcG9uc2UuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAqICAgICAgICBUcnVlIGlmIHRoZSB3cmFwcGVkIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgd2hpY2ggd2lsbCBsYXRlclxuICAgICAgICogICAgICAgIHlpZWxkIGEgcmVzcG9uc2UuIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICBsZXQgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IGZhbHNlO1xuXG4gICAgICAgIGxldCB3cmFwcGVkU2VuZFJlc3BvbnNlO1xuICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKCFsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORywgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICAgICAgICBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1Jlc3VsdFRoZW5hYmxlID0gcmVzdWx0ICE9PSB0cnVlICYmIGlzVGhlbmFibGUocmVzdWx0KTtcblxuICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgLy8gd3JhcHBlZFNlbmRSZXNwb25zZSBzeW5jaHJvbm91c2x5LCB3ZSBjYW4gZXhpdCBlYXJsaWVyXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlcmUgd2lsbCBiZSBubyByZXNwb25zZSBzZW50IGZyb20gdGhpcyBsaXN0ZW5lci5cbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSAmJiAhaXNSZXN1bHRUaGVuYWJsZSAmJiAhZGlkQ2FsbFNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEEgc21hbGwgaGVscGVyIHRvIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgLy8gdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSByZXNvbHZlZCBwcm9taXNlIG9yIGEgcmVqZWN0ZWRcbiAgICAgICAgLy8gcHJvbWlzZSkuXG4gICAgICAgIGNvbnN0IHNlbmRQcm9taXNlZFJlc3VsdCA9IChwcm9taXNlKSA9PiB7XG4gICAgICAgICAgcHJvbWlzZS50aGVuKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG1zZyk7XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgLy8gaXMgYW4gaW5zdGFuY2Ugb2YgZXJyb3IsIG9yIHRoZSBvYmplY3QgaXRzZWxmIG90aGVyd2lzZS5cbiAgICAgICAgICAgIGxldCBtZXNzYWdlO1xuICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgLy8gUHJpbnQgYW4gZXJyb3Igb24gdGhlIGNvbnNvbGUgaWYgdW5hYmxlIHRvIHNlbmQgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHNlbmQgdGhlIHJlc29sdmVkIHZhbHVlIGFzIGFcbiAgICAgICAgLy8gcmVzdWx0LCBvdGhlcndpc2Ugd2FpdCB0aGUgcHJvbWlzZSByZWxhdGVkIHRvIHRoZSB3cmFwcGVkU2VuZFJlc3BvbnNlXG4gICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cbiAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtyZWplY3QsIHJlc29sdmV9LCByZXBseSkgPT4ge1xuICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgLy8gRGV0ZWN0IHdoZW4gbm9uZSBvZiB0aGUgbGlzdGVuZXJzIHJlcGxpZWQgdG8gdGhlIHNlbmRNZXNzYWdlIGNhbGwgYW5kIHJlc29sdmVcbiAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS93ZWJleHRlbnNpb24tcG9seWZpbGwvaXNzdWVzLzEzMFxuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlID09PSBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyZXBseSAmJiByZXBseS5fX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X18pIHtcbiAgICAgICAgLy8gQ29udmVydCBiYWNrIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpbnRvXG4gICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcGx5Lm1lc3NhZ2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgd3JhcHBlZENiID0gd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2suYmluZChudWxsLCB7cmVzb2x2ZSwgcmVqZWN0fSk7XG4gICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICBhcGlOYW1lc3BhY2VPYmouc2VuZE1lc3NhZ2UoLi4uYXJncyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhdGljV3JhcHBlcnMgPSB7XG4gICAgICBkZXZ0b29sczoge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgb25SZXF1ZXN0RmluaXNoZWQ6IHdyYXBFdmVudChvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBydW50aW1lOiB7XG4gICAgICAgIG9uTWVzc2FnZTogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgb25NZXNzYWdlRXh0ZXJuYWw6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHttaW5BcmdzOiAxLCBtYXhBcmdzOiAzfSksXG4gICAgICB9LFxuICAgICAgdGFiczoge1xuICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7bWluQXJnczogMiwgbWF4QXJnczogM30pLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgIGNsZWFyOiB7bWluQXJnczogMSwgbWF4QXJnczogMX0sXG4gICAgICBnZXQ6IHttaW5BcmdzOiAxLCBtYXhBcmdzOiAxfSxcbiAgICAgIHNldDoge21pbkFyZ3M6IDEsIG1heEFyZ3M6IDF9LFxuICAgIH07XG4gICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgIG5ldHdvcms6IHtcIipcIjogc2V0dGluZ01ldGFkYXRhfSxcbiAgICAgIHNlcnZpY2VzOiB7XCIqXCI6IHNldHRpbmdNZXRhZGF0YX0sXG4gICAgICB3ZWJzaXRlczoge1wiKlwiOiBzZXR0aW5nTWV0YWRhdGF9LFxuICAgIH07XG5cbiAgICByZXR1cm4gd3JhcE9iamVjdChleHRlbnNpb25BUElzLCBzdGF0aWNXcmFwcGVycywgYXBpTWV0YWRhdGEpO1xuICB9O1xuXG4gIGlmICh0eXBlb2YgY2hyb21lICE9IFwib2JqZWN0XCIgfHwgIWNocm9tZSB8fCAhY2hyb21lLnJ1bnRpbWUgfHwgIWNocm9tZS5ydW50aW1lLmlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICB9XG5cbiAgLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG4gIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gYnJvd3Nlcjtcbn1cbiIsImltcG9ydCBPcHRpb25zU3luYyBmcm9tICd3ZWJleHQtb3B0aW9ucy1zeW5jJztcblxuZXhwb3J0IGRlZmF1bHQgbmV3IE9wdGlvbnNTeW5jKHtcblx0ZGVmYXVsdHM6IHtcblx0XHRjb2xvclJlZDogMjQ0LFxuXHRcdGNvbG9yR3JlZW46IDY3LFxuXHRcdGNvbG9yQmx1ZTogNTQsXG5cdFx0dGV4dDogJ1NldCBhIHRleHQhJyxcblx0fSxcblx0bWlncmF0aW9uczogW1xuXHRcdE9wdGlvbnNTeW5jLm1pZ3JhdGlvbnMucmVtb3ZlVW51c2VkLFxuXHRdLFxuXHRsb2dnaW5nOiB0cnVlLFxufSk7XG4iLCJpbXBvcnQgeyBpc0JhY2tncm91bmQgfSBmcm9tIFwid2ViZXh0LWRldGVjdC1wYWdlXCI7XG5cbmZ1bmN0aW9uIHRocm90dGxlKGRlbGF5LCBub1RyYWlsaW5nLCBjYWxsYmFjaywgZGVib3VuY2VNb2RlKSB7XG4gICAgdmFyIHRpbWVvdXRJRDtcbiAgICB2YXIgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgdmFyIGxhc3RFeGVjID0gMDtcbiAgICBmdW5jdGlvbiBjbGVhckV4aXN0aW5nVGltZW91dCgpIHtcbiAgICAgICAgdGltZW91dElEICYmIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgIH1cbiAgICBpZiAoXCJib29sZWFuXCIgIT0gdHlwZW9mIG5vVHJhaWxpbmcpIHtcbiAgICAgICAgZGVib3VuY2VNb2RlID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrID0gbm9UcmFpbGluZztcbiAgICAgICAgbm9UcmFpbGluZyA9IHZvaWQgMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c18gPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSBhcmd1bWVudHNfW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIGxhc3RFeGVjO1xuICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgICAgZGVib3VuY2VNb2RlICYmICF0aW1lb3V0SUQgJiYgZXhlYygpO1xuICAgICAgICAgICAgY2xlYXJFeGlzdGluZ1RpbWVvdXQoKTtcbiAgICAgICAgICAgIHZvaWQgMCA9PT0gZGVib3VuY2VNb2RlICYmIGVsYXBzZWQgPiBkZWxheSA/IGV4ZWMoKSA6IHRydWUgIT09IG5vVHJhaWxpbmcgJiYgKHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoZGVib3VuY2VNb2RlID8gY2xlYXIgOiBleGVjLCB2b2lkIDAgPT09IGRlYm91bmNlTW9kZSA/IGRlbGF5IC0gZWxhcHNlZCA6IGRlbGF5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZXhlYygpIHtcbiAgICAgICAgICAgIGxhc3RFeGVjID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHNlbGYsIGFyZ3VtZW50c18pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgdGltZW91dElEID0gdm9pZCAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdyYXBwZXIuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyRXhpc3RpbmdUaW1lb3V0KCk7XG4gICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cblxuY2xhc3MgVHlwZVJlZ2lzdHJ5IHtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsID0ge30pIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcmVkVHlwZXMgPSBpbml0aWFsO1xuICAgIH1cbiAgICBnZXQodHlwZSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwICE9PSB0aGlzLnJlZ2lzdGVyZWRUeXBlc1t0eXBlXSA/IHRoaXMucmVnaXN0ZXJlZFR5cGVzW3R5cGVdIDogdGhpcy5yZWdpc3RlcmVkVHlwZXMuZGVmYXVsdDtcbiAgICB9XG4gICAgcmVnaXN0ZXIodHlwZSwgaXRlbSkge1xuICAgICAgICB2b2lkIDAgPT09IHRoaXMucmVnaXN0ZXJlZFR5cGVzW3R5cGVdICYmICh0aGlzLnJlZ2lzdGVyZWRUeXBlc1t0eXBlXSA9IGl0ZW0pO1xuICAgIH1cbiAgICByZWdpc3RlckRlZmF1bHQoaXRlbSkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKFwiZGVmYXVsdFwiLCBpdGVtKTtcbiAgICB9XG59XG5cbmNsYXNzIEtleUV4dHJhY3RvcnMgZXh0ZW5kcyBUeXBlUmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0KChlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpIHx8IFwiXCIpKTtcbiAgICB9XG59XG5cbmNsYXNzIElucHV0UmVhZGVycyBleHRlbmRzIFR5cGVSZWdpc3RyeSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHQoKGVsID0+IGVsLnZhbHVlKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXCJjaGVja2JveFwiLCAoZWwgPT4gbnVsbCAhPT0gZWwuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikgPyBlbC5jaGVja2VkID8gZWwuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikgOiBudWxsIDogZWwuY2hlY2tlZCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKFwic2VsZWN0XCIsIChlbCA9PiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUsIG9wdGlvbiwgaTtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gZWxlbS5vcHRpb25zO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4O1xuICAgICAgICAgICAgdmFyIG9uZSA9IFwic2VsZWN0LW9uZVwiID09PSBlbGVtLnR5cGU7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gb25lID8gbnVsbCA6IFtdO1xuICAgICAgICAgICAgdmFyIG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgaSA9IGluZGV4IDwgMCA/IG1heCA6IG9uZSA/IGluZGV4IDogMDtcbiAgICAgICAgICAgIGZvciAoO2kgPCBtYXg7IGkrKykgaWYgKCgob3B0aW9uID0gb3B0aW9uc1tpXSkuc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXgpICYmICFvcHRpb24uZGlzYWJsZWQgJiYgIShvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCAmJiBcIm9wdGdyb3VwXCIgPT09IG9wdGlvbi5wYXJlbnROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAob25lKSByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgfShlbCkpKTtcbiAgICB9XG59XG5cbmNsYXNzIEtleUFzc2lnbm1lbnRWYWxpZGF0b3JzIGV4dGVuZHMgVHlwZVJlZ2lzdHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdCgoKCkgPT4gdHJ1ZSkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKFwicmFkaW9cIiwgKGVsID0+IGVsLmNoZWNrZWQpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGtleVNwbGl0dGVyKGtleSkge1xuICAgIGxldCBtYXRjaGVzID0ga2V5Lm1hdGNoKC9bXltcXF1dKy9nKTtcbiAgICBsZXQgbGFzdEtleTtcbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDEgJiYga2V5LmluZGV4T2YoXCJbXVwiKSA9PT0ga2V5Lmxlbmd0aCAtIDIpIHtcbiAgICAgICAgbGFzdEtleSA9IG1hdGNoZXMucG9wKCk7XG4gICAgICAgIG1hdGNoZXMucHVzaChbIGxhc3RLZXkgXSk7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVzO1xufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50VHlwZShlbCkge1xuICAgIGxldCB0eXBlQXR0cjtcbiAgICBsZXQgdGFnTmFtZSA9IGVsLnRhZ05hbWU7XG4gICAgbGV0IHR5cGUgPSB0YWdOYW1lO1xuICAgIGlmIChcImlucHV0XCIgPT09IHRhZ05hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICB0eXBlQXR0ciA9IGVsLmdldEF0dHJpYnV0ZShcInR5cGVcIik7XG4gICAgICAgIHR5cGUgPSB0eXBlQXR0ciB8fCBcInRleHRcIjtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGUudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5wdXRFbGVtZW50cyhlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCxzZWxlY3QsdGV4dGFyZWFcIiksIChlbCA9PiB7XG4gICAgICAgIGlmIChcImlucHV0XCIgPT09IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAmJiAoXCJzdWJtaXRcIiA9PT0gZWwudHlwZSB8fCBcInJlc2V0XCIgPT09IGVsLnR5cGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGxldCBteVR5cGUgPSBnZXRFbGVtZW50VHlwZShlbCk7XG4gICAgICAgIGxldCBpZGVudGlmaWVyID0gb3B0aW9ucy5rZXlFeHRyYWN0b3JzLmdldChteVR5cGUpKGVsKTtcbiAgICAgICAgbGV0IGZvdW5kSW5JbmNsdWRlID0gLTEgIT09IChvcHRpb25zLmluY2x1ZGUgfHwgW10pLmluZGV4T2YoaWRlbnRpZmllcik7XG4gICAgICAgIGxldCBmb3VuZEluRXhjbHVkZSA9IC0xICE9PSAob3B0aW9ucy5leGNsdWRlIHx8IFtdKS5pbmRleE9mKGlkZW50aWZpZXIpO1xuICAgICAgICBsZXQgZm91bmRJbklnbm9yZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJlamVjdCA9IGZhbHNlO1xuICAgICAgICBpZiAob3B0aW9ucy5pZ25vcmVkVHlwZXMpIGZvciAobGV0IHNlbGVjdG9yIG9mIG9wdGlvbnMuaWdub3JlZFR5cGVzKSBlbC5tYXRjaGVzKHNlbGVjdG9yKSAmJiAoZm91bmRJbklnbm9yZWQgPSB0cnVlKTtcbiAgICAgICAgcmVqZWN0ID0gIWZvdW5kSW5JbmNsdWRlICYmICghIW9wdGlvbnMuaW5jbHVkZSB8fCAoZm91bmRJbkV4Y2x1ZGUgfHwgZm91bmRJbklnbm9yZWQpKTtcbiAgICAgICAgcmV0dXJuICFyZWplY3Q7XG4gICAgfSkpO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25LZXlWYWx1ZShvYmosIGtleWNoYWluLCB2YWx1ZSkge1xuICAgIGlmICgha2V5Y2hhaW4pIHJldHVybiBvYmo7XG4gICAgdmFyIGtleSA9IGtleWNoYWluLnNoaWZ0KCk7XG4gICAgb2JqW2tleV0gfHwgKG9ialtrZXldID0gQXJyYXkuaXNBcnJheShrZXkpID8gW10gOiB7fSk7XG4gICAgMCA9PT0ga2V5Y2hhaW4ubGVuZ3RoICYmIChBcnJheS5pc0FycmF5KG9ialtrZXldKSA/IG51bGwgIT09IHZhbHVlICYmIG9ialtrZXldLnB1c2godmFsdWUpIDogb2JqW2tleV0gPSB2YWx1ZSk7XG4gICAga2V5Y2hhaW4ubGVuZ3RoID4gMCAmJiBhc3NpZ25LZXlWYWx1ZShvYmpba2V5XSwga2V5Y2hhaW4sIHZhbHVlKTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemUoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBvcHRpb25zLmtleVNwbGl0dGVyID0gb3B0aW9ucy5rZXlTcGxpdHRlciB8fCBrZXlTcGxpdHRlcjtcbiAgICBvcHRpb25zLmtleUV4dHJhY3RvcnMgPSBuZXcgS2V5RXh0cmFjdG9ycyhvcHRpb25zLmtleUV4dHJhY3RvcnMgfHwge30pO1xuICAgIG9wdGlvbnMuaW5wdXRSZWFkZXJzID0gbmV3IElucHV0UmVhZGVycyhvcHRpb25zLmlucHV0UmVhZGVycyB8fCB7fSk7XG4gICAgb3B0aW9ucy5rZXlBc3NpZ25tZW50VmFsaWRhdG9ycyA9IG5ldyBLZXlBc3NpZ25tZW50VmFsaWRhdG9ycyhvcHRpb25zLmtleUFzc2lnbm1lbnRWYWxpZGF0b3JzIHx8IHt9KTtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGdldElucHV0RWxlbWVudHMoZWxlbWVudCwgb3B0aW9ucyksIChlbCA9PiB7XG4gICAgICAgIGxldCB0eXBlID0gZ2V0RWxlbWVudFR5cGUoZWwpO1xuICAgICAgICBsZXQga2V5ID0gb3B0aW9ucy5rZXlFeHRyYWN0b3JzLmdldCh0eXBlKShlbCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnMuaW5wdXRSZWFkZXJzLmdldCh0eXBlKShlbCk7XG4gICAgICAgIGlmIChvcHRpb25zLmtleUFzc2lnbm1lbnRWYWxpZGF0b3JzLmdldCh0eXBlKShlbCwga2V5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBrZXljaGFpbiA9IG9wdGlvbnMua2V5U3BsaXR0ZXIoa2V5KTtcbiAgICAgICAgICAgIGRhdGEgPSBhc3NpZ25LZXlWYWx1ZShkYXRhLCBrZXljaGFpbiwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSkpO1xuICAgIHJldHVybiBkYXRhO1xufVxuXG5jbGFzcyBJbnB1dFdyaXRlcnMgZXh0ZW5kcyBUeXBlUmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0KCgoZWwsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXCJjaGVja2JveFwiLCAoKGVsLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgbnVsbCA9PT0gdmFsdWUgPyBlbC5pbmRldGVybWluYXRlID0gdHJ1ZSA6IGVsLmNoZWNrZWQgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IC0xICE9PSB2YWx1ZS5pbmRleE9mKGVsLnZhbHVlKSA6IHZhbHVlO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXCJyYWRpb1wiLCAoZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgICAgICAgICB2b2lkIDAgIT09IHZhbHVlICYmIChlbC5jaGVja2VkID0gZWwudmFsdWUgPT09IHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXCJzZWxlY3RcIiwgc2V0U2VsZWN0VmFsdWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0U2VsZWN0VmFsdWUoZWxlbSwgdmFsdWUpIHtcbiAgICB2YXIgb3B0aW9uU2V0LCBvcHRpb247XG4gICAgdmFyIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnM7XG4gICAgdmFyIHZhbHVlcyA9IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgIG51bGwgIT09IGFyciAmJiAoQXJyYXkuaXNBcnJheShhcnIpID8gcmV0LnB1c2guYXBwbHkocmV0LCBhcnIpIDogcmV0LnB1c2goYXJyKSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSh2YWx1ZSk7XG4gICAgdmFyIGkgPSBvcHRpb25zLmxlbmd0aDtcbiAgICBmb3IgKDtpLS07ICkge1xuICAgICAgICBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgICBpZiAodmFsdWVzLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xKSB7XG4gICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICBvcHRpb25TZXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9wdGlvblNldCB8fCAoZWxlbS5zZWxlY3RlZEluZGV4ID0gLTEpO1xufVxuXG5mdW5jdGlvbiBrZXlKb2luZXIocGFyZW50S2V5LCBjaGlsZEtleSkge1xuICAgIHJldHVybiBwYXJlbnRLZXkgKyBcIltcIiArIGNoaWxkS2V5ICsgXCJdXCI7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5EYXRhKGRhdGEsIHBhcmVudEtleSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGZsYXREYXRhID0ge307XG4gICAgbGV0IGtleUpvaW5lciQxID0gb3B0aW9ucy5rZXlKb2luZXIgfHwga2V5Sm9pbmVyO1xuICAgIGZvciAobGV0IGtleU5hbWUgaW4gZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoa2V5TmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICBsZXQgdmFsdWUgPSBkYXRhW2tleU5hbWVdO1xuICAgICAgICBsZXQgaGFzaCA9IHt9O1xuICAgICAgICBwYXJlbnRLZXkgJiYgKGtleU5hbWUgPSBrZXlKb2luZXIkMShwYXJlbnRLZXksIGtleU5hbWUpKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBoYXNoW2tleU5hbWUgKyBcIltdXCJdID0gdmFsdWU7XG4gICAgICAgICAgICBoYXNoW2tleU5hbWVdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBcIm9iamVjdFwiID09IHR5cGVvZiB2YWx1ZSA/IGhhc2ggPSBmbGF0dGVuRGF0YSh2YWx1ZSwga2V5TmFtZSwgb3B0aW9ucykgOiBoYXNoW2tleU5hbWVdID0gdmFsdWU7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZmxhdERhdGEsIGhhc2gpO1xuICAgIH1cbiAgICByZXR1cm4gZmxhdERhdGE7XG59XG5cbmZ1bmN0aW9uIGRlc2VyaWFsaXplKGZvcm0sIGRhdGEsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBmbGF0dGVuZWREYXRhID0gZmxhdHRlbkRhdGEoZGF0YSwgbnVsbCwgb3B0aW9ucyk7XG4gICAgb3B0aW9ucy5rZXlFeHRyYWN0b3JzID0gbmV3IEtleUV4dHJhY3RvcnMob3B0aW9ucy5rZXlFeHRyYWN0b3JzIHx8IHt9KTtcbiAgICBvcHRpb25zLmlucHV0V3JpdGVycyA9IG5ldyBJbnB1dFdyaXRlcnMob3B0aW9ucy5pbnB1dFdyaXRlcnMgfHwge30pO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZ2V0SW5wdXRFbGVtZW50cyhmb3JtLCBvcHRpb25zKSwgKGVsID0+IHtcbiAgICAgICAgbGV0IHR5cGUgPSBnZXRFbGVtZW50VHlwZShlbCk7XG4gICAgICAgIGxldCBrZXkgPSBvcHRpb25zLmtleUV4dHJhY3RvcnMuZ2V0KHR5cGUpKGVsKTtcbiAgICAgICAgb3B0aW9ucy5pbnB1dFdyaXRlcnMuZ2V0KHR5cGUpKGVsLCBmbGF0dGVuZWREYXRhW2tleV0pO1xuICAgIH0pKTtcbn1cblxudmFyIGx6U3RyaW5nID0ge1xuICAgIGV4cG9ydHM6IHt9XG59O1xuXG5tb2R1bGUgPSBselN0cmluZywgTFpTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG4gICAgdmFyIGtleVN0ckJhc2U2NCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcbiAgICB2YXIga2V5U3RyVXJpU2FmZSA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLSRcIjtcbiAgICB2YXIgYmFzZVJldmVyc2VEaWMgPSB7fTtcbiAgICBmdW5jdGlvbiBnZXRCYXNlVmFsdWUoYWxwaGFiZXQsIGNoYXJhY3Rlcikge1xuICAgICAgICBpZiAoIWJhc2VSZXZlcnNlRGljW2FscGhhYmV0XSkge1xuICAgICAgICAgICAgYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgaSsrKSBiYXNlUmV2ZXJzZURpY1thbHBoYWJldF1bYWxwaGFiZXQuY2hhckF0KGkpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhc2VSZXZlcnNlRGljW2FscGhhYmV0XVtjaGFyYWN0ZXJdO1xuICAgIH1cbiAgICB2YXIgTFpTdHJpbmcgPSB7XG4gICAgICAgIGNvbXByZXNzVG9CYXNlNjQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSBpbnB1dCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB2YXIgcmVzID0gTFpTdHJpbmcuX2NvbXByZXNzKGlucHV0LCA2LCAoZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXlTdHJCYXNlNjQuY2hhckF0KGEpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgc3dpdGNoIChyZXMubGVuZ3RoICUgNCkge1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyArIFwiPT09XCI7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXMgKyBcIj09XCI7XG5cbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXMgKyBcIj1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVjb21wcmVzc0Zyb21CYXNlNjQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBpbnB1dCA/IFwiXCIgOiBcIlwiID09IGlucHV0ID8gbnVsbCA6IExaU3RyaW5nLl9kZWNvbXByZXNzKGlucHV0Lmxlbmd0aCwgMzIsIChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCYXNlVmFsdWUoa2V5U3RyQmFzZTY0LCBpbnB1dC5jaGFyQXQoaW5kZXgpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHJlc3NUb1VURjE2OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gaW5wdXQgPyBcIlwiIDogTFpTdHJpbmcuX2NvbXByZXNzKGlucHV0LCAxNSwgKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZihhICsgMzIpO1xuICAgICAgICAgICAgfSkpICsgXCIgXCI7XG4gICAgICAgIH0sXG4gICAgICAgIGRlY29tcHJlc3NGcm9tVVRGMTY6IGZ1bmN0aW9uKGNvbXByZXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IGNvbXByZXNzZWQgPyBcIlwiIDogXCJcIiA9PSBjb21wcmVzc2VkID8gbnVsbCA6IExaU3RyaW5nLl9kZWNvbXByZXNzKGNvbXByZXNzZWQubGVuZ3RoLCAxNjM4NCwgKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXByZXNzZWQuY2hhckNvZGVBdChpbmRleCkgLSAzMjtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHJlc3NUb1VpbnQ4QXJyYXk6IGZ1bmN0aW9uKHVuY29tcHJlc3NlZCkge1xuICAgICAgICAgICAgdmFyIGNvbXByZXNzZWQgPSBMWlN0cmluZy5jb21wcmVzcyh1bmNvbXByZXNzZWQpO1xuICAgICAgICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KDIgKiBjb21wcmVzc2VkLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgVG90YWxMZW4gPSBjb21wcmVzc2VkLmxlbmd0aDsgaSA8IFRvdGFsTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF92YWx1ZSA9IGNvbXByZXNzZWQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICBidWZbMiAqIGldID0gY3VycmVudF92YWx1ZSA+Pj4gODtcbiAgICAgICAgICAgICAgICBidWZbMiAqIGkgKyAxXSA9IGN1cnJlbnRfdmFsdWUgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgICB9LFxuICAgICAgICBkZWNvbXByZXNzRnJvbVVpbnQ4QXJyYXk6IGZ1bmN0aW9uKGNvbXByZXNzZWQpIHtcbiAgICAgICAgICAgIGlmIChudWxsID09IGNvbXByZXNzZWQpIHJldHVybiBMWlN0cmluZy5kZWNvbXByZXNzKGNvbXByZXNzZWQpO1xuICAgICAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheShjb21wcmVzc2VkLmxlbmd0aCAvIDIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIFRvdGFsTGVuID0gYnVmLmxlbmd0aDsgaSA8IFRvdGFsTGVuOyBpKyspIGJ1ZltpXSA9IDI1NiAqIGNvbXByZXNzZWRbMiAqIGldICsgY29tcHJlc3NlZFsyICogaSArIDFdO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgYnVmLmZvckVhY2goKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChmKGMpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBMWlN0cmluZy5kZWNvbXByZXNzKHJlc3VsdC5qb2luKFwiXCIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBpbnB1dCA/IFwiXCIgOiBMWlN0cmluZy5fY29tcHJlc3MoaW5wdXQsIDYsIChmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleVN0clVyaVNhZmUuY2hhckF0KGEpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBkZWNvbXByZXNzRnJvbUVuY29kZWRVUklDb21wb25lbnQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSBpbnB1dCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICBpZiAoXCJcIiA9PSBpbnB1dCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoLyAvZywgXCIrXCIpO1xuICAgICAgICAgICAgcmV0dXJuIExaU3RyaW5nLl9kZWNvbXByZXNzKGlucHV0Lmxlbmd0aCwgMzIsIChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCYXNlVmFsdWUoa2V5U3RyVXJpU2FmZSwgaW5wdXQuY2hhckF0KGluZGV4KSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXByZXNzOiBmdW5jdGlvbih1bmNvbXByZXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBMWlN0cmluZy5fY29tcHJlc3ModW5jb21wcmVzc2VkLCAxNiwgKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgX2NvbXByZXNzOiBmdW5jdGlvbih1bmNvbXByZXNzZWQsIGJpdHNQZXJDaGFyLCBnZXRDaGFyRnJvbUludCkge1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gdW5jb21wcmVzc2VkKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHZhciBpLCB2YWx1ZSwgaWksIGNvbnRleHRfZGljdGlvbmFyeSA9IHt9LCBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZSA9IHt9LCBjb250ZXh0X2MgPSBcIlwiLCBjb250ZXh0X3djID0gXCJcIiwgY29udGV4dF93ID0gXCJcIiwgY29udGV4dF9lbmxhcmdlSW4gPSAyLCBjb250ZXh0X2RpY3RTaXplID0gMywgY29udGV4dF9udW1CaXRzID0gMiwgY29udGV4dF9kYXRhID0gW10sIGNvbnRleHRfZGF0YV92YWwgPSAwLCBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgZm9yIChpaSA9IDA7IGlpIDwgdW5jb21wcmVzc2VkLmxlbmd0aDsgaWkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfYyA9IHVuY29tcHJlc3NlZC5jaGFyQXQoaWkpO1xuICAgICAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRleHRfZGljdGlvbmFyeSwgY29udGV4dF9jKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnlbY29udGV4dF9jXSA9IGNvbnRleHRfZGljdFNpemUrKztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGVbY29udGV4dF9jXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHRfd2MgPSBjb250ZXh0X3cgKyBjb250ZXh0X2M7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnksIGNvbnRleHRfd2MpKSBjb250ZXh0X3cgPSBjb250ZXh0X3djOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZSwgY29udGV4dF93KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfdy5jaGFyQ29kZUF0KDApIDwgMjU2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRfbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPDw9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSBjb250ZXh0X2RhdGFfdmFsIDw8IDEgfCAxICYgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPj49IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRfbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSBjb250ZXh0X2RhdGFfdmFsIDw8IDEgfCB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhciAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29udGV4dF93LmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IDEgJiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhciAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSAtLWNvbnRleHRfZW5sYXJnZUluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlW2NvbnRleHRfd107XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfZGljdGlvbmFyeVtjb250ZXh0X3ddO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRfbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IDEgJiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSAtLWNvbnRleHRfZW5sYXJnZUluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2VubGFyZ2VJbiA9IE1hdGgucG93KDIsIGNvbnRleHRfbnVtQml0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X251bUJpdHMrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnlbY29udGV4dF93Y10gPSBjb250ZXh0X2RpY3RTaXplKys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfdyA9IFN0cmluZyhjb250ZXh0X2MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcIlwiICE9PSBjb250ZXh0X3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlLCBjb250ZXh0X3cpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X3cuY2hhckNvZGVBdCgwKSA8IDI1Nikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRfbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA8PD0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29udGV4dF93LmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IDEgJiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb250ZXh0X251bUJpdHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSBjb250ZXh0X2RhdGFfdmFsIDw8IDEgfCB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gY29udGV4dF9kYXRhX3ZhbCA8PCAxIHwgMSAmIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID4+PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IC0tY29udGV4dF9lbmxhcmdlSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluID0gTWF0aC5wb3coMiwgY29udGV4dF9udW1CaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZVtjb250ZXh0X3ddO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29udGV4dF9kaWN0aW9uYXJ5W2NvbnRleHRfd107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb250ZXh0X251bUJpdHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IDEgJiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoMCA9PSAtLWNvbnRleHRfZW5sYXJnZUluKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluID0gTWF0aC5wb3coMiwgY29udGV4dF9udW1CaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSAyO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRfbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IDEgJiB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICB2YWx1ZSA+Pj0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsIDw8PSAxO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRfZGF0YS5qb2luKFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgICBkZWNvbXByZXNzOiBmdW5jdGlvbihjb21wcmVzc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBjb21wcmVzc2VkID8gXCJcIiA6IFwiXCIgPT0gY29tcHJlc3NlZCA/IG51bGwgOiBMWlN0cmluZy5fZGVjb21wcmVzcyhjb21wcmVzc2VkLmxlbmd0aCwgMzI3NjgsIChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wcmVzc2VkLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBfZGVjb21wcmVzczogZnVuY3Rpb24obGVuZ3RoLCByZXNldFZhbHVlLCBnZXROZXh0VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpLCB3LCBiaXRzLCByZXNiLCBtYXhwb3dlciwgcG93ZXIsIGMsIGRpY3Rpb25hcnkgPSBbXSwgZW5sYXJnZUluID0gNCwgZGljdFNpemUgPSA0LCBudW1CaXRzID0gMywgZW50cnkgPSBcIlwiLCByZXN1bHQgPSBbXSwgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICB2YWw6IGdldE5leHRWYWx1ZSgwKSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVzZXRWYWx1ZSxcbiAgICAgICAgICAgICAgICBpbmRleDogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAzOyBpICs9IDEpIGRpY3Rpb25hcnlbaV0gPSBpO1xuICAgICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsIDIpO1xuICAgICAgICAgICAgcG93ZXIgPSAxO1xuICAgICAgICAgICAgZm9yICg7cG93ZXIgIT0gbWF4cG93ZXI7ICkge1xuICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA+Pj0gMTtcbiAgICAgICAgICAgICAgICBpZiAoMCA9PSBkYXRhLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiaXRzIHw9IChyZXNiID4gMCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgICAgIHBvd2VyIDw8PSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChiaXRzKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsIDgpO1xuICAgICAgICAgICAgICAgIHBvd2VyID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKDtwb3dlciAhPSBtYXhwb3dlcjsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IGRhdGEucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBiaXRzIHw9IChyZXNiID4gMCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYyA9IGYoYml0cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiwgMTYpO1xuICAgICAgICAgICAgICAgIHBvd2VyID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKDtwb3dlciAhPSBtYXhwb3dlcjsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IGRhdGEucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBiaXRzIHw9IChyZXNiID4gMCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYyA9IGYoYml0cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGljdGlvbmFyeVszXSA9IGM7XG4gICAgICAgICAgICB3ID0gYztcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGMpO1xuICAgICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmluZGV4ID4gbGVuZ3RoKSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsIG51bUJpdHMpO1xuICAgICAgICAgICAgICAgIHBvd2VyID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKDtwb3dlciAhPSBtYXhwb3dlcjsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IGRhdGEucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBiaXRzIHw9IChyZXNiID4gMCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjID0gYml0cykge1xuICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSAxO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDtwb3dlciAhPSBtYXhwb3dlcjsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNiID0gZGF0YS52YWwgJiBkYXRhLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IGRhdGEucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID0gcmVzZXRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYml0cyB8PSAocmVzYiA+IDAgPyAxIDogMCkgKiBwb3dlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvd2VyIDw8PSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlbZGljdFNpemUrK10gPSBmKGJpdHMpO1xuICAgICAgICAgICAgICAgICAgICBjID0gZGljdFNpemUgLSAxO1xuICAgICAgICAgICAgICAgICAgICBlbmxhcmdlSW4tLTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiwgMTYpO1xuICAgICAgICAgICAgICAgICAgICBwb3dlciA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO3Bvd2VyICE9IG1heHBvd2VyOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gZGF0YS5wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmFsID0gZ2V0TmV4dFZhbHVlKGRhdGEuaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRzIHw9IChyZXNiID4gMCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG93ZXIgPDw9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeVtkaWN0U2l6ZSsrXSA9IGYoYml0cyk7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBkaWN0U2l6ZSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGVubGFyZ2VJbi0tO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgwID09IGVubGFyZ2VJbikge1xuICAgICAgICAgICAgICAgICAgICBlbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBudW1CaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgbnVtQml0cysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGljdGlvbmFyeVtjXSkgZW50cnkgPSBkaWN0aW9uYXJ5W2NdOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGMgIT09IGRpY3RTaXplKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkgPSB3ICsgdy5jaGFyQXQoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5W2RpY3RTaXplKytdID0gdyArIGVudHJ5LmNoYXJBdCgwKTtcbiAgICAgICAgICAgICAgICB3ID0gZW50cnk7XG4gICAgICAgICAgICAgICAgaWYgKDAgPT0gLS1lbmxhcmdlSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZW5sYXJnZUluID0gTWF0aC5wb3coMiwgbnVtQml0cyk7XG4gICAgICAgICAgICAgICAgICAgIG51bUJpdHMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMWlN0cmluZztcbn0oKSwgbnVsbCAhPSBtb2R1bGUgJiYgKG1vZHVsZS5leHBvcnRzID0gTFpTdHJpbmcpO1xuXG52YXIgbW9kdWxlLCBMWlN0cmluZztcblxuY2xhc3MgT3B0aW9uc1N5bmMge1xuICAgIGNvbnN0cnVjdG9yKHtkZWZhdWx0czogZGVmYXVsdHMgPSB7fSwgc3RvcmFnZU5hbWU6IHN0b3JhZ2VOYW1lID0gXCJvcHRpb25zXCIsIG1pZ3JhdGlvbnM6IG1pZ3JhdGlvbnMgPSBbXSwgbG9nZ2luZzogbG9nZ2luZyA9IHRydWUsIHN0b3JhZ2VUeXBlOiBzdG9yYWdlVHlwZSA9IFwic3luY1wifSA9IHt9KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN0b3JhZ2VOYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN0b3JhZ2VUeXBlXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImRlZmF1bHRzXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9mb3JtXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIl9taWdyYXRpb25zXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RvcmFnZU5hbWUgPSBzdG9yYWdlTmFtZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XG4gICAgICAgIHRoaXMuX2hhbmRsZUZvcm1JbnB1dCA9IChkZWxheSA9IDMwMCwgYXRCZWdpbiA9IHRoaXMuX2hhbmRsZUZvcm1JbnB1dC5iaW5kKHRoaXMpLCBcbiAgICAgICAgdm9pZCAwID09PSBjYWxsYmFjayA/IHRocm90dGxlKGRlbGF5LCBhdEJlZ2luLCBmYWxzZSkgOiB0aHJvdHRsZShkZWxheSwgY2FsbGJhY2ssIGZhbHNlICE9PSBhdEJlZ2luKSk7XG4gICAgICAgIHZhciBkZWxheSwgYXRCZWdpbiwgY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2hhbmRsZVN0b3JhZ2VDaGFuZ2VPbkZvcm0gPSB0aGlzLl9oYW5kbGVTdG9yYWdlQ2hhbmdlT25Gb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIGxvZ2dpbmcgfHwgKHRoaXMuX2xvZyA9ICgpID0+IHt9KTtcbiAgICAgICAgdGhpcy5fbWlncmF0aW9ucyA9IHRoaXMuX3J1bk1pZ3JhdGlvbnMobWlncmF0aW9ucyk7XG4gICAgfVxuICAgIGdldCBzdG9yYWdlKCkge1xuICAgICAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2VbdGhpcy5zdG9yYWdlVHlwZV07XG4gICAgfVxuICAgIGFzeW5jIGdldEFsbCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fbWlncmF0aW9ucztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFsbCgpO1xuICAgIH1cbiAgICBhc3luYyBzZXRBbGwobmV3T3B0aW9ucykge1xuICAgICAgICBhd2FpdCB0aGlzLl9taWdyYXRpb25zO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0QWxsKG5ld09wdGlvbnMpO1xuICAgIH1cbiAgICBhc3luYyBzZXQobmV3T3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRBbGwoe1xuICAgICAgICAgICAgLi4uYXdhaXQgdGhpcy5nZXRBbGwoKSxcbiAgICAgICAgICAgIC4uLm5ld09wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIHN5bmNGb3JtKGZvcm0pIHtcbiAgICAgICAgdGhpcy5fZm9ybSA9IGZvcm0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgPyBmb3JtIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtKTtcbiAgICAgICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5faGFuZGxlRm9ybUlucHV0KTtcbiAgICAgICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIodGhpcy5faGFuZGxlU3RvcmFnZUNoYW5nZU9uRm9ybSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUZvcm0odGhpcy5fZm9ybSwgYXdhaXQgdGhpcy5nZXRBbGwoKSk7XG4gICAgfVxuICAgIGFzeW5jIHN0b3BTeW5jRm9ybSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0pIHtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRoaXMuX2hhbmRsZUZvcm1JbnB1dCk7XG4gICAgICAgICAgICB0aGlzLl9mb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5faGFuZGxlU3RvcmFnZUNoYW5nZU9uRm9ybSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZm9ybTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfbG9nKG1ldGhvZCwgLi4uYXJncykge1xuICAgICAgICBjb25zb2xlW21ldGhvZF0oLi4uYXJncyk7XG4gICAgfVxuICAgIGFzeW5jIF9nZXRBbGwoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmdldCh0aGlzLnN0b3JhZ2VOYW1lLCAocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgPyByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSA6IHJlc29sdmUodGhpcy5fZGVjb2RlKHJlc3VsdFt0aGlzLnN0b3JhZ2VOYW1lXSkpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGFzeW5jIF9zZXRBbGwobmV3T3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sb2coXCJsb2dcIiwgXCJTYXZpbmcgb3B0aW9uc1wiLCBuZXdPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHtcbiAgICAgICAgICAgICAgICBbdGhpcy5zdG9yYWdlTmFtZV06IHRoaXMuX2VuY29kZShuZXdPcHRpb25zKVxuICAgICAgICAgICAgfSwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgPyByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSA6IHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBfZW5jb2RlKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgdGhpbm5lZE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaW5uZWRPcHRpb25zKSkgdGhpcy5kZWZhdWx0c1trZXldID09PSB2YWx1ZSAmJiBkZWxldGUgdGhpbm5lZE9wdGlvbnNba2V5XTtcbiAgICAgICAgdGhpcy5fbG9nKFwibG9nXCIsIFwiV2l0aG91dCB0aGUgZGVmYXVsdCB2YWx1ZXNcIiwgdGhpbm5lZE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbHpTdHJpbmcuZXhwb3J0cy5jb21wcmVzc1RvRW5jb2RlZFVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlubmVkT3B0aW9ucykpO1xuICAgIH1cbiAgICBfZGVjb2RlKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGRlY29tcHJlc3NlZCA9IG9wdGlvbnM7XG4gICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIG9wdGlvbnMgJiYgKGRlY29tcHJlc3NlZCA9IEpTT04ucGFyc2UobHpTdHJpbmcuZXhwb3J0cy5kZWNvbXByZXNzRnJvbUVuY29kZWRVUklDb21wb25lbnQob3B0aW9ucykpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMuZGVmYXVsdHMsXG4gICAgICAgICAgICAuLi5kZWNvbXByZXNzZWRcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgX3J1bk1pZ3JhdGlvbnMobWlncmF0aW9ucykge1xuICAgICAgICBpZiAoMCA9PT0gbWlncmF0aW9ucy5sZW5ndGggfHwgIWlzQmFja2dyb3VuZCgpIHx8ICFhd2FpdCBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBpbnN0YWxsVHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09IGluc3RhbGxUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDUwMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNocm9tZS5tYW5hZ2VtZW50Py5nZXRTZWxmID8gY2hyb21lLm1hbmFnZW1lbnQuZ2V0U2VsZigoKHtpbnN0YWxsVHlwZTogaW5zdGFsbFR5cGV9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGluc3RhbGxUeXBlKTtcbiAgICAgICAgICAgICAgICB9KSkgOiBjYWxsYmFjayhcInVua25vd25cIik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0oKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gYXdhaXQgdGhpcy5fZ2V0QWxsKCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWwgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbG9nKFwibG9nXCIsIFwiRm91bmQgdGhlc2Ugc3RvcmVkIG9wdGlvbnNcIiwge1xuICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbG9nKFwiaW5mb1wiLCBcIldpbGwgcnVuXCIsIG1pZ3JhdGlvbnMubGVuZ3RoLCAxID09PSBtaWdyYXRpb25zLmxlbmd0aCA/IFwibWlncmF0aW9uXCIgOiBcIiBtaWdyYXRpb25zXCIpO1xuICAgICAgICBmb3IgKGNvbnN0IG1pZ3JhdGUgb2YgbWlncmF0aW9ucykgbWlncmF0ZShvcHRpb25zLCB0aGlzLmRlZmF1bHRzKTtcbiAgICAgICAgaW5pdGlhbCAhPT0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucykgJiYgYXdhaXQgdGhpcy5fc2V0QWxsKG9wdGlvbnMpO1xuICAgIH1cbiAgICBhc3luYyBfaGFuZGxlRm9ybUlucHV0KHt0YXJnZXQ6IHRhcmdldH0pIHtcbiAgICAgICAgY29uc3QgZmllbGQgPSB0YXJnZXQ7XG4gICAgICAgIGlmIChmaWVsZC5uYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNldCh0aGlzLl9wYXJzZUZvcm0oZmllbGQuZm9ybSkpO1xuICAgICAgICAgICAgZmllbGQuZm9ybS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIm9wdGlvbnMtc3luYzpmb3JtLXN5bmNlZFwiLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9oYW5kbGVGb3JtU3VibWl0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIF91cGRhdGVGb3JtKGZvcm0sIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEZvcm1TdGF0ZSA9IHRoaXMuX3BhcnNlRm9ybShmb3JtKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucykpIGN1cnJlbnRGb3JtU3RhdGVba2V5XSA9PT0gdmFsdWUgJiYgZGVsZXRlIG9wdGlvbnNba2V5XTtcbiAgICAgICAgY29uc3QgaW5jbHVkZSA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICAgICAgICBpbmNsdWRlLmxlbmd0aCA+IDAgJiYgZGVzZXJpYWxpemUoZm9ybSwgb3B0aW9ucywge1xuICAgICAgICAgICAgaW5jbHVkZTogaW5jbHVkZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3BhcnNlRm9ybShmb3JtKSB7XG4gICAgICAgIGNvbnN0IGluY2x1ZGUgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZV1cIikpIGZpZWxkLnZhbGlkaXR5LnZhbGlkICYmICFmaWVsZC5kaXNhYmxlZCAmJiBpbmNsdWRlLnB1c2goZmllbGQubmFtZS5yZXBsYWNlKC9cXFsuKl0vLCBcIlwiKSk7XG4gICAgICAgIHJldHVybiBzZXJpYWxpemUoZm9ybSwge1xuICAgICAgICAgICAgaW5jbHVkZTogaW5jbHVkZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2hhbmRsZVN0b3JhZ2VDaGFuZ2VPbkZvcm0oY2hhbmdlcywgYXJlYU5hbWUpIHtcbiAgICAgICAgYXJlYU5hbWUgIT09IHRoaXMuc3RvcmFnZVR5cGUgfHwgIWNoYW5nZXNbdGhpcy5zdG9yYWdlTmFtZV0gfHwgZG9jdW1lbnQuaGFzRm9jdXMoKSAmJiB0aGlzLl9mb3JtLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHx8IHRoaXMuX3VwZGF0ZUZvcm0odGhpcy5fZm9ybSwgdGhpcy5fZGVjb2RlKGNoYW5nZXNbdGhpcy5zdG9yYWdlTmFtZV0ubmV3VmFsdWUpKTtcbiAgICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShPcHRpb25zU3luYywgXCJtaWdyYXRpb25zXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZToge1xuICAgICAgICByZW1vdmVVbnVzZWQob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9wdGlvbnMpKSBrZXkgaW4gZGVmYXVsdHMgfHwgZGVsZXRlIG9wdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5leHBvcnQgeyBPcHRpb25zU3luYyBhcyBkZWZhdWx0IH07XG4iLCJsZXQgY2FjaGUgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVXZWJleHREZXRlY3RQYWdlQ2FjaGUoKSB7XG4gICAgY2FjaGUgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzQ3VycmVudFBhdGhuYW1lKHBhdGgpIHtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgICAgIHJldHVybiBwYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE1hbmlmZXN0KF92ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lPy5nZXRNYW5pZmVzdD8uKCk7XG59XG5mdW5jdGlvbiBvbmNlKGZ1bmN0aW9uXykge1xuICAgIGxldCByZXN1bHQ7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFjYWNoZSB8fCB0eXBlb2YgcmVzdWx0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuY3Rpb25fKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBvbiBodHRwKHMpOi8vIHBhZ2VzIChpdCBjb3VsZCBiZSBpbiBhIGNvbnRlbnQgc2NyaXB0IG9yIHJlZ3VsYXIgd2ViIGNvbnRleHQpICovXG5leHBvcnQgY29uc3QgaXNXZWJQYWdlID0gb25jZSgoKSA9PiBnbG9iYWxUaGlzLmxvY2F0aW9uPy5wcm90b2NvbC5zdGFydHNXaXRoKCdodHRwJykpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBleHRlbnNpb24gY29udGV4dHMgdGhhdCBoYXZlIGFjY2VzcyB0byB0aGUgY2hyb21lIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRXh0ZW5zaW9uQ29udGV4dCA9IG9uY2UoKCkgPT4gdHlwZW9mIGdsb2JhbFRoaXMuY2hyb21lPy5leHRlbnNpb24gPT09ICdvYmplY3QnKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBjb250ZW50IHNjcmlwdCAqL1xuZXhwb3J0IGNvbnN0IGlzQ29udGVudFNjcmlwdCA9IG9uY2UoKCkgPT4gaXNFeHRlbnNpb25Db250ZXh0KCkgJiYgaXNXZWJQYWdlKCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgY29udGV4dCAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZCA9ICgpID0+IGlzQmFja2dyb3VuZFBhZ2UoKSB8fCBpc0JhY2tncm91bmRXb3JrZXIoKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHBhZ2UgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgY29uc3QgbWFuaWZlc3QgPSBnZXRNYW5pZmVzdCgyKTtcbiAgICBpZiAobWFuaWZlc3RcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUobWFuaWZlc3QuYmFja2dyb3VuZF9wYWdlIHx8IG1hbmlmZXN0LmJhY2tncm91bmQ/LnBhZ2UpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihtYW5pZmVzdD8uYmFja2dyb3VuZD8uc2NyaXB0c1xuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZSgnL19nZW5lcmF0ZWRfYmFja2dyb3VuZF9wYWdlLmh0bWwnKSk7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBiYWNrZ3JvdW5kIHdvcmtlciAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFdvcmtlciA9IG9uY2UoKCkgPT4gaXNDdXJyZW50UGF0aG5hbWUoZ2V0TWFuaWZlc3QoMyk/LmJhY2tncm91bmQ/LnNlcnZpY2Vfd29ya2VyKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGFuIG9wdGlvbnMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgKi9cbmV4cG9ydCBjb25zdCBpc09wdGlvbnNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgaWYgKCFpc0V4dGVuc2lvbkNvbnRleHQoKSB8fCAhY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB7IG9wdGlvbnNfdWk6IG9wdGlvbnNVaSB9ID0gY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNVaT8ucGFnZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKG9wdGlvbnNVaS5wYWdlLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgZGV2IHRvb2xzIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gIGBkZXZ0b29sc19wYWdlYCBmaWVsZC4gKi9cbmV4cG9ydCBjb25zdCBpc0RldlRvb2xzUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGlmICghaXNFeHRlbnNpb25Db250ZXh0KCkgfHwgIWNocm9tZS5kZXZ0b29scykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHsgZGV2dG9vbHNfcGFnZTogZGV2dG9vbHNQYWdlIH0gPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgIGlmICh0eXBlb2YgZGV2dG9vbHNQYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZGV2dG9vbHNQYWdlLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgIHJldHVybiB1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xufSk7XG4vKiogTG9vc2VseSBkZXRlY3QgRmlyZWZveCB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzRmlyZWZveCA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gnKTtcbi8qKiBMb29zZWx5IGRldGVjdCBDaHJvbWUgdmlhIHVzZXIgYWdlbnQgKG1pZ2h0IGFsc28gaW5jbHVkZSBDaHJvbWl1bSBhbmQgZm9ya3MgbGlrZSBPcGVyYSkgKi9cbmV4cG9ydCBjb25zdCBpc0Nocm9tZSA9ICgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ0Nocm9tZScpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IFNhZmFyaSB2aWEgdXNlciBhZ2VudCAqL1xuZXhwb3J0IGNvbnN0IGlzU2FmYXJpID0gKCkgPT4gIWlzQ2hyb21lKCkgJiYgZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnU2FmYXJpJyk7XG5leHBvcnQgY29uc3QgY29udGV4dE5hbWVzID0ge1xuICAgIGNvbnRlbnRTY3JpcHQ6IGlzQ29udGVudFNjcmlwdCxcbiAgICBiYWNrZ3JvdW5kOiBpc0JhY2tncm91bmQsXG4gICAgb3B0aW9uczogaXNPcHRpb25zUGFnZSxcbiAgICBkZXZUb29sc1BhZ2U6IGlzRGV2VG9vbHNQYWdlLFxuICAgIGV4dGVuc2lvbjogaXNFeHRlbnNpb25Db250ZXh0LFxuICAgIHdlYjogaXNXZWJQYWdlLFxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0TmFtZSgpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB0ZXN0XSBvZiBPYmplY3QuZW50cmllcyhjb250ZXh0TmFtZXMpKSB7XG4gICAgICAgIGlmICh0ZXN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAndW5rbm93bic7XG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iXSwibmFtZXMiOlsiYnJvd3NlciIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwiQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFIiwiU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HIiwid3JhcEFQSXMiLCJleHRlbnNpb25BUElzIiwiYXBpTWV0YWRhdGEiLCJrZXlzIiwibGVuZ3RoIiwiRXJyb3IiLCJEZWZhdWx0V2Vha01hcCIsIldlYWtNYXAiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZUl0ZW0iLCJpdGVtcyIsInVuZGVmaW5lZCIsImdldCIsImtleSIsImhhcyIsInNldCIsImlzVGhlbmFibGUiLCJ2YWx1ZSIsInRoZW4iLCJtYWtlQ2FsbGJhY2siLCJwcm9taXNlIiwibWV0YWRhdGEiLCJjYWxsYmFja0FyZ3MiLCJydW50aW1lIiwibGFzdEVycm9yIiwicmVqZWN0IiwibWVzc2FnZSIsInNpbmdsZUNhbGxiYWNrQXJnIiwicmVzb2x2ZSIsInBsdXJhbGl6ZUFyZ3VtZW50cyIsIm51bUFyZ3MiLCJ3cmFwQXN5bmNGdW5jdGlvbiIsIm5hbWUiLCJhc3luY0Z1bmN0aW9uV3JhcHBlciIsInRhcmdldCIsImFyZ3MiLCJtaW5BcmdzIiwibWF4QXJncyIsIlByb21pc2UiLCJmYWxsYmFja1RvTm9DYWxsYmFjayIsImNiRXJyb3IiLCJjb25zb2xlIiwid2FybiIsIm5vQ2FsbGJhY2siLCJ3cmFwTWV0aG9kIiwibWV0aG9kIiwid3JhcHBlciIsIlByb3h5IiwiYXBwbHkiLCJ0YXJnZXRNZXRob2QiLCJ0aGlzT2JqIiwiY2FsbCIsImhhc093blByb3BlcnR5IiwiRnVuY3Rpb24iLCJiaW5kIiwid3JhcE9iamVjdCIsIndyYXBwZXJzIiwiY2FjaGUiLCJjcmVhdGUiLCJoYW5kbGVycyIsInByb3h5VGFyZ2V0IiwicHJvcCIsInJlY2VpdmVyIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZGVzYyIsIlJlZmxlY3QiLCJkZWxldGVQcm9wZXJ0eSIsIndyYXBFdmVudCIsIndyYXBwZXJNYXAiLCJhZGRMaXN0ZW5lciIsImxpc3RlbmVyIiwiaGFzTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsIm9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMiLCJvblJlcXVlc3RGaW5pc2hlZCIsInJlcSIsIndyYXBwZWRSZXEiLCJnZXRDb250ZW50IiwibG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nIiwib25NZXNzYWdlV3JhcHBlcnMiLCJvbk1lc3NhZ2UiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJkaWRDYWxsU2VuZFJlc3BvbnNlIiwid3JhcHBlZFNlbmRSZXNwb25zZSIsInNlbmRSZXNwb25zZVByb21pc2UiLCJyZXNwb25zZSIsInN0YWNrIiwicmVzdWx0IiwiZXJyIiwiaXNSZXN1bHRUaGVuYWJsZSIsInNlbmRQcm9taXNlZFJlc3VsdCIsIm1zZyIsImVycm9yIiwiX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fIiwiY2F0Y2giLCJ3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayIsInJlcGx5Iiwid3JhcHBlZFNlbmRNZXNzYWdlIiwiYXBpTmFtZXNwYWNlT2JqIiwid3JhcHBlZENiIiwicHVzaCIsInNlbmRNZXNzYWdlIiwic3RhdGljV3JhcHBlcnMiLCJkZXZ0b29scyIsIm5ldHdvcmsiLCJvbk1lc3NhZ2VFeHRlcm5hbCIsInRhYnMiLCJzZXR0aW5nTWV0YWRhdGEiLCJjbGVhciIsInByaXZhY3kiLCJzZXJ2aWNlcyIsIndlYnNpdGVzIiwiY2hyb21lIiwiaWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sInZlcnNpb24iOjMsImZpbGUiOiJvcHRpb25zLjgzZDc2ZGU2LmpzLm1hcCJ9
