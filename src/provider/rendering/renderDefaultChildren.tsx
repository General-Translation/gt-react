import React, { ReactElement, ReactNode } from "react";
import getGTProp from "../helpers/getGTProp";
import getVariableProps from "../../variables/_getVariableProps";
import { renderVariable } from "./renderTranslatedChildren";
import Plural from "../../branches/plurals/Plural";
import { getPluralBranch } from "../../internal";
import Branch from "../../branches/Branch";

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
                variableValue = (typeof variables[variableName] !== 'undefined') ?
                    variables[variableName] : variableValue;
                return renderVariable({
                    variableName, variableType, variableValue, variableOptions: {
                        ...variablesOptions[variableName],
                        ...variableOptions
                    }
                })
            }
            if (generaltranslation?.transformation === "plural") {
                const n = typeof variables.n === 'number' ? variables.n :
                            typeof child.props.n === 'number' ?  child.props.n :
                                child.props['data-gt-n'];
                const branches = generaltranslation.branches;
                return (
                    <Plural n={n} {...branches}>
                        {child.props.children}
                    </Plural>
                )
            }
            if (generaltranslation?.transformation === "branch") {
                let { children, name, branch, ...branches } = child.props;
                name = name || child.props['data-gt-name'] || "branch";
                branch = variables[name] || branch || child.props['data-gt-branch-name'];
                branches = generaltranslation.branches;
                return (
                    <Branch name={name} branch={branch} {...branches}>
                        {child.props.children}
                    </Branch>
                )
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