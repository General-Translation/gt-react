import React from "react";
import Value from "./Value"
import I18NConfiguration from "../../config/I18NConfiguration";

export default function createValueComponent(getLocale: () => string) {
    const ValueComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = getLocale();
        return <Value locale={locale} {...props}>{children}</Value>
    }
    ValueComponent.gtTransformation = "value";
    return ValueComponent;
}