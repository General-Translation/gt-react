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
import GT, { isSameLanguage } from "generaltranslation";
import remoteDictionaryManager from "./RemoteDictionaryManager";
import getDictionaryEntry from "../dictionary/getDictionaryEntry";
import LocalDictionaryManager from "./LocalDictionaryManager";
import defaultGTProps from "../types/defaultGTProps";
export default class I18NConfiguration {
    constructor(_a) {
        var { 
        // Cloud integration
        apiKey, projectID, baseURL, cacheURL, remoteSource, automaticTranslation, 
        // Locale info
        getLocale, defaultLocale, approvedLocales, 
        // Render method
        renderPrevious, renderMethod, renderTimeout, 
        // Dictionaries
        dictionary, dictionaryName, translations, 
        // Batching config
        maxConcurrentRequests, batchInterval, 
        // Other metadata
        getMetadata } = _a, metadata = __rest(_a, ["apiKey", "projectID", "baseURL", "cacheURL", "remoteSource", "automaticTranslation", "getLocale", "defaultLocale", "approvedLocales", "renderPrevious", "renderMethod", "renderTimeout", "dictionary", "dictionaryName", "translations", "maxConcurrentRequests", "batchInterval", "getMetadata"]);
        console.log(apiKey, 'apiKey123123');
        // Validate required parameters
        if (!apiKey && (automaticTranslation && baseURL === defaultGTProps.baseURL)) {
            throw new Error("gt-react Error: Automatic translation requires an API key! Get an API key at www.generaltranslation.com.");
        }
        if (!projectID && ((automaticTranslation && baseURL === defaultGTProps.baseURL) || (remoteSource && cacheURL === defaultGTProps.cacheURL))) {
            throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
        }
        // Cloud integration
        this.projectID = projectID;
        this.remoteSource = remoteSource;
        this.automaticTranslation = automaticTranslation;
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
        this.translations = translations;
        // GT
        this.gt = new GT({ projectID, apiKey, defaultLanguage: defaultLocale, baseURL });
        // Other metadata
        this.getMetadata = getMetadata;
        this.metadata = Object.assign(Object.assign({ projectID: this.projectID, defaultLanguage: this.defaultLocale, dictionaryName }, (this.renderTimeout && { timeout: this.renderTimeout - batchInterval })), metadata);
        // Dictionary managers
        if (this.translations) {
            this._localDictionaryManager = new LocalDictionaryManager({
                translations: this.translations
            });
        }
        if (this.remoteSource) {
            this._remoteDictionaryManager = remoteDictionaryManager;
            this._remoteDictionaryManager.setConfig({
                cacheURL, projectID
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
        return getDictionaryEntry(id, this.dictionary);
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
     * As of 7/31/24: method is "skeleton", "replace", "hang", "subtle".
     * Timeout is a number or null, representing no assigned timeout.
     * renderPrevious determines whether a non-matching previous entry should be rendered while the new translation loads.
    */
    getRenderSettings() {
        return {
            method: this.renderMethod,
            timeout: this.renderTimeout,
            renderPrevious: this.renderPrevious
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
        if (this.approvedLocales && !this.approvedLocales.some(approvedLocale => isSameLanguage(locale, approvedLocale)))
            return false;
        if (isSameLanguage(locale, this.defaultLocale))
            return false;
        return true;
    }
    /**
     * Get the translation dictionaries for this user's locale, if they exist
     * @param locale - The language set by the user
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the translations.
    */
    getTranslations(locale_1) {
        return __awaiter(this, arguments, void 0, function* (locale, dictionaryName = this.dictionaryName) {
            let translations = {};
            const localPromise = this._localDictionaryManager ? this._localDictionaryManager.getDictionary(locale) : Promise.resolve(undefined);
            const remotePromise = this._remoteDictionaryManager ? this._remoteDictionaryManager.getDictionary(locale, dictionaryName) : Promise.resolve(undefined);
            const [local, remote] = yield Promise.all([localPromise, remotePromise]);
            if (local !== undefined) {
                translations.local = local;
            }
            if (remote !== undefined) {
                translations.remote = remote;
            }
            return translations;
        });
    }
    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The user's locale
     * @param key - Key in the dictionary. For strings, the original language version of that string. For React children, a hash.
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @param translations - Optional translations to search.
     * @returns A promise that resolves to the a value in the translations.
    */
    getTranslation(locale_1, key_1) {
        return __awaiter(this, arguments, void 0, function* (locale, key, id = key, dictionaryName = this.dictionaryName, translations) {
            translations = translations || (yield this.getTranslations(locale, dictionaryName));
            if (translations.local) {
                const translation = getDictionaryEntry(id, translations.local);
                if (translation)
                    return translation;
            }
            if (translations.remote) {
                if (translations.remote[id] && translations.remote[id].k === key)
                    return translations.remote[id].t;
            }
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
            var _a;
            const cacheKey = JSON.stringify(params);
            if (this._translationCache.has(cacheKey)) {
                return this._translationCache.get(cacheKey);
            }
            const { content, targetLanguage, options } = params;
            const dictionaryName = ((_a = params.options) === null || _a === void 0 ? void 0 : _a.dictionaryName) || this.dictionaryName;
            const translationPromise = new Promise((resolve, reject) => {
                this._queue.push({
                    type: "intl",
                    data: {
                        content,
                        targetLanguage,
                        projectID: this.projectID,
                        metadata: Object.assign(Object.assign(Object.assign({}, this.metadata), this.getMetadata()), options)
                    },
                    cache: (this._remoteDictionaryManager) ? this._remoteDictionaryManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
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
            var _a;
            const cacheKey = JSON.stringify(params);
            if (this._translationCache.has(cacheKey)) {
                return this._translationCache.get(cacheKey);
            }
            const { children, targetLanguage, metadata } = params;
            const dictionaryName = ((_a = params.options) === null || _a === void 0 ? void 0 : _a.dictionaryName) || this.dictionaryName;
            const translationPromise = new Promise((resolve, reject) => {
                this._queue.push({
                    type: "react",
                    data: {
                        children,
                        targetLanguage,
                        metadata: Object.assign(Object.assign(Object.assign({}, this.metadata), this.getMetadata()), metadata)
                    },
                    cache: (this._remoteDictionaryManager) ? this._remoteDictionaryManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
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
                const bundlePromise = this.gt.bundleRequests(batch);
                batch.forEach((item) => {
                    if (this._remoteDictionaryManager && item.cache)
                        this._remoteDictionaryManager.setTranslationRequested(item.data.targetLanguage, item.data.metadata.dictionaryName);
                });
                const results = yield bundlePromise;
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
// Resolve errors in the batch request
const resolveBatchError = (item) => {
    if (item.type === "react")
        return item.resolve(null);
    if (item.type === "intl")
        return item.resolve(item.data.content);
    return item.resolve("");
};
//# sourceMappingURL=I18NConfiguration.js.map