
'use client'

import React, { isValidElement, ReactElement, ReactNode } from "react";

import getEntryMetadata from "../../../primitives/getEntryMetadata";
import addGTIdentifier from "../../../server/helpers/addGTIdentifier";
import isValidReactNode from "../../../primitives/isValidReactNode";

type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string | number | boolean;
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
 
     if (Array.isArray(source) && Array.isArray(target)) {

        // Filter for variables and valid source children
        const validSourceElements: Source[] = source.filter(isValidElement);
        
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
            // If target is a normal ReactElement
            const matchingSource = findMatchingSource(targetChild);
            if (React.isValidElement(matchingSource)) {
                return <React.Fragment key={`element_${index}`}>{renderClientElement({ sourceElement: matchingSource, targetElement: targetChild, ...metadata })}</React.Fragment>;
            }
        });
    }
    
    // Target is a single object
    if (typeof target === 'object') {
        if (React.isValidElement(source)) {
            return renderClientElement({ sourceElement: source, targetElement: target, ...metadata });
        }
    }
}

const Value = (children: any) => children;

export default function renderDictionary({
    result, dictionary, locales
}: any): any {
    let translatedDictionary: Record<string, any> = {};
    for (const id of Object.keys(dictionary)) {
        if (result[id]) {
            let { entry, metadata } = getEntryMetadata(dictionary[id]);
            metadata = { locales, ...metadata };
            translatedDictionary[id] = renderClientChildren({
                source: addGTIdentifier(<>{entry}</>), // fragment wrapper so that it is consistent with the server-side
                target: result[id].t,
                metadata
            })
        }
    }
    return translatedDictionary;
}