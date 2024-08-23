import { ReactNode } from "react";

// Extracts metadata if it has been included in the dictionary
export default function getEntryMetadata(entry: any): {
    entry: any,
    metadata?: Record<string, any>
} {
    let content;
    let metadata;
    if (entry) {
        if (Array.isArray(entry)) {
            if (typeof entry?.[1] === 'object') {
                metadata = entry[1];
            }
            content = entry[0];
        }
    }
    if (!content) content = entry;
    return { entry: content, metadata };
}