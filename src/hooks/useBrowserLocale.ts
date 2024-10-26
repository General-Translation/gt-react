import { useState, useEffect } from 'react';
import getLocaleCookie from '../cookies/getLocaleCookie';
import { determineLanguage } from 'generaltranslation';

import primitives from '../primitives/primitives';
const { libraryDefaultLocale, localeCookieName } = primitives;

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
export default function useBrowserLocale(
    defaultLocale: string = libraryDefaultLocale, 
    cookieName: string = localeCookieName,
    locales?: string[],
): string {
    const [locale, setLocale] = useState<string>('');
    useEffect(() => {
        const browserLocale = 
            (cookieName ? getLocaleCookie(cookieName) : undefined)
            || (locales ? determineLanguage(navigator.languages as string[], locales) : undefined)
            || navigator.languages?.[0] 
            || navigator.language 
            || (navigator as any)?.userLanguage 
            || defaultLocale
        ;
        setLocale(browserLocale);
    }, [defaultLocale, locales]);
    return locale;
}