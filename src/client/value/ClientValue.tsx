'use client'

import React, { ReactNode } from 'react';
import RenderClientVariable from './RenderClientVariable';
import createValues from '../../primitives/variables/createValues';

/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 * 
 * @param {ReactNode} children - Default children to render if no branches match.
 * @param {Record<string, any>} values - Values to branch and translate around.
 * @returns {ReactNode}
 */
const ClientValue = ({ children, values }: {
    children?: any;
    values: Record<string, any>;
}): ReactNode => {

    return (
        <RenderClientVariable variables={createValues(undefined, values)}>
            {children}
        </RenderClientVariable>
    );

};

export default ClientValue;