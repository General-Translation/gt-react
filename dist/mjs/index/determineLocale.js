import { isSameLanguage } from "generaltranslation";
/**
 * Determines the best matching locale from a list of possible locales.
 *
 * @param {string[]} [approvedLocales] - A list of locales that are approved.
 * @param {string[] | string} [locales] - A list or a single string of possible locales.
 * @param {string} [defaultLocale=''] - The default locale to return if no match is found.
 * @returns {string} - The best matching locale or the default locale.
 */
export default function determineLocale(approvedLocales, locales, defaultLocale = '') {
    if (typeof locales === 'string')
        locales = [locales];
    if (!locales || !Array.isArray(locales))
        return defaultLocale;
    // if no approved locales, anything goes
    if (!approvedLocales)
        return locales[0];
    // check for an exact match
    for (const locale of locales) {
        for (const approvedLocale of approvedLocales) {
            if (locale === approvedLocale) {
                return approvedLocale;
            }
        }
    }
    // check for a linguistic match
    for (const locale of locales) {
        for (const approvedLocale of approvedLocales) {
            if (isSameLanguage(locale, approvedLocale)) {
                return approvedLocale;
            }
        }
    }
    // default
    return defaultLocale;
}
//# sourceMappingURL=determineLocale.js.map