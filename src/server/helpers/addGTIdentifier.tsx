import React, { ReactNode, ReactElement } from 'react'
import processBranches from '../../primitives/value/processBranches';

type Child = ReactNode | Record<string, any>;
type Children = Child[] | Child;
type GTProp = {
    id: number,
    transformation?: string,
    [key: string]: any;
}

/**
 * Helper function to validate the properties of the component to prevent nested translations
 * @param props - The properties of the current React element
 */
const validateProps = (props: Record<string, any>): void => {
    if (props && props['data-generaltranslation'] && typeof props['data-generaltranslation'].id === 'number') {
        throw new Error(`Nesting of I18N components is not permitted. This prevents components from being translated twice. 
            Found nested component with ID: ${props['data-generaltranslation'].id}`);
    }
}

/**
 * Main function to add GT (General Translation) identifiers to the children
 * @param children - The children elements to which GT identifiers will be added
 * @returns - The children with added GT identifiers
 */
export default function addGTIdentifier(children: Children) {

    // Object to keep track of the current index for GT IDs
    let indexObject: { index: number } = { index: 0 };

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
            result.transformation = transformationParts[0];
            if (transformation === "private") {
                if (typeof props.label === 'string') {
                    result.label = props.label;
                }
            }
        }
        
        return result;
    }

    /**
     * Function to handle valid React elements and add GT identifiers
     * @param child - The ReactElement to handle
     * @returns - The new ReactElement with added GT identifiers
     */
    const handleValidReactElement = (child: ReactElement): ReactElement => {

        // Destructure the props from the child element
        const { props } = child;
    
        // Validate the props to ensure there are no nested translations
        validateProps(props);
    
        // Create new props for the element, including the GT identifier and a key
        let generaltranslation = createGTProp(child);  
       
        let newProps = {
            ...props,
            'data-generaltranslation': generaltranslation,
            key: generaltranslation.id
        };

        // If branches are needed for a number or value variable
        const transformation = generaltranslation.transformation;

        if (transformation === "numeric" || transformation === "value") {

            // Updates indices to keep a consistent identification system across branches
            let frozenIndex = indexObject.index;
            let championIndex = indexObject.index;
            const updateIndices = () => {
                if (indexObject.index > frozenIndex) {
                    if (indexObject.index > championIndex) {
                        championIndex = indexObject.index;
                    }
                    indexObject.index = frozenIndex;
                }
            }

            // Adds ID to children
            if (props.children) {
                newProps.children = addIdentifierRecursively(props.children);
            }

            // define branches
            let branches: any = {};
            
            // add identifier to number branches (e.g. singular, plural, ranges)
            if (transformation === "numeric") {
                const { n, children, ...options } = props;
                let { ranges, ...others } = options;
                if (ranges) branches.ranges = options.ranges.map((range: any) => {
                    updateIndices();
                    return { min: range.min, max: range.max, children: addIdentifierRecursively(range.children) }
                }); 
                for (const option of Object.keys(others)) {
                    updateIndices();
                    branches[option] = addIdentifierRecursively(others[option]);
                }
                newProps = { ...newProps, ...branches };
            }

            // or add identifier to value branches, e.g. name={"Kernighan"}
            else if (transformation === "value") {
                const { "branches": rawBranches } = props;
                if (rawBranches) {
                    branches = processBranches(rawBranches, (branch: any) => { updateIndices(); return addIdentifierRecursively(branch); })
                }
                newProps.branches = branches;
            }

            // modify newProps if necessary
            if (Object.keys(branches).length > 0) newProps['data-generaltranslation'].branches = branches;
            if (newProps.children) newProps['data-generaltranslation'].defaultChildren = newProps.children;
            
            // reset index
            indexObject.index = championIndex; 

        }

        // if no transformation is required
        if (!transformation) {
            if (props.children) {
                newProps.children = addIdentifierRecursively(props.children);
            }
        }

        // return the element with new props
        return React.cloneElement(child, newProps); 
    }

    /**
     * Function to handle a single child element and determine if it's a valid React element
     * @param child - The child element to handle
     * @returns - The handled child element
     */
    const handleSingleChild = (child: Child) => {
        if (React.isValidElement(child)) return handleValidReactElement(child);
        return child;
    }

    /**
     * Recursive function to add GT identifiers to all child elements
     * @param children - The children elements to process
     * @returns - The children elements with added GT identifiers
     */
    const addIdentifierRecursively = (children: any) => {
        if (Array.isArray(children)) {
            return children.map(child => handleSingleChild(child))
        }
        return handleSingleChild(children);
    }

    return addIdentifierRecursively(children);

}