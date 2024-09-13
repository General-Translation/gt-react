type VariableObject = {
    key: string;
    variable?: "variable" | "number" | "datetime" | "currency";
};
export default function isVariableObject(obj: unknown): obj is VariableObject;
export {};
//# sourceMappingURL=isVariableObject.d.ts.map