export default function getVariableProps(props: {
    'data-generaltranslation': {
        transformation: "variable";
        [key: string]: any;
    };
    [key: string]: any;
}): {
    variableName: string;
    variableType: string;
    variableValue?: any;
    variableOptions?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
};
//# sourceMappingURL=getVariableProps.d.ts.map