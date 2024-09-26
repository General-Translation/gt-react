"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientResolver;
var react_1 = require("react");
function ClientResolver(_a) {
    var promise = _a.promise, loadingFallback = _a.loadingFallback, errorFallback = _a.errorFallback, renderTranslation = _a.renderTranslation;
    var _b = (0, react_1.useState)(null), translationData = _b[0], setTranslationData = _b[1];
    var _c = (0, react_1.useState)(false), hasError = _c[0], setHasError = _c[1];
    (0, react_1.useEffect)(function () {
        promise
            .then(function (data) {
            setTranslationData(data);
        })
            .catch(function (error) {
            console.error(error);
            setHasError(true);
        });
    }, [promise]);
    if (hasError) {
        return errorFallback;
    }
    if (translationData) {
        return renderTranslation(translationData);
    }
    return loadingFallback;
}
//# sourceMappingURL=ClientResolver.js.map