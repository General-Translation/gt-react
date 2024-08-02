import React from "react";
import Numeric from "./Numeric"

export default function createNumericComponent(getLocale: () => string, defaultLocale: string) {
    const NumericComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <Numeric locales={locales} {...props}>{children}</Numeric>
    };
    NumericComponent.gtTransformation = "numeric";
    return NumericComponent;
}