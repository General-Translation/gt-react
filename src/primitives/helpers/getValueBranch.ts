import React from 'react';
import isValidReactNode from './isValidReactNode';

/*
{
    "gender": {
        "male": {
            "VIP": {
                "true": <>Customer name is {{name}}. He is a valued customer.</>,
                "false": "He is a customer."
            }
        },
        "female": {
            "VIP": {
                "true": <>Customer name is {{name}}. She is a valued customer.</>,
                "false": "She is a customer."
            }
        },
        "other": "They are a customer."
    }
}
*/

/**
 * Recursively navigates through a branch object based on the provided values and returns the matched React node.
 * 
 * @param {Record<string, any>} values - An object containing key-value pairs used to navigate through the branches.
 * @param {Record<string, any>} branches - An object representing the branches to be navigated based on the values.
 * @returns {any} - Returns the matched React node or undefined if no match is found.
 */
export default function getValueBranch(values: Record<string, any>, branches: Record<string, any>): any {

    let currentDefault: any = null;

    /**
     * Handles the navigation through a given branch object.
     * 
     * @param {any} branch - The current branch object to navigate.
     * @returns {any} - Returns the matched React node, the default value, or null if no match is found.
     */
    const handleBranch = (branch: any): any => {
        currentDefault = branch?.["*"] || currentDefault;
        for (const key of Object.keys(branch)) {
            let value = values[key];
            if (value) {
                // we already know branch[key] exists
                if (branch[key][value]) {
                    if (typeof branch[key][value].props?.['data-generaltranslation']?.id === 'number') {
                        return branch[key][value];
                    }
                    /* @ts-expect-error Lazy components are meant to return a promise */
                    if (isValidReactNode(branch[key][value]) || branch[key][value].$$typeof === React.lazy(() => {}).$$typeof) {
                        return branch[key][value];
                    }
                    return handleBranch(branch[key][value])
                }
            }
        }
        return currentDefault;
    }

    // Start the recursive navigation from the root branches
    return handleBranch(branches);
}