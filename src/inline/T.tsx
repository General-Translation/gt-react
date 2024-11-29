import React, { Suspense } from "react";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier, hashReactChildrenObjects, writeChildrenAsObjects } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import { useMemo } from "react";
import renderVariable from "../provider/rendering/renderVariable";
import { createClientSideTDictionaryCollisionError, createClientSideTHydrationError, createClientSideTWithoutIDError } from "../errors/createErrors";

/**
 * Translation component that handles rendering translated content, including plural forms.
 * Used with the required `id` parameter instead of `const t = useGT()`.
 * 
 * @param {string} [id] - Required identifier for the translation string.
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {any} [context] - Additional context used for translation.
 * @param {Object} [props] - Additional props for the component.
 * @returns {JSX.Element} The rendered translation or fallback content based on the provided configuration.
 * 
 * @throws {Error} If a plural translation is requested but the `n` option is not provided.
 * 
 * @example
 * ```jsx
 * // Basic usage:
 * <T id="welcome_message">
 *  Hello, <Var name="name">{name}</Var>!
 * </T>
 * ```
 * 
 * @example
 * ```jsx
 * // Using plural translations:
 * <T id="item_count">
 *  <Plural n={n} singular={<>You have <Num value={n}/> item</>}>
 *      You have <Num value={n}/> items
 *  </Plural>
 * </T>
 * ```
 * 
 */
export default function T({
    children, id, ...props
}: {
    children?: any,
    id: string
    context?: string,
    [key: string]: any
}): JSX.Element | undefined {

    if (!children) return undefined;
    
    if (!id) {
        throw new Error(createClientSideTWithoutIDError(children))
    }

    const { variables, variablesOptions } = props;

    const { translations, translationRequired } = useGTContext(
        `<T id="${id}"> used on the client-side outside of <GTProvider>`
    );

    const locale = useLocale();
    const defaultLocale = useDefaultLocale();

    const taggedChildren = useMemo(() => addGTIdentifier(children), [children])

    if (!translationRequired) {
        return renderDefaultChildren({
            children: taggedChildren,
            variables, variablesOptions, defaultLocale,
            renderVariable
        }) as JSX.Element;
    }

    // Do translation
    const context = props.context;
    const [childrenAsObjects, key] = useMemo(() => {
        const childrenAsObjects = writeChildrenAsObjects(taggedChildren);
        const key: string = hashReactChildrenObjects(context ? [childrenAsObjects, context] : childrenAsObjects);
        return [childrenAsObjects, key];
    }, [context, taggedChildren]);

    const translation = translations[id];
    
    if (translation?.promise) {
        throw new Error(createClientSideTDictionaryCollisionError(id))
    }
    if (!translation || !translation.t || translation.k !== key) {
        
        console.error(
            createClientSideTHydrationError(id)
        );

        const defaultChildren = renderDefaultChildren({
            children: taggedChildren,
            variables, variablesOptions, defaultLocale, renderVariable
        }) as JSX.Element;

        // The suspense exists here for hydration reasons
        return (
            <Suspense fallback={defaultChildren}>
                {defaultChildren}
            </Suspense>
        );
    }
   
    return renderTranslatedChildren({
        source: taggedChildren, target: translation.t, 
        variables, variablesOptions, locales: [locale, defaultLocale],
        renderVariable
    }) as JSX.Element;
}