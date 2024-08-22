'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { useGTContext } from "../ClientProvider";
import ClientValue from "../value/ClientValue";
import ClientPlural from "../plural/ClientPlural";
/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
export default function useGT(id) {
    // Create a prefix for translation keys if an id is provided
    const prefix = useMemo(() => {
        return id ? `${id}.` : '';
    }, [id]);
    // Get the translation context
    let translate;
    try {
        ({ translate } = useGTContext());
    }
    catch (_a) {
        throw new Error(`t('${id}'): No context provided. useGT() can only be used inside a GTProvider.`);
    }
    // Return a translation function if available, otherwise return a no-op function
    return (id, options) => {
        const translation = translate(`${prefix}${id}`);
        console.log(translation);
        // If a plural or value is required
        if (options) {
            const { n, values } = options;
            if (typeof n === 'number') {
                const innerProps = { n, values };
                return (_jsx(ClientPlural, Object.assign({ id: id }, innerProps, { children: translation })));
            }
            else if (values) {
                return (_jsx(ClientValue, { id: id, values: values, children: translation }));
            }
        }
        if (!translation)
            console.warn(`t('${id}') finding no translation for dictionary item ${prefix}${id} !`);
        return translation;
    };
}
//# sourceMappingURL=useGT.js.map