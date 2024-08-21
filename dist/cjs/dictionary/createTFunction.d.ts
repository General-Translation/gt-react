import I18NConfiguration from "../config/I18NConfiguration";
export type tOptions = {
    n?: number;
    values?: Record<string, any>;
    [key: string]: any;
};
export default function createTFunction({ I18NConfig, T, intl }: {
    I18NConfig: I18NConfiguration;
    T: any;
    intl: any;
}): (id: string, options?: tOptions) => JSX.Element | Promise<string>;
//# sourceMappingURL=createTFunction.d.ts.map