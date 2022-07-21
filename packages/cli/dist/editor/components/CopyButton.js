"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../helpers/colors");
const copy_text_1 = require("../helpers/copy-text");
const layout_1 = require("./layout");
const iconStyle = {
    width: 16,
    height: 16,
    color: 'white',
};
const copyIcon = ((0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "far", "data-icon": "clipboard", className: "svg-inline--fa fa-clipboard fa-w-12", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", style: iconStyle, children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z" }) }));
const container = {
    padding: 10,
    cursor: 'pointer',
    fontSize: 14,
};
const button = {
    border: `1px solid ${colors_1.INPUT_BORDER_COLOR_UNHOVERED}`,
    borderRadius: 4,
    backgroundColor: colors_1.INPUT_BACKGROUND,
    appearance: 'none',
    fontFamily: 'inherit',
    fontSize: 14,
    color: 'white',
};
const labelStyle = {
    fontSize: 14,
};
const CopyButton = ({ textToCopy, label, labelWhenCopied }) => {
    const [copied, setCopied] = (0, react_1.useState)(false);
    const onClick = (0, react_1.useCallback)(() => {
        (0, copy_text_1.copyText)(textToCopy);
        setCopied(Date.now());
    }, [textToCopy]);
    (0, react_1.useEffect)(() => {
        if (!copied) {
            return;
        }
        const to = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(to);
    }, [copied]);
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, style: button, type: "button", children: (0, jsx_runtime_1.jsxs)(layout_1.Row, { style: container, children: [copyIcon, (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1.5 }), ' ', (0, jsx_runtime_1.jsx)("span", { style: labelStyle, children: copied ? labelWhenCopied : label })] }) }));
};
exports.CopyButton = CopyButton;
