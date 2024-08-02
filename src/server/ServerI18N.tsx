import React, { ReactNode, Suspense, lazy } from 'react'
import addGTIdentifier from './helpers/addGTIdentifier';
import writeChildrenAsObjects from './helpers/writeChildrenAsObjects';
import generateHash from './helpers/generateHash';
import renderChildren from './renderChildren';
import { getLanguageDirection } from 'generaltranslation';
import I18NConfiguration from '../config/I18NConfiguration';

const ReplaceResolver = lazy(() => import('./resolvers/ReplaceResolver'));
const SkeletonResolver = lazy(() => import('./resolvers/SkeletonResolver'));

type ServerI18NProps = {
    I18NConfig: I18NConfiguration
    children: any;
    locale: string;
    id?: string;
    [key: string]: any; // This allows additional metadata props with any key and type
}

export default async function ServerI18N({ 
    I18NConfig, children, locale, ...props
}: ServerI18NProps): Promise<ReactNode> {
    
    // Handle case where translation is not required, for example if the user's browser is in the default locale
    const translationRequired: boolean = (children && I18NConfig.translationRequired(locale)) ? true : false;
    if (!translationRequired) {
        return (
            <>
                {children}
            </>
        )
    }

    // Fetch translations
    const translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);

    const defaultLocale = I18NConfig.getDefaultLocale();
    let renderAttributes: any = {};
    const dir = getLanguageDirection(locale);
    if (dir === 'rtl') renderAttributes = { ...renderAttributes, dir }
   
    const taggedChildren = addGTIdentifier(children);
    const childrenAsObjects = writeChildrenAsObjects(taggedChildren);
    
    const key: string = await generateHash(childrenAsObjects);
    const id = props.id ? props.id : key;
    
    const translations = await translationsPromise;
    const translation = (translations && translations[id] && translations[id].k === key) ? translations[id].t : null;
    
    // Check if a translation for this site already exists and return it if it does
    const translationExists: boolean = translation ? true : false;
    if (translationExists) {
        const I18NChildren = renderChildren({ source: taggedChildren, target: translation, renderAttributes, locale, defaultLocale });
        return (
            <>
                {I18NChildren}
            </>
        )
    }

    // Check if a new translation for this site can be created

    const renderSettings = I18NConfig.getRenderSettings();

    if (!I18NConfig.automaticTranslationEnabled()) {
        return (
            <>{children}</>
        )
    }

    // Create a new translation for this site and render it
    
    const I18NChildrenPromise = I18NConfig.translateChildren({ children: childrenAsObjects, targetLanguage: locale, metadata: { ...props } });
    
    const renderMethod = props?.renderMethod || renderSettings.method;
    const timeout = renderSettings?.timeout;

    if (renderMethod === "skeleton") {
        // Return the site but without text
        // Replace with translated site when ready

        let promise: Promise<any> = I18NChildrenPromise.then(target => renderChildren({ source: taggedChildren, target, renderAttributes, locale, defaultLocale }));
        if (typeof timeout === 'number') {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(children), timeout));
            promise = Promise.race([promise, timeoutPromise])
        }
    
        return (
            <>
                <SkeletonResolver fallback={children}>{promise}</SkeletonResolver>
            </>
        )
    }

    if (renderMethod === "replace") {
        // Return the site in the default language
        // Replace with translated site when ready

        let promise: Promise<any> = I18NChildrenPromise.then(target => renderChildren({ source: taggedChildren, target, renderAttributes, locale, defaultLocale }));
        if (typeof timeout === 'number') {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(children), timeout));
            promise = Promise.race([promise, timeoutPromise])
        }
    
        return (
            <>
                <ReplaceResolver fallback={children}>{promise}</ReplaceResolver>
            </>
        )
    }

    if (renderMethod === "hang") {
        // Wait until the site is translated to return
        const renderPromise = I18NChildrenPromise.then(target => renderChildren({ source: taggedChildren, target, renderAttributes, locale, defaultLocale }))
        if (typeof timeout === 'number') {
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(children), timeout));
            return (
                <>
                    {await Promise.race([renderPromise, timeoutPromise])}
                </>
            )
        }
        return (
            <>
                {await renderPromise}
            </>
        )
    }

    return (
        // return the children, with no special rendering
        // a translation may be available from a cached translation dictionary next time the component is loaded
        <> 
            {children}
        </>
    )
    
}