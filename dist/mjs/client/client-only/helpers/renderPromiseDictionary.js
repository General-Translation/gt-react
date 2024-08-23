'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from "react";
import getEntryMetadata from "../../../primitives/getEntryMetadata";
import getRenderAttributes from "../../../primitives/getRenderAttributes";
import ClientResolver from "./ClientResolver";
import renderClientChildren from "./renderClientChildren";
export default function renderPromiseDictionary({ result, dictionary, locales }) {
    const renderAttributes = getRenderAttributes(locales[0]);
    let translatedDictionary = {};
    for (const id of Object.keys(dictionary)) {
        if (result[id]) {
            let { entry, metadata } = getEntryMetadata(dictionary[id]);
            metadata = Object.assign({ locales, renderAttributes }, metadata);
            let { entry: translation, metadata: fallbacks } = getEntryMetadata(result[id]);
            if (typeof entry === 'string' && typeof translation === 'string') { // i.e., intl()
                translatedDictionary[id] = translation;
                continue;
            }
            if (isTranslationPromise(translation)) {
                if (fallbacks) {
                    translatedDictionary[id] = (_jsx(Suspense, { fallback: fallbacks.loadingFallbackTarget, children: _jsx(ClientResolver, { promise: translation, entry: entry, fallback: fallbacks.errorFallbackTarget }) }));
                    continue;
                }
            }
            translatedDictionary[id] = renderClientChildren({
                source: entry,
                target: translation.t,
                metadata
            });
        }
    }
    return translatedDictionary;
}
function isTranslationPromise(obj) {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
//# sourceMappingURL=renderPromiseDictionary.js.map