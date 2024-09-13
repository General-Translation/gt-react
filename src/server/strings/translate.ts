import { renderContentToString, splitStringToContent } from "generaltranslation";
import getI18NConfig from "../../utils/getI18NConfig";
import { calculateHash } from "gt-react/internal";
import getLocale from '../../request/getLocale'
import getMetadata from "../../request/getMetadata";

export default async function translate<V extends Record<string, any>>(
    content: string, 
    options: {
        id?: string,
        language?: string;
        context?: string;
        [key: string]: any
    } = {},
    variables?: V,
    variableOptions?: { [key in keyof V]?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions }
): Promise<string> {

    const I18NConfig = getI18NConfig();

    const contentAsArray = splitStringToContent(content);
    
    options.language = options.language || getLocale();

    if (!I18NConfig.translationRequired(options.language)) 
        return renderContentToString(contentAsArray, [options.language, I18NConfig.getDefaultLocale()], variables, variableOptions);
    
    let key;
    if (options.id) {
        key = options.context ? await calculateHash([content, options.context]) : await calculateHash(content);
        const translations = await I18NConfig.getTranslations(options.language, options?.dictionaryName || undefined);
        if (translations?.[options.id])
            return renderContentToString(translations?.[options.id].t, [options.language, I18NConfig.getDefaultLocale()], variables, variableOptions);
    }

    if (I18NConfig.translationEnabled()) {
        const translationPromise = I18NConfig.translate({ content, targetLanguage: options.language, options: { ...options, hash: key, ...(getMetadata()) } });
        const renderSettings = I18NConfig.getRenderSettings()
        if (
            renderSettings.method !== "subtle" || 
            !options.id // because it is only saved if an id is present
        ) {
            const translation = await translationPromise;
            return renderContentToString(translation, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions);
        }
    }

    return renderContentToString(contentAsArray, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions);
}