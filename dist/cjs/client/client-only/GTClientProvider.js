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
const defaultGTProps_1 = __importDefault(require("../../types/defaultGTProps"));
const useBrowserLocale_1 = __importDefault(require("../hooks/useBrowserLocale"));
const generaltranslation_1 = require("generaltranslation");
const getRenderAttributes_1 = __importDefault(require("../../primitives/getRenderAttributes"));
const renderDefaultLanguage_1 = __importDefault(require("../helpers/renderDefaultLanguage"));
const handleRender_1 = __importDefault(require("../helpers/handleRender"));
const getDictionaryReference_1 = __importDefault(require("../../primitives/getDictionaryReference"));
function GTClientProvider(_a) {
    var _b;
    var { children, projectID, dictionary = defaultGTProps_1.default.dictionary, dictionaryName = defaultGTProps_1.default.dictionaryName, approvedLocales, defaultLocale = (_b = approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) !== null && _b !== void 0 ? _b : defaultGTProps_1.default.defaultLocale, locale = '', remoteSource = defaultGTProps_1.default.remoteSource, cacheURL = defaultGTProps_1.default.cacheURL, translations } = _a;
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
    const renderAttributes = (0, getRenderAttributes_1.default)({ locale });
    const translate = (0, react_1.useCallback)((id, options) => {
        const { n, values } = options || {};
        const variables = Object.assign(Object.assign({}, (typeof n === 'number' && { n })), (values && Object.assign({}, values)));
        if (translationRequired) {
            if (localDictionary && localDictionary[id]) {
                return (0, renderDefaultLanguage_1.default)(Object.assign({ source: localDictionary[id], variables, id,
                    renderAttributes }, options));
            }
            if (remoteTranslations && remoteTranslations) {
                return (0, handleRender_1.default)({
                    source: dictionary[id],
                    target: remoteTranslations[id],
                    locale, defaultLocale,
                    renderAttributes,
                    variables, id
                });
            }
        }
        else {
            return (0, renderDefaultLanguage_1.default)(Object.assign({ source: dictionary[id], variables, id }, options));
        }
    }, [dictionary, translations, translationRequired]);
    return ((0, jsx_runtime_1.jsx)(ClientProvider_1.GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: Object.values(loaded).every(item => item ? true : false) &&
            children }));
}
//# sourceMappingURL=GTClientProvider.js.map