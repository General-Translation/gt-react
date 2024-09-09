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
exports.default = addGTIdentifier;
var react_1 = __importDefault(require("react"));
var acceptedPluralProps = {
    "singular": true, "dual": true, "plural": true,
    "zero": true, "one": true, "two": true, "few": true, "many": true, "other": true
};
/**
 * Helper function to validate the properties of the component to prevent nested translations
 * @param props - The properties of the current React element
 */
var validateChild = function (child) {
    var _a;
    var type = child.type, props = child.props;
    // check that 
    if (((type === null || type === void 0 ? void 0 : type.$$typeof) === Symbol.for('react.lazy'))) {
        (_a = type === null || type === void 0 ? void 0 : type._payload) === null || _a === void 0 ? void 0 : _a.then(function (result) {
            if (result.gtTransformation) {
                throw new Error("You can't use client-side gt-react variables like <".concat(result.name, "> in a server-side dictionary. Import createVariables() instead.\n\nIf you really, really want to use client-side gt-react components, mark your dictionary with 'use client'."));
            }
        });
    }
    if (props && props['data-generaltranslation'] && typeof props['data-generaltranslation'].id === 'number') {
        throw new Error("Nesting of <T>, <Plural>, <Value> components is not permitted. This prevents components from being translated twice!\n            Found nested component with id: ".concat(props === null || props === void 0 ? void 0 : props.id, ", content: ").concat(props === null || props === void 0 ? void 0 : props.children));
    }
};
/**
 * Add data-generaltranslation props, with identifiers, to React children
 * @param children - The children elements to which GT identifiers will be added
 * @returns - The children with added GT identifiers
 */
function addGTIdentifier(children) {
    // Object to keep track of the current index for GT IDs
    var indexObject = { index: 0 };
    /**
     * Function to create a GTProp object for a ReactElement
     * @param child - The ReactElement for which the GTProp is created
     * @returns - The GTProp object
     */
    var createGTProp = function (child) {
        var type = child.type, props = child.props;
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
    /**
     * Function to handle valid React elements and add GT identifiers
     * @param child - The ReactElement to handle
     * @returns - The new ReactElement with added GT identifiers
     */
    var handleValidReactElement = function (child) {
        // Validate the props to ensure there are no nested translations
        validateChild(child);
        // Destructure the props from the child element
        var props = child.props;
        // Create new props for the element, including the GT identifier and a key
        var generaltranslation = createGTProp(child);
        var newProps = __assign(__assign({}, props), { 'data-generaltranslation': generaltranslation });
        // If branches are needed for a number or value variable
        var transformation = generaltranslation.transformation;
        if (transformation === "plural") {
            // Updates indices to keep a consistent identification system across branches
            var frozenIndex_1 = indexObject.index;
            var championIndex_1 = indexObject.index;
            var updateIndices = function () {
                if (indexObject.index > frozenIndex_1) {
                    if (indexObject.index > championIndex_1) {
                        championIndex_1 = indexObject.index;
                    }
                    indexObject.index = frozenIndex_1;
                }
            };
            // Adds ID to children
            if (props.children) {
                newProps.children = addIdentifierRecursively(props.children);
            }
            // define branches
            var branches = {};
            // add identifier to number branches (e.g. singular, plural)
            if (transformation === "plural") {
                var n = props.n, children_1 = props.children, locales = props.locales, options = __rest(props, ["n", "children", "locales"]);
                for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
                    var option = _a[_i];
                    if (acceptedPluralProps[option] && options[option]) {
                        updateIndices();
                        branches[option] = addIdentifierRecursively(options[option]);
                    }
                }
                newProps = __assign(__assign({}, newProps), branches);
            }
            // modify newProps if necessary
            if (Object.keys(branches).length > 0)
                newProps['data-generaltranslation'].branches = branches;
            if (newProps.children)
                newProps['data-generaltranslation'].defaultChildren = newProps.children;
            // reset index
            indexObject.index = championIndex_1;
        }
        // if no transformation is required
        if (transformation !== "plural") {
            if (props.children) {
                newProps.children = addIdentifierRecursively(props.children);
            }
        }
        // return the element with new props
        return react_1.default.cloneElement(child, newProps);
    };
    /**
     * Function to handle a single child element and determine if it's a valid React element
     * @param child - The child element to handle
     * @returns - The handled child element
     */
    var handleSingleChild = function (child) {
        if (react_1.default.isValidElement(child))
            return handleValidReactElement(child);
        return child;
    };
    /**
     * Recursive function to add GT identifiers to all child elements
     * @param children - The children elements to process
     * @returns - The children elements with added GT identifiers
     */
    var addIdentifierRecursively = function (children) {
        if (Array.isArray(children)) {
            return children.map(function (child) { return handleSingleChild(child); });
        }
        return handleSingleChild(children);
    };
    return addIdentifierRecursively(children);
}
//# sourceMappingURL=addGTIdentifier.js.map