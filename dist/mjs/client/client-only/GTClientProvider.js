// intended for purely client-side apps, put at the root of the project
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useCallback, useState } from "react";
import { GTContext } from "../ClientProvider";
import { isSameLanguage } from "generaltranslation";
import defaultGTProps from "../../types/defaultGTProps";
import useBrowserLocale from "../hooks/useBrowserLocale";
import renderDictionary from "./helpers/renderDictionary";
import flattenDictionary from "../../primitives/flattenDictionary";
import getDictionaryReference from "../../primitives/getDictionaryReference";
import getEntryMetadata from "../../primitives/getEntryMetadata";
export default function GTClientProvider(_a) {
    var _b;
    var { children, projectID, dictionary = defaultGTProps.dictionary, dictionaryName = defaultGTProps.dictionaryName, approvedLocales, defaultLocale = (_b = approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) !== null && _b !== void 0 ? _b : defaultGTProps.defaultLocale, locale = '', remoteSource = defaultGTProps.remoteSource, cacheURL = defaultGTProps.cacheURL, translations } = _a;
    const browserLocale = useBrowserLocale(defaultLocale);
    locale = locale || browserLocale;
    const [translatedDictionary, setTranslatedDictionary] = useState(flattenDictionary(dictionary));
    if (!projectID && remoteSource && cacheURL === defaultGTProps.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
    }
    const [translationComplete, setTranslationComplete] = useState(isSameLanguage(locale, defaultLocale));
    useEffect(() => {
        setTranslationComplete(isSameLanguage(locale, defaultLocale));
    }, [locale, defaultLocale]);
    useEffect(() => {
        if (!translationComplete && locale && !isSameLanguage(locale, defaultLocale)) {
            function completeDictionary() {
                return __awaiter(this, void 0, void 0, function* () {
                    let completedDictionary = dictionary;
                    if (translations && translations[locale]) {
                        try {
                            const loadDictionary = translations[locale];
                            const loadedDictionary = yield loadDictionary();
                            if (Object.keys(loadedDictionary).length) {
                                completedDictionary = Object.assign(Object.assign({}, completedDictionary), loadedDictionary);
                            }
                            else {
                                throw new Error(``);
                            }
                        }
                        catch (error) {
                            console.error(`Error loading dictionary for locale ${locale}:`, error);
                        }
                    }
                    if (remoteSource) {
                        try {
                            const response = yield fetch(`${cacheURL}/${projectID}/${getDictionaryReference(locale, dictionaryName)}`);
                            const result = yield response.json();
                            if (Object.keys(result).length) {
                                const renderedDictionary = renderDictionary({
                                    result, dictionary, locales: [locale, defaultLocale]
                                });
                                completedDictionary = Object.assign(Object.assign({}, completedDictionary), renderedDictionary);
                            }
                            else {
                                throw new Error(`No dictionary found in remote cache.`);
                            }
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                    setTranslatedDictionary(flattenDictionary(completedDictionary));
                    setTranslationComplete(true);
                });
            }
            completeDictionary();
        }
    }, [cacheURL, remoteSource, locale, translations]);
    const translate = useCallback((id) => {
        return getEntryMetadata(translatedDictionary[id]).entry;
    }, [translatedDictionary]);
    return (_jsx(GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: translationComplete
            ? children : undefined }));
}
//# sourceMappingURL=GTClientProvider.js.map