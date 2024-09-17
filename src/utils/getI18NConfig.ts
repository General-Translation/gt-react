import I18NConfiguration from "../config/I18NConfiguration";

let I18NConfig: I18NConfiguration;

export default function getI18NConfig(): I18NConfiguration {
    if (I18NConfig) return I18NConfig;
    const I18NConfigParams = process.env._GENERALTRANSLATION_I18N_CONFIG_PARAMS;
    if (!I18NConfigParams) {
        throw new Error('Unable to access gt-next configuration.')
    }
    I18NConfig = new I18NConfiguration(JSON.parse(I18NConfigParams))
    return I18NConfig;
}