import I18NConfiguration from "../config/I18NConfiguration";
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";
import getEntryTranslationType from "../primitives/rendering/getEntryTranslationType";
import Plural from "../server/plural/InnerPlural";
import Value from "../server/value/InnerValue";
import { tOptions } from "./createTFunction";

export default function createDictFunction(I18NConfig: I18NConfiguration) {
    return (id: string, options?: tOptions) => {

        const raw = I18NConfig.getDictionaryEntry(id);
        
        const { entry } = getEntryMetadata(raw);
        
        // Checks to see if options are valid
        const translationType = getEntryTranslationType(raw)

        if (translationType === "plural") {
            if (!options || !options.n) {
                throw new Error(`ID "${id}" requires an "n" option.\n\ne.g. t("${id}", { n: 1 })`)
            }
        } 
        
        if (options) {
            const locales = [I18NConfig.getDefaultLocale()];
            const { 
                n, values, 
                ranges, zero, one, two, few, many, other, singular, dual, plural
            } = options;
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
                return (
                    <Plural locales={locales} {...innerProps}>
                        {entry}
                    </Plural>
                );
            } else if (values) {
                // Values but not plural
                return (
                    <Value values={values} locales={locales}>
                        {entry}
                    </Value>
                )
            }
        }
        return entry;
    }
}