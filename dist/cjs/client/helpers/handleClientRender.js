"use strict";
'use client';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleClientRender;
const renderClientChildren_1 = __importDefault(require("./renderClientChildren"));
function isPromise(value) {
    return !!value && typeof value.then === 'function';
}
function handleClientRender(_a) {
    var { source, target, renderAttributes } = _a, metadata = __rest(_a, ["source", "target", "renderAttributes"]);
    return (0, renderClientChildren_1.default)(Object.assign({ source, target: target, renderAttributes }, metadata));
}
//# sourceMappingURL=handleClientRender.js.map