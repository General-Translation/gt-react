/**
 * Helper function to get the branch name from a number based on provided options.
 *
 * @param {number} n - The number to determine the branch name for.
 * @param {Record<string, any>} options - The options containing possible branch names.
 * @returns {string} The determined branch name.
 */
export declare function getBranchNameFromNumber(n: number, locales: string[], options: Record<string, any>): string;
/**
 * Main function to get the appropriate branch based on the provided number and branches.
 *
 * @param {number} n - The number to determine the branch for.
 * @param {any} branches - The object containing possible branches.
 * @returns {any} The determined branch.
 */
export default function getPluralBranch(n: number, locales: string[], branches: Record<string, any>): any;
//# sourceMappingURL=getPluralBranch.d.ts.map