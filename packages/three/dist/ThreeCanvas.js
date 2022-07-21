"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeCanvas = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const fiber_1 = require("@react-three/fiber");
const react_1 = require("react");
const remotion_1 = require("remotion");
const SuspenseLoader_1 = require("./SuspenseLoader");
const Scale = ({ width, height }) => {
    const { set, setSize: threeSetSize } = (0, fiber_1.useThree)();
    const [setSize] = (0, react_1.useState)(() => threeSetSize);
    (0, react_1.useLayoutEffect)(() => {
        setSize(width, height);
        set({ setSize: () => null });
        return () => set({ setSize });
    }, [setSize, width, height, set]);
    return null;
};
const ThreeCanvas = (props) => {
    const { children, width, height, style, onCreated, ...rest } = props;
    const [waitForCreated] = (0, react_1.useState)(() => (0, remotion_1.delayRender)('Waiting for <ThreeCanvas/> to be created'));
    remotion_1.Internals.validateDimension(width, 'width', 'of the <ThreeCanvas /> component');
    remotion_1.Internals.validateDimension(height, 'height', 'of the <ThreeCanvas /> component');
    const contexts = remotion_1.Internals.useRemotionContexts();
    const actualStyle = {
        width: props.width,
        height: props.height,
        ...(style !== null && style !== void 0 ? style : {}),
    };
    const remotion_onCreated = (0, react_1.useCallback)((state) => {
        (0, remotion_1.continueRender)(waitForCreated);
        onCreated === null || onCreated === void 0 ? void 0 : onCreated(state);
    }, [onCreated, waitForCreated]);
    return ((0, jsx_runtime_1.jsx)(SuspenseLoader_1.SuspenseLoader, { children: (0, jsx_runtime_1.jsxs)(fiber_1.Canvas, { style: actualStyle, ...rest, onCreated: remotion_onCreated, children: [(0, jsx_runtime_1.jsx)(Scale, { width: width, height: height }), (0, jsx_runtime_1.jsx)(remotion_1.Internals.RemotionContextProvider, { contexts: contexts, children: children })] }) }));
};
exports.ThreeCanvas = ThreeCanvas;
