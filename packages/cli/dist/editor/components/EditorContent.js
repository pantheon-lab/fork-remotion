"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const is_current_selected_still_1 = require("../helpers/is-current-selected-still");
const SplitterContainer_1 = require("./Splitter/SplitterContainer");
const SplitterElement_1 = require("./Splitter/SplitterElement");
const SplitterHandle_1 = require("./Splitter/SplitterHandle");
const Timeline_1 = require("./Timeline/Timeline");
const TopPanel_1 = require("./TopPanel");
const noop = () => undefined;
const EditorContent = () => {
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    if (isStill) {
        return (0, jsx_runtime_1.jsx)(TopPanel_1.TopPanel, {});
    }
    return ((0, jsx_runtime_1.jsxs)(SplitterContainer_1.SplitterContainer, { orientation: "horizontal", id: "top-to-bottom", maxFlex: 0.9, minFlex: 0.2, defaultFlex: 0.75, children: [(0, jsx_runtime_1.jsx)(SplitterElement_1.SplitterElement, { type: "flexer", children: (0, jsx_runtime_1.jsx)(TopPanel_1.TopPanel, {}) }), (0, jsx_runtime_1.jsx)(SplitterHandle_1.SplitterHandle, { allowToCollapse: false, onCollapse: noop }), (0, jsx_runtime_1.jsx)(SplitterElement_1.SplitterElement, { type: "anti-flexer", children: (0, jsx_runtime_1.jsx)(Timeline_1.Timeline, {}) })] }));
};
exports.EditorContent = EditorContent;
