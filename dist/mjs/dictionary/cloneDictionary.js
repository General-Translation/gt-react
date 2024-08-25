import React from "react";
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";
function cloneMetadata(metadata) {
    if (React.isValidElement(metadata)) {
        return React.cloneElement(metadata);
    }
    if (typeof metadata !== 'object' || metadata === null) {
        return metadata;
    }
    const clonedObj = {};
    for (const key in metadata) {
        if (metadata.hasOwnProperty(key)) {
            clonedObj[key] = cloneMetadata(metadata[key]);
        }
    }
    return clonedObj;
}
export default function cloneDictionary(dictionary) {
    const clonedDictionary = {};
    for (const id of Object.keys(dictionary)) {
        const { entry, metadata } = getEntryMetadata(dictionary[id]);
        let clonedEntry = React.isValidElement(entry) ? React.cloneElement(entry) : structuredClone(entry);
        if (metadata) {
            let clonedMetadata = cloneMetadata(metadata);
            clonedDictionary[id] = [clonedEntry, clonedMetadata];
            continue;
        }
        clonedDictionary[id] = clonedEntry;
    }
    return clonedDictionary;
}
//# sourceMappingURL=cloneDictionary.js.map