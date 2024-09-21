import { renderContentToString, splitStringToContent } from "generaltranslation";
import getI18NConfig from "../../utils/getI18NConfig";
import { calculateHash } from "gt-react/internal";
import getLocale from '../../request/getLocale'
import getMetadata from "../../request/getMetadata";

/**
 * Translates the provided content string based on the specified language and options.
 * If no translation is required, it renders the content as is. Otherwise, it fetches the
 * required translations or falls back to on-demand translation if enabled.
 * 
 * By default, General Translation saves the translation in a remote cache if an `id` option is passed.
 *
 * @async
 * @function translate
 * 
 * @param {string} content - The content string that needs to be translated.
 * @param {Object} [options] - Translation options.
 * @param {string} [options.id] - A unique identifier for the content, used for caching and fetching translations.
 * @param {string} [options.language] - The target language for translation. Defaults to the current locale if not provided.
 * @param {string} [options.context] - Additional context for the translation process, which may influence the translation's outcome.
 * @param {Object} [options.dictionaryName] - Optional dictionary name for fetching translations from a specific dictionary.
 * @param {Object} [variables] - An optional map of variables to be injected into the translated content.
 * @param {Object} [variableOptions] - Options for formatting numbers and dates using `Intl.NumberFormat` or `Intl.DateTimeFormat`.
 * 
 * @returns {Promise<string>} - A promise that resolves to the translated content string, or the original content if no translation is needed.
 * 
 * @throws {Error} - Throws an error if the translation process fails or if there are issues with fetching necessary data.
 * 
 * @example
 * // Basic usage with default locale detection
 * const translation = await translate("Hello, world!");
 * 
 * @example
 * // Providing specific translation options
 * const translation = await translate("Hello, world!", { language: 'es', context: 'Translate informally' });
 * 
 * @example
 * // Using variables in the content string
 * const translation = await translate("The price is {price}", {}, { price: 29.99 });
 */
export default async function translate(
    content: string, 
    options: {
        id?: string,
        language?: string;
        context?: string;
        [key: string]: any
    } = {},
    variables?: Record<string, any>,
    variableOptions?: Record<string, Intl.NumberFormatOptions | Intl.DateTimeFormatOptions>
): Promise<string> {

    if (!content)  return '';

    const I18NConfig = getI18NConfig();

    const contentAsArray = splitStringToContent(content);
    
    options.language = options.language || getLocale();

    if (!I18NConfig.translationRequired(options.language)) 
        return renderContentToString(contentAsArray, [options.language, I18NConfig.getDefaultLocale()], variables, variableOptions);
    
    let key;
    if (options.id) {
        key = options.context ? await calculateHash([content, options.context]) : await calculateHash(content);
        const translations = await I18NConfig.getTranslations(options.language, options?.dictionaryName || undefined);
        if (translations?.[options.id] && translations[options.id].k === key)
            return renderContentToString(translations[options.id].t, [options.language, I18NConfig.getDefaultLocale()], variables, variableOptions);
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