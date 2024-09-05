import { ReactNode } from "react";
/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
export default function useGT(id?: string): (id: string, options?: Record<string, any>, f?: Function) => ReactNode;
//# sourceMappingURL=useGT.d.ts.map