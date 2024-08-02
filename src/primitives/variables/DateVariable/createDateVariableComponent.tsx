import React from "react";
import DateVariable from "./DateVariable";

export default function createDateVariableComponent(getLocale: () => string, defaultLocale: string) {
    const DateVariableComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <DateVariable locales={locales} {...props}>{children}</DateVariable>
    }
    DateVariableComponent.gtTransformation = "variable-date"
    return DateVariableComponent;
}