"use strict";
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
const generaltranslation_1 = __importStar(require("generaltranslation"));
const RemoteDictionaryManager_1 = __importDefault(require("./RemoteDictionaryManager"));
const getDictionaryEntry_1 = __importDefault(require("../dictionary/getDictionaryEntry"));
const LocalDictionaryManager_1 = __importDefault(require("./LocalDictionaryManager"));
class I18NConfiguration {
    constructor(_a) {
        var { 
        // Cloud integration
        apiKey, projectID, baseURL, cacheURL, remoteSource, automaticTranslation, 
        // Locale info
        getLocale, defaultLocale, approvedLocales, 
        // Render method
        renderMethod, renderTimeout, 
        // Dictionaries
        dictionary, dictionaryName, translations, 
        // Batching config
        maxConcurrentRequests, batchInterval, 
        // Other metadata
        getMetadata } = _a, metadata = __rest(_a, ["apiKey", "projectID", "baseURL", "cacheURL", "remoteSource", "automaticTranslation", "getLocale", "defaultLocale", "approvedLocales", "renderMethod", "renderTimeout", "dictionary", "dictionaryName", "translations", "maxConcurrentRequests", "batchInterval", "getMetadata"]);
        // Cloud integration
        this.projectID = projectID;
        this.remoteSource = remoteSource;
        this.automaticTranslation = automaticTranslation;
        // Locales
        this.getLocale = getLocale;
        this.defaultLocale = defaultLocale;
        this.approvedLocales = approvedLocales;
        // Render method
        this.renderMethod = renderMethod;
        this.renderTimeout = renderTimeout;
        // Dictionaries
        this.dictionary = dictionary;
        this.dictionaryName = dictionaryName;
        this.translations = translations;
        // GT
        this.gt = new generaltranslation_1.default({ projectID, apiKey, defaultLanguage: defaultLocale, baseURL });
        // Other metadata
        this.getMetadata = getMetadata;
        this.metadata = Object.assign({ projectID: this.projectID, defaultLanguage: this.defaultLocale, dictionaryName }, metadata);
        // Dictionary managers
        if (this.translations) {
            this._localDictionaryManager = new LocalDictionaryManager_1.default({
                translations: this.translations
            });
        }
        if (this.remoteSource) {
            this._remoteDictionaryManager = new RemoteDictionaryManager_1.default({
                cacheURL: cacheURL,
                projectID: this.projectID
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
    getDefaultLocale() {
        return this.defaultLocale;
    }
    /**
     * Gets the list of approved locales for this app
     * @returns {string[] | undefined} A list of BCP-47 language tags, or undefined if none were provided
    */
    getApprovedLocales() {
        return this.approvedLocales;
    }
    /**
     * Get dictionary
     * @returns The entire dictionary, or an empty object if none found
    */
    getDictionary() {
        return this.dictionary;
    }
    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    getDictionaryEntry(id) {
        return (0, getDictionaryEntry_1.default)(id, this.dictionary);
    }
    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    automaticTranslationEnabled() {
        return this.automaticTranslation;
    }
    /**
     * Get the rendering instructions
     * @returns An object containing the current method and timeout.
     * As of 7/26/24: method is "replace", "hang", "subtle".
     * Timeout is a number or null, representing no assigned timeout.
    */
    getRenderSettings() {
        return {
            method: this.renderMethod,
            timeout: this.renderTimeout
        };
    }
    /**
     * Check if translation is required based on the user's locale
     * @param locale - The user's locale
     * @returns True if translation is required, otherwise false
     */
    translationRequired(locale) {
        if (!locale)
            return false;
        if (this.approvedLocales && !this.approvedLocales.some(approvedLocale => (0, generaltranslation_1.isSameLanguage)(locale, approvedLocale)))
            return false;
        if ((0, generaltranslation_1.isSameLanguage)(locale, this.defaultLocale))
            return false;
        return true;
    }
    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The language set by the user
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the translations.
    */
    getTranslations(locale_1) {
        return __awaiter(this, arguments, void 0, function* (locale, dictionaryName = this.dictionaryName) {
            if (this._localDictionaryManager) {
                const translations = yield this._localDictionaryManager.getDictionary(locale);
                if (translations)
                    return translations;
            }
            if (this._remoteDictionaryManager) {
                const translations = yield this._remoteDictionaryManager.getDictionary(locale, dictionaryName);
                if (translations)
                    return translations;
            }
            return null;
        });
    }
    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The user's locale
     * @param key - Key in the dictionary. For strings, the original language version of that string. For React children, a hash.
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the a value in the translations.
    */
    getTranslation(locale_1, key_1) {
        return __awaiter(this, arguments, void 0, function* (locale, key, id = key, dictionaryName = this.dictionaryName) {
            const translations = yield this.getTranslations(locale, dictionaryName);
            if (translations && translations[id] && translations[id].k === key)
                return translations[id].t;
            return null;
        });
    }
    /**
     * Translate content into language
     * @param params - Parameters for translation
     * @returns Translated string
     */
    intl(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = JSON.stringify(params);
            if (this._translationCache.has(cacheKey)) {
                return this._translationCache.get(cacheKey);
            }
            const translationPromise = new Promise((resolve, reject) => {
                this._queue.push({
                    type: "intl",
                    data: {
                        content: params.content,
                        targetLanguage: params.targetLanguage,
                        projectID: this.projectID,
                        metadata: Object.assign(Object.assign(Object.assign({}, this.metadata), this.getMetadata()), params.options)
                    },
                    resolve,
                    reject
                });
            });
            this._translationCache.set(cacheKey, translationPromise);
            return translationPromise.finally(() => this._translationCache.delete(cacheKey));
        });
    }
    /**
     * Translate the children components
     * @param params - Parameters for translation
     * @returns A promise that resolves when translation is complete
    */
    translateChildren(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = JSON.stringify(params);
            if (this._translationCache.has(cacheKey)) {
                return this._translationCache.get(cacheKey);
            }
            const translationPromise = new Promise((resolve, reject) => {
                this._queue.push({
                    type: "react",
                    data: {
                        children: params.children,
                        targetLanguage: params.targetLanguage,
                        metadata: Object.assign(Object.assign(Object.assign({}, this.metadata), this.getMetadata()), params.metadata)
                    },
                    resolve,
                    reject
                });
            });
            this._translationCache.set(cacheKey, translationPromise);
            return translationPromise.finally(() => this._translationCache.delete(cacheKey));
        });
    }
    /**
     * Send a batch request for React translation
     * @param batch - The batch of requests to be sent
     */
    _sendBatchRequest(batch) {
        return __awaiter(this, void 0, void 0, function* () {
            this._activeRequests++;
            try {
                const results = yield this.gt.bundleRequests(batch);
                batch.forEach((item, index) => {
                    const result = results[index];
                    if (!result || result.error)
                        return resolveBatchError(item);
                    if (result && typeof result === 'object') {
                        item.resolve(result.translation);
                        if (result.translation && result.language && result.reference && this._remoteDictionaryManager) {
                            this._remoteDictionaryManager.setDictionary(result.language, result.reference.dictionaryName, result.reference.key, result.reference.id, result.translation);
                        }
                    }
                });
            }
            catch (error) {
                console.error(error);
                batch.forEach(resolveBatchError);
            }
            finally {
                this._activeRequests--;
            }
        });
    }
    /**
     * Start the batching process with a set interval
    */
    _startBatching() {
        setInterval(() => {
            if (this._queue.length > 0 && this._activeRequests < this.maxConcurrentRequests) {
                this._sendBatchRequest(this._queue);
                this._queue = [];
            }
        }, this.batchInterval);
    }
}
exports.default = I18NConfiguration;
// Resolve errors in the batch request
const resolveBatchError = (item) => {
    if (item.type === "react")
        return item.resolve(item.data.children);
    if (item.type === "intl")
        return item.resolve(item.data.content);
    return item.resolve("");
};
//# sourceMappingURL=I18NConfiguration.js.map