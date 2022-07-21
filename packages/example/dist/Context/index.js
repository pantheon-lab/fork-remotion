"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedInContext = exports.MyCtx = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
exports.MyCtx = (0, react_1.createContext)({
    hi: () => {
        throw new Error('context not provided');
    },
});
const WrappedInContext = () => {
    const value = (0, react_1.useContext)(exports.MyCtx);
    return (0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { children: value.hi() });
};
exports.WrappedInContext = WrappedInContext;
