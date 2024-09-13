import {
    useGT as getGT, 
    useDefaultLocale as getDefaultLocale, 
    useLocale as getLocale,
    Var, Num, Currency, DateTime
} from "gt-react";

const GTProvider = ({ ...props }: any) => {
    throw new Error(
        `You're attempting to import <GTProvider> on the client. `
        + `Are you sure you want to do this? It's better to import <GTProvider> in a file not marked 'use client' so that it can fetch translations on the server. `
        + `If you really need to put <GTProvider> on the client, import <GTClientProvider> from 'gt-next/client'.`
    )
}

export { 
    GTProvider, 
    getGT, 
    getDefaultLocale, getLocale,
    Var, Num, Currency, DateTime
}