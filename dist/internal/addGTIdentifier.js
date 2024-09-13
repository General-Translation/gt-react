"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addGTIdentifier;
var react_1 = __importStar(require("react"));
var acceptedPluralProps = {
    "singular": true, "dual": true, "plural": true,
    "zero": true, "one": true, "two": true, "few": true, "many": true, "other": true
};
function addIdentifierRecursively(children, dictionaryID) {
    // Object to keep track of the current index for GT IDs
    var indexObject = { index: 0 };
    /**
     * Function to create a GTProp object for a ReactElement
     * @param child - The ReactElement for which the GTProp is created
     * @returns - The GTProp object
     */
    var createGTProp = function (child) {
        var type = child.type;
        indexObject.index += 1;
        var result = { id: indexObject.index };
        var transformation = typeof type === 'function' ? (type.gtTransformation || '') : '';
        if (transformation) {
            var transformationParts = transformation.split('-');
            if (transformationParts[0] === "variable") {
                result.variableType = (transformationParts === null || transformationParts === void 0 ? void 0 : transformationParts[1]) || "variable";
            }
            result.transformation = transformationParts[0];
        }
        return result;
    };
    function handleSingleChild(child) {
        if ((0, react_1.isValidElement)(child)) {
            var props = child.props;
            // Create new props for the element, including the GT identifier and a key
            var generaltranslation = createGTProp(child);
            var newProps = __assign(__assign({}, props), { 'data-generaltranslation': generaltranslation });
            if (dictionaryID) {
                newProps.key = dictionaryID;
                dictionaryID = undefined;
            }
            // Recursively add IDs to children
            if (props.children) {
                newProps.children = handleChildren(props.children);
            }
            return react_1.default.cloneElement(child, newProps);
        }
        return child;
    }
    function handleChildren(children) {
        if (Array.isArray(children)) {
            dictionaryID = undefined;
            return react_1.default.Children.map(children, handleSingleChild);
        }
        else {
            return handleSingleChild(children);
        }
    }
    return handleChildren(children);
}
function addGTIdentifier(children, branches, dictionaryID) {
    var taggedChildren = addIdentifierRecursively(children, dictionaryID);
    if (typeof branches === 'undefined') {
        return taggedChildren;
    }
    var pluralBranches = Object.entries(branches).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        if (acceptedPluralProps[key]) {
            acc[key] = addIdentifierRecursively(value, dictionaryID); // process!
        }
        return acc;
    }, {});
    // check that work has actually been done, if not just return the default children
    if (!Object.keys(pluralBranches).length)
        return taggedChildren;
    return react_1.default.createElement('span', { 'data-generaltranslation': { id: 0, branches: pluralBranches, transformation: 'plural' }, children: taggedChildren });
    ;
}
//# sourceMappingURL=addGTIdentifier.js.map