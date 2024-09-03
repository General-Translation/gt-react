import { isValidElement } from "react";

// Extracts metadata if it has been included in the dictionary
export default function getEntryMetadata(entry: any): {
    entry: any,
    metadata?: Record<string, any>
} {
    let content;
    let metadata;
    if (entry) {
        if (Array.isArray(entry) && entry.length === 2 && !isValidElement(entry[1]) && typeof entry[1] === 'object') {
            content = entry[0];
            metadata = entry[1];
        }
    }
    if (!content) content = entry;
    return { entry: content, metadata };
}