type TranslationType = {
    isFunction: true;
    type: "t" | "plural";
} | {
    isFunction: false;
    type: "t" | "plural" | "string";
};
export default function getEntryTranslationType(entry: any): TranslationType;
export {};
//# sourceMappingURL=getEntryTranslationType.d.ts.map