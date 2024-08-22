// On the server
import 'server-only'

import React, { isValidElement } from 'react';

import ClientProvider from '../../client/ClientProvider';
import I18NConfiguration from '../../config/I18NConfiguration';
import flattenDictionary from '../../primitives/flattenDictionary';
import hasTransformation from '../../primitives/hasTransformation';
import getEntryMetadata from '../../primitives/getEntryMetadata';
import { tOptions } from '../../dictionary/createExecuteTFunction';

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
    executeT, I18NConfig,
    locale, defaultLocale,
    id='',
    dictionary = id ? {} : I18NConfig.getDictionary(),
    ...props
}: {
    I18NConfig: I18NConfiguration;
    executeT: any;
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary?: Record<string, any>;
    id?: string;
    [key: string]: any;
}): Promise<any> {

    let providerID: string = id;
    if (providerID) {
        const { entry } = getEntryMetadata(I18NConfig.getDictionaryEntry(providerID));
        if (entry && !isValidElement(entry) && typeof entry === 'object') {
            dictionary = { ...entry, ...dictionary }
        }
    }

    dictionary = flattenDictionary(dictionary);

    const providerT = (id: string, options?: tOptions) => executeT(dictionary, id, options);

    let translatedDictionary: Record<string, any> = {};

    await Promise.all(Object.keys(dictionary).map(async id => {
        translatedDictionary[id] = await providerT(id, props);
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

