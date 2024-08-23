"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGT;
const react_1 = require("react");
const ClientProvider_1 = require("../ClientProvider");
/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
function useGT(id) {
    // Create a prefix for translation keys if an id is provided
    const prefix = (0, react_1.useMemo)(() => {
        return id ? `${id}.` : '';
    }, [id]);
    // Get the translation context
    let translate;
    try {
        ({ translate } = (0, ClientProvider_1.useGTContext)());
    }
    catch (_a) {
        throw new Error(`t('${id}'): No context provided. useGT() can only be used inside a GTProvider.`);
    }
    // Return a translation function if available, otherwise return a no-op function
    return (id, options) => {
        const translation = translate(`${prefix}${id}`, options);
        if (!translation)
            console.warn(`t('${id}') finding no translation for dictionary item ${prefix}${id} !`);
        return translation;
    };
}
/*
// If a plural or value is required
        if (options) {
            const {
                n, values
            } = options;
            if (typeof n === 'number') {
                const innerProps = { n, values };
                return (
                    <ClientPlural id={id} {...innerProps}>
                        {translation}
                    </ClientPlural>
                )
            } else if (values) {
                return (
                    <ClientValue id={id} values={values}>
                        {translation}
                    </ClientValue>
                )
            }
        }

*/ 
//# sourceMappingURL=useGT.js.map