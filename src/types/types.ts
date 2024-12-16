import React, { ReactElement } from "react"

export type Entry = string | ReactElement;
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
    context?: string,
    variablesOptions?: Record<string, any>
    [key: string]: any
};
export type DictionaryEntry = Entry | [ Entry ] | [ Entry, Metadata ];
export type Dictionary = {
    [key: string]: Dictionary | DictionaryEntry;
}

export type Variable = {
    key: string,
    id?: number,
    variable?: "variable" | "number" | "datetime" | "currency"
}
export type TranslatedElement = {
    type: string,
    props: {
        'data-_gt': {
            id: number,
            [key: string]: any
        }
        children?: TranslatedChildren
    }
}
export type TranslatedChild = TranslatedElement | string | Variable;
export type TranslatedChildren = TranslatedChild | TranslatedChild[];

export type Content = string | (Variable | string)[]
export type TranslationsObject = {
    [id: string]: {
        [hash: string]: TranslatedChildren
    }
}