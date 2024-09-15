'use client'

import { useCallback, useEffect, useState } from "react";
import { _GTContext, _renderDefaultChildren, _renderTranslatedChildren } from "gt-react/client";
import { addGTIdentifier, extractEntryMetadata, getPluralBranch, primitives } from "gt-react/internal";
import { renderContentToString } from "generaltranslation";
import ClientResolver from "./ClientResolver";

// meant to be used inside the server-side <GTProvider>
export default function _ClientProvider({
    children,
    dictionary, translations,
    locale, defaultLocale,
    translationRequired
}: {
    children: any,
    dictionary: Record<string, any>,
    translations: Record<string, any>
    locale: string,
    defaultLocale: string
    translationRequired: boolean
}) {

    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        // prevent hydration errors + flickering when translations load
        setHasMounted(true);
    }, []);

    const translate = useCallback((id: string, options: Record<string, any> = {}, f?: Function) => {

        let { entry, metadata } = extractEntryMetadata(dictionary[id]);

        if (metadata && metadata.isFunction) {
            if (typeof f !== 'function') {
                throw new Error(
                    `You're trying to call a function in the server dictionary on the client-side, but functions can't be passed directly from server to client. `
                    + `Try including the function you want to call as a parameter in t(), like t("${id}", ${options ? JSON.stringify(options) : 'undefined'}, MyFunction)`
                );
            }
            entry = addGTIdentifier(f(options));
        }

        let variables = options;
        let variablesOptions: Record<string, any> | undefined;
        if (metadata?.variablesOptions)
            variablesOptions = { ...variablesOptions || {}, ...metadata.variablesOptions };
        if (options.variablesOptions)
            variablesOptions = { ...variablesOptions || {}, ...options.variablesOptions };

        if (typeof entry === 'string') {
            return renderContentToString(
                translationRequired ? translations[id] : entry, 
                [locale, defaultLocale],
                variables, variablesOptions
            )
        };

        let source = entry;

        const isPlural = entry && typeof entry === 'object' && primitives.pluralBranchNames.some(branchName => branchName in (entry?.props?.['data-generaltranslation']?.branches || {}));
        if (isPlural) {
            if (typeof variables?.n !== 'number')
                throw new Error(`t("${id}"): Plural requires "n" option.`)
            source = getPluralBranch(
                variables.n,
                [locale, defaultLocale],
                source?.props?.['data-generaltranslation']?.branches
            ) || source.props.children;
        }

        if (!translationRequired) {
            return _renderDefaultChildren({
                entry: source, variables, variablesOptions
            })
        }

        if (translations[id]) {
            const renderTranslation = ((translationEntry: any) => {
                let target = translationEntry;
                if (isPlural) {
                    target = getPluralBranch(
                        variables.n,
                        [locale, defaultLocale],
                        target?.props['data-generaltranslation']?.branches
                    ) || target?.props?.children;
                }
                return _renderTranslatedChildren({
                    source, target, variables,
                    variablesOptions
                });
            });
            const translation = translations[id];
            if (translation.promise) {
                if (!translation.errorFallback) {
                    translation.errorFallback = _renderDefaultChildren({
                        entry: source, variables, variablesOptions
                    })
                }
                if (!translation.loadingFallback) {
                    translation.loadingFallback = translation.errorFallback;
                }
                return (
                    <ClientResolver 
                        promise={translation.promise}
                        renderTranslation={renderTranslation}
                        errorFallback={translation.errorFallback}
                        loadingFallback={translation.loadingFallback}
                    />
                );
            }
            return renderTranslation(translation.t);
        }

    }, [dictionary, translations]);

    return (
        <_GTContext.Provider value={{
            translate, locale, defaultLocale
        }}>
            {
                hasMounted ?
                children :
                undefined
            }
        </_GTContext.Provider>
    );
}