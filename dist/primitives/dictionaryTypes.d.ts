export type AtPath<T, P extends string> = P extends '' ? T : P extends `${infer K}.${infer Rest}` ? K extends keyof T ? AtPath<T[K], Rest> : any : P extends keyof T ? T[P] : any;
export type LeafPaths<T> = T extends object ? {
    [K in keyof T & string]: T[K] extends string ? K : T[K] extends object ? `${K}.${LeafPaths<T[K]>}` : never;
}[keyof T & string] : '';
export type NonLeafPaths<T> = T extends object ? '' | {
    [K in keyof T & string]: T[K] extends object ? K | `${K}.${NonLeafPaths<T[K]>}` : never;
}[keyof T & string] : never;
//# sourceMappingURL=dictionaryTypes.d.ts.map