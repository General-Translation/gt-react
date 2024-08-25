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
// On the server
import 'server-only';
import { isValidElement } from 'react';
import ClientProvider from '../../client/ClientProvider';
import flattenDictionary from '../../index/flattenDictionary';
import getEntryMetadata from '../../primitives/rendering/getEntryMetadata';
import addGTIdentifier from '../../index/addGTIdentifier';
import writeChildrenAsObjects from '../../index/writeChildrenAsObjects';
import calculateHash from '../../index/calculateHash';
import getEntryTranslationType from '../../primitives/rendering/getEntryTranslationType';
import Plural from '../plural/InnerPlural';
import cloneDictionary from '../../dictionary/cloneDictionary';
/*
e.g.
dictionary = {
    "greeting": "Hello, world",
    "greeting.component": <div>Hello, world</div>,
    "greeting.text.withparams": intl("Hello, world", { context: "Be informal." })
}
*/
export default function GTProvider(_a) {
    return __awaiter(this, void 0, void 0, function* () {
        var { I18NConfig, locale, defaultLocale, children, id = '', dictionary = id ? {} : I18NConfig.getDictionary() } = _a, props = __rest(_a, ["I18NConfig", "locale", "defaultLocale", "children", "id", "dictionary"]);
        let providerID = id;
        if (providerID) {
            const { entry } = getEntryMetadata(I18NConfig.getDictionaryEntry(providerID));
            if (entry && !isValidElement(entry) && typeof entry === 'object') {
                dictionary = Object.assign(Object.assign({}, entry), flattenDictionary(dictionary, providerID));
            }
        }
        const prefix = providerID ? `${providerID}.` : '';
        dictionary = flattenDictionary(dictionary);
        let translations = {};
        const renderSettings = I18NConfig.getRenderSettings();
        const clonedDictionary = cloneDictionary(dictionary);
        for (const id of Object.keys(clonedDictionary)) {
            let { entry, metadata } = getEntryMetadata(clonedDictionary[id]);
            metadata = (props || metadata) ? Object.assign(Object.assign({}, props), (metadata || {})) : undefined;
            const translationType = getEntryTranslationType(clonedDictionary[id]);
            if (translationType === "t") {
                entry = _jsx(_Fragment, { children: entry });
            }
            else if (translationType === "plural") {
                const _b = metadata || {}, { ranges, zero, one, two, few, many, other, singular, dual, plural } = _b, tOptions = __rest(_b, ["ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
                metadata = tOptions;
                const innerProps = {
                    ranges, zero, one, two, few, many, other, singular, dual, plural
                };
                entry = (_jsx(Plural, Object.assign({ locales: [locale, defaultLocale], n: 1 }, innerProps, { children: entry })));
            }
            const taggedEntry = addGTIdentifier(entry);
            // change the dictionary here
            // elsewhere we are changing the cloned dictionary
            // we are just adding the gt identifier, nothing more
            if (translationType === "t" || translationType === "plural") {
                dictionary[id] = taggedEntry;
            }
            ;
            clonedDictionary[id] = [taggedEntry, metadata];
        }
        const translationRequired = (I18NConfig.translationRequired(locale)) ? true : false;
        if (translationRequired) {
            const { local, remote } = yield I18NConfig.getTranslations(locale, props.dictionaryName);
            yield Promise.all(Object.keys(clonedDictionary).map((id) => __awaiter(this, void 0, void 0, function* () {
                // COMPLICATED INNER TRANSLATION FUNCTION
                // EQUIVALENT TO <T> OR intl() BEFORE RENDERING
                // i.e. passes the translation dictionary
                var _a;
                let { entry, metadata } = getEntryMetadata(clonedDictionary[id]);
                const translationType = getEntryTranslationType(clonedDictionary[id]);
                const entryAsObjects = writeChildrenAsObjects(entry);
                const key = (metadata === null || metadata === void 0 ? void 0 : metadata.context) ? yield calculateHash([entryAsObjects, metadata.context]) : yield calculateHash(entryAsObjects);
                const translation = yield I18NConfig.getTranslation(locale, key, id, (_a = props.dictionaryName) !== null && _a !== void 0 ? _a : undefined, { local, remote });
                if (translation) {
                    return translations[id] = translation;
                }
                // NEW TRANSLATION REQUIRED
                if (!I18NConfig.automaticTranslationEnabled())
                    return;
                // INTL
                if (translationType === "intl") {
                    const translationPromise = I18NConfig.intl({ content: entry, targetLanguage: locale, options: Object.assign(Object.assign({}, metadata), { hash: key, id: `${prefix}${id}` }) });
                    if (renderSettings.method !== "subtle") {
                        return translations[id] = yield translationPromise;
                    }
                    return translations[id] = entry;
                }
                else /*if (translationType === "t" || translationType === "plural")*/ { // i.e., it's JSX
                    const targetPromise = I18NConfig.translateChildren({ children: entryAsObjects, targetLanguage: locale, metadata: Object.assign(Object.assign({}, metadata), { hash: key, id: `${prefix}${id}` }) });
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
                            loadingFallbackTarget = _jsx(_Fragment, {});
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
        return (_jsx(ClientProvider, { locale: locale, defaultLocale: defaultLocale, dictionary: dictionary, translations: translations, translationRequired: translationRequired, renderSettings: renderSettings, children: children }));
    });
}
//# sourceMappingURL=GTProvider.js.map