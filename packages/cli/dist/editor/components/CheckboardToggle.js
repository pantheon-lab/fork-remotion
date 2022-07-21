"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboardToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const checkerboard_1 = require("../state/checkerboard");
const ControlButton_1 = require("./ControlButton");
const accessibilityLabel = 'Show transparency as checkerboard (T)';
const CheckboardToggle = () => {
    const { checkerboard, setCheckerboard } = (0, react_1.useContext)(checkerboard_1.CheckerboardContext);
    const onClick = (0, react_1.useCallback)(() => {
        setCheckerboard((c) => {
            return !c;
        });
    }, [setCheckerboard]);
    return ((0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { title: accessibilityLabel, "aria-label": accessibilityLabel, onClick: onClick, children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "game-board-alt", className: "svg-inline--fa fa-game-board-alt fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", style: { width: 16, height: 16 }, children: (0, jsx_runtime_1.jsx)("path", { fill: checkerboard ? 'var(--blue)' : 'white', d: "M480 0H32A32 32 0 0 0 0 32v448a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zm-32 256H256v192H64V256h192V64h192z" }) }) }));
};
exports.CheckboardToggle = CheckboardToggle;
