import React from "react";
import Plural from "./InnerPlural"

export default function createPluralComponent(T: any, getLocale: () => string, defaultLocale: string) {
    const PluralT = ({ 
        children, 
        n, zero, one, two, few, many, other, singular, dual, plural, values,
        ...props
    }: { children?: any, [key: string]: any }) => {
        const innerProps = { n, zero, one, two, few, many, other, singular, dual, plural, values };
        const locales = [getLocale(), defaultLocale];
        return <T {...props}><Plural locales={locales} {...innerProps}>{children}</Plural></T>
    };
    PluralT.gtTransformation = "translate-plural";
    return PluralT;
}