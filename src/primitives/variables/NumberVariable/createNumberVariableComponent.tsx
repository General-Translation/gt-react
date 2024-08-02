import React from "react";
import NumberVariable from "./NumberVariable";

export default function createNumberVariableComponent(getLocale: () => string, defaultLocale: string) {
    const NumberVariableComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <NumberVariable locales={locales} {...props}>{children}</NumberVariable>
    }
    // Assign a static property to the returned function
    NumberVariableComponent.gtTransformation = "variable-number";
    return NumberVariableComponent;
}