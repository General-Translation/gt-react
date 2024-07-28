import React from "react";
import I18NConfiguration from "../config/I18NConfiguration";

export default function createTFunction({ I18NConfig, I18N }: { I18NConfig: I18NConfiguration, I18N: any }) {
    return (id: string, options?: Record<string, any>) => {
        const entry = I18NConfig.getDictionaryEntry(id);
        return <I18N id={id} {...options}>{entry}</I18N>;
    }
}