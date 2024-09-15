/**
 * The `<Currency>` component renders a formatted currency string, allowing customization of name, default value, currency type, and formatting options.
 *
 * @example
 * ```jsx
 * <Currency
 *    name="price"
 *    currency="USD"
 * >
 *    1000
 * </Currency>
 * ```
 *
 * @param {any} [children] - Optional content to render inside the currency component.
 * @param {string} [name] - Optional name for the currency field.
 * @param {any} [defaultValue] - The default value to be used.
 * @param {string} [currency] - The currency type (e.g., USD, EUR, etc.).
 * @param {Intl.NumberFormatOptions} [options] - Optional formatting options to customize how the currency is displayed.
 * @returns {JSX.Element} The formatted currency component.
 */
declare function Currency({ children, name, defaultValue, currency, options, ...props }: {
    children?: any;
    name?: string;
    defaultValue?: any;
    currency?: string;
    options?: Intl.NumberFormatOptions;
    [key: string]: any;
}): JSX.Element;
declare namespace Currency {
    var gtTransformation: string;
}
export default Currency;
//# sourceMappingURL=Currency.d.ts.map