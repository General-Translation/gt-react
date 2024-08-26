import { jsx as _jsx } from "react/jsx-runtime";
import ClientVar from './ClientVar';
const Var = ({ children, name, defaultValue }) => {
    return _jsx(ClientVar, { children: children, name: name, defaultValue: defaultValue });
};
Var.gtTransformation = "variable-variable";
export default Var;
//# sourceMappingURL=Var.js.map