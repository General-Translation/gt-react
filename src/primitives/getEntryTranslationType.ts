import React from "react";
import getEntryMetadata from "./getEntryMetadata";

export default function getEntryTranslationType(entry: any): "t" | "plural" {
    const { entry: entryContent, metadata } = getEntryMetadata(entry);
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
    if (!React.isValidElement(entryContent) && typeof entryContent === 'object') {
        const entryKeys = Object.keys(entryContent);
        if (entryKeys.every(key => 
            ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"].includes(key)
        )) return "plural";
        return "t";
    }
    return "t"
}