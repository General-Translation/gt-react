"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useBrowserLocale;
var react_1 = require("react");
var cookieSettings_1 = require("../../middleware/cookieSettings");
/**
 * Function to get the value of a specific cookie by its name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
function getCookieValue(name) {
    var cookieString = document.cookie;
    // Split the cookies string by "; " to get an array of "key=value" strings
    var cookiesArray = cookieString.split("; ");
    // Loop through the array to find the cookie with the specified name
    for (var _i = 0, cookiesArray_1 = cookiesArray; _i < cookiesArray_1.length; _i++) {
        var cookie = cookiesArray_1[_i];
        var _a = cookie.split("="), cookieName = _a[0], cookieValue = _a[1];
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
function useBrowserLocale(defaultLocale) {
    if (defaultLocale === void 0) { defaultLocale = 'en-US'; }
    var _a = (0, react_1.useState)(''), locale = _a[0], setLocale = _a[1];
    (0, react_1.useEffect)(function () {
        var localeFromCookie = getCookieValue(cookieSettings_1.localeCookieName);
        var browserLocale = localeFromCookie || navigator.language || (navigator === null || navigator === void 0 ? void 0 : navigator.userLanguage) || defaultLocale;
        setLocale(browserLocale);
    }, [defaultLocale]);
    return locale;
}
//# sourceMappingURL=useBrowserLocale.js.map