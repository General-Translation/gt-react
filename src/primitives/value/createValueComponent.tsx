import React from "react";
import Value from "./Value"
import I18NConfiguration from "../../config/I18NConfiguration";

export default function createValueComponent(getLocale: () => string, defaultLocale: string) {
    const ValueComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <Value locales={locales} {...props}>{children}</Value>
    }
    ValueComponent.gtTransformation = "value";
    return ValueComponent;
}