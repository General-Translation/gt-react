import React, { ReactNode, ReactElement, isValidElement } from 'react'
import { isAcceptedPluralForm } from 'generaltranslation/internal'
import { createNestedDataGTError, createNestedTError } from '../messages/createMessages';

type Child = ReactNode;
type Children = Child[] | Child;
type GTProp = {
    id: number,
    transformation?: string,
    [key: string]: any;
}

export default function addGTIdentifier(children: Children, outerId?: string | undefined, startingIndex: number = 0): any {

    // Object to keep track of the current index for GT IDs
    let index = startingIndex;

    /**
     * Function to create a GTProp object for a ReactElement
     * @param child - The ReactElement for which the GTProp is created
     * @returns - The GTProp object
     */
    const createGTProp = (child: ReactElement<any>): GTProp => {
        const { type, props } = child;
        index += 1;
        let result: GTProp = { id: index };
        let transformation: string;
        try {
            transformation = typeof type === 'function' ? ((type as any).gtTransformation || '') : '';
        } catch (error) {
            transformation = ''
        }
        if (transformation) {
            const transformationParts = transformation.split('-');
            if (transformationParts[0] === "translate") {
                throw new Error(createNestedTError(child))
            }
            if (transformationParts[0] === "variable") {
                result.variableType = transformationParts?.[1] || "variable";
            } 
            if (transformationParts[0] === "plural") {
                const pluralBranches = Object.entries(props).reduce((acc, [branchName, branch]) => {
                    if (isAcceptedPluralForm(branchName)) {
                        (acc as Record<string, any>)[branchName] = addGTIdentifier(branch as any, branchName, index);
                    }
                    return acc;
                }, {});
                if (Object.keys(pluralBranches).length) result.branches = pluralBranches;
            }
            if (transformationParts[0] === "branch") {
                const { children, branch, ...branches } = props;
                const resultBranches = Object.entries(branches).reduce((acc, [branchName, branch]) => {
                    (acc as Record<string, any>)[branchName] = addGTIdentifier(branch as any, branchName, index);
                    return acc;
                }, {})
                if (Object.keys(resultBranches).length) result.branches = resultBranches;
            }
            result.transformation = transformationParts[0];
        }
        return result;
    }

    function handleSingleChildElement(child: ReactElement<any>) {
        const { props } = child;
        if (props['data-_gt']) 
            throw new Error(createNestedDataGTError(child))
        // Create new props for the element, including the GT identifier and a key
        let generaltranslation = createGTProp(child); 
        let newProps = {
            ...props,
            'data-_gt': generaltranslation
        };
        if (props.children && !generaltranslation.variableType) {
            newProps.children = handleChildren(props.children);
        }
        if (child.type === React.Fragment) {
            const fragment = <span style={{ all: 'unset', display: 'contents' }} {...newProps} />;
            return fragment;
        }
        return React.cloneElement(child, newProps);
    }

    function handleSingleChild(child: any) {
        if (isValidElement(child)) {
            return handleSingleChildElement(child);
        }
        return child;
    }
    
    function handleChildren(children: Children) {
        if (Array.isArray(children)) {
            // outerId = undefined;
            return React.Children.map(children, handleSingleChild)
        } else {
            return handleSingleChild(children);
        }
    }

    return handleChildren(children);
};