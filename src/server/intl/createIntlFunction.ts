import I18NConfiguration from "../../config/I18NConfiguration"
import calculateHash from "../../primitives/calculateHash";

// intl('Hello')

export default function createIntlFunction({
    I18NConfig, ...defaultOptions
}: { I18NConfig: I18NConfiguration, [key: string]: any }) {
    return async (
        content: string, options: Record<string, any> = { ...defaultOptions }
    ): Promise<string> => {
        options.targetLanguage = options.targetLanguage || I18NConfig.getLocale();
        if (!content || typeof content !== 'string' || !I18NConfig.translationRequired(options.targetLanguage)) return content;
        let key: string = options.context ? await calculateHash([content, options.context]) : await calculateHash(content);
        const translation = await I18NConfig.getTranslation(options.targetLanguage, key, options.id, options.dictionaryName);
        if (translation) return translation;
        if (I18NConfig.automaticTranslationEnabled()) {
            const translationPromise = I18NConfig.intl({ content, targetLanguage: options.targetLanguage, options: { ...options, hash: key } });
            const renderSettings = I18NConfig.getRenderSettings()
            if (renderSettings.method !== "subtle") {
                return await translationPromise;
            }
        }
        return content;
    } 
}