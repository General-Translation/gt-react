"use strict";
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
const getDefaultFromEnv_1 = __importDefault(require("./config/local/getDefaultFromEnv"));
const createTComponent_1 = __importDefault(require("./server/createTComponent"));
const I18NConfiguration_1 = __importDefault(require("./config/I18NConfiguration"));
const createIntlFunction_1 = __importDefault(require("./intl/createIntlFunction"));
const createGTProviderComponent_1 = __importDefault(require("./server/provider/createGTProviderComponent"));
const createExecuteTFunction_1 = __importDefault(require("./dictionary/createExecuteTFunction"));
const createDictFunction_1 = __importDefault(require("./dictionary/createDictFunction"));
const createValueComponent_1 = __importDefault(require("./server/value/createValueComponent"));
const createPluralComponent_1 = __importDefault(require("./server/plural/createPluralComponent"));
const createVarComponent_1 = __importDefault(require("./server/variables/Var/createVarComponent"));
const createNumComponent_1 = __importDefault(require("./server/variables/Num/createNumComponent"));
const createDateTimeComponent_1 = __importDefault(require("./server/variables/DateTime/createDateTimeComponent"));
const createCurrencyComponent_1 = __importDefault(require("./server/variables/Currency/createCurrencyComponent"));
const defaultGTProps_1 = __importDefault(require("./types/defaultGTProps"));
const createGetGTFunction_1 = __importDefault(require("./dictionary/createGetGTFunction"));
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
function createGT(_a = {
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
    maxConcurrentRequests: defaultGTProps_1.default.maxConcurrentRequests,
    batchInterval: defaultGTProps_1.default.batchInterval,
    getMetadata: defaultGTProps_1.default.getMetadata
}) {
    var { 
    // Cloud integration
    apiKey = defaultGTProps_1.default.apiKey, projectID = defaultGTProps_1.default.projectID, cacheURL = defaultGTProps_1.default.cacheURL, baseURL = defaultGTProps_1.default.baseURL, remoteSource = defaultGTProps_1.default.remoteSource, automaticTranslation = defaultGTProps_1.default.automaticTranslation, 
    // Locale info
    approvedLocales, defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale, getLocale = () => { return defaultLocale; }, 
    // Rendering
    renderPrevious = defaultGTProps_1.default.renderPrevious, renderMethod = defaultGTProps_1.default.renderMethod, // "replace", "hang", "subtle"
    renderTimeout = defaultGTProps_1.default.renderTimeout, 
    // Dictionaries
    dictionaryName = defaultGTProps_1.default.dictionaryName, dictionary = defaultGTProps_1.default.dictionary, translations, 
    // Batching config
    maxConcurrentRequests = defaultGTProps_1.default.maxConcurrentRequests, batchInterval = defaultGTProps_1.default.batchInterval, 
    // Other metadata
    getMetadata = defaultGTProps_1.default.getMetadata } = _a, metadata = __rest(_a, ["apiKey", "projectID", "cacheURL", "baseURL", "remoteSource", "automaticTranslation", "approvedLocales", "defaultLocale", "getLocale", "renderPrevious", "renderMethod", "renderTimeout", "dictionaryName", "dictionary", "translations", "maxConcurrentRequests", "batchInterval", "getMetadata"]);
    const I18NConfig = new I18NConfiguration_1.default(Object.assign({ apiKey, projectID, cacheURL, baseURL, remoteSource, automaticTranslation,
        getLocale, defaultLocale, approvedLocales,
        renderPrevious, renderMethod, renderTimeout,
        dictionary, dictionaryName: (0, getDefaultFromEnv_1.default)('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
        translations,
        maxConcurrentRequests, batchInterval,
        getMetadata }, metadata));
    // ----- <T> ------ //
    const T = (0, createTComponent_1.default)(Object.assign({ I18NConfig }, metadata));
    // ----- intl() ------ //
    const intl = (0, createIntlFunction_1.default)(Object.assign({ I18NConfig }, metadata));
    // ----- Dictionary ------ //
    const executeT = (0, createExecuteTFunction_1.default)({ I18NConfig, T, intl });
    const t = (id, options) => executeT(I18NConfig.getDictionary(), id, options);
    const getGT = (0, createGetGTFunction_1.default)(t);
    const dict = (0, createDictFunction_1.default)(I18NConfig);
    // ----- <GTProvider> ------ //
    const GTProvider = (0, createGTProviderComponent_1.default)(Object.assign({ executeT, I18NConfig }, metadata));
    // ----- Variables ----- //
    const Value = (0, createValueComponent_1.default)({ T, getLocale, defaultLocale });
    const Plural = (0, createPluralComponent_1.default)({ T, getLocale, defaultLocale });
    const Var = (0, createVarComponent_1.default)();
    const Num = (0, createNumComponent_1.default)(getLocale, defaultLocale);
    const DateTime = (0, createDateTimeComponent_1.default)(getLocale, defaultLocale);
    const Currency = (0, createCurrencyComponent_1.default)(getLocale, defaultLocale);
    // ----- Helper Functions ------ //
    const getDefaultLocale = I18NConfig.getDefaultLocale;
    return {
        T, intl,
        GTProvider,
        t, getGT, dict,
        Value, Plural,
        Var, Num, DateTime, Currency,
        getLocale, getDefaultLocale
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
function createVariables({ approvedLocales, defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale, getLocale = () => { return defaultLocale; } } = {
    defaultLocale: defaultGTProps_1.default.defaultLocale,
    getLocale: defaultGTProps_1.default.getLocale
}) {
    const Var = (0, createVarComponent_1.default)();
    const Num = (0, createNumComponent_1.default)(getLocale, defaultLocale);
    const DateTime = (0, createDateTimeComponent_1.default)(getLocale, defaultLocale);
    const Currency = (0, createCurrencyComponent_1.default)(getLocale, defaultLocale);
    return ({
        Var, Num, Currency, DateTime,
        getLocale, getDefaultLocale: () => defaultLocale
    });
}
//# sourceMappingURL=server.js.map