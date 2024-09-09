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
var getEntryMetadata_1 = __importDefault(require("./getEntryMetadata"));
var getEntryTranslationType_1 = __importDefault(require("./getEntryTranslationType"));
var getDictionaryEntry_1 = __importDefault(require("./getDictionaryEntry"));
function createTFunction(I18NConfig, T, translate, dictionary) {
    if (dictionary === void 0) { dictionary = I18NConfig.getDictionary(); }
    return function t(id, options, f) {
        if (options === void 0) { options = {}; }
        var raw = (0, getDictionaryEntry_1.default)(id, dictionary);
        var _a = (0, getEntryMetadata_1.default)(raw), entry = _a.entry, metadata = _a.metadata;
        if (entry && typeof entry === 'object' && !Object.keys(entry).length) {
            throw new Error("Dictionary contains an empty object. This usually happens when you try to use a client-side function as an entry in a server-side dictionary. Check your dictionary entry with id \"".concat(id, "\"."));
        }
        // Checks to see if options are valid
        var _b = (0, getEntryTranslationType_1.default)(raw), translationType = _b.type, isFunction = _b.isFunction;
        // Turn into an async function if the target is a string
        if (translationType === "string") {
            var _c = (metadata || {}), variableOptions = _c.variableOptions, otherMetadata = __rest(_c, ["variableOptions"]);
            return translate(entry, __assign({ id: id }, otherMetadata), options, variableOptions);
        }
        // execute function with options
        if (typeof f === 'function') {
            entry = f(options);
        }
        else if (isFunction) {
            entry = entry(options);
        }
        // If a plural or value is required
        if (typeof options === 'object' && Object.keys(options).length) {
            var locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            var _d = metadata || {}, zero = _d.zero, one = _d.one, two = _d.two, few = _d.few, many = _d.many, other = _d.other, singular = _d.singular, dual = _d.dual, plural = _d.plural, tOptions = __rest(_d, ["zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
            if (translationType === "plural") {
                if (!options || typeof options.n !== 'number') {
                    throw new Error("ID \"".concat(id, "\" requires an \"n\" option.\n\ne.g. t(\"").concat(id, "\", { n: 1 })"));
                }
                var innerProps = __assign({ zero: zero, one: one, two: two, few: few, many: many, other: other, singular: singular, dual: dual, plural: plural }, options);
                return ((0, jsx_runtime_1.jsx)(T, __assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, __assign({ n: options.n, locales: locales }, innerProps, { children: entry })) })));
            }
            return ((0, jsx_runtime_1.jsx)(T, __assign({ id: id }, tOptions, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { values: options, locales: locales, children: entry }) })));
        }
        // base case, just return T with an inner fragment (</>) for consistency
        return ((0, jsx_runtime_1.jsx)(T, __assign({ id: id }, metadata, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: entry }) })));
    };
}
//# sourceMappingURL=createTFunction.js.map