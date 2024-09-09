import { renderContentToString, splitStringToContent } from "generaltranslation";
import I18NConfiguration from "../../config/I18NConfiguration"
import calculateHash from "../../internal/calculateHash";
import { Content } from "generaltranslation/dist/types/types";

// translate('Hello')

export default function createTranslateFunction(I18NConfig: I18NConfiguration) {
    return async function<V extends Record<string, any>>(
        content: string, 
        options: {
            targetLanguage?: string;
            context?: string;
            [key: string]: any
        } = {},
        variables?: V,
        variableOptions?: { [key in keyof V]?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions }
    ): Promise<string> {
        
        const contentAsArray = splitStringToContent(content);
        
        options.targetLanguage = options.targetLanguage || I18NConfig.getLocale();
        
        if (!I18NConfig.translationRequired(options.targetLanguage)) 
            return renderContentToString(contentAsArray, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions);
        
        let key: string = options.context ? await calculateHash([content, options.context]) : await calculateHash(content);
        
        if (options.id) {
            const translation = await I18NConfig.getTranslation(options.targetLanguage, key, options.id, options.dictionaryName);
            if (translation)
                return renderContentToString(translation, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions);
        }
        if (I18NConfig.automaticTranslationEnabled()) {
            const translationPromise = I18NConfig.translate({ content, targetLanguage: options.targetLanguage, options: { ...options, hash: key } });
            const renderSettings = I18NConfig.getRenderSettings()
            if (renderSettings.method !== "subtle" && options.id) {
                const translation = await translationPromise;
                return renderContentToString(translation, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions);
            }
        }

        return renderContentToString(contentAsArray, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions);
    } 
}