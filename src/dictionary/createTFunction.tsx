import I18NConfiguration from "../config/I18NConfiguration";
import Value from "../server/value/InnerValue";
import Plural from "../server/plural/InnerPlural";
import getEntryMetadata from "./getEntryMetadata";
import getEntryTranslationType from "./getEntryTranslationType";
import getDictionaryEntry from "./getDictionaryEntry";

export type tOptions = {
    [key: string]: any
}

export default function createTFunction(I18NConfig: I18NConfiguration, T: any, translate: any, dictionary = I18NConfig.getDictionary()) {

    return function t(id: string, options: tOptions = {}, f?: Function): JSX.Element | Promise<string> {

        const raw = getDictionaryEntry(id, dictionary);
        let { entry, metadata } = getEntryMetadata(raw);

        if (entry && typeof entry === 'object' && !Object.keys(entry).length) {
            throw new Error(`Dictionary contains an empty object. This usually happens when you try to use a client-side function as an entry in a server-side dictionary. Check your dictionary entry with id "${id}".`)
        }

        // Checks to see if options are valid
        const { type: translationType, isFunction } = getEntryTranslationType(raw); 
        
        // Turn into an async function if the target is a string
        if (translationType === "string") {
            const { variableOptions, ...otherMetadata } = (metadata || {});
            return translate(
                entry, { id, ...otherMetadata }, options, variableOptions
            );
        } 

        // execute function with options
        if (typeof f === 'function') {
            entry = f(options)
        } else if (isFunction) {
            entry = entry(options);
        }

        // If a plural or value is required
        if (typeof options === 'object' && Object.keys(options).length) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { zero, one, two, few, many, other, singular, dual, plural,
                ...tOptions 
            } = metadata || {};
            if (translationType === "plural") {
                if (!options || typeof options.n !== 'number') {
                    throw new Error(`ID "${id}" requires an "n" option.\n\ne.g. t("${id}", { n: 1 })`)
                }
                const innerProps = {
                    zero, one,
                    two, few,
                    many, other,
                    singular, dual, plural,
                    ...options
                };
                return (
                    <T id={id} {...tOptions}>
                        <Plural n={options.n} locales={locales} {...innerProps}>
                            {entry}
                        </Plural>
                    </T>
                );
            }
            return (
                <T id={id} {...tOptions}>
                    <Value values={options} locales={locales}>
                        {entry}
                    </Value>
                </T>
            )
        }

        // base case, just return T with an inner fragment (</>) for consistency
        return (
            <T id={id} {...metadata}>
                <>{entry}</>
            </T>
        )
    }
}