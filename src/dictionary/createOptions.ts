export default function createOptions(options?: Record<string, any>) {
    let result: {
        values?: {
            [key: string]: any,
            n?: number
        }
        [key: string]: any,
    } = {};
    if (options && typeof options === 'object' && Object.keys(options).length > 0) {
        result.values = { ...options };
    }
    return result;
}