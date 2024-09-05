import React from "react";
import T from './T'
import I18NConfiguration from "../../config/I18NConfiguration";

export default function createTComponent(I18NConfig: I18NConfiguration) {
    const TComponent = ({ children, ...props }: { children?: any, [key: string]: any }) => {
        const locale = I18NConfig.getLocale();
        /* @ts-expect-error Server Component */
        return <T I18NConfig={I18NConfig} locale={locale} {...props}>{children}</T>
    }
    TComponent.gtTransformation = "translate";
    return TComponent;
}