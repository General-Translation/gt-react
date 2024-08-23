import React, { ReactNode, Suspense } from 'react'
import addGTIdentifier from '../../index/addGTIdentifier';
import writeChildrenAsObjects from '../../index/writeChildrenAsObjects';
import renderChildren from './renderChildren';
import I18NConfiguration from '../../config/I18NConfiguration';
import Resolver from './Resolver';
import calculateHash from '../../index/calculateHash';
import getRenderAttributes from '../../primitives/getRenderAttributes';

type ServerTProps = {
    I18NConfig: I18NConfiguration
    children: any;
    locale: string;
    id?: string;
    [key: string]: any; // This allows additional metadata props with any key and type
}

const ServerT = async ({ 
    I18NConfig, children, locale, ...props
}: ServerTProps): Promise<ReactNode> => {
    
    // Handle case where translation is not required, for example if the user's browser is in the default locale
    const translationRequired: boolean = (children && I18NConfig.translationRequired(locale)) ? true : false;
    if (!translationRequired) {
        return (
            <>
                {children}
            </>
        )
    }

    // Fetch translations promise
    const translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);

    const defaultLocale = I18NConfig.getDefaultLocale();
    const renderAttributes = getRenderAttributes({ locale, ...props });
   
    const taggedChildren = addGTIdentifier(children);
    const childrenAsObjects = writeChildrenAsObjects(taggedChildren);
    
    let key: string = props.context ? await calculateHash([childrenAsObjects, props.context]) : await calculateHash(childrenAsObjects);
    const id = props.id ? props.id : key;

    const translations = await translationsPromise;
    const translation = await I18NConfig.getTranslation(locale, key, id, props.dictionaryName ?? undefined, translations)
    
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

    if (!I18NConfig.automaticTranslationEnabled()) {
        return (
            <>{children}</>
        )
    }

    // Create a new translation for this site and render it
    
    const I18NChildrenPromise = I18NConfig.translateChildren({ children: childrenAsObjects, targetLanguage: locale, metadata: { ...props, hash: key } });
    
    const renderSettings = I18NConfig.getRenderSettings();
    const renderMethod = props?.renderMethod || renderSettings.method;
    let promise: Promise<any> = I18NChildrenPromise.then(target => renderChildren({ source: taggedChildren, target, renderAttributes, locale, defaultLocale }));

    // Render methods

    if (renderMethod === "hang") {
        // Wait until the site is translated to return
        return (
            <>
                {await promise}
            </>
        )
    }

    let loadingFallback = props.fallback;
    let errorFallback = children;
    
    if (renderMethod === "skeleton") {
        if (!loadingFallback) loadingFallback = <></>;
    } else if (renderMethod === "replace") {
        if (!loadingFallback) loadingFallback = children;
    }

    if (renderSettings.renderPrevious && translations.remote && translations.remote[id] && translations.remote[id].k) {
        // in case there's a previous translation on file
        loadingFallback = renderChildren({ source: taggedChildren, target: translations.remote[id].t, renderAttributes, locale, defaultLocale });
        errorFallback = loadingFallback;
    }

    if (!["skeleton", "replace"].includes(renderMethod)) {
        // If none of those, i.e. "subtle" 
        // return the children, with no special rendering
        // a translation may be available from a cached translation dictionary next time the component is loaded
        return (
            <> 
                {errorFallback}
            </>
        );
    }

    return (
        <Suspense fallback={loadingFallback}>
            {/* @ts-expect-error Server Component */}
            <Resolver fallback={errorFallback}>{promise}</Resolver>
        </Suspense>
    )

}

ServerT.gtTransformation = "translate";

export default ServerT;