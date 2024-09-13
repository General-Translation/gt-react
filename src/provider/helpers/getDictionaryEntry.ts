import React from "react";
import { Dictionary, DictionaryEntry } from "../../primitives/types";

export default function getDictionaryEntry(
    dictionary: Dictionary,
    id: string
): Dictionary | DictionaryEntry {
    if (!id || typeof id !== 'string') {
        throw new Error(`Invalid dictionary id: "${id}"`)
    };
    let current: Dictionary | DictionaryEntry = dictionary;
    let dictionaryPath = id.split(".");
    for (const key of dictionaryPath) {
        if (typeof current !== 'object' || Array.isArray(current) || React.isValidElement(current)) {
            throw new Error(`Invalid dictionary id: "${id}"`)
        }
        current = (current as Dictionary)[key]
    }
    return current;
}