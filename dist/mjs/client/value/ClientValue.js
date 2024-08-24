'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import RenderClientVariable from './RenderClientVariable';
import createValues from '../../primitives/variables/createValues';
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {ReactNode} children - Default children to render if no branches match.
 * @param {Record<string, any>} values - Values to branch and translate around.
 * @returns {ReactNode}
 */
export default function ClientValue({ children, values }) {
    return (_jsx(RenderClientVariable, { variables: createValues(undefined, values), children: children }));
}
;
//# sourceMappingURL=ClientValue.js.map