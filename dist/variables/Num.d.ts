/**
 * The `<Num>` component renders a formatted number string, allowing customization of the name, default value, and formatting options.
 * It formats the number according to the current locale and optionally passed formatting options.
 *
 * @example
 * ```jsx
 * <Num
 *    name="quantity"
 *    options={{ style: "decimal", maximumFractionDigits: 2 }}
 * >
 *    1000
 * </Num>
 * ```
 *
 * @param {any} [children] - Optional content (typically a number) to render inside the component.
 * @param {string} [name="n"] - Optional name for the number field, used for metadata purposes.
 * @param {string|number} [value] - The default value for the number. Can be a string or number. Strings will be parsed to numbers.
 * @param {Intl.NumberFormatOptions} [options={}] - Optional formatting options for the number, following `Intl.NumberFormatOptions` specifications.
 * @returns {Promise<JSX.Element>} The formatted number component.
 */
declare function Num({ children, name, value, options, ...props }: {
    children?: any;
    name?: string;
    value?: any;
    options?: Intl.NumberFormatOptions;
    'data-_gt'?: any;
}): Promise<JSX.Element>;
declare namespace Num {
    var gtTransformation: string;
}
export default Num;
//# sourceMappingURL=Num.d.ts.map