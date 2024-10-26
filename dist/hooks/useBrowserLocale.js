"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useBrowserLocale;
var react_1 = require("react");
var getLocaleCookie_1 = __importDefault(require("../cookies/getLocaleCookie"));
var generaltranslation_1 = require("generaltranslation");
var primitives_1 = __importDefault(require("../primitives/primitives"));
var libraryDefaultLocale = primitives_1.default.libraryDefaultLocale, localeCookieName = primitives_1.default.localeCookieName;
/**
 * Hook to retrieve the browser's default language, with support for a fallback and locale stored in a cookie.
 *
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if the browser locale is not available.
 * @param {string} [cookieName=localeCookieName] - The name of the cookie to check for a stored locale. If omitted, no cookie is used.
 * @returns {string} The resolved browser locale, either from the cookie, browser settings, or the default locale.
 *
 * @example
 * const browserLocale = useBrowserLocale('en-US');
 * console.log(browserLocale); // Outputs the browser's locale, or 'en-US' if unavailable
 *
 * @example
 * const browserLocale = useBrowserLocale('fr', 'localeCookie');
 * console.log(browserLocale); // Outputs locale from cookie 'localeCookie' if available, or browser's locale otherwise
 *
 * @description
 * This hook attempts to determine the browser's preferred language. If a locale is stored in a cookie (specified by `cookieName`),
 * it will take precedence. If not, it falls back to the `navigator.language` or `navigator.userLanguage`. If none of these are available,
 * the provided `defaultLocale` is used.
 */
function useBrowserLocale(defaultLocale, cookieName, locales) {
    if (defaultLocale === void 0) { defaultLocale = libraryDefaultLocale; }
    if (cookieName === void 0) { cookieName = localeCookieName; }
    var _a = (0, react_1.useState)(''), locale = _a[0], setLocale = _a[1];
    (0, react_1.useEffect)(function () {
        var _a;
        var browserLocale = (cookieName ? (0, getLocaleCookie_1.default)(cookieName) : undefined)
            || (locales ? (0, generaltranslation_1.determineLanguage)(navigator.languages, locales) : undefined)
            || ((_a = navigator.languages) === null || _a === void 0 ? void 0 : _a[0])
            || navigator.language
            || (navigator === null || navigator === void 0 ? void 0 : navigator.userLanguage)
            || defaultLocale;
        setLocale(browserLocale);
    }, [defaultLocale, locales]);
    return locale;
}
//# sourceMappingURL=useBrowserLocale.js.map