import React from "react";
import Numeric from "./InnerNumeric"

export default function createNumericComponent({ T, getLocale, defaultLocale }: { T: any, getLocale: () => string, defaultLocale: string }) {
    const NumericT = ({ 
        children, 
        n, ranges, zero, one, two, few, many, other, singular, dual, plural,
        ...props
    }: { children?: any, [key: string]: any }) => {
        const innerProps = { n, ranges, zero, one, two, few, many, other, singular, dual, plural };
        const locales = [getLocale(), defaultLocale];
        return <T {...props}><Numeric locales={locales} {...innerProps}>{children}</Numeric></T>
    };
    NumericT.gtTransformation = "translate-numeric";
    return NumericT;
}