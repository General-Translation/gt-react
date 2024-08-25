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
exports.default = GTProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
// On the server
require("server-only");
const react_1 = require("react");
const ClientProvider_1 = __importDefault(require("../../client/ClientProvider"));
const flattenDictionary_1 = __importDefault(require("../../index/flattenDictionary"));
const getEntryMetadata_1 = __importDefault(require("../../primitives/rendering/getEntryMetadata"));
const addGTIdentifier_1 = __importDefault(require("../../index/addGTIdentifier"));
const writeChildrenAsObjects_1 = __importDefault(require("../../index/writeChildrenAsObjects"));
const calculateHash_1 = __importDefault(require("../../index/calculateHash"));
const getEntryTranslationType_1 = __importDefault(require("../../primitives/rendering/getEntryTranslationType"));
const InnerPlural_1 = __importDefault(require("../plural/InnerPlural"));
const cloneDictionary_1 = __importDefault(require("../../dictionary/cloneDictionary"));
/*
e.g.
dictionary = {
    "greeting": "Hello, world",
    "greeting.component": <div>Hello, world</div>,
    "greeting.text.withparams": intl("Hello, world", { context: "Be informal." })
}
*/
function GTProvider(_a) {
    return __awaiter(this, void 0, void 0, function* () {
        var { I18NConfig, locale, defaultLocale, children, id = '', dictionary = id ? {} : I18NConfig.getDictionary() } = _a, props = __rest(_a, ["I18NConfig", "locale", "defaultLocale", "children", "id", "dictionary"]);
        let providerID = id;
        if (providerID) {
            const { entry } = (0, getEntryMetadata_1.default)(I18NConfig.getDictionaryEntry(providerID));
            if (entry && !(0, react_1.isValidElement)(entry) && typeof entry === 'object') {
                dictionary = Object.assign(Object.assign({}, entry), (0, flattenDictionary_1.default)(dictionary, providerID));
            }
        }
        dictionary = (0, flattenDictionary_1.default)(dictionary, providerID);
        let translations = {};
        const renderSettings = I18NConfig.getRenderSettings();
        const clonedDictionary = (0, cloneDictionary_1.default)(dictionary);
        for (const id of Object.keys(clonedDictionary)) {
            let { entry, metadata } = (0, getEntryMetadata_1.default)(clonedDictionary[id]);
            metadata = (props || metadata) ? Object.assign(Object.assign({}, props), (metadata || {})) : undefined;
            const translationType = (0, getEntryTranslationType_1.default)(clonedDictionary[id]);
            if (translationType === "t") {
                entry = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: entry });
            }
            else if (translationType === "plural") {
                const _b = metadata || {}, { ranges, zero, one, two, few, many, other, singular, dual, plural } = _b, tOptions = __rest(_b, ["ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
                metadata = tOptions;
                const innerProps = {
                    ranges, zero, one, two, few, many, other, singular, dual, plural
                };
                entry = ((0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: [locale, defaultLocale], n: 1 }, innerProps, { children: entry })));
            }
            const taggedEntry = (0, addGTIdentifier_1.default)(entry);
            // change the dictionary here
            // elsewhere we are changing the cloned dictionary
            // we are just adding the gt identifier, nothing more
            if (translationType === "t" || translationType === "plural") {
                dictionary[id] = taggedEntry;
            }
            ;
            clonedDictionary[id] = [taggedEntry, metadata];
        }
        const translationRequired = I18NConfig.translationRequired(locale);
        if (translationRequired) {
            const { local, remote } = yield I18NConfig.getTranslations(locale, props.dictionaryName);
            yield Promise.all(Object.keys(clonedDictionary).map((id) => __awaiter(this, void 0, void 0, function* () {
                // COMPLICATED INNER TRANSLATION FUNCTION
                // EQUIVALENT TO <T> OR intl() BEFORE RENDERING
                // i.e. passes the translation dictionary
                var _a;
                let { entry, metadata } = (0, getEntryMetadata_1.default)(clonedDictionary[id]);
                const translationType = (0, getEntryTranslationType_1.default)(clonedDictionary[id]);
                const entryAsObjects = (0, writeChildrenAsObjects_1.default)(entry);
                const key = (metadata === null || metadata === void 0 ? void 0 : metadata.context) ? yield (0, calculateHash_1.default)([entryAsObjects, metadata.context]) : yield (0, calculateHash_1.default)(entryAsObjects);
                const translation = yield I18NConfig.getTranslation(locale, key, id, (_a = props.dictionaryName) !== null && _a !== void 0 ? _a : undefined, { remote, local });
                if (translation) {
                    return translations[id] = translation;
                }
                // NEW TRANSLATION REQUIRED
                if (!I18NConfig.automaticTranslationEnabled())
                    return;
                // INTL
                if (translationType === "intl") {
                    const translationPromise = I18NConfig.intl({ content: entry, targetLanguage: locale, options: Object.assign(Object.assign({}, metadata), { hash: key, id }) });
                    if (renderSettings.method !== "subtle") {
                        return translations[id] = yield translationPromise;
                    }
                    return translations[id] = entry;
                }
                else /*if (translationType === "t" || translationType === "plural")*/ { // i.e., it's JSX
                    const targetPromise = I18NConfig.translateChildren({ children: entryAsObjects, targetLanguage: locale, metadata: Object.assign(Object.assign({}, metadata), { hash: key, id }) });
                    const renderMethod = renderSettings.method;
                    if (renderSettings.method === "hang") {
                        return translations[id] = yield targetPromise;
                    }
                    // called fallback"Target" because it should actually be the cached target object, not a completed translation
                    // setting target to a valid React element, as done here with props.fallback and children, works because of how renderChildren will render target when it is a valid element and there's no match
                    let loadingFallbackTarget = props.fallback;
                    let errorFallbackTarget = children; //
                    if (renderMethod === "skeleton") {
                        if (!loadingFallbackTarget)
                            loadingFallbackTarget = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
                    }
                    else if (renderMethod === "replace") {
                        if (!loadingFallbackTarget)
                            loadingFallbackTarget = children;
                    }
                    if (renderSettings.renderPrevious && remote && remote[id] && remote[id].k) {
                        loadingFallbackTarget = remote[id].t;
                        errorFallbackTarget = loadingFallbackTarget;
                    }
                    if (!["skeleton", "replace"].includes(renderMethod)) {
                        return translations[id] = errorFallbackTarget;
                    }
                    return translations[id] = [targetPromise, {
                            loadingFallbackTarget, errorFallbackTarget
                        }];
                }
            })));
        }
        return ((0, jsx_runtime_1.jsx)(ClientProvider_1.default, { locale: locale, defaultLocale: defaultLocale, dictionary: dictionary, translations: translations, translationRequired: translationRequired, renderSettings: renderSettings, children: children }));
    });
}
//# sourceMappingURL=GTProvider.js.map