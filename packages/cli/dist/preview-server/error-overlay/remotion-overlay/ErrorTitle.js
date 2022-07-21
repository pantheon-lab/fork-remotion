"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_overlay_1 = require("../react-overlay");
const DismissButton_1 = require("./DismissButton");
const ErrorMessage_1 = require("./ErrorMessage");
const Symbolicating_1 = require("./Symbolicating");
const title = {
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
};
const left = {
    flex: 1,
    paddingRight: 14,
    fontWeight: 'bold',
    maxWidth: '100%',
};
const errName = {
    fontSize: 18,
    color: '#4290f5',
    display: 'inline-block',
};
const row = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
const spacer = {
    width: 5,
};
const ErrorTitle = ({ name, message, symbolicating }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: title, children: [(0, jsx_runtime_1.jsxs)("div", { style: left, children: [(0, jsx_runtime_1.jsx)("span", { style: errName, children: name }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { style: row, children: [symbolicating ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Symbolicating_1.Symbolicating, {}), (0, jsx_runtime_1.jsx)("div", { style: spacer })] })) : null, (0, jsx_runtime_1.jsx)(ErrorMessage_1.ErrorMessage, { message: message })] })] }), (0, react_overlay_1.didUnmountReactApp)() ? null : (0, jsx_runtime_1.jsx)(DismissButton_1.DismissButton, {})] }));
};
exports.ErrorTitle = ErrorTitle;
