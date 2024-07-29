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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariables = createVariables;
exports.createGT = createGT;
const _1 = require(".");
const requestFunctions_1 = require("./next/requestFunctions");
const _2 = require(".");
/**
 * Configures and returns variable components for the `gt-react` i18n library,
 * adapted for Next.js environment.
 *
 * @param {Object} [params] - Configuration options for creating variables.
 * @param {string[]} [params.approvedLocales] - List of approved locales. Default is an empty array.
 * @param {string} [params.defaultLocale] - Default locale for the variables. Default is the first locale in `approvedLocales` or 'en'.
 * @param {Function} [params.getLocale] - Function to get the current locale. Uses `getNextLocale` if not provided.
 * @returns {Variables} An object containing various variable components like Value, Numeric, Variable, etc.
 */
function createVariables({ approvedLocales = [], defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || 'en', getLocale, } = {
    defaultLocale: 'en'
}) {
    const finalGetLocale = getLocale || (() => { return 'en'; }); //(() => { return getNextLocale(defaultLocale, approvedLocales) });
    return (0, _2.createVariables)({ approvedLocales, defaultLocale, getLocale: finalGetLocale });
}
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
 * @param {string} [params.renderMethod] - How translations are rendered for the first time. options are "replace", "hang", "subtle". Default is "replace".
 * @param {string} [params.dictionaryName] - Name of the dictionary to use. Default is "default".
 * @param {Object} [params.dictionary] - Dictionary object containing translations.
 * @param {number} [params.maxConcurrentRequests] - Maximum number of concurrent requests. Default is 2.
 * @param {number} [params.batchInterval] - Interval for batching requests in milliseconds. Default is 1000.
 * @param {Object} [...metadata] - Any additional metadata. Used for experimental variables.
 * @returns {GeneralTranslation} An object containing internationalization and translation functions.
 */
function createGT(_a = {
    defaultLocale: 'en'
}) {
    var { approvedLocales, defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || 'en', getLocale, getMetadata } = _a, metadata = __rest(_a, ["approvedLocales", "defaultLocale", "getLocale", "getMetadata"]);
    const finalGetLocale = getLocale || (() => { return (0, requestFunctions_1.getNextLocale)(defaultLocale, approvedLocales); });
    const finalGetMetadata = getMetadata || (() => { return { domain: (0, requestFunctions_1.getNextDomain)() }; });
    return (0, _1.createGT)(Object.assign({ defaultLocale, getLocale: finalGetLocale, getMetadata: finalGetMetadata }, metadata));
}
//# sourceMappingURL=next.js.map