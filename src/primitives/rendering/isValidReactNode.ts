import React, { ReactNode } from "react";

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
export default function isValidReactNode(node: any): node is ReactNode {
    return (
      typeof node === 'string' ||
      typeof node === 'number' ||
      typeof node === 'boolean' ||
      React.isValidElement(node) ||
      (Array.isArray(node) && node.every(isValidReactNode))
    );
}
