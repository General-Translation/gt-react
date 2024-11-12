import React, { ReactNode } from "react";
import useGTContext from "../provider/GTContext";

/**
 * Gets the translation function `t` provided by `<GTProvider>`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 *
 * @example
 * const t = useGT('user');
 * console.log(t('name')); // Translates item 'user.name'
 *
 * const t = useTranslation();
 * console.log(t('hello')); // Translates item 'hello'
 */
export default function useGT(id: string = ''): 
    (
        id: string, 
        options?: Record<string, any>,
        f?: Function
    ) => ReactNode 
{

    // Create a prefix for translation keys if an id is provided
    const getID = (suffix: string) => {
        return id ? `${id}.${suffix}` : suffix;
    }

    // Get the translation context
    const { translate } = useGTContext(
        `useGT('${id}'): No context provided. You're trying to get the t() function on the client, which can only be done inside a <GTProvider>.`
    );
   
    /**
    * Translates a dictionary item based on its `id` and options.
    * 
    * @param {string} [id=''] - The ID of the item in the dictionary to translate.
    * @param {Record<string, any>} [options={}] - Variables or parameters (e.g., `n`) passed into the translation for dynamic content.
    * @param {Function} [f] - `f` is executed with `options` as parameters, and its result is translated based on the dictionary value of `id`. You likely don't need this parameter unless you are using `gt-next`.
    * 
    * @returns {string | JSX.Element}
    */
    function t(
        id: string = '', 
        options: Record<string, any> = {}, 
        f?: Function
    ): string | JSX.Element | undefined {
        const prefixedID = getID(id);
        if (translate) {
            const translation = translate(prefixedID, options, f);
            if (!translation) console.warn(`t('${id}') finding no translation for dictionary item ${prefixedID} !`);
            return translation;
        }
        return undefined;
    };

    return t;
}