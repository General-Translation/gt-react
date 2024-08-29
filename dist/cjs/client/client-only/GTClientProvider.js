"use strict";
// intended for purely client-side apps, put at the root of the project
'use client';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GTClientProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const ClientProvider_1 = require("../ClientProvider");
const defaultGTProps_1 = __importDefault(require("../../types/defaultGTProps"));
const useBrowserLocale_1 = __importDefault(require("../hooks/useBrowserLocale"));
const generaltranslation_1 = require("generaltranslation");
const renderDefaultLanguage_1 = __importDefault(require("../helpers/renderDefaultLanguage"));
const getDictionaryReference_1 = __importDefault(require("../../primitives/dictionary/getDictionaryReference"));
const renderClientChildren_1 = __importDefault(require("../helpers/renderClientChildren"));
const getEntryTranslationType_1 = __importDefault(require("../../primitives/rendering/getEntryTranslationType"));
const getEntryMetadata_1 = __importDefault(require("../../primitives/rendering/getEntryMetadata"));
const ClientPlural_1 = __importDefault(require("../plural/ClientPlural"));
const addGTIdentifier_1 = __importDefault(require("../../primitives/translation/addGTIdentifier"));
function GTClientProvider({ children, projectID, dictionary = defaultGTProps_1.default.dictionary, dictionaryName = defaultGTProps_1.default.dictionaryName, approvedLocales, defaultLocale = (approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) || defaultGTProps_1.default.defaultLocale, locale = '', remoteSource = defaultGTProps_1.default.remoteSource, cacheURL = defaultGTProps_1.default.cacheURL, translations }) {
    if (!projectID && remoteSource && cacheURL === defaultGTProps_1.default.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
    }
    const browserLocale = (0, useBrowserLocale_1.default)(defaultLocale);
    locale = locale || browserLocale;
    const [loaded, setLoaded] = (0, react_1.useState)({
        local: false,
        remote: false
    });
    const translationRequired = (0, generaltranslation_1.isSameLanguage)(locale, defaultLocale) ? false : true;
    const suppliedDictionary = (0, react_1.useMemo)(() => {
        let processedDictionary = {};
        for (const id of Object.keys(dictionary)) {
            let { entry, metadata } = (0, getEntryMetadata_1.default)(dictionary[id]);
            const translationType = (0, getEntryTranslationType_1.default)(dictionary[id]);
            if (translationType === "t") {
                entry = (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: entry }, id);
            }
            else if (translationType === "plural") {
                entry = ((0, jsx_runtime_1.jsx)(ClientPlural_1.default, Object.assign({ n: 1 }, metadata, { children: entry }), id));
            }
            const taggedEntry = (0, addGTIdentifier_1.default)(entry);
            processedDictionary[id] = taggedEntry;
        }
        return processedDictionary;
    }, [dictionary, translationRequired]);
    const [localDictionary, setLocalDictionary] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (locale) {
            if (translations && translations[locale] && translationRequired) {
                translations[locale]().then(setLocalDictionary).then(() => setLoaded(prev => (Object.assign(Object.assign({}, prev), { local: true }))));
            }
            else {
                setLoaded(prev => (Object.assign(Object.assign({}, prev), { local: true })));
            }
        }
    }, [translations, locale]);
    const [remoteTranslations, setRemoteTranslations] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (locale) {
            if (remoteSource && translationRequired) {
                const fetchRemoteTranslations = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield fetch(`${cacheURL}/${projectID}/${(0, getDictionaryReference_1.default)(locale, dictionaryName)}`);
                        const result = yield response.json();
                        if (Object.keys(result).length) {
                            setRemoteTranslations(result);
                        }
                        else {
                            throw new Error(`No dictionary found in remote cache.`);
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                    finally {
                        setLoaded(prev => (Object.assign(Object.assign({}, prev), { remote: true })));
                    }
                });
                fetchRemoteTranslations();
            }
            else {
                setLoaded(prev => (Object.assign(Object.assign({}, prev), { remote: true })));
            }
        }
    }, [cacheURL, remoteSource, locale]);
    const translate = (0, react_1.useCallback)((id, options) => {
        if (translationRequired) {
            if (localDictionary && localDictionary[id]) {
                return (0, renderDefaultLanguage_1.default)(Object.assign({ source: localDictionary[id], variables: (options === null || options === void 0 ? void 0 : options.values) || {}, id }, options));
            }
            if (remoteTranslations && remoteTranslations[id] && remoteTranslations[id].t) {
                return (0, renderClientChildren_1.default)({
                    source: suppliedDictionary[id],
                    target: remoteTranslations[id].t,
                    locale, defaultLocale,
                    id, variables: (options === null || options === void 0 ? void 0 : options.values) || {},
                });
            }
        }
        else {
            return (0, renderDefaultLanguage_1.default)(Object.assign({ source: suppliedDictionary[id], variables: (options === null || options === void 0 ? void 0 : options.values) || {}, id }, options));
        }
    }, [suppliedDictionary, translations, translationRequired, remoteTranslations]);
    return ((0, jsx_runtime_1.jsx)(ClientProvider_1.GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: Object.values(loaded).every(item => item ? true : false) &&
            children }));
}
//# sourceMappingURL=GTClientProvider.js.map