
'use client'

import React, { ReactNode } from "react";
import ClientPlural from "../plural/ClientPlural";
import ClientValue from "../value/ClientValue";
import RenderClientVariable from "../value/RenderClientVariable";

type SourceChild = ReactNode;
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
            const { type, props } = child;
            const { 'data-generaltranslation': generaltranslation } = props;
            let transformation: string | null = null;
            if (generaltranslation) {
                transformation = generaltranslation?.transformation;
            }
            if (typeof type === 'function' && ((type as any)?.gtTransformation)) {
                transformation = (type as any)?.gtTransformation;
            }
            if (transformation) {
                if (transformation === "plural") {
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
                else if (transformation === "value") {
                    if (!variables || typeof variables !== 'object') {
                        throw new Error(`ID "${metadata.id}" requires values.\n\ne.g. t("${metadata.id}", { values: { ...values } })`)
                    }
                    return (
                        <ClientValue values={{ ...variables }}>
                            {props.children}
                        </ClientValue>
                    )
                }
                else if (transformation.startsWith("variable")) {
                    return <RenderClientVariable variables={variables}>{child}</RenderClientVariable>
                }
            }

            if (props.children) {
                return React.cloneElement(child, {
                    ...props,
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