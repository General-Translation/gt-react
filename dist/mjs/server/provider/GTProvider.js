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
import { jsx as _jsx } from "react/jsx-runtime";
// On the server
import 'server-only';
import ClientProvider from '../../client/ClientProvider';
import flattenDictionary from '../../primitives/flattenDictionary';
import hasTransformation from '../../primitives/hasTransformation';
import isPromise from '../../primitives/isPromise';
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
        var { children, T, intl, I18NConfig, locale, defaultLocale, id = '', dictionary = id ? {} : I18NConfig.getDictionary() } = _a, props = __rest(_a, ["children", "T", "intl", "I18NConfig", "locale", "defaultLocale", "id", "dictionary"]);
        let providerID = id;
        if (providerID) {
            let entry = I18NConfig.getDictionaryEntry(providerID);
            if (Array.isArray(entry)) {
                if (typeof entry[1] === 'object') {
                    props = Object.assign(Object.assign({}, entry[1]), props);
                }
                entry = entry[0];
            }
            dictionary = Object.assign(Object.assign({}, entry), dictionary);
        }
        dictionary = flattenDictionary(dictionary);
        const translationRequired = (children && I18NConfig.translationRequired(locale)) ? true : false;
        if (!translationRequired) {
            return (_jsx(ClientProvider, { locale: locale, defaultLocale: defaultLocale, dictionary: dictionary, children: children }));
        }
        let translatedDictionary = {};
        yield Promise.all(Object.keys(dictionary).map((id) => __awaiter(this, void 0, void 0, function* () {
            if (hasTransformation(dictionary[id])) {
                return dictionary[id];
            }
            else if (isPromise(dictionary[id])) {
                translatedDictionary[id] = yield dictionary[id];
            }
            else if (dictionary[id] && typeof dictionary[id] === 'string') {
                translatedDictionary[id] = yield intl(dictionary[id], Object.assign(Object.assign({ targetLanguage: locale }, props), { id: `${providerID ? `${providerID}.` : ''}${id}` }));
            }
            else {
                translatedDictionary[id] = _jsx(T, Object.assign({ id: `${providerID ? `${providerID}.` : ''}${id}` }, props, { children: dictionary[id] }));
            }
        })));
        return (_jsx(ClientProvider, { locale: locale, defaultLocale: defaultLocale, dictionary: translatedDictionary, children: children }));
    });
}
//# sourceMappingURL=GTProvider.js.map