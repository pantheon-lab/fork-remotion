"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SplitterContext_1 = require("./SplitterContext");
const SplitterElement = ({ children, type }) => {
    const context = (0, react_1.useContext)(SplitterContext_1.SplitterContext);
    const style = (0, react_1.useMemo)(() => {
        return {
            flex: 
            // Multiply by 1000 because if flex values don't add up to at least 1, they will not fill up the screen
            (type === 'flexer' ? context.flexValue : 1 - context.flexValue) * 1000,
            display: 'flex',
            position: 'relative',
        };
    }, [context.flexValue, type]);
    return (0, jsx_runtime_1.jsx)("div", { style: style, children: children });
};
exports.SplitterElement = SplitterElement;
