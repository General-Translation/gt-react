import I18NConfiguration from "../../config/I18NConfiguration";
export default function createTranslateFunction(I18NConfig: I18NConfiguration): (content: string, options?: {
    targetLanguage?: string;
    context?: string;
    [key: string]: any;
}) => Promise<string>;
//# sourceMappingURL=createTranslateFunction.d.ts.map