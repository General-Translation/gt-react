export default function getGTProp(child) {
    if (child && child.props && child.props['data-generaltranslation']) {
        return child.props['data-generaltranslation'];
    }
    return null;
}
//# sourceMappingURL=getGTProp.js.map