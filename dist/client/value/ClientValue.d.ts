import { ReactNode } from 'react';
type ValueProps = {
    children?: any;
    id?: string;
    branches?: Record<string, any>;
    values?: Record<string, any>;
};
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
export default function ClientValue({ children, id, branches, values }: ValueProps): ReactNode;
export {};
//# sourceMappingURL=ClientValue.d.ts.map