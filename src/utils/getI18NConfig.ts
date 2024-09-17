import I18NConfiguration from "../config/I18NConfiguration";

export default function getI18NConfig(): I18NConfiguration {
    if (!(
        globalThis as any
    ).__GENERALTRANSLATION__) {
        throw new Error(`Unable to access gt-next configuration.`)
    }
    return (
        globalThis as any
    ).__GENERALTRANSLATION__
}