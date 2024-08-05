import React from "react";
import DateTime from "./DateTime";

export default function createDateTimeComponent(getLocale: () => string, defaultLocale: string) {
    const DateTimeComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locales = [getLocale(), defaultLocale];
        return <DateTime locales={locales} {...props}>{children}</DateTime>
    }
    DateTimeComponent.gtTransformation = "variable-date"
    return DateTimeComponent;
}