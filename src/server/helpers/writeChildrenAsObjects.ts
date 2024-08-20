import React, { ReactNode, ReactElement } from 'react'
import defaultVariableNames from '../../primitives/defaultVariableNames';

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

/**
 * Handles processing of a valid React element, transforming its properties and children as needed.
 * @param {ReactElement} child - The React element to process.
 * @returns {object} - The processed element with its type and transformed props.
 */
const handleValidReactElement = (child: ReactElement): object => {
    
    const { type, props } = child;
    let newProps: any = {};

    // Transform children if they exist and are not private
    if (props.children) {
        newProps.children = writeChildrenAsObjects(props.children)
    }

    // Write the branches of 'data-generaltranslation' as objects
    if (props['data-generaltranslation']) {

        const generaltranslation = props['data-generaltranslation']
        let result = { ...generaltranslation };

        if (generaltranslation.transformation && generaltranslation.transformation === "variable") {
            const variableName: string = props.name || defaultVariableNames[generaltranslation.variableType] || "value";
            return { variable:  generaltranslation.variableType || "variable", key: variableName };
        }

        // Write all the branches as objects
        if (generaltranslation.transformation && generaltranslation.branches) {

            const transformation = generaltranslation.transformation;
            
            // Write the branches of a number variable transformation
            if (transformation === "plural") {
                const { ranges, ...others } = generaltranslation.branches;
                if (ranges) {
                    result.branches.ranges = ranges.map((range: any) => {
                        return { min: range.min, max: range.max, children: writeChildrenAsObjects(range.children) }
                    })
                }
                for (const option of Object.keys(others)) {
                    result.branches[option] = writeChildrenAsObjects(others[option]);
                }
            }

        }

        // Write defaultChildren
        if (generaltranslation.defaultChildren) {
            result.defaultChildren = writeChildrenAsObjects(generaltranslation.defaultChildren)
        }

        newProps['data-generaltranslation'] = result;
        
    }

    return {
        type: getTagName(child),
        props: newProps
    }
}

/**
 * Handles processing of a single child, determining if it is a valid React element or an object.
 * @param {any} child - The child to process.
 * @returns {object} - The processed child or the original child if no transformation is needed.
 */
const handleSingleChild = (child: any): object => {
    if (React.isValidElement(child)) return handleValidReactElement(child);
    else if (child && typeof child === 'object') {
        return { variable: true, keys: Object.keys(child) }
    }
    else return child;
}

/**
 * Transforms children elements into objects, processing each child recursively if needed.
 * @param {Children} children - The children to process.
 * @returns {object} - The processed children as objects.
*/
export default function writeChildrenAsObjects(children: Children): any {
    if (Array.isArray(children)) {
        return children.map(child => handleSingleChild(child))
    }
    return handleSingleChild(children)
}