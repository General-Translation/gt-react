import React from "react";
/**
 * Flattens a nested dictionary by concatenating nested keys.
 * @param {Record<string, any>} obj - The dictionary to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Record<string, React.ReactNode>} The flattened dictionary object.
 */
export default function flattenDictionary(obj, prefix = '') {
    const flattened = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]) && !(React.isValidElement(obj[key]))) {
                Object.assign(flattened, flattenDictionary(obj[key], newKey));
            }
            else {
                flattened[newKey] = obj[key];
            }
        }
    }
    return flattened;
}
//# sourceMappingURL=flattenDictionary.js.map