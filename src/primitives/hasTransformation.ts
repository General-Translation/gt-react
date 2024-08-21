import React, { ReactNode } from "react";

export default function hasTransformation(entry: ReactNode): boolean {
    if (React.isValidElement(entry)) {
        const { type } = entry;
        const transformation: string = typeof type === 'function' ? ((type as any)?.gtTransformation || '') : '';
        return transformation ? true : false;
    }
    return false;
}