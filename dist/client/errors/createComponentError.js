"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createComponentError;
function createComponentError(componentName) {
    return function (params) { throw new Error("Using <".concat(componentName, "> on the client-side with props: ").concat(JSON.stringify(params), ". Using <").concat(componentName, "> on the client-side is forbidden.")); };
}
//# sourceMappingURL=createComponentError.js.map