import { ReactNode } from 'react';
type PrivateProps = {
    children?: ReactNode;
    label?: string;
    'data-generaltranslation': any;
};
/**
 * Marks any children as private, excluding them from translation.
 *
 * @param {ReactNode} children
 * @param {string} label - used as a translation aid, as children are not sent to server.
 * @returns {ReactNode}
 */
declare const Private: {
    ({ children, label, ...params }: PrivateProps): any;
    gtTransformation: string;
};
export default Private;
//# sourceMappingURL=Private.d.ts.map