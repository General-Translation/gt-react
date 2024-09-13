export default function getGTProp(
    child: any
): { id: number, [key: string]: any } | null {
    if (child && typeof child === 'object' && child.props?.['data-generaltranslation']) {
        return child.props['data-generaltranslation'];
    } 
    return null;
}