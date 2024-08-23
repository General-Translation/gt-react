"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renderClientDictionary;
const jsx_runtime_1 = require("react/jsx-runtime");
const addGTIdentifier_1 = __importDefault(require("../../index/addGTIdentifier"));
const getEntryMetadata_1 = __importDefault(require("../../primitives/getEntryMetadata"));
const getRenderAttributes_1 = __importDefault(require("../../primitives/getRenderAttributes"));
const renderClientChildren_1 = __importDefault(require("./renderClientChildren"));
function renderClientDictionary({ result, dictionary, locales }) {
    const renderAttributes = (0, getRenderAttributes_1.default)(locales[0]);
    let translatedDictionary = {};
    for (const id of Object.keys(dictionary)) {
        if (result[id]) {
            let { entry, metadata } = (0, getEntryMetadata_1.default)(dictionary[id]);
            metadata = Object.assign({ locales, renderAttributes }, metadata);
            translatedDictionary[id] = (0, renderClientChildren_1.default)({
                source: (0, addGTIdentifier_1.default)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: entry })), // fragment wrapper so that it is consistent with the server-side
                target: result[id].t,
                metadata
            });
        }
    }
    return translatedDictionary;
}
//# sourceMappingURL=ar.js.map