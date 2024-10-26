import React from "react";
/**
 * Flattens a nested dictionary by concatenating nested keys.
 * Throws an error if two keys result in the same flattened key.
 * @param {Record<string, any>} dictionary - The dictionary to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Record<string, React.ReactNode>} The flattened dictionary object.
 * @throws {Error} If two keys result in the same flattened key.
 */
export default function flattenDictionary(dictionary, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var flattened = {};
    for (var key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            var newKey = prefix ? "".concat(prefix, ".").concat(key) : key;
            if (typeof dictionary[key] === 'object' && dictionary[key] !== null && !Array.isArray(dictionary[key]) && !(React.isValidElement(dictionary[key]))) {
                var nestedFlattened = flattenDictionary(dictionary[key], newKey);
                for (var flatKey in nestedFlattened) {
                    if (flattened.hasOwnProperty(flatKey)) {
                        throw new Error("Duplicate key found in dictionary: ".concat(flatKey));
                    }
                    flattened[flatKey] = nestedFlattened[flatKey];
                }
            }
            else {
                if (flattened.hasOwnProperty(newKey)) {
                    throw new Error("Duplicate key found in dictionary: ".concat(newKey));
                }
                flattened[newKey] = dictionary[key];
            }
        }
    }
    return flattened;
}
//# sourceMappingURL=flattenDictionary.js.map