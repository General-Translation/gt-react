import xxhash from "xxhash-wasm";

let hashFunctionPromise = xxhash().then(hasher => hasher.h64ToString);
let hashFunction: ((input: string) => string) | null = null;

hashFunctionPromise.then(fn => {
    hashFunction = fn;
});

/**
 * Calculates a unique ID for the given children objects by hashing their sanitized JSON string representation.
 * 
 * @param {any} childrenAsObjects - The children objects to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the unique ID.
 */
export default async function calculateHash(childrenAsObjects: any): Promise<string> {
    if (!hashFunction) {
        hashFunction = await hashFunctionPromise;
    }
    const unhashedKey = JSON.stringify(sanitizeChildrenAsObjects(childrenAsObjects));
    return hashFunction(unhashedKey);
}

function sanitizeChildrenAsObjects(childrenAsObjects: any) {
    const sanitizeChild = (child: any): any => {
        if (typeof child === 'object' && child.type) {
            if (child?.props?.children) {
                return {
                    ...child,
                    props: {
                        ...child.props,
                        children: sanitizeChildren(child.props.children)
                    },
                    type: '', // sanitize the type, which may be different in compiled code
                }
            } else {
                return {
                    ...child,
                    type: '', // sanitize the type, which may be different in compiled code
                }
            }
        }
        return child;
    }
    const sanitizeChildren = (children: any): any => {
        return (Array.isArray(children)) ? children.map(sanitizeChild) : sanitizeChild(children)
    }
    return sanitizeChildren(childrenAsObjects);
}
