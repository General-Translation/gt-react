import I18NConfiguration from "../config/I18NConfiguration";
export default function createTFunction({ I18NConfig, I18N, intl }: {
    I18NConfig: I18NConfiguration;
    I18N: any;
    intl: any;
}): (id: string, options?: Record<string, any>) => JSX.Element | Promise<string>;
//# sourceMappingURL=createTFunction.d.ts.map