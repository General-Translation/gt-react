import { useState, useEffect } from 'react';
import { localeCookieName } from '../../middleware/cookieSettings';
/**
 * Function to get the value of a specific cookie by its name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
function getCookieValue(name) {
    const cookieString = document.cookie;
    // Split the cookies string by "; " to get an array of "key=value" strings
    const cookiesArray = cookieString.split("; ");
    // Loop through the array to find the cookie with the specified name
    for (let cookie of cookiesArray) {
        const [cookieName, cookieValue] = cookie.split("=");
        // Check if this cookie has the name we are looking for
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    // If the cookie is not found, return null
    return null;
}
/**
 * Custom hook to get the browser's default language.
 * @param {string} defaultLocale - The default locale to use if browser locale is not available.
 * @returns {string} The default language of the browser.
 */
export default function useBrowserLocale(defaultLocale) {
    const [locale, setLocale] = useState('');
    useEffect(() => {
        const localeFromCookie = getCookieValue(localeCookieName);
        const browserLocale = localeFromCookie || navigator.language || (navigator === null || navigator === void 0 ? void 0 : navigator.userLanguage) || defaultLocale;
        setLocale(browserLocale);
    }, [defaultLocale]);
    return locale;
}
//# sourceMappingURL=useBrowserLocale.js.map