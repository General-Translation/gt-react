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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGT = initGT;
var I18NConfiguration_1 = __importDefault(require("./config/I18NConfiguration"));
var defaultInitGTProps_1 = __importDefault(require("./primitives/defaultInitGTProps"));
var path_1 = __importDefault(require("path"));
function initGT(_a) {
    if (_a === void 0) { _a = defaultInitGTProps_1.default; }
    var i18n = _a.i18n, dictionary = _a.dictionary, _b = _a.apiKey, apiKey = _b === void 0 ? defaultInitGTProps_1.default.apiKey : _b, _c = _a.projectID, projectID = _c === void 0 ? defaultInitGTProps_1.default.projectID : _c, _d = _a.baseURL, baseURL = _d === void 0 ? defaultInitGTProps_1.default.baseURL : _d, _e = _a.cacheURL, cacheURL = _e === void 0 ? defaultInitGTProps_1.default.cacheURL : _e, locales = _a.locales, _f = _a.defaultLocale, defaultLocale = _f === void 0 ? (locales === null || locales === void 0 ? void 0 : locales[0]) || defaultInitGTProps_1.default.defaultLocale : _f, _g = _a.renderSettings, renderSettings = _g === void 0 ? defaultInitGTProps_1.default.renderSettings : _g, _h = _a.dictionaryName, dictionaryName = _h === void 0 ? defaultInitGTProps_1.default.dictionaryName : _h, _j = _a._maxConcurrentRequests, _maxConcurrentRequests = _j === void 0 ? defaultInitGTProps_1.default._maxConcurrectRequests : _j, _k = _a._batchInterval, _batchInterval = _k === void 0 ? defaultInitGTProps_1.default._batchInterval : _k, metadata = __rest(_a, ["i18n", "dictionary", "apiKey", "projectID", "baseURL", "cacheURL", "locales", "defaultLocale", "renderSettings", "dictionaryName", "_maxConcurrentRequests", "_batchInterval"]);
    // Error checks
    if (!projectID && ((cacheURL === defaultInitGTProps_1.default.cacheURL) || (baseURL === defaultInitGTProps_1.default.baseURL)))
        throw new Error('Project ID missing! Set projectID as GT_PROJECT_ID in the environment or by passing the projectID parameter to initGT(). Find your project ID: www.generaltranslation.com/dashboard.');
    if ((!apiKey || !projectID) && (baseURL === defaultInitGTProps_1.default.baseURL)) {
        throw new Error("API key is required for automatic translation! Create an API key: www.generaltranslation.com/dashboard/api-keys. (Or, turn off automatic translation by setting baseURL to an empty string.)");
    }
    // Save the I18N config object
    if (!globalThis.__GENERALTRANSLATION__) {
        globalThis.__GENERALTRANSLATION__ = new I18NConfiguration_1.default(__assign({ apiKey: apiKey, projectID: projectID, baseURL: baseURL, cacheURL: cacheURL, locales: locales, defaultLocale: defaultLocale, renderSettings: renderSettings, dictionaryName: dictionaryName, maxConcurrentRequests: _maxConcurrentRequests, batchInterval: _batchInterval }, metadata));
    }
    // Use i18n and dictionary values as file paths if they are provided as such
    var resolvedI18NFilePath = typeof i18n === 'string' ? i18n : resolveConfigFilepath('i18n');
    var resolvedDictionaryFilePath = typeof dictionary === 'string' ? dictionary : resolveConfigFilepath('dictionary');
    return function (config) {
        if (config === void 0) { config = {}; }
        return __assign(__assign({}, config), { webpack: function webpack() {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var webpackConfig = _a[0], options = _a[1];
                if (resolvedI18NFilePath) {
                    // Add alias for importing request handler
                    webpackConfig.resolve.alias['gt-next/_request'] = path_1.default.resolve(webpackConfig.context, resolvedI18NFilePath);
                }
                if (resolvedDictionaryFilePath) {
                    // Add alias for importing dictionary via webpack
                    webpackConfig.resolve.alias['gt-next/_dictionary'] = path_1.default.resolve(webpackConfig.context, resolvedDictionaryFilePath);
                }
                if (typeof (config === null || config === void 0 ? void 0 : config.webpack) === 'function') {
                    return config.webpack(webpackConfig, options);
                }
                return webpackConfig;
            } });
    };
}
// Function to search for both i18n.js and dictionary.js
function resolveConfigFilepath(fileName, cwd) {
    function resolvePath(pathname) {
        var parts = [];
        if (cwd)
            parts.push(cwd);
        parts.push(pathname);
        return path_1.default.resolve.apply(path_1.default, parts);
    }
    function pathExists(pathname) {
        return require('fs').existsSync(resolvePath(pathname));
    }
    // Check for file existence in the root and src directories with supported extensions
    for (var _i = 0, _a = __spreadArray(__spreadArray([], withExtensions("./".concat(fileName)), true), withExtensions("./src/".concat(fileName)), true); _i < _a.length; _i++) {
        var candidate = _a[_i];
        if (pathExists(candidate)) {
            return candidate;
        }
    }
    // Return undefined if no file is found
    return undefined;
}
// Helper function to handle multiple extensions
function withExtensions(localPath) {
    return [
        "".concat(localPath, ".ts"),
        "".concat(localPath, ".tsx"),
        "".concat(localPath, ".js"),
        "".concat(localPath, ".jsx")
    ];
}
//# sourceMappingURL=config.js.map