'use client'

import { GTClientProvider, useDefaultLocale, useGT, useLocale } from "./client";
import createComponentError from "./client/errors/createComponentError";
import defaultGTProps from "./types/defaultGTProps";
import GeneralTranslation from "./types/GeneralTranslationInterface";
import InitGTProps from "./types/InitGTProps";
import Variables from './types/Variables'
import ClientCurrency from "./client/variables/ClientCurrency";
import ClientDateTime from "./client/variables/ClientDateTime";
import ClientNum from "./client/variables/ClientNum";
import ClientVar from "./client/variables/ClientVar";

// ----- MAIN FUNCTIONS ----- //

export function initGT({
    // Cloud integration
    apiKey = defaultGTProps.apiKey,
    projectID = defaultGTProps.projectID,
    cacheURL = defaultGTProps.cacheURL,
    baseURL = defaultGTProps.baseURL,
    remoteSource = defaultGTProps.remoteSource,
    automaticTranslation = defaultGTProps.automaticTranslation,
    // Locale info
    approvedLocales,
    defaultLocale = approvedLocales?.[0] || defaultGTProps.defaultLocale,
    getLocale = () => { return defaultLocale },
    // Rendering
    renderPrevious = defaultGTProps.renderPrevious,
    renderMethod = defaultGTProps.renderMethod, // "replace", "hang", "subtle"
    renderTimeout = defaultGTProps.renderTimeout,
    // Dictionaries
    dictionaryName = defaultGTProps.dictionaryName,
    dictionary = defaultGTProps.dictionary,
    translations,
    // Batching config
    maxConcurrentRequests = defaultGTProps.maxConcurrentRequests,
    batchInterval = defaultGTProps.batchInterval,
    // Other metadata
    getMetadata = defaultGTProps.getMetadata,
    ...metadata
}: InitGTProps = {
    apiKey: defaultGTProps.apiKey,
    projectID: defaultGTProps.projectID,
    cacheURL: defaultGTProps.cacheURL,
    baseURL: defaultGTProps.baseURL,
    remoteSource: defaultGTProps.remoteSource,
    automaticTranslation: defaultGTProps.automaticTranslation,
    defaultLocale: defaultGTProps.defaultLocale,
    getLocale: defaultGTProps.getLocale,
    renderPrevious: defaultGTProps.renderPrevious,
    renderMethod: defaultGTProps.renderMethod,
    renderTimeout: defaultGTProps.renderTimeout,
    dictionaryName: defaultGTProps.dictionaryName,
    dictionary: defaultGTProps.dictionary,
    maxConcurrentRequests: defaultGTProps.maxConcurrentRequests,
    batchInterval: defaultGTProps.batchInterval,
    getMetadata: defaultGTProps.getMetadata
}): GeneralTranslation {

    const T = createComponentError('T');

    const translate = (...params: any) => {
        throw new Error(`translate(${JSON.stringify(params?.[0])}) on the client-side can't access your API keys.`)
    };

    const Value = createComponentError('Value');

    const Plural = createComponentError('Plural');

    const t = (...params: any) => {
        throw new Error(`t("${params?.[0]}") on the client-side, which won't work because of how React handles hooks. Try t = getGT() or useGT() to get the t() function instead.`)
    }

    const getGT = useGT;

    const GTProvider = (params: any) => {
        const { children, ...props } = params;
        return (
            <GTClientProvider 
                projectID={projectID}
                dictionary={dictionary}
                dictionaryName={dictionaryName}
                approvedLocales={approvedLocales}
                defaultLocale={defaultLocale}
                remoteSource={remoteSource}
                cacheURL={cacheURL}
                translations={translations}
                {...props}
            >
                {children}
            </GTClientProvider>
        )
    } 
    
    getLocale = useLocale;

    const getDefaultLocale = useDefaultLocale;

    return {
        T, translate,
        Value, Plural,
        t, getGT, GTProvider,
        getLocale, 
        getDefaultLocale
    }

}

export function initVariables({
    approvedLocales,
    defaultLocale = approvedLocales?.[0] || defaultGTProps.defaultLocale,
    getLocale = () => { return defaultLocale }
}: {
    approvedLocales?: string[],
    defaultLocale?: string;
    getLocale?: () => string;
} = {
    defaultLocale: defaultGTProps.defaultLocale,
    getLocale: defaultGTProps.getLocale
}): Variables {

    const Var = ClientVar;

    const Num = ClientNum;

    const DateTime = ClientDateTime;

    const Currency = ClientCurrency;

    getLocale = useLocale;

    const getDefaultLocale = useDefaultLocale;

    return {
        Var, Num, Currency, DateTime,
        getLocale, getDefaultLocale
    }

}