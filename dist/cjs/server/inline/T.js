"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const addGTIdentifier_1 = __importDefault(require("../../index/addGTIdentifier"));
const writeChildrenAsObjects_1 = __importDefault(require("../../index/writeChildrenAsObjects"));
const renderChildren_1 = __importDefault(require("./renderChildren"));
const Resolver_1 = __importDefault(require("./Resolver"));
const calculateHash_1 = __importDefault(require("../../index/calculateHash"));
const getRenderAttributes_1 = __importDefault(require("../../primitives/getRenderAttributes"));
const ServerT = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    var { I18NConfig, children, locale } = _a, props = __rest(_a, ["I18NConfig", "children", "locale"]);
    // Handle case where translation is not required, for example if the user's browser is in the default locale
    const translationRequired = (children && I18NConfig.translationRequired(locale)) ? true : false;
    if (!translationRequired) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
    }
    // Fetch translations promise
    const translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);
    const defaultLocale = I18NConfig.getDefaultLocale();
    const renderAttributes = (0, getRenderAttributes_1.default)(Object.assign({ locale }, props));
    const taggedChildren = (0, addGTIdentifier_1.default)(children);
    const childrenAsObjects = (0, writeChildrenAsObjects_1.default)(taggedChildren);
    let key = props.context ? yield (0, calculateHash_1.default)([childrenAsObjects, props.context]) : yield (0, calculateHash_1.default)(childrenAsObjects);
    const id = props.id ? props.id : key;
    const translations = yield translationsPromise;
    const translation = yield I18NConfig.getTranslation(locale, key, id, (_b = props.dictionaryName) !== null && _b !== void 0 ? _b : undefined, translations);
    // Check if a translation for this site already exists and return it if it does
    const translationExists = translation ? true : false;
    if (translationExists) {
        const I18NChildren = (0, renderChildren_1.default)({ source: taggedChildren, target: translation, renderAttributes, locale, defaultLocale });
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: I18NChildren }));
    }
    // Check if a new translation for this site can be created
    if (!I18NConfig.automaticTranslationEnabled()) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
    }
    // Create a new translation for this site and render it
    const I18NChildrenPromise = I18NConfig.translateChildren({ children: childrenAsObjects, targetLanguage: locale, metadata: Object.assign(Object.assign({}, props), { hash: key }) });
    const renderSettings = I18NConfig.getRenderSettings();
    const renderMethod = (props === null || props === void 0 ? void 0 : props.renderMethod) || renderSettings.method;
    let promise = I18NChildrenPromise.then(target => (0, renderChildren_1.default)({ source: taggedChildren, target, renderAttributes, locale, defaultLocale }));
    // Render methods
    if (renderMethod === "hang") {
        // Wait until the site is translated to return
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: yield promise }));
    }
    let loadingFallback = props.fallback;
    let errorFallback = children;
    if (renderMethod === "skeleton") {
        if (!loadingFallback)
            loadingFallback = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
    else if (renderMethod === "replace") {
        if (!loadingFallback)
            loadingFallback = children;
    }
    if (renderSettings.renderPrevious && translations.remote && translations.remote[id] && translations.remote[id].k) {
        // in case there's a previous translation on file
        loadingFallback = (0, renderChildren_1.default)({ source: taggedChildren, target: translations.remote[id].t, renderAttributes, locale, defaultLocale });
        errorFallback = loadingFallback;
    }
    if (!["skeleton", "replace"].includes(renderMethod)) {
        // If none of those, i.e. "subtle" 
        // return the children, with no special rendering
        // a translation may be available from a cached translation dictionary next time the component is loaded
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: errorFallback }));
    }
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: loadingFallback, children: (0, jsx_runtime_1.jsx)(Resolver_1.default, { fallback: errorFallback, children: promise }) }));
});
ServerT.gtTransformation = "translate";
exports.default = ServerT;
//# sourceMappingURL=T.js.map