import { jsx as _jsx } from "react/jsx-runtime";
import getEntryMetadata from "../primitives/getEntryMetadata";
import getEntryTranslationType from "../primitives/getEntryTranslationType";
import Plural from "../server/plural/InnerPlural";
import Value from "../server/value/InnerValue";
export default function createDictFunction(I18NConfig) {
    return (id, options) => {
        const raw = I18NConfig.getDictionaryEntry(id);
        const { entry } = getEntryMetadata(raw);
        // Checks to see if options are valid
        const translationType = getEntryTranslationType(raw);
        if (translationType === "plural") {
            if (!options || !options.n) {
                throw new Error(`ID "${id}" requires an "n" option.\n\ne.g. t("${id}", { n: 1 })`);
            }
        }
        if (options) {
            const locales = [I18NConfig.getDefaultLocale()];
            const { n, values, ranges, zero, one, two, few, many, other, singular, dual, plural } = options;
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
                return (_jsx(Plural, Object.assign({ locales: locales }, innerProps, { children: entry })));
            }
            else if (values) {
                // Values but not plural
                return (_jsx(Value, { values: values, locales: locales, children: entry }));
            }
        }
        return entry;
    };
}
//# sourceMappingURL=createDictFunction.js.map