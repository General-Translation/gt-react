import I18NConfiguration from "../../config/I18NConfiguration";
export default function createIntlFunction({ I18NConfig, ...defaultOptions }: {
    I18NConfig: I18NConfiguration;
    [key: string]: any;
}): (content: string, options?: Record<string, any>) => Promise<string>;
//# sourceMappingURL=createIntlFunction.d.ts.map