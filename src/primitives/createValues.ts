export default function createValues(n?: number, values?: Record<string, any>) {
    if (typeof n !== 'number') {
        if (!values || typeof values !== 'object') {
            return undefined;
        }
        return { ...values };
    }
    if (values && typeof values === 'object') {
        return { ...values, n };
    }
    return { n };
}