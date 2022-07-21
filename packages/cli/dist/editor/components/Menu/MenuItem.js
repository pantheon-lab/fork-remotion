"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const colors_1 = require("../../helpers/colors");
const z_index_1 = require("../../state/z-index");
const MenuContent_1 = require("../NewComposition/MenuContent");
const portals_1 = require("./portals");
const styles_1 = require("./styles");
const container = {
    fontSize: 13,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    cursor: 'default',
    paddingTop: 8,
    paddingBottom: 8,
    userSelect: 'none',
    border: 'none',
};
const MenuItem = ({ label: itemName, selected, id, onItemSelected, onItemHovered, onItemQuit, onPreviousMenu, onNextMenu, menu, }) => {
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const size = player_1.PlayerInternals.useElementSize(ref, {
        triggerOnWindowResize: true,
        shouldApplyCssTransforms: true,
    });
    const { tabIndex, currentZIndex } = (0, z_index_1.useZIndex)();
    const containerStyle = (0, react_1.useMemo)(() => {
        return {
            ...container,
            backgroundColor: (0, colors_1.getBackgroundFromHoverState)({
                hovered,
                selected,
            }),
        };
    }, [hovered, selected]);
    const portalStyle = (0, react_1.useMemo)(() => {
        if (!selected || !size) {
            return null;
        }
        return {
            ...styles_1.menuContainer,
            left: size.left,
            top: size.top + size.height,
        };
    }, [selected, size]);
    const onPointerEnter = (0, react_1.useCallback)(() => {
        onItemHovered(id);
        setHovered(true);
    }, [id, onItemHovered]);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    const onClick = (0, react_1.useCallback)(() => {
        onItemSelected(id);
        document.activeElement.blur();
    }, [id, onItemSelected]);
    const outerStyle = (0, react_1.useMemo)(() => {
        var _a, _b;
        return {
            ...styles_1.outerPortal,
            top: ((_a = size === null || size === void 0 ? void 0 : size.top) !== null && _a !== void 0 ? _a : 0) + ((_b = size === null || size === void 0 ? void 0 : size.height) !== null && _b !== void 0 ? _b : 0),
        };
    }, [size]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { ref: ref, role: "button", tabIndex: tabIndex, onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, onClick: onClick, style: containerStyle, type: "button", children: itemName }), portalStyle
                ? react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)("div", { className: "css-reset", style: outerStyle, children: (0, jsx_runtime_1.jsx)(z_index_1.HigherZIndex, { onEscape: onItemQuit, onOutsideClick: onItemQuit, children: (0, jsx_runtime_1.jsx)("div", { style: portalStyle, children: (0, jsx_runtime_1.jsx)(MenuContent_1.MenuContent, { onNextMenu: onPreviousMenu, onPreviousMenu: onNextMenu, values: menu.items, onHide: onItemQuit, leaveLeftSpace: menu.leaveLeftPadding, preselectIndex: false, topItemCanBeUnselected: true }) }) }) }), (0, portals_1.getPortal)(currentZIndex))
                : null] }));
};
exports.MenuItem = MenuItem;
