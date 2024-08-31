import { ReactNode } from 'react';
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {ReactNode} children - Default children to render if no branches match.
 * @param {Record<string, any>} values - Values to branch and translate around.
 * @returns {ReactNode}
 */
declare const ClientValue: ({ children, values }: {
    children?: any;
    values: Record<string, any>;
}) => ReactNode;
export default ClientValue;
//# sourceMappingURL=ClientValue.d.ts.map