import React from "react";
export default function hasTransformation(entry) {
    if (React.isValidElement(entry)) {
        const { type } = entry;
        const transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        return transformation ? true : false;
    }
    return false;
}
//# sourceMappingURL=hasTransformation.js.map