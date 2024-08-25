import React from "react";
import getEntryMetadata from "./getEntryMetadata";

export default function getEntryTranslationType(entry: any): "t" | "plural" | "intl" {
    const { entry: content, metadata } = getEntryMetadata(entry);
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
        ) return "plural";
    }
    if (typeof content === 'string') {
        return "intl"
    }
    return "t"
}