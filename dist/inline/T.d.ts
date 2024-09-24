/**
 * Translation component that handles rendering translated content, including plural forms.
 * Used with the required `id` parameter instead of `const t = useGT()`.
 *
 * @param {string} [id] - Required identifier for the translation string.
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {number} [n] - Optional number to determine plural forms.
 * @param {Object} [variables] - Variables for interpolation in the translation string.
 * @param {Object} [variablesOptions] - Optional formatting options for numeric or date variables.
 * @param {any} [context] - Additional context for translation key generation.
 * @param {Object} [props] - Additional props for the component.
 * @returns {JSX.Element} The rendered translation or fallback content based on the provided configuration.
 *
 * @throws {Error} If a plural translation is requested but the `n` option is not provided.
 *
 * @example
 * ```jsx
 * // Basic usage:
 * <T id="welcome_message" variables={{ name: "John" }}>
 *  Hello, <Var name="name"/>!
 * </T>
 * ```
 *
 * @example
 * ```jsx
 * // Using plural translations:
 * <T id="item_count" variables={{ n: 3 }} singular={"You have one item"}>
 *  You have <Num/> items
 * </T>
 * ```
 *
 */
export default function T({ children, id, variables, n, variablesOptions, context, ...props }: {
    children?: any;
    id: string;
    n?: number;
    variables?: Record<string, any>;
    variablesOptions?: {
        [key: string]: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
    };
    context?: string;
    [key: string]: any;
}): import("react").ReactNode;
//# sourceMappingURL=T.d.ts.map