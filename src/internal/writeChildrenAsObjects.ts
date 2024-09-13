import React, { ReactElement } from 'react'
import defaultVariableNames from '../variables/_defaultVariableNames';

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
    if (props['data-generaltranslation']?.id) return `C${props['data-generaltranslation'].id}`;
    return 'function';
};

const handleSingleChild = (child: any): any => {
    if (React.isValidElement(child)) {
        const { type, props } = child as ReactElement;
        let objectElement: Record<string, any> = {
            type: getTagName(child),
            props: {}
        };
        if (props['data-generaltranslation']) {

            const generaltranslation = props['data-generaltranslation'];
            let newGTProp: Record<string, any> = {
                ...generaltranslation
            };

            const transformation = generaltranslation.transformation;
            if (transformation === "variable") {
                const variableName = props.name || (defaultVariableNames as any)[generaltranslation?.variableType] || "value";
                return { variable:  generaltranslation.variableType || "variable", key: variableName };
            }
            if (transformation === "plural" && generaltranslation.branches) {
                objectElement.type = 'Plural';
                let newBranches: Record<string, any> = {};
                Object.entries(generaltranslation.branches).forEach(([key, value]: any) => {
                    newBranches[key] = writeChildrenAsObjects(value);
                });
                newGTProp = { ...newGTProp, branches: newBranches }
            }
            
            objectElement.props['data-generaltranslation'] = newGTProp;
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
export default function writeChildrenAsObjects(children: any): any {
    return Array.isArray(children) ? children.map(handleSingleChild): handleSingleChild(children);
}