/**
 * Helper function to get the branch name from a number based on provided options.
 * 
 * @param {number} n - The number to determine the branch name for.
 * @param {Record<string, any>} options - The options containing possible branch names.
 * @returns {string} The determined branch name.
 */
function getBranchNameFromNumber(n: number, locales: string[], options: Record<string, any>): string {
    const pluralRules = new Intl.PluralRules(locales);
    const provisionalBranchName = pluralRules.select(n);
    // aliases
    // 0
    if (n === 0 && options["zero"]) return "zero"; // override
    // 1
    if (Math.abs(n) === 1 && options["singular"]) return "singular"; // override
    if (Math.abs(n) === 1 && options["one"]) return "one"; // override
    if (provisionalBranchName === "one" && options["singular"]) return "singular";
    // 2
    if (Math.abs(n) === 2 && options["dual"]) return "dual"; // override
    if (Math.abs(n) === 2 && options["two"]) return "two"; // override
    if (provisionalBranchName === "two" && options["dual"]) return "dual";
    if (provisionalBranchName === "two" && options["plural"]) return "plural";
    if (provisionalBranchName === "two" && options["other"]) return "other";
    // few
    if (provisionalBranchName === "few" && options["paucal"]) return "paucal";
    if (provisionalBranchName === "few" && options["other"]) return "other";
    // many
    if (provisionalBranchName === "many" && options["other"]) return "plural";
    // default
    if (options[provisionalBranchName]) return provisionalBranchName;
    if (provisionalBranchName === "few" && options["plural"]) return "plural";
    if (provisionalBranchName === "many" && options["plural"]) return "plural";
    // other
    if (provisionalBranchName === "other" && options["plural"]) return "plural";
    return "";
}


export type Range = {
    max: number;
    min: number;
    children: any;
}

/**
 * Helper function to get the branch from a list of ranges.
 * 
 * @param {number} n - The number to determine the branch for.
 * @param {Range[]} ranges - The list of ranges containing possible branches.
 * @returns {any | undefined} The determined branch or undefined if no matching range is found.
 */
function getBranchFromRanges(n: number, ranges: Range[]): any | undefined {
    for (const range of ranges) {
        if (range.min <= n && range.max >= n) return range.children;
    }
    return undefined;
}

/**
 * Main function to get the appropriate branch based on the provided number and branches.
 * 
 * @param {number} n - The number to determine the branch for.
 * @param {any} branches - The object containing possible branches and their corresponding ranges and options.
 * @returns {any} The determined branch.
 */
export default function getNumericBranch(n: number, locales: string[], branches: any) {
    let branchName = '';
    let branch = null;
    if (typeof n === 'number' && branches?.ranges) branch = getBranchFromRanges(n, branches.ranges);
    if (typeof n === 'number' && !branch && branches) branchName = getBranchNameFromNumber(n, locales, branches);
    if (branchName && !branch) branch = branches[branchName];
    return branch;
}