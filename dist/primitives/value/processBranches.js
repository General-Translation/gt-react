"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = processBranches;
const react_1 = __importDefault(require("react"));
function isValidNestedGTNode(node) {
    return (node === null ||
        typeof node === 'undefined' ||
        (typeof node === 'object' && Object.keys(node).length === 1 && Object.values(node).length === 1) ||
        typeof node === 'string' ||
        typeof node === 'number' ||
        typeof node === 'boolean' ||
        react_1.default.isValidElement(node) ||
        (Array.isArray(node) && node.every(isValidNestedGTNode)));
}
function isValidGTNode(node) {
    return (node === null ||
        typeof node === 'undefined' ||
        typeof node === 'string' ||
        typeof node === 'number' ||
        typeof node === 'boolean' ||
        react_1.default.isValidElement(node) ||
        (Array.isArray(node) && node.every(isValidNestedGTNode)));
}
/**
 * Recursively processes branches of a tree structure with a given function.
 *
 * @param {any} branches The branches of the tree structure. This can be any type, but is typically an object or an array.
 * @param {Function} f The function to apply to each leaf node of the tree.
 * @returns {any} The processed tree structure with the function applied to each leaf node.
 */
function processBranches(branches, f) {
    if (isValidGTNode(branches)) {
        return f(branches);
    }
    let processedBranches = {};
    for (const key of Object.keys(branches)) {
        processedBranches[key] = processBranches(branches[key], f);
    }
    return processedBranches;
}
//# sourceMappingURL=processBranches.js.map