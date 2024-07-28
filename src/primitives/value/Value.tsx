import 'server-only'

import React, { ReactNode } from 'react';
import renderVariable from './renderVariable';
import getValueBranch from '../helpers/getValueBranch';

// ValueProps type
type ValueProps = {
    locale: string;
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
const Value = ({ children, branches, values, locale, ...props }: ValueProps): ReactNode => {

    let { 'data-generaltranslation': generaltranslation }: any = props;

    if (!values || Object.keys(values).length < 1) {
        console.warn(`WARNING: No values provided to <Value> component with children ${JSON.stringify(children)}.`)
    }

    let branch = ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? getValueBranch(values, branches) : null) || children;
    
    let renderedChildren = renderVariable(branch, locale, values ? values : undefined);

    return (
        <span data-values={values} data-unrendered-branches={branches} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    )

};

Value.gtTransformation = "value";

export default Value;