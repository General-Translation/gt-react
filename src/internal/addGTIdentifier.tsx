import React, { ReactNode, ReactElement, isValidElement } from 'react'

type Child = ReactNode;
type Children = Child[] | Child;
type GTProp = {
    id: number,
    transformation?: string,
    [key: string]: any;
}

const acceptedPluralProps: Record<string, boolean> = {
    "singular": true, "dual": true, "plural": true,
    "zero": true, "one": true, "two": true, "few": true, "many": true, "other": true
}

export default function addGTIdentifier(children: Children, outerID?: string | undefined, startingIndex: number = 0): any {

    // Object to keep track of the current index for GT IDs
    let indexObject: { index: number } = { index: startingIndex };

    /**
     * Function to create a GTProp object for a ReactElement
     * @param child - The ReactElement for which the GTProp is created
     * @returns - The GTProp object
     */
    const createGTProp = (child: ReactElement): GTProp => {
        const { type, props } = child;
        indexObject.index += 1;
        let result: GTProp = { id: indexObject.index };
        const transformation: string = typeof type === 'function' ? ((type as any).gtTransformation || '') : '';
        if (transformation) {
            const transformationParts = transformation.split('-');
            if (transformationParts[0] === "variable") {
                result.variableType = transformationParts?.[1] || "variable";
            } 
            if (transformationParts[0] === "plural") {
                const pluralBranches = Object.entries(props).reduce((acc, [branchName, branch]) => {
                    if (acceptedPluralProps[branchName]) {
                        (acc as Record<string, any>)[branchName] = addGTIdentifier(branch as any, undefined, indexObject.index);
                    }
                    return acc;
                }, {});
                if (Object.keys(pluralBranches).length) result.branches = pluralBranches;
            }
            if (transformationParts[0] === "branch") {
                const { children, branch, ...branches } = props;
                const resultBranches = Object.entries(branches).reduce((acc, [branchName, branch]) => {
                    (acc as Record<string, any>)[branchName] = addGTIdentifier(branch as any, undefined, indexObject.index);
                    return acc;
                }, {})
                if (Object.keys(resultBranches).length) result.branches = resultBranches;
            }
            result.transformation = transformationParts[0];
        }
        return result;
    }

    function handleSingleChild(child: any) {
        if (isValidElement(child)) {
            const { props } = child as ReactElement;
            // Create new props for the element, including the GT identifier and a key
            let generaltranslation = createGTProp(child);  
            let newProps = {
                ...props,
                'data-generaltranslation': generaltranslation
            };
            if (outerID) {
                newProps.key = outerID;
                outerID = undefined;
            }
            // Recursively add IDs to children
            if (props.children) {
                newProps.children = handleChildren(props.children);
            }
            return React.cloneElement(child, newProps);
        }
        return child;
    }
    
    function handleChildren(children: Children) {
        if (Array.isArray(children)) {
            outerID = undefined;
            return React.Children.map(children, handleSingleChild)
        } else {
            return handleSingleChild(children);
        }
    }

    return handleChildren(children);
}