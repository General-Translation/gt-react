import React, { ReactElement } from 'react'
import getVariableName from '../variables/getVariableName';
import { TranslatedChildren } from '../types/types';

/**
 * Gets the tag name of a React element.
 * @param {ReactElement} child - The React element.
 * @returns {string} - The tag name of the React element.
 */
const getTagName = (child: ReactElement): string => {
    if (!child) return '';
    const { type, props } = child;
    if (type && typeof type === 'function') {
        if ('displayName' in type && typeof type.displayName === 'string' && type.displayName) return type.displayName;
        if ('name' in type && typeof type.name === 'string' && type.name) return type.name;
    }
    if (type && typeof type === 'string') return type;
    if (props.href) return 'a';
    if (props['data-_gt']?.id) return `C${props['data-_gt'].id}`;
    return 'function';
};

const handleSingleChild = (child: any): any => {
    if (React.isValidElement(child)) {
        const { type, props } = child as ReactElement;
        let objectElement: Record<string, any> = {
            type: getTagName(child),
            props: {}
        };
        if (props['data-_gt']) {

            const generaltranslation = props['data-_gt'];
            let newGTProp: Record<string, any> = {
                ...generaltranslation
            };

            const transformation = generaltranslation.transformation;
            if (transformation === "variable") {
                const variableType = generaltranslation.variableType || "variable";
                const variableName = getVariableName(props, variableType)
                return { 
                    variable: variableType, 
                    key: variableName,
                    id: generaltranslation.id
                };
            }
            if (transformation === "plural" && generaltranslation.branches) {
                objectElement.type = 'Plural';
                let newBranches: Record<string, any> = {};
                Object.entries(generaltranslation.branches).forEach(([key, value]: any) => {
                    newBranches[key] = writeChildrenAsObjects(value);
                });
                newGTProp = { ...newGTProp, branches: newBranches }
            }
            if (transformation === "branch" && generaltranslation.branches) {
                objectElement.type = 'Branch';
                let newBranches: Record<string, any> = {};
                Object.entries(generaltranslation.branches).forEach(([key, value]: any) => {
                    newBranches[key] = writeChildrenAsObjects(value);
                });
                newGTProp = { ...newGTProp, branches: newBranches }
            }
            
            objectElement.props['data-_gt'] = newGTProp;
        }
        if (props.children) {
            objectElement.props.children = writeChildrenAsObjects(props.children)
        }
        return objectElement;
    };
    return child;
}

/**
 * Transforms children elements into objects, processing each child recursively if needed.
 * @param {Children} children - The children to process.
 * @returns {object} The processed children as objects.
*/
export default function writeChildrenAsObjects(children: any): TranslatedChildren {
    return Array.isArray(children) ? children.map(handleSingleChild): handleSingleChild(children);
}