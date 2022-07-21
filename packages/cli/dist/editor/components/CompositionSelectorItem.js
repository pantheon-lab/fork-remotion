"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionSelectorItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../helpers/colors");
const is_composition_still_1 = require("../helpers/is-composition-still");
const film_1 = require("../icons/film");
const folder_1 = require("../icons/folder");
const still_1 = require("../icons/still");
const layout_1 = require("./layout");
const itemStyle = {
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 13,
    display: 'flex',
    textDecoration: 'none',
    cursor: 'default',
    alignItems: 'center',
    marginBottom: 1,
    appearance: 'none',
    border: 'none',
    width: '100%',
};
const iconStyle = {
    width: 18,
    height: 18,
};
const CompositionSelectorItem = ({ item, level, currentComposition, tabIndex, selectComposition, toggleFolder, }) => {
    const selected = (0, react_1.useMemo)(() => {
        if (item.type === 'composition') {
            return currentComposition === item.composition.id;
        }
        return false;
    }, [item, currentComposition]);
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const onPointerEnter = (0, react_1.useCallback)(() => {
        setHovered(true);
    }, []);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    const style = (0, react_1.useMemo)(() => {
        return {
            ...itemStyle,
            backgroundColor: hovered
                ? selected
                    ? colors_1.SELECTED_BACKGROUND
                    : colors_1.CLEAR_HOVER
                : selected
                    ? colors_1.SELECTED_BACKGROUND
                    : 'transparent',
            color: selected || hovered ? 'white' : colors_1.LIGHT_TEXT,
            paddingLeft: 8 + level * 8,
        };
    }, [hovered, level, selected]);
    const onClick = (0, react_1.useCallback)((evt) => {
        evt.preventDefault();
        if (item.type === 'composition') {
            selectComposition(item.composition);
        }
        else {
            toggleFolder(item.folderName, item.parentName);
        }
    }, [item, selectComposition, toggleFolder]);
    if (item.type === 'folder') {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("button", { style: style, onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, tabIndex: tabIndex, onClick: onClick, type: "button", children: [item.expanded ? ((0, jsx_runtime_1.jsx)(folder_1.ExpandedFolderIcon, { style: iconStyle })) : ((0, jsx_runtime_1.jsx)(folder_1.CollapsedFolderIcon, { style: iconStyle })), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 }), item.folderName] }), item.expanded
                    ? item.items.map((childItem) => {
                        return ((0, jsx_runtime_1.jsx)(exports.CompositionSelectorItem, { currentComposition: currentComposition, selectComposition: selectComposition, item: childItem, tabIndex: tabIndex, level: level + 1, toggleFolder: toggleFolder }, childItem.key + childItem.type));
                    })
                    : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)("button", { style: style, onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, tabIndex: tabIndex, onClick: onClick, type: "button", children: [(0, is_composition_still_1.isCompositionStill)(item.composition) ? ((0, jsx_runtime_1.jsx)(still_1.StillIcon, { style: iconStyle })) : ((0, jsx_runtime_1.jsx)(film_1.FilmIcon, { style: iconStyle })), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 }), item.composition.id] }));
};
exports.CompositionSelectorItem = CompositionSelectorItem;
