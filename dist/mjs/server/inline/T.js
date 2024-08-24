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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import addGTIdentifier from '../../index/addGTIdentifier';
import writeChildrenAsObjects from '../../index/writeChildrenAsObjects';
import renderChildren from './renderChildren';
import Resolver from './Resolver';
import calculateHash from '../../index/calculateHash';
import getRenderAttributes from '../../primitives/getRenderAttributes';
const ServerT = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    var { I18NConfig, children, locale } = _a, props = __rest(_a, ["I18NConfig", "children", "locale"]);
    // Handle case where translation is not required, for example if the user's browser is in the default locale
    const translationRequired = (children && I18NConfig.translationRequired(locale)) ? true : false;
    if (!translationRequired) {
        return (_jsx(_Fragment, { children: children }));
    }
    // Fetch translations promise
    const translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);
    const defaultLocale = I18NConfig.getDefaultLocale();
    const renderAttributes = getRenderAttributes(Object.assign({ locale }, props));
    const taggedChildren = addGTIdentifier(children);
    const childrenAsObjects = writeChildrenAsObjects(taggedChildren);
    let key = props.context ? yield calculateHash([childrenAsObjects, props.context]) : yield calculateHash(childrenAsObjects);
    const id = props.id ? props.id : key;
    const translations = yield translationsPromise;
    const translation = yield I18NConfig.getTranslation(locale, key, id, (_b = props.dictionaryName) !== null && _b !== void 0 ? _b : undefined, translations);
    // Check if a translation for this site already exists and return it if it does
    const translationExists = translation ? true : false;
    if (translationExists) {
        const I18NChildren = renderChildren({ source: taggedChildren, target: translation, renderAttributes, locale, defaultLocale });
        return (_jsx(_Fragment, { children: I18NChildren }));
    }
    // Check if a new translation for this site can be created
    if (!I18NConfig.automaticTranslationEnabled()) {
        return (_jsx(_Fragment, { children: children }));
    }
    // Create a new translation for this site and render it
    const I18NChildrenPromise = I18NConfig.translateChildren({ children: childrenAsObjects, targetLanguage: locale, metadata: Object.assign(Object.assign({}, props), { hash: key }) });
    const renderSettings = I18NConfig.getRenderSettings();
    const renderMethod = (props === null || props === void 0 ? void 0 : props.renderMethod) || renderSettings.method;
    let promise = I18NChildrenPromise.then(target => renderChildren({ source: taggedChildren, target, renderAttributes, locale, defaultLocale }));
    // Render methods
    let loadingFallback = props.fallback;
    let errorFallback = children;
    if (renderMethod === "skeleton") {
        if (!loadingFallback)
            loadingFallback = _jsx(_Fragment, {});
    }
    else if (renderMethod === "replace") {
        if (!loadingFallback)
            loadingFallback = children;
    }
    if (renderSettings.renderPrevious && translations.remote && translations.remote[id] && translations.remote[id].k) {
        // in case there's a previous translation on file
        loadingFallback = renderChildren({ source: taggedChildren, target: translations.remote[id].t, renderAttributes, locale, defaultLocale });
        errorFallback = loadingFallback;
    }
    if (renderMethod === "hang") {
        // Wait until the site is translated to return
        const resolveI18NPromise = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield promise;
            }
            catch (_a) {
                return yield errorFallback;
            }
        });
        return (_jsx(_Fragment, { children: yield resolveI18NPromise() }));
    }
    if (!["skeleton", "replace"].includes(renderMethod)) {
        // If none of those, i.e. "subtle" 
        // return the children, with no special rendering
        // a translation may be available from a cached translation dictionary next time the component is loaded
        return (_jsx(_Fragment, { children: errorFallback }));
    }
    return (_jsx(Suspense, { fallback: loadingFallback, children: _jsx(Resolver, { fallback: errorFallback, children: promise }) }));
});
ServerT.gtTransformation = "translate";
export default ServerT;
//# sourceMappingURL=T.js.map