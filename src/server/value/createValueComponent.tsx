import React from "react";
import InnerValue from "./InnerValue"

export default function createValueComponent({ T, getLocale, defaultLocale }: { T: any; getLocale: () => string; defaultLocale: string}) {
    const Value = ({ children, values, branches, ...props }: { children?: any, [key: string]: any }) => {
        const innerProps = { values, branches }
        const locales = [getLocale(), defaultLocale];
        return <T {...props}><InnerValue locales={locales} {...innerProps}>{children}</InnerValue></T>
    };
    Value.gtTransformation = "translate-value";
    return Value;
}