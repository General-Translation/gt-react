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
exports.default = renderDefaultLanguage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ClientPlural_1 = __importDefault(require("../plural/ClientPlural"));
const ClientValue_1 = __importDefault(require("../value/ClientValue"));
const RenderClientVariable_1 = __importDefault(require("../value/RenderClientVariable"));
function renderDefaultLanguage(_a) {
    var { source, variables } = _a, metadata = __rest(_a, ["source", "variables"]);
    const handleSingleChild = (child) => {
        if (react_1.default.isValidElement(child)) {
            const { type, props } = child;
            const { 'data-generaltranslation': generaltranslation } = props;
            let transformation = null;
            if (generaltranslation) {
                transformation = generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation;
            }
            if (typeof type === 'function' && (type === null || type === void 0 ? void 0 : type.gtTransformation)) {
                transformation = type === null || type === void 0 ? void 0 : type.gtTransformation;
            }
            if (transformation) {
                if (transformation === "plural") {
                    if (!variables || typeof variables.n !== 'number') {
                        throw new Error(`ID "${metadata.id}" requires an "n" option.\n\ne.g. t("${metadata.id}", { n: 1 })`);
                    }
                    const defaultChildren = generaltranslation.defaultChildren;
                    return ((0, jsx_runtime_1.jsx)(ClientPlural_1.default, Object.assign({ n: variables.n, values: Object.assign({}, variables) }, generaltranslation.branches, { children: defaultChildren })));
                }
                else if (transformation === "value") {
                    if (!variables || typeof variables !== 'object') {
                        throw new Error(`ID "${metadata.id}" requires values.\n\ne.g. t("${metadata.id}", { values: { ...values } })`);
                    }
                    return ((0, jsx_runtime_1.jsx)(ClientValue_1.default, { values: Object.assign({}, variables), children: props.children }));
                }
                else if (transformation.startsWith("variable")) {
                    return (0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: variables, children: child });
                }
            }
            if (props.children) {
                return react_1.default.cloneElement(child, Object.assign(Object.assign(Object.assign({}, props), metadata.renderAttributes), { children: handleChildren(props.children) }));
            }
        }
        return child;
    };
    const handleChildren = (children) => {
        if (Array.isArray(children)) {
            return react_1.default.Children.map(children, handleSingleChild);
        }
        return handleSingleChild(children);
    };
    return handleChildren(source);
}
//# sourceMappingURL=renderDefaultLanguage.js.map