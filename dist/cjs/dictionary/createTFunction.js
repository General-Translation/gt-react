"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createTFunction;
const jsx_runtime_1 = require("react/jsx-runtime");
const InnerValue_1 = __importDefault(require("../server/value/InnerValue"));
const InnerPlural_1 = __importDefault(require("../server/plural/InnerPlural"));
const hasTransformation_1 = __importDefault(require("../primitives/hasTransformation"));
const isPromise_1 = __importDefault(require("../primitives/isPromise"));
function createTFunction({ I18NConfig, T, intl }) {
    return (id, options) => {
        let entry = I18NConfig.getDictionaryEntry(id);
        if (Array.isArray(entry)) {
            if (typeof entry[1] === 'object') {
                options = Object.assign(Object.assign({}, entry[1]), options);
            }
            entry = entry[0];
        }
        if ((0, hasTransformation_1.default)(entry) || (0, isPromise_1.default)(entry)) {
            return entry;
        }
        ;
        // Turn into an async function if the target is a string
        if (typeof entry === 'string')
            return intl(entry, Object.assign({ id }, options));
        // If a plural or value is required
        if (options) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { n, values, ranges, zero, one, two, few, many, other, singular, dual, plural } = options, tOptions = __rest(options, ["n", "values", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
            if (typeof n === 'number') {
                const innerProps = {
                    n,
                    ranges,
                    zero: zero || (entry === null || entry === void 0 ? void 0 : entry.zero),
                    one: one || (entry === null || entry === void 0 ? void 0 : entry.one),
                    two: two || (entry === null || entry === void 0 ? void 0 : entry.two),
                    few: few || (entry === null || entry === void 0 ? void 0 : entry.few),
                    many: many || (entry === null || entry === void 0 ? void 0 : entry.many),
                    other: other || (entry === null || entry === void 0 ? void 0 : entry.other),
                    singular: singular || (entry === null || entry === void 0 ? void 0 : entry.singular),
                    dual: dual || (entry === null || entry === void 0 ? void 0 : entry.dual),
                    plural: plural || (entry === null || entry === void 0 ? void 0 : entry.plural)
                };
                if (values) {
                    // Plural + Value
                    return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { values: values, locales: locales, children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: locales }, innerProps, { children: entry })) }) })));
                }
                else {
                    // Plural only
                    return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: locales }, innerProps, { children: entry })) })));
                }
            }
            else if (values) {
                // Value only
                return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { values: values, locales: locales, children: entry }) })));
            }
        }
        // base case, just return T
        return (0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, options, { children: entry }));
    };
}
//# sourceMappingURL=createTFunction.js.map