'use client';
import { useState, useEffect } from 'react';
import { determineLocale } from 'generaltranslation';
import { libraryDefaultLocale } from 'generaltranslation/internal';
import { listSupportedLocales } from '@generaltranslation/supported-locales';
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
export default function useBrowserLocale(defaultLocale, locales) {
    if (defaultLocale === void 0) { defaultLocale = libraryDefaultLocale; }
    if (locales === void 0) { locales = listSupportedLocales(); }
    var _a = useState(''), locale = _a[0], setLocale = _a[1];
    useEffect(function () {
        var browserLocales = (function () {
            if (navigator === null || navigator === void 0 ? void 0 : navigator.languages)
                return navigator.languages;
            if (navigator === null || navigator === void 0 ? void 0 : navigator.language)
                return [navigator.language];
            if (navigator === null || navigator === void 0 ? void 0 : navigator.userLanguage)
                return [navigator === null || navigator === void 0 ? void 0 : navigator.userLanguage];
            return [defaultLocale];
        })();
        setLocale(determineLocale(browserLocales, locales) || defaultLocale);
    }, [defaultLocale, locales]);
    return locale;
}
//# sourceMappingURL=useBrowserLocale.js.map