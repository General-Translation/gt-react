import { ComponentType, ReactNode } from 'react';
import Variables from './Variables';
type GeneralTranslation = Variables & {
    /**
    * The `<T>` component. Translates its ReactNode children into the user's locale.
    *
    * `children?` - (any) - Children to translate.
    *
    * `id?` - (string) - Specifies an ID in the target dictionary for the created translation. Used to prevent storing unnecessary translations by overwriting previous translations with the same ID. Defaults to a hash of the component's children.
    *
    * `...props` - ([key: string]: any) - Optional metadata which will override the global `gt-react` configuration. See https://docs.generaltranslation.com for a full list of possible props.
    */
    T: ComponentType<{
        children?: any;
        id?: string;
        [key: string]: any;
    }>;
    /**
    * Translates a string asynchronously, storing the result in the translation dictionary.
    *
    * `content` - (string) - Text content to translate into the user's language.
    *
    * `options?` - ({ [key: string]: any }) - Other parameters. See https://docs.generaltranslation.com for a full list.
    *
    * `options.targetLanguage?` - (string) - A BCP 47 language tag which represents the language to translate into. Defaults to the user's locale.
    *
    * `options.id?` - (string) - Specifies an ID in the target dictionary for the created translation. Used to prevent storing unnecessary translations by overwriting previous translations with the same ID. Defaults to `content`. (string)
    */
    intl: (content: string, options?: {
        targetLanguage?: string;
        id?: string;
        [key: string]: any;
    }) => Promise<string>;
    /**
    * The `<GTProvider>` component. Used on the server, but all children must be client components (or able to run on the client). Provides translations and locale data to its children using React's context API. Children are able to use the `useGT`, `useLocale`, and `useDefaultLocale` hooks.
    *
    * If `id` or `dictionary` components are not provided, translations of all entries in the default `createGT` dictionary are provided.
    *
    * These translations can be accessed on the client using the `useGT` hook.
    *
    * `children?` - (any) - Children to which context is provided.
    *
    * `id?` - (string) - If provided, only the items in the initial dictionary which fall under that ID will be provided to the client, alongside any additional items in the `dictionary` prop. Any new translations created by this component will be assigned (`id + '.'`) as a prefix.
    *
    * `dictionary?` - (Record<string, any>) - Object representing a dictionary, where keys are strings and the values are strings or React children, which are translated and sent to the client. Advanced: dictionary entries can also be arbitrary promises which are resolved and provided the client.
    *
    * `...props` - ([key: string]: any) - Optional metadata which will override the global `gt-react` configuration. See https://docs.generaltranslation.com for a full list of possible props.
    */
    GTProvider: ComponentType<{
        children?: any;
        id?: string;
        [key: string]: any;
    }>;
    /**
    * Server-side function which gets an entry from the default dictionary and wraps it in the `<T>` component.
    *
    * `id` - (string) - ID of the item in the dictionary.
    *
    * `options?` - ({ [key: string]: any }) - Variable values. See https://docs.generaltranslation.com for a full list.
    */
    t: (id: string, options?: {
        n?: number;
        [key: string]: any;
    }) => any;
    /**
    * Server-side function which prepares a `t()` function by prepending an ID. Useful with large nested dictionaries. You can also import `t()` directly.
    * Equivalent to `useGT()` on the client-side.
    *
    * `id` - (string) - ID to be prepended.
    *
    */
    getGT: (id?: string) => (id: string, options?: {
        n?: number;
        [key: string]: any;
    }) => any;
    /**
     *  Type of <T> translation component which renders content around variables.
     *
     * `children?` - (any) - The default content to render if no conditions are met.
     *
     * `values?` - (Record<string, any>) - A set of values used for conditional rendering.
     */
    Value: ComponentType<{
        children?: any;
        values: Record<string, any>;
    }>;
    /**
     *  Type of <T> translation component which renders content around numbers.
     *
     * `children?` - (any) - The default content to render if no plural conditions are met.
     *
     * `n` - (number) - The number to evaluate against defined ranges or conditions.
     *
     * `ranges?` - ({ min: number, max: number, children: any }[]) - An array of range objects for determining which branch to render based on the number `n`.
    **/
    Plural: ComponentType<{
        children?: any;
        n: number;
        zero?: ReactNode;
        one?: ReactNode;
        two?: ReactNode;
        few?: ReactNode;
        many?: ReactNode;
        other?: ReactNode;
        ranges?: {
            min: number;
            max: number;
            children: any;
        }[];
    }>;
};
export default GeneralTranslation;
//# sourceMappingURL=GeneralTranslationInterface.d.ts.map