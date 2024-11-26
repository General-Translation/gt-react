import { VariableObject } from "../../types/types";

export default function isVariableObject(obj: unknown): obj is VariableObject {
    const variableObj = (obj as VariableObject);
    if (variableObj && typeof variableObj === 'object' && typeof (variableObj as VariableObject).key === 'string') {
        const keys = Object.keys(variableObj);
        if (keys.length === 1) return true;
        if (keys.length === 2) {
            if (typeof variableObj.id === 'number') return true;
            if (typeof variableObj.variable === 'string') return true;
        }
        if (keys.length === 3) {
            if (
                typeof variableObj.variable === 'string' && 
                typeof variableObj.id === 'number'
            ) return true;
        }
    }
   return false;
}