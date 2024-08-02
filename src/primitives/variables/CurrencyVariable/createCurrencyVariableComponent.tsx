import React from "react";
import CurrencyVariable from "./CurrencyVariable";

export default function createCurrencyVariableComponent(getLocale: () => string, defaultLocale: string) {
    const CurrencyVariableComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <CurrencyVariable locales={locales} {...props}>{children}</CurrencyVariable>
    }
    CurrencyVariableComponent.gtTransformation = "variable-currency";
    return CurrencyVariableComponent;
}