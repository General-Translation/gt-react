'use client'

import { createContext, useContext } from "react";

type GTContextType = {
    [key: string]: any
}

export const GTContext = createContext<GTContextType | undefined>(undefined);

export default function useGTContext(errorString = 'useGTContext() must be used within a <GTProvider>!'): GTContextType {
    const context = useContext(GTContext);
    if (typeof context === 'undefined') {
        throw new Error(errorString);
    }
    return context;
};