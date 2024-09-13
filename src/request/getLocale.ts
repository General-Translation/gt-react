import getI18NConfig from "../utils/getI18NConfig";
import { getNextLocale } from "../next/getNextLocale";

let getLocaleFunction: () => string;

export default function getLocale(): string {
    if (getLocaleFunction) return getLocaleFunction();
    try {
        const customRequestConfig = require('gt-next/_request');
        const customGetLocale = customRequestConfig?.default?.getLocale || customRequestConfig.getLocale;
        const locale = customGetLocale();
        getLocaleFunction = customGetLocale;
        return locale;
    } catch {
        const I18NConfig = getI18NConfig();
        getLocaleFunction = () => { return getNextLocale(
            I18NConfig.getDefaultLocale(), I18NConfig.getLocales()
        ) }
        return getLocaleFunction();
    };
        
}
