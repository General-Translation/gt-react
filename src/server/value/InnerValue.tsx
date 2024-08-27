import React, { ReactNode } from 'react';
import renderVariable from './renderVariable';
import createValues from '../../primitives/variables/createValues';

const Value = ({ children, values, locales, ...props }: {
    locales?: string[];
    children?: any;
    values?: Record<string, any>
    'data-generaltranslation'?: any;
}): ReactNode => {

    if (!values || !locales) return children;

    let { 'data-generaltranslation': generaltranslation }: any = props;

    const renderedChildren = renderVariable(children, locales, values);
    
    return (
        <span data-values={values} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    )

};

export default Value;