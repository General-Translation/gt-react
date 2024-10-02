/**
 * The `<Branch>` component dynamically renders a specified branch of content or a fallback child component.
 * It allows for flexible content switching based on the `branch` prop and an object of possible branches (`...branches`).
 * If the specified `branch` is present in the `branches` object, it renders the content of that branch.
 * If the `branch` is not found, it renders the provided `children` as fallback content.
 *
 * @example
 * ```jsx
 * <Branch branch="summary" summary={<p>This is a summary</p>} details={<p>Details here</p>}>
 *   <p>Fallback content</p>
 * </Branch>
 * ```
 * If the `branch` prop is set to `"summary"`, it will render `<p>This is a summary</p>`. If the `branch` is not set or does not match any keys in the branches object, it renders the fallback content `<p>Fallback content</p>`.
 *
 * @param {any} [children] - Fallback content to render if no matching branch is found.
 * @param {string} [name="branch"] - Optional name for the component, used for metadata or tracking purposes.
 * @param {string} [branch] - The name of the branch to render. The component looks for this key in the `...branches` object.
 * @param {object} [branches] - An object containing possible branches as keys and their corresponding content as values.
 * @returns {JSX.Element} The rendered branch or fallback content.
 */
function Branch({
    children, name = "branch", branch, ...props
}: {
    children?: any;
    name?: string,
    branch?: string;
    [key: string]: any;
}) {
    const { 'data-generaltranslation': generaltranslation, ...branches } = props;
    const renderedBranch = (branch && typeof branches[branch] !== 'undefined') ? branches[branch] : children;
    return (
        <span data-generaltranslation={generaltranslation} data-gt-name={name || "branch"} data-gt-branch-name={branch} data-gt-branches={branches}>
            {renderedBranch}
        </span>
    );
}

Branch.gtTransformation = "branch";
export default Branch;