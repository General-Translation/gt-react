"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGTProp;
function getGTProp(child) {
    var _a;
    if (child && typeof child === 'object' && ((_a = child.props) === null || _a === void 0 ? void 0 : _a['data-generaltranslation'])) {
        return child.props['data-generaltranslation'];
    }
    return null;
}
//# sourceMappingURL=getGTProp.js.map