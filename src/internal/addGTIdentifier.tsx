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

function addIdentifierRecursively(children: Children, dictionaryID?: string | undefined) {
    
    // Object to keep track of the current index for GT IDs
    let indexObject: { index: number } = { index: 0 };

    /**
     * Function to create a GTProp object for a ReactElement
     * @param child - The ReactElement for which the GTProp is created
     * @returns - The GTProp object
     */
    const createGTProp = (child: ReactElement): GTProp => {
        const { type } = child;
        indexObject.index += 1;
        let result: GTProp = { id: indexObject.index };
        const transformation: string = typeof type === 'function' ? ((type as any).gtTransformation || '') : '';
        if (transformation) {
            const transformationParts = transformation.split('-');
            if (transformationParts[0] === "variable") {
                result.variableType = transformationParts?.[1] || "variable";
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
            if (dictionaryID) {
                newProps.key = dictionaryID;
                dictionaryID = undefined;
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
            dictionaryID = undefined;
            return React.Children.map(children, handleSingleChild)
        } else {
            return handleSingleChild(children);
        }
    }

    return handleChildren(children);
}
  
export default function addGTIdentifier(children: Children, branches?: Record<string, any>, dictionaryID?: string | undefined): any {

    const taggedChildren = addIdentifierRecursively(children, dictionaryID);
    
    if (typeof branches === 'undefined') {
        return taggedChildren;
    }

    const pluralBranches = Object.keys(branches).reduce<Record<string, any>>((acc, branchName) => {
        if (acceptedPluralProps[branchName]) {
            acc[branchName] = addIdentifierRecursively(branches[branchName], dictionaryID); // process!
        }
        return acc;
    }, {});

    // check that work has actually been done, if not just return the default children
    if (!Object.keys(pluralBranches).length) return taggedChildren;

    return React.createElement('span', { 'data-generaltranslation': { id: 0, branches: pluralBranches, transformation: 'plural' }, children: taggedChildren });;

}