import { hashString } from 'generaltranslation/id';

/**
 * Calculates a unique ID for the given children objects by hashing their sanitized JSON string representation.
 * 
 * @param {any} childrenAsObjects - The children objects to be hashed.
 * @returns {string} - A promise that resolves to the unique ID.
 */
export default function hashReactChildrenObjects(childrenAsObjects: any): string {
    const unhashedKey = JSON.stringify(sanitizeChildrenAsObjects(childrenAsObjects));
    return hashString(unhashedKey);
}

function sanitizeChildrenAsObjects(childrenAsObjects: any) {
    const sanitizeChild = (child: any): any => {
        if (child && typeof child === 'object' && child.props) {
            if (child?.props?.children) {
                const { type, ...rest } = child;
                return {
                    ...rest,
                    props: {
                        ...child.props,
                        children: sanitizeChildren(child.props.children)
                    }
                }
            } else {
                const { type, ...rest } = child;
                return rest;
            }
        }
        return child;
    }
    const sanitizeChildren = (children: any): any => {
        return Array.isArray(children) ? children.map(sanitizeChild) : sanitizeChild(children)
    }
    return sanitizeChildren(childrenAsObjects);
}
