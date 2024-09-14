import React, { ReactElement, ReactNode } from "react"
import getGTProp from "../../utils/getGTProp"
import { renderVariable } from "./renderTranslatedChildren"
import { getVariableProps } from "gt-react/internal"

export default function renderDefaultChildren({
    children, 
    variables = {}, 
    variablesOptions = {},
}: {
    children: ReactElement,
    variables?: Record<string, any>
    variablesOptions?: Record<string, any>
}) {

    const handleSingleChild = (child: ReactNode) => {
        if (React.isValidElement(child)) {
            const generaltranslation = getGTProp(child);
            if (generaltranslation?.transformation === "variable") {
                let { 
                    variableName,
                    variableType,
                    variableValue,
                    variableOptions
                } = getVariableProps(child.props);
                variableValue = (typeof variables[variableName] !== 'undefined') ?
                    variables[variableName] : variableValue;
                return renderVariable({
                    variableName, variableType, variableValue, variableOptions: {
                        ...variablesOptions[variableName],
                        ...variableOptions
                    }
                })
            }
            if (child.props.children) {
                return React.cloneElement(child, {
                    ...child.props,
                    children: handleChildren(child.props.children)
                });
            }
        }
        return child;
    }

    const handleChildren = (children: ReactNode): ReactNode => {
        return Array.isArray(children) ? React.Children.map(children, handleSingleChild) : handleSingleChild(children);
    };

    return handleChildren(children);

}