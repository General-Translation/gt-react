import { tOptions } from "./createTFunction";

export default function createGetGTFunction(t: (id: string, options?: tOptions) => Promise<string> | JSX.Element) {
    return (id?: string) => {
        let innerID = id;
        return innerID ? (id: string, options?: tOptions) => t(`${innerID}.${id}`, options) : t;
    }
}