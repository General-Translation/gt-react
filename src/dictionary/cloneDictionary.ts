import React from "react";
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";

export default function cloneDictionary(dictionary: Record<string, any>) {
    const clonedDictionary: Record<string, any> = {};
    for (const id of Object.keys(dictionary)) {
        const { entry, metadata } = getEntryMetadata(dictionary[id]);
        let clonedEntry = React.isValidElement(entry) ? React.cloneElement(entry) : structuredClone(entry);
        if (metadata) {
            let clonedMetadata = structuredClone(metadata);
            clonedDictionary[id] = [clonedEntry, clonedMetadata];
            continue;
        }
        clonedDictionary[id] = clonedEntry;
    }
    return clonedDictionary;
}