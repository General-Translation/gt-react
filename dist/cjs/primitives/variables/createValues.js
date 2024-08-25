"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createValues;
function createValues(n, values) {
    if (typeof n !== 'number') {
        if (!values || typeof values !== 'object') {
            return undefined;
        }
        return Object.assign({}, values);
    }
    if (values && typeof values === 'object') {
        return Object.assign(Object.assign({}, values), { n });
    }
    return { n };
}
//# sourceMappingURL=createValues.js.map