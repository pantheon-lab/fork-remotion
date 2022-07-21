"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const noop_1 = require("../../helpers/noop");
const z_index_1 = require("../../state/z-index");
const MenuContent_1 = require("../NewComposition/MenuContent");
const SubMenuComponent = ({ portalStyle, subMenuActivated, subMenu, onQuitFullMenu, onQuitSubMenu, }) => {
    return ((0, jsx_runtime_1.jsx)(z_index_1.HigherZIndex, { onEscape: onQuitFullMenu, onOutsideClick: noop_1.noop, children: (0, jsx_runtime_1.jsx)("div", { style: portalStyle, className: "css-reset", children: (0, jsx_runtime_1.jsx)(MenuContent_1.MenuContent, { onNextMenu: noop_1.noop, onPreviousMenu: onQuitSubMenu, values: subMenu.items, onHide: noop_1.noop, leaveLeftSpace: subMenu.leaveLeftSpace, preselectIndex: subMenuActivated === 'without-mouse' &&
                    typeof subMenu.preselectIndex === 'number'
                    ? subMenu.preselectIndex
                    : false, topItemCanBeUnselected: false }) }) }));
};
exports.SubMenuComponent = SubMenuComponent;
