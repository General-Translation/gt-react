'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useMemo } from 'react';
import getValueBranch from '../../primitives/getValueBranch';
import RenderClientVariable from './RenderClientVariable';
import { GTContext } from '../ClientProvider';
import generateHash from '../../primitives/generateHash';
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
        if (!id) {
            generateHash(children).then(hash => {
                console.error(`<Value>, with children:\n\n${children}\n\nid:\n\n${hash}\n\nNo context provided. Did you mean to import the server component instead?`);
            });
        }
        else {
            console.error(`<Value>, with children:\n\n${children}\n\nid:\n\n${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        }
        return _jsx(RenderClientVariable, { variables: values ? values : undefined, children: children });
    }
    const translation = useMemo(() => { return ctx === null || ctx === void 0 ? void 0 : ctx.translate(id); }, [children, id]);
    if (!translation) {
        if (!id) {
            generateHash(children).then(hash => {
                console.warn(`<Value>, with children:\n\n${children}\n\nid:\n\n${hash}\n\nNo translation found.`);
            });
        }
        else {
            console.warn(`<Value>, with children:\n\n${children}\n\nid:\n\n${id}\n\nNo translation found.`);
        }
        return children;
    }
    const branch = useMemo(() => {
        return ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? getValueBranch(values, branches) : null) || translation;
    }, [values, branches, translation]);
    const renderedChildren = useMemo(() => {
        return _jsx(RenderClientVariable, { variables: values ? values : undefined, children: branch });
    }, [branch, values]);
    return (_jsx("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientValue.js.map