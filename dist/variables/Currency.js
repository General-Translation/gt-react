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
var Currency = function (_a) {
    var _b = _a === void 0 ? { name: "cost" } : _a, children = _b.children, _c = _b.name, name = _c === void 0 ? "cost" : _c, defaultValue = _b.defaultValue, _d = _b.currency, currency = _d === void 0 ? "USD" : _d, _e = _b.options, options = _e === void 0 ? {} : _e;
    var locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()];
    var value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    // Format the value using Intl.NumberFormat
    if (typeof value === 'number') {
        value = (0, generaltranslation_1.formatCurrency)({ value: value, languages: locales, currency: currency, options: options });
    }
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": __assign({ style: 'currency', currency: currency }, options), children: value }));
};
// Static property to indicate the transformation type
Currency.gtTransformation = "variable-currency";
exports.default = Currency;
//# sourceMappingURL=Currency.js.map