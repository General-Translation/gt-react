"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.initGT = initGT;
exports.initVariables = initVariables;
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("./client");
var createComponentError_1 = __importDefault(require("./client/errors/createComponentError"));
var ClientCurrency_1 = __importDefault(require("./client/variables/ClientCurrency"));
var ClientDateTime_1 = __importDefault(require("./client/variables/ClientDateTime"));
var ClientNum_1 = __importDefault(require("./client/variables/ClientNum"));
var ClientVar_1 = __importDefault(require("./client/variables/ClientVar"));
var getDefaultFromEnv_1 = __importDefault(require("./config/local/getDefaultFromEnv"));
var defaultGTProps_1 = __importDefault(require("./types/defaultGTProps"));
// ----- SINGLETONS ----- //
var I18NConfig = null;
var createTComponent = null;
var createTranslationFunction = null;
var createValueComponent = null;
var createPluralComponent = null;
var createTFunction = null;
var createGTProviderComponent = null;
var VarComponent = null;
var NumComponent = null;
var CurrencyComponent = null;
var DateTimeComponent = null;
// ----- HELPER FUNCTIONS ----- //
var isClient = function () { return typeof window !== 'undefined'; };
// ----- MAIN FUNCTIONS ----- //
function initGT(_a) {
    if (_a === void 0) { _a = {
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
    }; }
    var 
    // Cloud integration
    _b = _a.apiKey, 
    // Cloud integration
    apiKey = _b === void 0 ? defaultGTProps_1.default.apiKey : _b, _c = _a.projectID, projectID = _c === void 0 ? defaultGTProps_1.default.projectID : _c, _d = _a.cacheURL, cacheURL = _d === void 0 ? defaultGTProps_1.default.cacheURL : _d, _e = _a.baseURL, baseURL = _e === void 0 ? defaultGTProps_1.default.baseURL : _e, _f = _a.remoteSource, remoteSource = _f === void 0 ? defaultGTProps_1.default.remoteSource : _f, _g = _a.automaticTranslation, automaticTranslation = _g === void 0 ? defaultGTProps_1.default.automaticTranslation : _g, 
    // Locale info
    approvedLocales = _a.approvedLocales, _h = _a.defaultLocale, defaultLocale = _h === void 0 ? (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale : _h, _j = _a.getLocale, getLocale = _j === void 0 ? function () { return 'en-US'; } : _j, 
    // Rendering
    _k = _a.renderPrevious, 
    // Rendering
    renderPrevious = _k === void 0 ? defaultGTProps_1.default.renderPrevious : _k, _l = _a.renderMethod, renderMethod = _l === void 0 ? defaultGTProps_1.default.renderMethod : _l, // "replace", "hang", "subtle"
    _m = _a.renderTimeout, // "replace", "hang", "subtle"
    renderTimeout = _m === void 0 ? defaultGTProps_1.default.renderTimeout : _m, 
    // Dictionaries
    _o = _a.dictionaryName, 
    // Dictionaries
    dictionaryName = _o === void 0 ? defaultGTProps_1.default.dictionaryName : _o, _p = _a.dictionary, dictionary = _p === void 0 ? defaultGTProps_1.default.dictionary : _p, translations = _a.translations, 
    // Batching config
    _q = _a.maxConcurrentRequests, 
    // Batching config
    maxConcurrentRequests = _q === void 0 ? defaultGTProps_1.default.maxConcurrentRequests : _q, _r = _a.batchInterval, batchInterval = _r === void 0 ? defaultGTProps_1.default.batchInterval : _r, 
    // Other metadata
    _s = _a.getMetadata, 
    // Other metadata
    getMetadata = _s === void 0 ? defaultGTProps_1.default.getMetadata : _s, metadata = __rest(_a, ["apiKey", "projectID", "cacheURL", "baseURL", "remoteSource", "automaticTranslation", "approvedLocales", "defaultLocale", "getLocale", "renderPrevious", "renderMethod", "renderTimeout", "dictionaryName", "dictionary", "translations", "maxConcurrentRequests", "batchInterval", "getMetadata"]);
    var initI18NConfig = function () {
        if (I18NConfig)
            return I18NConfig;
        I18NConfig = new (require('./config/I18NConfiguration').default)(__assign({ apiKey: apiKey, projectID: projectID, cacheURL: cacheURL, baseURL: baseURL, remoteSource: remoteSource, automaticTranslation: automaticTranslation, getLocale: getLocale, defaultLocale: defaultLocale, approvedLocales: approvedLocales, renderPrevious: renderPrevious, renderMethod: renderMethod, renderTimeout: renderTimeout, dictionary: dictionary, dictionaryName: (0, getDefaultFromEnv_1.default)('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
            translations: translations, maxConcurrentRequests: maxConcurrentRequests, batchInterval: batchInterval, getMetadata: getMetadata }, metadata));
    };
    var T = function (params) {
        if (isClient()) {
            return (0, createComponentError_1.default)('T')(params);
        }
        else {
            initI18NConfig();
            return (createTComponent || (createTComponent = require('./server/inline/createTComponent').default))(I18NConfig)(params);
        }
    };
    var translate = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (isClient()) {
            throw new Error("translate(".concat(JSON.stringify(params === null || params === void 0 ? void 0 : params[0]), ") on the client-side can't access your API keys."));
        }
        else {
            initI18NConfig();
            return (createTranslationFunction || (createTranslationFunction = require('./server/translate/createTranslateFunction').default))(I18NConfig).apply(void 0, params);
        }
    };
    var Value = function (params) {
        if (isClient()) {
            return (0, createComponentError_1.default)('Value')(params);
        }
        else {
            initI18NConfig();
            return (createValueComponent || (createValueComponent = require('./server/value/createValueComponent').default))(T, I18NConfig.getLocale(), I18NConfig.getDefaultLocale())(params);
        }
    };
    var Plural = function (params) {
        if (isClient()) {
            return (0, createComponentError_1.default)('Plural')(params);
        }
        else {
            initI18NConfig();
            return (createPluralComponent || (createPluralComponent = require('./server/plural/createPluralComponent').default))(T, I18NConfig.getLocale(), I18NConfig.getDefaultLocale())(params);
        }
    };
    var t = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (isClient()) {
            throw new Error("t(\"".concat(params === null || params === void 0 ? void 0 : params[0], "\") on the client-side, which won't work because of how React handles hooks. Try t = getGT() or useGT() to get the t() function instead."));
        }
        else {
            initI18NConfig();
            return (createTFunction || (createTFunction = require('./dictionary/createTFunction').default))(I18NConfig, T, translate).apply(void 0, params);
        }
    };
    var getGT = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (isClient()) {
            return client_1.useGT;
        }
        else {
            initI18NConfig();
            return (params[0] ? (createTFunction || (createTFunction = require('./dictionary/createTFunction').default))(I18NConfig, T, translate, I18NConfig.getDictionaryEntry(params[0])) : t);
        }
    };
    var GTProvider = function (params) {
        if (isClient()) {
            var children = params.children, props = __rest(params, ["children"]);
            return ((0, jsx_runtime_1.jsx)(client_1.GTClientProvider, __assign({ projectID: projectID, dictionary: dictionary, dictionaryName: dictionaryName, approvedLocales: approvedLocales, defaultLocale: defaultLocale, remoteSource: remoteSource, cacheURL: cacheURL, translations: translations }, props, { children: children })));
        }
        else {
            initI18NConfig();
            return (createGTProviderComponent || (createGTProviderComponent = require('./server/provider/createGTProviderComponent').default))(I18NConfig)(params);
        }
    };
    var getDefaultLocale = function () {
        if (isClient()) {
            return (0, client_1.useDefaultLocale)();
        }
        else {
            initI18NConfig();
            return I18NConfig.getDefaultLocale();
        }
    };
    return {
        T: T,
        translate: translate,
        Value: Value,
        Plural: Plural,
        t: t,
        getGT: getGT,
        GTProvider: GTProvider,
        getLocale: function () {
            if (isClient()) {
                return (0, client_1.useLocale)();
            }
            else {
                initI18NConfig();
                return I18NConfig.getLocale();
            }
        },
        getDefaultLocale: getDefaultLocale
    };
}
function initVariables(_a) {
    var _b = _a === void 0 ? {
        defaultLocale: defaultGTProps_1.default.defaultLocale,
        getLocale: defaultGTProps_1.default.getLocale
    } : _a, approvedLocales = _b.approvedLocales, _c = _b.defaultLocale, defaultLocale = _c === void 0 ? (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale : _c, _d = _b.getLocale, getLocale = _d === void 0 ? function () { return defaultLocale; } : _d;
    var Var = function (params) {
        if (params === void 0) { params = {}; }
        var children = params.children, props = __rest(params, ["children"]);
        if (isClient()) {
            return ((0, jsx_runtime_1.jsx)(ClientVar_1.default, __assign({}, props, { children: children })));
        }
        else {
            var Var_1 = (VarComponent || (VarComponent = require('./server/variables/Var').default));
            return ((0, jsx_runtime_1.jsx)(Var_1, __assign({}, props, { children: children })));
        }
    };
    Var.gtTransformation = "variable-variable";
    var Num = function (params) {
        if (params === void 0) { params = {}; }
        var children = params.children, props = __rest(params, ["children"]);
        if (isClient()) {
            return ((0, jsx_runtime_1.jsx)(ClientNum_1.default, __assign({}, props, { children: children })));
        }
        else {
            var locales = [getLocale(), defaultLocale];
            var Num_1 = (NumComponent || (NumComponent = require('./server/variables/Num').default));
            return ((0, jsx_runtime_1.jsx)(Num_1, __assign({ locales: locales }, props, { children: children })));
        }
    };
    Num.gtTransformation = "variable-number";
    var DateTime = function (params) {
        if (params === void 0) { params = {}; }
        var children = params.children, props = __rest(params, ["children"]);
        if (isClient()) {
            return ((0, jsx_runtime_1.jsx)(ClientDateTime_1.default, __assign({}, props, { children: children })));
        }
        else {
            var locales = [getLocale(), defaultLocale];
            var DateTime_1 = (DateTimeComponent || (DateTimeComponent = require('./server/variables/DateTime').default));
            return ((0, jsx_runtime_1.jsx)(DateTime_1, __assign({ locales: locales }, props, { children: children })));
        }
    };
    DateTime.gtTransformation = "variable-datetime";
    var Currency = function (params) {
        if (params === void 0) { params = {}; }
        var children = params.children, props = __rest(params, ["children"]);
        if (isClient()) {
            return ((0, jsx_runtime_1.jsx)(ClientCurrency_1.default, __assign({}, props, { children: children })));
        }
        else {
            var locales = [getLocale(), defaultLocale];
            var Currency_1 = (CurrencyComponent || (CurrencyComponent = require('./server/variables/Currency').default));
            return ((0, jsx_runtime_1.jsx)(Currency_1, __assign({ locales: locales }, props, { children: children })));
        }
    };
    Currency.gtTransformation = "variable-currency";
    var getDefaultLocale = function () {
        if (isClient()) {
            return (0, client_1.useDefaultLocale)();
        }
        else {
            return defaultLocale;
        }
    };
    return {
        Var: Var,
        Num: Num,
        Currency: Currency,
        DateTime: DateTime,
        getLocale: function () {
            if (isClient()) {
                return (0, client_1.useLocale)();
            }
            else {
                return getLocale();
            }
        },
        getDefaultLocale: getDefaultLocale
    };
}
//# sourceMappingURL=server-index.js.map