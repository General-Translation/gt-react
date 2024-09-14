import { ReactNode } from 'react';
/**
 * The `<Currency>` component renders a formatted currency string, allowing customization of name, default value, currency type, and formatting options.
 * Must be used inside a `<GTProvider>`.
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
 * @returns {ReactNode} The formatted currency component.
 */
declare const Currency: {
    ({ children, name, defaultValue, currency, options }?: {
        children?: any;
        name?: string;
        defaultValue?: any;
        currency?: string;
        options?: Intl.NumberFormatOptions;
    }): ReactNode;
    gtTransformation: string;
};
export default Currency;
//# sourceMappingURL=Currency.d.ts.map