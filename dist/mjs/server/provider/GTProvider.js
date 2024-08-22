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
import { isValidElement } from 'react';
import ClientProvider from '../../client/ClientProvider';
import flattenDictionary from '../../primitives/flattenDictionary';
import getEntryMetadata from '../../primitives/getEntryMetadata';
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
        var { children, executeT, I18NConfig, locale, defaultLocale, id = '', dictionary = id ? {} : I18NConfig.getDictionary() } = _a, props = __rest(_a, ["children", "executeT", "I18NConfig", "locale", "defaultLocale", "id", "dictionary"]);
        let providerID = id;
        if (providerID) {
            const { entry } = getEntryMetadata(I18NConfig.getDictionaryEntry(providerID));
            if (entry && !isValidElement(entry) && typeof entry === 'object') {
                dictionary = Object.assign(Object.assign({}, entry), dictionary);
            }
        }
        dictionary = flattenDictionary(dictionary);
        const providerT = (id, options) => executeT(dictionary, id, options);
        let translatedDictionary = {};
        yield Promise.all(Object.keys(dictionary).map((id) => __awaiter(this, void 0, void 0, function* () {
            translatedDictionary[id] = yield providerT(id, props);
        })));
        return (_jsx(ClientProvider, { locale: locale, defaultLocale: defaultLocale, dictionary: translatedDictionary, children: children }));
    });
}
//# sourceMappingURL=GTProvider.js.map