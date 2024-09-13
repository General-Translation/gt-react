import React from "react";

/**
 * Flattens a nested dictionary by concatenating nested keys.
 * Throws an error if two keys result in the same flattened key.
 * @param {Record<string, any>} dictionary - The dictionary to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Record<string, React.ReactNode>} The flattened dictionary object.
 * @throws {Error} If two keys result in the same flattened key.
 */
export default function flattenDictionary(dictionary: Record<string, any>, prefix: string = ''): Record<string, any> {
    const flattened: Record<string, any> = {};
    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof dictionary[key] === 'object' && dictionary[key] !== null && !Array.isArray(dictionary[key]) && !(React.isValidElement(dictionary[key]))) {
                const nestedFlattened = flattenDictionary(dictionary[key], newKey);
                for (const flatKey in nestedFlattened) {
                    if (flattened.hasOwnProperty(flatKey)) {
                        throw new Error(`Duplicate key found in dictionary: ${flatKey}`);
                    }
                    flattened[flatKey] = nestedFlattened[flatKey];
                }
            } else {
                if (flattened.hasOwnProperty(newKey)) {
                    throw new Error(`Duplicate key found in dictionary: ${newKey}`);
                }
                flattened[newKey] = dictionary[key];
            }
        }
    }
    return flattened;
}