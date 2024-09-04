import React, { ReactNode } from "react";
import Value from "./InnerValue"

export default function createValueComponent(T: any, getLocale: () => string, defaultLocale: string) {
    const ValueT = ({ children, values, ...props }: { children?: any, values: Record<string, any>, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <T {...props}><Value locales={locales} values={values}>{children}</Value></T>
    };
    ValueT.gtTransformation = "translate-value";
    return ValueT;
}