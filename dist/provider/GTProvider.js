"use strict";
'use client';
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
exports.default = GTProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var generaltranslation_1 = require("generaltranslation");
var react_1 = require("react");
var useBrowserLocale_1 = __importDefault(require("../hooks/useBrowserLocale"));
var primitives_1 = require("../primitives/primitives");
var GTContext_1 = require("./GTContext");
var getDictionaryEntry_1 = __importDefault(require("./helpers/getDictionaryEntry"));
var internal_1 = require("../internal");
var extractEntryMetadata_1 = __importDefault(require("./helpers/extractEntryMetadata"));
var renderDefaultChildren_1 = __importDefault(require("./rendering/renderDefaultChildren"));
var getPluralBranch_1 = __importDefault(require("../plurals/getPluralBranch"));
var renderTranslatedChildren_1 = __importDefault(require("./rendering/renderTranslatedChildren"));
/**
 * Provides General Translation context to its children, which can then access `useGT`, `useLocale`, and `useDefaultLocale`.
 *
 * @param {React.ReactNode} children - The children components that will use the translation context.
 * @param {string} [projectID] - The project ID required for General Translation cloud services.
 * @param {Dictionary} [dictionary=defaultDictionary] - The translation dictionary for the project.
 * @param {string} [dictionaryName=defaultDictionaryName] - The name of the translation dictionary.
 * @param {string[]} [approvedLocales] - The list of approved locales for the project.
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if no other locale is found.
 * @param {string} [locale] - The current locale, if already set.
 * @param {string} [cacheURL='https://cache.gtx.dev'] - The URL of the cache service for fetching translations.
 *
 * @returns {JSX.Element} The provider component for General Translation context.
 */
function GTProvider(_a) {
    var _this = this;
    var children = _a.children, projectID = _a.projectID, _b = _a.dictionary, dictionary = _b === void 0 ? primitives_1.defaultDictionary : _b, _c = _a.dictionaryName, dictionaryName = _c === void 0 ? primitives_1.defaultDictionaryName : _c, approvedLocales = _a.approvedLocales, _d = _a.defaultLocale, defaultLocale = _d === void 0 ? (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || primitives_1.libraryDefaultLocale : _d, locale = _a.locale, _e = _a.cacheURL, cacheURL = _e === void 0 ? 'https://cache.gtx.dev' : _e;
    if (!projectID && cacheURL === 'https://cache.gtx.dev') {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
    }
    var browserLocale = (0, useBrowserLocale_1.default)(defaultLocale);
    locale = locale || browserLocale;
    if (approvedLocales) {
        locale = (0, generaltranslation_1.determineLanguage)([locale, browserLocale], approvedLocales) || locale;
    }
    var translationRequired = (0, generaltranslation_1.isSameLanguage)(locale, defaultLocale) ? false : true;
    var _f = (0, react_1.useState)(cacheURL ? null : {}), translations = _f[0], setTranslations = _f[1];
    (0, react_1.useEffect)(function () {
        if (!translations) {
            if (!translationRequired) {
                setTranslations({}); // no translation required
            }
            else {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var response, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch("".concat(cacheURL, "/").concat(projectID, "/").concat(locale, "/").concat(dictionaryName))];
                            case 1:
                                response = _a.sent();
                                return [4 /*yield*/, response.json()];
                            case 2:
                                result = _a.sent();
                                setTranslations(result);
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
        }
    }, [translations, translationRequired]);
    var translate = (0, react_1.useCallback)(function (id, options, f) {
        var _a, _b, _c, _d;
        if (options === void 0) { options = {}; }
        // get the dictionary entry
        var _e = (0, extractEntryMetadata_1.default)((0, getDictionaryEntry_1.default)(dictionary, id)), entry = _e.entry, metadata = _e.metadata;
        // Get variables and variable options
        var variables;
        var variablesOptions;
        if (options) {
            variables = options;
            if (metadata === null || metadata === void 0 ? void 0 : metadata.variablesOptions) {
                variablesOptions = metadata.variablesOptions;
            }
        }
        // Handle if the entry is a function
        if (typeof f === 'function') {
            entry = f(options);
        }
        else if (typeof entry === 'function') {
            entry = entry(options);
        }
        var taggedEntry = (0, internal_1.addGTIdentifier)(entry, metadata);
        var source;
        // Get a plural if appropriate (check type, if type, get branch, entry =)
        var isPlural = metadata && primitives_1.pluralBranchNames.some(function (branchName) { return branchName in metadata; });
        if (isPlural) {
            if (typeof (variables === null || variables === void 0 ? void 0 : variables.n) !== 'number')
                throw new Error("t(\"".concat(id, "\"): Plural requires \"n\" option."));
            source = (0, getPluralBranch_1.default)(variables.n, [locale, defaultLocale], (_a = taggedEntry.props) === null || _a === void 0 ? void 0 : _a['data-generaltranslation'].branches) || taggedEntry.props.children; // we know t exists because isPlural
        }
        else {
            source = taggedEntry;
        }
        // If no translations are required
        if (!translationRequired) {
            if (typeof taggedEntry === 'string') {
                return (0, generaltranslation_1.renderContentToString)(source, defaultLocale, variables, variablesOptions);
            }
            return (0, renderDefaultChildren_1.default)({
                entry: source,
                variables: variables,
                variablesOptions: variablesOptions
            });
        }
        // If a translation is required
        if (translations) {
            var translation = translations[id];
            if (typeof taggedEntry === 'string') {
                return (0, generaltranslation_1.renderContentToString)(translation.t, [locale, defaultLocale], variables, variablesOptions);
            }
            var target = translation.t;
            if (isPlural) {
                target = (0, getPluralBranch_1.default)(variables === null || variables === void 0 ? void 0 : variables.n, [locale, defaultLocale], (_c = (_b = target.props) === null || _b === void 0 ? void 0 : _b['data-generaltranslation']) === null || _c === void 0 ? void 0 : _c.branches) || ((_d = target === null || target === void 0 ? void 0 : target.props) === null || _d === void 0 ? void 0 : _d.children);
            }
            return (0, renderTranslatedChildren_1.default)({
                source: source,
                target: target,
                variables: variables,
                variablesOptions: variablesOptions
            });
        }
    }, [dictionary, translations, translationRequired]);
    return ((0, jsx_runtime_1.jsx)(GTContext_1.GTContext.Provider, { value: {
            translate: translate,
            locale: locale,
            defaultLocale: defaultLocale
        }, children: translations ?
            children : undefined }));
}
//# sourceMappingURL=GTProvider.js.map