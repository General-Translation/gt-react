/**
 * Translation component that handles rendering translated content, including plural forms, using specified translation configurations.
 * This component can handle asynchronous translations and provides several fallback rendering methods if translations are unavailable or in progress.
 *
 * By default, General Translation saves the translation in a remote cache if an `id` option is passed.
 *
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {string} [id] - Optional identifier for the translation string. If not provided, a hash will be generated from the content.
 * @param {number} [n] - Optional number to determine plural forms.
 * @param {Object} [variables] - Variables for interpolation in the translation string.
 * @param {Object} [variablesOptions] - Optional formatting options for numeric or date variables.
 * @param {Object} [renderSettings] - Optional settings controlling how fallback content is rendered during translation.
 * @param {"skeleton" | "replace" | "hang" | "subtle"} [renderSettings.method] - Specifies the rendering method:
 *  - "skeleton": show a placeholder while translation is loading.
 *  - "replace": show the default content as a fallback while the translation is loading.
 *  - "hang": wait until the translation is fully loaded before rendering anything.
 *  - "subtle": display children without a translation initially, with translations being applied later if available.
 * @param {number | null} [renderSettings.timeout] - Optional timeout for translation loading.
 * @param {boolean} [renderSettings.fallbackToPrevious] - Whether to fallback to the last known translation if no translation is found for the current content.
 * @param {string} [dictionaryName] - Optional name of the translation dictionary to use.
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
 * <T id="item_count" n={3} variables={{ count: 3 }}>
 *  You have {count} items
 * </T>
 * ```
 *
 */
export default function T({ children, id, variables, variablesOptions, n, renderSettings, ...props }: {
    children: any;
    id?: string;
    n?: number;
    variables?: Record<string, any>;
    variablesOptions?: {
        [key: string]: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
    };
    renderSettings?: {
        method: "skeleton" | "replace" | "hang" | "subtle";
        timeout: number | null;
        fallbackToPrevious: boolean;
    };
    [key: string]: any;
}): Promise<string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<import("react").ReactNode> | null | undefined>;
//# sourceMappingURL=T.d.ts.map