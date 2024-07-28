import React from 'react'
import isValidReactNode from '../helpers/isValidReactNode';
import Variable from '../variables/Variable/Variable';
import CurrencyVariable from '../variables/CurrencyVariable/CurrencyVariable';
import NumberVariable from '../variables/NumberVariable/NumberVariable';
import DateVariable from '../variables/DateVariable/DateVariable';
import defaultVariableNames from '../helpers/defaultVariableNames';

/**
 * Handles a single child element by cloning it with new properties if it is a valid React element,
 * or wrapping it in a React Fragment if it is a valid React node object.
 *
 * @param {any} child - The child element to handle.
 * @returns {any} The handled child element.
 */
const handleSingleChild = (child: any, locale: string, variables?: Record<string, any>): any =>  {
    if (React.isValidElement(child)) {
        const { props, type }: any = child;  
        // Check if a variable component
        const transformation: string = typeof type === 'function' ? ((type as any)?.gtTransformation || '') : '';
        if (variables && transformation?.startsWith("variable")) {
            const variableType = transformation.split('-')?.[1] || "variable";
            const name = props.name || defaultVariableNames[variableType];
            const value = variables[name];
            const options = props?.options || {};
            if (variableType === "number") {
                return <NumberVariable locale={locale} defaultValue={value} name={name} options={options}/>
            }
            if (variableType === "date") {
                return <DateVariable locale={locale} defaultValue={value} name={name} options={options}/>
            }
            if (variableType === "currency") {
                return <CurrencyVariable locale={locale} defaultValue={value} name={name} options={options}/>
            }
            return <Variable defaultValue={value} name={name} />
        }
        let newProps = { ...props };
        
        if (props?.children) {
            newProps.children = renderVariable(props.children, locale, variables);
        }
        return React.cloneElement(child, newProps)
    }
    if (isValidReactNode(child)) return child;
}

/**
 * Recursively renders a variable structure of children, handling arrays of children and single child elements.
 *
 * @param {any} children - The children elements to render.
 * @param {string} locale - The user's locale.
 * @returns {any} The rendered children elements.
 */
export default function renderVariable(children: any, locale: string, variables?: Record<string, any>): any {
    if (Array.isArray(children)) return children.map((child: any, index: number) => <React.Fragment key={index}>{handleSingleChild(child, locale, variables)}</React.Fragment>);
    else return handleSingleChild(children, locale, variables)
}