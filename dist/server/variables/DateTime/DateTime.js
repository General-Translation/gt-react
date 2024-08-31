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
var DateTime = function (_a) {
    var children = _a.children, locales = _a.locales, _b = _a.name, name = _b === void 0 ? "date" : _b, defaultValue = _a.defaultValue, _c = _a.options, options = _c === void 0 ? {} : _c, props = __rest(_a, ["children", "locales", "name", "defaultValue", "options"]);
    // Extract general translation data from props
    var generaltranslation = props["data-generaltranslation"];
    // Determine the default value to use
    if (typeof children !== 'undefined' && typeof defaultValue === 'undefined') {
        defaultValue = children;
    }
    if (!defaultValue) {
        return ((0, jsx_runtime_1.jsx)("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options }));
    }
    // Convert defaultValue to a Date object if it's a Unix time, string, or Date object
    var dateValue;
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue * 1000); // Assuming Unix time is in seconds
    }
    else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    }
    else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    // Format the date according to the locale and options
    var dateString = new Intl.DateTimeFormat(locales, __assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(dateValue) || (dateValue === null || dateValue === void 0 ? void 0 : dateValue.toLocaleString(locales, __assign({ calendar: "gregory", numberingSystem: "latn" }, options))) || '';
    var formattedValue = dateString.replace(/[\u200F\u202B\u202E]/g, '');
    // Render the formatted date within a span element
    return ((0, jsx_runtime_1.jsx)("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options, "data-gt-unformatted-value": dateValue, children: formattedValue }));
};
DateTime.gtTransformation = "variable-date";
exports.default = DateTime;
//# sourceMappingURL=DateTime.js.map