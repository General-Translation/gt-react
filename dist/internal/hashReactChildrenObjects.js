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
exports.default = hashReactChildrenObjects;
var id_1 = require("generaltranslation/id");
/**
 * Calculates a unique ID for the given children objects by hashing their sanitized JSON string representation.
 *
 * @param {any} childrenAsObjects - The children objects to be hashed.
 * @returns {string} - A promise that resolves to the unique ID.
 */
function hashReactChildrenObjects(childrenAsObjects) {
    var unhashedKey = JSON.stringify(sanitizeChildrenAsObjects(childrenAsObjects));
    return (0, id_1.hashString)(unhashedKey);
}
function sanitizeChildrenAsObjects(childrenAsObjects) {
    var sanitizeChild = function (child) {
        var _a;
        if (child && typeof child === 'object' && child.props) {
            if ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.children) {
                var type = child.type, rest = __rest(child, ["type"]);
                return __assign(__assign({}, rest), { props: __assign(__assign({}, child.props), { children: sanitizeChildren(child.props.children) }) });
            }
            else {
                var type = child.type, rest = __rest(child, ["type"]);
                return rest;
            }
        }
        return child;
    };
    var sanitizeChildren = function (children) {
        return Array.isArray(children) ? children.map(sanitizeChild) : sanitizeChild(children);
    };
    return sanitizeChildren(childrenAsObjects);
}
//# sourceMappingURL=hashReactChildrenObjects.js.map