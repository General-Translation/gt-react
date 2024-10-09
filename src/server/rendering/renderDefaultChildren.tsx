import React, { ReactElement, ReactNode } from "react"
import { renderVariable } from "./renderTranslatedChildren"
import { getPluralBranch, getVariableProps } from "gt-react/internal"
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
            const {
                'data-generaltranslation': generaltranslation,
                ...props
            } = child.props;
            if (generaltranslation?.transformation === "variable") {
                let { 
                    variableName,
                    variableType,
                    variableValue,
                    variableOptions
                } = getVariableProps(child.props); // needs both regular props and data-generaltranslation
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
                            typeof props.n === 'number' ?  props.n :
                            props['data-gt-n'];
                const branches = generaltranslation.branches || {};
                return React.createElement('span', {
                    ...props,
                    'data-generaltranslation': undefined,
                    children: handleChildren(getPluralBranch(n, [defaultLocale], branches) || child.props.children)
                });
            }
            if (generaltranslation?.transformation === "branch") {
                let { children, name, branch, ...branches } = props;
                name = name || props['data-gt-name'] || "branch";
                branch = variables[name] || branch || child.props['data-gt-branch-name'];
                branches = generaltranslation.branches || {};
                return React.createElement('span', {
                    ...props,
                    'data-generaltranslation': undefined,
                    children: handleChildren(branches[branch])
                });
            }
            if (child.props.children) {
                return React.cloneElement(child, {
                    ...props,
                    'data-generaltranslation': undefined,
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