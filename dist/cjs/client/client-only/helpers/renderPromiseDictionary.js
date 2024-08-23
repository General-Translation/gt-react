"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renderPromiseDictionary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const getEntryMetadata_1 = __importDefault(require("../../../primitives/getEntryMetadata"));
const getRenderAttributes_1 = __importDefault(require("../../../primitives/getRenderAttributes"));
const ClientResolver_1 = __importDefault(require("./ClientResolver"));
const renderClientChildren_1 = __importDefault(require("./renderClientChildren"));
function renderPromiseDictionary({ result, dictionary, locales }) {
    const renderAttributes = (0, getRenderAttributes_1.default)(locales[0]);
    let translatedDictionary = {};
    for (const id of Object.keys(dictionary)) {
        if (result[id]) {
            let { entry, metadata } = (0, getEntryMetadata_1.default)(dictionary[id]);
            metadata = Object.assign({ locales, renderAttributes }, metadata);
            let { entry: translation, metadata: fallbacks } = (0, getEntryMetadata_1.default)(result[id]);
            if (typeof entry === 'string' && typeof translation === 'string') { // i.e., intl()
                translatedDictionary[id] = translation;
                continue;
            }
            if (isTranslationPromise(translation)) {
                if (fallbacks) {
                    translatedDictionary[id] = ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: fallbacks.loadingFallbackTarget, children: (0, jsx_runtime_1.jsx)(ClientResolver_1.default, { promise: translation, entry: entry, fallback: fallbacks.errorFallbackTarget }) }));
                    continue;
                }
            }
            translatedDictionary[id] = (0, renderClientChildren_1.default)({
                source: entry,
                target: translation.t,
                metadata
            });
        }
    }
    return translatedDictionary;
}
function isTranslationPromise(obj) {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
//# sourceMappingURL=renderPromiseDictionary.js.map