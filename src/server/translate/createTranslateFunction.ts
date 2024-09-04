import I18NConfiguration from "../../config/I18NConfiguration"
import calculateHash from "../../primitives/calculateHash";

// translate('Hello')

export default function createTranslateFunction(I18NConfig: I18NConfiguration) {
    return async (
        content: string, 
        options: {
            targetLanguage?: string;
            context?: string;
            [key: string]: any
        } = {}
    ): Promise<string> => {
        options.targetLanguage = options.targetLanguage || I18NConfig.getLocale();
        if (!content || typeof content !== 'string' || !I18NConfig.translationRequired(options.targetLanguage)) return content;
        let key: string = options.context ? await calculateHash([content, options.context]) : await calculateHash(content);
        const translation = await I18NConfig.getTranslation(options.targetLanguage, key, options.id, options.dictionaryName);
        if (translation) return translation;
        if (I18NConfig.automaticTranslationEnabled()) {
            const translationPromise = I18NConfig.translate({ content, targetLanguage: options.targetLanguage, options: { ...options, hash: key } });
            const renderSettings = I18NConfig.getRenderSettings()
            if (renderSettings.method !== "subtle") {
                return await translationPromise;
            }
        }
        return content;
    } 
}