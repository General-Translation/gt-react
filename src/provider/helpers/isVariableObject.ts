import { VariableObject } from "generaltranslation/dist/types/types";

export default function isVariableObject(obj: unknown): obj is VariableObject {
    if (obj && typeof obj === 'object' && typeof (obj as VariableObject).key === 'string') {
        const keys = Object.keys(obj);
        if (keys.length === 1) return true;
        if (keys.length === 2) {
            const variableObj = (obj as VariableObject);
            return (typeof variableObj.variable === 'string') && 
                ["variable", "number", "date", "currency"].includes(variableObj.variable)
        }
        
    }
   return false;
}