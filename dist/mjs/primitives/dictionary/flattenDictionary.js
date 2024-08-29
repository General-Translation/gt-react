import React from "react";
/**
 * Flattens a nested dictionary by concatenating nested keys.
 * @param {Record<string, any>} dictionary - The dictionary to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Record<string, React.ReactNode>} The flattened dictionary object.
 */
export default function flattenDictionary(dictionary, prefix = '') {
    const flattened = {};
    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof dictionary[key] === 'object' && dictionary[key] !== null && !Array.isArray(dictionary[key]) && !(React.isValidElement(dictionary[key]))) {
                Object.assign(flattened, flattenDictionary(dictionary[key], newKey));
            }
            else {
                flattened[newKey] = dictionary[key];
            }
        }
    }
    return flattened;
}
//# sourceMappingURL=flattenDictionary.js.map