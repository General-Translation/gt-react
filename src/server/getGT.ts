import createServerTFunction from "./createServerTFunction"

export default function getGT(id?: string) {
    return createServerTFunction(id);
}