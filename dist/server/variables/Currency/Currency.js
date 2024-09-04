"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var generaltranslation_1 = require("generaltranslation");
var Currency = function (_a) {
    var children = _a.children, locales = _a.locales, _b = _a.name, name = _b === void 0 ? "cost" : _b, defaultValue = _a.defaultValue, _c = _a.currency, currency = _c === void 0 ? "USD" : _c, _d = _a.options, options = _d === void 0 ? {} : _d, props = __rest(_a, ["children", "locales", "name", "defaultValue", "currency", "options"]);
    var generaltranslation = props["data-generaltranslation"];
    // Determine the value to be formatted
    var value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    // Format the number as currency according to the locale
    var formattedValue = (typeof value === 'number')
        ? (0, generaltranslation_1.formatCurrency)({ value: value, currency: currency, languages: locales, options: options })
        : value;
    return ((0, jsx_runtime_1.jsx)("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": __assign({ style: 'currency', currency: currency }, options), "data-gt-unformatted-value": value, children: formattedValue }));
};
Currency.gtTransformation = "variable-currency";
exports.default = Currency;
//# sourceMappingURL=Currency.js.map