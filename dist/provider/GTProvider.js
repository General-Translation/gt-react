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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.default = GTProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var generaltranslation_1 = require("generaltranslation");
var react_2 = require("react");
var useBrowserLocale_1 = __importDefault(require("../hooks/useBrowserLocale"));
var GTContext_1 = require("./GTContext");
var getDictionaryEntry_1 = __importDefault(require("./helpers/getDictionaryEntry"));
var internal_1 = require("../internal");
var extractEntryMetadata_1 = __importDefault(require("./helpers/extractEntryMetadata"));
var renderDefaultChildren_1 = __importDefault(require("./rendering/renderDefaultChildren"));
var renderTranslatedChildren_1 = __importDefault(require("./rendering/renderTranslatedChildren"));
var internal_2 = require("generaltranslation/internal");
var renderVariable_1 = __importDefault(require("./rendering/renderVariable"));
var createErrors_1 = require("../errors/createErrors");
var supported_locales_1 = require("@generaltranslation/supported-locales");
var useDynamicTranslation_1 = __importDefault(require("./dynamic/useDynamicTranslation"));
var defaultRenderSettings_1 = require("./rendering/defaultRenderSettings");
var id_1 = require("generaltranslation/id");
var renderSkeleton_1 = __importDefault(require("./rendering/renderSkeleton"));
/**
 * Provides General Translation context to its children, which can then access `useGT`, `useLocale`, and `useDefaultLocale`.
 *
 * @param {React.ReactNode} children - The children components that will use the translation context.
 * @param {string} [projectId] - The project ID required for General Translation cloud services.
 * @param {Dictionary} [dictionary=defaultDictionary] - The translation dictionary for the project.
 * @param {string[]} [locales] - The list of approved locales for the project.
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if no other locale is found.
 * @param {string} [locale] - The current locale, if already set.
 * @param {string} [cacheUrl='https://cache.gtx.dev'] - The URL of the cache service for fetching translations.
 *
 * @returns {JSX.Element} The provider component for General Translation context.
 */
function GTProvider(_a) {
    var _this = this;
    var children = _a.children, projectId = _a.projectId, _b = _a.dictionary, dictionary = _b === void 0 ? {} : _b, _c = _a.locales, locales = _c === void 0 ? (0, supported_locales_1.listSupportedLocales)() : _c, _d = _a.defaultLocale, defaultLocale = _d === void 0 ? internal_2.libraryDefaultLocale : _d, _e = _a.locale, locale = _e === void 0 ? (0, useBrowserLocale_1.default)(defaultLocale, locales) || defaultLocale : _e, _f = _a.cacheUrl, cacheUrl = _f === void 0 ? internal_2.defaultCacheUrl : _f, _g = _a.runtimeUrl, runtimeUrl = _g === void 0 ? internal_2.defaultRuntimeApiUrl : _g, _h = _a.renderSettings, renderSettings = _h === void 0 ? defaultRenderSettings_1.defaultRenderSettings : _h, devApiKey = _a.devApiKey, metadata = __rest(_a, ["children", "projectId", "dictionary", "locales", "defaultLocale", "locale", "cacheUrl", "runtimeUrl", "renderSettings", "devApiKey"]);
    if (!projectId && (cacheUrl === internal_2.defaultCacheUrl || runtimeUrl === internal_2.defaultRuntimeApiUrl)) {
        throw new Error(createErrors_1.projectIdMissingError);
    }
    ;
    // get tx required info
    var _j = (0, react_1.useMemo)(function () {
        var regionalTranslation = (0, generaltranslation_1.requiresRegionalTranslation)(defaultLocale, locale, locales);
        return [(0, generaltranslation_1.requiresTranslation)(defaultLocale, locale, locales) || regionalTranslation, regionalTranslation];
    }, [defaultLocale, locale, locales]), translationRequired = _j[0], regionalTranslationRequired = _j[1];
    // tracking translations
    var _k = (0, react_2.useState)(cacheUrl ? null : {}), translations = _k[0], setTranslations = _k[1];
    // fetch from cache
    (0, react_2.useEffect)(function () {
        if (!translations) {
            if (!translationRequired) {
                setTranslations({}); // no translation required
            }
            else {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var response, result, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, fetch("".concat(cacheUrl, "/").concat(projectId, "/").concat(locale))];
                            case 1:
                                response = _a.sent();
                                return [4 /*yield*/, response.json()];
                            case 2:
                                result = _a.sent();
                                setTranslations(result);
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                setTranslations({}); // not classified as a tx error, bc we can still fetch from API
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
            }
        }
    }, [translationRequired, cacheUrl, projectId, locale]);
    // translate function for dictionaries
    var translate = (0, react_2.useCallback)(function (id, options) {
        var _a;
        if (options === void 0) { options = {}; }
        // get the dictionary entry
        var dictionaryEntry = (0, getDictionaryEntry_1.default)(dictionary, id);
        if (dictionaryEntry === undefined ||
            dictionaryEntry === null ||
            (typeof dictionaryEntry === "object" && !Array.isArray(dictionaryEntry))) {
            console.warn((0, createErrors_1.createLibraryNoEntryWarning)(id));
            return undefined;
        }
        var _b = (0, extractEntryMetadata_1.default)(dictionaryEntry), entry = _b.entry, metadata = _b.metadata;
        // Get variables and variable options
        var variables = options;
        var variablesOptions = metadata === null || metadata === void 0 ? void 0 : metadata.variablesOptions;
        var taggedEntry = (0, internal_1.addGTIdentifier)(entry, id);
        // ----- RENDER METHODS ----- //
        // render default locale
        var renderDefaultLocale = function () {
            if (typeof taggedEntry === 'string')
                return (0, generaltranslation_1.renderContentToString)(taggedEntry, defaultLocale, variables, variablesOptions);
            return (0, renderDefaultChildren_1.default)({
                children: taggedEntry,
                variables: variables,
                variablesOptions: variablesOptions,
                defaultLocale: defaultLocale,
                renderVariable: renderVariable_1.default
            });
        };
        // render skeleton
        var renderLoadingSkeleton = function () {
            if (typeof taggedEntry === 'string')
                return '';
            return (0, renderSkeleton_1.default)({
                children: taggedEntry,
                variables: variables,
                defaultLocale: defaultLocale,
                renderVariable: renderVariable_1.default
            });
        };
        // hang behavior
        var renderLoadingHang = function () {
            if (typeof taggedEntry === 'string')
                return '';
            return undefined;
        };
        // default behavior (skeleton except when language is same ie en-US -> en-GB)
        var renderDefault = function () {
            if (regionalTranslationRequired)
                return renderDefaultLocale();
            return renderLoadingSkeleton();
        };
        // render translated content
        var renderTranslation = function (target) {
            if (typeof taggedEntry === 'string')
                return (0, generaltranslation_1.renderContentToString)(target, [locale, defaultLocale], variables, variablesOptions);
            return (0, renderTranslatedChildren_1.default)({
                source: taggedEntry,
                target: target,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: [locale, defaultLocale],
                renderVariable: renderVariable_1.default
            });
        };
        // ----- RENDER LOGIC ----- // 
        // If no translations are required
        if (!translationRequired) {
            renderDefaultLocale();
        }
        // get hash
        var context = metadata === null || metadata === void 0 ? void 0 : metadata.context;
        var childrenAsObjects = (0, internal_1.writeChildrenAsObjects)(taggedEntry);
        var hash = (0, id_1.hashJsxChildren)(context
            ? { source: childrenAsObjects, context: context }
            : { source: childrenAsObjects });
        // error behavior -> fallback to default language
        if ((0, internal_1.isTranslationError)(translations === null || translations === void 0 ? void 0 : translations[id])) {
            return renderDefaultLocale();
        }
        // loading
        if (!translations || !((_a = translations[id]) === null || _a === void 0 ? void 0 : _a[hash])) {
            if (renderSettings.method === 'skeleton') {
                return renderLoadingSkeleton();
            }
            if (renderSettings.method === 'replace') {
                return renderDefaultLocale(); // replace
            }
            if (renderSettings.method === 'hang') {
                return renderLoadingHang();
            }
            if (renderSettings.method === 'subtle') {
                return renderDefaultLocale(); // TODO: implement subtle behavior for client-side rendering
            }
            return renderDefault(); // default rendering behavior (not to be confused with default locale)
        }
        // render translated content
        var target = translations[id][hash];
        return renderTranslation(target);
    }, [dictionary, translations, translationRequired, defaultLocale]);
    var _l = (0, useDynamicTranslation_1.default)(__assign({ targetLocale: locale, projectId: projectId, defaultLocale: defaultLocale, devApiKey: devApiKey, runtimeUrl: runtimeUrl, setTranslations: setTranslations }, metadata)), translateChildren = _l.translateChildren, translateContent = _l.translateContent, translationEnabled = _l.translationEnabled;
    return ((0, jsx_runtime_1.jsx)(GTContext_1.GTContext.Provider, { value: {
            translate: translate,
            translateContent: translateContent,
            translateChildren: translateChildren,
            locale: locale,
            defaultLocale: defaultLocale,
            translations: translations,
            translationRequired: translationRequired,
            regionalTranslationRequired: regionalTranslationRequired,
            projectId: projectId,
            translationEnabled: translationEnabled,
            renderSettings: renderSettings
        }, children: children }));
}
//# sourceMappingURL=GTProvider.js.map