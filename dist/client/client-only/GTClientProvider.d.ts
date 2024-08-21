export default function GTClientProvider({ children, projectID, dictionary, dictionaryName, approvedLocales, defaultLocale, locale, remoteSource, cacheURL, translations }: {
    children?: any;
    projectID?: string;
    dictionary?: Record<string, any>;
    dictionaryName?: string;
    approvedLocales?: string[];
    defaultLocale?: string;
    locale?: string;
    remoteSource?: boolean;
    cacheURL?: string;
    translations?: Record<string, () => Promise<Record<string, any>>>;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GTClientProvider.d.ts.map