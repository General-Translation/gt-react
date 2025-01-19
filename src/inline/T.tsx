import React, { Suspense, useEffect } from "react";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier, isTranslationError, writeChildrenAsObjects } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import { useMemo } from "react";
import renderVariable from "../provider/rendering/renderVariable";
import { createClientSideTWithoutIdError } from "../errors/createErrors";
import { hashJsxChildren } from "generaltranslation/id";
import renderSkeleton from "../provider/rendering/renderSkeleton";
import { TranslatedChildren, TranslatedContent } from "../types/types";

/**
 * Translation component that handles rendering translated content, including plural forms.
 * Used with the required `id` parameter instead of `const t = useGT()`.
 *
 * @param {string} [id] - Required identifier for the translation string.
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {any} [context] - Additional context used for translation.
 * @param {Object} [props] - Additional props for the component.
 * @returns {JSX.Element} The rendered translation or fallback content based on the provided configuration.
 *
 * @throws {Error} If a plural translation is requested but the `n` option is not provided.
 *
 * @example
 * ```jsx
 * // Basic usage:
 * <T id="welcome_message">
 *  Hello, <Var name="name">{name}</Var>!
 * </T>
 * ```
 *
 * @example
 * ```jsx
 * // Using plural translations:
 * <T id="item_count">
 *  <Plural n={n} singular={<>You have <Num value={n}/> item</>}>
 *      You have <Num value={n}/> items
 *  </Plural>
 * </T>
 * ```
 *
 */
function T({
    children,
    id,
    ...props
}: {
    children?: any;
    id: string;
    context?: string;
    [key: string]: any;
}): React.JSX.Element | undefined {
  if (!children) return undefined;

  if (!id) throw new Error(createClientSideTWithoutIdError(children));

  const { variables, variablesOptions } = props;

  const {
    translations,
    translationRequired,
    regionalTranslationRequired,
    translateChildren,
    renderSettings
  } = useGTContext(
      `<T id="${id}"> used on the client-side outside of <GTProvider>`
  );

  const locale = useLocale();
  const defaultLocale = useDefaultLocale();
  const taggedChildren = useMemo(() => addGTIdentifier(children), [children])

  // ----- FETCH TRANSLATION ----- //

  const context = props.context;
  const [childrenAsObjects, hash] = useMemo(() => {
    if (translationRequired) {
      const childrenAsObjects = writeChildrenAsObjects(taggedChildren);
      const hash: string = hashJsxChildren(
        context
          ? { source: childrenAsObjects, context }
          : { source: childrenAsObjects }
      );
      return [childrenAsObjects, hash];
    } else {
      return [undefined, ''];
    }
  }, [context, taggedChildren, translationRequired]);


  const translation = translations?.[id];
  const translationEntry = !isTranslationError(translation) && translation?.[hash];
  useEffect(() => {
    if (!translationRequired) return;
    // note have to recover from mis-matching hashing functions on client and server, if API returns wrong hash, then should fail gracefully
    if (!translationEntry) {
      translateChildren({
        source: childrenAsObjects,
        targetLocale: locale,
        metadata: {
            id, hash, context
        }
      });
    }
  }, [translation, translationEntry, translationRequired, id, hash, context]);

  // ----- RENDER METHODS ----- // 

  // for default/fallback rendering
  const renderDefaultLocale = () => {
    return renderDefaultChildren({
        children: taggedChildren,
        variables,
        variablesOptions,
        defaultLocale,
        renderVariable
    }) as React.JSX.Element;
  }

  const renderLoadingSkeleton = () => {
      return renderSkeleton({
          children: taggedChildren,
          variables,
          defaultLocale,
          renderVariable
      });
  }

  const renderLoadingDefault = () => {
    if (regionalTranslationRequired) {
        return renderDefaultLocale();
    }
    return renderLoadingSkeleton();
  }

  const renderTranslation = (target: TranslatedChildren) => {
    return renderTranslatedChildren({
      source: taggedChildren,
      target,
      variables,
      variablesOptions,
      locales: [locale, defaultLocale],
      renderVariable
    }) as React.JSX.Element
  }

  // ----- RENDER BEHAVIOR ----- //

  // fallback to default locale if no tx required
  if (!translationRequired) {
      return renderDefaultLocale();
  }

  // handle translation error
  if (isTranslationError(translation)) {
    return renderDefaultLocale();
  }
  // loading behavior
  if (!translationEntry) {
    let loadingFallback;
    if (renderSettings.method === "skeleton") {
        loadingFallback = renderLoadingSkeleton();
    } else if (renderSettings.method === "replace") {
        loadingFallback = renderDefaultLocale();
    } else if (renderSettings.method === "subtle") {
        loadingFallback = renderDefaultLocale();
    } else { // default
      loadingFallback = renderLoadingDefault();
    }
    // The suspense exists here for hydration reasons
    return <Suspense fallback={loadingFallback}>{loadingFallback}</Suspense>;
  }

  // render translated content
  return renderTranslation(translationEntry as TranslatedChildren);

}

T.gtTransformation = "translate-client";

export default T;
