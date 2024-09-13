export default function getVariableProps(props: {
    'data-generaltranslation': {
        transformation: "variable";
        [key: string]: any;
    };
    [key: string]: any;
}): {
    variableName: string;
    variableType: "number" | "variable" | "currency" | "datetime";
    variableValue?: any;
    variableOptions?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
};
//# sourceMappingURL=_getVariableProps.d.ts.map