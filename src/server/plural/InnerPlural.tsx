import React, { ReactNode } from 'react';
import renderPlural from '../value/renderVariable';
import getPluralBranch, { Range } from '../../primitives/getPluralBranch';
import createValues from '../../primitives/createValues';

const Plural = ({ 
    locales, children, n, ranges,  
    zero, one, two, few, many, other, singular, plural, dual, 
    values,
    ...props
}: {
    locales: string[];
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
    'data-generaltranslation'?: any;
}): ReactNode => {

    if (typeof n !== 'number') {
        console.warn(`WARNING: No 'n' parameter provided to <Plural> component with children ${JSON.stringify(children)}.`)
    }

    const { 'data-generaltranslation': generaltranslation }: any = props;

    const branches = Object.fromEntries(
        Object.entries({ ranges, zero, one, two, few, many, other, singular, plural, dual })
            .filter(([_, value]) => value !== undefined)
    );

    const branch = ((typeof n === 'number' && branches) ? getPluralBranch(n, locales, branches) : null) || children;

    const renderedChildren = renderPlural(branch, locales, createValues(n, values));

    return (
        <span data-unrendered-branches={branches} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    );

};

Plural.gtTransformation = "plural";

export default Plural;