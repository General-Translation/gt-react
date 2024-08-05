import I18NConfiguration from "../config/I18NConfiguration";
export default function createTFunction({ I18NConfig, T, intl }: {
    I18NConfig: I18NConfiguration;
    T: any;
    intl: any;
}): (id: string, options?: Record<string, any>) => JSX.Element | Promise<string>;
//# sourceMappingURL=createTFunction.d.ts.map