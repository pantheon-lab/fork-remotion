"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const colors_1 = require("../../../editor/helpers/colors");
const button = {
    border: `1px solid ${colors_1.INPUT_BORDER_COLOR_UNHOVERED}`,
    borderRadius: 4,
    backgroundColor: colors_1.INPUT_BACKGROUND,
    appearance: 'none',
    fontFamily: 'inherit',
    fontSize: 14,
    color: 'white',
    flexDirection: 'row',
};
const buttonContainer = {
    padding: 10,
    cursor: 'pointer',
    fontSize: 14,
};
const Button = ({ children, onClick, disabled }) => {
    return ((0, jsx_runtime_1.jsx)("button", { style: button, type: "button", disabled: disabled, onClick: onClick, children: (0, jsx_runtime_1.jsx)("div", { style: buttonContainer, children: children }) }));
};
exports.Button = Button;
