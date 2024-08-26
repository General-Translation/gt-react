export default function createOptions(options) {
    let result = {};
    if (options && typeof options === 'object' && Object.keys(options).length > 0) {
        result.values = Object.assign({}, options);
    }
    return result;
}
//# sourceMappingURL=createOptions.js.map