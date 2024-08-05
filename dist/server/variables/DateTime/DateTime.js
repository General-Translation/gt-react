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
/**
 * DateTime component formats and displays a date based on the current language settings.
 * It converts different types of date inputs and formats them according to the locale.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number | Date | string} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for date formatting.
 * @returns {JSX.Element} A span element containing the formatted date with specific data attributes
 */
const DateTime = (_a) => {
    var { children, locales, name = "date", defaultValue, options = {} } = _a, props = __rest(_a, ["children", "locales", "name", "defaultValue", "options"]);
    // Extract general translation data from props
    const { "data-generaltranslation": generaltranslation } = props;
    // Determine the default value to use
    if (typeof children !== 'undefined' && typeof defaultValue === 'undefined') {
        defaultValue = children;
    }
    if (!defaultValue) {
        return (_jsx("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options }));
    }
    // Convert defaultValue to a Date object if it's a Unix time, string, or Date object
    let dateValue;
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue * 1000); // Assuming Unix time is in seconds
    }
    else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    }
    else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    // Format the date according to the locale and options
    const dateString = new Intl.DateTimeFormat(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(dateValue) || (dateValue === null || dateValue === void 0 ? void 0 : dateValue.toLocaleString(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options))) || '';
    const formattedValue = dateString.replace(/[\u200F\u202B\u202E]/g, '');
    // Render the formatted date within a span element
    return (_jsx("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options, children: formattedValue }));
};
DateTime.gtTransformation = "variable-date";
export default DateTime;
//# sourceMappingURL=DateTime.js.map