'use client'

import React, { ReactNode,  useMemo } from 'react';
import getNumericBranch, { Range } from '../../../primitives/helpers/getNumericBranch';
import RenderClientVariable from '../value/RenderClientVariable';
import useLocale from '../../hooks/useLocale';

type NumericProps = {
    n?: number;
    children?: any;
    ranges?: Range[];
    [key: string]: any;
}

/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 * 
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
export default function ClientNumeric({ children, n, ranges, ...branches }: NumericProps): ReactNode {

    const completeBranches = useMemo(() => {
        return { ...branches, ranges };
    }, [branches, ranges])

    const locale = useLocale(); // user's language

    const branch = useMemo(() => {
        return ((typeof n === 'number' && completeBranches) ? getNumericBranch(n, locale, completeBranches) : null) || children;
    }, [n, completeBranches, children, locale])

    const renderedChildren = useMemo(() => {
        return <RenderClientVariable variables={(typeof n === 'number') ? { n } : undefined}>{branch}</RenderClientVariable>
    }, [n, branch])

    console.log(renderedChildren)

    return (
        <span>
            {renderedChildren}
        </span>
    );

};