"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuSubItem = exports.MENU_SUBMENU_BUTTON_CLASS_NAME = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const colors_1 = require("../../helpers/colors");
const caret_1 = require("../../icons/caret");
const z_index_1 = require("../../state/z-index");
const layout_1 = require("../layout");
const portals_1 = require("./portals");
const styles_1 = require("./styles");
const SubMenu_1 = require("./SubMenu");
const container = {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 8,
    cursor: 'default',
};
exports.MENU_SUBMENU_BUTTON_CLASS_NAME = 'remotion-submenu-button';
const labelStyle = {
    fontSize: 13,
};
const keyHintCss = {
    flexDirection: 'row',
    color: colors_1.LIGHT_TEXT,
    fontSize: 13,
};
const leftSpace = {
    width: 24,
    marginLeft: -6,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
};
const MenuSubItem = ({ label, leaveLeftSpace, leftItem, onActionChosen, id, selected, onItemSelected, keyHint, subMenu, onQuitMenu, subMenuActivated, setSubMenuActivated, }) => {
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const size = player_1.PlayerInternals.useElementSize(ref, {
        triggerOnWindowResize: true,
        shouldApplyCssTransforms: true,
    });
    const { currentZIndex } = (0, z_index_1.useZIndex)();
    const style = (0, react_1.useMemo)(() => {
        return {
            ...container,
            backgroundColor: selected ? colors_1.CLEAR_HOVER : 'transparent',
        };
    }, [selected]);
    const onClick = (0, react_1.useCallback)(() => {
        onActionChosen(id);
    }, [id, onActionChosen]);
    const onPointerEnter = (0, react_1.useCallback)(() => {
        onItemSelected(id);
        setHovered(true);
    }, [id, onItemSelected]);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    const onQuitSubmenu = (0, react_1.useCallback)(() => {
        setSubMenuActivated(false);
    }, [setSubMenuActivated]);
    const portalStyle = (0, react_1.useMemo)(() => {
        if (!selected || !size || !subMenu || !subMenuActivated) {
            return null;
        }
        return {
            ...styles_1.menuContainer,
            left: size.left + size.width + styles_1.SUBMENU_LEFT_INSET,
            top: size.top - styles_1.MENU_VERTICAL_PADDING,
        };
    }, [selected, size, subMenu, subMenuActivated]);
    (0, react_1.useEffect)(() => {
        if (!hovered || !subMenu) {
            return;
        }
        const hi = setTimeout(() => {
            setSubMenuActivated('with-mouse');
        }, 100);
        return () => clearTimeout(hi);
    }, [hovered, selected, setSubMenuActivated, subMenu]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, style: style, onClick: onClick, children: (0, jsx_runtime_1.jsxs)(layout_1.Row, { children: [leaveLeftSpace ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: leftSpace, children: leftItem }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 })] })) : null, (0, jsx_runtime_1.jsx)("div", { style: labelStyle, children: label }), " ", (0, jsx_runtime_1.jsx)(layout_1.Flex, {}), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 2 }), subMenu ? (0, jsx_runtime_1.jsx)(caret_1.CaretRight, {}) : null, keyHint ? (0, jsx_runtime_1.jsx)("span", { style: keyHintCss, children: keyHint }) : null, portalStyle && subMenu
                    ? react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)(SubMenu_1.SubMenuComponent, { onQuitFullMenu: onQuitMenu, subMenu: subMenu, onQuitSubMenu: onQuitSubmenu, portalStyle: portalStyle, subMenuActivated: subMenuActivated }), (0, portals_1.getPortal)(currentZIndex))
                    : null] }) }));
};
exports.MenuSubItem = MenuSubItem;
