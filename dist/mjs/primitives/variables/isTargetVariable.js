export default function isTargetVariable(target) {
    if (typeof target.key === 'string') {
        if (typeof target === 'object' && target && typeof target.variable === 'string') {
            return ["variable", "number", "date", "currency"].includes(target.variable);
        }
    }
    return false;
}
//# sourceMappingURL=isTargetVariable.js.map