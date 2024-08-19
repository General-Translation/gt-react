import React, { ReactNode } from 'react';
import renderNumeric from '../value/renderVariable';
import getNumericBranch, { Range } from '../../primitives/getNumericBranch';

const Numeric = ({ 
    locales, children, n, ranges,  
    zero, one, two, few, many, other, singular, plural, dual, ...props
}: {
    locales: string[];
    children: any;
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
    'data-generaltranslation'?: any;
}): ReactNode => {

    if (typeof n !== 'number') {
        console.warn(`WARNING: No 'n' parameter provided to <Numeric> component with children ${JSON.stringify(children)}.`)
    }

    const { 'data-generaltranslation': generaltranslation }: any = props;

    const branches = Object.fromEntries(
        Object.entries({ ranges, zero, one, two, few, many, other, singular, plural, dual })
            .filter(([_, value]) => value !== undefined)
    );

    const branch = ((typeof n === 'number' && branches) ? getNumericBranch(n, locales, branches) : null) || children;

    const renderedChildren = renderNumeric(branch, locales, (typeof n === 'number') ? { n } : undefined);

    return (
        <span data-n={n} data-unrendered-branches={branches} data-generaltranslation={generaltranslation}>
            {renderedChildren}
        </span>
    );

};

Numeric.gtTransformation = "numeric";

export default Numeric;