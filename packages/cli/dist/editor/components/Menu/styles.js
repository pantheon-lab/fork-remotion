"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outerPortal = exports.menuContainer = exports.SUBMENU_LEFT_INSET = exports.MENU_VERTICAL_PADDING = void 0;
const colors_1 = require("../../helpers/colors");
exports.MENU_VERTICAL_PADDING = 4;
exports.SUBMENU_LEFT_INSET = -8;
exports.menuContainer = {
    backgroundColor: colors_1.BACKGROUND,
    position: 'fixed',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    color: 'white',
    userSelect: 'none',
    minWidth: 200,
};
exports.outerPortal = {
    position: 'fixed',
    height: '100%',
    width: '100%',
};
