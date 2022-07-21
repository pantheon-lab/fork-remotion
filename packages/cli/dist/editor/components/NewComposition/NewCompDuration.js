"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCompDuration = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const validate_new_comp_data_1 = require("../../helpers/validate-new-comp-data");
const layout_1 = require("../layout");
const InputDragger_1 = require("./InputDragger");
const new_comp_layout_1 = require("./new-comp-layout");
const ValidationMessage_1 = require("./ValidationMessage");
const NewCompDuration = ({ durationInFrames, setDurationInFrames, fps }) => {
    const onDurationInFramesChanged = (0, react_1.useCallback)((e) => {
        setDurationInFrames(String(Number(e.target.value)));
    }, [setDurationInFrames]);
    const onDurationChangedDirectly = (0, react_1.useCallback)((newVal) => {
        setDurationInFrames(String(newVal));
    }, [setDurationInFrames]);
    const compDurationErrMessage = (0, validate_new_comp_data_1.validateCompositionDuration)(durationInFrames);
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("label", { children: (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: new_comp_layout_1.leftLabel, children: " Duration in frames" }), (0, jsx_runtime_1.jsxs)("div", { style: new_comp_layout_1.inputArea, children: [(0, jsx_runtime_1.jsx)(InputDragger_1.InputDragger, { type: "number", value: durationInFrames, onChange: onDurationInFramesChanged, placeholder: "Duration (frames)", name: "durationInFrames", min: 1, step: 1, max: 100000000, onValueChange: onDurationChangedDirectly }), compDurationErrMessage ? ((0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { message: compDurationErrMessage })) : null] }), (0, jsx_runtime_1.jsxs)("span", { style: new_comp_layout_1.rightLabel, children: [(Number(durationInFrames) / Number(fps)).toFixed(2), "sec"] })] }) }) }));
};
exports.NewCompDuration = NewCompDuration;
