"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontDemo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const waitForFont = (0, remotion_1.delayRender)();
const font = new FontFace(`Bangers`, `url(${(0, remotion_1.staticFile)('bangers.woff2')}) format('woff2')`);
font
    .load()
    .then(() => {
    document.fonts.add(font);
    (0, remotion_1.continueRender)(waitForFont);
})
    .catch((err) => console.log('Error loading font', err));
const FontDemo = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { style: {
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Bangers',
            fontSize: 300,
        }, children: (0, jsx_runtime_1.jsx)("h1", { children: "Font Demo" }) }));
};
exports.FontDemo = FontDemo;
