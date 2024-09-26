import { ReactNode } from "react";
import { extractEntryMetadata, getDictionaryEntry, primitives } from "gt-react/internal";
import translate from "./strings/translate";
import T from "./inline/T";
import getDictionary from "../dictionary/getDictionary";

export default function createServerTFunction( 
    prefixID?: string
) {
    
    const getID = (id: string) => {
        return prefixID ? `${prefixID}.${id}` : id;
    }

    const dictionary = getDictionary();
    
    return (
        id: string, 
        options?: Record<string, any>,
        f?: Function
    ): JSX.Element | string | Promise<JSX.Element | string> => {

        id = getID(id);

        // Get entry
        let { entry, metadata } = extractEntryMetadata(
            getDictionaryEntry(dictionary, id)
        );

        // Get variables and variable options
        let variables; let variablesOptions;
        if (options) {
            variables = options;
            if (metadata?.variablesOptions) {
                variablesOptions = metadata.variablesOptions;
            }
        }

        // Handle if the entry is a function
        if (typeof f === 'function') {
            entry = f(options);
        } else if (typeof entry === 'function') {
            entry = entry(options);
        }

        const isPlural = metadata && primitives.pluralBranchNames.some(branchName => branchName in metadata);

        if (!entry) {
            console.warn(`No entry found for id: ${id}`);
            return '';
        }

        if (typeof entry === 'string' && !isPlural) {
            return translate(entry, { 
                id 
            }, variables, variablesOptions);
        }

        return (
            /* @ts-expect-error Server Component */
            <T 
                id={id}
                variables={variables}
                variablesOptions={variablesOptions}
                {...metadata}
            >
                {entry}
            </T>
        )

    }

}