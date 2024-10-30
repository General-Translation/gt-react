import React from "react";
import { isSameLanguage } from "generaltranslation";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import useGT from "../hooks/useGT";
import { useMemo, useLayoutEffect, useState } from "react";

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
}): JSX.Element {
    
    if (!id) {
        throw new Error(`Client-side <T> with no provided 'id' prop. Children: ${children}`)
    }

    const { variables, variablesOptions } = props;

    const { translations } = useGTContext(
        `<T id="${id}"> used on the client-side outside of <GTProvider>`
    );

    const t = useGT();

    if (!children) {
        return <React.Fragment key={id}>{t(id, { variables, ...(variablesOptions && { variablesOptions })})}</React.Fragment>;
    }

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
    const translation = translations[id];
    if (!translation || !translation.t) {
        console.error(`<T id="${id}"> is used in a client component without a corresponding translation.`);
        return renderDefaultChildren({
            children: taggedChildren,
            variables, variablesOptions, defaultLocale
        }) as JSX.Element;
    }
   
    return renderTranslatedChildren({
        source: taggedChildren, target: translation.t,
        variables, variablesOptions, locales: [locale, defaultLocale]
    }) as JSX.Element;
}