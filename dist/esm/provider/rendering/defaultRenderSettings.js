export var defaultRenderSettings = {
    method: "default",
    timeout: (function () {
        var NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : '';
        return NODE_ENV === "development" || NODE_ENV === "test";
    })() ? null : 8000
};
//# sourceMappingURL=defaultRenderSettings.js.map