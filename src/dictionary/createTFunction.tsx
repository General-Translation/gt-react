import React from "react";
import I18NConfiguration from "../config/I18NConfiguration";

export default function createTFunction({ I18NConfig, T, intl }: { I18NConfig: I18NConfiguration, T: any, intl: any }) {
    return (id: string, options?: Record<string, any>): JSX.Element | Promise<string> => {
        const entry = I18NConfig.getDictionaryEntry(id);
        if (typeof entry === 'string') return intl(entry, { id, ...options })
        return <T id={id} {...options}>{entry}</T>;
    }
}