import 'server-only';
import CreateI18NConfigProps from './types/CreateGTProps';
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
 * @param {string[]} [params.approvedLocales] - List of approved locales. Default is an empty array.
 * @param {string} [params.defaultLocale] - Default locale for the translation. Default is the first locale in `approvedLocales` or 'en'.
 * @param {Function} [params.getLocale] - Function to get the current locale. Default returns the `defaultLocale`.
 * @param {string} [params.renderMethod] - How translations are rendered for the first time. options are "replace", "hang", "subtle". Default is "replace".
 * @param {string} [params.dictionaryName] - Name of the dictionary to use. Default is "default".
 * @param {Object} [params.dictionary] - Dictionary object containing translations.
 * @param {number} [params.maxConcurrentRequests] - Maximum number of concurrent requests. Default is 2.
 * @param {number} [params.batchInterval] - Interval for batching requests in milliseconds. Default is 1000.
 * @param {Object} [...metadata] - Any additional metadata. Used for experimental variables.
 * @returns {GeneralTranslation} An object containing internationalization and translation functions.
 */
export declare function createGT({ apiKey, projectID, cacheURL, baseURL, approvedLocales, defaultLocale, getLocale, renderMethod, // "hang", "subtle"
dictionaryName, dictionary, maxConcurrentRequests, batchInterval, ...metadata }?: CreateI18NConfigProps): GeneralTranslation;
/**
 * A lightweight configuration function which defines a set of variable components which can be used in a GT dictionary.
 *
 * @param {Object} [params] - Language options for creating the variables.
 * @param {string[]} [params.approvedLocales] - List of approved locales. Default is an empty array.
 * @param {string} [params.defaultLocale] - Default locale for the variables. Default is the first locale in `approvedLocales` or 'en'.
 * @param {Function} [params.getLocale] - Function to get the current locale. Default returns the `defaultLocale`.
 * @returns {Variables} - An object containing branching and variable components such as Value, Numeric, Variable, NumberVariable, DateVariable, and CurrencyVariable.
 */
export declare function createVariables({ approvedLocales, defaultLocale, getLocale, }?: {
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale: () => string;
}): Variables;
//# sourceMappingURL=index.d.ts.map