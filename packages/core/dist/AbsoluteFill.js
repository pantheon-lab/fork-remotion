"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsoluteFill = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * An absolutely positioned <div> element with 100% width, height, and a column flex style
 * @link https://www.remotion.dev/docs/absolute-fill
 */
const AbsoluteFill = (props) => {
    const { style, ...other } = props;
    const actualStyle = (0, react_1.useMemo)(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            ...style,
        };
    }, [style]);
    return (0, jsx_runtime_1.jsx)("div", { style: actualStyle, ...other });
};
exports.AbsoluteFill = AbsoluteFill;
