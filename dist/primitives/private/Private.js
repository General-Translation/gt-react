"use strict";
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
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Marks any children as private, excluding them from translation.
 *
 * @param {ReactNode} children
 * @param {string} label - used as a translation aid, as children are not sent to server.
 * @returns {ReactNode}
 */
const Private = (_a) => {
    var { children, label = '' } = _a, params = __rest(_a, ["children", "label"]);
    const { 'data-generaltranslation': generaltranslation } = params;
    return ((0, jsx_runtime_1.jsx)("span", { "data-label": label, "data-generaltranslation": generaltranslation, children: children }));
};
Private.gtTransformation = "private";
exports.default = Private;
//# sourceMappingURL=Private.js.map