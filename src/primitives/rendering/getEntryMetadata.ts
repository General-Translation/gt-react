import { isValidElement } from "react";

// check to protect developer from consequences of their actions
// the only way this would be relevant is either:
// 1. you are rendering the dictionary on the server before passing it to GTClientProvider (why??? pass it to GTProvider unless you are using an entirely client-side React app)
// or 2. you are trying to use preprocessed string variables in the dictionary (sneaky!!!)
const isVariableObject = (obj: any) => {
    if (typeof obj === 'object') {
        if (typeof obj.key === 'string') {
            const keys = Object.keys(obj);
            if (keys.length === 1) {
                return true;
            } else if (keys.length === 2 && typeof obj.variable === 'string') {
                return true;
            }
        }
    }
    return false;
}

// Extracts metadata if it has been included in the dictionary
export default function getEntryMetadata(entry: any): {
    entry: any,
    metadata?: Record<string, any>
} {
    let content;
    let metadata;
    if (entry) {
        if (Array.isArray(entry) && entry.length === 2 && !isValidElement(entry[1]) && typeof entry[1] === 'object' && !isVariableObject(entry[1])) {
            content = entry[0];
            metadata = entry[1];
        }
    }
    if (!content) content = entry;
    return { entry: content, metadata };
}