import React, { Suspense, useEffect } from "react";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier, writeChildrenAsObjects } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import { useMemo } from "react";
import renderVariable from "../provider/rendering/renderVariable";
import { createClientSideTWithoutIdError } from "../errors/createErrors";
import { hashJsxChildren } from "generaltranslation/id";
import renderSkeleton from "../provider/rendering/renderSkeleton";
import { requiresTranslation } from "generaltranslation";

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

  const { translations, translationRequired, regionalTranslationRequired, translateChildren, renderSettings } = useGTContext(
      `<T id="${id}"> used on the client-side outside of <GTProvider>`
  );

  const locale = useLocale();
  const defaultLocale = useDefaultLocale();
  const taggedChildren = useMemo(() => addGTIdentifier(children), [children])

  // Do translation
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
  useEffect(() => {
    if (!translationRequired) return;
    if (!translation || (!translation[hash] && !translation.error)) {
      translateChildren({
          source: childrenAsObjects,
          targetLocale: locale,
          metadata: {
              id, hash
          }
      });
    }
  }, [translation, translation?.[hash], translationRequired]);


  // for default/fallback rendering
  function renderDefault() {
    return renderDefaultChildren({
        children: taggedChildren,
        variables,
        variablesOptions,
        defaultLocale,
        renderVariable
    }) as React.JSX.Element;
  }

    function renderLoadingSkeleton() {
        return renderSkeleton({
            children: taggedChildren,
            variables,
            defaultLocale,
            renderVariable
        });
    }


  if (!translationRequired) {
      return renderDefault();
  }

  // handle translation error
  if (translation?.error) {
    return renderDefault();
  }
  // handle no translation/waiting for translation
  if (!translation?.[hash]) {
      let loadingFallback; // Blank screen

      if (renderSettings.method === "skeleton") {
          loadingFallback = renderLoadingSkeleton();
      } else if (renderSettings.method === "replace") {
          loadingFallback = renderDefault();
      } else if (renderSettings.method === "default") {
          if (regionalTranslationRequired) {
              loadingFallback = renderDefault();
          } else {
              loadingFallback = renderLoadingSkeleton();
          }
      } else if (renderSettings.method === 'hang') {
          loadingFallback = undefined;
      } else if (renderSettings.method === 'subtle') {
          loadingFallback = renderDefault();
      }
      // The suspense exists here for hydration reasons
      return <Suspense fallback={loadingFallback}>{loadingFallback}</Suspense>;
    }

  return (
      renderTranslatedChildren({
          source: taggedChildren,
          target: translation[hash],
          variables,
          variablesOptions,
          locales: [locale, defaultLocale],
          renderVariable
      }) as React.JSX.Element
  );

}

T.gtTransformation = "translate-client";

export default T;
