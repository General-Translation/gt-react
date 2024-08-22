'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import RenderClientVariable from './RenderClientVariable';
import { useGTContext } from '../ClientProvider';
import createValues from '../../primitives/createValues';
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
export default function ClientValue({ children, id, values }) {
    let translate;
    try {
        ({ translate } = useGTContext());
    }
    catch (_a) {
        throw new Error(`No context provided to <ClientValue> with children: ${children} id: ${id}. Did you mean to import the server component instead?`);
    }
    const defaultTranslation = useMemo(() => {
        return translate(id) || children;
    }, [children, id]);
    if (!defaultTranslation) {
        console.warn(`<ClientValue>, with children: ${children} id: ${id} - No translation found.`);
        return children;
    }
    const renderedChildren = useMemo(() => {
        return _jsx(RenderClientVariable, { variables: createValues(undefined, values), children: defaultTranslation });
    }, [defaultTranslation, values]);
    return (_jsx("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientValue.js.map