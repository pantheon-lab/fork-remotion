"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspenseLoader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const Unblocker = () => {
    const [handle] = (0, react_1.useState)(() => (0, remotion_1.delayRender)(`Waiting for <Suspense /> of <ThreeCanvas /> to resolve`));
    (0, react_1.useEffect)(() => {
        return () => {
            (0, remotion_1.continueRender)(handle);
        };
    }, [handle]);
    return null;
};
const SuspenseLoader = ({ children }) => {
    return (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(Unblocker, {}), children: children });
};
exports.SuspenseLoader = SuspenseLoader;
