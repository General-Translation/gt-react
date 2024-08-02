'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import getValueBranch from '../../../primitives/helpers/getValueBranch';
import RenderClientVariable from './RenderClientVariable';
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
export default function ClientValue({ children, branches, values }) {
    const branch = useMemo(() => {
        return ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? getValueBranch(values, branches) : null) || children;
    }, [values, branches, children]);
    const renderedChildren = useMemo(() => {
        return _jsx(RenderClientVariable, { variables: values ? values : undefined, children: branch });
    }, [branch, values]);
    return (_jsx("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientValue.js.map