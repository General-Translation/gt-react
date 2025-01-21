import { useMemo } from "react";
import { renderContentToString, requiresRegionalTranslation, requiresTranslation } from "generaltranslation";
import { useCallback, useEffect, useState } from "react";
import useBrowserLocale from "../hooks/useBrowserLocale";

import { GTContext } from "./GTContext";
import {
  Dictionary,
  DictionaryEntry,
  Entry,
  Metadata,
  RenderMethod,
  TranslatedChildren,
  TranslatedContent,
  TranslationsObject,
} from "../types/types";
import getDictionaryEntry from "./helpers/getDictionaryEntry";
import { addGTIdentifier, flattenDictionary, writeChildrenAsObjects } from "../internal";
import extractEntryMetadata from "./helpers/extractEntryMetadata";
import renderDefaultChildren from "./rendering/renderDefaultChildren";
import renderTranslatedChildren from "./rendering/renderTranslatedChildren";

import {
  defaultCacheUrl,
  defaultRuntimeApiUrl,
  libraryDefaultLocale,
} from "generaltranslation/internal";
import renderVariable from "./rendering/renderVariable";
import {
  createLibraryNoEntryWarning,
  projectIdMissingError,
} from "../messages/createMessages";
import { listSupportedLocales } from "@generaltranslation/supported-locales";
import useRuntimeTranslation from "./runtime/useRuntimeTranslation";
import { defaultRenderSettings } from "./rendering/defaultRenderSettings";
import { hashJsxChildren } from "generaltranslation/id";
import React from "react";
import renderSkeleton from "./rendering/renderSkeleton";

/**
 * Provides General Translation context to its children, which can then access `useGT`, `useLocale`, and `useDefaultLocale`.
 *
 * @param {React.ReactNode} children - The children components that will use the translation context.
 * @param {string} [projectId] - The project ID required for General Translation cloud services.
 * @param {Dictionary} [dictionary=defaultDictionary] - The translation dictionary for the project.
 * @param {string[]} [locales] - The list of approved locales for the project.
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if no other locale is found.
 * @param {string} [locale] - The current locale, if already set.
 * @param {string} [cacheUrl='https://cache.gtx.dev'] - The URL of the cache service for fetching translations.
 *
 * @returns {JSX.Element} The provider component for General Translation context.
 */

export default function GTProvider({
  children,
  projectId,
  dictionary = {},
  locales = listSupportedLocales(),
  defaultLocale = libraryDefaultLocale,
  locale = useBrowserLocale(defaultLocale, locales) || defaultLocale,
  cacheUrl = defaultCacheUrl,
  runtimeUrl = defaultRuntimeApiUrl,
  renderSettings = defaultRenderSettings,
  devApiKey,
  ...metadata
}: {
    children?: React.ReactNode;
    projectId: string;
    dictionary?: Dictionary;
    locales?: string[];
    defaultLocale?: string;
    locale?: string;
    cacheUrl?: string;
    runtimeUrl?: string;
    devApiKey?: string;
    renderSettings?: {
        method: RenderMethod;
        timeout?: number;
    };
    [key: string]: any
}): React.JSX.Element {

  if (!projectId && (cacheUrl === defaultCacheUrl || runtimeUrl === defaultRuntimeApiUrl)) {
      throw new Error(projectIdMissingError)
  };

  // disable subtle for development
  if (devApiKey && renderSettings.method === 'subtle') {
    console.warn('Subtle render method cannot be used in dev environments, falling back to default.');
    renderSettings.method = 'default';
  }

  // get tx required info
  const [translationRequired, regionalTranslationRequired] = useMemo(() => {
    const regionalTranslation = requiresRegionalTranslation(defaultLocale, locale, locales)
    return [requiresTranslation(defaultLocale, locale, locales) || regionalTranslation, regionalTranslation]
  }, [defaultLocale, locale, locales]);

  // tracking translations
  /** Key for translation tracking:
   * Cache Loading            -> translations = null
   * Cache Fail (for locale)  -> translations = {}
   * Cache Fail (for id)      -> translations[id] = undefined
   * Cache Fail (for hash)    -> translations[id][hash] = undefined
   * 
   * API Loading              -> translations[id][hash] = TranslationLoading
   * API Fail (for batch)     -> translations[id][hash] = TranslationError
   * API Fail (for hash)      -> translations[id][hash] = TranslationError
   * 
   * Success (Cache/API)      -> translations[id][hash] = TranslationSuccess
   * 
   * Possible scenarios:
   * Cache Loading -> Success
   * Cache Loading -> Cache Fail -> API Loading -> Success
   * Cache Loading -> Cache Fail -> API Loading -> API Fail
   */
  const [translations, setTranslations] = useState<TranslationsObject | null>(cacheUrl ? null : {});


  // ----- CHECK CACHE FOR TX ----- //

  useEffect(() => {

    // check if cache fetch is necessary
    if (!translationRequired) return setTranslations({});
    if (translations) return

    // fetch translations from cache
    (async () => {
      try {
        const response = await fetch(`${cacheUrl}/${projectId}/${locale}`);
        const result = await response.json();

        // convert to translation success and record
        const parsedResult = Object.entries(result).reduce((acc: Record<string, any>, [id, hashToTranslation]: [string, any]) => {
          acc[id] = Object.entries(hashToTranslation).reduce((acc: Record<string, any>, [hash, content]) => {
            acc[hash] = { state: 'success', entry: content };
            return acc;
          }, {});
          return acc;
        }, {})
        setTranslations(parsedResult);
      } catch (error) {
        setTranslations({}); // not classified as a tx error, bc we can still fetch from API
      }
    })();
  }, [translationRequired, cacheUrl, projectId, locale]);

  // ----- PERFORM DICTIONARY TRANSLATION ----- //

  // Flatten dictionaries for processing while waiting for translations
  const flattenedDictionary = flattenDictionary(dictionary);


  // do translation
  useEffect(() => {
    // tx required, ditionary exists, and translations not in cache
    if (!translationRequired || !dictionary || !translations) return;

    // iterate through dictionary
    Object.entries(flattenedDictionary).forEach(([id, entry]: [string, DictionaryEntry]) => {
      // check that the dictionary entry is valid
      if (entry === undefined
        || (typeof entry === 'object' && !(React.isValidElement(entry) || Array.isArray(entry)))
      ) {
        console.warn(createLibraryNoEntryWarning(id));
        return;
      }

      // Parse the dictionary entry
      const { entry: dictionaryEntry, metadata } = extractEntryMetadata(entry);
      const context = metadata?.context;
      let taggedEntry = addGTIdentifier(dictionaryEntry as React.ReactElement | string, id);

      // Get tx entry
      let childrenAsObjects: TranslatedChildren | undefined, hash: string = '';
      if (translationRequired) {
        childrenAsObjects = writeChildrenAsObjects(taggedEntry);
        hash = hashJsxChildren({ source: childrenAsObjects, context });
      }
      const translationEntry = translations?.[id]?.[hash];

      // Initiate translation
      if (translationRequired && translations && !translationEntry) { // tx required and cache miss
        if (typeof taggedEntry === 'string') {
          translateContent({
            source: taggedEntry, 
            targetLocale: locale,
            metadata: { id, hash, context }
          });
        } else {
          translateChildren({
            source: childrenAsObjects,
            targetLocale: locale,
            metadata: { id, hash, context }
          });
        }
      }
    })
  }, [dictionary, translations, translationRequired]);


  // ----- TRANSLATE FUNCTION FOR DICTIONARIES ----- //

  const renderDictionaryTranslation = useCallback(
    (id: string, options: Record<string, any> = {}): React.ReactNode | string | undefined => {

      // ----- SETUP ----- //

      // get the dictionary entry
      const dictionaryEntry = getDictionaryEntry(dictionary, id);
      // check that the dictionary entry is valid
      if (dictionaryEntry === undefined
        || (typeof dictionaryEntry === 'object' && !(React.isValidElement(dictionaryEntry) || Array.isArray(dictionaryEntry)))
      ) {
        console.warn(createLibraryNoEntryWarning(id));
        return undefined;
      }

      // Parse the dictionary entry
      const { entry, metadata } = extractEntryMetadata(dictionaryEntry as DictionaryEntry)
      const variables = options;
      const variablesOptions = metadata?.variablesOptions;
      const context = metadata?.context;
      let taggedEntry = addGTIdentifier(entry as React.ReactElement | string, id);
      
      // get tx entry
      let childrenAsObjects: TranslatedChildren | undefined, hash: string = '';
      if (translationRequired) {
        childrenAsObjects = writeChildrenAsObjects(taggedEntry);
        hash = hashJsxChildren({ source: childrenAsObjects, context });
      }
      const translationEntry = translations?.[id]?.[hash];

      // ----- RENDER METHODS ----- //

      // render default locale string
      const renderDefaultContent = (): string => {
        return renderContentToString(
          taggedEntry,
          defaultLocale, 
          variables,
          variablesOptions
        );
      }

      // render default locale
      const renderDefaultLocale = (): React.ReactNode => {
        if (typeof taggedEntry === 'string') return renderDefaultContent();
        return renderDefaultChildren({
            children: taggedEntry,
            variables,
            variablesOptions,
            defaultLocale,
            renderVariable
        })
      }

      // render skeleton
      const renderLoadingSkeleton = (): React.ReactNode => {
        if (typeof taggedEntry === 'string') return renderDefaultContent();
        return renderSkeleton({ // render skeleton for jsx
            children: taggedEntry,
            variables,
            defaultLocale,
            renderVariable
        });
      }

      // default behavior (skeleton except when language is same ie en-US -> en-GB)
      const renderDefault = (): React.ReactNode => {
        if (regionalTranslationRequired) return renderDefaultLocale();
        return renderLoadingSkeleton();
      }

      // render translated content
      const renderTranslation = (target: TranslatedChildren | TranslatedContent): React.ReactNode => {
        if (typeof taggedEntry === 'string')
          return renderContentToString(
            target as TranslatedContent, [locale, defaultLocale],
            variables, variablesOptions
          );
        return renderTranslatedChildren({
          source: taggedEntry,
          target: target as TranslatedChildren,
          variables, variablesOptions,
          locales: [locale, defaultLocale],
          renderVariable
        });
      }

      // ----- RENDER LOGIC ----- // 

      // If no translations are required
      if (!translationRequired) {
        renderDefaultLocale();
      }

      // loading
      if (!translationEntry || translationEntry?.state === 'loading') {
        if (renderSettings.method === 'skeleton') {
          return renderLoadingSkeleton();
        }
        if (renderSettings.method === 'replace') {
          return renderDefaultLocale();
        }
        if (renderSettings.method === 'subtle') {
          return renderDefaultLocale();
        }
        return renderDefault(); // default
      }

      // error behavior
      if (translationEntry.state === 'error') {
        return renderDefaultLocale();
      }

      // render translated content
      return renderTranslation(translationEntry.entry);
    },
    [dictionary, translations, translationRequired, defaultLocale]
  );

  const { translateChildren, translateContent, translationEnabled } = useRuntimeTranslation({
    targetLocale: locale,
    projectId,
    defaultLocale,
    devApiKey,
    runtimeUrl,
    setTranslations,
    ...metadata,
  });

  return (
    <GTContext.Provider value={{
      renderDictionaryTranslation: renderDictionaryTranslation, translateContent, translateChildren,
      locale, defaultLocale, 
      translations, translationRequired, regionalTranslationRequired,
      projectId, translationEnabled,
      renderSettings,
    }}>
      {children}
    </GTContext.Provider>
  )

}
