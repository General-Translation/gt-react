import { jsx as _jsx } from "react/jsx-runtime";
import Num from "../../variables/Num";
import Var from "../../variables/Var";
import Currency from "../../variables/Currency";
import DateTime from "../../variables/DateTime";
export default function renderVariable(_a) {
    var variableType = _a.variableType, variableName = _a.variableName, variableValue = _a.variableValue, variableOptions = _a.variableOptions;
    if (variableType === "number") {
        return (_jsx(Num, { name: variableName, value: variableValue, options: variableOptions }));
    }
    else if (variableType === "datetime") {
        return (_jsx(DateTime, { name: variableName, value: variableValue, options: variableOptions }));
    }
    else if (variableType === "currency") {
        return (_jsx(Currency, { name: variableName, value: variableValue, options: variableOptions }));
    }
    return (_jsx(Var, { name: variableName, value: variableValue }));
}
//# sourceMappingURL=renderVariable.js.map