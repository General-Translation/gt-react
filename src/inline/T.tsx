import { isSameLanguage } from "generaltranslation";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier, getPluralBranch } from "../internal";
import { pluralBranchNames } from "../primitives/primitives";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import useGT from "../hooks/useGT";
import { useMemo } from "react";

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
export default function T({
    children, id,
    variables, n,
    variablesOptions, context,
    ...props
}: {
    children?: any,
    id: string
    n?: number,
    variables?: Record<string, any>,
    variablesOptions?: {
       [key: string]: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions
    },
    context?: string,
    [key: string]: any
}) {
    
    if (!id) {
        throw new Error(`Client-side <T> with no provided 'id' prop. Children: ${children}`)
    }

    const { translations } = useGTContext(
        `<T id="${id}"> with children ${children} used on the client-side outside of <GTProvider>`
    );

    const t = useGT();

    if (!children) {
        return t(id, { variables, ...(variablesOptions && { variablesOptions })});
    }

    variables = { ...variables, ...(typeof n === 'number' && { n })}

    const locale = useLocale();
    const defaultLocale = useDefaultLocale();

    const taggedChildren = useMemo(() => addGTIdentifier(children, props), [children, props])
    let source;

    // Get a plural if appropriate (check type, if type, get branch, entry =)
    const isPlural = props && pluralBranchNames.some(branchName => branchName in props);
    if (isPlural) {
        if (typeof n === 'number') (variables ||= {} as any).n = n;
        if (typeof variables?.n !== 'number') {
            throw new Error(
                id ? 
                `ID "${id}": Plural requires "n" option.` :
                `<T> with props ${JSON.stringify(props)}: Plural requires "n" option.` 
            );
        }
        source = getPluralBranch(
            (variables as any).n, 
            [locale, defaultLocale], // not redundant, as locale could be a different dialect of the same language
            taggedChildren.props['data-generaltranslation'].branches
        ) || taggedChildren.props.children;
    } else {
        source = taggedChildren;
    }

    const translationRequired: boolean = (() => {
        if (!locale) return false;
        if (isSameLanguage(locale, defaultLocale)) return false;
        return true;
    })();

    if (!translationRequired) {
        return renderDefaultChildren({
            entry: source,
            variables, variablesOptions
        });
    }

    // Do translation

    const translation = translations[id];

    if (!translation || !translation.t) {
        throw new Error(`<T id="${id}"> with children "${children}" is used in a client component without a corresponding translation.`)
    }

    let target = translation.t;

    if (isPlural) {
        target = getPluralBranch(
            variables?.n as number,
            [locale, defaultLocale],
            (target as any).props?.['data-generaltranslation']?.branches
        ) || (target as any)?.props?.children;
    }

    return renderTranslatedChildren({
        source, target,
        variables, variablesOptions
    });
}