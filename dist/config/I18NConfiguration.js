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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generaltranslation_1 = __importStar(require("generaltranslation"));
var RemoteDictionaryManager_1 = __importDefault(require("./RemoteDictionaryManager"));
var getDictionaryEntry_1 = __importDefault(require("../dictionary/getDictionaryEntry"));
var LocalDictionaryManager_1 = __importDefault(require("./LocalDictionaryManager"));
var defaultGTProps_1 = __importDefault(require("../types/defaultGTProps"));
var I18NConfiguration = /** @class */ (function () {
    function I18NConfiguration(_a) {
        var 
        // Cloud integration
        apiKey = _a.apiKey, projectID = _a.projectID, baseURL = _a.baseURL, cacheURL = _a.cacheURL, remoteSource = _a.remoteSource, automaticTranslation = _a.automaticTranslation, 
        // Locale info
        getLocale = _a.getLocale, defaultLocale = _a.defaultLocale, approvedLocales = _a.approvedLocales, 
        // Render method
        renderPrevious = _a.renderPrevious, renderMethod = _a.renderMethod, renderTimeout = _a.renderTimeout, 
        // Dictionaries
        dictionary = _a.dictionary, dictionaryName = _a.dictionaryName, storeByDefault = _a.storeByDefault, 
        // Translations
        translations = _a.translations, 
        // Batching config
        maxConcurrentRequests = _a.maxConcurrentRequests, batchInterval = _a.batchInterval, 
        // Other metadata
        getMetadata = _a.getMetadata, metadata = __rest(_a, ["apiKey", "projectID", "baseURL", "cacheURL", "remoteSource", "automaticTranslation", "getLocale", "defaultLocale", "approvedLocales", "renderPrevious", "renderMethod", "renderTimeout", "dictionary", "dictionaryName", "storeByDefault", "translations", "maxConcurrentRequests", "batchInterval", "getMetadata"]);
        // Cloud integration
        this.projectID = projectID;
        this.remoteSource = (cacheURL && remoteSource) ? true : false;
        this.automaticTranslation = (baseURL && automaticTranslation && apiKey) ? true : false;
        // Validate required parameters
        if (!projectID && ((this.automaticTranslation && baseURL === defaultGTProps_1.default.baseURL) || (this.remoteSource && cacheURL === defaultGTProps_1.default.cacheURL))) {
            throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
        }
        // Locales
        this.getLocale = getLocale;
        this.defaultLocale = defaultLocale;
        this.approvedLocales = approvedLocales;
        // Render method
        this.renderPrevious = renderPrevious;
        this.renderMethod = renderMethod;
        this.renderTimeout = renderTimeout;
        // Dictionaries
        this.dictionary = dictionary;
        this.dictionaryName = dictionaryName;
        this.storeByDefault = storeByDefault;
        // Local translations
        this.translations = translations;
        // GT
        this.gt = new generaltranslation_1.default({ projectID: projectID, apiKey: apiKey, defaultLanguage: defaultLocale, baseURL: baseURL });
        // Other metadata
        this.getMetadata = getMetadata;
        this.metadata = __assign(__assign({ projectID: this.projectID, defaultLanguage: this.defaultLocale, dictionaryName: dictionaryName }, (this.renderTimeout && { timeout: this.renderTimeout - batchInterval })), metadata);
        // Dictionary managers
        if (this.translations) {
            this._localDictionaryManager = new LocalDictionaryManager_1.default({
                translations: this.translations
            });
        }
        if (this.remoteSource) {
            this._remoteDictionaryManager = RemoteDictionaryManager_1.default;
            this._remoteDictionaryManager.setConfig({
                cacheURL: cacheURL,
                projectID: projectID
            });
        }
        // Batching
        this.maxConcurrentRequests = maxConcurrentRequests;
        this.batchInterval = batchInterval;
        this._queue = [];
        this._activeRequests = 0;
        this._translationCache = new Map(); // cache for ongoing promises, so things aren't translated twice
        this._startBatching();
    }
    /**
     * Gets the application's default locale
     * @returns {string} A BCP-47 language tag
    */
    I18NConfiguration.prototype.getDefaultLocale = function () {
        return this.defaultLocale;
    };
    /**
     * Gets the list of approved locales for this app
     * @returns {string[] | undefined} A list of BCP-47 language tags, or undefined if none were provided
    */
    I18NConfiguration.prototype.getApprovedLocales = function () {
        return this.approvedLocales;
    };
    /**
     * Get dictionary
     * @returns The entire dictionary, or an empty object if none found
    */
    I18NConfiguration.prototype.getDictionary = function () {
        return this.dictionary;
    };
    /**
     * Gets the name of the current dictionary
     * @returns {string} A BCP-47 language tag
    */
    I18NConfiguration.prototype.getDictionaryName = function () {
        return this.dictionaryName;
    };
    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    I18NConfiguration.prototype.getDictionaryEntry = function (id) {
        return (0, getDictionaryEntry_1.default)(id, this.dictionary);
    };
    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    I18NConfiguration.prototype.automaticTranslationEnabled = function () {
        return this.automaticTranslation;
    };
    /**
     * Get the rendering instructions
     * @returns An object containing the current method and timeout.
     * As of 7/31/24: method is "skeleton", "replace", "hang", "subtle".
     * Timeout is a number or null, representing no assigned timeout.
     * renderPrevious determines whether a non-matching previous entry should be rendered while the new translation loads.
    */
    I18NConfiguration.prototype.getRenderSettings = function () {
        return {
            method: this.renderMethod,
            timeout: this.renderTimeout,
            renderPrevious: this.renderPrevious
        };
    };
    /**
     * Check if translation is required based on the user's locale
     * @param locale - The user's locale
     * @returns True if translation is required, otherwise false
     */
    I18NConfiguration.prototype.translationRequired = function (locale) {
        if (!locale)
            return false;
        if (this.approvedLocales && !this.approvedLocales.some(function (approvedLocale) { return (0, generaltranslation_1.isSameLanguage)(locale, approvedLocale); }))
            return false;
        if ((0, generaltranslation_1.isSameLanguage)(locale, this.defaultLocale))
            return false;
        return true;
    };
    /**
     * Returns a boolean determining whether or not a translation should be stored
     * Undefined if not set
     * @returns {string} A BCP-47 language tag
    */
    I18NConfiguration.prototype.shouldStore = function () {
        return this.storeByDefault;
    };
    /**
     * Get the translation dictionaries for this user's locale, if they exist
     * @param locale - The language set by the user
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the translations.
    */
    I18NConfiguration.prototype.getTranslations = function (locale_1) {
        return __awaiter(this, arguments, void 0, function (locale, dictionaryName) {
            var translations, localPromise, remotePromise, _a, local, remote;
            if (dictionaryName === void 0) { dictionaryName = this.dictionaryName; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        translations = {};
                        localPromise = this._localDictionaryManager ? this._localDictionaryManager.getDictionary(locale) : Promise.resolve(undefined);
                        remotePromise = this._remoteDictionaryManager ? this._remoteDictionaryManager.getDictionary(locale, dictionaryName) : Promise.resolve(undefined);
                        return [4 /*yield*/, Promise.all([localPromise, remotePromise])];
                    case 1:
                        _a = _b.sent(), local = _a[0], remote = _a[1];
                        if (local !== undefined) {
                            translations.local = local;
                        }
                        if (remote !== undefined) {
                            translations.remote = remote;
                        }
                        return [2 /*return*/, translations];
                }
            });
        });
    };
    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The user's locale
     * @param key - Key in the dictionary. For strings, the original language version of that string. For React children, a hash.
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @param translations - Optional translations to search.
     * @returns A promise that resolves to the a value in the translations.
    */
    I18NConfiguration.prototype.getTranslation = function (locale_1, key_1) {
        return __awaiter(this, arguments, void 0, function (locale, key, id, dictionaryName, translations) {
            var _a, translation;
            if (id === void 0) { id = key; }
            if (dictionaryName === void 0) { dictionaryName = this.dictionaryName; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = translations;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getTranslations(locale, dictionaryName)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        translations = _a;
                        if (translations.local) {
                            translation = (0, getDictionaryEntry_1.default)(id, translations.local);
                            if (translation)
                                return [2 /*return*/, translation];
                        }
                        if (translations.remote) {
                            if (translations.remote[id] && translations.remote[id].k === key)
                                return [2 /*return*/, translations.remote[id].t];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Translate content into language
     * @param params - Parameters for translation
     * @returns Translated string
     */
    I18NConfiguration.prototype.translate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, content, targetLanguage, options, dictionaryName, translationPromise;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                cacheKey = JSON.stringify(params);
                if (this._translationCache.has(cacheKey)) {
                    return [2 /*return*/, this._translationCache.get(cacheKey)];
                }
                content = params.content, targetLanguage = params.targetLanguage, options = params.options;
                dictionaryName = ((_a = params.options) === null || _a === void 0 ? void 0 : _a.dictionaryName) || this.dictionaryName;
                translationPromise = new Promise(function (resolve, reject) {
                    _this._queue.push({
                        type: "string",
                        data: {
                            content: content,
                            targetLanguage: targetLanguage,
                            projectID: _this.projectID,
                            metadata: __assign(__assign(__assign({}, _this.metadata), _this.getMetadata()), options)
                        },
                        cache: (_this._remoteDictionaryManager) ? _this._remoteDictionaryManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
                        resolve: resolve,
                        reject: reject
                    });
                });
                this._translationCache.set(cacheKey, translationPromise);
                return [2 /*return*/, translationPromise.finally(function () { return _this._translationCache.delete(cacheKey); })];
            });
        });
    };
    /**
     * Translate the children components
     * @param params - Parameters for translation
     * @returns A promise that resolves when translation is complete
    */
    I18NConfiguration.prototype.translateChildren = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, children, targetLanguage, metadata, dictionaryName, translationPromise;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                cacheKey = JSON.stringify(params);
                if (this._translationCache.has(cacheKey)) {
                    return [2 /*return*/, this._translationCache.get(cacheKey)];
                }
                children = params.children, targetLanguage = params.targetLanguage, metadata = params.metadata;
                dictionaryName = ((_a = params.options) === null || _a === void 0 ? void 0 : _a.dictionaryName) || this.dictionaryName;
                translationPromise = new Promise(function (resolve, reject) {
                    _this._queue.push({
                        type: "react",
                        data: {
                            children: children,
                            targetLanguage: targetLanguage,
                            metadata: __assign(__assign(__assign({}, _this.metadata), _this.getMetadata()), metadata)
                        },
                        cache: (_this._remoteDictionaryManager) ? _this._remoteDictionaryManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
                        resolve: resolve,
                        reject: reject
                    });
                });
                this._translationCache.set(cacheKey, translationPromise);
                return [2 /*return*/, translationPromise.finally(function () { return _this._translationCache.delete(cacheKey); })];
            });
        });
    };
    /**
     * Send a batch request for React translation
     * @param batch - The batch of requests to be sent
     */
    I18NConfiguration.prototype._sendBatchRequest = function (batch) {
        return __awaiter(this, void 0, void 0, function () {
            var bundlePromise, results_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._activeRequests++;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        bundlePromise = this.gt.translateBundle(batch);
                        batch.forEach(function (item) {
                            if (_this._remoteDictionaryManager && item.cache)
                                _this._remoteDictionaryManager.setTranslationRequested(item.data.targetLanguage, item.data.metadata.dictionaryName);
                        });
                        return [4 /*yield*/, bundlePromise];
                    case 2:
                        results_1 = _a.sent();
                        batch.forEach(function (item, index) {
                            var result = results_1[index];
                            if (!result)
                                return item.reject('Translation failed.');
                            if (result && typeof result === 'object') {
                                item.resolve(result.translation);
                                if (result.translation && result.language && result.reference && _this._remoteDictionaryManager) {
                                    _this._remoteDictionaryManager.setDictionary(result.language, result.reference.dictionaryName, result.reference.key, result.reference.id, result.translation);
                                }
                            }
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        batch.forEach(function (item) { return item.reject(error_1); });
                        return [3 /*break*/, 5];
                    case 4:
                        this._activeRequests--;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Start the batching process with a set interval
    */
    I18NConfiguration.prototype._startBatching = function () {
        var _this = this;
        setInterval(function () {
            if (_this._queue.length > 0 && _this._activeRequests < _this.maxConcurrentRequests) {
                _this._sendBatchRequest(_this._queue);
                _this._queue = [];
            }
        }, this.batchInterval);
    };
    return I18NConfiguration;
}());
exports.default = I18NConfiguration;
//# sourceMappingURL=I18NConfiguration.js.map