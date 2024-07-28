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
    const ctx = (0, react_1.useContext)(ClientProvider_1.GTContext);
    // Return a translation function if available, otherwise return a no-op function
    if (ctx === null || ctx === void 0 ? void 0 : ctx.translate) {
        return (id) => ctx.translate(`${prefix}${id}`);
    }
    return () => { };
}
//# sourceMappingURL=useGT.js.map