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
exports.default = ServerI18N;
const jsx_runtime_1 = require("react/jsx-runtime");
const addGTIdentifier_js_1 = __importDefault(require("./helpers/addGTIdentifier.js"));
const writeChildrenAsObjects_js_1 = __importDefault(require("./helpers/writeChildrenAsObjects.js"));
const generateHash_js_1 = __importDefault(require("./helpers/generateHash.js"));
const renderChildren_js_1 = __importDefault(require("./renderChildren.js"));
const I18NResolver_js_1 = __importDefault(require("./resolvers/I18NResolver.js"));
const generaltranslation_1 = require("generaltranslation");
function ServerI18N(_a) {
    return __awaiter(this, void 0, void 0, function* () {
        var { I18NConfig, children, locale } = _a, props = __rest(_a, ["I18NConfig", "children", "locale"]);
        // Handle case where translation is not required, for example if the user's browser is in the default locale
        const translationRequired = (children && I18NConfig.translationRequired(locale)) ? true : false;
        if (!translationRequired) {
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
        }
        // Fetch translations
        const translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);
        const defaultLocale = I18NConfig.getDefaultLocale();
        let renderAttributes = {};
        const dir = (0, generaltranslation_1.getLanguageDirection)(locale);
        if (dir === 'rtl')
            renderAttributes = Object.assign(Object.assign({}, renderAttributes), { dir });
        const taggedChildren = (0, addGTIdentifier_js_1.default)(children);
        const childrenAsObjects = (0, writeChildrenAsObjects_js_1.default)(taggedChildren);
        const key = yield (0, generateHash_js_1.default)(childrenAsObjects);
        const id = props.id ? props.id : key;
        const translations = yield translationsPromise;
        const translation = (translations && translations[id] && translations[id].k === key) ? translations[id].t : null;
        // Check if a translation for this site already exists and return it if it does
        const translationExists = translation ? true : false;
        if (translationExists) {
            const I18NChildren = (0, renderChildren_js_1.default)({ source: taggedChildren, target: translation, renderAttributes, locale, defaultLocale });
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: I18NChildren }));
        }
        // Create a new translation for this site and render it
        const I18NChildrenPromise = I18NConfig.translateChildren({ children: childrenAsObjects, targetLanguage: locale, metadata: Object.assign({}, props) });
        const renderMethod = (props === null || props === void 0 ? void 0 : props.renderMethod) || I18NConfig.getRenderMethod();
        if (renderMethod === "replace") {
            // Return the site in the default language
            // Replace with translated site when ready
            const InnerResolver = () => __awaiter(this, void 0, void 0, function* () {
                const I18NChildren = yield I18NChildrenPromise;
                return (0, renderChildren_js_1.default)({ source: taggedChildren, target: I18NChildren, renderAttributes, locale, defaultLocale });
            });
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(I18NResolver_js_1.default, { fallback: children, children: (0, jsx_runtime_1.jsx)(InnerResolver, {}) }) }));
        }
        if (renderMethod === "hang") {
            // Wait until the site is translated to return
            const I18NChildren = (0, renderChildren_js_1.default)({ source: taggedChildren, target: yield I18NChildrenPromise, renderAttributes, locale, defaultLocale });
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: I18NChildren }));
        }
        return (
        // return the children, with no special rendering
        // a translation may be available from a cached translation dictionary next time the component is loaded
        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
    });
}
//# sourceMappingURL=ServerI18N.js.map