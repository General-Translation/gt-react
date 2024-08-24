"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createDictFunction;
const jsx_runtime_1 = require("react/jsx-runtime");
const getEntryMetadata_1 = __importDefault(require("../primitives/rendering/getEntryMetadata"));
const getEntryTranslationType_1 = __importDefault(require("../primitives/rendering/getEntryTranslationType"));
const InnerPlural_1 = __importDefault(require("../server/plural/InnerPlural"));
const InnerValue_1 = __importDefault(require("../server/value/InnerValue"));
function createDictFunction(I18NConfig) {
    return (id, options) => {
        const raw = I18NConfig.getDictionaryEntry(id);
        const { entry } = (0, getEntryMetadata_1.default)(raw);
        // Checks to see if options are valid
        const translationType = (0, getEntryTranslationType_1.default)(raw);
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
                return ((0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: locales }, innerProps, { children: entry })));
            }
            else if (values) {
                // Values but not plural
                return ((0, jsx_runtime_1.jsx)(InnerValue_1.default, { values: values, locales: locales, children: entry }));
            }
        }
        return entry;
    };
}
//# sourceMappingURL=createDictFunction.js.map