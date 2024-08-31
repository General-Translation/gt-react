"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jsx_runtime_1 = require("react/jsx-runtime");
var InnerValue_1 = __importDefault(require("../server/value/InnerValue"));
var InnerPlural_1 = __importDefault(require("../server/plural/InnerPlural"));
var getEntryMetadata_1 = __importDefault(require("../primitives/rendering/getEntryMetadata"));
var getEntryTranslationType_1 = __importDefault(require("../primitives/rendering/getEntryTranslationType"));
var getDictionaryEntry_1 = __importDefault(require("./getDictionaryEntry"));
var checkTFunctionOptions_1 = __importDefault(require("./checkTFunctionOptions"));
function createTFunction(_a) {
    var I18NConfig = _a.I18NConfig, T = _a.T, intl = _a.intl, _b = _a.dictionary, dictionary = _b === void 0 ? I18NConfig.getDictionary() : _b;
    return function t(id, options) {
        if (options === void 0) { options = {}; }
        (0, checkTFunctionOptions_1.default)(options);
        var raw = (0, getDictionaryEntry_1.default)(id, dictionary);
        var _a = (0, getEntryMetadata_1.default)(raw), entry = _a.entry, metadata = _a.metadata;
        // Checks to see if options are valid
        var translationType = (0, getEntryTranslationType_1.default)(raw);
        // Turn into an async function if the target is a string
        if (translationType === "intl")
            return intl(entry, __assign({ id: id }, metadata));
        // If a plural or value is required
        if (Object.keys(options).length) {
            var locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            var _b = metadata || {}, ranges = _b.ranges, zero = _b.zero, one = _b.one, two = _b.two, few = _b.few, many = _b.many, other = _b.other, singular = _b.singular, dual = _b.dual, plural = _b.plural, tOptions = __rest(_b, ["ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
            if (translationType === "plural") {
                if (!options || typeof options.n !== 'number') {
                    throw new Error("ID \"".concat(id, "\" requires an \"n\" option.\n\ne.g. t(\"").concat(id, "\", { n: 1 })"));
                }
                var innerProps = __assign({ ranges: ranges, zero: zero, one: one, two: two, few: few, many: many, other: other, singular: singular, dual: dual, plural: plural }, options);
                return ((0, jsx_runtime_1.jsx)(T, __assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, __assign({ n: options.n, locales: locales }, innerProps, { children: entry })) })));
            }
            return ((0, jsx_runtime_1.jsx)(T, __assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { values: options, locales: locales, children: entry }) })));
        }
        // base case, just return T with an inner fragment (</>) for consistency
        return ((0, jsx_runtime_1.jsx)(T, __assign({ id: id }, metadata, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: entry }) })));
    };
}
//# sourceMappingURL=createTFunction.js.map