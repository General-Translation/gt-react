import React from "react";
import Value from "./InnerValue"

export default function createValueComponent({ T, getLocale, defaultLocale }: { T: any; getLocale: () => string; defaultLocale: string}) {
    const ValueT = ({ children, values, branches, ...props }: { children?: any, [key: string]: any }) => {
        const innerProps = { values, branches }
        const locales = [getLocale(), defaultLocale];
        return <T {...props}><Value locales={locales} {...innerProps}>{children}</Value></T>
    };
    ValueT.gtTransformation = "translate-value";
    return ValueT;
}