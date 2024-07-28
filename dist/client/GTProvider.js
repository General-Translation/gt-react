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
const react_1 = __importDefault(require("react"));
const ClientProvider_1 = __importDefault(require("./ClientProvider"));
/**
 * Checks if the provided value is a promise.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is a promise, otherwise false.
 */
function isPromise(value) {
    return Boolean(value && typeof value.then === 'function' && typeof value.catch === 'function');
}
/**
 * Flattens a nested object by concatenating nested keys.
 * @param {Record<string, any>} obj - The object to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Record<string, React.ReactNode>} The flattened object.
 */
function flattenObject(obj, prefix = '') {
    const flattened = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]) && !(react_1.default.isValidElement(obj[key]))) {
                Object.assign(flattened, flattenObject(obj[key], newKey));
            }
            else {
                flattened[newKey] = obj[key];
            }
        }
    }
    return flattened;
}
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
        var { children, I18N, intl, I18NConfig, locale, defaultLocale, id = '', dictionary = id ? {} : flattenObject(I18NConfig.getDictionary()) } = _a, props = __rest(_a, ["children", "I18N", "intl", "I18NConfig", "locale", "defaultLocale", "id", "dictionary"]);
        let providerID = id;
        if (providerID) {
            dictionary = Object.assign(Object.assign({}, flattenObject(I18NConfig.getDictionaryEntry(providerID))), dictionary);
        }
        const translationRequired = (children && I18NConfig.translationRequired(locale)) ? true : false;
        if (!translationRequired) {
            return ((0, jsx_runtime_1.jsx)(ClientProvider_1.default, { locale: locale, defaultLocale: defaultLocale, dictionary: dictionary, children: children }));
        }
        let translatedDictionary = {};
        yield Promise.all(Object.keys(dictionary).map((id) => __awaiter(this, void 0, void 0, function* () {
            if (isPromise(dictionary[id])) {
                translatedDictionary[id] = yield dictionary[id];
            }
            else if (typeof dictionary[id] === 'string') {
                translatedDictionary[id] = yield intl(dictionary[id], Object.assign(Object.assign({ targetLanguage: locale }, props), { id: `${providerID ? `${providerID}.` : ''}${id}` }));
            }
            else {
                translatedDictionary[id] = (0, jsx_runtime_1.jsx)(I18N, Object.assign({ id: `${providerID ? `${providerID}.` : ''}${id}` }, props, { children: dictionary[id] }));
            }
        })));
        return ((0, jsx_runtime_1.jsx)(ClientProvider_1.default, { locale: locale, defaultLocale: defaultLocale, dictionary: translatedDictionary, children: children }));
    });
}
//# sourceMappingURL=GTProvider.js.map