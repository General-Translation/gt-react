import React, { ReactNode } from 'react';
import renderVariable from './renderVariable';
import getValueBranch from '../../primitives/getValueBranch';

// ValueProps type
type ValueProps = {
    locales: string[];
    children?: any;
    branches?: Record<string, any>;
    values?: Record<string, any>
    [key: string]: any;
}

/**
 * Value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 * 
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {JSX.Element}
 */
const InnerValue = ({ children, branches, values, locales, ...props }: ValueProps): ReactNode => {

    let { 'data-generaltranslation': generaltranslation }: any = props;

    if (!values || Object.keys(values).length < 1) {
        console.warn(`WARNING: No values provided to <Value> component with children ${JSON.stringify(children)}.`)
    }

    let branch = ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? getValueBranch(values, branches) : null) || children;
    
    let renderedChildren = renderVariable(branch, locales, values ? values : undefined);

    return (
        <span data-values={values} data-unrendered-branches={branches} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    )

};

InnerValue.gtTransformation = "value";

export default InnerValue;