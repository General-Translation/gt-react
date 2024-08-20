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
const getDictionaryReference = (locale, dictionaryName) => {
    return `${encodeURIComponent(dictionaryName)}/${encodeURIComponent(locale)}`;
};
import { useEffect, useCallback, useState } from "react";
import { GTContext } from "../ClientProvider";
import getBrowserLocale from "./getBrowserLocale";
import { isSameLanguage } from "generaltranslation";
import defaultGTProps from "../../types/defaultGTProps";
export default function GTClientProvider(_a) {
    var _b;
    var { children, projectID, dictionary = defaultGTProps.dictionary, dictionaryName = defaultGTProps.dictionaryName, approvedLocales, defaultLocale = (_b = approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) !== null && _b !== void 0 ? _b : defaultGTProps.defaultLocale, locale = getBrowserLocale(defaultLocale), remoteSource = defaultGTProps.remoteSource, cacheURL = defaultGTProps.cacheURL } = _a;
    const [translations, setTranslations] = useState(dictionary);
    if (!projectID && remoteSource && cacheURL === defaultGTProps.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
    }
    const [retrieved, setRetrieved] = useState(isSameLanguage(locale, defaultLocale));
    useEffect(() => {
        if (!retrieved) {
            const fetchCachedTranslations = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(`${cacheURL}/${projectID}/${getDictionaryReference(locale, dictionaryName)}`);
                    const result = yield response.json();
                    if (Object.keys(result).length) {
                        // reconcile result with existing dictionary
                        const renderedTranslations = result;
                        setTranslations(renderedTranslations);
                    }
                }
                catch (error) {
                    console.error('Remote dictionary error:', error);
                }
                setRetrieved(true);
            });
            fetchCachedTranslations();
        }
    }, [cacheURL, remoteSource, locale]);
    const translate = useCallback((id) => {
        return translations[id];
    }, [translations]);
    return (_jsx(GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: retrieved
            ? children : undefined }));
}
//# sourceMappingURL=GTClientProvider.js.map