import 'server-only';
import CreateI18NConfigProps from './types/CreateGTProps';
import GeneralTranslation from './types/GeneralTranslationInterface';
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
export declare function createGT({ apiKey, projectID, cacheURL, baseURL, remoteSource, automaticTranslation, approvedLocales, defaultLocale, getLocale, renderPrevious, renderMethod, // "replace", "hang", "subtle"
renderTimeout, dictionaryName, dictionary, translations, maxConcurrentRequests, batchInterval, getMetadata, ...metadata }?: CreateI18NConfigProps): GeneralTranslation;
/**
 * Creates variable components only, for use in GT dictionaries.
 *
 * @param {Object} params - Configuration options.
 * @param {string[]} [params.approvedLocales] - List of approved locales.
 * @param {string} params.defaultLocale - Default locale for the translation.
 * @param {() => string} params.getLocale - Function to get the current locale.
 * @returns {Object} An object containing variable components.
 */
export declare function createVariables({ approvedLocales, defaultLocale, getLocale }?: {
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
}): Variables;
//# sourceMappingURL=server.d.ts.map