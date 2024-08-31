import { ReactNode } from 'react';
import { Range } from '../../primitives/variables/getPluralBranch';
/**
 * Plural component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
declare const ClientPlural: {
    ({ children, n, values, ranges, ...branches }: {
        children?: any;
        n: number;
        ranges?: Range[];
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        many?: any;
        other?: any;
        singular?: any;
        dual?: any;
        plural?: any;
        values?: Record<string, any>;
    }): ReactNode;
    gtTransformation: string;
};
export default ClientPlural;
//# sourceMappingURL=ClientPlural.d.ts.map