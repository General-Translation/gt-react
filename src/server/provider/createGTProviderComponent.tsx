import React from "react";

import I18NConfiguration from "../../config/I18NConfiguration";
import GTProvider from "./GTProvider";

export default function createGTProviderComponent(I18NConfig: I18NConfiguration) {
    return ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = I18NConfig.getLocale();
        const dictionaryName = I18NConfig.getDictionaryName();
        const defaultLocale = I18NConfig.getDefaultLocale();
        const shouldStore = I18NConfig.shouldStore() ?? true;
        /* @ts-expect-error Server Component */
        return <GTProvider locale={locale} dictionaryName={dictionaryName} defaultLocale={defaultLocale} shouldStore={shouldStore} {...props} I18NConfig={I18NConfig}>{children}</GTProvider>
    }
}