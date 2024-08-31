import { ComponentType } from 'react';
type Variables = {
    /**
     * Component for rendering variables.
     *
     * `children?` - (any) - The content to render if provided. Overrides `defaultValue`.
     *
     * `name?` - (string) - The name of the variable, used for identifying the component.
     *
     * `defaultValue?` - (any) - The default value to display if `children` is not provided.
    **/
    Var: ComponentType<{
        children?: any;
        name?: string;
        defaultValue?: any;
    }>;
    /**
     * Component for rendering number variables.
     *
     * `children?` - (any) - The content to render if provided. Overrides `defaultValue`.
     *
     * `name?` - (string) - The name of the variable, used for identifying the component.
     *
     * `defaultValue?` - (any) - The default value to display if `children` is not provided. This can be a number or a string representation of a number.
     *
     * `options?` - (Intl.NumberFormatOptions) - Additional options for `Intl.NumberFormat` for formatting the number.
    **/
    Num: ComponentType<{
        children?: any;
        name?: string;
        defaultValue?: any;
        options?: Intl.NumberFormatOptions;
    }>;
    /**
     * Component for rendering date variables.
     *
     * `children?` - (any) - The content to render if provided. Overrides `defaultValue`.
     *
     * `name?` - (string) - The name of the variable, used for identifying the component.
     *
     * `defaultValue?` - (any) - The default value to display if `children` is not provided. This can be a number (Unix timestamp), string, or Date object.
     *
     * `options?` - (Intl.DateTimeFormatOptions) - Additional options for `Intl.DateTimeFormat` for formatting the date.
    **/
    DateTime: ComponentType<{
        children?: any;
        name?: string;
        defaultValue?: any;
        options?: Intl.DateTimeFormatOptions;
    }>;
    /**
     * Component for rendering currency variables.
     *
     * `children?` - (any) - The content to render if provided. Overrides `defaultValue`.
     *
     * `name?` - (string) - The name of the variable, used for identifying the component.
     *
     * `defaultValue?` - (any) - The default value to display if `children` is not provided. This should be a number or a string representation of a number.
     *
     * `currency?` - (string) - The currency code to use for formatting. Defaults to "USD".
     *
     * `options?` - (Intl.NumberFormatOptions) - Additional options for `Intl.NumberFormat` for formatting the currency.
    **/
    Currency: ComponentType<{
        children?: any;
        name?: string;
        defaultValue?: any;
        currency?: string;
        options?: Intl.NumberFormatOptions;
    }>;
    /**
    * Server-side function which gets the user's current locale.
    * Returns a BCP 47 language code representing the user's language, e.g. `en-US`.
    **/
    getLocale: () => string;
    /**
     * Server-side function which gets the application's default locale.
     * Returns a BCP 47 language code representing a language, e.g. `en-US`.
    **/
    getDefaultLocale: () => string;
};
export default Variables;
//# sourceMappingURL=Variables.d.ts.map