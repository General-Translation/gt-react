import I18NConfiguration from "../config/I18NConfiguration";
export default function createTFunction({ I18NConfig, I18N }: {
    I18NConfig: I18NConfiguration;
    I18N: any;
}): (id: string, options?: Record<string, any>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=createTFunction.d.ts.map