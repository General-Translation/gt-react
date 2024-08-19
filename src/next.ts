import { createGT as createBaseGT, createVariables as createBaseVariables } from "./server";
import { getNextDomain, getNextLocale } from "./next/requestFunctions";
import CreateGTProps from './types/CreateGTProps';
import GeneralTranslation from "./types/GeneralTranslationInterface";
import Variables from "./types/Variables";

/**
 * Initializes the `gt-react` i18n library with Next.js specific configurations.
 * 
 * @param {Object} params - Configuration options.
 * @param {string} [params.apiKey] - API key for cloud integration. Default is fetched from environment variable `GT_API_KEY`.
 * @param {string} [params.projectID] - Project ID for cloud integration. Default is fetched from environment variable `GT_PROJECT_ID`.
 * @param {string} [params.cacheURL] - URL for caching. Default is "https://cache.gtx.dev".
 * @param {string} [params.baseURL] - Base URL for API requests. Default is "https://prod.gtx.dev".
 * @param {string[]} [params.approvedLocales] - List of approved locales. Default is an empty array.
 * @param {string} [params.defaultLocale] - Default locale for the translation. Default is the first locale in `approvedLocales` or 'en'.
 * @param {Function} [params.getLocale] - Function to get the current locale. Sets using Next.js request headers if not provided.
 * @param {string} [params.renderMethod] - How translations are rendered for the first time. options are "skeleton", "replace", "hang", "subtle". 
 * @param {string} [params.dictionaryName] - Name of the dictionary to use. Default is "default".
 * @param {Object} [params.dictionary] - Dictionary object containing translations.
 * @param {number} [params.maxConcurrentRequests] - Maximum number of concurrent requests. Default is 2.
 * @param {number} [params.batchInterval] - Interval for batching requests in milliseconds. Default is 1000.
 * @param {Object} [...metadata] - Any additional metadata. Used for experimental variables.
 * @returns {GeneralTranslation} An object containing internationalization and translation functions.
 */
export function createGT({
    approvedLocales,
    defaultLocale = approvedLocales?.[0] || 'en',
    getLocale, getMetadata,
    ...metadata
}: CreateGTProps = {
    defaultLocale: 'en'
}): GeneralTranslation  {
    const finalGetLocale = getLocale || (() => { return getNextLocale(defaultLocale, approvedLocales) });
    const finalGetMetadata = getMetadata || (() => { return { domain: getNextDomain() } });
    return createBaseGT({ defaultLocale, getLocale: finalGetLocale, getMetadata: finalGetMetadata, ...metadata });
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
    defaultLocale,
    getLocale
}: {
    approvedLocales?: string[],
    defaultLocale?: string;
    getLocale?: () => string;
}): Variables {
    const finalGetLocale = getLocale || (() => { return getNextLocale(defaultLocale, approvedLocales) });
    return createBaseVariables({ approvedLocales, defaultLocale, getLocale: finalGetLocale });
}