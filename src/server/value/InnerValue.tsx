import React, { ReactNode } from 'react';
import renderVariable from './renderVariable';
import createValues from '../../primitives/createValues';

const Value = ({ children, values, locales, ...props }: {
    locales?: string[];
    children?: any;
    values?: Record<string, any>
    'data-generaltranslation'?: any;
}): ReactNode => {

    if (!values || !locales) return children;

    let { 'data-generaltranslation': generaltranslation }: any = props;

    const renderedChildren = renderVariable(children, locales, createValues(undefined, values));

    return (
        <span data-values={values} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    )

};

Value.gtTransformation = "value";

export default Value;