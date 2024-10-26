export default function isVariableObject(obj) {
    if (obj && typeof obj === 'object' && typeof obj.key === 'string') {
        var keys = Object.keys(obj);
        if (keys.length === 1)
            return true;
        if (keys.length === 2) {
            var variableObj = obj;
            return (typeof variableObj.variable === 'string') &&
                ["variable", "number", "date", "currency"].includes(variableObj.variable);
        }
    }
    return false;
}
//# sourceMappingURL=isVariableObject.js.map