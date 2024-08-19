import React, { ReactNode } from 'react';
import renderVariable from './renderVariable';

const Value = ({ children, values, locales, ...props }: {
    locales: string[];
    children: any;
    values: Record<string, any>
    'data-generaltranslation'?: any;
}): ReactNode => {

    let { 'data-generaltranslation': generaltranslation }: any = props;

    if (!values || Object.keys(values).length < 1) {
        console.warn(`WARNING: No values provided to <Value> component with children ${children}.`)
    }

    const renderedChildren = renderVariable(children, locales, values ? values : undefined);

    return (
        <span data-values={values} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    )

};

Value.gtTransformation = "value";

export default Value;