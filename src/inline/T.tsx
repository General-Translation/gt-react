import React, { Suspense } from "react";
import { isSameLanguage } from "generaltranslation";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier, hashReactChildrenObjects, writeChildrenAsObjects } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import { useMemo } from "react";

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
 * <T id="welcome_message" variables={{ name: "John" }}>
 *  Hello, <Var name="name"/>!
 * </T>
 * ```
 * 
 * @example
 * ```jsx
 * // Using plural translations:
 * <T id="item_count" variables={{ n: 3 }} singular={"You have one item"}>
 *  You have <Num/> items
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
        throw new Error(`Client-side <T> with no provided 'id' prop. Children: ${children}`)
    }

    const { variables, variablesOptions } = props;

    const { translations } = useGTContext(
        `<T id="${id}"> used on the client-side outside of <GTProvider>`
    );

    const locale = useLocale();
    const defaultLocale = useDefaultLocale();

    const taggedChildren = useMemo(() => addGTIdentifier(children), [children])

    const translationRequired: boolean = (() => {
        if (!locale) return false;
        if (isSameLanguage(locale, defaultLocale)) return false;
        return true;
    })();

    if (!translationRequired) {
        return renderDefaultChildren({
            children: taggedChildren,
            variables, variablesOptions, defaultLocale
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
        throw new Error(`<T id="${id}">, "${id}" is also used as a key in the dictionary. Don't give <T> components the same ID as dictionary entries.`)
    }
    if (!translation || !translation.t || translation.k !== key) {
        
        if (process?.env.NODE_ENV === 'development' || process?.env.NODE_ENV === 'test') {
            throw new Error(
                `<T id="${id}"> is used in a client component without a valid corresponding translation. This can cause Next.js hydration errors.`
                + `\n\nYour current environment: "${process?.env.NODE_ENV}". In production, this error will display as a warning only, and content will be rendered in your default language.`
                + `\n\nTo fix this error, consider using a getGT() dictionary pattern or pushing translations from the command line in advance.`
            );
        }

        console.warn(`<T id="${id}"> is used in a client component without a valid corresponding translation.`);
        const defaultChildren = renderDefaultChildren({
            children: taggedChildren,
            variables, variablesOptions, defaultLocale
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
        variables, variablesOptions, locales: [locale, defaultLocale]
    }) as JSX.Element;
}