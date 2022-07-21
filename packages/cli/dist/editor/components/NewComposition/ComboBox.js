"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combobox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const colors_1 = require("../../helpers/colors");
const noop_1 = require("../../helpers/noop");
const caret_1 = require("../../icons/caret");
const z_index_1 = require("../../state/z-index");
const layout_1 = require("../layout");
const portals_1 = require("../Menu/portals");
const styles_1 = require("../Menu/styles");
const MenuContent_1 = require("./MenuContent");
const container = {
    padding: '8px 10px',
    display: 'inline-block',
    backgroundColor: colors_1.INPUT_BACKGROUND,
    fontSize: 14,
    borderWidth: 1,
    borderStyle: 'solid',
};
const Combobox = ({ values, selectedId, style: customStyle, title }) => {
    const [hovered, setIsHovered] = (0, react_1.useState)(false);
    const [opened, setOpened] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const { tabIndex, currentZIndex } = (0, z_index_1.useZIndex)();
    const size = player_1.PlayerInternals.useElementSize(ref, {
        triggerOnWindowResize: true,
        shouldApplyCssTransforms: true,
    });
    const onHide = (0, react_1.useCallback)(() => {
        setOpened(false);
    }, []);
    (0, react_1.useEffect)(() => {
        const { current } = ref;
        if (!current) {
            return;
        }
        const onMouseEnter = () => setIsHovered(true);
        const onMouseLeave = () => setIsHovered(false);
        const onClick = (e) => {
            e.stopPropagation();
            return setOpened((o) => !o);
        };
        current.addEventListener('mouseenter', onMouseEnter);
        current.addEventListener('mouseleave', onMouseLeave);
        current.addEventListener('click', onClick);
        return () => {
            current.removeEventListener('mouseenter', onMouseEnter);
            current.removeEventListener('mouseleave', onMouseLeave);
            current.removeEventListener('click', onClick);
        };
    }, []);
    const portalStyle = (0, react_1.useMemo)(() => {
        if (!opened || !size) {
            return null;
        }
        return {
            ...styles_1.menuContainer,
            left: size.left,
            top: size.top + size.height,
        };
    }, [opened, size]);
    const selected = values.find((v) => v.id === selectedId);
    const style = (0, react_1.useMemo)(() => {
        return {
            ...container,
            ...(customStyle !== null && customStyle !== void 0 ? customStyle : {}),
            userSelect: 'none',
            color: 'white',
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: opened
                ? colors_1.SELECTED_BACKGROUND
                : hovered
                    ? colors_1.INPUT_BORDER_COLOR_HOVERED
                    : colors_1.INPUT_BORDER_COLOR_UNHOVERED,
        };
    }, [customStyle, hovered, opened]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("button", { ref: ref, title: title, tabIndex: tabIndex, type: "button", style: style, children: [selected.label, " ", (0, jsx_runtime_1.jsx)(layout_1.Flex, {}), " ", (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 }), " ", (0, jsx_runtime_1.jsx)(caret_1.CaretDown, {})] }), portalStyle
                ? react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)("div", { style: styles_1.outerPortal, className: "css-reset", children: (0, jsx_runtime_1.jsx)(z_index_1.HigherZIndex, { onOutsideClick: onHide, onEscape: onHide, children: (0, jsx_runtime_1.jsx)("div", { style: portalStyle, children: (0, jsx_runtime_1.jsx)(MenuContent_1.MenuContent, { onNextMenu: noop_1.noop, onPreviousMenu: noop_1.noop, values: values, onHide: onHide, leaveLeftSpace: true, preselectIndex: values.findIndex((v) => v.id === selected.id), topItemCanBeUnselected: false }) }) }) }), (0, portals_1.getPortal)(currentZIndex))
                : null] }));
};
exports.Combobox = Combobox;
