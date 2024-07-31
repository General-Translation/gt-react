import { ReactNode } from 'react';
interface I18NResolverProps {
    children: ReactNode | Promise<ReactNode>;
    fallback: ReactNode;
}
/**
 * I18NResolver component handles the rendering of children which may be a promise.
 * If the promise resolves, the children are rendered inside a Suspense component.
 * If the promise fails, the fallback is rendered permanently.
 *
 * @param {I18NResolverProps} props - The properties for the component.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ReplaceResolver({ children, fallback }: I18NResolverProps): JSX.Element;
export {};
//# sourceMappingURL=ReplaceResolver.d.ts.map