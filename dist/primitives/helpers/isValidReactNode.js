"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isValidReactNode;
const react_1 = __importDefault(require("react"));
/**
 * Type guard to determine if a given node is a valid ReactNode. Excludes null and undefined nodes.
 * A ReactNode can be:
 * - string
 * - number
 * - boolean
 * - a valid React element
 * - an array of valid ReactNodes
 *
 * @param {any} node - The node to check.
 * @returns {node is ReactNode} - True if the node is a valid ReactNode, false otherwise.
 */
function isValidReactNode(node) {
    return (typeof node === 'string' ||
        typeof node === 'number' ||
        typeof node === 'boolean' ||
        react_1.default.isValidElement(node) ||
        (Array.isArray(node) && node.every(isValidReactNode)));
}
//# sourceMappingURL=isValidReactNode.js.map