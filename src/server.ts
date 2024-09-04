import 'server-only'

import getDefaultFromEnv from "./config/local/getDefaultFromEnv";
import createTComponent from './server/inline/createTComponent';
import I18NConfiguration from './config/I18NConfiguration';
import createTranslateFunction from './server/translate/createTranslateFunction';
import createGTProviderComponent from './server/provider/createGTProviderComponent';
import CreateI18NConfigProps from './types/CreateGTProps';
import createTFunction from './dictionary/createTFunction';
import createValueComponent from './server/value/createValueComponent';
import createPluralComponent from './server/plural/createPluralComponent';
import GeneralTranslation from './types/GeneralTranslationInterface';
import createVarComponent from './server/variables/Var/createVarComponent';
import createNumComponent from './server/variables/Num/createNumComponent';
import createDateTimeComponent from './server/variables/DateTime/createDateTimeComponent';
import createCurrencyComponent from './server/variables/Currency/createCurrencyComponent';
import defaultGTProps from './types/defaultGTProps';
import Variables from './types/Variables';

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
export function createGT({
    // Cloud integration
    apiKey = defaultGTProps.apiKey,
    projectID = defaultGTProps.projectID,
    cacheURL = defaultGTProps.cacheURL,
    baseURL = defaultGTProps.baseURL,
    remoteSource = defaultGTProps.remoteSource,
    automaticTranslation = defaultGTProps.automaticTranslation,
    // Locale info
    approvedLocales,
    defaultLocale = approvedLocales?.[0] || defaultGTProps.defaultLocale,
    getLocale = () => { return defaultLocale },
    // Rendering
    renderPrevious = defaultGTProps.renderPrevious,
    renderMethod = defaultGTProps.renderMethod, // "replace", "hang", "subtle"
    renderTimeout = defaultGTProps.renderTimeout,
    // Dictionaries
    dictionaryName = defaultGTProps.dictionaryName,
    dictionary = defaultGTProps.dictionary,
    store = defaultGTProps.store,
    translations,
    // Batching config
    maxConcurrentRequests = defaultGTProps.maxConcurrentRequests,
    batchInterval = defaultGTProps.batchInterval,
    // Other metadata
    getMetadata = defaultGTProps.getMetadata,
    ...metadata
}: CreateI18NConfigProps = {
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
    store: defaultGTProps.store,
    maxConcurrentRequests: defaultGTProps.maxConcurrentRequests,
    batchInterval: defaultGTProps.batchInterval,
    getMetadata: defaultGTProps.getMetadata
}): GeneralTranslation {

    const I18NConfig = new I18NConfiguration({
        apiKey, projectID, cacheURL, baseURL, remoteSource, automaticTranslation,
        getLocale, defaultLocale, approvedLocales,
        renderPrevious, renderMethod, renderTimeout,
        dictionary, 
        dictionaryName: getDefaultFromEnv('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
        translations,
        maxConcurrentRequests, batchInterval,
        getMetadata,
        ...metadata
    });

    // ----- <T> ------ //

    const T = createTComponent(I18NConfig);

    // ----- translate() ------ //

    const translate = createTranslateFunction(I18NConfig);

    // ----- Dictionary ------ //

    const t = createTFunction(I18NConfig, T, translate);
  
    const getGT = (id?: string) => {
        return id ? createTFunction(I18NConfig, T, translate, I18NConfig.getDictionaryEntry(id)): t;
    };

    // ----- <GTProvider> ------ //

    const GTProvider = createGTProviderComponent(I18NConfig);

    // ----- Variables ----- //

    const Value = createValueComponent(T, getLocale, defaultLocale);
    const Plural = createPluralComponent(T, getLocale, defaultLocale);

    // ----- Helper Functions ------ //

    const getDefaultLocale = I18NConfig.getDefaultLocale;
    
    return {
        T, translate,
        GTProvider,
        t, getGT,
        Value, Plural,
        getLocale, getDefaultLocale
    }
    
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
export function createVariables({
    approvedLocales,
    defaultLocale = approvedLocales?.[0] || defaultGTProps.defaultLocale,
    getLocale = () => { return defaultLocale }
}: {
    approvedLocales?: string[],
    defaultLocale?: string;
    getLocale?: () => string;
} = {
    defaultLocale: defaultGTProps.defaultLocale,
    getLocale: defaultGTProps.getLocale
}): Variables {

    const Var = createVarComponent();
    const Num = createNumComponent(getLocale, defaultLocale);
    const DateTime = createDateTimeComponent(getLocale, defaultLocale);
    const Currency = createCurrencyComponent(getLocale, defaultLocale);

    return ({
        Var, Num, Currency, DateTime,
        getLocale, getDefaultLocale: () => defaultLocale
    });
}