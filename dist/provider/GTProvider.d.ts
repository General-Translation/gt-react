import { Dictionary } from "../primitives/types";
/**
 * Provides General Translation context to its children, which can then access `useGT`, `useLocale`, and `useDefaultLocale`.
 *
 * @param {React.ReactNode} children - The children components that will use the translation context.
 * @param {string} [projectID] - The project ID required for General Translation cloud services.
 * @param {Dictionary} [dictionary=defaultDictionary] - The translation dictionary for the project.
 * @param {string} [dictionaryName=defaultDictionaryName] - The name of the translation dictionary.
 * @param {string[]} [approvedLocales] - The list of approved locales for the project.
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if no other locale is found.
 * @param {string} [locale] - The current locale, if already set.
 * @param {string} [cacheURL='https://cache.gtx.dev'] - The URL of the cache service for fetching translations.
 *
 * @returns {JSX.Element} The provider component for General Translation context.
 */
export default function GTProvider({ children, projectID, dictionary, dictionaryName, approvedLocales, defaultLocale, locale, cacheURL }: {
    children?: any;
    projectID?: string;
    dictionary?: Dictionary;
    dictionaryName?: string;
    approvedLocales?: string[];
    defaultLocale?: string;
    locale?: string;
    cacheURL?: string;
}): JSX.Element;
//# sourceMappingURL=GTProvider.d.ts.map