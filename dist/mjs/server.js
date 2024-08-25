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
import 'server-only';
import getDefaultFromEnv from "./config/local/getDefaultFromEnv";
import createTComponent from './server/inline/createTComponent';
import I18NConfiguration from './config/I18NConfiguration';
import createIntlFunction from './server/intl/createIntlFunction';
import createGTProviderComponent from './server/provider/createGTProviderComponent';
import createTFunction from './dictionary/createTFunction';
import createValueComponent from './server/value/createValueComponent';
import createPluralComponent from './server/plural/createPluralComponent';
import createVarComponent from './server/variables/Var/createVarComponent';
import createNumComponent from './server/variables/Num/createNumComponent';
import createDateTimeComponent from './server/variables/DateTime/createDateTimeComponent';
import createCurrencyComponent from './server/variables/Currency/createCurrencyComponent';
import defaultGTProps from './types/defaultGTProps';
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
export function createGT(_a = {
    apiKey: defaultGTProps.apiKey,
    projectID: defaultGTProps.projectID,
    cacheURL: defaultGTProps.cacheURL,
    baseURL: defaultGTProps.baseURL,
    remoteSource: defaultGTProps.remoteSource,
    automaticTranslation: defaultGTProps.automaticTranslation,
    defaultLocale: defaultGTProps.defaultLocale,
    getLocale: defaultGTProps.getLocale,
    renderPrevious: defaultGTProps.renderPrevious,
    renderMethod: defaultGTProps.renderMethod,
    renderTimeout: defaultGTProps.renderTimeout,
    dictionaryName: defaultGTProps.dictionaryName,
    dictionary: defaultGTProps.dictionary,
    maxConcurrentRequests: defaultGTProps.maxConcurrentRequests,
    batchInterval: defaultGTProps.batchInterval,
    getMetadata: defaultGTProps.getMetadata
}) {
    var { 
    // Cloud integration
    apiKey = defaultGTProps.apiKey, projectID = defaultGTProps.projectID, cacheURL = defaultGTProps.cacheURL, baseURL = defaultGTProps.baseURL, remoteSource = defaultGTProps.remoteSource, automaticTranslation = defaultGTProps.automaticTranslation, 
    // Locale info
    approvedLocales, defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps.defaultLocale, getLocale = () => { return defaultLocale; }, 
    // Rendering
    renderPrevious = defaultGTProps.renderPrevious, renderMethod = defaultGTProps.renderMethod, // "replace", "hang", "subtle"
    renderTimeout = defaultGTProps.renderTimeout, 
    // Dictionaries
    dictionaryName = defaultGTProps.dictionaryName, dictionary = defaultGTProps.dictionary, translations, 
    // Batching config
    maxConcurrentRequests = defaultGTProps.maxConcurrentRequests, batchInterval = defaultGTProps.batchInterval, 
    // Other metadata
    getMetadata = defaultGTProps.getMetadata } = _a, metadata = __rest(_a, ["apiKey", "projectID", "cacheURL", "baseURL", "remoteSource", "automaticTranslation", "approvedLocales", "defaultLocale", "getLocale", "renderPrevious", "renderMethod", "renderTimeout", "dictionaryName", "dictionary", "translations", "maxConcurrentRequests", "batchInterval", "getMetadata"]);
    const I18NConfig = new I18NConfiguration(Object.assign({ apiKey, projectID, cacheURL, baseURL, remoteSource, automaticTranslation,
        getLocale, defaultLocale, approvedLocales,
        renderPrevious, renderMethod, renderTimeout,
        dictionary, dictionaryName: getDefaultFromEnv('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
        translations,
        maxConcurrentRequests, batchInterval,
        getMetadata }, metadata));
    // ----- <T> ------ //
    const T = createTComponent(Object.assign({ I18NConfig }, metadata));
    // ----- intl() ------ //
    const intl = createIntlFunction(Object.assign({ I18NConfig }, metadata));
    // ----- Dictionary ------ //
    const t = createTFunction({ I18NConfig, T, intl });
    const getGT = (id) => {
        let nestedDictionary = id ? I18NConfig.getDictionaryEntry(id) : I18NConfig.getDictionary();
        return createTFunction({ I18NConfig, T, intl, dictionary: nestedDictionary });
    };
    // ----- <GTProvider> ------ //
    const GTProvider = createGTProviderComponent(Object.assign({ I18NConfig }, metadata));
    // ----- Variables ----- //
    const Value = createValueComponent({ T, getLocale, defaultLocale });
    const Plural = createPluralComponent({ T, getLocale, defaultLocale });
    const Var = createVarComponent();
    const Num = createNumComponent(getLocale, defaultLocale);
    const DateTime = createDateTimeComponent(getLocale, defaultLocale);
    const Currency = createCurrencyComponent(getLocale, defaultLocale);
    // ----- Helper Functions ------ //
    const getDefaultLocale = I18NConfig.getDefaultLocale;
    return {
        T, intl,
        GTProvider,
        t, getGT,
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
export function createVariables({ approvedLocales, defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps.defaultLocale, getLocale = () => { return defaultLocale; } } = {
    defaultLocale: defaultGTProps.defaultLocale,
    getLocale: defaultGTProps.getLocale
}) {
    const Var = createVarComponent();
    const Num = createNumComponent(getLocale, defaultLocale);
    const DateTime = createDateTimeComponent(getLocale, defaultLocale);
    const Currency = createCurrencyComponent(getLocale, defaultLocale);
    return ({
        Var, Num, Currency, DateTime,
        getLocale, getDefaultLocale: () => defaultLocale
    });
}
//# sourceMappingURL=server.js.map