import React from "react";
import DateVariable from "./DateVariable";

export default function createDateVariableComponent(getLocale: () => string) {
    const DateVariableComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = getLocale();
        return <DateVariable locale={locale} {...props}>{children}</DateVariable>
    }
    DateVariableComponent.gtTransformation = "variable-date"
    return DateVariableComponent;
}