"use strict";
// intended for purely client-side apps, put at the root of the project
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GTClientProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ClientProvider_1 = require("../ClientProvider");
const generaltranslation_1 = require("generaltranslation");
const defaultGTProps_1 = __importDefault(require("../../types/defaultGTProps"));
const useBrowserLocale_1 = __importDefault(require("../hooks/useBrowserLocale"));
const renderDictionary_1 = __importDefault(require("./helpers/renderDictionary"));
const flattenDictionary_1 = __importDefault(require("../../primitives/flattenDictionary"));
const getDictionaryReference_1 = __importDefault(require("../../primitives/getDictionaryReference"));
const getEntryMetadata_1 = __importDefault(require("../../primitives/getEntryMetadata"));
function GTClientProvider(_a) {
    var _b;
    var { children, projectID, dictionary = defaultGTProps_1.default.dictionary, dictionaryName = defaultGTProps_1.default.dictionaryName, approvedLocales, defaultLocale = (_b = approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) !== null && _b !== void 0 ? _b : defaultGTProps_1.default.defaultLocale, locale = '', remoteSource = defaultGTProps_1.default.remoteSource, cacheURL = defaultGTProps_1.default.cacheURL, translations } = _a;
    const browserLocale = (0, useBrowserLocale_1.default)(defaultLocale);
    locale = locale || browserLocale;
    const [translatedDictionary, setTranslatedDictionary] = (0, react_1.useState)((0, flattenDictionary_1.default)(dictionary));
    if (!projectID && remoteSource && cacheURL === defaultGTProps_1.default.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
    }
    const [translationComplete, setTranslationComplete] = (0, react_1.useState)((0, generaltranslation_1.isSameLanguage)(locale, defaultLocale));
    (0, react_1.useEffect)(() => {
        setTranslationComplete((0, generaltranslation_1.isSameLanguage)(locale, defaultLocale));
    }, [locale, defaultLocale]);
    (0, react_1.useEffect)(() => {
        if (!translationComplete && locale && !(0, generaltranslation_1.isSameLanguage)(locale, defaultLocale)) {
            function completeDictionary() {
                return __awaiter(this, void 0, void 0, function* () {
                    let completedDictionary = dictionary;
                    if (translations && translations[locale]) {
                        try {
                            const loadDictionary = translations[locale];
                            const loadedDictionary = yield loadDictionary();
                            if (Object.keys(loadedDictionary).length) {
                                completedDictionary = Object.assign(Object.assign({}, completedDictionary), loadedDictionary);
                            }
                            else {
                                throw new Error(``);
                            }
                        }
                        catch (error) {
                            console.error(`Error loading dictionary for locale ${locale}:`, error);
                        }
                    }
                    if (remoteSource) {
                        try {
                            const response = yield fetch(`${cacheURL}/${projectID}/${(0, getDictionaryReference_1.default)(locale, dictionaryName)}`);
                            const result = yield response.json();
                            if (Object.keys(result).length) {
                                const renderedDictionary = (0, renderDictionary_1.default)({
                                    result, dictionary,
                                    locales: [locale, defaultLocale]
                                });
                                completedDictionary = Object.assign(Object.assign({}, completedDictionary), renderedDictionary);
                            }
                            else {
                                throw new Error(`No dictionary found in remote cache.`);
                            }
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                    setTranslatedDictionary((0, flattenDictionary_1.default)(completedDictionary));
                    setTranslationComplete(true);
                });
            }
            completeDictionary();
        }
    }, [cacheURL, remoteSource, locale, translations]);
    const translate = (0, react_1.useCallback)((id) => {
        return (0, getEntryMetadata_1.default)(translatedDictionary[id]).entry;
    }, [translatedDictionary]);
    return ((0, jsx_runtime_1.jsx)(ClientProvider_1.GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: translationComplete
            ? children : undefined }));
}
//# sourceMappingURL=GTClientProvider.js.map