import { addGTIdentifier, writeChildrenAsObjects, calculateHash } from "gt-react/internal";
import getI18NConfig from "../../utils/getI18NConfig";
import getLocale from "../../request/getLocale";
import getMetadata from "../../request/getMetadata";
import { Suspense } from "react";
import Resolver from "./Resolver";
import renderTranslatedChildren from "../rendering/renderTranslatedChildren";
import renderDefaultChildren from "../rendering/renderDefaultChildren";

type RenderSettings = {
    method: "skeleton" | "replace" | "hang" | "subtle",
    timeout: number | null;
    fallbackToPrevious: boolean
}

/**
 * Translation component that renders its children translated into the user's language.
 * 
 * @example
 * ```jsx
 * // Basic usage:
 * <T id="welcome_message">
 *  Hello, <Var name="name" value={firstname}>!
 * </T>
 * ```
 * 
 * @example
 * ```jsx
 * // Translating a plural
 * <T id="item_count">
 *  <Plural n={3} singular={<>You have <Num value={n}/> item.}>
 *      You have <Num value={n}/> items.
 *  </Plural>
 * </T>
 * ```
 * 
 * When used on the server-side, can create translations on demand.
 * If you need to ensure server-side usage import from `'gt-next/server'`.
 * 
 * When used on the client-side, will throw an error if no `id` prop is provided.
 *
 * By default, General Translation saves the translation in a remote cache if an `id` option is passed.
 * 
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {string} [id] - Optional identifier for the translation string. If not provided, a hash will be generated from the content.
 * @param {Object} [renderSettings] - Optional settings controlling how fallback content is rendered during translation.
 * @param {"skeleton" | "replace" | "hang" | "subtle"} [renderSettings.method] - Specifies the rendering method:
 *  - "skeleton": show a placeholder while translation is loading.
 *  - "replace": show the default content as a fallback while the translation is loading.
 *  - "hang": wait until the translation is fully loaded before rendering anything.
 *  - "subtle": display children without a translation initially, with translations being applied later if available.
 * @param {number | null} [renderSettings.timeout] - Optional timeout for translation loading.
 * @param {boolean} [renderSettings.fallbackToPrevious] - Whether to fallback to the last known translation if no translation is found for the current content.
 * @param {any} [context] - Additional context for translation key generation.
 * @param {Object} [props] - Additional props for the component.
 * @returns {JSX.Element} The rendered translation or fallback content based on the provided configuration.
 * 
 * @throws {Error} If a plural translation is requested but the `n` option is not provided.
 */
export default async function T({
    children, id,
    context,
    renderSettings,
    ...props
}: {
    children: any,
    id?: string
    context?: RenderSettings
    [key: string]: any
}): Promise<any> {

    if (!children) {
        return;
    }

    const I18NConfig = getI18NConfig();
    const locale = getLocale();
    const defaultLocale = I18NConfig.getDefaultLocale();
    const translationRequired = I18NConfig.translationRequired(locale);

    const { variables, variablesOptions } = props;

    let translationsPromise;
    if (translationRequired) {
        translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);
    }

    const taggedChildren = addGTIdentifier(children);
    const childrenAsObjects = writeChildrenAsObjects(taggedChildren);

    if (!translationRequired) {
        return renderDefaultChildren({ 
            children: taggedChildren, variables, variablesOptions, defaultLocale
        });
    }

    const key: string = context ? await calculateHash([childrenAsObjects, context]) : await calculateHash(childrenAsObjects);

    const translations = await translationsPromise;
    const translation = translations?.[id || key];

    if (translation?.k === key) {
        // a translation exists!
        let target = translation.t;
        return renderTranslatedChildren({
            source: taggedChildren, target,
            variables, variablesOptions, locales: [locale, defaultLocale]
        });
    }

    renderSettings ||= I18NConfig.getRenderSettings();

    const translationPromise = I18NConfig.translateChildren({ 
        children: childrenAsObjects, 
        targetLanguage: locale, 
        metadata: { ...props, ...(id && { id }), hash: key, ...(getMetadata()), ...(renderSettings.timeout && { timeout: renderSettings.timeout }) } 
    });
    let promise = translationPromise.then(translation => {
        let target = translation;
        return renderTranslatedChildren({
            source: taggedChildren, target, 
            variables, variablesOptions,
            locales: [locale, defaultLocale]
        });
    });

    let loadingFallback;
    let errorFallback;

    if (renderSettings.fallbackToPrevious && translation) {
        // in case there's a previous translation on file
        loadingFallback = renderTranslatedChildren({
            source: taggedChildren, target: translation.t, variables, variablesOptions,
            locales: [locale, defaultLocale]
        });
        errorFallback = loadingFallback;
    } else {
        errorFallback = renderDefaultChildren({
            children: taggedChildren, variables, variablesOptions, defaultLocale
        });
        if (renderSettings.method === "skeleton") {
            loadingFallback = <></>
        }
        else if (renderSettings.method === "replace") {
            loadingFallback = errorFallback;
        }
    }

    if (renderSettings.method === "hang") {
        // Wait until the site is translated to return
        return <Resolver children={promise} fallback={errorFallback} />;
    }

    if (!["skeleton", "replace"].includes(renderSettings.method) && !id) {
        // If none of those, i.e. "subtle" 
        // return the children, with no special rendering
        // a translation may be available from a cached translation dictionary next time the component is loaded
        return errorFallback;
    }

    return (
        <Suspense fallback={loadingFallback}>
            <Resolver children={promise} fallback={errorFallback} />
        </Suspense>
    )
    
}