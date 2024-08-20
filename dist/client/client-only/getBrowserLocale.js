/**
 * Gets the browser's default language.
 * @returns {string} The default language of the browser.
 */
export default function getBrowserLocale(defaultLocale) {
    // navigator.language returns the default browser language.
    return navigator.language || (navigator === null || navigator === void 0 ? void 0 : navigator.userLanguage) || defaultLocale;
}
//# sourceMappingURL=getBrowserLocale.js.map