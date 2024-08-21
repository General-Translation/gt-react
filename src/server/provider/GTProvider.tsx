// On the server
import 'server-only'

import React from 'react';

import ClientProvider from '../../client/ClientProvider';
import I18NConfiguration from '../../config/I18NConfiguration';
import flattenDictionary from '../../primitives/flattenDictionary';
import hasTransformation from '../../primitives/hasTransformation';
import isPromise from '../../primitives/isPromise';

/*
e.g.
dictionary = {
    "greeting": "Hello, world",
    "greeting.component": <div>Hello, world</div>,
    "greeting.text.withparams": intl("Hello, world", { context: "Be informal." })
}
*/

export default async function GTProvider({
    children,
    T, intl, I18NConfig,
    locale, defaultLocale,
    id='',
    dictionary = id ? {} : I18NConfig.getDictionary(),
    ...props
}: {
    I18NConfig: I18NConfiguration
    T: any;
    intl: any;
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary?: Record<string, any>;
    id?: string;
    [key: string]: any;
}): Promise<any> {

    let providerID: string = id;
    if (providerID) {
        let entry = I18NConfig.getDictionaryEntry(providerID);
        if (Array.isArray(entry)) {
            if (typeof entry[1] === 'object') {
                props = { ...entry[1], ...props }
            }
            entry = entry[0]
        }
        dictionary = { ...entry, ...dictionary };
    }

    dictionary = flattenDictionary(dictionary);

    const translationRequired: boolean = (children && I18NConfig.translationRequired(locale)) ? true : false;
    if (!translationRequired) {
        return (
            <ClientProvider
                locale={locale}
                defaultLocale={defaultLocale}
                dictionary={dictionary}
            >
                {children}
            </ClientProvider>
        )
    }

    let translatedDictionary: Record<string, any> = {};

    await Promise.all(Object.keys(dictionary).map(async id => {
        if (hasTransformation(dictionary[id])) {
            return dictionary[id];
        }
        else if (isPromise(dictionary[id])) {
            translatedDictionary[id] = await dictionary[id];
        }
        else if (dictionary[id] && typeof dictionary[id] === 'string') {
            translatedDictionary[id] = await intl(dictionary[id], { targetLanguage: locale, ...props, id: `${providerID ? `${providerID}.` : ''}${id}` })
        }
        else {
            translatedDictionary[id] = <T id={`${providerID ? `${providerID}.` : ''}${id}`} {...props}>{dictionary[id]}</T>
        }
    }));

    return (
        <ClientProvider
            locale={locale}
            defaultLocale={defaultLocale}
            dictionary={translatedDictionary}
        >
            {children}
        </ClientProvider>
    );

}

