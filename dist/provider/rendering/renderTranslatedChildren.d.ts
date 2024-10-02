import { ReactNode } from "react";
import { TranslatedChildren } from "../../primitives/types";
export declare function renderVariable({ variableType, variableName, variableValue, variableOptions }: {
    variableType: "variable" | "number" | "datetime" | "currency";
    variableName: string;
    variableValue: any;
    variableOptions: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
}): import("react/jsx-runtime").JSX.Element;
export default function renderTranslatedChildren({ source, target, variables, variablesOptions, locales }: {
    source: ReactNode;
    target: TranslatedChildren;
    variables?: Record<string, any>;
    variablesOptions?: Record<string, any>;
    locales: string[];
}): ReactNode;
//# sourceMappingURL=renderTranslatedChildren.d.ts.map