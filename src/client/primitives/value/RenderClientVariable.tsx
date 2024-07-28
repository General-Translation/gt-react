'use client'

import React, { ReactNode, useEffect, useState } from 'react'

import ClientVariable from '../variables/ClientVariable';
import ClientNumberVariable from '../variables/ClientNumberVariable';
import ClientDateVariable from '../variables/ClientDateVariable';
import ClientCurrencyVariable from '../variables/ClientCurrencyVariable';
import defaultVariableNames from '../../../primitives/helpers/defaultVariableNames';

/**
 * Handles a single child element by cloning it with new properties if it is a valid React element,
 * or wrapping it in a React Fragment if it is a valid React node object.
 *
 * @param {any} child - The child element to handle.
 * @returns {any} The handled child element.
 */

function SingleChild({children, variables}: {children: any, variables?: Record<string, any>}): ReactNode {
    if (!children || typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') return children;
    if (React.isValidElement(children)) {
        const { props, type }: any = children;
        const transformation: string = typeof type === 'function' ? ((type as any)?.gtTransformation || '') : '';
        if (variables) {
            let value;
            let variableType;
            let name;
            let options;
            console.log(props)
            if (transformation?.startsWith("variable")) {
                variableType = transformation.split('-')?.[1] || "variable";
                name = props.name || defaultVariableNames[variableType];
                value = variables[name];
                options = props?.options || {};
            }
            else if (props && props?.['data-gt-variable-type']) {
                variableType = props['data-gt-variable-type']
                name = props['data-gt-variable-name']
                value = variables[name]
                options = props['data-gt-variable-options']
            }
            if (value !== null && typeof value !== 'undefined') {
                if (variableType === "number") {
                    return <ClientNumberVariable defaultValue={value} name={name} options={options}/>
                }
                if (variableType === "date") {
                    return <ClientDateVariable defaultValue={value} name={name} options={options}/>
                }
                if (variableType === "currency") {
                    const currency = props.currency || 'USD';
                    return <ClientCurrencyVariable defaultValue={value} name={name} currency={currency} options={options} />
                }
                return <ClientVariable defaultValue={value}  name={name}></ClientVariable>
            }
        }
        let newProps = { ...props };
        if (props?.children) {
            newProps.children = React.Children.map(props.children, child => <SingleChild variables={variables}>{child}</SingleChild>);
        }
        return React.cloneElement(children, newProps)
    }
    return children;
}

export default function RenderClientVariable({ children, variables }: { children: any, variables?: Record<string, any> }): ReactNode {
    
    const [renderedChildren, setRenderedChildren] = useState(children);

    useEffect(() => {
        setRenderedChildren(React.Children.map(children, child => <SingleChild variables={variables}>{child}</SingleChild>))
    }, [children, variables])

    return (
        <>
            {renderedChildren}
        </>
    )
}