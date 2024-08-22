import React, { isValidElement } from "react";
import I18NConfiguration from "../config/I18NConfiguration";
import Value from "../server/value/InnerValue";
import Plural from "../server/plural/InnerPlural";
import getEntryMetadata from "../primitives/getEntryMetadata";
import getEntryTranslationType from "../primitives/getEntryTranslationType";
import getDictionaryEntry from "./getDictionaryEntry";

export type tOptions = {
    n?: number;
    values?: Record<string, any>;
    [key: string]: any
}

export default function createExecuteTFunction({ I18NConfig, T, intl }: { I18NConfig: I18NConfiguration, T: any, intl: any }) {
    return (dictionary: Record<string, any>, id: string, options?: tOptions): JSX.Element | Promise<string> => {
        const raw = getDictionaryEntry(id, dictionary);
        const { entry, metadata } = getEntryMetadata(raw);
        options = { ...options, ...metadata };

        // Checks to see if options are valid
        const translationType = getEntryTranslationType(raw)

        if (translationType === "plural") {
            if (!options.n) {
                throw new Error(`Entry ${id} requires a "n" option.`)
            } else if (isValidElement(entry) || typeof entry !== 'object'){
                throw new Error(`Entry id: ${id}. Plural structured incorrectly in dictionary. See https://docs.generaltranslation.com/dictionaries/plurals. If you just need to pass a value n, try t('your_id', { values: { n: /* your value */ }}).`)
            }
        } 

        // Turn into an async function if the target is a string
        if (typeof entry === 'string') return intl(entry, { id, ...options });
        
        // If a plural or value is required
        if (options) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { 
                n, values, 
                ranges, zero, one, two, few, many, other, singular, dual, plural,
                ...tOptions 
            } = options;
            if (typeof n === 'number') {
                if (!isValidElement(entry) && typeof entry === 'object') {
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
                    }
                    return (
                        <T id={id} {...tOptions}>
                            <Plural locales={locales} {...innerProps}>
                                {
                                    entry.plural
                                    || entry.other
                                    || entry.singular
                                    || entry.one
                                    || entry.many
                                    || entry.few
                                    || entry.two
                                    || entry.dual
                                    || entry.zero
                                }
                            </Plural>
                        </T>
                    );
                } else { // where singular/plural/etc. are supplied in the dictionary options
                    const innerProps = { 
                        n, 
                        ranges, 
                        zero, one,
                        two, few,
                        many, other,
                        singular, dual, plural,
                    };
                    return (
                        <T id={id} {...tOptions}>
                            <Plural locales={locales} {...innerProps}>
                                {entry}
                            </Plural>
                        </T>
                    );
                }
            } else if (values) {
                // Value only
                return (
                    <T id={id} {...tOptions}>
                        <Value values={values} locales={locales}>
                            {entry}
                        </Value>
                    </T>
                )
            }
        }

        // base case, just return T with a <Value> for consistency but no content
        return (
            <T id={id} {...options}>
                <Value>
                    {entry}
                </Value>
            </T>
        )
    }
}