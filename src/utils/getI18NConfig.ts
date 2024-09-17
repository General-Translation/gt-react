import I18NConfiguration from "../config/I18NConfiguration";

export default function getI18NConfig(): I18NConfiguration {
    if (!globalThis && !global) {
        throw new Error('Unable to access globalThis for gt-next.')
    }
    const I18NConfig = (
        globalThis as any
    )?.__GENERALTRANSLATION__ || (
        global as any
    )?.__GENERALTRANSLATION__;
    if (!I18NConfig) {
        throw new Error('Unable to access gt-next configuration.')
    }
    return I18NConfig;
}