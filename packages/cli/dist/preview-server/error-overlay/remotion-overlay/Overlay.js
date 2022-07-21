"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = exports.setErrorsRef = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const keybindings_1 = require("../../../editor/state/keybindings");
const ErrorLoader_1 = require("./ErrorLoader");
exports.setErrorsRef = (0, react_1.createRef)();
const errorsAreTheSame = (first, second) => {
    return first.stack === second.stack && first.message === second.message;
};
const BACKGROUND_COLOR = '#1f2428';
const Overlay = () => {
    const [errors, setErrors] = (0, react_1.useState)({ type: 'clear' });
    const addError = (0, react_1.useCallback)((err) => {
        setErrors((state) => {
            if (state.type === 'errors') {
                if (state.errors.some((e) => errorsAreTheSame(e, err))) {
                    return state;
                }
                return {
                    ...state,
                    errors: [...state.errors, err],
                };
            }
            return {
                type: 'errors',
                errors: [err],
            };
        });
    }, []);
    (0, react_1.useImperativeHandle)(exports.setErrorsRef, () => {
        return { setErrors, addError };
    }, [addError]);
    if (errors.type === 'clear') {
        return null;
    }
    if (errors.errors.length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(keybindings_1.KeybindingContextProvider, { children: (0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { style: {
                backgroundColor: BACKGROUND_COLOR,
                overflow: 'auto',
                color: 'white',
            }, children: errors.errors.map((err, i) => {
                return ((0, jsx_runtime_1.jsx)(ErrorLoader_1.ErrorLoader, { keyboardShortcuts: i === 0, error: err }, err.stack));
            }) }) }));
};
exports.Overlay = Overlay;
