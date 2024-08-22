import React, { ReactElement, ReactNode } from 'react'
import getPluralBranch from '../primitives/getPluralBranch';
import getValueBranch from '../primitives/getValueBranch';
import isValidReactNode from '../primitives/isValidReactNode';
import Var from './variables/Var/Var';
import DateTime from './variables/DateTime/DateTime';
import Num from './variables/Num/Num';
import Currency from './variables/Currency/Currency';
import defaultVariableNames from '../primitives/defaultVariableNames';

type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string | number | boolean | object;
type Target = TargetChild | TargetChild[];

type SourceChild = ReactNode | Record<string, any>;
type Source = SourceChild | SourceChild[];

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
const renderElement = ({ sourceElement, targetElement, ...metadata }: { sourceElement: ReactElement, targetElement: TargetElement, variables?: Record<string, Source>, renderAttributes?: Record<string, any>, [key: string]: any }): ReactElement => {
    
    const { props } = sourceElement;

    if (props.children) {

        const { 'data-generaltranslation': generaltranslation } = props;
        const targetProps: Record<string, any> | null = targetElement?.props;
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
                    ...metadata.renderAttributes,
                    children: children
                });

            }

            // or handle value variable branching
            if (transformation === "value") {
                
                const { 'data-generaltranslation': generaltranslation, branches, ...values } = props; // 'data-generaltranslation' necessary here to fully destructure relevant ...values
                
                const sourceBranch = getValueBranch(values, branches) || props.children;
                const targetBranch = getValueBranch(values, targetBranches) || targetChildren;
                
                const children = renderChildren({ source: sourceBranch, target: targetBranch, variables: { ...metadata.variables, ...values }, ...metadata });
                return React.createElement('span', {
                    ...metadata.renderAttributes,
                    children: children
                });

            }

        }

        // otherwise, just clone the element
        return React.cloneElement(sourceElement, {
            ...props,
            ...metadata.renderAttributes,
            children: renderChildren({ source: props.children, target: targetChildren, ...metadata} )
        });
    }

    return React.cloneElement(sourceElement, { ...metadata.renderAttributes, ...sourceElement?.props });
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
    
    // Extremely important due to GTProvider and t() discrepancy on whether to use async intl()
    if (typeof target !== null && typeof target !== 'undefined' && isValidReactNode(target)) return target;

    // If target and source are both arrays of children
    if (Array.isArray(source) && Array.isArray(target)) {

        // Filter for variables and valid source children
        let validSourceElements: Source[] = [];
        for (const sourceChild of source) {
            if (sourceChild?.props?.['data-generaltranslation']?.transformation === "variable") {
                
                const variableName = sourceChild.props.name || defaultVariableNames[sourceChild?.props?.['data-generaltranslation']?.variableType];
                const variableValue = sourceChild.props.defaultValue || sourceChild.props.children;
                if (variableName && variableValue && typeof metadata?.variables?.[variableName] === 'undefined') {
                    metadata.variables = { ...metadata.variables, [variableName]: variableValue }
                }

                const variableType = sourceChild?.props?.['data-generaltranslation']?.variableType || "variable";
                if (variableType === "number" || variableType === "currency" || variableType === "date") {
                    const variableOptions = sourceChild?.props?.options;
                    if (variableOptions) metadata.variableOptions = { ...metadata.variableOptions, [variableName]: { ...variableOptions } }
                }
                if (variableType === "currency") {
                    const variableCurrency = sourceChild?.props?.currency;
                    if (variableCurrency) metadata.variableOptions = { ...metadata.variableOptions, [variableName]: { currency: variableCurrency, ...metadata.variableOptions?.[variableName] } }
                }
            }
            else if (React.isValidElement(sourceChild)) {
                validSourceElements.push(sourceChild);
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
            if (targetChild?.variable && typeof targetChild.key === 'string') {
                
                const key = targetChild.key;
                let value;
                
                if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                    value = metadata.variables[key];
                }
                if (targetChild.variable === "number") {
                    return <Num locales={[metadata.locale, metadata.defaultLocale]} key={`var_${index}`} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "date") {
                    return <DateTime locales={[metadata.locale, metadata.defaultLocale]} key={`var_${index}`} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "currency") {
                    return <Currency locales={[metadata.locale, metadata.defaultLocale]} key={`var_${index}`} defaultValue={value} name={key} currency={metadata?.variableOptions?.[key]?.currency || undefined} options={{...metadata?.variableOptions?.[key]}}/>
                }
                return <Var key={`var_${index}`} defaultValue={isValidReactNode(value) ? value : undefined} name={key}/>
            }
            
            // If target is a normal ReactElement
            const matchingSource = findMatchingSource(targetChild);
            if (React.isValidElement(matchingSource)) {
                return <React.Fragment key={`element_${index}`}>{renderElement({ sourceElement: matchingSource, targetElement: targetChild, ...metadata })}</React.Fragment>;
            }
        });
    }
    
    // Target is a single object, could be a component or a variable
    if (typeof target === 'object') {
        if (React.isValidElement(source)) {
            return renderElement({ sourceElement: source, targetElement: target, ...metadata });
        }
        if ((target as any)?.variable && (target as any)?.keys && typeof source === 'object' && source !== null) {
            for (const key of (target as any).keys) {
                if (source.hasOwnProperty(key)) {
                    return (source as any)[key];
                }
            }
        }
    }
}