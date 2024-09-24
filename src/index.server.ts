import Var from './variables/Var'
import Num from './variables/Num'
import Currency from './variables/Currency'
import DateTime from './variables/DateTime'
import getI18NConfig from './utils/getI18NConfig'
import getLocale from './request/getLocale'
import getGT from './server/getGT'
import GTProvider from './provider/GTProvider'
import T from './server/inline/T'

/**
 * Gets the application's default locale. 
 * 
 * If no default locale is specified, it defaults to providing 'en'.
 *
 * @returns {string} The application's default locale, e.g., 'en-US'.
 *
 * @example
 * const locale = useDefaultLocale();
 * console.log(locale); // 'en-US'
*/
export function getDefaultLocale() {
    return getI18NConfig().getDefaultLocale();
}

export {
    getGT, GTProvider, T,
    getLocale, 
    Var, Num, Currency, DateTime
}