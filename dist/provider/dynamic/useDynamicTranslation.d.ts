export default function useDynamicTranslation({ projectId, devApiKey, baseUrl, setTranslations, ...metadata }: {
    projectId?: string;
    defaultLocale?: string;
    devApiKey?: string;
    baseUrl?: string;
    setTranslations: React.Dispatch<React.SetStateAction<any>>;
}): {
    translateContent: (params: {
        source: any;
        targetLocale: string;
        metadata: Record<string, any>;
    }) => void;
    translateChildren: (params: {
        source: any;
        targetLocale: string;
        metadata: Record<string, any>;
    }) => void;
};
//# sourceMappingURL=useDynamicTranslation.d.ts.map