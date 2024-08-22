"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createGetGTFunction;
function createGetGTFunction(t) {
    return (id) => {
        let innerID = id;
        return innerID ? (id, options) => t(`${innerID}.${id}`, options) : t;
    };
}
//# sourceMappingURL=createGetGTFunction.js.map