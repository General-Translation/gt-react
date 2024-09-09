import React from "react";
import getEntryMetadata from "./getEntryMetadata";

type TranslationType = {
    isFunction: true,
    type: "t" | "plural"
} | {
    isFunction: false,
    type: "t" | "plural" | "string"
}

export default function getEntryTranslationType(entry: any): TranslationType {
    let result: TranslationType = {
        isFunction: false,
        type: "t"
    };
    const { entry: content, metadata } = getEntryMetadata(entry);
    if (typeof content === 'string') {
        return {
            ...result,
            type: "string"
        };
    }
    if (metadata) {
        if (
           metadata.singular
           || metadata.plural
           || metadata.dual
           || metadata.zero
           || metadata.one
           || metadata.two
           || metadata.few
           || metadata.many
           || metadata.other
        ) result.type = "plural";
    }
    if (typeof content === 'function') {
        result = {
            ...result,
            isFunction: true
        } as TranslationType;
    }
    return result;
}