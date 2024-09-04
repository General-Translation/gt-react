import I18NConfiguration from "../config/I18NConfiguration";
import Value from "../server/value/InnerValue";
import Plural from "../server/plural/InnerPlural";
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";
import getEntryTranslationType from "../primitives/rendering/getEntryTranslationType";
import getDictionaryEntry from "./getDictionaryEntry";
import checkTFunctionOptions from "./checkTFunctionOptions";

export type tOptions = {
    n?: number;
    [key: string]: any
}

export default function createTFunction(I18NConfig: I18NConfiguration, T: any, translate: any, dictionary = I18NConfig.getDictionary()) {
    
    const shouldStore = I18NConfig.shouldStore() ?? true;

    return function t(id: string, options: tOptions = {}): JSX.Element | Promise<string> {
        
        checkTFunctionOptions(options);

        const raw = getDictionaryEntry(id, dictionary);
        let { entry, metadata } = getEntryMetadata(raw);

        // Checks to see if options are valid
        const { type: translationType, isFunction } = getEntryTranslationType(raw);
        
        // Turn into an async function if the target is a string
        if (translationType === "string") return translate(entry, { id, store: shouldStore, ...metadata });
    
        // If a plural or value is required
        if (Object.keys(options).length) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { ranges, zero, one, two, few, many, other, singular, dual, plural,
                ...tOptions 
            } = metadata || {};
            if (translationType === "plural") {
                if (!options || typeof options.n !== 'number') {
                    throw new Error(`ID "${id}" requires an "n" option.\n\ne.g. t("${id}", { n: 1 })`)
                }
                const innerProps = {
                    ranges, 
                    zero, one,
                    two, few,
                    many, other,
                    singular, dual, plural,
                    ...options
                };
                return (
                    <T id={id} store={shouldStore} {...tOptions}>
                        <Plural n={options.n} locales={locales} {...innerProps}>
                            {entry}
                        </Plural>
                    </T>
                );
            }
            return (
                <T id={id} store={shouldStore} {...tOptions}>
                    <Value values={options} locales={locales}>
                        {entry}
                    </Value>
                </T>
            )
        }

        // base case, just return T with an inner fragment (</>) for consistency
        return (
            <T id={id} store={shouldStore} {...metadata}>
                <>{entry}</>
            </T>
        )
    }
}