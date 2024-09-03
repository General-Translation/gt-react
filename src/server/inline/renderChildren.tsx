import React, { isValidElement, ReactElement, ReactNode } from 'react'
import getPluralBranch from '../../primitives/variables/getPluralBranch';
import isValidReactNode from '../../primitives/rendering/isValidReactNode';
import Var from '../variables/Var/Var';
import DateTime from '../variables/DateTime/DateTime';
import Num from '../variables/Num/Num';
import Currency from '../variables/Currency/Currency';
import { Target, TargetElement, Source, SourceChild } from '../../types/SourceTargetTypes';
import isTargetVariable from '../../primitives/variables/isTargetVariable';
import getVariableProps from '../../primitives/variables/getVariableProps';

/**
 * Renders a React element based on the provided source and target elements.
 * Handles transformation and variable branching if necessary.
 * 
 * @param {ReactElement} sourceElement - The original React element to be rendered.
 * @param {TargetElement} targetElement - The target element that may alter the rendering of the source element.
 * @param {Record<string, Source>} variables - An optional set of variables for transformations and branching.
 * 
 * @returns {ReactElement} The rendered React element.
 */
const renderElement = ({ sourceElement, targetElement, ...metadata }: { sourceElement: ReactElement, targetElement: TargetElement, variables?: Record<string, Source>, [key: string]: any }): ReactElement => {

    const { props } = sourceElement;

    if (props.children) {

        const { 'data-generaltranslation': generaltranslation } = props;
        const targetProps: Record<string, any> | null = targetElement?.props || null;
        const targetChildren = targetProps?.children;
        const targetBranches = targetProps?.['data-generaltranslation']?.branches;

        // If an alternative branch (from a transformation) is necessary
        if (generaltranslation?.transformation && targetBranches) {

            const transformation = generaltranslation.transformation;
            
            // handle number variable branching
            if (transformation === "plural") {

                const { 'data-generaltranslation': generaltranslation, n, ...branches } = props; // 'data-generaltranslation' necessary here to fully destructure relevant ...branches
                const sourceBranch = getPluralBranch(n, [metadata.locale, metadata.defaultLocale], branches) || props.children;
                const targetBranch = getPluralBranch(n, [metadata.locale, metadata.defaultLocale], targetBranches) || targetChildren;
            
                const children = renderChildren({source: sourceBranch, target: targetBranch, variables: { ...metadata.variables, n: n }, ...metadata});
                
                return React.createElement('span', {
                    children: children
                });

            }

        }

        // otherwise, just clone the element
        return React.cloneElement(sourceElement, {
            ...props,
            children: renderChildren({ source: props.children, target: targetChildren, ...metadata} )
        });
    }

    return React.cloneElement(sourceElement, { ...(sourceElement?.props || {}) });
}

/**
 * Renders children elements based on the provided source and target.
 * Handles transformations and branching for number and value variables.
 * 
 * @param {Source} source - The source elements to be rendered.
 * @param {Target} [target] - The target elements that may alter the rendering of the source.
 * @param {Record<string, Source>} [variables] - An optional set of variables for transformations and branching.
 * 
 * @returns {ReactNode} The rendered children elements.
 */
export default function renderChildren({
    source, target, ...metadata
}: {
    source: Source, 
    target?: Target,
    variables?: Record<string, Source>,
    [key: string]: any
}): ReactNode {

    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && isValidReactNode(source)) return source;
    if (typeof target !== null && typeof target !== 'undefined' && isValidReactNode(target)) return target;

    // If target and source are both arrays of children
    if (Array.isArray(source) && Array.isArray(target)) {

        // Filter for variables and valid source children
        let validSourceElements: Source[] = [];
        for (const sourceChild of source) {
            if (isValidElement(sourceChild)) {
                const { props } = sourceChild;
                if (props?.['data-generaltranslation']?.transformation === "variable") {
                    const { variableName, variableValue, variableOptions } = getVariableProps(props);
                    if (variableName && typeof variableValue !== 'undefined' && typeof metadata?.variables?.[variableName] === 'undefined') {
                        metadata.variables = { ...metadata.variables, [variableName]: variableValue }
                    }
                    if (variableOptions) metadata.variableOptions = { ...metadata.variableOptions, [variableName]: { ...variableOptions } }
                } else {
                    validSourceElements.push(sourceChild);
                }
            }
        }
        
        // Find matching source elements based on ID
        const findMatchingSource = (targetElement: TargetElement): SourceChild | undefined => {
            return validSourceElements.find(sourceChild => {
                const { props }: any = sourceChild;
                if (typeof props?.['data-generaltranslation']?.id !== 'undefined') {
                    const sourceID = props['data-generaltranslation'].id;
                    const targetID = targetElement?.props?.['data-generaltranslation']?.id;
                    return sourceID === targetID;
                }
                return false;
            });
        }

        // Return targets
        return target.map((targetChild, index) => {

            // Most straightforward case, return a valid React node
            if (isValidReactNode(targetChild)) {
                return <React.Fragment key={`string_${index}`}>{targetChild}</React.Fragment>;
            }

            // If target is a variable
            if (isTargetVariable(targetChild)) {
                
                let value;
                const key = targetChild.key;
                if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                    value = metadata.variables[key];
                }
                if (targetChild.variable === "number") {
                    return <Num locales={[metadata.locale, metadata.defaultLocale]} key={`num_${index}`} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "date") {
                    return <DateTime locales={[metadata.locale, metadata.defaultLocale]} key={`date_${index}`} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "currency") {
                    return <Currency locales={[metadata.locale, metadata.defaultLocale]} key={`currency_${index}`} defaultValue={value} name={key} currency={metadata?.variableOptions?.[key]?.currency || undefined} options={{...metadata?.variableOptions?.[key]}}/>
                }
                return <Var key={`var_${index}`} defaultValue={value} name={key}/>
            }
            
            // If target is a normal ReactElement
            const matchingSource = findMatchingSource(targetChild);
            if (React.isValidElement(matchingSource)) {
                return <React.Fragment key={`element_${index}`}>{renderElement({ sourceElement: matchingSource, targetElement: targetChild, ...metadata })}</React.Fragment>;
            }
        });
    }
    
    // Target is a single object, could be a component or a variable
    if (typeof target === 'object' && !Array.isArray(target)) {

        const sourceIsValidElement = isValidElement(source)

        if (sourceIsValidElement) {
            const { props } = source;
            if (props?.['data-generaltranslation']?.transformation === "variable") {
                const { variableName, variableValue, variableOptions } = getVariableProps(props);
                if (variableName && typeof variableValue !== 'undefined' && typeof metadata?.variables?.[variableName] === 'undefined') {
                    metadata.variables = { ...metadata.variables, [variableName]: variableValue }
                }
                if (variableOptions) metadata.variableOptions = { ...metadata.variableOptions, [variableName]: { ...variableOptions } }
            }
        }

        // if target is a variable
        if (isTargetVariable(target)) {
            const key = target.key;
            let value;
            if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                value = metadata.variables[key];
            }
            if (target.variable === "number") {
                return <Num locales={[metadata.locale, metadata.defaultLocale]} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
            }
            if (target.variable === "date") {
                return <DateTime locales={[metadata.locale, metadata.defaultLocale]} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
            }
            if (target.variable === "currency") {
                return <Currency locales={[metadata.locale, metadata.defaultLocale]} defaultValue={value} name={key} currency={metadata?.variableOptions?.[key]?.currency || undefined} options={{...metadata?.variableOptions?.[key]}}/>
            }
            return <Var defaultValue={isValidReactNode(value) ? value : undefined} name={key}/>
        }

        // if component
        if (sourceIsValidElement) {
            return renderElement({ sourceElement: source, targetElement: target, ...metadata });
        }
    }
}