import React, { Suspense, useEffect } from "react";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier, hashReactChildrenObjects, writeChildrenAsObjects } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import { useMemo } from "react";
import renderVariable from "../provider/rendering/renderVariable";
import { createClientSideTDictionaryCollisionError, createClientSideTHydrationError, createClientSideTWithoutIdError } from "../errors/createErrors";

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
function T({
    children, id, ...props
}: {
    children?: any,
    id: string
    context?: string,
    [key: string]: any
}): JSX.Element | undefined {

    if (!children) return undefined;
    
    if (!id) throw new Error(createClientSideTWithoutIdError(children))

    const { variables, variablesOptions } = props;

    const { translations, translationRequired, translateChildren, renderSettings } = useGTContext(
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
    const [childrenAsObjects, hash] = useMemo(() => {
        const childrenAsObjects = writeChildrenAsObjects(taggedChildren);
        const hash: string = hashReactChildrenObjects(context ? [childrenAsObjects, context] : childrenAsObjects);
        return [childrenAsObjects, hash];
    }, [context, taggedChildren]);

    const translation = translations[id];

    useEffect(() => {
        if (!translation || !translation[hash]) {
            if (typeof window !== 'undefined') {
                console.log("client render t, translation", translation, hash);
            } else {
                console.log("client (server) render t, translation", translation, hash);
            }
            console.log("client <T> do translation: source", childrenAsObjects, "hash", hash);
            translateChildren({
                source: childrenAsObjects,
                targetLocale: locale,
                metadata: {
                    id, hash
                }
            });
        }
    }, [translation, translation?.[hash]]);



    // handle no translation/waiting for translation
    if (!translation || !translation[hash]) {

        let loadingFallback; // Blank screen
        let defaultChildren; // Default locale fallback
    
        defaultChildren = renderDefaultChildren({
            children: taggedChildren,
            variables,
            variablesOptions,
            defaultLocale,
            renderVariable
        }) as JSX.Element;

        if (renderSettings.method === 'replace') {
            loadingFallback = defaultChildren;
        } else if (renderSettings.method === 'skeleton') {
            loadingFallback = <></>; // blank
        }

        // TODO: Hang logic
        // if (renderSettings.method === 'hang') {
        //   // Wait until the site is translated to return
        //   return <Resolver children={promise} fallback={errorFallback} />;
        // }

        if (!['skeleton', 'replace'].includes(renderSettings.method) && !id) {
          // If none of those, i.e. "subtle"
          // return the children, with no special rendering
          // a translation may be available from a cached translation dictionary next time the component is loaded
          return defaultChildren as JSX.Element;
        }
        
        // console.error(createClientSideTHydrationError(id));

        // The suspense exists here for hydration reasons
        return loadingFallback as JSX.Element;
        }

    return (
        renderTranslatedChildren({
            source: taggedChildren,
            target: translation[hash],
            variables,
            variablesOptions,
            locales: [locale, defaultLocale],
            renderVariable
        }) as JSX.Element
    );
}

T.gtTransformation = "translate-client";

export default T;