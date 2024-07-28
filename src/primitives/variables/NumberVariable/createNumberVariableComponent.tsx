import React from "react";
import NumberVariable from "./NumberVariable";

export default function createNumberVariableComponent(getLocale: () => string) {
    const NumberVariableComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = getLocale();
        return <NumberVariable locale={locale} {...props}>{children}</NumberVariable>
    }
    // Assign a static property to the returned function
    NumberVariableComponent.gtTransformation = "variable-number";
    return NumberVariableComponent;
}