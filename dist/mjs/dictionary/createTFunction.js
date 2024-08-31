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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Value from "../server/value/InnerValue";
import Plural from "../server/plural/InnerPlural";
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";
import getEntryTranslationType from "../primitives/rendering/getEntryTranslationType";
import getDictionaryEntry from "./getDictionaryEntry";
import checkTFunctionOptions from "./checkTFunctionOptions";
export default function createTFunction({ I18NConfig, T, intl, dictionary = I18NConfig.getDictionary() }) {
    return function t(id, options = {}) {
        checkTFunctionOptions(options);
        const raw = getDictionaryEntry(id, dictionary);
        let { entry, metadata } = getEntryMetadata(raw);
        // Checks to see if options are valid
        const translationType = getEntryTranslationType(raw);
        // Turn into an async function if the target is a string
        if (translationType === "intl")
            return intl(entry, Object.assign({ id }, metadata));
        // If a plural or value is required
        if (Object.keys(options).length) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const _a = metadata || {}, { ranges, zero, one, two, few, many, other, singular, dual, plural } = _a, tOptions = __rest(_a, ["ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
            if (translationType === "plural") {
                if (!options || typeof options.n !== 'number') {
                    throw new Error(`ID "${id}" requires an "n" option.\n\ne.g. t("${id}", { n: 1 })`);
                }
                const innerProps = Object.assign({ ranges,
                    zero, one,
                    two, few,
                    many, other,
                    singular, dual, plural }, options);
                return (_jsx(T, Object.assign({ id: id }, tOptions, { children: _jsx(Plural, Object.assign({ n: options.n, locales: locales }, innerProps, { children: entry })) })));
            }
            return (_jsx(T, Object.assign({ id: id }, tOptions, { children: _jsx(Value, { values: options, locales: locales, children: entry }) })));
        }
        // base case, just return T with an inner fragment (</>) for consistency
        return (_jsx(T, Object.assign({ id: id }, metadata, { children: _jsx(_Fragment, { children: entry }) })));
    };
}
//# sourceMappingURL=createTFunction.js.map