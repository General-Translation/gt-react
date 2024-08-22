import { ReactNode } from "react";

// Extracts metadata if it has been included in the dictionary
export default function getEntryMetadata(entry: any): {
    entry: any,
    metadata?: Record<string, any>
} {
    let metadata;
    if (entry) {
        if (Array.isArray(entry)) {
            if (typeof entry?.[1] === 'object') {
                metadata = entry[1];
            }
            entry = entry[0];
        }
    }
    return { entry, metadata };
}