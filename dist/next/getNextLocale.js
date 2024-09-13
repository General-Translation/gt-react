"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextLocale = getNextLocale;
var headers_1 = require("next/headers");
var headers_2 = require("next/headers");
var internal_1 = require("gt-react/internal");
var generaltranslation_1 = require("generaltranslation");
/**
 * Retrieves the 'accept-language' header from the headers list.
 * If the 'next/headers' module is not available, it attempts to load it. If the
 * headers function is available, it returns the primary language from the 'accept-language'
 * header. If the headers function or 'accept-language' header is not available, returns null.
 *
 * @returns {string | null} A promise that resolves to the primary language from the
 * 'accept-language' header, or null if not available.
 */
function getNextLocale(defaultLocale, locales) {
    var _a;
    if (defaultLocale === void 0) { defaultLocale = ''; }
    var cookieStore = (0, headers_2.cookies)();
    var localeCookie = cookieStore.get(internal_1.primitives.localeCookieName);
    if (localeCookie === null || localeCookie === void 0 ? void 0 : localeCookie.value)
        return localeCookie.value;
    var headersList = (0, headers_1.headers)();
    var acceptedLocales = (_a = headersList.get('accept-language')) === null || _a === void 0 ? void 0 : _a.split(',').map(function (item) { var _a; return (_a = item.split(';')) === null || _a === void 0 ? void 0 : _a[0].trim(); });
    if (acceptedLocales && acceptedLocales.length) {
        if (locales) {
            return (0, generaltranslation_1.determineLanguage)(acceptedLocales, locales) || defaultLocale;
        }
        return acceptedLocales[0];
    }
    return defaultLocale;
}
//# sourceMappingURL=getNextLocale.js.map