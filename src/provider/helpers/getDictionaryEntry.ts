import React from "react";
import { Dictionary, DictionaryEntry } from "../../types/types";
import { createLibraryNoEntryWarning } from "../../messages/createMessages";

export default function getDictionaryEntry(
    dictionary: Dictionary,
    id: string
): Dictionary | DictionaryEntry | undefined {
    if (id === '') {
        console.error(createLibraryNoEntryWarning(id))
        return undefined;
    };
    let current: Dictionary | DictionaryEntry = dictionary;
    let dictionaryPath = id.split(".");
    for (const key of dictionaryPath) {
        if (typeof current !== 'object' || Array.isArray(current) || React.isValidElement(current)) {
            console.error(createLibraryNoEntryWarning(id))
            return undefined;
        }
        current = (current as Dictionary)[key];
    }
    return current; 
}