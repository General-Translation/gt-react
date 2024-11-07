import React from "react";
import { Dictionary, DictionaryEntry } from "../../primitives/types";

export default function getDictionaryEntry(
    dictionary: Dictionary,
    id: string
): Dictionary | DictionaryEntry {
    if (!id || typeof id !== 'string') {
        console.error(`Invalid dictionary id: "${id}"`)
        return undefined;
    };
    let current: Dictionary | DictionaryEntry = dictionary;
    let dictionaryPath = id.split(".");
    for (const key of dictionaryPath) {
        if (typeof current !== 'object' || Array.isArray(current) || React.isValidElement(current)) {
            console.error(`Invalid dictionary id: "${id}"`)
            return undefined;
        }
        current = (current as Dictionary)[key]
    }
    return current;
}