"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useZIndex = exports.HigherZIndex = exports.ZIndexContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_keybinding_1 = require("../helpers/use-keybinding");
const highest_z_index_1 = require("./highest-z-index");
const input_dragger_click_lock_1 = require("./input-dragger-click-lock");
exports.ZIndexContext = (0, react_1.createContext)({
    currentIndex: 0,
});
const EscapeHook = ({ onEscape }) => {
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    (0, react_1.useEffect)(() => {
        const escape = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'Escape',
            callback: onEscape,
            commandCtrlKey: false,
        });
        return () => {
            escape.unregister();
        };
    }, [keybindings, onEscape]);
    return null;
};
const HigherZIndex = ({ children, onEscape, onOutsideClick }) => {
    const context = (0, react_1.useContext)(exports.ZIndexContext);
    const highestContext = (0, react_1.useContext)(highest_z_index_1.HighestZIndexContext);
    const containerRef = (0, react_1.useRef)(null);
    const currentIndex = context.currentIndex + 1;
    (0, react_1.useEffect)(() => {
        highestContext.registerZIndex(currentIndex);
        return () => highestContext.unregisterZIndex(currentIndex);
    }, [currentIndex, highestContext]);
    (0, react_1.useEffect)(() => {
        const listener = (e) => {
            var _a;
            const outsideClick = !((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target));
            if (outsideClick &&
                highestContext.highestIndex === currentIndex &&
                !(0, input_dragger_click_lock_1.getClickLock)() &&
                // Don't trigger if that click removed that node
                document.contains(e.target)) {
                e.stopPropagation();
                onOutsideClick();
            }
        };
        window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
    }, [currentIndex, highestContext.highestIndex, onOutsideClick]);
    const value = (0, react_1.useMemo)(() => {
        return {
            currentIndex,
        };
    }, [currentIndex]);
    return ((0, jsx_runtime_1.jsxs)(exports.ZIndexContext.Provider, { value: value, children: [(0, jsx_runtime_1.jsx)(EscapeHook, { onEscape: onEscape }), (0, jsx_runtime_1.jsx)("div", { ref: containerRef, children: children })] }));
};
exports.HigherZIndex = HigherZIndex;
const useZIndex = () => {
    const context = (0, react_1.useContext)(exports.ZIndexContext);
    const highestContext = (0, react_1.useContext)(highest_z_index_1.HighestZIndexContext);
    const isHighestContext = highestContext.highestIndex === context.currentIndex;
    return (0, react_1.useMemo)(() => ({
        currentZIndex: context.currentIndex,
        highestZIndex: highestContext.highestIndex,
        isHighestContext,
        tabIndex: isHighestContext ? 0 : -1,
    }), [context.currentIndex, highestContext.highestIndex, isHighestContext]);
};
exports.useZIndex = useZIndex;
