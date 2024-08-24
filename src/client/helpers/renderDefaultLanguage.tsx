
'use client'

import React, { ReactNode } from "react";
import ClientPlural from "../plural/ClientPlural";
import ClientValue from "../value/ClientValue";
import RenderClientVariable from "../value/RenderClientVariable";

type SourceChild = ReactNode | Record<string, any>;
type Source = SourceChild | SourceChild[];

export default function renderDefaultLanguage({
    source, variables, ...metadata
}: { 
    source: Source,
    variables?: Record<string, any>
    [key: string]: any
}) {

    const handleSingleChild = (child: ReactNode) => {
        if (React.isValidElement(child)) {
            const { props } = child;
            const { 'data-generaltranslation': generaltranslation } = props;
            if (generaltranslation) {
                if (generaltranslation.transformation) {
                    if (generaltranslation.transformation === "plural") {
                        if (!variables || typeof variables.n !== 'number') {
                            throw new Error(`ID "${metadata.id}" requires an "n" option.\n\ne.g. t("${metadata.id}", { n: 1 })`)
                        }
                        const defaultChildren = generaltranslation.defaultChildren;
                        return (
                            <ClientPlural n={variables.n} values={{...variables}} {...generaltranslation.branches}>
                                {defaultChildren}
                            </ClientPlural>
                        )
                    }
                    else if (generaltranslation.transformation === "value") {
                        if (!variables || typeof variables !== 'object') {
                            throw new Error(`ID "${metadata.id}" requires values.\n\ne.g. t("${metadata.id}", { values: { ...values } })`)
                        }
                        return (
                            <ClientValue values={{ ...variables }}>
                                {props.children}
                            </ClientValue>
                        )
                    }
                    else if (generaltranslation.transformation === "variable") {
                        return <RenderClientVariable variables={variables}>{child}</RenderClientVariable>
                    }
                }
            }
            if (props.children) {
                return React.cloneElement(child, {
                    ...props,
                    ...metadata.renderAttributes,
                    children: handleChildren(props.children)
                });
            }
        }
        return child;
    }

    const handleChildren = (children: any): any => {
        if (Array.isArray(children)) {
            return React.Children.map(children, handleSingleChild)
        }
        return handleSingleChild(children);
    }

    return handleChildren(source);
}