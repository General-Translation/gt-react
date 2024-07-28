import React from "react";
import CurrencyVariable from "./CurrencyVariable";

export default function createCurrencyVariableComponent(getLocale: () => string) {
    const CurrencyVariableComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = getLocale();
        return <CurrencyVariable locale={locale} {...props}>{children}</CurrencyVariable>
    }
    CurrencyVariableComponent.gtTransformation = "variable-currency";
    return CurrencyVariableComponent;
}