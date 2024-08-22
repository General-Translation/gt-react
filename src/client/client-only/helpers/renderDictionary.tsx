
'use client'

import React, { isValidElement, ReactElement, ReactNode } from "react";

import getEntryMetadata from "../../../primitives/getEntryMetadata";
import addGTIdentifier from "../../../server/helpers/addGTIdentifier";
import isValidReactNode from "../../../primitives/isValidReactNode";
import getRenderAttributes from "../../../primitives/getRenderAttributes";
import defaultVariableNames from "../../../primitives/defaultVariableNames";
import ClientNum from "../../variables/ClientNum";
import ClientDateTime from "../../variables/ClientDateTime";
import ClientCurrency from "../../variables/ClientCurrency";
import ClientVar from "../../variables/ClientVar";

type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string | number | boolean | object;
type Target = TargetChild | TargetChild[];

type SourceChild = ReactNode | Record<string, any>;
type Source = SourceChild | SourceChild[];


const renderClientElement = ({ sourceElement, targetElement, ...metadata }: { 
    sourceElement: ReactElement, 
    targetElement: TargetElement, 
    [key: string]: any 
}): ReactElement => {

    const { props } = sourceElement;

    if (props.children) {
        return React.cloneElement(sourceElement, {
            ...props,
            ...metadata.renderAttributes,
            children: renderClientChildren({ source: props.children, target: targetElement?.props?.children, ...metadata} )
        });
    }

    return React.cloneElement(sourceElement, { ...metadata.renderAttributes, ...sourceElement?.props });
}

function renderClientChildren({
    source, target, ...metadata
}: { 
    source: Source, 
    target?: Target,
    [key: string]: any
}) {

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
                    return <ClientNum key={`var_${index}`} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "date") {
                    return <ClientDateTime key={`var_${index}`} defaultValue={value} name={key} options={{...metadata?.variableOptions?.[key]}}/>
                }
                if (targetChild.variable === "currency") {
                    return <ClientCurrency key={`var_${index}`} defaultValue={value} name={key} currency={metadata?.variableOptions?.[key]?.currency || undefined} options={{...metadata?.variableOptions?.[key]}}/>
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
    if (typeof target === 'object') {
        if (React.isValidElement(source)) {
            return renderClientElement({ sourceElement: source, targetElement: target, ...metadata });
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

export default function renderDictionary({
    result, dictionary, locales
}: any): any {
    const renderAttributes = getRenderAttributes(locales[0]);
    let translatedDictionary: Record<string, any> = {};
    for (const id of Object.keys(dictionary)) {
        if (result[id]) {
            let { entry, metadata } = getEntryMetadata(dictionary[id]);
            metadata = { locales, renderAttributes, ...metadata };
            translatedDictionary[id] = renderClientChildren({
                source: addGTIdentifier(<>{entry}</>), // fragment wrapper so that it is consistent with the server-side
                target: result[id].t,
                metadata
            })
        }
    }
    return translatedDictionary;
}