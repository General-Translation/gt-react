import I18NConfiguration from "../config/I18NConfiguration";

export default function getI18NConfig(): I18NConfiguration {
    return (
        globalThis as any
    ).__GENERALTRANSLATION__
}