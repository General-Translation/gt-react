'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useMemo } from 'react';
import getValueBranch from '../../primitives/getValueBranch';
import RenderClientVariable from './RenderClientVariable';
import { GTContext } from '../ClientProvider';
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
export default function ClientValue({ children, id, branches, values }) {
    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`<Value>, with children:\n\n${children}\n\nid: ${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        return _jsx(RenderClientVariable, { variables: values ? values : undefined, children: children });
    }
    const defaultTranslation = useMemo(() => { return (ctx === null || ctx === void 0 ? void 0 : ctx.translate(id)) || children; }, [children, id]);
    if (!defaultTranslation) {
        console.warn(`<Value>, with children:\n\n${children}\n\nid: ${id}\n\nNo translation found.`);
        return children;
    }
    const branch = useMemo(() => {
        return ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? getValueBranch(values, branches) : null) || defaultTranslation;
    }, [values, branches, defaultTranslation]);
    const renderedChildren = useMemo(() => {
        return _jsx(RenderClientVariable, { variables: values ? values : undefined, children: branch });
    }, [branch, values]);
    return (_jsx("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientValue.js.map