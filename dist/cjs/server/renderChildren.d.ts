import { ReactNode } from 'react';
type TargetElement = Record<string, any>;
type TargetChild = TargetElement | string | number | boolean;
type Target = TargetChild | TargetChild[];
type SourceChild = ReactNode | Record<string, any>;
type Source = SourceChild | SourceChild[];
/**
 * Renders children elements based on the provided source and target.
 * Handles transformations and branching for number and value variables.
 *
 * @param {Source} source - The source elements to be rendered.
 * @param {Target} [target] - The target elements that may alter the rendering of the source.
 * @param {Record<string, Source>} [variables] - An optional set of variables for transformations and branching.
 *
 * @returns {ReactNode} The rendered children elements.
 */
export default function renderChildren({ source, target, ...metadata }: {
    source: Source;
    target?: Target;
    variables?: Record<string, Source>;
    [key: string]: any;
}): ReactNode;
export {};
//# sourceMappingURL=renderChildren.d.ts.map