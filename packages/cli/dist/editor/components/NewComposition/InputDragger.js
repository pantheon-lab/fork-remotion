"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDragger = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const noop_1 = require("../../helpers/noop");
const input_dragger_click_lock_1 = require("../../state/input-dragger-click-lock");
const z_index_1 = require("../../state/z-index");
const RemInput_1 = require("./RemInput");
const InputDragger = ({ onValueChange, min: _min, step: _step, value, ...props }) => {
    const [inputFallback, setInputFallback] = (0, react_1.useState)(false);
    const fallbackRef = (0, react_1.useRef)(null);
    const style = (0, react_1.useMemo)(() => {
        return {
            ...RemInput_1.inputBaseStyle,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
        };
    }, []);
    const span = (0, react_1.useMemo)(() => ({
        borderBottom: '1px dotted var(--blue)',
        paddingBottom: 1,
        color: 'var(--blue)',
        cursor: 'ew-resize',
        userSelect: 'none',
        fontSize: 13,
    }), []);
    const onClick = (0, react_1.useCallback)((e) => {
        if (!(0, input_dragger_click_lock_1.getClickLock)()) {
            e.stopPropagation();
        }
        if ((0, input_dragger_click_lock_1.getClickLock)()) {
            return;
        }
        setInputFallback(true);
    }, []);
    const onBlur = (0, react_1.useCallback)(() => {
        setInputFallback(false);
    }, []);
    const onKeyPress = (0, react_1.useCallback)((e) => {
        if (e.key === 'Enter') {
            setInputFallback(false);
        }
    }, []);
    const onPointerDown = (0, react_1.useCallback)((e) => {
        const { pageX, pageY } = e;
        const moveListener = (ev) => {
            const xDistance = ev.pageX - pageX;
            const distanceFromStart = Math.sqrt(xDistance ** 2 + (ev.pageY - pageY) ** 2);
            const step = Number(_step !== null && _step !== void 0 ? _step : 1);
            const min = Number(_min !== null && _min !== void 0 ? _min : 0);
            if (distanceFromStart > 4) {
                (0, input_dragger_click_lock_1.setClickLock)(true);
            }
            const diff = (0, remotion_1.interpolate)(xDistance, [-5, -4, 0, 4, 5], [-step, 0, 0, 0, step]);
            const newValue = Math.max(min, Math.floor(Number(value) + diff));
            const roundToStep = Math.floor(newValue / step) * step;
            onValueChange(roundToStep);
        };
        window.addEventListener('mousemove', moveListener);
        window.addEventListener('pointerup', () => {
            window.removeEventListener('mousemove', moveListener);
            setTimeout(() => {
                (0, input_dragger_click_lock_1.setClickLock)(false);
            }, 2);
        }, {
            once: true,
        });
    }, [_step, _min, value, onValueChange]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (inputFallback) {
            (_a = fallbackRef.current) === null || _a === void 0 ? void 0 : _a.select();
        }
    }, [inputFallback]);
    if (inputFallback) {
        return ((0, jsx_runtime_1.jsx)(z_index_1.HigherZIndex, { onEscape: onBlur, onOutsideClick: noop_1.noop, children: (0, jsx_runtime_1.jsx)(RemInput_1.RemotionInput, { ref: fallbackRef, autoFocus: true, onKeyPress: onKeyPress, onBlur: onBlur, value: value, min: _min, step: _step, ...props }) }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", style: style, onClick: onClick, onPointerDown: onPointerDown, children: (0, jsx_runtime_1.jsx)("span", { style: span, children: value }) }));
};
exports.InputDragger = InputDragger;
