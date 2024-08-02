import 'server-only';
import { ReactNode } from 'react';
import { Range } from '../helpers/getNumericBranch';
type NumericProps = {
    n?: number;
    children?: any;
    ranges?: Range[];
    locales: string[];
    [key: string]: any;
};
/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {JSX.Element}
 */
export default function Numeric({ children, n, ranges, locales, ...branches }: NumericProps): ReactNode;
export {};
//# sourceMappingURL=Numeric.d.ts.map