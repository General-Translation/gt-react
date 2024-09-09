"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = determineLocale;
var generaltranslation_1 = require("generaltranslation");
/**
 * Determines the best matching locale from a list of possible locales.
 *
 * @param {string[]} [approvedLocales] - A list of locales that are approved.
 * @param {string[] | string} [locales] - A list or a single string of possible locales.
 * @param {string} [defaultLocale=''] - The default locale to return if no match is found.
 * @returns {string} - The best matching locale or the default locale.
 */
function determineLocale(approvedLocales, locales, defaultLocale) {
    if (defaultLocale === void 0) { defaultLocale = ''; }
    if (typeof locales === 'string')
        locales = [locales];
    if (!locales || !Array.isArray(locales))
        return defaultLocale;
    // if no approved locales, anything goes
    if (!approvedLocales)
        return locales[0];
    // check for an exact match
    for (var _i = 0, locales_1 = locales; _i < locales_1.length; _i++) {
        var locale = locales_1[_i];
        for (var _a = 0, approvedLocales_1 = approvedLocales; _a < approvedLocales_1.length; _a++) {
            var approvedLocale = approvedLocales_1[_a];
            if (locale === approvedLocale) {
                return approvedLocale;
            }
        }
    }
    // check for a linguistic match
    for (var _b = 0, locales_2 = locales; _b < locales_2.length; _b++) {
        var locale = locales_2[_b];
        for (var _c = 0, approvedLocales_2 = approvedLocales; _c < approvedLocales_2.length; _c++) {
            var approvedLocale = approvedLocales_2[_c];
            if ((0, generaltranslation_1.isSameLanguage)(locale, approvedLocale)) {
                return approvedLocale;
            }
        }
    }
    // default
    return defaultLocale;
}
//# sourceMappingURL=determineLocale.js.map