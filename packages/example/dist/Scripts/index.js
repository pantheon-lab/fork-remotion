"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scripts = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
// Test of Devanagari script and emojis,
const Scripts = () => {
    return ((0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { style: {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
        }, children: (0, jsx_runtime_1.jsx)("h1", { children: "\u092A\u0942\u0930\u094D\u0935\u094B\u0924\u094D\u0924\u0930 \u092E\u0947\u0902 \u092C\u0940\u091C\u0947\u092A\u0940 \u0915\u093E \u092E\u091C\u092C\u0942\u0924 \u091A\u0947\u0939\u0930\u093E \uD83D\uDE01" }) }));
};
exports.Scripts = Scripts;
