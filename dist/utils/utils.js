import React from "react";
import { GTTranslationError } from "../types/types";
export function isTranslatedContent(target) {
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
export function isValidTaggedElement(target) {
    return React.isValidElement(target);
}
export function errorToTranlsationError(error) {
    if (error instanceof GTTranslationError) {
        return {
            state: 'error',
            error: error.error,
            code: error.code
        };
    }
    return {
        state: 'error',
        error: "".concat(error.name, ": ").concat(error.message),
        code: 500
    };
}
//# sourceMappingURL=utils.js.map