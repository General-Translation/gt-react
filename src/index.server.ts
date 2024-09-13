import Var from './variables/Var'
import Num from './variables/Num'
import Currency from './variables/Currency'
import DateTime from './variables/DateTime'
import getI18NConfig from './utils/getI18NConfig'
import getLocale from './request/getLocale'
import getGT from './server/getGT'
import GTProvider from './provider/GTServerProvider'

const getDefaultLocale = () => {
    getI18NConfig().getDefaultLocale();
}

export {
    getGT, GTProvider,
    getLocale, 
    getDefaultLocale,
    Var, Num, Currency, DateTime
}