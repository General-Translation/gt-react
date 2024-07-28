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
const getDefaultFromEnv_1 = __importDefault(require("./local/getDefaultFromEnv"));
const createI18NComponent_1 = __importDefault(require("./server/createI18NComponent"));
const I18NConfiguration_1 = __importDefault(require("./config/I18NConfiguration"));
const createIntlFunction_1 = __importDefault(require("./intl/createIntlFunction"));
const createGTProviderComponent_1 = __importDefault(require("./client/createGTProviderComponent"));
const createTFunction_1 = __importDefault(require("./dictionary/createTFunction"));
const createDictFunction_1 = __importDefault(require("./dictionary/createDictFunction"));
const createValueComponent_1 = __importDefault(require("./primitives/value/createValueComponent"));
const createNumericComponent_1 = __importDefault(require("./primitives/numeric/createNumericComponent"));
const createVariableComponent_1 = __importDefault(require("./primitives/variables/Variable/createVariableComponent"));
const createNumberVariableComponent_1 = __importDefault(require("./primitives/variables/NumberVariable/createNumberVariableComponent"));
const createDateVariableComponent_1 = __importDefault(require("./primitives/variables/DateVariable/createDateVariableComponent"));
const createCurrencyVariableComponent_1 = __importDefault(require("./primitives/variables/CurrencyVariable/createCurrencyVariableComponent"));
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
function createGT(_a = {
    apiKey: (0, getDefaultFromEnv_1.default)('GT_API_KEY'),
    projectID: (0, getDefaultFromEnv_1.default)('GT_PROJECT_ID'),
    cacheURL: "https://cache.gtx.dev",
    baseURL: "https://prod.gtx.dev",
    approvedLocales: [],
    defaultLocale: 'en',
    getLocale: () => 'en',
    renderMethod: "replace",
    dictionaryName: "default",
    dictionary: {},
    maxConcurrentRequests: 2,
    batchInterval: 1000
}) {
    var { 
    // Cloud integration
    apiKey = (0, getDefaultFromEnv_1.default)('GT_API_KEY'), projectID = (0, getDefaultFromEnv_1.default)('GT_PROJECT_ID'), cacheURL = "https://cache.gtx.dev", baseURL = "https://prod.gtx.dev", 
    // Locale info
    approvedLocales, defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || 'en', getLocale = () => { return defaultLocale; }, 
    // Rendering
    renderMethod = "replace", // "hang", "subtle"
    // Dictionaries
    dictionaryName = "default", dictionary = {}, 
    // Batching config
    maxConcurrentRequests = 2, batchInterval = 1000 } = _a, 
    // Other metadata
    metadata = __rest(_a, ["apiKey", "projectID", "cacheURL", "baseURL", "approvedLocales", "defaultLocale", "getLocale", "renderMethod", "dictionaryName", "dictionary", "maxConcurrentRequests", "batchInterval"]);
    const I18NConfig = new I18NConfiguration_1.default(Object.assign({ apiKey, projectID, cacheURL, baseURL,
        getLocale, defaultLocale, approvedLocales,
        renderMethod,
        dictionary, dictionaryName: (0, getDefaultFromEnv_1.default)('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
        maxConcurrentRequests, batchInterval }, metadata));
    // ----- <I18N> ------ //
    const I18N = (0, createI18NComponent_1.default)(Object.assign({ I18NConfig }, metadata));
    // ----- intl() ------ //
    const intl = (0, createIntlFunction_1.default)(Object.assign({ I18NConfig }, metadata));
    // ----- <GTProvider> ------ //
    const GTProvider = (0, createGTProviderComponent_1.default)(Object.assign({ I18NConfig, I18N, intl }, metadata));
    // ----- Dictionary ------ //
    const t = (0, createTFunction_1.default)({ I18NConfig, I18N });
    const dict = (0, createDictFunction_1.default)(I18NConfig);
    // ----- Variables ----- //
    const Value = (0, createValueComponent_1.default)(getLocale);
    const Numeric = (0, createNumericComponent_1.default)(getLocale);
    const Variable = (0, createVariableComponent_1.default)();
    const NumberVariable = (0, createNumberVariableComponent_1.default)(getLocale);
    const DateVariable = (0, createDateVariableComponent_1.default)(getLocale);
    const CurrencyVariable = (0, createCurrencyVariableComponent_1.default)(getLocale);
    // ----- Helper Functions ------ //
    const getDefaultLocale = I18NConfig.getDefaultLocale;
    return {
        I18N, intl,
        GTProvider,
        t, dict,
        Value, Numeric,
        Variable, NumberVariable, DateVariable, CurrencyVariable,
        getLocale, getDefaultLocale,
    };
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
function createVariables({ approvedLocales = [], defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || 'en', getLocale = () => { return defaultLocale; }, } = {
    defaultLocale: 'en',
    getLocale: () => { return 'en'; }
}) {
    // ----- Variables ----- //
    const Value = (0, createValueComponent_1.default)(getLocale);
    const Numeric = (0, createNumericComponent_1.default)(getLocale);
    const Variable = (0, createVariableComponent_1.default)();
    const NumberVariable = (0, createNumberVariableComponent_1.default)(getLocale);
    const DateVariable = (0, createDateVariableComponent_1.default)(getLocale);
    const CurrencyVariable = (0, createCurrencyVariableComponent_1.default)(getLocale);
    return {
        Value, Numeric, Variable,
        NumberVariable, DateVariable, CurrencyVariable
    };
}
//# sourceMappingURL=index.js.map