import { jsx as _jsx } from "react/jsx-runtime";
export default function createTFunction({ I18NConfig, T, intl }) {
    return (id, options) => {
        const entry = I18NConfig.getDictionaryEntry(id);
        if (typeof entry === 'string')
            return intl(entry, Object.assign({ id }, options));
        return _jsx(T, Object.assign({ id: id }, options, { children: entry }));
    };
}
//# sourceMappingURL=createTFunction.js.map