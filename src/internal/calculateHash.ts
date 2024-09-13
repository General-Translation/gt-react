import XXH from 'xxhashjs';

/**
 * Calculates a unique ID for the given children objects by hashing their sanitized JSON string representation.
 * 
 * @param {any} childrenAsObjects - The children objects to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the unique ID.
 */
export default async function calculateHash(childrenAsObjects: any): Promise<string> {
    const unhashedKey = JSON.stringify(sanitizeChildrenAsObjects(childrenAsObjects));
    return XXH.h64().update(unhashedKey).digest().toString(16);
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
    if (
        typeof childrenAsObjects === 'object' &&
        childrenAsObjects && childrenAsObjects.t && !childrenAsObjects.type
    ) {
        const result: Record<string, any> = {};
        Object.entries(childrenAsObjects).forEach(([branchName, branch]) => {
            result[branchName] = sanitizeChildren(branch);
        });
        return result;
    }
    return sanitizeChildren(childrenAsObjects);
}
