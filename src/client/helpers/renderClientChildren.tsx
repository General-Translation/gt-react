
'use client'

import React, { ReactElement, ReactNode } from "react";

import isValidReactNode from "../../primitives/rendering/isValidReactNode";
import defaultVariableNames from "../../primitives/variables/defaultVariableNames";
import ClientNum from "../variables/ClientNum";
import ClientDateTime from "../variables/ClientDateTime";
import ClientCurrency from "../variables/ClientCurrency";
import ClientVar from "../variables/ClientVar";
import getPluralBranch from "../../primitives/variables/getPluralBranch";
import { Target, TargetChild, TargetElement, TargetVariable, Source, SourceChild } from "../../config/types/SourceTargetTypes";
import isTargetVariable from "../../primitives/variables/isTargetVariable";

const renderClientElement = ({ sourceElement, targetElement, ...metadata }: { 
    sourceElement: ReactElement, 
    targetElement: TargetElement, 
    [key: string]: any 
}): ReactElement => {

    const { props } = sourceElement;

    if (props.children) {

        let { 'data-generaltranslation': generaltranslation } = props;
        const targetProps: Record<string, any> | null = targetElement?.props || null;
        const targetChildren = targetProps?.children;
        const targetBranches = targetProps?.['data-generaltranslation']?.branches;

        // If an alternative branch (from a transformation) is necessary
        if (generaltranslation && generaltranslation.transformation) {

            const transformation = generaltranslation.transformation;
            
            // handle number variable branching
            if (transformation === "plural") {

                if (!metadata.variables || typeof metadata.variables.n !== 'number') {
                    throw new Error(`Plural with id ${metadata.id} needs n value, e.g. t("${metadata.id}", { n: 1 })`);
                }

                const n = metadata.variables.n;

                const branches = props['data-unrendered-branches'] || generaltranslation.branches;
                
                const sourceBranch = getPluralBranch(n, [metadata.locale, metadata.defaultLocale], branches) || generaltranslation.defaultChildren;
                const targetBranch = getPluralBranch(n, [metadata.locale, metadata.defaultLocale], targetBranches) || targetChildren;

                const children = renderClientChildren({source: sourceBranch, target: targetBranch, variables: { ...metadata.variables, n: n }, ...metadata});
            
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
            children: renderClientChildren({ source: props.children, target: targetChildren, ...metadata} )
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
export default function renderClientChildren({
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
            if (React.isValidElement(sourceChild)) {
                const { props } = sourceChild;
                if (props?.['data-generaltranslation']?.transformation === "variable") {
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


            // if target is a variable
            if (isTargetVariable(targetChild)) {
                const key = targetChild.key;
                let value;
                if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                    value = metadata.variables[key];
                }
                if (targetChild.variable === "number") {
                    return <ClientNum key={`num_${index}`} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "date") {
                    return <ClientDateTime key={`date_${index}`}  defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "currency") {
                    return <ClientCurrency key={`currency_${index}`}  defaultValue={value} name={key} currency={metadata?.variableOptions?.[key]?.currency || undefined} options={{...metadata?.variableOptions?.[key]}}/>
                }
                return <ClientVar key={`var_${index}`} defaultValue={isValidReactNode(value) ? value : undefined} name={key}/>
            }
            
            // If target is a normal ReactElement
            const matchingSource = findMatchingSource(targetChild);
            if (React.isValidElement(matchingSource)) {
                return <React.Fragment key={`element_${index}`}>{renderClientElement({ sourceElement: matchingSource, targetElement: targetChild, ...metadata })}</React.Fragment>;
            }
        });
    }
    
    // Target is a single object, could be a component or a variable
    if (typeof target === 'object' && !Array.isArray(target)) {

        const sourceIsValidElement = React.isValidElement(source)

        if (sourceIsValidElement) {
            const { props } = source;
            if (props?.['data-generaltranslation']?.transformation === "variable") {
                const variableName = source.props.name || defaultVariableNames[source?.props?.['data-generaltranslation']?.variableType];
                const variableValue = source.props.defaultValue || source.props.children;
                if (variableName && variableValue && typeof metadata?.variables?.[variableName] === 'undefined') {
                    metadata.variables = { ...metadata.variables, [variableName]: variableValue }
                }
                const variableType = source?.props?.['data-generaltranslation']?.variableType || "variable";
                if (variableType === "number" || variableType === "currency" || variableType === "date") {
                    const variableOptions = source?.props?.options;
                    if (variableOptions) metadata.variableOptions = { ...metadata.variableOptions, [variableName]: { ...variableOptions } }
                }
                if (variableType === "currency") {
                    const variableCurrency = source?.props?.currency;
                    if (variableCurrency) metadata.variableOptions = { ...metadata.variableOptions, [variableName]: { currency: variableCurrency, ...metadata.variableOptions?.[variableName] } }
                }
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
                return <ClientNum defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
            }
            if (target.variable === "date") {
                return <ClientDateTime defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
            }
            if (target.variable === "currency") {
                return <ClientCurrency defaultValue={value} name={key} currency={metadata?.variableOptions?.[key]?.currency || undefined} options={{...metadata?.variableOptions?.[key]}}/>
            }
            return <ClientVar defaultValue={isValidReactNode(value) ? value : undefined} name={key}/>
        }

        // if component
        if (sourceIsValidElement) {
            return renderClientElement({ sourceElement: source, targetElement: target, ...metadata });
        }
    }
}