import React, { ReactElement, ReactNode } from "react";
import getGTProp from "../helpers/getGTProp";
import getVariableProps from "../../variables/_getVariableProps";
import { getPluralBranch } from "../../internal";
import renderVariable from "./renderVariable";

import primitives from '../../primitives/primitives';
const { libraryDefaultLocale } = primitives;

export default function renderDefaultChildren({
    children, variables = {}, variablesOptions = {},
    defaultLocale = libraryDefaultLocale
}: {
    children: ReactNode,
    variables?: Record<string, any>
    variablesOptions?: Record<string, any>,
    defaultLocale: string
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
                                child.props['data-_gt-n'];
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
        }
        return child;
    }

    const handleChildren = (children: ReactNode): ReactNode => {
        return Array.isArray(children) ? React.Children.map(children, handleSingleChild) : handleSingleChild(children);
    };

    return handleChildren(children);


}