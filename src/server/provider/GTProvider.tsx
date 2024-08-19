// On the server
import 'server-only'

import React from 'react';

import ClientProvider from '../../client/ClientProvider';
import I18NConfiguration from '../../config/I18NConfiguration';

/**
 * Checks if the provided value is a promise.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is a promise, otherwise false.
 */
function isPromise(value: any): boolean {
    return Boolean(value && typeof value.then === 'function' && typeof value.catch === 'function');
}

/**
 * Flattens a nested object by concatenating nested keys.
 * @param {Record<string, any>} obj - The object to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {Record<string, React.ReactNode>} The flattened object.
 */
function flattenObject(obj: Record<string, any>, prefix: string = ''): Record<string, React.ReactNode> {
    const flattened: Record<string, React.ReactNode> = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]) && !(React.isValidElement(obj[key]))) {
                Object.assign(flattened, flattenObject(obj[key], newKey));
            } else {
                flattened[newKey] = obj[key];
            }
        }
    }

    return flattened;
}


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
        dictionary = { ...I18NConfig.getDictionaryEntry(providerID), ...dictionary };
    }

    dictionary = flattenObject(dictionary);

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
        if (isPromise(dictionary[id])) {
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

