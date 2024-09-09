"use strict";
// intended for purely client-side apps, put at the root of the project
'use client';
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GTClientProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var ClientProvider_1 = require("../ClientProvider");
var defaultGTProps_1 = __importDefault(require("../../types/defaultGTProps"));
var useBrowserLocale_1 = __importDefault(require("../hooks/useBrowserLocale"));
var generaltranslation_1 = require("generaltranslation");
var renderDefaultLanguage_1 = __importDefault(require("../helpers/renderDefaultLanguage"));
var getDictionaryReference_1 = __importDefault(require("../../dictionary/getDictionaryReference"));
var renderClientChildren_1 = __importDefault(require("../helpers/renderClientChildren"));
var getEntryTranslationType_1 = __importDefault(require("../../dictionary/getEntryTranslationType"));
var getEntryMetadata_1 = __importDefault(require("../../dictionary/getEntryMetadata"));
var ClientPlural_1 = __importDefault(require("../plural/ClientPlural"));
var addGTIdentifier_1 = __importDefault(require("../../internal/addGTIdentifier"));
var flattenDictionary_1 = __importDefault(require("../../internal/flattenDictionary"));
/**
 * GTClientProvider component for providing translations to entirely client-side React apps.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} [props.children] - The child components to be rendered within the provider.
 * @param {string} [props.projectID] - The project ID for remote translation services.
 * @param {Record<string, any>} [props.dictionary=defaultGTProps.dictionary] - The local dictionary for translations.
 * @param {string} [props.dictionaryName=defaultGTProps.dictionaryName] - The name of the dictionary.
 * @param {string[]} [props.approvedLocales] - The list of approved locales.
 * @param {string} [props.defaultLocale=approvedLocales?.[0] || defaultGTProps.defaultLocale] - The default locale.
 * @param {string} [props.locale=''] - The current locale.
 * @param {boolean} [props.remoteSource=defaultGTProps.remoteSource] - Flag indicating if remote source is used.
 * @param {string} [props.cacheURL=defaultGTProps.cacheURL] - The URL for caching translations.
 * @param {Record<string, () => Promise<Record<string, any>>>} [props.translations] - A local translations object.
 *
 * @throws Will throw an error if projectID is not provided when remoteSource is true and cacheURL is the default.
 *
 * @returns {JSX.Element} The GTClientProvider component.
*/
function GTClientProvider(_a) {
    var _this = this;
    var children = _a.children, projectID = _a.projectID, _b = _a.dictionary, dictionary = _b === void 0 ? defaultGTProps_1.default.dictionary : _b, _c = _a.dictionaryName, dictionaryName = _c === void 0 ? defaultGTProps_1.default.dictionaryName : _c, approvedLocales = _a.approvedLocales, _d = _a.defaultLocale, defaultLocale = _d === void 0 ? (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale : _d, _e = _a.locale, locale = _e === void 0 ? '' : _e, _f = _a.remoteSource, remoteSource = _f === void 0 ? defaultGTProps_1.default.remoteSource : _f, _g = _a.cacheURL, cacheURL = _g === void 0 ? defaultGTProps_1.default.cacheURL : _g;
    var suppliedDictionary = (0, react_1.useMemo)(function () { return (0, flattenDictionary_1.default)(dictionary); }, [dictionary]);
    if (!projectID && remoteSource && cacheURL === defaultGTProps_1.default.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
    }
    var browserLocale = (0, useBrowserLocale_1.default)(defaultLocale);
    locale = locale || browserLocale;
    var _h = (0, react_1.useState)({
        local: false,
        remote: false
    }), loaded = _h[0], setLoaded = _h[1];
    var translationRequired = (0, generaltranslation_1.isSameLanguage)(locale, defaultLocale) ? false : true;
    var _j = (0, react_1.useState)(null), remoteTranslations = _j[0], setRemoteTranslations = _j[1];
    (0, react_1.useEffect)(function () {
        if (locale) {
            if (remoteSource && translationRequired) {
                var fetchRemoteTranslations = function () { return __awaiter(_this, void 0, void 0, function () {
                    var response, result, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, 4, 5]);
                                return [4 /*yield*/, fetch("".concat(cacheURL, "/").concat(projectID, "/").concat((0, getDictionaryReference_1.default)(locale, dictionaryName)))];
                            case 1:
                                response = _a.sent();
                                return [4 /*yield*/, response.json()];
                            case 2:
                                result = _a.sent();
                                if (Object.keys(result).length) {
                                    setRemoteTranslations(result);
                                }
                                return [3 /*break*/, 5];
                            case 3:
                                error_1 = _a.sent();
                                console.error(error_1);
                                return [3 /*break*/, 5];
                            case 4:
                                setLoaded(function (prev) { return (__assign(__assign({}, prev), { remote: true })); });
                                return [7 /*endfinally*/];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                fetchRemoteTranslations();
            }
            else {
                setLoaded(function (prev) { return (__assign(__assign({}, prev), { remote: true })); });
            }
        }
    }, [cacheURL, remoteSource, locale]);
    var translate = (0, react_1.useCallback)(function (id, options, f) {
        if (options === void 0) { options = {}; }
        var _a = (0, getEntryMetadata_1.default)(suppliedDictionary[id]), entry = _a.entry, metadata = _a.metadata;
        var _b = (0, getEntryTranslationType_1.default)(suppliedDictionary[id]), translationType = _b.type, isFunction = _b.isFunction;
        if (typeof f === 'function') {
            entry = f(options);
        }
        else if (isFunction) {
            entry = entry(options);
        }
        if (translationType === "t") {
            entry = (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: entry }, id);
        }
        else if (translationType === "plural") {
            entry = ((0, jsx_runtime_1.jsx)(ClientPlural_1.default, __assign({ n: 1 }, metadata, { children: entry }), id));
        }
        var taggedEntry = (0, addGTIdentifier_1.default)(entry);
        // if entry is "string", none of the above should have affected it
        if (translationRequired) {
            if (remoteTranslations && remoteTranslations[id] && remoteTranslations[id].t) {
                if (typeof entry === 'string') {
                    return (0, generaltranslation_1.renderContentToString)(remoteTranslations[id], [locale, defaultLocale], options, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) ? metadata.variableOptions : undefined));
                }
                return (0, renderClientChildren_1.default)(__assign({ source: taggedEntry, target: remoteTranslations[id].t, locale: locale, defaultLocale: defaultLocale, id: id, variables: options }, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) && { variables: metadata.variableOptions })));
            }
        }
        else {
            if (typeof entry === 'string') {
                return (0, generaltranslation_1.renderContentToString)(entry, [locale, defaultLocale], options, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) ? metadata.variableOptions : undefined));
            }
            return (0, renderDefaultLanguage_1.default)(__assign({ source: taggedEntry, id: id, variables: options }, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) && { variables: metadata.variableOptions })));
        }
    }, [suppliedDictionary, translationRequired, remoteTranslations]);
    return ((0, jsx_runtime_1.jsx)(ClientProvider_1.GTContext.Provider, { value: {
            translate: translate,
            locale: locale,
            defaultLocale: defaultLocale
        }, children: Object.values(loaded).every(function (item) { return item ? true : false; }) &&
            children }));
}
//# sourceMappingURL=GTClientProvider.js.map