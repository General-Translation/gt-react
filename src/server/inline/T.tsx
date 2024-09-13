import { primitives, getPluralBranch, addGTIdentifier, writeChildrenAsObjects, calculateHash } from "gt-react/internal";
import getI18NConfig from "../../utils/getI18NConfig";
import getLocale from "../../request/getLocale";
import getMetadata from "../../request/getMetadata";
import { Suspense } from "react";
import Resolver from "./Resolver";
import renderTranslatedChildren from "../rendering/renderTranslatedChildren";
import renderDefaultChildren from "../rendering/renderDefaultChildren";

export default async function T({
    children, id,
    variables, variablesOptions,
    n, renderSettings,
    ...props
}: {
    children: any,
    id?: string
    n?: number,
    variables?: Record<string, any>,
    variablesOptions?: {
       [key: string]: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions
    },
    renderSettings?: {
        method: "skeleton" | "replace" | "hang" | "subtle",
        timeout: number | null;
        fallbackToPrevious: boolean
    }
    [key: string]: any
}) {

    const I18NConfig = getI18NConfig();
    const locale = getLocale();
    const defaultLocale = I18NConfig.getDefaultLocale();
    const translationRequired = I18NConfig.translationRequired(locale);

    let translationsPromise;
    if (translationRequired) {
        translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);
    }

    const taggedChildren = addGTIdentifier(children, props);

    console.log(props)

    let source = taggedChildren;
    
    // Get a plural if appropriate (check type, if type, get branch, entry =)
    const isPlural = props && primitives.pluralBranchNames.some(branchName => branchName in props);
    if (isPlural) {
        if (typeof n === 'number') (variables ||= {} as any).n = n;
        if (typeof variables?.n !== 'number') {
            throw new Error(
                id ? 
                `ID "${id}": Plural requires "n" option.` :
                `<T> with props ${JSON.stringify(props)}: Plural requires "n" option.` 
            );
        }
        source = getPluralBranch(
            (variables as any).n, 
            [locale, defaultLocale], // not redundant, as locale could be a different dialect of the same language
            source.props['data-generaltranslation'].branches
        ) || source.props.children;
    }

    if (!translationRequired) {
        return renderDefaultChildren({ 
            children: source, variables, variablesOptions
        });
    }
    
    const childrenAsObjects = writeChildrenAsObjects(taggedChildren);

    const key: string = props.context ? await calculateHash([childrenAsObjects, props.context]) : await calculateHash(childrenAsObjects);

    const translations = await translationsPromise;
    const translation = translations?.[id || key];

    if (translation?.k === key) {
        // a translation exists!
        let target = translation.t;
        if (isPlural) {
            target = getPluralBranch(
                variables?.n as number,
                [locale, defaultLocale],
                target.props['data-generaltranslation'].branches
            ) || target.props.children;
        }
        return renderTranslatedChildren({
            source, target,
            variables, variablesOptions
        });
    }

    renderSettings ||= I18NConfig.getRenderSettings();

    const translationPromise = I18NConfig.translateChildren({ 
        children: childrenAsObjects, 
        targetLanguage: locale, 
        metadata: { ...props, ...(id && { id }), hash: key, ...(getMetadata()), ...(renderSettings.timeout && { timeout: renderSettings.timeout }) } 
    });
    let promise = translationPromise.then(translation => {
        let target = translation.t;
        if (isPlural) {
            target = getPluralBranch(
                variables?.n as number,
                [locale, defaultLocale],
                target.props['data-generaltranslation'].branches
            ) || target.props.children;
        }
        return renderTranslatedChildren({
            source, target, 
            variables,
            variablesOptions
        });
    });

    let loadingFallback;
    let errorFallback;

    if (renderSettings.fallbackToPrevious && translation) {
        // in case there's a previous translation on file
        let target = translation.t;
        if (isPlural) {
            target = getPluralBranch(
                variables?.n as number,
                [locale, defaultLocale],
                target.props['data-generaltranslation'].branches
            ) || target.props.children;
        }
        loadingFallback = renderTranslatedChildren({
            source, target, variables, variablesOptions
        });
        errorFallback = loadingFallback;
    } else {
        errorFallback = renderDefaultChildren({
            children: source, variables, variablesOptions
        });
        if (renderSettings.method === "skeleton") {
            loadingFallback = <></>
        }
        else if (renderSettings.method === "replace") {
            loadingFallback = errorFallback;
        }
    }

    if (renderSettings.method === "hang") {
        // Wait until the site is translated to return
        return <Resolver children={promise} fallback={errorFallback} />;
    }

    if (!["skeleton", "replace"].includes(renderSettings.method) && !id) {
        // If none of those, i.e. "subtle" 
        // return the children, with no special rendering
        // a translation may be available from a cached translation dictionary next time the component is loaded
        return errorFallback;
    }

    return (
        <Suspense fallback={loadingFallback}>
            <Resolver children={promise} fallback={errorFallback} />
        </Suspense>
    )
    
}