import { useMemo } from "react";
import { renderContentToString, requiresRegionalTranslation, requiresTranslation } from "generaltranslation";
import { useCallback, useEffect, useState } from "react";
import useBrowserLocale from "../hooks/useBrowserLocale";

import { GTContext } from "./GTContext";
import {
  Dictionary,
  RenderMethod,
  TranslatedChildren,
  TranslatedContent,
  TranslationsObject,
} from "../types/types";
import getDictionaryEntry from "./helpers/getDictionaryEntry";
import { addGTIdentifier, isTranslationError, writeChildrenAsObjects } from "../internal";
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
} from "../errors/createErrors";
import { listSupportedLocales } from "@generaltranslation/supported-locales";
import useDynamicTranslation from "./dynamic/useDynamicTranslation";
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
    children?: any;
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

  // get tx required info
  const [translationRequired, regionalTranslationRequired] = useMemo(() => {
    const regionalTranslation = requiresRegionalTranslation(defaultLocale, locale, locales)
    return [requiresTranslation(defaultLocale, locale, locales) || regionalTranslation, regionalTranslation]
  }, [defaultLocale, locale, locales]);

  // tracking translations
  const [translations, setTranslations] = useState<TranslationsObject | null>(cacheUrl ? null : {});

  // fetch from cache
  useEffect(() => {
    if (!translations) {
      if (!translationRequired) {
        setTranslations({}); // no translation required
      } else {
        (async () => {
        // check cache for translations
        try {
          const response = await fetch(`${cacheUrl}/${projectId}/${locale}`);
          const result = await response.json();
          setTranslations(result);
        } catch (error) {
          setTranslations({}); // not classified as a tx error, bc we can still fetch from API
        }
        })();
      }
    }
  }, [translationRequired, cacheUrl, projectId, locale]);

  // translate function for dictionaries
  const translate = useCallback(
    (id: string, options: Record<string, any> = {}): React.ReactNode => {
      // get the dictionary entry
      const dictionaryEntry = getDictionaryEntry(dictionary, id);
      if (
        dictionaryEntry === undefined ||
        dictionaryEntry === null ||
        (typeof dictionaryEntry === "object" && !Array.isArray(dictionaryEntry))
      ) {
        console.warn(createLibraryNoEntryWarning(id));
        return undefined;
      }

      let { entry, metadata } = extractEntryMetadata(dictionaryEntry);

      // Get variables and variable options
      let variables = options;
      let variablesOptions = metadata?.variablesOptions;

      const taggedEntry = addGTIdentifier(entry, id);

      // ----- RENDER METHODS ----- //

      // render default locale
      const renderDefaultLocale = (): React.ReactNode => {
        if (typeof taggedEntry === 'string')
          return renderContentToString(
            taggedEntry,
            defaultLocale, 
            variables,
            variablesOptions
          );
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
        if (typeof taggedEntry === 'string') return '';
        return renderSkeleton({ // render skeleton for jsx
            children: taggedEntry,
            variables,
            defaultLocale,
            renderVariable
        });
      }

      // hang behavior
      const renderLoadingHang = (): React.ReactNode => {
        if (typeof taggedEntry === 'string') return '';
        return undefined;
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

      // get hash
      const context = metadata?.context;
      const childrenAsObjects = writeChildrenAsObjects(taggedEntry);
      const hash: string = hashJsxChildren(
        context
          ? { source: childrenAsObjects, context }
          : { source: childrenAsObjects }
      );

      // error behavior -> fallback to default language
      if (isTranslationError(translations?.[id])) {
        return renderDefaultLocale();
      }

      // loading
      if (!translations || !translations[id]?.[hash]) {
        if (renderSettings.method === 'skeleton') {
          return renderLoadingSkeleton();
        }
        if (renderSettings.method === 'replace') {
          return renderDefaultLocale(); // replace
        }
        if (renderSettings.method === 'hang') {
          return renderLoadingHang();
        }
        if (renderSettings.method === 'subtle') {
          return renderDefaultLocale(); // TODO: implement subtle behavior for client-side rendering
        }
        return renderDefault(); // default rendering behavior (not to be confused with default locale)
      }

      // render translated content
      const target = translations[id][hash];
      return renderTranslation(target);
    },
    [dictionary, translations, translationRequired, defaultLocale]
  );

  const { translateChildren, translateContent, translationEnabled } = useDynamicTranslation({
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
      translate, translateContent, translateChildren,
      locale, defaultLocale, 
      translations, translationRequired, regionalTranslationRequired,
      projectId, translationEnabled,
      renderSettings
    }}>
      {children}
    </GTContext.Provider>
  )

}
