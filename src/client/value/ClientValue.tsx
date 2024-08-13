'use client'

import React, { ReactNode, useContext, useMemo } from 'react';
import getValueBranch from '../../primitives/getValueBranch';
import RenderClientVariable from './RenderClientVariable';
import { GTContext } from '../ClientProvider';

// ValueProps type
type ValueProps = {
    children?: any;
    id?: string;
    branches?: Record<string, any>;
    values?: Record<string, any>;
}

/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 * 
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
export default function ClientValue({ children, id, branches, values }: ValueProps): ReactNode {

    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`<Value>, with children:\n\n${children}\n\nid: ${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        return <RenderClientVariable variables={values ? values : undefined}>{children}</RenderClientVariable>;
    }
    
    const translation = useMemo(() => { return ctx?.translate(id) }, [children, id]);
    if (!translation) {
        console.warn(`<Value>, with children:\n\n${children}\n\nid: ${id}\n\nNo translation found.`);
        return children;
    }

    const branch = useMemo(() => {
        return ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? getValueBranch(values, branches) : null) || translation;
    }, [values, branches, translation])

    const renderedChildren = useMemo(() => {
        return <RenderClientVariable variables={values ? values : undefined}>{branch}</RenderClientVariable>
    }, [branch, values])

    return (
        <span>
            {renderedChildren}
        </span>
    )

};