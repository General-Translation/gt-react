"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLocale;
var ClientProvider_1 = require("../ClientProvider");
/**
 * @returns {string} The user's current locale.
 */
function useLocale() {
    var locale = (0, ClientProvider_1.useGTContext)().locale;
    return locale;
}
//# sourceMappingURL=useLocale.js.map