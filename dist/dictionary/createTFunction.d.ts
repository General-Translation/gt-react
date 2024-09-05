import I18NConfiguration from "../config/I18NConfiguration";
export type tOptions = {
    [key: string]: any;
};
export default function createTFunction(I18NConfig: I18NConfiguration, T: any, translate: any, dictionary?: Record<string, any>): (id: string, options?: tOptions, f?: Function) => JSX.Element | Promise<string>;
//# sourceMappingURL=createTFunction.d.ts.map