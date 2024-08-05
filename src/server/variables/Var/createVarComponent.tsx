import Var from "./Var";
export default function createVarComponent() {
    const VariableComponent = ({ ...props }) => {
        return <Var {...props} />;
    }
    VariableComponent.gtTransformation = "variable-variable";
    return VariableComponent;
};