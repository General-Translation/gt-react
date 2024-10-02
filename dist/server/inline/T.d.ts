type RenderSettings = {
    method: "skeleton" | "replace" | "hang" | "subtle";
    timeout: number | null;
    fallbackToPrevious: boolean;
};
/**
 * Translation component that handles rendering translated content, including plural forms, using specified translation configurations.
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
 * Used as an alternative to `t()`.
 *
 * When used on the server-side, can create translations on demand.
 * If you need to ensure server-side usage import from `'gt-next/server'`.
 *
 * By default, General Translation saves the translation in a remote cache if an `id` option is passed.
 *
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {string} [id] - Optional identifier for the translation string. If not provided, a hash will be generated from the content.
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
 */
export default function T({ children, id, variables, variablesOptions, renderSettings, ...props }: {
    children: any;
    id?: string;
    variables?: Record<string, any>;
    variablesOptions?: {
        [key: string]: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
    };
    renderSettings?: RenderSettings;
    [key: string]: any;
}): Promise<any>;
export {};
//# sourceMappingURL=T.d.ts.map