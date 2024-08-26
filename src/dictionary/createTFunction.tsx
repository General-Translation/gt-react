import React, { isValidElement } from "react";
import I18NConfiguration from "../config/I18NConfiguration";
import Value from "../server/value/InnerValue";
import Plural from "../server/plural/InnerPlural";
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";
import getEntryTranslationType from "../primitives/rendering/getEntryTranslationType";
import getDictionaryEntry from "./getDictionaryEntry";
import checkTFunctionOptions from "./checkTFunctionOptions";
import createOptions from "./createOptions";

export type tOptions = {
    n?: number;
    values?: Record<string, any>;
    [key: string]: any
}

export default function createTFunction({ I18NConfig, T, intl, dictionary = I18NConfig.getDictionary() }: { I18NConfig: I18NConfiguration, T: any, intl: any, dictionary?: Record<string, any> }) {
    
    return function t(id: string, options?: tOptions): JSX.Element | Promise<string> {
        
        checkTFunctionOptions(options);

        const raw = getDictionaryEntry(id, dictionary);
        const { entry, metadata } = getEntryMetadata(raw);
        options = createOptions(options, metadata);
        
        // Checks to see if options are valid
        const translationType = getEntryTranslationType(raw)

        if (translationType === "plural") {
            if (!options.n) {
                throw new Error(`ID "${id}" requires an "n" option.\n\ne.g. t("${id}", { n: 1 })`)
            }
        } 

        // Turn into an async function if the target is a string
        if (translationType === "intl") return intl(entry, { id, ...options });
        
        // If a plural or value is required
        if (options) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { 
                n, values, 
                ranges, zero, one, two, few, many, other, singular, dual, plural,
                ...tOptions 
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
                    <T id={id} {...tOptions}>
                        <Plural locales={locales} {...innerProps}>
                            {entry}
                        </Plural>
                    </T>
                );
            } else if (values) {
                // Values but not plural
                return (
                    <T id={id} {...tOptions}>
                        <Value values={values} locales={locales}>
                            {entry}
                        </Value>
                    </T>
                )
            }
        }

        // base case, just return T with an inner fragment (</>) for consistency
        return (
            <T id={id} {...options}>
                <>{entry}</>
            </T>
        )
    }
}