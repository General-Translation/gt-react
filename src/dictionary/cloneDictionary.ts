import React from "react";
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";

function cloneMetadata(metadata: Record<string, any>): Record<string, any> {
    if (React.isValidElement(metadata)) {
        return React.cloneElement(metadata);
    }
    if (typeof metadata !== 'object' || metadata === null) {
        return metadata;
    }
    const clonedObj: Record<string, any> = {};
    for (const key in metadata) {
        if (metadata.hasOwnProperty(key)) {
            clonedObj[key] = cloneMetadata(metadata[key]);
        }
    }
    return clonedObj;
}


export default function cloneDictionary(dictionary: Record<string, any>) {
    const clonedDictionary: Record<string, any> = {};
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