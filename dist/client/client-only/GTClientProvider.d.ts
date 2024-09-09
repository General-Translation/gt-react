/**
 * GTClientProvider component for providing translations to entirely client-side React apps.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} [props.children] - The child components to be rendered within the provider.
 * @param {string} [props.projectID] - The project ID for remote translation services.
 * @param {Record<string, any>} [props.dictionary=defaultGTProps.dictionary] - The local dictionary for translations.
 * @param {string} [props.dictionaryName=defaultGTProps.dictionaryName] - The name of the dictionary.
 * @param {string[]} [props.approvedLocales] - The list of approved locales.
 * @param {string} [props.defaultLocale=approvedLocales?.[0] || defaultGTProps.defaultLocale] - The default locale.
 * @param {string} [props.locale=''] - The current locale.
 * @param {boolean} [props.remoteSource=defaultGTProps.remoteSource] - Flag indicating if remote source is used.
 * @param {string} [props.cacheURL=defaultGTProps.cacheURL] - The URL for caching translations.
 * @param {Record<string, () => Promise<Record<string, any>>>} [props.translations] - A local translations object.
 *
 * @throws Will throw an error if projectID is not provided when remoteSource is true and cacheURL is the default.
 *
 * @returns {JSX.Element} The GTClientProvider component.
*/
export default function GTClientProvider({ children, projectID, dictionary, dictionaryName, approvedLocales, defaultLocale, locale, remoteSource, cacheURL }: {
    children?: any;
    projectID?: string;
    dictionary?: Record<string, any>;
    dictionaryName?: string;
    approvedLocales?: string[];
    defaultLocale?: string;
    locale?: string;
    remoteSource?: boolean;
    cacheURL?: string;
}): JSX.Element;
//# sourceMappingURL=GTClientProvider.d.ts.map