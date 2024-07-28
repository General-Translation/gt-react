"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createTFunction;
const jsx_runtime_1 = require("react/jsx-runtime");
function createTFunction({ I18NConfig, I18N }) {
    return (id, options) => {
        const entry = I18NConfig.getDictionaryEntry(id);
        return (0, jsx_runtime_1.jsx)(I18N, Object.assign({ id: id }, options, { children: entry }));
    };
}
//# sourceMappingURL=createTFunction.js.map