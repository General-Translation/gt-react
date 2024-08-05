import React from "react";
import InnerNumeric from "./InnerNumeric"

export default function createNumericComponent({ T, getLocale, defaultLocale }: { T: any, getLocale: () => string, defaultLocale: string }) {
    const Numeric = ({ 
        children, 
        n, ranges, zero, one, two, few, many, other, singular, dual, plural,
        ...props
    }: { children?: any, [key: string]: any }) => {
        const innerProps = { n, ranges, zero, one, two, few, many, other, singular, dual, plural };
        const locales = [getLocale(), defaultLocale];
        return <T {...props}><InnerNumeric locales={locales} {...innerProps}>{children}</InnerNumeric></T>
    };
    Numeric.gtTransformation = "translate-numeric";
    return Numeric;
}