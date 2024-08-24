import { ReactNode } from "react";

export type TargetVariable = { variable: "variable" | "number" | "date" | "currency", key: string }
export type TargetElement = {
    type: string;
    props?: {
        children?: Target,
        'data-generaltranslation': any
    }
};
export type TargetChild = TargetElement | string | number | boolean | TargetVariable;
export type Target = TargetChild | TargetChild[];

export type SourceChild = ReactNode;
export type Source = SourceChild | SourceChild[];