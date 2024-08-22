"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLocale;
const ClientProvider_1 = require("../ClientProvider");
/**
 * @returns {string} The user's current locale.
 */
function useLocale() {
    const { locale } = (0, ClientProvider_1.useGTContext)();
    return locale;
}
//# sourceMappingURL=useLocale.js.map