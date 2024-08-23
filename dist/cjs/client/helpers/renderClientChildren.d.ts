import { ReactNode } from "react";
type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string | number | boolean | object;
type Target = TargetChild | TargetChild[];
type SourceChild = ReactNode | Record<string, any>;
type Source = SourceChild | SourceChild[];
export default function renderClientChildren({ source, target, ...metadata }: {
    source: Source;
    target?: Target;
    [key: string]: any;
}): any;
export {};
//# sourceMappingURL=renderClientChildren.d.ts.map