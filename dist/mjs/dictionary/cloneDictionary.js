import React from "react";
import getEntryMetadata from "../primitives/getEntryMetadata";
export default function cloneDictionary(dictionary) {
    const clonedDictionary = {};
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
//# sourceMappingURL=cloneDictionary.js.map