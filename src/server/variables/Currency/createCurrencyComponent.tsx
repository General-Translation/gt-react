import React from "react";
import Currency from "./Currency";

export default function createCurrencyComponent(getLocale: () => string, defaultLocale: string) {
    const CurrencyComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <Currency locales={locales} {...props}>{children}</Currency>
    }
    CurrencyComponent.gtTransformation = "variable-currency";
    return CurrencyComponent;
}