import React, { ReactNode, ReactElement } from 'react'
import defaultVariableNames from '../variables/_defaultVariableNames';

type Child = ReactNode | Record<string, any>;
type Children = Child | Child[];

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
        let newProps: any = {};
        if (props['data-generaltranslation']) {
            const generaltranslation = props['data-generaltranslation'];
            if (generaltranslation?.transformation === "variable") {
                const variableName = props.name || (defaultVariableNames as any)[generaltranslation?.variableType] || "value";
                return { variable:  generaltranslation.variableType || "variable", key: variableName };
            }
        }
        if (props.children) {
            newProps.children = handleChildren(props.children)
        }
        return {
            type: getTagName(child),
            props: newProps
        }
    };
    return child;
}

const handleChildren = (children: any) => {
    return Array.isArray(children) ? children.map(handleSingleChild): handleSingleChild(children);
}

/**
 * Transforms children elements into objects, processing each child recursively if needed.
 * @param {Children} children - The children to process.
 * @returns {object} The processed children as objects.
*/
export default function writeChildrenAsObjects(children: any): any {
    if (children && typeof children === 'object' && !children.type && children.t) {
        const result: Record<string, any> = {};
        Object.entries(children).forEach(([branchName, branch]) => {
            result[branchName] = handleChildren(branch);
        });
        return result;
    }
    return handleChildren(children);
}