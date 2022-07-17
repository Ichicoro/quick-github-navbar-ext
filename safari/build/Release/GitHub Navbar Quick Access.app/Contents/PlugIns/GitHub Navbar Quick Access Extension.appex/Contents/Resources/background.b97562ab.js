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
})({"92Kb6":[function(require,module,exports) {
// eslint-disable-next-line import/no-unassigned-import
var _optionsStorageJs = require("./options-storage.js");

},{"./options-storage.js":"8mHnd"}],"8mHnd":[function(require,module,exports) {
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

},{"webext-options-sync":"8TxX1","@parcel/transformer-js/src/esmodule-helpers.js":"eqUf2"}],"8TxX1":[function(require,module,exports) {
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

},{"webext-detect-page":"8gdGn","@parcel/transformer-js/src/esmodule-helpers.js":"eqUf2"}],"8gdGn":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"eqUf2"}],"eqUf2":[function(require,module,exports) {
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

},{}]},["92Kb6"], "92Kb6", "parcelRequire94c2")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFVLEdBQUcsRUFBRTtRQUN6QyxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUN2RSxPQUFPO1FBR1QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQy9CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLEdBQUcsRUFBRSxXQUFZO2dCQUNmLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFVLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUNwQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixHQUFHLEVBQUUsR0FBRztLQUNULENBQUMsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzIjpbInNvdXJjZS9iYWNrZ3JvdW5kLmpzIiwic291cmNlL29wdGlvbnMtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy93ZWJleHQtb3B0aW9ucy1zeW5jL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3dlYmV4dC1kZXRlY3QtcGFnZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW5hc3NpZ25lZC1pbXBvcnRcbmltcG9ydCAnLi9vcHRpb25zLXN0b3JhZ2UuanMnO1xuIiwiaW1wb3J0IE9wdGlvbnNTeW5jIGZyb20gJ3dlYmV4dC1vcHRpb25zLXN5bmMnO1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgT3B0aW9uc1N5bmMoe1xuXHRkZWZhdWx0czoge1xuXHRcdGNvbG9yUmVkOiAyNDQsXG5cdFx0Y29sb3JHcmVlbjogNjcsXG5cdFx0Y29sb3JCbHVlOiA1NCxcblx0XHR0ZXh0OiAnU2V0IGEgdGV4dCEnLFxuXHR9LFxuXHRtaWdyYXRpb25zOiBbXG5cdFx0T3B0aW9uc1N5bmMubWlncmF0aW9ucy5yZW1vdmVVbnVzZWQsXG5cdF0sXG5cdGxvZ2dpbmc6IHRydWUsXG59KTtcbiIsImltcG9ydCB7IGlzQmFja2dyb3VuZCB9IGZyb20gXCJ3ZWJleHQtZGV0ZWN0LXBhZ2VcIjtcblxuZnVuY3Rpb24gdGhyb3R0bGUoZGVsYXksIG5vVHJhaWxpbmcsIGNhbGxiYWNrLCBkZWJvdW5jZU1vZGUpIHtcbiAgICB2YXIgdGltZW91dElEO1xuICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgbGFzdEV4ZWMgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFyRXhpc3RpbmdUaW1lb3V0KCkge1xuICAgICAgICB0aW1lb3V0SUQgJiYgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgfVxuICAgIGlmIChcImJvb2xlYW5cIiAhPSB0eXBlb2Ygbm9UcmFpbGluZykge1xuICAgICAgICBkZWJvdW5jZU1vZGUgPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2sgPSBub1RyYWlsaW5nO1xuICAgICAgICBub1RyYWlsaW5nID0gdm9pZCAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJndW1lbnRzXyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIGFyZ3VtZW50c19bX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gbGFzdEV4ZWM7XG4gICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICBkZWJvdW5jZU1vZGUgJiYgIXRpbWVvdXRJRCAmJiBleGVjKCk7XG4gICAgICAgICAgICBjbGVhckV4aXN0aW5nVGltZW91dCgpO1xuICAgICAgICAgICAgdm9pZCAwID09PSBkZWJvdW5jZU1vZGUgJiYgZWxhcHNlZCA+IGRlbGF5ID8gZXhlYygpIDogdHJ1ZSAhPT0gbm9UcmFpbGluZyAmJiAodGltZW91dElEID0gc2V0VGltZW91dChkZWJvdW5jZU1vZGUgPyBjbGVhciA6IGV4ZWMsIHZvaWQgMCA9PT0gZGVib3VuY2VNb2RlID8gZGVsYXkgLSBlbGFwc2VkIDogZGVsYXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgICAgICAgbGFzdEV4ZWMgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoc2VsZiwgYXJndW1lbnRzXyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICB0aW1lb3V0SUQgPSB2b2lkIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd3JhcHBlci5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJFeGlzdGluZ1RpbWVvdXQoKTtcbiAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiB3cmFwcGVyO1xufVxuXG5jbGFzcyBUeXBlUmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKGluaXRpYWwgPSB7fSkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyZWRUeXBlcyA9IGluaXRpYWw7XG4gICAgfVxuICAgIGdldCh0eXBlKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDAgIT09IHRoaXMucmVnaXN0ZXJlZFR5cGVzW3R5cGVdID8gdGhpcy5yZWdpc3RlcmVkVHlwZXNbdHlwZV0gOiB0aGlzLnJlZ2lzdGVyZWRUeXBlcy5kZWZhdWx0O1xuICAgIH1cbiAgICByZWdpc3Rlcih0eXBlLCBpdGVtKSB7XG4gICAgICAgIHZvaWQgMCA9PT0gdGhpcy5yZWdpc3RlcmVkVHlwZXNbdHlwZV0gJiYgKHRoaXMucmVnaXN0ZXJlZFR5cGVzW3R5cGVdID0gaXRlbSk7XG4gICAgfVxuICAgIHJlZ2lzdGVyRGVmYXVsdChpdGVtKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXCJkZWZhdWx0XCIsIGl0ZW0pO1xuICAgIH1cbn1cblxuY2xhc3MgS2V5RXh0cmFjdG9ycyBleHRlbmRzIFR5cGVSZWdpc3RyeSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHQoKGVsID0+IGVsLmdldEF0dHJpYnV0ZShcIm5hbWVcIikgfHwgXCJcIikpO1xuICAgIH1cbn1cblxuY2xhc3MgSW5wdXRSZWFkZXJzIGV4dGVuZHMgVHlwZVJlZ2lzdHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdCgoZWwgPT4gZWwudmFsdWUpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihcImNoZWNrYm94XCIsIChlbCA9PiBudWxsICE9PSBlbC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA/IGVsLmNoZWNrZWQgPyBlbC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA6IG51bGwgOiBlbC5jaGVja2VkKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXCJzZWxlY3RcIiwgKGVsID0+IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSwgb3B0aW9uLCBpO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXg7XG4gICAgICAgICAgICB2YXIgb25lID0gXCJzZWxlY3Qtb25lXCIgPT09IGVsZW0udHlwZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBvbmUgPyBudWxsIDogW107XG4gICAgICAgICAgICB2YXIgbWF4ID0gb25lID8gaW5kZXggKyAxIDogb3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICBpID0gaW5kZXggPCAwID8gbWF4IDogb25lID8gaW5kZXggOiAwO1xuICAgICAgICAgICAgZm9yICg7aSA8IG1heDsgaSsrKSBpZiAoKChvcHRpb24gPSBvcHRpb25zW2ldKS5zZWxlY3RlZCB8fCBpID09PSBpbmRleCkgJiYgIW9wdGlvbi5kaXNhYmxlZCAmJiAhKG9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkICYmIFwib3B0Z3JvdXBcIiA9PT0gb3B0aW9uLnBhcmVudE5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChvbmUpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICB9KGVsKSkpO1xuICAgIH1cbn1cblxuY2xhc3MgS2V5QXNzaWdubWVudFZhbGlkYXRvcnMgZXh0ZW5kcyBUeXBlUmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0KCgoKSA9PiB0cnVlKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXCJyYWRpb1wiLCAoZWwgPT4gZWwuY2hlY2tlZCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5U3BsaXR0ZXIoa2V5KSB7XG4gICAgbGV0IG1hdGNoZXMgPSBrZXkubWF0Y2goL1teW1xcXV0rL2cpO1xuICAgIGxldCBsYXN0S2V5O1xuICAgIGlmIChrZXkubGVuZ3RoID4gMSAmJiBrZXkuaW5kZXhPZihcIltdXCIpID09PSBrZXkubGVuZ3RoIC0gMikge1xuICAgICAgICBsYXN0S2V5ID0gbWF0Y2hlcy5wb3AoKTtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKFsgbGFzdEtleSBdKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRUeXBlKGVsKSB7XG4gICAgbGV0IHR5cGVBdHRyO1xuICAgIGxldCB0YWdOYW1lID0gZWwudGFnTmFtZTtcbiAgICBsZXQgdHlwZSA9IHRhZ05hbWU7XG4gICAgaWYgKFwiaW5wdXRcIiA9PT0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHR5cGVBdHRyID0gZWwuZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtcbiAgICAgICAgdHlwZSA9IHR5cGVBdHRyIHx8IFwidGV4dFwiO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRJbnB1dEVsZW1lbnRzKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LHNlbGVjdCx0ZXh0YXJlYVwiKSwgKGVsID0+IHtcbiAgICAgICAgaWYgKFwiaW5wdXRcIiA9PT0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICYmIChcInN1Ym1pdFwiID09PSBlbC50eXBlIHx8IFwicmVzZXRcIiA9PT0gZWwudHlwZSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgbGV0IG15VHlwZSA9IGdldEVsZW1lbnRUeXBlKGVsKTtcbiAgICAgICAgbGV0IGlkZW50aWZpZXIgPSBvcHRpb25zLmtleUV4dHJhY3RvcnMuZ2V0KG15VHlwZSkoZWwpO1xuICAgICAgICBsZXQgZm91bmRJbkluY2x1ZGUgPSAtMSAhPT0gKG9wdGlvbnMuaW5jbHVkZSB8fCBbXSkuaW5kZXhPZihpZGVudGlmaWVyKTtcbiAgICAgICAgbGV0IGZvdW5kSW5FeGNsdWRlID0gLTEgIT09IChvcHRpb25zLmV4Y2x1ZGUgfHwgW10pLmluZGV4T2YoaWRlbnRpZmllcik7XG4gICAgICAgIGxldCBmb3VuZEluSWdub3JlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgcmVqZWN0ID0gZmFsc2U7XG4gICAgICAgIGlmIChvcHRpb25zLmlnbm9yZWRUeXBlcykgZm9yIChsZXQgc2VsZWN0b3Igb2Ygb3B0aW9ucy5pZ25vcmVkVHlwZXMpIGVsLm1hdGNoZXMoc2VsZWN0b3IpICYmIChmb3VuZEluSWdub3JlZCA9IHRydWUpO1xuICAgICAgICByZWplY3QgPSAhZm91bmRJbkluY2x1ZGUgJiYgKCEhb3B0aW9ucy5pbmNsdWRlIHx8IChmb3VuZEluRXhjbHVkZSB8fCBmb3VuZEluSWdub3JlZCkpO1xuICAgICAgICByZXR1cm4gIXJlamVjdDtcbiAgICB9KSk7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbktleVZhbHVlKG9iaiwga2V5Y2hhaW4sIHZhbHVlKSB7XG4gICAgaWYgKCFrZXljaGFpbikgcmV0dXJuIG9iajtcbiAgICB2YXIga2V5ID0ga2V5Y2hhaW4uc2hpZnQoKTtcbiAgICBvYmpba2V5XSB8fCAob2JqW2tleV0gPSBBcnJheS5pc0FycmF5KGtleSkgPyBbXSA6IHt9KTtcbiAgICAwID09PSBrZXljaGFpbi5sZW5ndGggJiYgKEFycmF5LmlzQXJyYXkob2JqW2tleV0pID8gbnVsbCAhPT0gdmFsdWUgJiYgb2JqW2tleV0ucHVzaCh2YWx1ZSkgOiBvYmpba2V5XSA9IHZhbHVlKTtcbiAgICBrZXljaGFpbi5sZW5ndGggPiAwICYmIGFzc2lnbktleVZhbHVlKG9ialtrZXldLCBrZXljaGFpbiwgdmFsdWUpO1xuICAgIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IHt9O1xuICAgIG9wdGlvbnMua2V5U3BsaXR0ZXIgPSBvcHRpb25zLmtleVNwbGl0dGVyIHx8IGtleVNwbGl0dGVyO1xuICAgIG9wdGlvbnMua2V5RXh0cmFjdG9ycyA9IG5ldyBLZXlFeHRyYWN0b3JzKG9wdGlvbnMua2V5RXh0cmFjdG9ycyB8fCB7fSk7XG4gICAgb3B0aW9ucy5pbnB1dFJlYWRlcnMgPSBuZXcgSW5wdXRSZWFkZXJzKG9wdGlvbnMuaW5wdXRSZWFkZXJzIHx8IHt9KTtcbiAgICBvcHRpb25zLmtleUFzc2lnbm1lbnRWYWxpZGF0b3JzID0gbmV3IEtleUFzc2lnbm1lbnRWYWxpZGF0b3JzKG9wdGlvbnMua2V5QXNzaWdubWVudFZhbGlkYXRvcnMgfHwge30pO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZ2V0SW5wdXRFbGVtZW50cyhlbGVtZW50LCBvcHRpb25zKSwgKGVsID0+IHtcbiAgICAgICAgbGV0IHR5cGUgPSBnZXRFbGVtZW50VHlwZShlbCk7XG4gICAgICAgIGxldCBrZXkgPSBvcHRpb25zLmtleUV4dHJhY3RvcnMuZ2V0KHR5cGUpKGVsKTtcbiAgICAgICAgbGV0IHZhbHVlID0gb3B0aW9ucy5pbnB1dFJlYWRlcnMuZ2V0KHR5cGUpKGVsKTtcbiAgICAgICAgaWYgKG9wdGlvbnMua2V5QXNzaWdubWVudFZhbGlkYXRvcnMuZ2V0KHR5cGUpKGVsLCBrZXksIHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IGtleWNoYWluID0gb3B0aW9ucy5rZXlTcGxpdHRlcihrZXkpO1xuICAgICAgICAgICAgZGF0YSA9IGFzc2lnbktleVZhbHVlKGRhdGEsIGtleWNoYWluLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbmNsYXNzIElucHV0V3JpdGVycyBleHRlbmRzIFR5cGVSZWdpc3RyeSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHQoKChlbCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihcImNoZWNrYm94XCIsICgoZWwsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBudWxsID09PSB2YWx1ZSA/IGVsLmluZGV0ZXJtaW5hdGUgPSB0cnVlIDogZWwuY2hlY2tlZCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gLTEgIT09IHZhbHVlLmluZGV4T2YoZWwudmFsdWUpIDogdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihcInJhZGlvXCIsIChmdW5jdGlvbihlbCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZvaWQgMCAhPT0gdmFsdWUgJiYgKGVsLmNoZWNrZWQgPSBlbC52YWx1ZSA9PT0gdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihcInNlbGVjdFwiLCBzZXRTZWxlY3RWYWx1ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRTZWxlY3RWYWx1ZShlbGVtLCB2YWx1ZSkge1xuICAgIHZhciBvcHRpb25TZXQsIG9wdGlvbjtcbiAgICB2YXIgb3B0aW9ucyA9IGVsZW0ub3B0aW9ucztcbiAgICB2YXIgdmFsdWVzID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgbnVsbCAhPT0gYXJyICYmIChBcnJheS5pc0FycmF5KGFycikgPyByZXQucHVzaC5hcHBseShyZXQsIGFycikgOiByZXQucHVzaChhcnIpKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KHZhbHVlKTtcbiAgICB2YXIgaSA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIGZvciAoO2ktLTsgKSB7XG4gICAgICAgIG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICAgIGlmICh2YWx1ZXMuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTEpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIG9wdGlvblNldCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3B0aW9uU2V0IHx8IChlbGVtLnNlbGVjdGVkSW5kZXggPSAtMSk7XG59XG5cbmZ1bmN0aW9uIGtleUpvaW5lcihwYXJlbnRLZXksIGNoaWxkS2V5KSB7XG4gICAgcmV0dXJuIHBhcmVudEtleSArIFwiW1wiICsgY2hpbGRLZXkgKyBcIl1cIjtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkRhdGEoZGF0YSwgcGFyZW50S2V5LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZmxhdERhdGEgPSB7fTtcbiAgICBsZXQga2V5Sm9pbmVyJDEgPSBvcHRpb25zLmtleUpvaW5lciB8fCBrZXlKb2luZXI7XG4gICAgZm9yIChsZXQga2V5TmFtZSBpbiBkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXlOYW1lKSkgY29udGludWU7XG4gICAgICAgIGxldCB2YWx1ZSA9IGRhdGFba2V5TmFtZV07XG4gICAgICAgIGxldCBoYXNoID0ge307XG4gICAgICAgIHBhcmVudEtleSAmJiAoa2V5TmFtZSA9IGtleUpvaW5lciQxKHBhcmVudEtleSwga2V5TmFtZSkpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGhhc2hba2V5TmFtZSArIFwiW11cIl0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGhhc2hba2V5TmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIFwib2JqZWN0XCIgPT0gdHlwZW9mIHZhbHVlID8gaGFzaCA9IGZsYXR0ZW5EYXRhKHZhbHVlLCBrZXlOYW1lLCBvcHRpb25zKSA6IGhhc2hba2V5TmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihmbGF0RGF0YSwgaGFzaCk7XG4gICAgfVxuICAgIHJldHVybiBmbGF0RGF0YTtcbn1cblxuZnVuY3Rpb24gZGVzZXJpYWxpemUoZm9ybSwgZGF0YSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGZsYXR0ZW5lZERhdGEgPSBmbGF0dGVuRGF0YShkYXRhLCBudWxsLCBvcHRpb25zKTtcbiAgICBvcHRpb25zLmtleUV4dHJhY3RvcnMgPSBuZXcgS2V5RXh0cmFjdG9ycyhvcHRpb25zLmtleUV4dHJhY3RvcnMgfHwge30pO1xuICAgIG9wdGlvbnMuaW5wdXRXcml0ZXJzID0gbmV3IElucHV0V3JpdGVycyhvcHRpb25zLmlucHV0V3JpdGVycyB8fCB7fSk7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChnZXRJbnB1dEVsZW1lbnRzKGZvcm0sIG9wdGlvbnMpLCAoZWwgPT4ge1xuICAgICAgICBsZXQgdHlwZSA9IGdldEVsZW1lbnRUeXBlKGVsKTtcbiAgICAgICAgbGV0IGtleSA9IG9wdGlvbnMua2V5RXh0cmFjdG9ycy5nZXQodHlwZSkoZWwpO1xuICAgICAgICBvcHRpb25zLmlucHV0V3JpdGVycy5nZXQodHlwZSkoZWwsIGZsYXR0ZW5lZERhdGFba2V5XSk7XG4gICAgfSkpO1xufVxuXG52YXIgbHpTdHJpbmcgPSB7XG4gICAgZXhwb3J0czoge31cbn07XG5cbm1vZHVsZSA9IGx6U3RyaW5nLCBMWlN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcbiAgICB2YXIga2V5U3RyQmFzZTY0ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiO1xuICAgIHZhciBrZXlTdHJVcmlTYWZlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSstJFwiO1xuICAgIHZhciBiYXNlUmV2ZXJzZURpYyA9IHt9O1xuICAgIGZ1bmN0aW9uIGdldEJhc2VWYWx1ZShhbHBoYWJldCwgY2hhcmFjdGVyKSB7XG4gICAgICAgIGlmICghYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdKSB7XG4gICAgICAgICAgICBiYXNlUmV2ZXJzZURpY1thbHBoYWJldF0gPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxwaGFiZXQubGVuZ3RoOyBpKyspIGJhc2VSZXZlcnNlRGljW2FscGhhYmV0XVthbHBoYWJldC5jaGFyQXQoaSldID0gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdW2NoYXJhY3Rlcl07XG4gICAgfVxuICAgIHZhciBMWlN0cmluZyA9IHtcbiAgICAgICAgY29tcHJlc3NUb0Jhc2U2NDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICAgIGlmIChudWxsID09IGlucHV0KSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIHZhciByZXMgPSBMWlN0cmluZy5fY29tcHJlc3MoaW5wdXQsIDYsIChmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleVN0ckJhc2U2NC5jaGFyQXQoYSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHJlcy5sZW5ndGggJSA0KSB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzICsgXCI9PT1cIjtcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyArIFwiPT1cIjtcblxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyArIFwiPVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZWNvbXByZXNzRnJvbUJhc2U2NDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IGlucHV0ID8gXCJcIiA6IFwiXCIgPT0gaW5wdXQgPyBudWxsIDogTFpTdHJpbmcuX2RlY29tcHJlc3MoaW5wdXQubGVuZ3RoLCAzMiwgKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEJhc2VWYWx1ZShrZXlTdHJCYXNlNjQsIGlucHV0LmNoYXJBdChpbmRleCkpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wcmVzc1RvVVRGMTY6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCA9PSBpbnB1dCA/IFwiXCIgOiBMWlN0cmluZy5fY29tcHJlc3MoaW5wdXQsIDE1LCAoZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmKGEgKyAzMik7XG4gICAgICAgICAgICB9KSkgKyBcIiBcIjtcbiAgICAgICAgfSxcbiAgICAgICAgZGVjb21wcmVzc0Zyb21VVEYxNjogZnVuY3Rpb24oY29tcHJlc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGwgPT0gY29tcHJlc3NlZCA/IFwiXCIgOiBcIlwiID09IGNvbXByZXNzZWQgPyBudWxsIDogTFpTdHJpbmcuX2RlY29tcHJlc3MoY29tcHJlc3NlZC5sZW5ndGgsIDE2Mzg0LCAoZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHJlc3NlZC5jaGFyQ29kZUF0KGluZGV4KSAtIDMyO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wcmVzc1RvVWludDhBcnJheTogZnVuY3Rpb24odW5jb21wcmVzc2VkKSB7XG4gICAgICAgICAgICB2YXIgY29tcHJlc3NlZCA9IExaU3RyaW5nLmNvbXByZXNzKHVuY29tcHJlc3NlZCk7XG4gICAgICAgICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkoMiAqIGNvbXByZXNzZWQubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBUb3RhbExlbiA9IGNvbXByZXNzZWQubGVuZ3RoOyBpIDwgVG90YWxMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50X3ZhbHVlID0gY29tcHJlc3NlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgIGJ1ZlsyICogaV0gPSBjdXJyZW50X3ZhbHVlID4+PiA4O1xuICAgICAgICAgICAgICAgIGJ1ZlsyICogaSArIDFdID0gY3VycmVudF92YWx1ZSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH0sXG4gICAgICAgIGRlY29tcHJlc3NGcm9tVWludDhBcnJheTogZnVuY3Rpb24oY29tcHJlc3NlZCkge1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gY29tcHJlc3NlZCkgcmV0dXJuIExaU3RyaW5nLmRlY29tcHJlc3MoY29tcHJlc3NlZCk7XG4gICAgICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5KGNvbXByZXNzZWQubGVuZ3RoIC8gMik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgVG90YWxMZW4gPSBidWYubGVuZ3RoOyBpIDwgVG90YWxMZW47IGkrKykgYnVmW2ldID0gMjU2ICogY29tcHJlc3NlZFsyICogaV0gKyBjb21wcmVzc2VkWzIgKiBpICsgMV07XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBidWYuZm9yRWFjaCgoZnVuY3Rpb24oYykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGYoYykpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIExaU3RyaW5nLmRlY29tcHJlc3MocmVzdWx0LmpvaW4oXCJcIikpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wcmVzc1RvRW5jb2RlZFVSSUNvbXBvbmVudDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IGlucHV0ID8gXCJcIiA6IExaU3RyaW5nLl9jb21wcmVzcyhpbnB1dCwgNiwgKGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5U3RyVXJpU2FmZS5jaGFyQXQoYSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlY29tcHJlc3NGcm9tRW5jb2RlZFVSSUNvbXBvbmVudDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgICAgIGlmIChudWxsID09IGlucHV0KSByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIGlmIChcIlwiID09IGlucHV0KSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvIC9nLCBcIitcIik7XG4gICAgICAgICAgICByZXR1cm4gTFpTdHJpbmcuX2RlY29tcHJlc3MoaW5wdXQubGVuZ3RoLCAzMiwgKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEJhc2VWYWx1ZShrZXlTdHJVcmlTYWZlLCBpbnB1dC5jaGFyQXQoaW5kZXgpKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHJlc3M6IGZ1bmN0aW9uKHVuY29tcHJlc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIExaU3RyaW5nLl9jb21wcmVzcyh1bmNvbXByZXNzZWQsIDE2LCAoZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBfY29tcHJlc3M6IGZ1bmN0aW9uKHVuY29tcHJlc3NlZCwgYml0c1BlckNoYXIsIGdldENoYXJGcm9tSW50KSB7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSB1bmNvbXByZXNzZWQpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgdmFyIGksIHZhbHVlLCBpaSwgY29udGV4dF9kaWN0aW9uYXJ5ID0ge30sIGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlID0ge30sIGNvbnRleHRfYyA9IFwiXCIsIGNvbnRleHRfd2MgPSBcIlwiLCBjb250ZXh0X3cgPSBcIlwiLCBjb250ZXh0X2VubGFyZ2VJbiA9IDIsIGNvbnRleHRfZGljdFNpemUgPSAzLCBjb250ZXh0X251bUJpdHMgPSAyLCBjb250ZXh0X2RhdGEgPSBbXSwgY29udGV4dF9kYXRhX3ZhbCA9IDAsIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICBmb3IgKGlpID0gMDsgaWkgPCB1bmNvbXByZXNzZWQubGVuZ3RoOyBpaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF9jID0gdW5jb21wcmVzc2VkLmNoYXJBdChpaSk7XG4gICAgICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGV4dF9kaWN0aW9uYXJ5LCBjb250ZXh0X2MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGljdGlvbmFyeVtjb250ZXh0X2NdID0gY29udGV4dF9kaWN0U2l6ZSsrO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZVtjb250ZXh0X2NdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dF93YyA9IGNvbnRleHRfdyArIGNvbnRleHRfYztcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRleHRfZGljdGlvbmFyeSwgY29udGV4dF93YykpIGNvbnRleHRfdyA9IGNvbnRleHRfd2M7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlLCBjb250ZXh0X3cpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF93LmNoYXJDb2RlQXQoMCkgPCAyNTYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dF9udW1CaXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA8PD0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhciAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IDEgJiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhciAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dF9udW1CaXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gY29udGV4dF9kYXRhX3ZhbCA8PCAxIHwgMSAmIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID4+PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IC0tY29udGV4dF9lbmxhcmdlSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2VubGFyZ2VJbiA9IE1hdGgucG93KDIsIGNvbnRleHRfbnVtQml0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGVbY29udGV4dF93XTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29udGV4dF9kaWN0aW9uYXJ5W2NvbnRleHRfd107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dF9udW1CaXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gY29udGV4dF9kYXRhX3ZhbCA8PCAxIHwgMSAmIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID4+PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IC0tY29udGV4dF9lbmxhcmdlSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZW5sYXJnZUluID0gTWF0aC5wb3coMiwgY29udGV4dF9udW1CaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGljdGlvbmFyeVtjb250ZXh0X3djXSA9IGNvbnRleHRfZGljdFNpemUrKztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF93ID0gU3RyaW5nKGNvbnRleHRfYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwiXCIgIT09IGNvbnRleHRfdykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGUsIGNvbnRleHRfdykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfdy5jaGFyQ29kZUF0KDApIDwgMjU2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dF9udW1CaXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsIDw8PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gY29udGV4dF9kYXRhX3ZhbCA8PCAxIHwgMSAmIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID4+PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRfbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IGNvbnRleHRfZGF0YV92YWwgPDwgMSB8IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29udGV4dF93LmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSBjb250ZXh0X2RhdGFfdmFsIDw8IDEgfCAxICYgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhciAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPj49IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gLS1jb250ZXh0X2VubGFyZ2VJbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlW2NvbnRleHRfd107XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X2RpY3Rpb25hcnlbY29udGV4dF93XTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRleHRfbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gY29udGV4dF9kYXRhX3ZhbCA8PCAxIHwgMSAmIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhciAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID4+PSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgwID09IC0tY29udGV4dF9lbmxhcmdlSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0X251bUJpdHMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IDI7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dF9udW1CaXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gY29udGV4dF9kYXRhX3ZhbCA8PCAxIHwgMSAmIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXIgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgIHZhbHVlID4+PSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPDw9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhciAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dF9kYXRhLmpvaW4oXCJcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGRlY29tcHJlc3M6IGZ1bmN0aW9uKGNvbXByZXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsID09IGNvbXByZXNzZWQgPyBcIlwiIDogXCJcIiA9PSBjb21wcmVzc2VkID8gbnVsbCA6IExaU3RyaW5nLl9kZWNvbXByZXNzKGNvbXByZXNzZWQubGVuZ3RoLCAzMjc2OCwgKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXByZXNzZWQuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIF9kZWNvbXByZXNzOiBmdW5jdGlvbihsZW5ndGgsIHJlc2V0VmFsdWUsIGdldE5leHRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGksIHcsIGJpdHMsIHJlc2IsIG1heHBvd2VyLCBwb3dlciwgYywgZGljdGlvbmFyeSA9IFtdLCBlbmxhcmdlSW4gPSA0LCBkaWN0U2l6ZSA9IDQsIG51bUJpdHMgPSAzLCBlbnRyeSA9IFwiXCIsIHJlc3VsdCA9IFtdLCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHZhbDogZ2V0TmV4dFZhbHVlKDApLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZXNldFZhbHVlLFxuICAgICAgICAgICAgICAgIGluZGV4OiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDM7IGkgKz0gMSkgZGljdGlvbmFyeVtpXSA9IGk7XG4gICAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiwgMik7XG4gICAgICAgICAgICBwb3dlciA9IDE7XG4gICAgICAgICAgICBmb3IgKDtwb3dlciAhPSBtYXhwb3dlcjsgKSB7XG4gICAgICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xuICAgICAgICAgICAgICAgIGlmICgwID09IGRhdGEucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEudmFsID0gZ2V0TmV4dFZhbHVlKGRhdGEuaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2IgPiAwID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICAgICAgcG93ZXIgPDw9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGJpdHMpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiwgOCk7XG4gICAgICAgICAgICAgICAgcG93ZXIgPSAxO1xuICAgICAgICAgICAgICAgIGZvciAoO3Bvd2VyICE9IG1heHBvd2VyOyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gZGF0YS5wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2IgPiAwID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICAgICAgICAgIHBvd2VyIDw8PSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjID0gZihiaXRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLCAxNik7XG4gICAgICAgICAgICAgICAgcG93ZXIgPSAxO1xuICAgICAgICAgICAgICAgIGZvciAoO3Bvd2VyICE9IG1heHBvd2VyOyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gZGF0YS5wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2IgPiAwID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICAgICAgICAgIHBvd2VyIDw8PSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjID0gZihiaXRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaWN0aW9uYXJ5WzNdID0gYztcbiAgICAgICAgICAgIHcgPSBjO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYyk7XG4gICAgICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaW5kZXggPiBsZW5ndGgpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiwgbnVtQml0cyk7XG4gICAgICAgICAgICAgICAgcG93ZXIgPSAxO1xuICAgICAgICAgICAgICAgIGZvciAoO3Bvd2VyICE9IG1heHBvd2VyOyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA+Pj0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gZGF0YS5wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2IgPiAwID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICAgICAgICAgIHBvd2VyIDw8PSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMgPSBiaXRzKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsIDgpO1xuICAgICAgICAgICAgICAgICAgICBwb3dlciA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO3Bvd2VyICE9IG1heHBvd2VyOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gZGF0YS5wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmFsID0gZ2V0TmV4dFZhbHVlKGRhdGEuaW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRzIHw9IChyZXNiID4gMCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG93ZXIgPDw9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGljdGlvbmFyeVtkaWN0U2l6ZSsrXSA9IGYoYml0cyk7XG4gICAgICAgICAgICAgICAgICAgIGMgPSBkaWN0U2l6ZSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGVubGFyZ2VJbi0tO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLCAxNik7XG4gICAgICAgICAgICAgICAgICAgIHBvd2VyID0gMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7cG93ZXIgIT0gbWF4cG93ZXI7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBkYXRhLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHMgfD0gKHJlc2IgPiAwID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaWN0aW9uYXJ5W2RpY3RTaXplKytdID0gZihiaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgYyA9IGRpY3RTaXplIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgZW5sYXJnZUluLS07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKDAgPT0gZW5sYXJnZUluKSB7XG4gICAgICAgICAgICAgICAgICAgIGVubGFyZ2VJbiA9IE1hdGgucG93KDIsIG51bUJpdHMpO1xuICAgICAgICAgICAgICAgICAgICBudW1CaXRzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaWN0aW9uYXJ5W2NdKSBlbnRyeSA9IGRpY3Rpb25hcnlbY107IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYyAhPT0gZGljdFNpemUpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICBlbnRyeSA9IHcgKyB3LmNoYXJBdCgwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgIGRpY3Rpb25hcnlbZGljdFNpemUrK10gPSB3ICsgZW50cnkuY2hhckF0KDApO1xuICAgICAgICAgICAgICAgIHcgPSBlbnRyeTtcbiAgICAgICAgICAgICAgICBpZiAoMCA9PSAtLWVubGFyZ2VJbikge1xuICAgICAgICAgICAgICAgICAgICBlbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBudW1CaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgbnVtQml0cysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExaU3RyaW5nO1xufSgpLCBudWxsICE9IG1vZHVsZSAmJiAobW9kdWxlLmV4cG9ydHMgPSBMWlN0cmluZyk7XG5cbnZhciBtb2R1bGUsIExaU3RyaW5nO1xuXG5jbGFzcyBPcHRpb25zU3luYyB7XG4gICAgY29uc3RydWN0b3Ioe2RlZmF1bHRzOiBkZWZhdWx0cyA9IHt9LCBzdG9yYWdlTmFtZTogc3RvcmFnZU5hbWUgPSBcIm9wdGlvbnNcIiwgbWlncmF0aW9uczogbWlncmF0aW9ucyA9IFtdLCBsb2dnaW5nOiBsb2dnaW5nID0gdHJ1ZSwgc3RvcmFnZVR5cGU6IHN0b3JhZ2VUeXBlID0gXCJzeW5jXCJ9ID0ge30pIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3RvcmFnZU5hbWVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3RvcmFnZVR5cGVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZGVmYXVsdHNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2Zvcm1cIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX21pZ3JhdGlvbnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdG9yYWdlTmFtZSA9IHN0b3JhZ2VOYW1lO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgICAgIHRoaXMuc3RvcmFnZVR5cGUgPSBzdG9yYWdlVHlwZTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9ybUlucHV0ID0gKGRlbGF5ID0gMzAwLCBhdEJlZ2luID0gdGhpcy5faGFuZGxlRm9ybUlucHV0LmJpbmQodGhpcyksIFxuICAgICAgICB2b2lkIDAgPT09IGNhbGxiYWNrID8gdGhyb3R0bGUoZGVsYXksIGF0QmVnaW4sIGZhbHNlKSA6IHRocm90dGxlKGRlbGF5LCBjYWxsYmFjaywgZmFsc2UgIT09IGF0QmVnaW4pKTtcbiAgICAgICAgdmFyIGRlbGF5LCBhdEJlZ2luLCBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5faGFuZGxlU3RvcmFnZUNoYW5nZU9uRm9ybSA9IHRoaXMuX2hhbmRsZVN0b3JhZ2VDaGFuZ2VPbkZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgbG9nZ2luZyB8fCAodGhpcy5fbG9nID0gKCkgPT4ge30pO1xuICAgICAgICB0aGlzLl9taWdyYXRpb25zID0gdGhpcy5fcnVuTWlncmF0aW9ucyhtaWdyYXRpb25zKTtcbiAgICB9XG4gICAgZ2V0IHN0b3JhZ2UoKSB7XG4gICAgICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZVt0aGlzLnN0b3JhZ2VUeXBlXTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0QWxsKCkge1xuICAgICAgICBhd2FpdCB0aGlzLl9taWdyYXRpb25zO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWxsKCk7XG4gICAgfVxuICAgIGFzeW5jIHNldEFsbChuZXdPcHRpb25zKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX21pZ3JhdGlvbnM7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXRBbGwobmV3T3B0aW9ucyk7XG4gICAgfVxuICAgIGFzeW5jIHNldChuZXdPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldEFsbCh7XG4gICAgICAgICAgICAuLi5hd2FpdCB0aGlzLmdldEFsbCgpLFxuICAgICAgICAgICAgLi4ubmV3T3B0aW9uc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgc3luY0Zvcm0oZm9ybSkge1xuICAgICAgICB0aGlzLl9mb3JtID0gZm9ybSBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCA/IGZvcm0gOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm0pO1xuICAgICAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB0aGlzLl9oYW5kbGVGb3JtSW5wdXQpO1xuICAgICAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCk7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcih0aGlzLl9oYW5kbGVTdG9yYWdlQ2hhbmdlT25Gb3JtKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlRm9ybSh0aGlzLl9mb3JtLCBhd2FpdCB0aGlzLmdldEFsbCgpKTtcbiAgICB9XG4gICAgYXN5bmMgc3RvcFN5bmNGb3JtKCkge1xuICAgICAgICBpZiAodGhpcy5fZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5faGFuZGxlRm9ybUlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9oYW5kbGVTdG9yYWdlQ2hhbmdlT25Gb3JtKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9mb3JtO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9sb2cobWV0aG9kLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5hcmdzKTtcbiAgICB9XG4gICAgYXN5bmMgX2dldEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMuc3RvcmFnZU5hbWUsIChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvciA/IHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIDogcmVzb2x2ZSh0aGlzLl9kZWNvZGUocmVzdWx0W3RoaXMuc3RvcmFnZU5hbWVdKSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgYXN5bmMgX3NldEFsbChuZXdPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xvZyhcImxvZ1wiLCBcIlNhdmluZyBvcHRpb25zXCIsIG5ld09wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoe1xuICAgICAgICAgICAgICAgIFt0aGlzLnN0b3JhZ2VOYW1lXTogdGhpcy5fZW5jb2RlKG5ld09wdGlvbnMpXG4gICAgICAgICAgICB9LCAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvciA/IHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIDogcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIF9lbmNvZGUob3B0aW9ucykge1xuICAgICAgICBjb25zdCB0aGlubmVkT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpbm5lZE9wdGlvbnMpKSB0aGlzLmRlZmF1bHRzW2tleV0gPT09IHZhbHVlICYmIGRlbGV0ZSB0aGlubmVkT3B0aW9uc1trZXldO1xuICAgICAgICB0aGlzLl9sb2coXCJsb2dcIiwgXCJXaXRob3V0IHRoZSBkZWZhdWx0IHZhbHVlc1wiLCB0aGlubmVkT3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBselN0cmluZy5leHBvcnRzLmNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaW5uZWRPcHRpb25zKSk7XG4gICAgfVxuICAgIF9kZWNvZGUob3B0aW9ucykge1xuICAgICAgICBsZXQgZGVjb21wcmVzc2VkID0gb3B0aW9ucztcbiAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2Ygb3B0aW9ucyAmJiAoZGVjb21wcmVzc2VkID0gSlNPTi5wYXJzZShselN0cmluZy5leHBvcnRzLmRlY29tcHJlc3NGcm9tRW5jb2RlZFVSSUNvbXBvbmVudChvcHRpb25zKSkpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0cyxcbiAgICAgICAgICAgIC4uLmRlY29tcHJlc3NlZFxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBfcnVuTWlncmF0aW9ucyhtaWdyYXRpb25zKSB7XG4gICAgICAgIGlmICgwID09PSBtaWdyYXRpb25zLmxlbmd0aCB8fCAhaXNCYWNrZ3JvdW5kKCkgfHwgIWF3YWl0IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGluc3RhbGxUeXBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gaW5zdGFsbFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY2hyb21lLm1hbmFnZW1lbnQ/LmdldFNlbGYgPyBjaHJvbWUubWFuYWdlbWVudC5nZXRTZWxmKCgoe2luc3RhbGxUeXBlOiBpbnN0YWxsVHlwZX0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaW5zdGFsbFR5cGUpO1xuICAgICAgICAgICAgICAgIH0pKSA6IGNhbGxiYWNrKFwidW5rbm93blwiKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSgpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhd2FpdCB0aGlzLl9nZXRBbGwoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sb2coXCJsb2dcIiwgXCJGb3VuZCB0aGVzZSBzdG9yZWQgb3B0aW9uc1wiLCB7XG4gICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sb2coXCJpbmZvXCIsIFwiV2lsbCBydW5cIiwgbWlncmF0aW9ucy5sZW5ndGgsIDEgPT09IG1pZ3JhdGlvbnMubGVuZ3RoID8gXCJtaWdyYXRpb25cIiA6IFwiIG1pZ3JhdGlvbnNcIik7XG4gICAgICAgIGZvciAoY29uc3QgbWlncmF0ZSBvZiBtaWdyYXRpb25zKSBtaWdyYXRlKG9wdGlvbnMsIHRoaXMuZGVmYXVsdHMpO1xuICAgICAgICBpbml0aWFsICE9PSBKU09OLnN0cmluZ2lmeShvcHRpb25zKSAmJiBhd2FpdCB0aGlzLl9zZXRBbGwob3B0aW9ucyk7XG4gICAgfVxuICAgIGFzeW5jIF9oYW5kbGVGb3JtSW5wdXQoe3RhcmdldDogdGFyZ2V0fSkge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRhcmdldDtcbiAgICAgICAgaWYgKGZpZWxkLm5hbWUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0KHRoaXMuX3BhcnNlRm9ybShmaWVsZC5mb3JtKSk7XG4gICAgICAgICAgICBmaWVsZC5mb3JtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwib3B0aW9ucy1zeW5jOmZvcm0tc3luY2VkXCIsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2hhbmRsZUZvcm1TdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgX3VwZGF0ZUZvcm0oZm9ybSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBjdXJyZW50Rm9ybVN0YXRlID0gdGhpcy5fcGFyc2VGb3JtKGZvcm0pO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zKSkgY3VycmVudEZvcm1TdGF0ZVtrZXldID09PSB2YWx1ZSAmJiBkZWxldGUgb3B0aW9uc1trZXldO1xuICAgICAgICBjb25zdCBpbmNsdWRlID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gICAgICAgIGluY2x1ZGUubGVuZ3RoID4gMCAmJiBkZXNlcmlhbGl6ZShmb3JtLCBvcHRpb25zLCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBpbmNsdWRlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfcGFyc2VGb3JtKGZvcm0pIHtcbiAgICAgICAgY29uc3QgaW5jbHVkZSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZvcm0ucXVlcnlTZWxlY3RvckFsbChcIltuYW1lXVwiKSkgZmllbGQudmFsaWRpdHkudmFsaWQgJiYgIWZpZWxkLmRpc2FibGVkICYmIGluY2x1ZGUucHVzaChmaWVsZC5uYW1lLnJlcGxhY2UoL1xcWy4qXS8sIFwiXCIpKTtcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZShmb3JtLCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBpbmNsdWRlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaGFuZGxlU3RvcmFnZUNoYW5nZU9uRm9ybShjaGFuZ2VzLCBhcmVhTmFtZSkge1xuICAgICAgICBhcmVhTmFtZSAhPT0gdGhpcy5zdG9yYWdlVHlwZSB8fCAhY2hhbmdlc1t0aGlzLnN0b3JhZ2VOYW1lXSB8fCBkb2N1bWVudC5oYXNGb2N1cygpICYmIHRoaXMuX2Zvcm0uY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgfHwgdGhpcy5fdXBkYXRlRm9ybSh0aGlzLl9mb3JtLCB0aGlzLl9kZWNvZGUoY2hhbmdlc1t0aGlzLnN0b3JhZ2VOYW1lXS5uZXdWYWx1ZSkpO1xuICAgIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KE9wdGlvbnNTeW5jLCBcIm1pZ3JhdGlvbnNcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHJlbW92ZVVudXNlZChvcHRpb25zLCBkZWZhdWx0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob3B0aW9ucykpIGtleSBpbiBkZWZhdWx0cyB8fCBkZWxldGUgb3B0aW9uc1trZXldO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmV4cG9ydCB7IE9wdGlvbnNTeW5jIGFzIGRlZmF1bHQgfTtcbiIsImxldCBjYWNoZSA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVdlYmV4dERldGVjdFBhZ2VDYWNoZSgpIHtcbiAgICBjYWNoZSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gaXNDdXJyZW50UGF0aG5hbWUocGF0aCkge1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IG5ldyBVUkwocGF0aCwgbG9jYXRpb24ub3JpZ2luKTtcbiAgICAgICAgcmV0dXJuIHBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TWFuaWZlc3QoX3ZlcnNpb24pIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWU/LmdldE1hbmlmZXN0Py4oKTtcbn1cbmZ1bmN0aW9uIG9uY2UoZnVuY3Rpb25fKSB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoIWNhY2hlIHx8IHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmdW5jdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIG9uIGh0dHAocyk6Ly8gcGFnZXMgKGl0IGNvdWxkIGJlIGluIGEgY29udGVudCBzY3JpcHQgb3IgcmVndWxhciB3ZWIgY29udGV4dCkgKi9cbmV4cG9ydCBjb25zdCBpc1dlYlBhZ2UgPSBvbmNlKCgpID0+IGdsb2JhbFRoaXMubG9jYXRpb24/LnByb3RvY29sLnN0YXJ0c1dpdGgoJ2h0dHAnKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGV4dGVuc2lvbiBjb250ZXh0cyB0aGF0IGhhdmUgYWNjZXNzIHRvIHRoZSBjaHJvbWUgQVBJICovXG5leHBvcnQgY29uc3QgaXNFeHRlbnNpb25Db250ZXh0ID0gb25jZSgoKSA9PiB0eXBlb2YgZ2xvYmFsVGhpcy5jaHJvbWU/LmV4dGVuc2lvbiA9PT0gJ29iamVjdCcpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGNvbnRlbnQgc2NyaXB0ICovXG5leHBvcnQgY29uc3QgaXNDb250ZW50U2NyaXB0ID0gb25jZSgoKSA9PiBpc0V4dGVuc2lvbkNvbnRleHQoKSAmJiBpc1dlYlBhZ2UoKSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgYmVpbmcgcnVuIGluIGEgYmFja2dyb3VuZCBjb250ZXh0ICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kID0gKCkgPT4gaXNCYWNrZ3JvdW5kUGFnZSgpIHx8IGlzQmFja2dyb3VuZFdvcmtlcigpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgcGFnZSAqL1xuZXhwb3J0IGNvbnN0IGlzQmFja2dyb3VuZFBhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBjb25zdCBtYW5pZmVzdCA9IGdldE1hbmlmZXN0KDIpO1xuICAgIGlmIChtYW5pZmVzdFxuICAgICAgICAmJiBpc0N1cnJlbnRQYXRobmFtZShtYW5pZmVzdC5iYWNrZ3JvdW5kX3BhZ2UgfHwgbWFuaWZlc3QuYmFja2dyb3VuZD8ucGFnZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKG1hbmlmZXN0Py5iYWNrZ3JvdW5kPy5zY3JpcHRzXG4gICAgICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKCcvX2dlbmVyYXRlZF9iYWNrZ3JvdW5kX3BhZ2UuaHRtbCcpKTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBpbiBhIGJhY2tncm91bmQgd29ya2VyICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kV29ya2VyID0gb25jZSgoKSA9PiBpc0N1cnJlbnRQYXRobmFtZShnZXRNYW5pZmVzdCgzKT8uYmFja2dyb3VuZD8uc2VydmljZV93b3JrZXIpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYW4gb3B0aW9ucyBwYWdlLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzT3B0aW9uc1BhZ2UgPSBvbmNlKCgpID0+IHtcbiAgICBpZiAoIWlzRXh0ZW5zaW9uQ29udGV4dCgpIHx8ICFjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHsgb3B0aW9uc191aTogb3B0aW9uc1VpIH0gPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9uc1VpPy5wYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwob3B0aW9uc1VpLnBhZ2UsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29kZSBpcyBiZWluZyBydW4gaW4gYSBkZXYgdG9vbHMgcGFnZS4gVGhpcyBvbmx5IHdvcmtzIGlmIHRoZSBjdXJyZW50IHBhZ2XigJlzIFVSTCBtYXRjaGVzIHRoZSBvbmUgc3BlY2lmaWVkIGluIHRoZSBleHRlbnNpb24ncyBgbWFuaWZlc3QuanNvbmAgYGRldnRvb2xzX3BhZ2VgIGZpZWxkLiAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHNQYWdlID0gb25jZSgoKSA9PiB7XG4gICAgaWYgKCFpc0V4dGVuc2lvbkNvbnRleHQoKSB8fCAhY2hyb21lLmRldnRvb2xzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgeyBkZXZ0b29sc19wYWdlOiBkZXZ0b29sc1BhZ2UgfSA9IGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCk7XG4gICAgaWYgKHR5cGVvZiBkZXZ0b29sc1BhZ2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChkZXZ0b29sc1BhZ2UsIGxvY2F0aW9uLm9yaWdpbik7XG4gICAgcmV0dXJuIHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG59KTtcbi8qKiBMb29zZWx5IGRldGVjdCBGaXJlZm94IHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNGaXJlZm94ID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveCcpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IENocm9tZSB2aWEgdXNlciBhZ2VudCAobWlnaHQgYWxzbyBpbmNsdWRlIENocm9taXVtIGFuZCBmb3JrcyBsaWtlIE9wZXJhKSAqL1xuZXhwb3J0IGNvbnN0IGlzQ2hyb21lID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnQ2hyb21lJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNTYWZhcmkgPSAoKSA9PiAhaXNDaHJvbWUoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdTYWZhcmknKTtcbmV4cG9ydCBjb25zdCBjb250ZXh0TmFtZXMgPSB7XG4gICAgY29udGVudFNjcmlwdDogaXNDb250ZW50U2NyaXB0LFxuICAgIGJhY2tncm91bmQ6IGlzQmFja2dyb3VuZCxcbiAgICBvcHRpb25zOiBpc09wdGlvbnNQYWdlLFxuICAgIGRldlRvb2xzUGFnZTogaXNEZXZUb29sc1BhZ2UsXG4gICAgZXh0ZW5zaW9uOiBpc0V4dGVuc2lvbkNvbnRleHQsXG4gICAgd2ViOiBpc1dlYlBhZ2UsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHROYW1lKCkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHRlc3RdIG9mIE9iamVjdC5lbnRyaWVzKGNvbnRleHROYW1lcykpIHtcbiAgICAgICAgaWYgKHRlc3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICd1bmtub3duJztcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJiYWNrZ3JvdW5kLmI5NzU2MmFiLmpzLm1hcCJ9
