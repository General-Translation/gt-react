/**
 * Gets the browser's default language.
 * @returns {string} The default language of the browser.
 */
export default function getBrowserLocale(defaultLocale: string): string {
    // navigator.language returns the default browser language.
    return navigator.language || (navigator as any)?.userLanguage || defaultLocale;
}
  