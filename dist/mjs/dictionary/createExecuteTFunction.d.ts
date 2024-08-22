import I18NConfiguration from "../config/I18NConfiguration";
export type tOptions = {
    n?: number;
    values?: Record<string, any>;
    [key: string]: any;
};
export default function createExecuteTFunction({ I18NConfig, T, intl }: {
    I18NConfig: I18NConfiguration;
    T: any;
    intl: any;
}): (dictionary: Record<string, any>, id: string, options?: tOptions) => JSX.Element | Promise<string>;
//# sourceMappingURL=createExecuteTFunction.d.ts.map