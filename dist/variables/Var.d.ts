import React from "react";
/**
 * The `<Var>` component renders a variable value, which can either be passed as `children` or a `value`.
 * If `children` is provided, it will be used; otherwise, the `value` is rendered.
 *
 * @example Inline usage:
 * ```jsx
 *  function MyComponent() {
 *     return (
 *          <T id="user">
 *              <p>
 *                  Hello, <Var> John </Var>!
 *              </p>
 *          </T>
 *      );
 *  }
 * ```
 *
 * @example Dictionary Usage:
 * ```jsx
 *  // dictionary.jsx
 *  const dictionary = {
 *      user: (
 *          <>
 *              Hello, <Var name="user-name" />! Your dog's name is <Var name="dog-name"/>.
 *          </>
 *      ),
 *  }
 *
 *  // component.jsx
 *  function MyComponent() {
 *      const t = useGT();
 *      return (
 *          <p>
 *              { t('user', { 'user-name': 'John', 'dog-name': 'Rex' }) }
 *          </p>
 *      );
 *  }
 * ```
 *
 *
 * @param {any} [children] - The content to render inside the component. If provided, it will take precedence over `value`.
 * @param {string} [name] - Optional name for the variable, used for metadata purposes.
 * @param {any} [value] - The default value to be displayed if `children` is not provided.
 * @returns {JSX.Element} The rendered variable component with either `children` or `value`.
 */
declare function Var({ children, name, value }: {
    children?: any;
    name?: string;
    value?: any;
}): React.JSX.Element;
declare namespace Var {
    var gtTransformation: string;
}
export default Var;
//# sourceMappingURL=Var.d.ts.map