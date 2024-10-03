"use strict";
'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var generaltranslation_1 = require("generaltranslation");
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
/**
 * The `<Currency>` component renders a formatted currency string, allowing customization of name, default value, currency type, and formatting options.
 * Must be used inside a `<GTProvider>`.
 *
 * @example
 * ```jsx
 * <Currency
 *    name="price"
 *    currency="USD"
 * >
 *    1000
 * </Currency>
 * ```
 *
 * @param {any} [children] - Optional content to render inside the currency component.
 * @param {string} [name] - Optional name for the currency field.
 * @param {any} [value] - The default value to be used.
 * @param {string} [currency] - The currency type (e.g., USD, EUR, etc.).
 * @param {Intl.NumberFormatOptions} [options] - Optional formatting options to customize how the currency is displayed.
 * @returns {JSX.Element} The formatted currency component.
 */
function Currency(_a) {
    var _b = _a === void 0 ? { name: "cost" } : _a, children = _b.children, _c = _b.name, name = _c === void 0 ? "cost" : _c, value = _b.value, _d = _b.currency, currency = _d === void 0 ? "USD" : _d, _e = _b.options, options = _e === void 0 ? {} : _e;
    var locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()];
    var renderedValue = (typeof children !== 'undefined' && typeof value === 'undefined') ? children : value;
    renderedValue = (typeof renderedValue === 'string') ? parseFloat(renderedValue) : renderedValue;
    // Format the value using Intl.NumberFormat
    if (typeof renderedValue === 'number') {
        renderedValue = (0, generaltranslation_1.formatCurrency)({ value: renderedValue, languages: locales, currency: currency, options: options });
    }
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": __assign({ style: 'currency', currency: currency }, options), children: renderedValue }));
}
;
// Static property to indicate the transformation type
Currency.gtTransformation = "variable-currency";
exports.default = Currency;
//# sourceMappingURL=Currency.js.map