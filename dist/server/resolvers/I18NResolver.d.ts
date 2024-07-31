import { ReactNode } from 'react';
interface I18NResolverProps {
    children: ReactNode | Promise<ReactNode>;
    fallback: ReactNode;
}
export default function I18NResolver({ children, fallback }: I18NResolverProps): JSX.Element;
export {};
//# sourceMappingURL=I18NResolver.d.ts.map