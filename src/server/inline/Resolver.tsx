export default async function Resolver({
    children, fallback
}: { children: any, fallback: any }) {
    try {
        return await children;
    } catch (error) {
        console.error(error);
        return fallback;
    }
}