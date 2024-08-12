import React, { ReactNode } from 'react';
import renderNumeric from '../value/renderVariable';
import getNumericBranch, { Range } from '../../primitives/getNumericBranch';

type NumericProps = {
    n?: number;
    children?: any;
    ranges?: Range[];
    locales: string[];
    [key: string]: any;
}

/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 * 
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {JSX.Element}
 */
const Numeric = ({ children, n, ranges, locales, ...branches }: NumericProps): ReactNode => {

    if (typeof n !== 'number') {
        console.warn(`WARNING: No 'n' parameter provided to <Numeric> component with children ${JSON.stringify(children)}.`)
    }

    let { 'data-generaltranslation': generaltranslation, ...otherParams }: any = branches;

    branches = { ...otherParams, ranges: ranges };
    
    let branch = ((typeof n === 'number' && branches) ? getNumericBranch(n, locales, branches) : null) || children;

    const renderedChildren = renderNumeric(branch, locales, (typeof n === 'number') ? { n } : undefined);

    return (
        <span data-n={n} data-unrendered-branches={branches} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    );

};

Numeric.gtTransformation = "numeric";

export default Numeric;