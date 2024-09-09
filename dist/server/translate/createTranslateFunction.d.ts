import I18NConfiguration from "../../config/I18NConfiguration";
export default function createTranslateFunction(I18NConfig: I18NConfiguration): <V extends Record<string, any>>(content: string, options?: {
    targetLanguage?: string;
    context?: string;
    [key: string]: any;
}, variables?: V, variableOptions?: { [key in keyof V]?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions; }) => Promise<string>;
//# sourceMappingURL=createTranslateFunction.d.ts.map