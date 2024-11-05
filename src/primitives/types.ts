import React, { ReactElement } from "react"

export type Entry = string | any | ((params: any) => ReactElement);
export type Metadata = {
    singular?: Entry,
    plural?: Entry,
    zero?: Entry,
    dual?: Entry,
    one?: Entry,
    two?: Entry,
    few?: Entry,
    many?: Entry,
    other?: Entry,
    variablesOptions?: Record<string, any>
    [key: string]: any
}

export type DictionaryEntry = Entry | [Entry] | [Entry, Metadata];

export type Dictionary = {
    [key: string]: Dictionary | DictionaryEntry;
}

export type TranslatedChild = TranslatedElement | string | VariableObject;
export type TranslatedChildren = TranslatedChild | TranslatedChild[];

export type TranslatedElement = {
    type: string,
    props: {
        'data-_gt': {
            id: number,
            transformation: string,
            variableType?: "variable" | "number" | "currency" | "datetime",
            branches?: Record<string, any>,
            defaultChildren?: any
            [key: string]: any
        }
        children?: TranslatedChildren
    }
}

export type VariableObject = {
    key: string,
    variable?: "variable" | "number" | "datetime" | "currency"
}

export type Translation = {
    k: string, t: TranslatedChildren,
    singular?: TranslatedChildren,
    plural?: TranslatedChildren,
    dual?: TranslatedChildren,
    zero?: TranslatedChildren,
    one?: TranslatedChildren,
    two?: TranslatedChildren,
    few?: TranslatedChildren,
    many?: TranslatedChildren,
    other?: TranslatedChildren
};