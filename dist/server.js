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
exports.createGT = createGT;
exports.createVariables = createVariables;
require("server-only");
var getDefaultFromEnv_1 = __importDefault(require("./config/local/getDefaultFromEnv"));
var createTComponent_1 = __importDefault(require("./server/inline/createTComponent"));
var I18NConfiguration_1 = __importDefault(require("./config/I18NConfiguration"));
var createTranslateFunction_1 = __importDefault(require("./server/translate/createTranslateFunction"));
var createGTProviderComponent_1 = __importDefault(require("./server/provider/createGTProviderComponent"));
var createTFunction_1 = __importDefault(require("./dictionary/createTFunction"));
var createValueComponent_1 = __importDefault(require("./server/value/createValueComponent"));
var createPluralComponent_1 = __importDefault(require("./server/plural/createPluralComponent"));
var createVarComponent_1 = __importDefault(require("./server/variables/Var/createVarComponent"));
var createNumComponent_1 = __importDefault(require("./server/variables/Num/createNumComponent"));
var createDateTimeComponent_1 = __importDefault(require("./server/variables/DateTime/createDateTimeComponent"));
var createCurrencyComponent_1 = __importDefault(require("./server/variables/Currency/createCurrencyComponent"));
var defaultGTProps_1 = __importDefault(require("./types/defaultGTProps"));
/**
 * Initializes the `gt-react` i18n library.
 *
 * @param {Object} params - Configuration options.
 * @param {string} [params.apiKey] - API key for cloud integration. Default is fetched from environment variable `GT_API_KEY`.
 * @param {string} [params.projectID] - Project ID for cloud integration. Default is fetched from environment variable `GT_PROJECT_ID`.
 * @param {string} [params.cacheURL] - URL for caching. Default is "https://cache.gtx.dev".
 * @param {string} [params.baseURL] - Base URL for API requests. Default is "https://prod.gtx.dev".
 * @param {Object} [params.remoteSource] - Boolean which determines whether library fetches a dictionary from a remote cache.
 * @param {Object} [params.automaticTranslation] - Boolean which determines whether library translates using cloud services.
 * @param {string[]} [params.approvedLocales] - List of approved locales. Default is an empty array.
 * @param {string} [params.defaultLocale] - Default locale for the translation. Default is the first locale in `approvedLocales` or 'en'.
 * @param {Function} [params.getLocale] - Function to get the current locale. Default returns the `defaultLocale`.
 * @param {boolean} [params.renderPrevious] - Experimental. If there's a previous translation on file remotely, use it as a placeholder while the new translation loads, replacing the role of the default language children in "replace" and "subtle", and the skeleton in "skeleton".
 * @param {string} [params.renderMethod] - How translations are rendered for the first time. options are "replace", "hang", "subtle".
 * @param {string} [params.renderTimeout] - Timeout before rendering a new translation is called off.
 * @param {string} [params.dictionaryName] - Name of the dictionary to use. Default is "default".
 * @param {Object} [params.dictionary] - Dictionary object containing default language content.
 * @param {Object} [params.translations] - An object which contains strings which correspond to locales and functions which define translation dictionaries associated with those locales.
 * @param {number} [params.maxConcurrentRequests] - Maximum number of concurrent requests. Default is 2.
 * @param {number} [params.batchInterval] - Interval for batching requests in milliseconds. Default is 1000.
 * @param {Object} [...metadata] - Any additional metadata. Used for experimental variables.
 * @returns {GeneralTranslation} An object containing internationalization and translation functions.
 */
function createGT(_a) {
    if (_a === void 0) { _a = {
        apiKey: defaultGTProps_1.default.apiKey,
        projectID: defaultGTProps_1.default.projectID,
        cacheURL: defaultGTProps_1.default.cacheURL,
        baseURL: defaultGTProps_1.default.baseURL,
        remoteSource: defaultGTProps_1.default.remoteSource,
        automaticTranslation: defaultGTProps_1.default.automaticTranslation,
        defaultLocale: defaultGTProps_1.default.defaultLocale,
        getLocale: defaultGTProps_1.default.getLocale,
        renderPrevious: defaultGTProps_1.default.renderPrevious,
        renderMethod: defaultGTProps_1.default.renderMethod,
        renderTimeout: defaultGTProps_1.default.renderTimeout,
        dictionaryName: defaultGTProps_1.default.dictionaryName,
        dictionary: defaultGTProps_1.default.dictionary,
        store: defaultGTProps_1.default.store,
        maxConcurrentRequests: defaultGTProps_1.default.maxConcurrentRequests,
        batchInterval: defaultGTProps_1.default.batchInterval,
        getMetadata: defaultGTProps_1.default.getMetadata
    }; }
    var 
    // Cloud integration
    _b = _a.apiKey, 
    // Cloud integration
    apiKey = _b === void 0 ? defaultGTProps_1.default.apiKey : _b, _c = _a.projectID, projectID = _c === void 0 ? defaultGTProps_1.default.projectID : _c, _d = _a.cacheURL, cacheURL = _d === void 0 ? defaultGTProps_1.default.cacheURL : _d, _e = _a.baseURL, baseURL = _e === void 0 ? defaultGTProps_1.default.baseURL : _e, _f = _a.remoteSource, remoteSource = _f === void 0 ? defaultGTProps_1.default.remoteSource : _f, _g = _a.automaticTranslation, automaticTranslation = _g === void 0 ? defaultGTProps_1.default.automaticTranslation : _g, 
    // Locale info
    approvedLocales = _a.approvedLocales, _h = _a.defaultLocale, defaultLocale = _h === void 0 ? (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale : _h, _j = _a.getLocale, getLocale = _j === void 0 ? function () { return defaultLocale; } : _j, 
    // Rendering
    _k = _a.renderPrevious, 
    // Rendering
    renderPrevious = _k === void 0 ? defaultGTProps_1.default.renderPrevious : _k, _l = _a.renderMethod, renderMethod = _l === void 0 ? defaultGTProps_1.default.renderMethod : _l, // "replace", "hang", "subtle"
    _m = _a.renderTimeout, // "replace", "hang", "subtle"
    renderTimeout = _m === void 0 ? defaultGTProps_1.default.renderTimeout : _m, 
    // Dictionaries
    _o = _a.dictionaryName, 
    // Dictionaries
    dictionaryName = _o === void 0 ? defaultGTProps_1.default.dictionaryName : _o, _p = _a.dictionary, dictionary = _p === void 0 ? defaultGTProps_1.default.dictionary : _p, _q = _a.store, store = _q === void 0 ? defaultGTProps_1.default.store : _q, translations = _a.translations, 
    // Batching config
    _r = _a.maxConcurrentRequests, 
    // Batching config
    maxConcurrentRequests = _r === void 0 ? defaultGTProps_1.default.maxConcurrentRequests : _r, _s = _a.batchInterval, batchInterval = _s === void 0 ? defaultGTProps_1.default.batchInterval : _s, 
    // Other metadata
    _t = _a.getMetadata, 
    // Other metadata
    getMetadata = _t === void 0 ? defaultGTProps_1.default.getMetadata : _t, metadata = __rest(_a, ["apiKey", "projectID", "cacheURL", "baseURL", "remoteSource", "automaticTranslation", "approvedLocales", "defaultLocale", "getLocale", "renderPrevious", "renderMethod", "renderTimeout", "dictionaryName", "dictionary", "store", "translations", "maxConcurrentRequests", "batchInterval", "getMetadata"]);
    var I18NConfig = new I18NConfiguration_1.default(__assign({ apiKey: apiKey, projectID: projectID, cacheURL: cacheURL, baseURL: baseURL, remoteSource: remoteSource, automaticTranslation: automaticTranslation, getLocale: getLocale, defaultLocale: defaultLocale, approvedLocales: approvedLocales, renderPrevious: renderPrevious, renderMethod: renderMethod, renderTimeout: renderTimeout, dictionary: dictionary, dictionaryName: (0, getDefaultFromEnv_1.default)('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
        translations: translations, maxConcurrentRequests: maxConcurrentRequests, batchInterval: batchInterval, getMetadata: getMetadata }, metadata));
    // ----- <T> ------ //
    var T = (0, createTComponent_1.default)(I18NConfig);
    // ----- translate() ------ //
    var translate = (0, createTranslateFunction_1.default)(I18NConfig);
    // ----- Dictionary ------ //
    var t = (0, createTFunction_1.default)(I18NConfig, T, translate);
    var getGT = function (id) {
        return id ? (0, createTFunction_1.default)(I18NConfig, T, translate, I18NConfig.getDictionaryEntry(id)) : t;
    };
    // ----- <GTProvider> ------ //
    var GTProvider = (0, createGTProviderComponent_1.default)(I18NConfig);
    // ----- Variables ----- //
    var Value = (0, createValueComponent_1.default)(T, getLocale, defaultLocale);
    var Plural = (0, createPluralComponent_1.default)(T, getLocale, defaultLocale);
    // ----- Helper Functions ------ //
    var getDefaultLocale = I18NConfig.getDefaultLocale;
    return {
        T: T,
        translate: translate,
        GTProvider: GTProvider,
        t: t,
        getGT: getGT,
        Value: Value,
        Plural: Plural,
        getLocale: getLocale,
        getDefaultLocale: getDefaultLocale
    };
}
/**
 * Creates variable components only, for use in GT dictionaries.
 *
 * @param {Object} params - Configuration options.
 * @param {string[]} [params.approvedLocales] - List of approved locales.
 * @param {string} params.defaultLocale - Default locale for the translation.
 * @param {() => string} params.getLocale - Function to get the current locale.
 * @returns {Object} An object containing variable components.
 */
function createVariables(_a) {
    var _b = _a === void 0 ? {
        defaultLocale: defaultGTProps_1.default.defaultLocale,
        getLocale: defaultGTProps_1.default.getLocale
    } : _a, approvedLocales = _b.approvedLocales, _c = _b.defaultLocale, defaultLocale = _c === void 0 ? (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale : _c, _d = _b.getLocale, getLocale = _d === void 0 ? function () { return defaultLocale; } : _d;
    var Var = (0, createVarComponent_1.default)();
    var Num = (0, createNumComponent_1.default)(getLocale, defaultLocale);
    var DateTime = (0, createDateTimeComponent_1.default)(getLocale, defaultLocale);
    var Currency = (0, createCurrencyComponent_1.default)(getLocale, defaultLocale);
    return ({
        Var: Var,
        Num: Num,
        Currency: Currency,
        DateTime: DateTime,
        getLocale: getLocale,
        getDefaultLocale: function () { return defaultLocale; }
    });
}
//# sourceMappingURL=server.js.map