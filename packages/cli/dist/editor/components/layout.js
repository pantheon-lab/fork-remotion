"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.Row = exports.Flex = exports.Spacing = exports.SPACING_UNIT = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.SPACING_UNIT = 8;
const Spacing = ({ x = 0, y = 0 }) => {
    const style = (0, react_1.useMemo)(() => {
        return {
            display: 'inline-block',
            width: x * exports.SPACING_UNIT,
            height: y * exports.SPACING_UNIT,
        };
    }, [x, y]);
    return (0, jsx_runtime_1.jsx)("div", { style: style });
};
exports.Spacing = Spacing;
const flex = { flex: 1 };
const Flex = ({ children }) => (0, jsx_runtime_1.jsx)("div", { style: flex, children: children });
exports.Flex = Flex;
const Row = ({ children, justify, className, align, style = {} }) => {
    const finalStyle = (0, react_1.useMemo)(() => {
        return {
            ...style,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: justify !== null && justify !== void 0 ? justify : 'flex-start',
            alignItems: align !== null && align !== void 0 ? align : 'flex-start',
        };
    }, [align, justify, style]);
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: finalStyle, children: children }));
};
exports.Row = Row;
const Column = ({ children, justify, className, align, style = {} }) => {
    const finalStyle = (0, react_1.useMemo)(() => {
        return {
            ...style,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: justify !== null && justify !== void 0 ? justify : 'flex-start',
            alignItems: align !== null && align !== void 0 ? align : 'flex-start',
        };
    }, [align, justify, style]);
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: finalStyle, children: children }));
};
exports.Column = Column;
