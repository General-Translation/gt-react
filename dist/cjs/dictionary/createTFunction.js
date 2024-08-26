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
const getEntryMetadata_1 = __importDefault(require("../primitives/rendering/getEntryMetadata"));
const getEntryTranslationType_1 = __importDefault(require("../primitives/rendering/getEntryTranslationType"));
const getDictionaryEntry_1 = __importDefault(require("./getDictionaryEntry"));
const checkTFunctionOptions_1 = __importDefault(require("./checkTFunctionOptions"));
const createOptions_1 = __importDefault(require("./createOptions"));
function createTFunction({ I18NConfig, T, intl, dictionary = I18NConfig.getDictionary() }) {
    return function t(id, options) {
        (0, checkTFunctionOptions_1.default)(options);
        const raw = (0, getDictionaryEntry_1.default)(id, dictionary);
        const { entry, metadata } = (0, getEntryMetadata_1.default)(raw);
        options = (0, createOptions_1.default)(options, metadata);
        // Checks to see if options are valid
        const translationType = (0, getEntryTranslationType_1.default)(raw);
        if (translationType === "plural") {
            console.log(options);
            if (!options.values || typeof options.values.n !== 'number') {
                throw new Error(`ID "${id}" requires an "n" option.\n\ne.g. t("${id}", { n: 1 })`);
            }
        }
        // Turn into an async function if the target is a string
        if (translationType === "intl")
            return intl(entry, Object.assign({ id }, options));
        // If a plural or value is required
        if (options) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { n, values, ranges, zero, one, two, few, many, other, singular, dual, plural } = options, tOptions = __rest(options, ["n", "values", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
            if (typeof n === 'number') {
                // Plural!
                const innerProps = {
                    n, values,
                    ranges,
                    zero, one,
                    two, few,
                    many, other,
                    singular, dual, plural,
                };
                return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: locales }, innerProps, { children: entry })) })));
            }
            else if (values) {
                // Values but not plural
                return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { values: values, locales: locales, children: entry }) })));
            }
        }
        // base case, just return T with an inner fragment (</>) for consistency
        return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, options, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: entry }) })));
    };
}
//# sourceMappingURL=createTFunction.js.map