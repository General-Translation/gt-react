import determineLocale from "../index/determineLocale";
import { localeCookieName } from "../middleware/cookieSettings";
import { getNextCookies, getNextHeaders } from "./imports/imports";
/**
 * Retrieves the 'accept-language' header from the headers list.
 * If the 'next/headers' module is not available, it attempts to load it. If the
 * headers function is available, it returns the primary language from the 'accept-language'
 * header. If the headers function or 'accept-language' header is not available, returns null.
 *
 * @returns {string | null} A promise that resolves to the primary language from the
 * 'accept-language' header, or null if not available.
 */
export function getNextLocale(defaultLocale = '', approvedLocales) {
    var _a;
    try {
        const cookies = getNextCookies();
        if (cookies) {
            const cookieStore = cookies();
            const localeCookie = cookieStore.get(localeCookieName);
            if (localeCookie === null || localeCookie === void 0 ? void 0 : localeCookie.value)
                return localeCookie.value;
        }
    }
    catch (error) {
        console.warn(error);
    }
    const headers = getNextHeaders();
    if (!headers)
        return defaultLocale;
    const headerList = headers();
    const acceptedLocales = (_a = headerList.get('accept-language')) === null || _a === void 0 ? void 0 : _a.split(',').map(item => { var _a; return (_a = item.split(';')) === null || _a === void 0 ? void 0 : _a[0].trim(); });
    const locale = acceptedLocales ? determineLocale(approvedLocales, acceptedLocales, defaultLocale) : defaultLocale;
    return locale;
}
/**
 * Retrieves the 'host' header from the headers list.
 * If the 'next/headers' module is not available, it attempts to load it. If the
 * headers function is available, it returns the value of the 'host' header.
 * If the headers function or 'host' header is not available, returns null.
 *
 * @returns {string | null} A promise that resolves to the value of the 'host' header,
 * or null if not available.
 */
export function getNextDomain() {
    const headers = getNextHeaders();
    if (!headers)
        return null;
    const headerList = headers();
    return headerList.get('host') || null;
}
//# sourceMappingURL=requestFunctions.js.map