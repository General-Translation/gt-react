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
exports.default = renderDefaultLanguage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var ClientPlural_1 = __importDefault(require("../plural/ClientPlural"));
var ClientValue_1 = __importDefault(require("../value/ClientValue"));
var RenderClientVariable_1 = __importDefault(require("../value/RenderClientVariable"));
function renderDefaultLanguage(_a) {
    var source = _a.source, variables = _a.variables, metadata = __rest(_a, ["source", "variables"]);
    var handleSingleChild = function (child) {
        if (react_1.default.isValidElement(child)) {
            var type = child.type, props = child.props;
            var generaltranslation = props["data-generaltranslation"];
            var transformation = null;
            if (generaltranslation) {
                transformation = generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation;
            }
            if (typeof type === 'function' && (type === null || type === void 0 ? void 0 : type.gtTransformation)) {
                transformation = type === null || type === void 0 ? void 0 : type.gtTransformation;
            }
            if (transformation) {
                if (transformation === "plural") {
                    if (!variables || typeof variables.n !== 'number') {
                        throw new Error("ID \"".concat(metadata.id, "\" requires an \"n\" option.\n\ne.g. t(\"").concat(metadata.id, "\", { n: 1 })"));
                    }
                    var defaultChildren = generaltranslation.defaultChildren;
                    return ((0, jsx_runtime_1.jsx)(ClientPlural_1.default, __assign({ n: variables.n, values: __assign({}, variables) }, generaltranslation.branches, { children: defaultChildren })));
                }
                else if (transformation === "value") {
                    if (!variables || typeof variables !== 'object') {
                        throw new Error("ID \"".concat(metadata.id, "\" requires values.\n\ne.g. t(\"").concat(metadata.id, "\", { values: { ...values } })"));
                    }
                    return ((0, jsx_runtime_1.jsx)(ClientValue_1.default, { values: __assign({}, variables), children: props.children }));
                }
                else if (transformation.startsWith("variable")) {
                    return (0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: variables, children: child });
                }
            }
            if (props.children) {
                return react_1.default.cloneElement(child, __assign(__assign({}, props), { children: handleChildren(props.children) }));
            }
        }
        return child;
    };
    var handleChildren = function (children) {
        if (Array.isArray(children)) {
            return react_1.default.Children.map(children, handleSingleChild);
        }
        return handleSingleChild(children);
    };
    return handleChildren(source);
}
//# sourceMappingURL=renderDefaultLanguage.js.map