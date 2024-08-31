"use strict";
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
var generaltranslation_1 = require("generaltranslation");
/**
 * LocalDictionaryManager is responsible for managing dictionaries loaded from local file paths.
 * @class
 */
var LocalDictionaryManager = /** @class */ (function () {
    /**
     * Creates an instance of LocalDictionaryManager.
     * @param {Object} params - Parameters object.
     * @param {Record<string, () => Promise<Record<string, any>>>} params.translations - A mapping of locale to a function that imports the corresponding dictionary.
     */
    function LocalDictionaryManager(_a) {
        var translations = _a.translations;
        this.translations = translations;
        this.localeCache = new Map();
        this.dictionaryMap = new Map();
        this.fetchPromises = new Map();
    }
    /**
     * Retrieves a dictionary based on locale.
     * @param {string} locale - The locale of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The dictionary data or null if not found.
     */
    LocalDictionaryManager.prototype.getDictionary = function (locale) {
        return __awaiter(this, void 0, void 0, function () {
            var finalLocale, _i, _a, key, fetchPromise, retrievedDictionary;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Check if the dictionary is already cached
                        if (this.dictionaryMap.has(locale)) {
                            return [2 /*return*/, this.dictionaryMap.get(locale) || null];
                        }
                        if (!this.fetchPromises.has(locale)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchPromises.get(locale)];
                    case 1: return [2 /*return*/, (_b.sent()) || null];
                    case 2:
                        finalLocale = locale;
                        if (!this.translations[finalLocale]) {
                            finalLocale = this.localeCache.get(locale) || '';
                            if (!finalLocale) {
                                for (_i = 0, _a = Object.keys(this.translations); _i < _a.length; _i++) {
                                    key = _a[_i];
                                    if ((0, generaltranslation_1.isSameLanguage)(key, locale)) {
                                        finalLocale = key;
                                        break;
                                    }
                                }
                                this.localeCache.set(locale, finalLocale);
                            }
                        }
                        // If no valid finalLocale is found, return null
                        if (!finalLocale || !this.translations[finalLocale]) {
                            return [2 /*return*/, null];
                        }
                        fetchPromise = this._fetchDictionary(finalLocale);
                        this.fetchPromises.set(locale, fetchPromise);
                        return [4 /*yield*/, fetchPromise];
                    case 3:
                        retrievedDictionary = _b.sent();
                        this.fetchPromises.delete(locale);
                        if (retrievedDictionary) {
                            this.dictionaryMap.set(locale, retrievedDictionary);
                        }
                        return [2 /*return*/, retrievedDictionary];
                }
            });
        });
    };
    /**
     * Fetches a dictionary from the translations object using the provided function.
     * @param {string} locale - The locale of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The fetched dictionary data or null if not found.
     */
    LocalDictionaryManager.prototype._fetchDictionary = function (locale) {
        return __awaiter(this, void 0, void 0, function () {
            var loadDictionary, dictionary, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loadDictionary = this.translations[locale];
                        if (!loadDictionary)
                            throw new Error("No translation function for locale: ".concat(locale));
                        return [4 /*yield*/, loadDictionary()];
                    case 1:
                        dictionary = _a.sent();
                        return [2 /*return*/, dictionary];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error loading dictionary for locale ".concat(locale, ":"), error_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LocalDictionaryManager;
}());
exports.default = LocalDictionaryManager;
//# sourceMappingURL=LocalDictionaryManager.js.map