export default async function Resolver({
    children, fallback
}: { children: any, fallback: any }) {
    try {
        const resolved = await Promise.resolve(children);
        return resolved;
    } catch (error) {
        console.error(error);
        return fallback;
    }
}