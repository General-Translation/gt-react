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
import React, { useEffect, useCallback, useState, useMemo } from "react";
import { GTContext } from "../ClientProvider";
import defaultGTProps from "../../types/defaultGTProps";
import useBrowserLocale from "../hooks/useBrowserLocale";
import { isSameLanguage } from "generaltranslation";
import getRenderAttributes from "../../primitives/rendering/getRenderAttributes";
import renderDefaultLanguage from "../helpers/renderDefaultLanguage";
import getDictionaryReference from "../../primitives/dictionary/getDictionaryReference";
import renderClientChildren from "../helpers/renderClientChildren";
import getEntryTranslationType from "../../primitives/rendering/getEntryTranslationType";
import getEntryMetadata from "../../primitives/rendering/getEntryMetadata";
import ClientPlural from "../plural/ClientPlural";
import addGTIdentifier from "../../index/addGTIdentifier";
export default function GTClientProvider(_a) {
    var _b;
    var { children, projectID, dictionary = defaultGTProps.dictionary, dictionaryName = defaultGTProps.dictionaryName, approvedLocales, defaultLocale = (_b = approvedLocales === null || approvedLocales === void 0 ? void 0 : approvedLocales[0]) !== null && _b !== void 0 ? _b : defaultGTProps.defaultLocale, locale = '', remoteSource = defaultGTProps.remoteSource, cacheURL = defaultGTProps.cacheURL, translations } = _a;
    if (!projectID && remoteSource && cacheURL === defaultGTProps.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
    }
    const browserLocale = useBrowserLocale(defaultLocale);
    locale = locale || browserLocale;
    const [loaded, setLoaded] = useState({
        local: false,
        remote: false
    });
    const translationRequired = isSameLanguage(locale, defaultLocale) ? false : true;
    const suppliedDictionary = useMemo(() => {
        if (!translationRequired)
            return dictionary;
        let processedDictionary = {};
        for (const id of Object.keys(dictionary)) {
            let { entry, metadata } = getEntryMetadata(dictionary[id]);
            const translationType = getEntryTranslationType(dictionary[id]);
            if (translationType === "t") {
                entry = _jsx(React.Fragment, { children: entry }, id);
            }
            else if (translationType === "plural") {
                entry = (_jsx(ClientPlural, Object.assign({ n: 1 }, metadata, { children: entry }), id));
            }
            const taggedEntry = addGTIdentifier(entry);
            if (translationType === "t" || translationType === "plural") {
                processedDictionary[id] = taggedEntry;
            }
            ;
        }
        return processedDictionary;
    }, [dictionary, translationRequired]);
    const [localDictionary, setLocalDictionary] = useState(null);
    useEffect(() => {
        if (locale) {
            if (translations && translations[locale] && translationRequired) {
                translations[locale]().then(setLocalDictionary).then(() => setLoaded(prev => (Object.assign(Object.assign({}, prev), { local: true }))));
            }
            else {
                setLoaded(prev => (Object.assign(Object.assign({}, prev), { local: true })));
            }
        }
    }, [translations, locale]);
    const [remoteTranslations, setRemoteTranslations] = useState(null);
    useEffect(() => {
        if (locale) {
            if (remoteSource && translationRequired) {
                const fetchRemoteTranslations = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield fetch(`${cacheURL}/${projectID}/${getDictionaryReference(locale, dictionaryName)}`);
                        const result = yield response.json();
                        if (Object.keys(result).length) {
                            setRemoteTranslations(result);
                        }
                        else {
                            throw new Error(`No dictionary found in remote cache.`);
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                    finally {
                        setLoaded(prev => (Object.assign(Object.assign({}, prev), { remote: true })));
                    }
                });
                fetchRemoteTranslations();
            }
            else {
                setLoaded(prev => (Object.assign(Object.assign({}, prev), { remote: true })));
            }
        }
    }, [cacheURL, remoteSource, locale]);
    const renderAttributes = getRenderAttributes({ locale });
    const translate = useCallback((id, options) => {
        const { n, values } = options || {};
        const variables = Object.assign(Object.assign({}, (typeof n === 'number' && { n })), (values && Object.assign({}, values)));
        if (translationRequired) {
            if (localDictionary && localDictionary[id]) {
                return renderDefaultLanguage(Object.assign({ source: localDictionary[id], variables, id,
                    renderAttributes }, options));
            }
            if (remoteTranslations && remoteTranslations[id] && remoteTranslations[id].t) {
                return renderClientChildren({
                    source: suppliedDictionary[id],
                    target: remoteTranslations[id].t,
                    locale, defaultLocale,
                    renderAttributes: getRenderAttributes({ locale }),
                    id, variables
                });
            }
        }
        else {
            return renderDefaultLanguage(Object.assign({ source: suppliedDictionary[id], variables, id }, options));
        }
    }, [suppliedDictionary, translations, translationRequired, remoteTranslations]);
    return (_jsx(GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: Object.values(loaded).every(item => item ? true : false) &&
            children }));
}
//# sourceMappingURL=GTClientProvider.js.map