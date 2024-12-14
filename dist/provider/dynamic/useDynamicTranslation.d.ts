export default function useDynamicTranslation({ projectId, devApiKey, baseUrl, defaultLocale, setTranslations, ...metadata }: {
    projectId?: string;
    defaultLocale?: string;
    devApiKey?: string;
    baseUrl?: string;
    setTranslations: React.Dispatch<React.SetStateAction<any>>;
    [key: string]: any;
}): {
    translationEnabled: boolean;
    translateContent?: undefined;
    translateChildren?: undefined;
} | {
    translateContent: (params: {
        source: any;
        targetLocale: string;
        metadata: {
            hash: string;
        } & Record<string, any>;
    }) => void;
    translateChildren: (params: {
        source: any;
        targetLocale: string;
        metadata: {
            hash: string;
        } & Record<string, any>;
    }) => void;
    translationEnabled: boolean;
};
//# sourceMappingURL=useDynamicTranslation.d.ts.map