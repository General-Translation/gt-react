import React from "react";
import I18NConfiguration from "../config/I18NConfiguration";

export default function createTFunction({ I18NConfig, I18N, intl }: { I18NConfig: I18NConfiguration, I18N: any, intl: any }) {
    return (id: string, options?: Record<string, any>): JSX.Element | Promise<string> => {
        const entry = I18NConfig.getDictionaryEntry(id);
        if (typeof entry === 'string') return intl(entry, { id, ...options })
        return <I18N id={id} {...options}>{entry}</I18N>;
    }
}