"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDefaultLocale;
const ClientProvider_1 = require("../ClientProvider");
/**
 * @returns {string} The default locale.
 */
function useDefaultLocale() {
    const { defaultLocale } = (0, ClientProvider_1.useGTContext)();
    return defaultLocale;
}
//# sourceMappingURL=useDefaultLocale.js.map