import React from "react";

import I18NConfiguration from "../../config/I18NConfiguration";
import GTProvider from "./GTProvider";

export default function createGTProviderComponent({
    I18NConfig, executeT, ...metadata
}: { I18NConfig: I18NConfiguration, executeT: any, [key: string]: any }) {
    return ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = I18NConfig.getLocale();
        const defaultLocale = I18NConfig.getDefaultLocale();
        /* @ts-expect-error Server Component */
        return <GTProvider locale={locale} defaultLocale={defaultLocale} {...metadata} {...props} I18NConfig={I18NConfig} executeT={executeT}>{children}</GTProvider>
    }
}