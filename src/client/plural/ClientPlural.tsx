'use client'

import React, { ReactNode, useMemo } from 'react';
import getPluralBranch, { Range } from '../../primitives/variables/getPluralBranch';
import RenderClientVariable from '../value/RenderClientVariable';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
import { useGTContext } from '../ClientProvider';
import createValues from '../../primitives/variables/createValues';

/**
 * Plural component that processes a given number and renders the appropriate branch or children.
 * 
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
export default function ClientPlural({ children, n, values, ranges, ...branches }: {
    children?: any;
    n: number;
    ranges?: Range[];
    zero?: any;
    one?: any;
    two?: any;
    few?: any;
    many?: any;
    other?: any;
    singular?: any;
    dual?: any;
    plural?: any;
    values?: Record<string, any>;
}): ReactNode {

    const locales = [useLocale(), useDefaultLocale()]; // user's language

    return (
        <RenderClientVariable variables={createValues(n, values)}>
            {((typeof n === 'number' && { ...branches, ranges }) ? getPluralBranch(n, locales, { ...branches, ranges }) : null) || children}
        </RenderClientVariable>
    )

};