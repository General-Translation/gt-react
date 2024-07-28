export type Range = {
    max: number;
    min: number;
    children: any;
};
/**
 * Main function to get the appropriate branch based on the provided number and branches.
 *
 * @param {number} n - The number to determine the branch for.
 * @param {any} branches - The object containing possible branches and their corresponding ranges and options.
 * @returns {any} The determined branch.
 */
export default function getNumericBranch(n: number, locale: string, branches: any): any;
//# sourceMappingURL=getNumericBranch.d.ts.map