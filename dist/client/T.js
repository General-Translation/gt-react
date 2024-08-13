'use client';
import { useContext, useMemo } from "react";
import { GTContext } from "./ClientProvider";
export default function T({ children, id }) {
    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`<T>, with children:\n\n${children}\n\nid: ${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        return children;
    }
    const translation = useMemo(() => { return ctx === null || ctx === void 0 ? void 0 : ctx.translate(id); }, [children, id]);
    if (!translation) {
        console.warn(`<T>, with children:\n\n${children}\n\nid: ${id}\n\nNo translation found.`);
        return children;
    }
    return translation || children;
}
//# sourceMappingURL=T.js.map