"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeFrame = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const frame = {
    backgroundColor: '#070707',
    marginBottom: 20,
};
const lineNumber = {
    display: 'inline-block',
    whiteSpace: 'pre',
    backgroundColor: '#121212',
    paddingLeft: 10,
    paddingRight: 12,
    marginRight: 12,
};
const CodeFrame = ({ source, lineNumberWidth }) => {
    return ((0, jsx_runtime_1.jsx)("div", { style: frame, children: source.map((s, j) => {
            return ((0, jsx_runtime_1.jsxs)("div", { style: {
                    fontFamily: 'monospace',
                    whiteSpace: 'pre',
                    tabSize: 2,
                    color: s.highlight ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    lineHeight: 1.7,
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: lineNumber, children: String(s.lineNumber).padStart(lineNumberWidth, ' ') }), s.content] }, j));
        }) }));
};
exports.CodeFrame = CodeFrame;
