export default function createOptions(options, metadata) {
    let result = Object.assign({}, metadata);
    if (options && typeof options === 'object' && Object.keys(options).length > 0) {
        result.variables = Object.assign({}, options);
    }
    return result;
}
//# sourceMappingURL=createOptions.js.map