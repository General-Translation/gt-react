import React, { ReactNode } from "react";
/**
 * renderAdaptiveSkeleton is a function that handles the rendering behavior for the adaptive-skeleton loading method.
 * It replaces all non-whitespace with non-linebreaking spaces.
 * @param children the children react node to be rendered
 * @param variables the variables to be used in the rendering
 * @param variablesOptions the options for the variables
 * @param defaultLocale the default locale to be used
 * @returns
 */
export default function renderAdaptiveSkeleton({ children, variables, variablesOptions, defaultLocale, renderVariable }: {
    children: ReactNode;
    variables?: Record<string, any>;
    variablesOptions?: Record<string, any>;
    defaultLocale: string;
    renderVariable: ({ variableType, variableName, variableValue, variableOptions }: {
        variableType: "variable" | "number" | "datetime" | "currency";
        variableName: string;
        variableValue: any;
        variableOptions: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
        locales: string[];
    }) => React.JSX.Element;
}): React.ReactNode;
//# sourceMappingURL=renderAdaptiveSkeleton.d.ts.map