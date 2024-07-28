import React from "react";
import Numeric from "./Numeric"

export default function createNumericComponent(getLocale: () => string) {
    const NumericComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = getLocale();
        return <Numeric locale={locale} {...props}>{children}</Numeric>
    };
    NumericComponent.gtTransformation = "numeric";
    return NumericComponent;
}