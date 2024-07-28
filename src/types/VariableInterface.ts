import React, { ComponentType } from 'react';

export default interface Variables {
  
    /**
     * Component for rendering localized values.
     * 
     * `children?` - (any) - The default content to render if no conditions are met.
     * 
     * `branches?` - (Record<string, any>) - An object containing conditional branches to render. Keys represent condition names, and values are the corresponding content.
     * 
     * `values?` - (Record<string, any>) - A set of values used for conditional rendering.
     */
    Value: ComponentType<{
        children?: any;
        branches?: Record<string, any>;
        values?: Record<string, any>;
    }>;

    /**
     * Component for rendering localized numeric values.
     * 
     * `children?` - (any) - The default content to render if no numeric conditions are met.
     * 
     * `n` - (number) - The number to evaluate against defined ranges or conditions.
     * 
     * `ranges?` - (Range[]) - An array of range objects for determining which branch to render based on the number `n`.
     */
    Numeric: ComponentType<{
        children?: any;
        n: number;
        ranges?: Range[];
    }>;

    /**
     * Component for rendering variables.
     * 
     * `children?` - (any) - The content to render if provided. Overrides `defaultValue`.
     * 
     * `name?` - (string) - The name of the variable, used for identifying the component.
     * 
     * `defaultValue?` - (any) - The default value to display if `children` is not provided.
     */
    Variable: ComponentType<{
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
     * `options?` - (Record<string, any>) - Additional options for `Intl.NumberFormat` for formatting the number.
     */
    NumberVariable: ComponentType<{
        children?: any;
        name?: string;
        defaultValue?: any;
        options?: Record<string, any>;
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
     * `options?` - (Record<string, any>) - Additional options for `Intl.DateTimeFormat` for formatting the date.
     */
    DateVariable: ComponentType<{
        children?: any;
        name?: string;
        defaultValue?: any;
        options?: Record<string, any>;
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
     * `options?` - (Record<string, any>) - Additional options for `Intl.NumberFormat` for formatting the currency.
     */
    CurrencyVariable: ComponentType<{
        children?: any;
        name?: string;
        defaultValue?: any;
        currency?: string;
        options?: Record<string, any>;
    }>;

}
