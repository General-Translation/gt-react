import { ReactNode } from 'react';
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
export default function ClientValue({ children, id, values }: {
    children?: any;
    id?: string;
    values: Record<string, any>;
}): ReactNode;
//# sourceMappingURL=ClientValue.d.ts.map