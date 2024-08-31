"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDefaultLocale;
var ClientProvider_1 = require("../ClientProvider");
/**
 * @returns {string} The default locale.
 */
function useDefaultLocale() {
    var defaultLocale = (0, ClientProvider_1.useGTContext)().defaultLocale;
    return defaultLocale;
}
//# sourceMappingURL=useDefaultLocale.js.map