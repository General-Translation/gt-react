import React from "react";
import { GTClientProvider, useDefaultLocale, useGT, useLocale } from "./client";
import createComponentError from "./client/errors/createComponentError";
import ClientCurrency from "./client/variables/ClientCurrency";
import ClientDateTime from "./client/variables/ClientDateTime";
import ClientNum from "./client/variables/ClientNum";
import ClientVar from "./client/variables/ClientVar";
import getDefaultFromEnv from "./config/local/getDefaultFromEnv";
import defaultGTProps from "./types/defaultGTProps";
import GeneralTranslation from "./types/GeneralTranslationInterface";
import InitGTProps from "./types/InitGTProps";
import Variables from './types/Variables'

// ----- SINGLETONS ----- //

let I18NConfig: any = null;

let createTComponent: any = null;

let createTranslationFunction: any = null;

let createValueComponent: any = null;

let createPluralComponent: any = null;

let createTFunction: any = null;

let createGTProviderComponent: any = null;

let VarComponent: any = null;

let NumComponent: any = null;

let CurrencyComponent: any = null;

let DateTimeComponent: any = null;

// ----- HELPER FUNCTIONS ----- //

const isClient = (): boolean => typeof window !== 'undefined';

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
    getLocale = () => { return 'en-US' },
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

    const initI18NConfig = () => {
        if (I18NConfig) return I18NConfig;
        I18NConfig = new (require('./config/I18NConfiguration').default)({
            apiKey, projectID, cacheURL, baseURL, remoteSource, automaticTranslation,
            getLocale, defaultLocale, approvedLocales,
            renderPrevious, renderMethod, renderTimeout,
            dictionary, 
            dictionaryName: getDefaultFromEnv('GT_DICTIONARY_NAME') || dictionaryName, // override from .env
            translations,
            maxConcurrentRequests, batchInterval,
            getMetadata,
            ...metadata
        });
    }

    const T = (params: any) => {
        if (isClient()) {
            return createComponentError('T')(params)
        } else {
            initI18NConfig();
            return (createTComponent ||= require('./server/inline/createTComponent').default)(
                I18NConfig
            )(params);
        }
    }

    const translate = (...params: any) => {
        if (isClient()) {
            throw new Error(`translate(${JSON.stringify(params?.[0])}) on the client-side can't access your API keys.`)
        } else {
            initI18NConfig();
            return (createTranslationFunction ||= require('./server/translate/createTranslateFunction').default)(
                I18NConfig
            )(...params);
        }
    }

    const Value = (params: any) => {
        if (isClient()) {
            return createComponentError('Value')(params)
        } else {
            initI18NConfig();
            return (createValueComponent ||= require('./server/value/createValueComponent').default)(
                T, I18NConfig.getLocale(), I18NConfig.getDefaultLocale()
            )(params);
        }
    }

    const Plural = (params: any) => {
        if (isClient()) {
            return createComponentError('Plural')(params)
        } else {
            initI18NConfig();
            return (createPluralComponent ||= require('./server/plural/createPluralComponent').default)(
                T, I18NConfig.getLocale(), I18NConfig.getDefaultLocale()
            )(params);
        }
    }

    const t = (...params: any) => {
        if (isClient()) {
            throw new Error(`t("${params?.[0]}") on the client-side, which won't work because of how React handles hooks. Try t = getGT() or useGT() to get the t() function instead.`)
        } else {
            initI18NConfig();
            return (createTFunction ||= require('./dictionary/createTFunction').default)(
                I18NConfig, T, translate
            )(...params);
        }
    }

    const getGT = (...params: any) => {
        if (isClient()) {
            return useGT;
        } else {
            initI18NConfig();
            return (
                params[0] ? (createTFunction ||= require('./dictionary/createTFunction').default)(
                    I18NConfig, T, translate, I18NConfig.getDictionaryEntry(params[0])
                ) : t
            );
        }
    }

    const GTProvider = (params: any) => {
        if (isClient()) {
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
        } else {
            initI18NConfig();
            return (createGTProviderComponent ||= (require('./server/provider/createGTProviderComponent').default))(
                I18NConfig
            )(params);
        }
    } 

    const getDefaultLocale = () => {
        if (isClient()) {
            return useDefaultLocale();
        } else {
            initI18NConfig();
            return I18NConfig.getDefaultLocale();
        }
    }

    return {
        T, translate,
        Value, Plural,
        t, getGT, GTProvider,
        getLocale: () => {
            if (isClient()) {
                return useLocale();
            } else {
                initI18NConfig();
                return I18NConfig.getLocale();
            }
        }, 
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

    
    const Var = (params: any = {}) => {
        const { children, ...props } = params;
        if (isClient()) {
            return (
                <ClientVar {...props}>
                    {children}
                </ClientVar>
            );
        } else {
            const Var = (VarComponent ||= (require('./server/variables/Var').default));
            return (
                <Var {...props}>
                    {children}
                </Var>
            )
        }
    }
    Var.gtTransformation = "variable-variable"

    const Num = (params: any = {}) => {
        const { children, ...props } = params;
        if (isClient()) {
            return (
                <ClientNum {...props}>
                    {children}
                </ClientNum>
            );
        } else {
            const locales = [getLocale(), defaultLocale];
            const Num = (NumComponent ||= (require('./server/variables/Num').default));
            return (
                <Num locales={locales} {...props}>
                    {children}
                </Num>
            )
        }
    }
    Num.gtTransformation = "variable-number";

    const DateTime = (params: any = {}) => {
        const { children, ...props } = params;
        if (isClient()) {
            return (
                <ClientDateTime {...props}>
                    {children}
                </ClientDateTime>
            );
        } else {
            const locales = [getLocale(), defaultLocale];
            const DateTime = (DateTimeComponent ||= (require('./server/variables/DateTime').default));
            return (
                <DateTime locales={locales} {...props}>
                    {children}
                </DateTime>
            )
        }
    }
    DateTime.gtTransformation = "variable-datetime";

    const Currency = (params: any = {}) => {
        const { children, ...props } = params;
        if (isClient()) {
            return (
                <ClientCurrency {...props}>
                    {children}
                </ClientCurrency>
            );
        } else {
            const locales = [getLocale(), defaultLocale];
            const Currency = (CurrencyComponent ||= (require('./server/variables/Currency').default))
            return (
                <Currency locales={locales} {...props}>
                    {children}
                </Currency>
            )
        }
    }
    Currency.gtTransformation = "variable-currency";

    const getDefaultLocale = () => {
        if (isClient()) {
            return useDefaultLocale();
        } else {
            return defaultLocale;
        }
    }

    return {
        Var, Num, Currency, DateTime,
        getLocale: () => {
            if (isClient()) {
                return useLocale();
            } else {
                return getLocale();
            }
        }, getDefaultLocale
    }

}