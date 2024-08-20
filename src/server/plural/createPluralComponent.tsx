import React from "react";
import Plural from "./InnerPlural"

export default function createPluralComponent({ T, getLocale, defaultLocale }: { T: any, getLocale: () => string, defaultLocale: string }) {
    const PluralT = ({ 
        children, 
        n, ranges, zero, one, two, few, many, other, singular, dual, plural,
        ...props
    }: { children?: any, [key: string]: any }) => {
        const innerProps = { n, ranges, zero, one, two, few, many, other, singular, dual, plural };
        const locales = [getLocale(), defaultLocale];
        return <T {...props}><Plural locales={locales} {...innerProps}>{children}</Plural></T>
    };
    PluralT.gtTransformation = "translate-plural";
    return PluralT;
}