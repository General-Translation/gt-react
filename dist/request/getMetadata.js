"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getMetadata;
var getNextDomain_1 = require("../next/getNextDomain");
var getMetadataFunction;
function getMetadata() {
    var _a;
    if (getMetadataFunction)
        return getMetadataFunction();
    try {
        var customRequestConfig = require('gt-next/_request');
        var customGetMetadata = ((_a = customRequestConfig === null || customRequestConfig === void 0 ? void 0 : customRequestConfig.default) === null || _a === void 0 ? void 0 : _a.getMetadata) || customRequestConfig.getMetadata;
        var metadata = customGetMetadata();
        getMetadataFunction = customGetMetadata();
        return metadata;
    }
    catch (_b) {
        getMetadataFunction = function () {
            return {
                domain: (0, getNextDomain_1.getNextDomain)()
            };
        };
        return getMetadataFunction();
    }
    ;
}
//# sourceMappingURL=getMetadata.js.map