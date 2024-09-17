import getConfig from 'next/config'

import I18NConfiguration from "../config/I18NConfiguration";

export default function getI18NConfig(): I18NConfiguration {
    const I18NConfig = getConfig()?.serverRuntimeConfig?.__GENERALTRANSLATION__;
    if (!I18NConfig) {
        throw new Error('Unable to access gt-next config. Ensure the plugin is installed correctly!')
    }
    return I18NConfig;
}