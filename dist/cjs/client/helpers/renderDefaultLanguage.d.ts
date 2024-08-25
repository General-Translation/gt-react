import { ReactNode } from "react";
type SourceChild = ReactNode;
type Source = SourceChild | SourceChild[];
export default function renderDefaultLanguage({ source, variables, ...metadata }: {
    source: Source;
    variables?: Record<string, any>;
    [key: string]: any;
}): any;
export {};
//# sourceMappingURL=renderDefaultLanguage.d.ts.map