"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useLocale_1 = __importDefault(require("../hooks/useLocale"));
const useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
const ClientCurrency = ({ children, name = "cost", defaultValue, currency = "USD", options = {} } = { name: "cost" }) => {
    const locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()];
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    // Format the value using Intl.NumberFormat
    if (typeof value === 'number') {
        value = new Intl.NumberFormat(locales, Object.assign({ style: 'currency', currency, numberingSystem: 'latn' }, options)).format(value);
    }
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": Object.assign({ style: 'currency', currency }, options), children: value }));
};
// Static property to indicate the transformation type
ClientCurrency.gtTransformation = "variable-currency";
exports.default = ClientCurrency;
//# sourceMappingURL=ClientCurrency.js.map