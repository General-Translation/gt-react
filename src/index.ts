import 'server-only'

import getDefaultFromEnv from "./local/getDefaultFromEnv";
import createI18NComponent from './server/createI18NComponent';
import I18NConfiguration from './config/I18NConfiguration';
import createIntlFunction from './intl/createIntlFunction';
import createGTProviderComponent from './client/createGTProviderComponent';
import CreateI18NConfigProps from './types/CreateGTProps';
import createTFunction from './dictionary/createTFunction';
import createDictFunction from './dictionary/createDictFunction';
import createValueComponent from './primitives/value/createValueComponent';
import createNumericComponent from './primitives/numeric/createNumericComponent';
import createVariableComponent from './primitives/variables/Variable/createVariableComponent';
import createNumberVariableComponent from './primitives/variables/NumberVariable/createNumberVariableComponent';
import createDateVariableComponent from './primitives/variables/DateVariable/createDateVariableComponent';
import createCurrencyVariableComponent from './primitives/variables/CurrencyVariable/createCurrencyVariableComponent';
import GeneralTranslation from './types/GeneralTranslationInterface';
import Variables from './types/VariableInterface';

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
 * @param {string} [params.renderMethod] - How translations are rendered for the first time. options are "replace", "hang", "subtle". Default is "replace".
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
    renderMethod = "replace", // "hang", "subtle"
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
    renderMethod: "replace",
    renderTimeout: 8500,
    dictionaryName: "default",
    dictionary: {},
    maxConcurrentRequests: 2,
    batchInterval: 1000,
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

    // ----- <I18N> ------ //

    const I18N = createI18NComponent({ I18NConfig, ...metadata });

    // ----- intl() ------ //

    const intl = createIntlFunction({ I18NConfig, ...metadata });

    // ----- <GTProvider> ------ //

    const GTProvider = createGTProviderComponent({ I18NConfig, I18N, intl, ...metadata });

    // ----- Dictionary ------ //

    const t = createTFunction({ I18NConfig, I18N });

    const dict = createDictFunction(I18NConfig);

    // ----- Variables ----- //

    const Value = createValueComponent(getLocale);
    const Numeric = createNumericComponent(getLocale);
    const Variable = createVariableComponent();
    const NumberVariable = createNumberVariableComponent(getLocale);
    const DateVariable = createDateVariableComponent(getLocale);
    const CurrencyVariable = createCurrencyVariableComponent(getLocale);

    // ----- Helper Functions ------ //

    const getDefaultLocale = I18NConfig.getDefaultLocale;
    
    return {
        I18N, intl,
        GTProvider,
        t, dict,
        Value, Numeric,
        Variable, NumberVariable, DateVariable, CurrencyVariable,
        getLocale, getDefaultLocale,
    }
    
}


/**
 * A lightweight configuration function which defines a set of variable components which can be used in a GT dictionary.
 * 
 * @param {Object} [params] - Language options for creating the variables.
 * @param {string[]} [params.approvedLocales] - List of approved locales. Default is an empty array.
 * @param {string} [params.defaultLocale] - Default locale for the variables. Default is the first locale in `approvedLocales` or 'en'.
 * @param {Function} [params.getLocale] - Function to get the current locale. Default returns the `defaultLocale`.
 * @returns {Variables} - An object containing branching and variable components such as Value, Numeric, Variable, NumberVariable, DateVariable, and CurrencyVariable.
 */
export function createVariables({
    approvedLocales = [],
    defaultLocale = approvedLocales?.[0] || 'en',
    getLocale = () => { return defaultLocale },
}: {
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale: () => string;
} = {
    defaultLocale: 'en',
    getLocale: () => { return 'en' }
}): Variables {
    
    // ----- Variables ----- //

    const Value = createValueComponent(getLocale);
    const Numeric = createNumericComponent(getLocale);
    const Variable = createVariableComponent();
    const NumberVariable = createNumberVariableComponent(getLocale);
    const DateVariable = createDateVariableComponent(getLocale);
    const CurrencyVariable = createCurrencyVariableComponent(getLocale);

    return {
        Value, Numeric, Variable, 
        NumberVariable, DateVariable, CurrencyVariable
    }
}