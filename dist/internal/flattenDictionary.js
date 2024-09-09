"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = flattenDictionary;
var react_1 = __importDefault(require("react"));
/**
 * Flattens a nested dictionary by concatenating nested keys.
 * @param {Record<string, any>} dictionary - The dictionary to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Record<string, React.ReactNode>} The flattened dictionary object.
 */
function flattenDictionary(dictionary, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var flattened = {};
    for (var key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            var newKey = prefix ? "".concat(prefix, ".").concat(key) : key;
            if (typeof dictionary[key] === 'object' && dictionary[key] !== null && !Array.isArray(dictionary[key]) && !(react_1.default.isValidElement(dictionary[key]))) {
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