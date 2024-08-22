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
exports.default = createExecuteTFunction;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InnerValue_1 = __importDefault(require("../server/value/InnerValue"));
const InnerPlural_1 = __importDefault(require("../server/plural/InnerPlural"));
const getEntryMetadata_1 = __importDefault(require("../primitives/getEntryMetadata"));
const getEntryTranslationType_1 = __importDefault(require("../primitives/getEntryTranslationType"));
const getDictionaryEntry_1 = __importDefault(require("./getDictionaryEntry"));
function createExecuteTFunction({ I18NConfig, T, intl }) {
    return (dictionary, id, options) => {
        const raw = (0, getDictionaryEntry_1.default)(id, dictionary);
        const { entry, metadata } = (0, getEntryMetadata_1.default)(raw);
        options = Object.assign(Object.assign({}, options), metadata);
        // Checks to see if options are valid
        const translationType = (0, getEntryTranslationType_1.default)(raw);
        if (translationType === "plural") {
            if (!options.n) {
                throw new Error(`Entry ${id} requires a "n" option.`);
            }
            else if ((0, react_1.isValidElement)(entry) || typeof entry !== 'object') {
                throw new Error(`Entry id: ${id}. Plural structured incorrectly in dictionary. See https://docs.generaltranslation.com/dictionaries/plurals. If you just need to pass a value n, try t('your_id', { values: { n: /* your value */ }}).`);
            }
        }
        // Turn into an async function if the target is a string
        if (typeof entry === 'string')
            return intl(entry, Object.assign({ id }, options));
        // If a plural or value is required
        if (options) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { n, values, ranges, zero, one, two, few, many, other, singular, dual, plural } = options, tOptions = __rest(options, ["n", "values", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
            if (typeof n === 'number') {
                if (!(0, react_1.isValidElement)(entry) && typeof entry === 'object') {
                    const innerProps = {
                        n,
                        ranges: entry.ranges,
                        zero: entry.zero,
                        one: entry.one,
                        two: entry.two,
                        few: entry.few,
                        many: entry.many,
                        other: entry.other,
                        singular: entry.singular,
                        plural: entry.plural,
                        dual: entry.dual,
                        values
                    };
                    return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: locales }, innerProps, { children: entry.plural
                                || entry.other
                                || entry.singular
                                || entry.one
                                || entry.many
                                || entry.few
                                || entry.two
                                || entry.dual
                                || entry.zero })) })));
                }
                else { // where singular/plural/etc. are supplied in the dictionary options
                    const innerProps = {
                        n,
                        ranges,
                        zero, one,
                        two, few,
                        many, other,
                        singular, dual, plural,
                    };
                    return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: locales }, innerProps, { children: entry })) })));
                }
            }
            else if (values) {
                // Value only
                return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { values: values, locales: locales, children: entry }) })));
            }
        }
        // base case, just return T with a <Value> for consistency but no content
        return ((0, jsx_runtime_1.jsx)(T, Object.assign({ id: id }, options, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { children: entry }) })));
    };
}
//# sourceMappingURL=createExecuteTFunction.js.map