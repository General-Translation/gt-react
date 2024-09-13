import React, { ReactElement, ReactNode } from "react";
import getGTProp from "../helpers/getGTProp";
import getVariableProps from "../../variables/_getVariableProps";
import { renderVariable } from "./renderTranslatedChildren";

export default function renderDefaultChildren({
    entry, variables = {}, variablesOptions = {}
}: {
    entry: ReactElement,
    variables?: Record<string, any>
    variablesOptions?: Record<string, any>
}) {

    const handleSingleChild = (child: ReactNode) => {
        if (React.isValidElement(child)) {
            const generaltranslation = getGTProp(child)
            if (generaltranslation?.transformation === "variable") {
                let { 
                    variableName,
                    variableType,
                    variableValue,
                    variableOptions
                } = getVariableProps(child.props);
                variableValue = variables[variableName] || variableValue;
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

    return handleChildren(entry);


}