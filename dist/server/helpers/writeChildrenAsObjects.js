"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeChildrenAsObjects;
const react_1 = __importDefault(require("react"));
const processBranches_1 = __importDefault(require("../../primitives/value/processBranches"));
const defaultVariableNames_1 = __importDefault(require("../../primitives/helpers/defaultVariableNames"));
/**
 * Checks if the props indicate that the component should be not be processed.
 * @param {Record<string, any>} props - The props to check.
 * @returns {boolean} - True if the component is private, otherwise false.
 */
const isPrivate = (props) => { var _a; return ((_a = props['data-generaltranslation']) === null || _a === void 0 ? void 0 : _a.transformation) === "private"; };
/**
 * Gets the tag name of a React element.
 * @param {ReactElement} child - The React element.
 * @returns {string} - The tag name of the React element.
 */
const getTagName = (child) => {
    var _a;
    if (!child)
        return '';
    const { type, props } = child;
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
        return `C${props['data-generaltranslation'].id}`;
    return 'function';
};
/**
 * Handles processing of a valid React element, transforming its properties and children as needed.
 * @param {ReactElement} child - The React element to process.
 * @returns {object} - The processed element with its type and transformed props.
 */
const handleValidReactElement = (child) => {
    const { type, props } = child;
    let newProps = {};
    // Transform children if they exist and are not private
    if (props.children && !isPrivate(props)) {
        newProps.children = writeChildrenAsObjects(props.children);
    }
    // Write the branches of 'data-generaltranslation' as objects
    if (props['data-generaltranslation']) {
        const generaltranslation = props['data-generaltranslation'];
        let result = Object.assign({}, generaltranslation);
        if (generaltranslation.transformation && generaltranslation.transformation === "variable") {
            const variableName = props.name || defaultVariableNames_1.default[generaltranslation.variableType] || "value";
            return { variable: generaltranslation.variableType || "variable", key: variableName };
        }
        // Write all the branches as objects
        if (generaltranslation.transformation && generaltranslation.branches) {
            const transformation = generaltranslation.transformation;
            // Write the branches of a number variable transformation
            if (transformation === "numeric") {
                const _a = generaltranslation.branches, { ranges } = _a, others = __rest(_a, ["ranges"]);
                if (ranges) {
                    result.branches.ranges = ranges.map((range) => {
                        return { min: range.min, max: range.max, children: writeChildrenAsObjects(range.children) };
                    });
                }
                for (const option of Object.keys(others)) {
                    result.branches[option] = writeChildrenAsObjects(others[option]);
                }
            }
            // Write the branches of a value variable transformation
            else if (transformation === "value") {
                if (generaltranslation.branches) {
                    result.branches = (0, processBranches_1.default)(generaltranslation.branches, (branch) => writeChildrenAsObjects(branch));
                }
            }
            // Write defaultChildren
            if (generaltranslation.defaultChildren) {
                result.defaultChildren = writeChildrenAsObjects(generaltranslation.defaultChildren);
            }
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
const handleSingleChild = (child) => {
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
 * @returns {object} - The processed children as objects.
*/
function writeChildrenAsObjects(children) {
    if (Array.isArray(children)) {
        return children.map(child => handleSingleChild(child));
    }
    return handleSingleChild(children);
}
//# sourceMappingURL=writeChildrenAsObjects.js.map