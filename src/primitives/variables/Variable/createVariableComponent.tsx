import Variable from "./Variable";
export default function createVariableComponent() {
    const VariableComponent = ({ ...props }) => {
        return <Variable {...props} />;
    }
    VariableComponent.gtTransformation = "variable-variable";
    return VariableComponent;
};