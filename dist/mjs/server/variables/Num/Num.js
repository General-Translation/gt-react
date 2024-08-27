var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
const Num = (_a) => {
    var { children, locales, name = "n", defaultValue, options = {} } = _a, props = __rest(_a, ["children", "locales", "name", "defaultValue", "options"]);
    const { "data-generaltranslation": generaltranslation } = props;
    // Determine the value to be used
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    // Format the number according to the locale
    const formattedValue = (typeof value === 'number') ? new Intl.NumberFormat(locales, Object.assign({ numberingSystem: 'latn' }, options)).format(value) : defaultValue;
    return (_jsx("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "number", "data-gt-variable-options": options, "data-gt-unformatted-value": value, children: formattedValue }));
};
Num.gtTransformation = "variable-number";
export default Num;
//# sourceMappingURL=Num.js.map