"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortcutHint = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cmdOrCtrlCharacter = window.navigator.platform.startsWith('Mac')
    ? '⌘'
    : 'Ctrl';
const container = {
    display: 'inline-block',
    marginLeft: 6,
    opacity: 0.6,
};
const ShortcutHint = ({ keyToPress, cmdOrCtrl }) => {
    return ((0, jsx_runtime_1.jsxs)("span", { style: container, children: [cmdOrCtrl ? `${cmdOrCtrlCharacter}+` : '', keyToPress.toUpperCase()] }));
};
exports.ShortcutHint = ShortcutHint;
