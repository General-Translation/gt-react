import { TranslateChildrenCallback, TranslateContentCallback } from "../../types/types";
export default function useRuntimeTranslation({ targetLocale, projectId, devApiKey, runtimeUrl, defaultLocale, setTranslations, ...metadata }: {
    targetLocale: string;
    projectId?: string;
    defaultLocale?: string;
    devApiKey?: string;
    runtimeUrl?: string;
    setTranslations: React.Dispatch<React.SetStateAction<any>>;
    [key: string]: any;
}): {
    translationEnabled: boolean;
    translateContent: TranslateContentCallback;
    translateChildren: TranslateChildrenCallback;
};
//# sourceMappingURL=useRuntimeTranslation.d.ts.map