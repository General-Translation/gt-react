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
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
var ClientDateTime = function (_a) {
    var _b = _a === void 0 ? { name: "date" } : _a, children = _b.children, _c = _b.name, name = _c === void 0 ? "date" : _c, defaultValue = _b.defaultValue, _d = _b.options, options = _d === void 0 ? {} : _d;
    var locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()];
    var final;
    var dateValue;
    defaultValue = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    if (!defaultValue)
        return '';
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue);
    }
    else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    }
    else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    if (typeof dateValue !== 'undefined') {
        final = (new Intl.DateTimeFormat(locales, __assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(dateValue) || (dateValue === null || dateValue === void 0 ? void 0 : dateValue.toLocaleString(locales, __assign({ calendar: "gregory", numberingSystem: "latn" }, options))) || '').replace(/[\u200F\u202B\u202E]/g, '');
    }
    // Render the formatted date within a span element
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options, children: final }));
};
// Static property for transformation type
ClientDateTime.gtTransformation = "variable-date";
exports.default = ClientDateTime;
//# sourceMappingURL=ClientDateTime.js.map