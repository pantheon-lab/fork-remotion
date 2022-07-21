"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const Title = ({ line1, line2 }) => {
    const { fps } = (0, remotion_1.useVideoConfig)();
    const frame = (0, remotion_1.useCurrentFrame)();
    const springConfig = {
        damping: 10,
        mass: 0.1,
        stiffness: 100,
        overshootClamping: false,
    };
    const firstWord = (0, remotion_1.spring)({
        config: springConfig,
        from: 0,
        to: 1,
        fps,
        frame,
    });
    const secondWord = (0, remotion_1.spring)({
        config: springConfig,
        frame: Math.max(0, frame - 5),
        from: 0,
        to: 1,
        fps,
    });
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            backgroundColor: 'white',
            textAlign: 'center',
        }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                fontSize: 110,
                fontWeight: 'bold',
                fontFamily: 'SF Pro Text',
            }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                        display: 'inline-block',
                        transform: `scale(${firstWord})`,
                    }, children: line1 }), (0, jsx_runtime_1.jsxs)("span", { style: { transform: `scale(${secondWord})`, display: 'inline-block' }, children: [' ', line2] })] }) }));
};
exports.Title = Title;
exports.default = exports.Title;
