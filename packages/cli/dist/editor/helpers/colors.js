"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBackgroundFromHoverState = exports.INPUT_BORDER_COLOR_HOVERED = exports.INPUT_BORDER_COLOR_UNHOVERED = exports.CLEAR_HOVER = exports.SELECTED_HOVER_BACKGROUND = exports.LIGHT_TEXT = exports.SELECTED_BACKGROUND = exports.LIGHT_COLOR = exports.BORDER_COLOR = exports.INPUT_BACKGROUND = exports.BACKGROUND = void 0;
exports.BACKGROUND = '#1f2428';
exports.INPUT_BACKGROUND = '#2f363d';
exports.BORDER_COLOR = '#000';
exports.LIGHT_COLOR = '#ddd';
exports.SELECTED_BACKGROUND = 'hsla(0, 0%, 100%, 0.15)';
exports.LIGHT_TEXT = 'rgba(255, 255, 255, 0.6)';
exports.SELECTED_HOVER_BACKGROUND = 'hsla(0, 0%, 100%, 0.25)';
exports.CLEAR_HOVER = 'rgba(255, 255, 255, 0.06)';
exports.INPUT_BORDER_COLOR_UNHOVERED = 'rgba(0, 0, 0, 0.6)';
exports.INPUT_BORDER_COLOR_HOVERED = 'rgba(255, 255, 255, 0.05)';
const getBackgroundFromHoverState = ({ selected, hovered, }) => {
    if (selected) {
        if (hovered) {
            return exports.SELECTED_HOVER_BACKGROUND;
        }
        return exports.SELECTED_BACKGROUND;
    }
    if (hovered) {
        return exports.CLEAR_HOVER;
    }
    return 'transparent';
};
exports.getBackgroundFromHoverState = getBackgroundFromHoverState;
