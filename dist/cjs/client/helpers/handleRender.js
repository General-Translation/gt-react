"use strict";
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleRender;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ClientResolver_1 = __importDefault(require("./ClientResolver"));
const renderClientChildren_1 = __importDefault(require("./renderClientChildren"));
function isPromise(value) {
    return !!value && typeof value.then === 'function';
}
function handleRender(_a) {
    var { source, target } = _a, metadata = __rest(_a, ["source", "target"]);
    let targetContent;
    let targetFallbacks;
    if (Array.isArray(target)) {
        if (target.length === 2) {
            targetFallbacks = target[1];
        }
        targetContent = target[0];
    }
    else {
        targetContent = target;
    }
    if (isPromise(targetContent)) {
        const translationPromise = (() => __awaiter(this, void 0, void 0, function* () {
            const resolved = yield targetContent;
            return (0, renderClientChildren_1.default)(Object.assign({ source, target: resolved }, metadata));
        }))();
        return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: targetFallbacks.loadingFallback, children: (0, jsx_runtime_1.jsx)(ClientResolver_1.default, { promise: translationPromise, fallback: targetFallbacks.errorFallback }) }));
    }
    return (0, renderClientChildren_1.default)(Object.assign({ source, target: targetContent }, metadata));
}
//# sourceMappingURL=handleRender.js.map