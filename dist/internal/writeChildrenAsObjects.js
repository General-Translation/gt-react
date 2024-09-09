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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeChildrenAsObjects;
var react_1 = __importDefault(require("react"));
var defaultVariableNames_1 = __importDefault(require("../primitives/variables/defaultVariableNames"));
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
/**
 * Handles processing of a valid React element, transforming its properties and children as needed.
 * @param {ReactElement} child - The React element to process.
 * @returns {object} - The processed element with its type and transformed props.
 */
var handleValidReactElement = function (child) {
    var type = child.type, props = child.props;
    var newProps = {};
    // Transform children if they exist and are not private
    if (props.children) {
        newProps.children = writeChildrenAsObjects(props.children);
    }
    // Write the branches of 'data-generaltranslation' as objects
    if (props['data-generaltranslation']) {
        var generaltranslation = props['data-generaltranslation'];
        var result = __assign({}, generaltranslation);
        if (generaltranslation.transformation && generaltranslation.transformation === "variable") {
            var variableName = props.name || defaultVariableNames_1.default[generaltranslation.variableType] || "value";
            return { variable: generaltranslation.variableType || "variable", key: variableName };
        }
        // Write all the branches as objects
        if (generaltranslation.transformation && generaltranslation.branches) {
            var transformation = generaltranslation.transformation;
            // Write the branches of a number variable transformation
            if (transformation === "plural") {
                var branches = generaltranslation.branches;
                for (var _i = 0, _a = Object.keys(branches); _i < _a.length; _i++) {
                    var option = _a[_i];
                    result.branches[option] = writeChildrenAsObjects(branches[option]);
                }
            }
        }
        // Write defaultChildren
        if (generaltranslation.defaultChildren) {
            result.defaultChildren = writeChildrenAsObjects(generaltranslation.defaultChildren);
        }
        newProps['data-generaltranslation'] = result;
    }
    return {
        type: getTagName(child),
        props: newProps
    };
};
/**
 * Handles processing of a single child, determining if it is a valid React element or an object.
 * @param {any} child - The child to process.
 * @returns {object} - The processed child or the original child if no transformation is needed.
 */
var handleSingleChild = function (child) {
    if (react_1.default.isValidElement(child))
        return handleValidReactElement(child);
    else if (child && typeof child === 'object') {
        return { variable: true, keys: Object.keys(child) };
    }
    else
        return child;
};
/**
 * Transforms children elements into objects, processing each child recursively if needed.
 * @param {Children} children - The children to process.
 * @returns {object} The processed children as objects.
*/
function writeChildrenAsObjects(children) {
    if (Array.isArray(children)) {
        return children.map(function (child) { return handleSingleChild(child); });
    }
    return handleSingleChild(children);
}
//# sourceMappingURL=writeChildrenAsObjects.js.map