"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardShortcuts = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const keys_1 = require("../icons/keys");
const modals_1 = require("../state/modals");
const layout_1 = require("./layout");
const ModalContainer_1 = require("./ModalContainer");
const ModalHeader_1 = require("./ModalHeader");
const left = {
    width: 100,
    paddingTop: 8,
    paddingBottom: 8,
};
const shortLeft = {
    ...left,
    width: 40,
};
const key = {
    background: '#333',
    padding: '3px 6px',
    color: 'white',
    borderRadius: 3,
    border: '1px solid black',
    borderBottomWidth: 3,
    fontSize: 13,
    fontFamily: 'monospace',
};
const right = {
    fontSize: 14,
    color: '#eee',
};
const container = {
    paddingLeft: 20,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
};
const title = {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
};
const KeyboardShortcuts = () => {
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const onQuit = (0, react_1.useCallback)(() => {
        setSelectedModal(null);
    }, [setSelectedModal]);
    return ((0, jsx_runtime_1.jsxs)(ModalContainer_1.ModalContainer, { onEscape: onQuit, onOutsideClick: onQuit, children: [(0, jsx_runtime_1.jsx)(ModalHeader_1.NewCompHeader, { title: "Keyboard shortcuts" }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { style: container, children: [(0, jsx_runtime_1.jsxs)(layout_1.Column, { children: [(0, jsx_runtime_1.jsx)("div", { style: title, children: "Playback" }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsxs)("div", { style: left, children: [(0, jsx_runtime_1.jsx)("kbd", { style: key, children: (0, jsx_runtime_1.jsx)(keys_1.ShiftIcon, {}) }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.3 }), (0, jsx_runtime_1.jsx)("kbd", { style: key, children: (0, jsx_runtime_1.jsx)(keys_1.ArrowLeft, {}) })] }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "1 second back" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: (0, jsx_runtime_1.jsx)(keys_1.ArrowLeft, {}) }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Previous frame" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "Space" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Play / Pause" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: (0, jsx_runtime_1.jsx)(keys_1.ArrowRight, {}) }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Next frame" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsxs)("div", { style: left, children: [(0, jsx_runtime_1.jsx)("kbd", { style: key, children: (0, jsx_runtime_1.jsx)(keys_1.ShiftIcon, {}) }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.3 }), (0, jsx_runtime_1.jsx)("kbd", { style: key, children: (0, jsx_runtime_1.jsx)(keys_1.ArrowRight, {}) })] }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "1 second forward" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "A" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Jump to beginning" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "E" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Jump to end" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "J" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Reverse playback" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "K" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Pause" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "L" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Play / Speed up" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: left, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "Enter" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Pause & return to playback start" })] })] }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 8 }), (0, jsx_runtime_1.jsxs)(layout_1.Column, { children: [(0, jsx_runtime_1.jsx)("div", { style: title, children: "Navigation" }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: shortLeft, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "N" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "New composition" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: shortLeft, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "T" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Toggle checkerboard transparency" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: shortLeft, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "?" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Show keyboard shortcuts" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { style: title, children: "Playback range" }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: shortLeft, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "I" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Set In Point" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: shortLeft, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "O" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Set Out Point" })] }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: shortLeft, children: (0, jsx_runtime_1.jsx)("kbd", { style: key, children: "X" }) }), (0, jsx_runtime_1.jsx)("div", { style: right, children: "Clear In/Out Points" })] })] })] })] }));
};
exports.KeyboardShortcuts = KeyboardShortcuts;
