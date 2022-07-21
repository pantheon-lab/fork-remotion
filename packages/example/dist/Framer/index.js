"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framer = exports.selectColor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
function selectColor(color, frame) {
    return Math.floor(((0, remotion_1.random)(`${color}-${frame}`) * 255) % 255);
}
exports.selectColor = selectColor;
const Framer = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const red = selectColor('red', frame);
    const green = selectColor('green', frame);
    const blue = selectColor('blue', frame);
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            flex: 1,
            borderTop: `100px solid rgb(${red}, ${green}, ${blue})`,
            paddingBottom: 100,
        }, children: (0, jsx_runtime_1.jsxs)("h1", { style: { fontSize: 120 }, children: [frame, " \uD83D\uDE01"] }) }));
};
exports.Framer = Framer;
