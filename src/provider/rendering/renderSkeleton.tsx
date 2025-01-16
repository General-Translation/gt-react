import React, { ReactElement, ReactNode } from "react";
import getGTProp from "../helpers/getGTProp";
import { getFallbackVariableName, getPluralBranch, getVariableProps } from "../../internal";
import { libraryDefaultLocale } from 'generaltranslation/internal'
import { baseVariablePrefix } from "../../variables/getVariableName";



function replaceContentWithWhitespace(content: number | string): string {
    if (typeof content === "number") {
        // Convert number to string and replace each non-whitespace character with a non-breaking space
        return content.toString().replace(/\S/g, '\u00A0');
    } else if (typeof content === "string") {
        // Replace each non-whitespace character with a non-breaking space
        return content.replace(/\S/g, '\u00A0');
    }
    // Fallback case (shouldn't be reached due to the type signature)
    return "";
}

/**
 * renderSkeleton is a function that handles the rendering behavior for the skeleton loading method.
 * It replaces all non-whitespace with non-linebreaking spaces.
 * @param children the children react node to be rendered
 * @param variables the variables to be used in the rendering
 * @param variablesOptions the options for the variables
 * @param defaultLocale the default locale to be used
 * @returns 
 */
export default function renderSkeleton({
    children, variables = {},
    defaultLocale = libraryDefaultLocale, renderVariable
}: {
    children: ReactNode,
    variables?: Record<string, any>
    defaultLocale: string
    renderVariable: ({
        variableType, variableName, variableValue, variableOptions
    }: {
        variableType: "variable" | "number" | "datetime" | "currency"
        variableName: string,
        variableValue: any,
        variableOptions: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions
        locales: string[]
    }) => React.JSX.Element
}): React.ReactNode {
    const handleSingleChildElement = (child: ReactElement<any>) => {
        const generaltranslation = getGTProp(child);
        if (generaltranslation?.transformation === "variable") {
            return <></>;
        }
        if (generaltranslation?.transformation === "plural") {
            const n = typeof variables.n === 'number' ? variables.n :
                        typeof child.props.n === 'number' ?  child.props.n :
                            child.props['data-_gt-n'];
            if (typeof n === 'number' && typeof variables.n === 'undefined')
                variables.n = n;
            const branches = generaltranslation.branches || {};
            return handleChildren(getPluralBranch(n, [defaultLocale], branches) || child.props.children);
        }
        if (generaltranslation?.transformation === "branch") {
            let { children, name, branch, 'data-_gt': _gt, ...branches } = child.props;
            name = name || child.props['data-_gt-name'] || "branch";
            branch = variables[name] || branch || child.props['data-_gt-branch-name'];
            branches = generaltranslation.branches || {};
            return handleChildren(branches[branch] !== undefined ? branches[branch] : children);
        }
        if (child.props.children) {
            return React.cloneElement(child, {
                ...child.props,
                'data-_gt': undefined,
                children: handleChildren(child.props.children)
            });
        }
        // empty element
        return React.cloneElement(child, { ...child.props,'data-_gt': undefined });
    }

    const handleSingleChild = (child: ReactNode) => {
        if (React.isValidElement<any>(child)) {
            return handleSingleChildElement(child);
        } else if(typeof child === "number" || typeof child === "string") {
            return replaceContentWithWhitespace(child);
        }
        return child;
    }

    const handleChildren = (children: ReactNode): ReactNode => {
        return Array.isArray(children) ? React.Children.map(children, handleSingleChild) : handleSingleChild(children);
    };

    return handleChildren(children);


}