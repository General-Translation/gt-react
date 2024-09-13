"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteTranslationsManager = void 0;
exports.getDictionaryReference = getDictionaryReference;
/**
 * Generates a dictionary reference string from locale and dictionary name.
 * @param {string} locale - The locale of the dictionary.
 * @param {string} dictionaryName - The name of the dictionary.
 * @returns {string} The encoded dictionary reference.
 */
function getDictionaryReference(locale, dictionaryName) {
    return "".concat(encodeURIComponent(dictionaryName), "/").concat(encodeURIComponent(locale));
}
/**
 * Manages remote dictionaries for translation purposes.
 */
var RemoteTranslationsManager = /** @class */ (function () {
    /**
     * Creates an instance of RemoteTranslationsManager.
     */
    function RemoteTranslationsManager() {
        this.config = {
            cacheURL: "https://cache.gtx.dev",
            projectID: ""
        };
        this.dictionaryMap = new Map();
        this.fetchPromises = new Map();
        this.requestedTranslations = new Map();
    }
    /**
     * Sets the configuration for the RemoteDictionaryManager.
     * @param {Partial<RemoteDictionaryConfig>} newConfig - The new configuration to apply.
     */
    RemoteTranslationsManager.prototype.setConfig = function (newConfig) {
        this.config = __assign(__assign({}, this.config), newConfig);
    };
    /**
     * Fetches a dictionary from the remote cache.
     * @param {string} reference - The dictionary reference.
     * @returns {Promise<Record<string, any> | null>} The fetched dictionary or null if not found.
     */
    RemoteTranslationsManager.prototype._fetchDictionary = function (reference) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(this.config.cacheURL, "/").concat(this.config.projectID, "/").concat(reference))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (Object.keys(result).length) {
                            return [2 /*return*/, result];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Remote dictionary error:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Retrieves a dictionary based on locale and dictionary name.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The dictionary data or null if not found.
     */
    RemoteTranslationsManager.prototype.getTranslations = function (locale, dictionaryName) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, fetchPromise, retrievedDictionary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reference = getDictionaryReference(locale, dictionaryName);
                        if (this.dictionaryMap.has(reference)) {
                            return [2 /*return*/, this.dictionaryMap.get(reference) || null];
                        }
                        if (!this.fetchPromises.has(reference)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchPromises.get(reference)];
                    case 1: return [2 /*return*/, (_a.sent()) || null];
                    case 2:
                        fetchPromise = this._fetchDictionary(reference);
                        this.fetchPromises.set(reference, fetchPromise);
                        return [4 /*yield*/, fetchPromise];
                    case 3:
                        retrievedDictionary = _a.sent();
                        this.fetchPromises.delete(reference);
                        if (retrievedDictionary) {
                            this.dictionaryMap.set(reference, retrievedDictionary);
                        }
                        return [2 /*return*/, retrievedDictionary];
                }
            });
        });
    };
    /**
     * Sets a new entry in the specified dictionary.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @param {string} key - The key for the new entry.
     * @param {string} [id=key] - The id for the new entry, defaults to key if not provided.
     * @param {any} translation - The translation value.
     * @returns {boolean} True if the entry was set successfully, false otherwise.
     */
    RemoteTranslationsManager.prototype.setTranslations = function (locale, dictionaryName, key, id, translation) {
        var _a;
        if (id === void 0) { id = key; }
        if (!(locale && dictionaryName && key && id && translation))
            return false;
        var reference = getDictionaryReference(locale, dictionaryName);
        var currentDictionary = this.dictionaryMap.get(reference) || {};
        this.dictionaryMap.set(reference, __assign(__assign({}, currentDictionary), (_a = {}, _a[id] = (translation && typeof translation === 'object' && translation.t) ? __assign(__assign({}, translation), { k: key }) : { k: key, t: translation }, _a)));
        return true;
    };
    /**
     * Marks a translation as requested for a given locale and dictionary
     */
    RemoteTranslationsManager.prototype.setTranslationRequested = function (locale, dictionaryName) {
        var reference = getDictionaryReference(locale, dictionaryName);
        this.requestedTranslations.set(reference, true);
    };
    /**
     * Checks if a translation has been requested for a given locale and dictionary
     */
    RemoteTranslationsManager.prototype.getTranslationRequested = function (locale, dictionaryName) {
        var reference = getDictionaryReference(locale, dictionaryName);
        return this.requestedTranslations.get(reference) ? true : false;
    };
    return RemoteTranslationsManager;
}());
exports.RemoteTranslationsManager = RemoteTranslationsManager;
var remoteDictionaryManager = new RemoteTranslationsManager();
exports.default = remoteDictionaryManager;
//# sourceMappingURL=RemoteTranslationsManager.js.map