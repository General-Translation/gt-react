import { tOptions } from "./createTFunction";
export default function createGetGTFunction(t: (id: string, options?: tOptions) => Promise<string> | JSX.Element): (id?: string) => (id: string, options?: tOptions) => Promise<string> | JSX.Element;
//# sourceMappingURL=createGetGTFunction.d.ts.map