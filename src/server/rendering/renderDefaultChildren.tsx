import React, { ReactElement, ReactNode } from "react"
import getGTProp from "../../utils/getGTProp"
import { renderVariable } from "./renderTranslatedChildren"
import { getPluralBranch, getVariableProps } from "gt-react/internal"
import Plural from "../../branches/Plural"
import Branch from "../../branches/Branch"
import getI18NConfig from "../../utils/getI18NConfig"
import { primitives } from 'gt-react/internal'

export default function renderDefaultChildren({
    children, 
    variables = {}, 
    variablesOptions = {},
    defaultLocale = primitives.libraryDefaultLocale
}: {
    children: ReactElement,
    variables?: Record<string, any>
    variablesOptions?: Record<string, any>,
    defaultLocale: string
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
            if (generaltranslation?.transformation === "plural") {
                const n = typeof variables.n === 'number' ? variables.n :
                            typeof child.props.n === 'number' ?  child.props.n :
                                child.props['data-gt-n'];
                const branches = generaltranslation.branches || {};
                return React.createElement('span', {
                    ...child.props,
                    children: handleChildren(getPluralBranch(n, [defaultLocale], branches) || child.props.children)
                });
            }
            if (generaltranslation?.transformation === "branch") {
                let { children, name, branch, ...branches } = child.props;
                name = name || child.props['data-gt-name'] || "branch";
                branch = variables[name] || branch || child.props['data-gt-branch-name'];
                branches = generaltranslation.branches || {};
                return React.createElement('span', {
                    ...child.props,
                    children: handleChildren(branches[branch])
                });
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