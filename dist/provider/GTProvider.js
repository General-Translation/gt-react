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
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { renderContentToString, requiresRegionalTranslation, requiresTranslation } from "generaltranslation";
import { useCallback, useEffect, useState } from "react";
import useBrowserLocale from "../hooks/useBrowserLocale";
import { GTContext } from "./GTContext";
import getDictionaryEntry from "./helpers/getDictionaryEntry";
import { addGTIdentifier, isTranslationError, writeChildrenAsObjects } from "../internal";
import extractEntryMetadata from "./helpers/extractEntryMetadata";
import renderDefaultChildren from "./rendering/renderDefaultChildren";
import renderTranslatedChildren from "./rendering/renderTranslatedChildren";
import { defaultCacheUrl, defaultRuntimeApiUrl, libraryDefaultLocale, } from "generaltranslation/internal";
import renderVariable from "./rendering/renderVariable";
import { createLibraryNoEntryWarning, projectIdMissingError, } from "../errors/createErrors";
import { listSupportedLocales } from "@generaltranslation/supported-locales";
import useDynamicTranslation from "./dynamic/useDynamicTranslation";
import { defaultRenderSettings } from "./rendering/defaultRenderSettings";
import { hashJsxChildren } from "generaltranslation/id";
import renderSkeleton from "./rendering/renderSkeleton";
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
export default function GTProvider(_a) {
    var _this = this;
    var children = _a.children, projectId = _a.projectId, _b = _a.dictionary, dictionary = _b === void 0 ? {} : _b, _c = _a.locales, locales = _c === void 0 ? listSupportedLocales() : _c, _d = _a.defaultLocale, defaultLocale = _d === void 0 ? libraryDefaultLocale : _d, _e = _a.locale, locale = _e === void 0 ? useBrowserLocale(defaultLocale, locales) || defaultLocale : _e, _f = _a.cacheUrl, cacheUrl = _f === void 0 ? defaultCacheUrl : _f, _g = _a.runtimeUrl, runtimeUrl = _g === void 0 ? defaultRuntimeApiUrl : _g, _h = _a.renderSettings, renderSettings = _h === void 0 ? defaultRenderSettings : _h, devApiKey = _a.devApiKey, metadata = __rest(_a, ["children", "projectId", "dictionary", "locales", "defaultLocale", "locale", "cacheUrl", "runtimeUrl", "renderSettings", "devApiKey"]);
    if (!projectId && (cacheUrl === defaultCacheUrl || runtimeUrl === defaultRuntimeApiUrl)) {
        throw new Error(projectIdMissingError);
    }
    ;
    // get tx required info
    var regionalTranslationRequired = useMemo(function () {
        return requiresRegionalTranslation(defaultLocale, locale, locales);
    }, [defaultLocale, locale, locales]);
    var translationRequired = useMemo(function () {
        return requiresTranslation(defaultLocale, locale, locales) || regionalTranslationRequired;
    }, [defaultLocale, locale, locales, regionalTranslationRequired]);
    // tracking translations
    var _j = useState(cacheUrl ? null : {}), translations = _j[0], setTranslations = _j[1];
    // fetch from cache
    useEffect(function () {
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
    var translate = useCallback(function (id, options) {
        var _a;
        if (options === void 0) { options = {}; }
        // get the dictionary entry
        var dictionaryEntry = getDictionaryEntry(dictionary, id);
        if (dictionaryEntry === undefined ||
            dictionaryEntry === null ||
            (typeof dictionaryEntry === "object" && !Array.isArray(dictionaryEntry))) {
            console.warn(createLibraryNoEntryWarning(id));
            return undefined;
        }
        var _b = extractEntryMetadata(dictionaryEntry), entry = _b.entry, metadata = _b.metadata;
        // Get variables and variable options
        var variables = options;
        var variablesOptions = metadata === null || metadata === void 0 ? void 0 : metadata.variablesOptions;
        var taggedEntry = addGTIdentifier(entry, id);
        // ----- RENDER METHODS ----- //
        // render default locale
        var renderDefaultLocale = function () {
            if (typeof taggedEntry === 'string')
                return renderContentToString(taggedEntry, defaultLocale, variables, variablesOptions);
            return renderDefaultChildren({
                children: taggedEntry,
                variables: variables,
                variablesOptions: variablesOptions,
                defaultLocale: defaultLocale,
                renderVariable: renderVariable
            });
        };
        // render skeleton
        var renderLoadingSkeleton = function () {
            if (typeof taggedEntry === 'string')
                return '';
            return renderSkeleton({
                children: taggedEntry,
                variables: variables,
                defaultLocale: defaultLocale,
                renderVariable: renderVariable
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
                return renderContentToString(target, [locale, defaultLocale], variables, variablesOptions);
            return renderTranslatedChildren({
                source: taggedEntry,
                target: target,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: [locale, defaultLocale],
                renderVariable: renderVariable
            });
        };
        // ----- RENDER LOGIC ----- // 
        // If no translations are required
        if (!translationRequired) {
            renderDefaultLocale();
        }
        // get hash
        var context = metadata === null || metadata === void 0 ? void 0 : metadata.context;
        var childrenAsObjects = writeChildrenAsObjects(taggedEntry);
        var hash = hashJsxChildren(context
            ? { source: childrenAsObjects, context: context }
            : { source: childrenAsObjects });
        // error behavior -> fallback to default language
        if (isTranslationError(translations === null || translations === void 0 ? void 0 : translations[id])) {
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
    var _k = useDynamicTranslation(__assign({ targetLocale: locale, projectId: projectId, defaultLocale: defaultLocale, devApiKey: devApiKey, runtimeUrl: runtimeUrl, setTranslations: setTranslations }, metadata)), translateChildren = _k.translateChildren, translateContent = _k.translateContent, translationEnabled = _k.translationEnabled;
    return (_jsx(GTContext.Provider, { value: {
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