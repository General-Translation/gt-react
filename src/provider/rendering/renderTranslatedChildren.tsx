import React, { isValidElement, ReactElement, ReactNode } from "react";
import { TranslatedChildren, TranslatedElement, VariableObject } from "../../primitives/types";
import Num from "../../variables/Num";
import Var from "../../variables/Var";
import Currency from "../../variables/Currency";
import DateTime from "../../variables/DateTime";
import isVariableObject from "../helpers/isVariableObject";
import getGTProp from "../helpers/getGTProp";
import getVariableProps from "../../variables/_getVariableProps";
import { libraryDefaultLocale } from "../../primitives/primitives";
import { getPluralBranch } from "../../internal";

export function renderVariable({
    variableType, variableName, variableValue, variableOptions
}: {
    variableType: "variable" | "number" | "datetime" | "currency"
    variableName: string,
    variableValue: any,
    variableOptions: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions
}) {
    if (variableType === "number") {
        return (
            <Num 
                name={variableName} 
                value={variableValue}
                options={variableOptions}
            />
        )
    } else if (variableType === "datetime") {
        return (
            <DateTime
                name={variableName} 
                value={variableValue}
                options={variableOptions}
            />
        )
    } else if (variableType === "currency") {
        return (
            <Currency
                name={variableName} 
                value={variableValue}
                options={variableOptions}
            />
        )
    }
    return (
        <Var name={variableName} value={variableValue} />
    );
}

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

    const generaltranslation = props["data-generaltranslation"];
    const transformation = generaltranslation?.["transformation"];

    if (transformation === "plural") {
        const n = typeof variables.n === 'number' ? variables.n :
                    typeof sourceElement.props.n === 'number' ?  sourceElement.props.n :
                        sourceElement.props['data-gt-n'];
        const sourceBranches = generaltranslation.branches || {};
        const sourceBranch = getPluralBranch(n, locales, sourceBranches) || sourceElement.props.children;
        const targetBranches = targetElement.props["data-generaltranslation"].branches || {};
        const targetBranch = getPluralBranch(n, locales, targetBranches) || targetElement.props.children;
        return React.createElement('span', {
            ...props,
            'data-generaltranslation': undefined,
            children: renderTranslatedChildren({ 
                source: sourceBranch, 
                target: targetBranch,
                variables, variablesOptions, locales
            } )
        });
    }

    if (transformation === "branch") {
        let { name, branch, children } = props;
        name = name || sourceElement.props['data-gt-name'] || "branch";
        branch = variables[name] || branch || sourceElement.props['data-gt-branch-name'];
        const sourceBranch = (generaltranslation.branches || {})[branch] || children;
        const targetBranch = (targetElement.props["data-generaltranslation"].branches || {})[branch] || targetElement.props.children;
        return React.createElement('span', {
            ...props,
            'data-generaltranslation': undefined,
            children: renderTranslatedChildren({ 
                source: sourceBranch, 
                target: targetBranch,
                variables, variablesOptions, locales
            } )
        });
    }

    if (props?.children && targetElement.props?.children) {
        return React.cloneElement(sourceElement, {
            ...props,
            'data-generaltranslation': undefined,
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
                    const targetID = targetElement?.props?.['data-generaltranslation']?.id;
                    return sourceID === targetID;
                }
                return false;
            });
        }

        return target.map((targetChild, index) => {
            if (typeof targetChild === 'string') 
                return <React.Fragment key={`string_${index}`}>{targetChild}</React.Fragment>;
            if (isVariableObject(targetChild)) {
                return <React.Fragment key={`var_${index}`}>{renderVariable({
                    variableType: targetChild.variable || "variable",
                    variableName: targetChild.key,
                    variableValue: variables[targetChild.key],
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
                } = getVariableProps(source.props)
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
            return renderVariable({ 
                variableType: targetVariable.variable || "variable", 
                variableName: targetVariable.key, 
                variableValue: variables[targetVariable.key],
                variableOptions: variablesOptions[targetVariable.key]
            })
        }
 
    }

    // if target can't be rendered by itself and source can't be rendered by itself, there's nothing more to do
    // that's the only scenario in which renderTranslatedChildren reaches this point

}