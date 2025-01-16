"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTranslationError = isTranslationError;
exports.isTranslatedContent = isTranslatedContent;
function isTranslationError(target) {
    if (typeof target !== 'object' || target === null) {
        return false;
    }
    var hasError = 'error' in target && typeof target.error === 'string';
    var hasCode = 'code' in target ? typeof target.code === 'number' : true;
    return hasError && hasCode;
}
function isTranslatedContent(target) {
    if (typeof target === 'string') {
        return true;
    }
    if (!Array.isArray(target)) {
        return false;
    }
    return target.every(function (item) {
        if (typeof item === 'string') {
            return true;
        }
        if (typeof item === 'object' && item !== null) {
            var hasKey = 'key' in item && typeof item.key === 'string';
            var hasValidVariable = item.variable === undefined || typeof item.variable === 'string';
            return hasKey && hasValidVariable;
        }
        return false;
    });
}
//# sourceMappingURL=utils.js.map