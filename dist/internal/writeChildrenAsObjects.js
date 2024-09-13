"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeChildrenAsObjects;
var react_1 = __importDefault(require("react"));
var _defaultVariableNames_1 = __importDefault(require("../variables/_defaultVariableNames"));
/**
 * Gets the tag name of a React element.
 * @param {ReactElement} child - The React element.
 * @returns {string} - The tag name of the React element.
 */
var getTagName = function (child) {
    var _a;
    if (!child)
        return '';
    var type = child.type, props = child.props;
    if (type && typeof type === 'function') {
        if ('displayName' in type && typeof type.displayName === 'string' && type.displayName)
            return type.displayName;
        if ('name' in type && typeof type.name === 'string' && type.name)
            return type.name;
    }
    if (type && typeof type === 'string')
        return type;
    if (props.href)
        return 'a';
    if ((_a = props['data-generaltranslation']) === null || _a === void 0 ? void 0 : _a.id)
        return "C".concat(props['data-generaltranslation'].id);
    return 'function';
};
var handleSingleChild = function (child) {
    if (react_1.default.isValidElement(child)) {
        var _a = child, type = _a.type, props = _a.props;
        var newProps = {};
        if (props['data-generaltranslation']) {
            var generaltranslation = props['data-generaltranslation'];
            if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "variable") {
                var variableName = props.name || _defaultVariableNames_1.default[generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.variableType] || "value";
                return { variable: generaltranslation.variableType || "variable", key: variableName };
            }
        }
        if (props.children) {
            newProps.children = handleChildren(props.children);
        }
        return {
            type: getTagName(child),
            props: newProps
        };
    }
    ;
    return child;
};
var handleChildren = function (children) {
    return Array.isArray(children) ? children.map(handleSingleChild) : handleSingleChild(children);
};
/**
 * Transforms children elements into objects, processing each child recursively if needed.
 * @param {Children} children - The children to process.
 * @returns {object} The processed children as objects.
*/
function writeChildrenAsObjects(children) {
    if (children && typeof children === 'object' && !children.type && children.t) {
        var result_1 = {};
        Object.entries(children).forEach(function (_a) {
            var branchName = _a[0], branch = _a[1];
            result_1[branchName] = handleChildren(branch);
        });
        return result_1;
    }
    return handleChildren(children);
}
//# sourceMappingURL=writeChildrenAsObjects.js.map