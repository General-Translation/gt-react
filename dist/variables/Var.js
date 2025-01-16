"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * The `<Var>` component renders a variable value, which can either be passed as `children` or a `value`.
 * If `children` is provided, it will be used; otherwise, the `value` is rendered.
 *
 * @example
 * ```jsx
 * <Var
 *    name="username"
 * >
 *    John
 * </Var>
 * ```
 *
 * @param {any} [children] - The content to render inside the component. If provided, it will take precedence over `value`.
 * @param {string} [name] - Optional name for the variable, used for metadata purposes.
 * @param {any} [value] - The default value to be displayed if `children` is not provided.
 * @returns {JSX.Element} The rendered variable component with either `children` or `value`.
 */
function Var(_a) {
    var children = _a.children, name = _a.name, value = _a.value;
    var final = typeof children !== 'undefined' ? children : value;
    return ((0, jsx_runtime_1.jsx)("span", { "data-_gt-variable-name": name, "data-_gt-variable-type": "variable", style: { display: 'contents' }, children: final }));
}
;
Var.gtTransformation = "variable-variable";
exports.default = Var;
//# sourceMappingURL=Var.js.map