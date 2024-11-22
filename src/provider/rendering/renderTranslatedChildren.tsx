import React, { isValidElement, ReactElement, ReactNode } from "react";
import { TranslatedChildren, TranslatedElement, VariableObject } from "../../types/types";
import isVariableObject from "../helpers/isVariableObject";
import getGTProp from "../helpers/getGTProp";
import getVariableProps from "../../variables/_getVariableProps";
import { getPluralBranch } from "../../internal";
import renderDefaultChildren from "./renderDefaultChildren";
import renderVariable from "./renderVariable";

import { libraryDefaultLocale } from 'generaltranslation/internal'
import { getFallbackVariableName } from "../../variables/getVariableName";

/*


*/


function renderTranslatedElement({
    sourceElement, targetElement, variables = {}, variablesOptions = {},
    locales = [libraryDefaultLocale]
}: {
    sourceElement: ReactElement,
    targetElement: TranslatedElement,
    variables?: Record<string, any>,
    variablesOptions?: Record<string, any>,
    locales: string[]
}) {

    const { props } = sourceElement;

    const generaltranslation = props["data-_gt"];
    const transformation = generaltranslation?.["transformation"];

    if (transformation === "plural") {
        const n = typeof variables.n === 'number' ? variables.n :
                    typeof sourceElement.props.n === 'number' ?  sourceElement.props.n :
                        sourceElement.props['data-_gt-n'];
        const sourceBranches = generaltranslation.branches || {};
        const sourceBranch = getPluralBranch(n, locales, sourceBranches) || sourceElement.props.children;
        const targetBranches = targetElement.props["data-_gt"].branches || {};
        const targetBranch = getPluralBranch(n, locales, targetBranches) || targetElement.props.children;
        return renderTranslatedChildren({ 
            source: sourceBranch, 
            target: targetBranch as TranslatedChildren,
            variables, variablesOptions, locales
        });
    }

    if (transformation === "branch") {
        let { name, branch, children } = props;
        name = name || sourceElement.props['data-_gt-name'] || "branch";
        branch = variables[name] || branch || sourceElement.props['data-_gt-branch-name'];
        const sourceBranch = (generaltranslation.branches || {})[branch] || children;
        const targetBranch = (targetElement.props["data-_gt"].branches || {})[branch] || targetElement.props.children;
        return renderTranslatedChildren({ 
            source: sourceBranch, 
            target: targetBranch,
            variables, variablesOptions, locales
        });
    }

    if (props?.children && targetElement.props?.children) {
        return React.cloneElement(sourceElement, {
            ...props,
            'data-_gt': undefined,
            children: renderTranslatedChildren({ 
                source: props.children, 
                target: targetElement.props.children,
                variables, variablesOptions, locales
            } )
        });
    }

    return sourceElement;

}

export default function renderTranslatedChildren({
    source, target, variables = {}, variablesOptions = {},
    locales = [libraryDefaultLocale]
}: {
    source: ReactNode,
    target: TranslatedChildren,
    variables?: Record<string, any>,
    variablesOptions?: Record<string, any>,
    locales: string[]
}): ReactNode {

    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && source) return source;
    if (typeof target === 'string') return target;

    if (Array.isArray(source) && Array.isArray(target)) {

        const sourceElements: ReactElement[] = source.filter(sourceChild => {
            if (React.isValidElement(sourceChild)) {
                const generaltranslation = getGTProp(sourceChild)
                getVariableProps(sourceChild.props as any)
                if (generaltranslation?.transformation === "variable") {
                    let {
                        variableName, 
                        variableValue,
                        variableOptions
                    } = getVariableProps(sourceChild.props as any)
                    if (typeof variables[variableName] === 'undefined') {
                        variables[variableName] = variableValue;
                    }
                    variablesOptions[variableName] = {
                        ...variablesOptions[variableName], ...variableOptions
                    }
                } else {
                    return true;
                }
            }
        })

        const findMatchingSourceElement = (targetElement: TranslatedElement): ReactElement | undefined => {
            return sourceElements.find(sourceChild => {
                const generaltranslation = getGTProp(sourceChild);
                if (typeof generaltranslation?.id !== 'undefined') {
                    const sourceID = generaltranslation.id;
                    const targetID = targetElement?.props?.['data-_gt']?.id;
                    return sourceID === targetID;
                }
                return false;
            });
        }

        return target.map((targetChild, index) => {
            if (typeof targetChild === 'string') 
                return <React.Fragment key={`string_${index}`}>{targetChild}</React.Fragment>;
            if (isVariableObject(targetChild)) {
                
                const variableName = targetChild.key;
                const variableType = targetChild.variable || "variable";
                const variableValue = (() => {
                    if (typeof variables[targetChild.key] !== 'undefined') 
                        return variables[targetChild.key];
                    const fallbackVariableName = getFallbackVariableName(variableType);
                    if (typeof variables[fallbackVariableName] !== 'undefined') {
                        return variables[fallbackVariableName];
                    }
                    return undefined
                })();

                return <React.Fragment key={`var_${index}`}>{renderVariable({
                    variableType,
                    variableName,
                    variableValue,
                    variableOptions: variablesOptions[targetChild.key]
                })}</React.Fragment>
            }
            const matchingSourceElement = findMatchingSourceElement(targetChild);
            if (matchingSourceElement) return <React.Fragment key={`element_${index}`}>{renderTranslatedElement({
                sourceElement: matchingSourceElement,
                targetElement: targetChild,
                variables, variablesOptions, locales
            })}</React.Fragment>
        })


    }

    if (target && typeof target === 'object' && !Array.isArray(target)) {
        
        const targetType: "variable" | "element" = isVariableObject(target) ? "variable" : "element";
    
        if (React.isValidElement(source)) {

            if (targetType === "element") {
                return renderTranslatedElement({
                    sourceElement: source, targetElement: target as TranslatedElement,
                    variables, variablesOptions, locales
                })
            }

            const generaltranslation = getGTProp(source)
            if (generaltranslation?.transformation === "variable") {
                let {
                    variableName, 
                    variableValue,
                    variableOptions
                } = getVariableProps(source.props);
                if (typeof variables[variableName] === 'undefined') {
                    variables[variableName] = variableValue;
                }
                variablesOptions[variableName] = {
                    ...variablesOptions[variableName], ...variableOptions
                }
            }

        }

        if (targetType === "variable") {
            const targetVariable = target as VariableObject;
            const variableName = targetVariable.key;
            const variableType = targetVariable.variable || "variable";
            const variableValue = (() => {
                if (typeof variables[targetVariable.key] !== 'undefined') 
                    return variables[targetVariable.key];
                const fallbackVariableName = getFallbackVariableName(variableType);
                if (typeof variables[fallbackVariableName] !== 'undefined') {
                    return variables[fallbackVariableName];
                }
                return undefined
            })();
            return renderVariable({ 
                variableType, 
                variableName, 
                variableValue,
                variableOptions: variablesOptions[targetVariable.key] || {}
            })
        }
 
    }

    return renderDefaultChildren({ children: source, variables, variablesOptions, defaultLocale: locales[0] });
}