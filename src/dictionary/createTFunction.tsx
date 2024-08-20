import React, { isValidElement } from "react";
import I18NConfiguration from "../config/I18NConfiguration";
import Value from "../server/value/InnerValue";
import Plural from "../server/plural/InnerPlural";

export type tOptions = {
    n?: number;
    values?: Record<string, any>;
    [key: string]: any
}

export default function createTFunction({ I18NConfig, T, intl }: { I18NConfig: I18NConfiguration, T: any, intl: any }) {
    return (id: string, options?: tOptions): JSX.Element | Promise<string> => {
        
        const entry = I18NConfig.getDictionaryEntry(id);

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
                const innerProps = { 
                    n, 
                    ranges, 
                    zero: zero || entry?.zero, 
                    one: one || entry?.one,
                    two: two || entry?.two,
                    few: few || entry?.few,
                    many: many || entry?.many,
                    other: other || entry?.other,
                    singular: singular || entry?.singular,
                    dual: dual || entry?.dual,
                    plural: plural || entry?.plural
                };
                if (values) {
                    // Plural + Value
                    return (
                        <T id={id} {...tOptions}>
                            <Value values={values} locales={locales}>
                                <Plural locales={locales} {...innerProps}>
                                    {entry}
                                </Plural>
                            </Value>
                        </T>
                    );
                } else {
                    // Plural only
                    return (
                        <T id={id} {...tOptions}>
                            <Plural locales={locales} {...innerProps}>
                                {entry}
                            </Plural>
                        </T>
                    )
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

        // base case, just return T
        return <T id={id} {...options}>{entry}</T>;
    }
}