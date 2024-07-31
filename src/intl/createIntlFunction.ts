import I18NConfiguration from "../config/I18NConfiguration"

export default function createIntlFunction({
    I18NConfig, ...defaultOptions
}: { I18NConfig: I18NConfiguration, [key: string]: any }) {
    return async (
        content: string, options: Record<string, any> = { ...defaultOptions }
    ): Promise<string> => {
        options.targetLanguage = options.targetLanguage || I18NConfig.getLocale();
        if (!content || typeof content !== 'string' || !I18NConfig.translationRequired(options.targetLanguage)) return content;
        const translation = await I18NConfig.getTranslation(options.targetLanguage, content, options.id, options.dictionaryName);
        if (translation) return translation;
        if (I18NConfig.automaticTranslationEnabled()) {
            const translationPromise = I18NConfig.intl({ content, targetLanguage: options.targetLanguage, options });
            const renderSettings = I18NConfig.getRenderSettings()
            if (renderSettings.method !== "subtle") {
                const timeout = renderSettings.timeout;
                if (typeof timeout === 'number') {
                    const timeoutPromise = new Promise<string>((resolve) => setTimeout(() => resolve(content), timeout));
                    return await Promise.race([translationPromise, timeoutPromise]);
                }
                return await translationPromise;
            }
        }
        return content;
    } 
}