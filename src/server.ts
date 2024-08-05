import 'server-only'

import getDefaultFromEnv from "./config/local/getDefaultFromEnv";
import createTComponent from './server/createTComponent';
import I18NConfiguration from './config/I18NConfiguration';
import createIntlFunction from './intl/createIntlFunction';
import createGTProviderComponent from './server/provider/createGTProviderComponent';
import CreateI18NConfigProps from './types/CreateGTProps';
import createTFunction from './dictionary/createTFunction';
import createDictFunction from './dictionary/createDictFunction';
import createValueComponent from './server/value/createValueComponent';
import createNumericComponent from './server/numeric/createNumericComponent';
import GeneralTranslation from './types/GeneralTranslationInterface';
import createVarComponent from './server/variables/Var/createVarComponent';
import createNumComponent from './server/variables/Num/createNumComponent';
import createDateTimeComponent from './server/variables/DateTime/createDateTimeComponent';
import createCurrencyComponent from './server/variables/Currency/createCurrencyComponent';

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
 * @param {string} [params.renderMethod] - How translations are rendered for the first time. options are "replace", "hang", "subtle". Default is "skeleton".
 * @param {string} [params.renderTimeout] - Timeout before rendering a new translation is called off.
 * @param {string} [params.dictionaryName] - Name of the dictionary to use. Default is "default".
 * @param {Object} [params.dictionary] - Dictionary object containing default language content.
 * @param {Object} [params.translations] - An object which contains strings which correspond to locales and functions which define translation dictionaries associated with those locales.
 * @param {number} [params.maxConcurrentRequests] - Maximum number of concurrent requests. Default is 2.
 * @param {number} [params.batchInterval] - Interval for batching requests in milliseconds. Default is 1000.
 * @param {Object} [...metadata] - Any additional metadata. Used for experimental variables.
 * @returns {GeneralTranslation} An object containing internationalization and translation functions.
 */
export function createGT({
    // Cloud integration
    apiKey = getDefaultFromEnv('GT_API_KEY'),
    projectID = getDefaultFromEnv('GT_PROJECT_ID'),
    cacheURL = "https://cache.gtx.dev",
    baseURL = "https://prod.gtx.dev",
    remoteSource = true,
    automaticTranslation = true,
    // Locale info
    approvedLocales,
    defaultLocale = approvedLocales?.[0] || 'en',
    getLocale = () => { return defaultLocale },
    // Rendering
    renderMethod = "skeleton", // "replace", "hang", "subtle"
    renderTimeout = 8500,
    // Dictionaries
    dictionaryName = "default",
    dictionary = {},
    translations,
    // Batching config
    maxConcurrentRequests = 2,
    batchInterval = 1000,
    // Other metadata
    getMetadata = () => { return {} },
    ...metadata
}: CreateI18NConfigProps = {
    apiKey: getDefaultFromEnv('GT_API_KEY'),
    projectID: getDefaultFromEnv('GT_PROJECT_ID'),
    cacheURL: "https://cache.gtx.dev",
    baseURL: "https://prod.gtx.dev",
    remoteSource: true,
    automaticTranslation: true,
    defaultLocale: 'en',
    getLocale: () => 'en',
    renderMethod: "skeleton",
    renderTimeout: 8500,
    dictionaryName: "default",
    dictionary: {},
    maxConcurrentRequests: 2,
    batchInterval: 500,
    getMetadata: () => { return {} }
}): GeneralTranslation {

    const I18NConfig = new I18NConfiguration({
        apiKey, projectID, cacheURL, baseURL, remoteSource, automaticTranslation,
        getLocale, defaultLocale, approvedLocales,
        renderMethod, renderTimeout,
        dictionary, 
        dictionaryName: getDefaultFromEnv('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
        translations,
        maxConcurrentRequests, batchInterval,
        getMetadata,
        ...metadata
    });

    // ----- <T> ------ //

    const T = createTComponent({ I18NConfig, ...metadata });

    // ----- intl() ------ //

    const intl = createIntlFunction({ I18NConfig, ...metadata });

    // ----- <GTProvider> ------ //

    const GTProvider = createGTProviderComponent({ I18NConfig, T, intl, ...metadata });

    // ----- Dictionary ------ //

    const t = createTFunction({ I18NConfig, T, intl });

    const dict = createDictFunction(I18NConfig);

    // ----- Variables ----- //

    const Value = createValueComponent({ T, getLocale, defaultLocale });
    const Numeric = createNumericComponent({ T, getLocale, defaultLocale });
    const Var = createVarComponent();
    const Num = createNumComponent(getLocale, defaultLocale);
    const DateTime = createDateTimeComponent(getLocale, defaultLocale);
    const Currency = createCurrencyComponent(getLocale, defaultLocale);

    // ----- Helper Functions ------ //

    const getDefaultLocale = I18NConfig.getDefaultLocale;
    
    return {
        T, intl,
        GTProvider,
        t, dict,
        Value, Numeric,
        Var, Num, DateTime, Currency,
        getLocale, getDefaultLocale
    }
    
}