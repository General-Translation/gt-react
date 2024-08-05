import React from "react";
import Num from "./Num";

export default function createNumComponent(getLocale: () => string, defaultLocale: string) {
    const NumComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <Num locales={locales} {...props}>{children}</Num>
    }
    // Assign a static property to the returned function
    NumComponent.gtTransformation = "variable-number";
    return NumComponent;
}