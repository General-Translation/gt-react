export default function createNumericValueMarkerComponents() {
    const NumericMarker = ({ children }) => {
        return children;
    };
    NumericMarker.gtTransformation = "marker-numeric";
    const ValueMarker = ({ children }) => {
        return children;
    };
    ValueMarker.gtTransformation = "marker-numeric";
    return ({ NumericMarker, ValueMarker });
}
//# sourceMappingURL=createNumericValueMarkerComponents.js.map