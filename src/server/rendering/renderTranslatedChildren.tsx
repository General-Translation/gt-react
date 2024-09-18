import React, { ReactElement, ReactNode } from "react";
import { TranslatedChildren, TranslatedElement, VariableObject } from "gt-react/dist/primitives/types";
import Num from "../../variables/Num";
import Var from "../../variables/Var";
import Currency from "../../variables/Currency";
import DateTime from "../../variables/DateTime";
import { isVariableObject, getVariableProps} from 'gt-react/internal'
import getGTProp from "../../utils/getGTProp";

export function renderVariable({
    variableType, variableName, variableValue, variableOptions,
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
                defaultValue={variableValue}
                options={variableOptions}
            />
        )
    } else if (variableType === "datetime") {
        return (
            <DateTime
                name={variableName} 
                defaultValue={variableValue}
                options={variableOptions}
            />
        )
    } else if (variableType === "currency") {
        return (
            <Currency
                name={variableName} 
                defaultValue={variableValue}
                options={variableOptions}
            />
        )
    }
    return (
        <Var name={variableName} defaultValue={variableValue} />
    );
}

function renderTranslatedElement({
    sourceElement, targetElement, 
    variables = {}, 
    variablesOptions = {},
}: {
    sourceElement: ReactElement,
    targetElement: TranslatedElement,
    variables?: Record<string, any>,
    variablesOptions?: Record<string, any>,
}) {

    const { props } = sourceElement;

    if (props.children && targetElement.props.children) {
        return React.cloneElement(sourceElement, {
            ...props,
            children: renderTranslatedChildren({ 
                source: props.children, 
                target: targetElement.props.children,
                variables, variablesOptions
            } )
        });
    }

    return sourceElement;

}

export default function renderTranslatedChildren({
    source, target,
    variables = {}, variablesOptions = {}
}: {
    source: ReactNode,
    target: TranslatedChildren,
    variables?: Record<string, any>,
    variablesOptions?: Record<string, any>
}): ReactNode {

    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && source) return source;
    if (typeof target === 'string') return target;

    if (Array.isArray(source) && Array.isArray(target)) {

        const sourceElements: ReactElement[] = source.filter(sourceChild => {
            if (React.isValidElement(sourceChild)) {
                const generaltranslation = getGTProp(sourceChild)
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
                return (<React.Fragment key={`var_${index}`}>{renderVariable({
                    variableType: targetChild.variable || "variable",
                    variableName: targetChild.key,
                    variableValue: variables[targetChild.key],
                    variableOptions: variablesOptions[targetChild.key]
                })}</React.Fragment>);
            }
            const matchingSourceElement = findMatchingSourceElement(targetChild);
            if (matchingSourceElement) return <React.Fragment key={`element_${index}`}>{renderTranslatedElement({
                sourceElement: matchingSourceElement,
                targetElement: targetChild,
                variables, variablesOptions
            })}</React.Fragment>;
        })


    }

    if (typeof target === 'object' && !Array.isArray(target)) {
        
        const targetType: "variable" | "element" = isVariableObject(target) ? "variable" : "element";
    
        if (React.isValidElement(source)) {

            if (targetType === "element") {
                return renderTranslatedElement({
                    sourceElement: source, targetElement: target as TranslatedElement,
                    variables, variablesOptions
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