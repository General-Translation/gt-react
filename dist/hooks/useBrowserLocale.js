"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useBrowserLocale;
var react_1 = require("react");
var generaltranslation_1 = require("generaltranslation");
var internal_1 = require("generaltranslation/internal");
/**
 * Hook to retrieve the browser's default locale, with support for a fallback and locale stored in a cookie.
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
 * This hook attempts to determine the browser's preferred locale. If a locale is stored in a cookie (specified by `cookieName`),
 * it will take precedence. If not, it falls back to the `navigator.language` or `navigator.userLanguage`. If none of these are available,
 * the provided `defaultLocale` is used.
 */
function useBrowserLocale(defaultLocale, locales) {
    if (defaultLocale === void 0) { defaultLocale = internal_1.libraryDefaultLocale; }
    var _a = (0, react_1.useState)(''), locale = _a[0], setLocale = _a[1];
    (0, react_1.useEffect)(function () {
        var browserLocales = structuredClone(navigator.languages ||
            [navigator.language] ||
            [navigator === null || navigator === void 0 ? void 0 : navigator.userLanguage] ||
            [defaultLocale]);
        if (locales) {
            setLocale((0, generaltranslation_1.determineLocale)(browserLocales, locales) || defaultLocale);
        }
        else {
            setLocale(browserLocales[0] || defaultLocale);
        }
    }, [defaultLocale, locales]);
    return locale;
}
//# sourceMappingURL=useBrowserLocale.js.map