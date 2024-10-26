import { createContext, useContext } from "react";
export var GTContext = createContext(undefined);
export default function useGTContext(errorString) {
    if (errorString === void 0) { errorString = 'useGTContext() must be used within a <GTProvider>!'; }
    var context = useContext(GTContext);
    if (typeof context === 'undefined') {
        throw new Error(errorString);
    }
    return context;
}
;
//# sourceMappingURL=GTContext.js.map