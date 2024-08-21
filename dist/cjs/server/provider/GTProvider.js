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
const ClientProvider_1 = __importDefault(require("../../client/ClientProvider"));
const flattenDictionary_1 = __importDefault(require("../../primitives/flattenDictionary"));
const hasTransformation_1 = __importDefault(require("../../primitives/hasTransformation"));
const isPromise_1 = __importDefault(require("../../primitives/isPromise"));
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
        dictionary = (0, flattenDictionary_1.default)(dictionary);
        const translationRequired = (children && I18NConfig.translationRequired(locale)) ? true : false;
        if (!translationRequired) {
            return ((0, jsx_runtime_1.jsx)(ClientProvider_1.default, { locale: locale, defaultLocale: defaultLocale, dictionary: dictionary, children: children }));
        }
        let translatedDictionary = {};
        yield Promise.all(Object.keys(dictionary).map((id) => __awaiter(this, void 0, void 0, function* () {
            if ((0, hasTransformation_1.default)(dictionary[id])) {
                return dictionary[id];
            }
            else if ((0, isPromise_1.default)(dictionary[id])) {
                translatedDictionary[id] = yield dictionary[id];
            }
            else if (dictionary[id] && typeof dictionary[id] === 'string') {
                translatedDictionary[id] = yield intl(dictionary[id], Object.assign(Object.assign({ targetLanguage: locale }, props), { id: `${providerID ? `${providerID}.` : ''}${id}` }));
            }
            else {
                translatedDictionary[id] = (0, jsx_runtime_1.jsx)(T, Object.assign({ id: `${providerID ? `${providerID}.` : ''}${id}` }, props, { children: dictionary[id] }));
            }
        })));
        return ((0, jsx_runtime_1.jsx)(ClientProvider_1.default, { locale: locale, defaultLocale: defaultLocale, dictionary: translatedDictionary, children: children }));
    });
}
//# sourceMappingURL=GTProvider.js.map