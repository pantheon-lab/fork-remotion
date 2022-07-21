"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const timeline_1 = require("../../state/timeline");
const SplitterContext_1 = require("./SplitterContext");
const containerRow = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: '100%',
};
const containerColumn = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
};
const SplitterContainer = ({ orientation, children, defaultFlex, maxFlex, minFlex, id }) => {
    const [initialTimelineFlex, persistFlex] = (0, timeline_1.useTimelineFlex)(id);
    const [flexValue, setFlexValue] = (0, react_1.useState)(initialTimelineFlex !== null && initialTimelineFlex !== void 0 ? initialTimelineFlex : defaultFlex);
    const [domRect, setDomRect] = (0, react_1.useState)(null);
    const ref = (0, react_1.useRef)(null);
    const isDragging = (0, react_1.useRef)(false);
    const [resizeObserver] = (0, react_1.useState)(() => {
        return new ResizeObserver((entries) => {
            setDomRect(entries[0].contentRect);
        });
    });
    (0, react_1.useEffect)(() => {
        const { current } = ref;
        if (!current) {
            return;
        }
        resizeObserver.observe(current);
        return () => resizeObserver.unobserve(current);
    }, [resizeObserver]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        setDomRect((_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) !== null && _b !== void 0 ? _b : null);
    }, []);
    const value = (0, react_1.useMemo)(() => {
        return {
            flexValue,
            domRect,
            setFlexValue,
            isDragging,
            orientation,
            id,
            maxFlex,
            minFlex,
            defaultFlex,
            persistFlex,
        };
    }, [
        defaultFlex,
        domRect,
        flexValue,
        id,
        maxFlex,
        minFlex,
        orientation,
        persistFlex,
    ]);
    return ((0, jsx_runtime_1.jsx)(SplitterContext_1.SplitterContext.Provider, { value: value, children: (0, jsx_runtime_1.jsx)("div", { ref: ref, style: orientation === 'horizontal' ? containerColumn : containerRow, children: children }) }));
};
exports.SplitterContainer = SplitterContainer;
