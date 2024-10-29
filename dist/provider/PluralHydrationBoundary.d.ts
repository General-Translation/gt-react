import React from 'react';
interface Props {
    children: React.ReactNode;
}
interface State {
    hasError: boolean;
}
declare class PluralHydrationBoundary extends React.Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(error: Error): State;
    render(): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined;
}
export default PluralHydrationBoundary;
//# sourceMappingURL=PluralHydrationBoundary.d.ts.map