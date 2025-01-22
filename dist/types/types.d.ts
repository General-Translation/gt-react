import React, { ReactElement } from "react";
export type Child = React.ReactNode;
export type Children = Child[] | Child;
export type GTProp = {
    id: number;
    transformation?: string;
    children?: Children;
} & Record<string, any>;
export type TaggedChild = React.ReactNode | TaggedElement;
export type TaggedChildren = TaggedChild[] | TaggedChild;
export type TaggedElementProps = Record<string, any> & {
    'data-_gt': GTProp;
};
export type TaggedElement = React.ReactElement<TaggedElementProps>;
export type Entry = string | ReactElement;
export type Metadata = {
    singular?: Entry;
    plural?: Entry;
    zero?: Entry;
    dual?: Entry;
    one?: Entry;
    two?: Entry;
    few?: Entry;
    many?: Entry;
    other?: Entry;
    context?: string;
    variablesOptions?: Record<string, any>;
    [key: string]: any;
};
export type DictionaryEntry = Entry | [Entry] | [Entry, Metadata];
export type Dictionary = {
    [key: string]: Dictionary | DictionaryEntry;
};
export type FlattenedDictionary = {
    [key: string]: DictionaryEntry;
};
export type Variable = {
    key: string;
    id?: number;
    variable?: "variable" | "number" | "datetime" | "currency";
};
export type TranslatedElement = {
    type: string;
    props: {
        'data-_gt': {
            id: number;
            [key: string]: any;
        };
        children?: TranslatedChildren;
    };
};
export type TranslatedChild = TranslatedElement | string | Variable;
export type TranslatedChildren = TranslatedChild | TranslatedChild[];
export type TranslatedContent = string | (string | {
    key: string;
    variable?: string;
})[];
export type TranslationError = {
    state: 'error';
    error: string;
    code?: number;
};
export type TranslationSuccess = {
    state: 'success';
    entry: TranslatedChildren | TranslatedContent;
};
export type TranslationLoading = {
    state: 'loading';
};
export type TranslationsObject = {
    [id: string]: {
        [hash: string]: TranslationSuccess | TranslationLoading | TranslationError;
    };
};
export type RenderMethod = 'skeleton' | 'replace' | 'subtle' | 'default';
export type TranslateContentCallback = (params: {
    source: any;
    targetLocale: string;
    metadata: {
        hash: string;
        context?: string;
    } & Record<string, any>;
}) => Promise<void>;
export type TranslateChildrenCallback = (params: {
    source: any;
    targetLocale: string;
    metadata: {
        hash: string;
        context?: string;
    } & Record<string, any>;
}) => Promise<void>;
export type GTContextType = {
    translateDictionaryEntry: (id: string, options?: Record<string, any>) => React.ReactNode;
    translateContent: TranslateContentCallback;
    translateChildren: TranslateChildrenCallback;
    locale: string;
    defaultLocale: string;
    translations: TranslationsObject | null;
    translationRequired: boolean;
    dialectTranslationRequired: boolean;
    renderSettings: {
        method: RenderMethod;
        timeout?: number;
    };
    projectId?: string;
    translationEnabled?: boolean;
};
//# sourceMappingURL=types.d.ts.map