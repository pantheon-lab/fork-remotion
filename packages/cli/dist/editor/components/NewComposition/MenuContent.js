"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const use_keybinding_1 = require("../../helpers/use-keybinding");
const MenuDivider_1 = require("../Menu/MenuDivider");
const MenuSubItem_1 = require("../Menu/MenuSubItem");
const styles_1 = require("../Menu/styles");
const BORDER_SIZE = 1;
const container = {
    paddingTop: styles_1.MENU_VERTICAL_PADDING,
    paddingBottom: styles_1.MENU_VERTICAL_PADDING,
    border: `${BORDER_SIZE}px solid ${colors_1.INPUT_BORDER_COLOR_UNHOVERED}`,
    marginLeft: 0 - BORDER_SIZE,
};
const MenuContent = ({ onHide, values, preselectIndex, onNextMenu, onPreviousMenu, leaveLeftSpace, topItemCanBeUnselected, }) => {
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    const containerRef = (0, react_1.useRef)(null);
    const [subMenuActivated, setSubMenuActivated] = (0, react_1.useState)(false);
    if (values[0].type === 'divider') {
        throw new Error('first value cant be divide');
    }
    const [selectedItem, setSelectedItem] = (0, react_1.useState)(typeof preselectIndex === 'number' ? values[preselectIndex].id : null);
    const onEscape = (0, react_1.useCallback)(() => {
        onHide();
    }, [onHide]);
    const onItemSelected = (0, react_1.useCallback)((id) => {
        setSelectedItem(id);
    }, []);
    const onArrowUp = (0, react_1.useCallback)(() => {
        setSelectedItem((prevItem) => {
            if (prevItem === null) {
                return null;
            }
            const index = values.findIndex((val) => val.id === prevItem);
            if ((topItemCanBeUnselected && index === 0) || prevItem === null) {
                return null;
            }
            const previousItems = values.filter((v, i) => i < index && v.type !== 'divider');
            if (previousItems.length > 0) {
                return previousItems[previousItems.length - 1].id;
            }
            const firstNonDivider = values.find((v) => v.type !== 'divider');
            if (firstNonDivider) {
                return firstNonDivider.id;
            }
            throw new Error('could not find previous item');
        });
    }, [topItemCanBeUnselected, values]);
    const onArrowDown = (0, react_1.useCallback)(() => {
        setSelectedItem((prevItem) => {
            const index = values.findIndex((val) => val.id === prevItem);
            const nextItem = values.find((v, i) => i > index && v.type !== 'divider');
            if (nextItem) {
                return nextItem.id;
            }
            const lastNonDivider = values
                .slice()
                .reverse()
                .find((v) => v.type !== 'divider');
            if (lastNonDivider) {
                return lastNonDivider.id;
            }
            throw new Error('could not find next item');
        });
    }, [values]);
    const onEnter = (0, react_1.useCallback)(() => {
        if (selectedItem === null) {
            return onHide();
        }
        const item = values.find((i) => i.id === selectedItem);
        if (!item) {
            throw new Error('cannot find item');
        }
        if (item.type === 'divider') {
            throw new Error('cannot find divider');
        }
        if (item.subMenu) {
            return setSubMenuActivated('without-mouse');
        }
        item.onClick(item.id);
    }, [onHide, selectedItem, values]);
    const onArrowRight = (0, react_1.useCallback)(() => {
        if (selectedItem === null) {
            return onNextMenu();
        }
        const item = values.find((i) => i.id === selectedItem);
        if (!item) {
            throw new Error('cannot find item');
        }
        if (item.type === 'divider') {
            throw new Error('cannot find divider');
        }
        if (!item.subMenu) {
            return onNextMenu();
        }
        setSubMenuActivated('without-mouse');
    }, [onNextMenu, selectedItem, values]);
    (0, react_1.useEffect)(() => {
        const escapeBinding = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'Escape',
            callback: onEscape,
            commandCtrlKey: false,
        });
        const rightBinding = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'ArrowRight',
            commandCtrlKey: false,
            callback: onArrowRight,
        });
        const leftBinding = keybindings.registerKeybinding({
            event: 'keydown',
            commandCtrlKey: false,
            key: 'ArrowLeft',
            callback: onPreviousMenu,
        });
        const downBinding = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'ArrowDown',
            commandCtrlKey: false,
            callback: onArrowDown,
        });
        const upBinding = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'ArrowUp',
            callback: onArrowUp,
            commandCtrlKey: false,
        });
        const enterBinding = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'Enter',
            callback: onEnter,
            commandCtrlKey: false,
        });
        const spaceBinding = keybindings.registerKeybinding({
            event: 'keyup',
            key: ' ',
            callback: onEnter,
            commandCtrlKey: false,
        });
        return () => {
            escapeBinding.unregister();
            leftBinding.unregister();
            rightBinding.unregister();
            downBinding.unregister();
            upBinding.unregister();
            enterBinding.unregister();
            spaceBinding.unregister();
        };
    }, [
        keybindings,
        onEscape,
        onNextMenu,
        onPreviousMenu,
        onArrowDown,
        onArrowUp,
        onEnter,
        onArrowRight,
    ]);
    // Disable submenu if not selected
    (0, react_1.useEffect)(() => {
        if (!subMenuActivated) {
            return;
        }
        if (selectedItem === null) {
            return setSubMenuActivated(false);
        }
        const item = values.find((i) => i.id === selectedItem);
        if (!item) {
            throw new Error('cannot find item');
        }
        if (item.type === 'divider') {
            throw new Error('should not select divider');
        }
        if (!item.subMenu && subMenuActivated) {
            setSubMenuActivated(false);
        }
    }, [selectedItem, subMenuActivated, values]);
    (0, react_1.useEffect)(() => {
        const { current } = containerRef;
        if (!current) {
            return;
        }
        const onPointerLeave = () => {
            if (subMenuActivated) {
                return;
            }
            setSelectedItem(null);
        };
        current.addEventListener('pointerleave', onPointerLeave);
        return () => current.removeEventListener('pointerleave', onPointerLeave);
    }, [onHide, subMenuActivated]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: containerRef, style: container, children: values.map((item) => {
            if (item.type === 'divider') {
                return (0, jsx_runtime_1.jsx)(MenuDivider_1.MenuDivider, {}, item.id);
            }
            const onClick = () => {
                onHide();
                item.onClick(item.id);
            };
            return ((0, jsx_runtime_1.jsx)(MenuSubItem_1.MenuSubItem, { selected: item.id === selectedItem, onActionChosen: onClick, onItemSelected: onItemSelected, label: item.label, id: item.id, keyHint: item.keyHint, leaveLeftSpace: leaveLeftSpace, leftItem: item.leftItem, subMenu: item.subMenu, onQuitMenu: onHide, onNextMenu: onNextMenu, subMenuActivated: subMenuActivated, setSubMenuActivated: setSubMenuActivated }, item.id));
        }) }));
};
exports.MenuContent = MenuContent;
