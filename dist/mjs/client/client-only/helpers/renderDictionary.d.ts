import { ReactNode } from "react";
type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string | number | boolean | object;
type Target = TargetChild | TargetChild[];
type SourceChild = ReactNode | Record<string, any>;
type Source = SourceChild | SourceChild[];
export declare function renderClientChildren({ source, target, ...metadata }: {
    source: Source;
    target?: Target;
    [key: string]: any;
}): any;
export default function renderDictionary({ result, dictionary, locales }: any): any;
export {};
//# sourceMappingURL=renderDictionary.d.ts.map