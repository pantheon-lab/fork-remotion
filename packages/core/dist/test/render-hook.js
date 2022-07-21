"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHook = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
function renderHook(renderCallback, options = {}) {
    const { initialProps, wrapper } = options;
    const result = react_2.default.createRef();
    const TestComponent = ({ renderCallbackProps, }) => {
        const pendingResult = renderCallback(renderCallbackProps);
        react_2.default.useEffect(() => {
            // @ts-expect-error
            result.current = pendingResult;
        });
        return null;
    };
    const { rerender: baseRerender, unmount } = (0, react_1.render)((0, jsx_runtime_1.jsx)(TestComponent, { renderCallbackProps: initialProps }), { wrapper });
    function rerender(rerenderCallbackProps) {
        return baseRerender((0, jsx_runtime_1.jsx)(TestComponent, { renderCallbackProps: rerenderCallbackProps }));
    }
    return { result, rerender, unmount };
}
exports.renderHook = renderHook;
