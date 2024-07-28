import React from "react";
import ServerI18N from "./ServerI18N";
import I18NConfiguration from "../config/I18NConfiguration";

export default function createI18NComponent({
    I18NConfig, ...metadata
}: { I18NConfig: I18NConfiguration, [key: string]: any }) {
    return ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = I18NConfig.getLocale();
        /* @ts-expect-error Server Component */
        return <ServerI18N I18NConfig={I18NConfig} locale={locale} {...metadata} {...props}>{children}</ServerI18N>
    }
}