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
    if (options[provisionalBranchName]) return provisionalBranchName;
    // aliases
    const absN = Math.abs(n);
    // 0
    if (absN === 0 && options["zero"]) return "zero"; // override
    // 1
    if (absN === 1) {
        if (options["singular"]) return "singular"; // override
        if (options["one"]) return "one"; // override
    }
    if (provisionalBranchName === "one" && options["singular"]) return "singular";
    // 2
    if (absN === 2) {
        if (options["dual"]) return "dual"; // override
        if (options["two"]) return "two"; // override
    }
    if (provisionalBranchName === "two" && options["dual"]) return "dual";
    // fallbacks
    // two
    if (provisionalBranchName === "two" && options["dual"]) return "dual";
    if (provisionalBranchName === "two" && options["plural"]) return "plural";
    if (provisionalBranchName === "two" && options["other"]) return "other";
    // few
    if (provisionalBranchName === "few" && options["plural"]) return "plural";
    if (provisionalBranchName === "few" && options["other"]) return "other";
    // many
    if (provisionalBranchName === "many" && options["plural"]) return "plural";
    if (provisionalBranchName === "many" && options["other"]) return "other";
    // other
    if (provisionalBranchName === "other" && options["plural"]) return "plural";
    return "";
}

/**
 * Main function to get the appropriate branch based on the provided number and branches.
 * 
 * @param {number} n - The number to determine the branch for.
 * @param {any} branches - The object containing possible branches.
 * @returns {any} The determined branch.
 */
export default function getPluralBranch(n: number, locales: string[], branches: any) {
    let branchName = '';
    let branch = null;
    if (typeof n === 'number' && !branch && branches) branchName = getBranchNameFromNumber(n, locales, branches);
    if (branchName && !branch) branch = branches[branchName];
    return branch;
}