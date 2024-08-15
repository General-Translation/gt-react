'use client'

import { ReactNode, useContext, useMemo } from "react";
import { GTContext } from "./ClientProvider";

const T = ({ children, id }: { children?: ReactNode, id: string }) => {
    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`<T>, with children:\n\n${children}\n\nid: ${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        return children;
    }
    const translation = useMemo(() => { return ctx?.translate(id) }, [children, id]);
    if (!translation) {
        console.warn(`<T>, with children:\n\n${children}\n\nid: ${id}\n\nNo translation found.`);
        return children;
    }
    return translation || children;
}

T.gtTransformation = 'translate'

export default T;