import * as react from 'react';
import react__default, { ReactNode } from 'react';

type GTContextType = {
    [key: string]: any;
};
declare const GTContext: react.Context<GTContextType | undefined>;

declare function renderDefaultChildren({ children, variables, variablesOptions, defaultLocale }: {
    children: ReactNode;
    variables?: Record<string, any>;
    variablesOptions?: Record<string, any>;
    defaultLocale: string;
}): react__default.ReactNode;

type TranslatedChild = TranslatedElement | string | VariableObject;
type TranslatedChildren = TranslatedChild | TranslatedChild[];
type TranslatedElement = {
    type: string;
    props: {
        'data-generaltranslation': {
            id: number;
            transformation: string;
            variableType?: "variable" | "number" | "currency" | "datetime";
            branches?: Record<string, any>;
            defaultChildren?: any;
            [key: string]: any;
        };
        children?: TranslatedChildren;
    };
};
type VariableObject = {
    key: string;
    variable?: "variable" | "number" | "datetime" | "currency";
};

declare function renderTranslatedChildren({ source, target, variables, variablesOptions, locales }: {
    source: ReactNode;
    target: TranslatedChildren;
    variables?: Record<string, any>;
    variablesOptions?: Record<string, any>;
    locales: string[];
}): ReactNode;

/**
 * Hook to retrieve the browser's default language, with support for a fallback and locale stored in a cookie.
 *
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if the browser locale is not available.
 * @param {string} [cookieName=localeCookieName] - The name of the cookie to check for a stored locale. If omitted, no cookie is used.
 * @returns {string} The resolved browser locale, either from the cookie, browser settings, or the default locale.
 *
 * @example
 * const browserLocale = useBrowserLocale('en-US');
 * console.log(browserLocale); // Outputs the browser's locale, or 'en-US' if unavailable
 *
 * @example
 * const browserLocale = useBrowserLocale('fr', 'localeCookie');
 * console.log(browserLocale); // Outputs locale from cookie 'localeCookie' if available, or browser's locale otherwise
 *
 * @description
 * This hook attempts to determine the browser's preferred language. If a locale is stored in a cookie (specified by `cookieName`),
 * it will take precedence. If not, it falls back to the `navigator.language` or `navigator.userLanguage`. If none of these are available,
 * the provided `defaultLocale` is used.
 */
declare function useBrowserLocale(defaultLocale?: string, cookieName?: string, locales?: string[]): string;

export { GTContext as _GTContext, renderDefaultChildren as _renderDefaultChildren, renderTranslatedChildren as _renderTranslatedChildren, useBrowserLocale };
