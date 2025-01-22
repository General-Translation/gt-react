import { splitStringToContent } from "generaltranslation";
import { hashJsxChildren } from "generaltranslation/id";
import React from "react";
import { DictionaryEntry, extractEntryMetadata, addGTIdentifier, writeChildrenAsObjects } from "../internal";
import { createLibraryNoEntryWarning } from "../messages/createMessages";
import { FlattenedDictionary, TranslateContentCallback, TranslationsObject } from "../types/types";


export default async function translateDictionaryStrings(
  locale: string,
  flattenedDictionary: FlattenedDictionary,
  translations: TranslationsObject,
  translateContent: TranslateContentCallback,
) {
  await Promise.all(
    // iterate through dictionary
    Object.entries(flattenedDictionary).map(async ([id, dictionaryEntry]: [string, DictionaryEntry]) => {
      
      // check that the dictionary entry is valid
      if (dictionaryEntry === undefined) {
        console.warn(createLibraryNoEntryWarning(id));
        return;
      }

      // Parse the dictionary entry
      const { entry, metadata } = extractEntryMetadata(dictionaryEntry);

      // dictionary strings only
      if (typeof entry !== 'string') {
        return;
      }
      
      // Get tx entry
      const source = splitStringToContent(entry);
      const context = metadata?.context;
      const hash = hashJsxChildren({ source, context });
      const translationEntry = translations[id]?.[hash];

      // Initiate translation (only tx for cache misses)
      if (!translationEntry) {

        // Translate the content
        try {
          console.log('Translating:', id, hash, context);
          await translateContent({
            source, 
            targetLocale: locale,
            metadata: { id, hash, context }
          });
        } catch (error) {
          console.error(error);
        }
      }
    })
  );

}