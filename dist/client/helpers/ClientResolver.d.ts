import { ReactNode } from 'react';
/**
 * Resolver component to handle async resolution of children.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The children to resolve.
 * @param {ReactNode} props.fallback - The fallback to display on error.
 * @returns {JSX.Element} The resolved children or fallback.
 */
export default function ClientResolver({ promise, fallback }: {
    promise: Promise<any>;
    fallback: ReactNode;
}): JSX.Element;
//# sourceMappingURL=ClientResolver.d.ts.map