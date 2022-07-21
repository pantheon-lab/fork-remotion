"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const validate_new_comp_data_1 = require("../../helpers/validate-new-comp-data");
const Checkmark_1 = require("../../icons/Checkmark");
const aspect_ratio_locked_1 = require("../../state/aspect-ratio-locked");
const modals_1 = require("../../state/modals");
const CopyButton_1 = require("../CopyButton");
const layout_1 = require("../layout");
const ModalContainer_1 = require("../ModalContainer");
const ModalHeader_1 = require("../ModalHeader");
const ComboBox_1 = require("./ComboBox");
const CopyHint_1 = require("./CopyHint");
const InputDragger_1 = require("./InputDragger");
const new_comp_layout_1 = require("./new-comp-layout");
const NewCompAspectRatio_1 = require("./NewCompAspectRatio");
const NewCompCode_1 = require("./NewCompCode");
const NewCompDuration_1 = require("./NewCompDuration");
const RemInput_1 = require("./RemInput");
const ValidationMessage_1 = require("./ValidationMessage");
const left = {
    padding: 12,
    paddingBottom: 80,
    paddingRight: 12,
    flex: 1,
    fontSize: 13,
};
const panelRight = {
    width: 400,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
};
const pre = {
    fontSize: 17,
    fontFamily: 'monospace',
};
const comboBoxStyle = {
    width: new_comp_layout_1.inputArea.width,
};
const copyRowStyle = {
    position: 'absolute',
    bottom: 10,
    right: 0,
    paddingRight: 10,
    paddingLeft: 20,
    width: '100%',
    alignItems: 'center',
    color: new_comp_layout_1.leftLabel.color,
};
const commonFrameRates = [24, 25, 29.97, 30, 48, 50];
const NewComposition = (props) => {
    const { initialCompType } = props;
    const [selectedFrameRate, setFrameRate] = (0, react_1.useState)(String(commonFrameRates[0]));
    const { compositions } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const [type, setType] = (0, react_1.useState)(initialCompType);
    const [name, setName] = (0, react_1.useState)('MyComp');
    const [size, setSize] = (0, react_1.useState)({
        width: '1280',
        height: '720',
    });
    const panelContent = (0, react_1.useMemo)(() => {
        return {
            flexDirection: 'row',
            display: 'flex',
            width: 950,
            height: type === 'composition' ? 450 : 300,
        };
    }, [type]);
    const [lockedAspectRatio, setLockedAspectRatio] = (0, react_1.useState)((0, aspect_ratio_locked_1.loadAspectRatioOption)() ? Number(size.width) / Number(size.height) : null);
    const [durationInFrames, setDurationInFrames] = (0, react_1.useState)('150');
    const setAspectRatioLocked = (0, react_1.useCallback)((option) => {
        (0, aspect_ratio_locked_1.persistAspectRatioOption)(option);
        setLockedAspectRatio(option ? Number(size.width) / Number(size.height) : null);
    }, [size.height, size.width]);
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const onQuit = (0, react_1.useCallback)(() => {
        setSelectedModal(null);
    }, [setSelectedModal]);
    const onTypeChanged = (0, react_1.useCallback)((newType) => {
        setType(newType);
    }, []);
    const onWidthChanged = (0, react_1.useCallback)((e) => {
        setSize((s) => {
            const { height } = s;
            const newWidth = Number(e.target.value);
            return {
                height: lockedAspectRatio === null
                    ? height
                    : String(Math.ceil(newWidth / lockedAspectRatio / 2) * 2),
                width: String(newWidth),
            };
        });
    }, [lockedAspectRatio]);
    const onWidthDirectlyChanged = (0, react_1.useCallback)((newWidth) => {
        setSize((s) => {
            const { height } = s;
            return {
                height: lockedAspectRatio === null
                    ? height
                    : String(Math.ceil(newWidth / lockedAspectRatio / 2) * 2),
                width: String(newWidth),
            };
        });
    }, [lockedAspectRatio]);
    const onHeightDirectlyChanged = (0, react_1.useCallback)((newHeight) => {
        setSize((s) => {
            const { width } = s;
            return {
                width: lockedAspectRatio === null
                    ? width
                    : String(Math.ceil((newHeight / 2) * lockedAspectRatio) * 2),
                height: String(newHeight),
            };
        });
    }, [lockedAspectRatio]);
    const onHeightChanged = (0, react_1.useCallback)((e) => {
        setSize((s) => {
            const { width } = s;
            const newHeight = Number(e.target.value);
            return {
                width: lockedAspectRatio === null
                    ? width
                    : String(Math.ceil((newHeight / 2) * lockedAspectRatio) * 2),
                height: String(newHeight),
            };
        });
    }, [lockedAspectRatio]);
    const onNameChange = (0, react_1.useCallback)((e) => {
        setName(e.target.value);
    }, []);
    const onFpsChange = (0, react_1.useCallback)((newFps) => {
        setFrameRate(String(newFps));
    }, []);
    const items = (0, react_1.useMemo)(() => {
        return commonFrameRates.map((frameRate) => {
            return {
                id: String(frameRate),
                label: `${frameRate}fps`,
                onClick: () => onFpsChange(frameRate),
                type: 'item',
                value: frameRate,
                keyHint: null,
                leftItem: String(frameRate) === selectedFrameRate ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                subMenu: null,
            };
        });
    }, [onFpsChange, selectedFrameRate]);
    const compNameErrMessage = (0, validate_new_comp_data_1.validateCompositionName)(name, compositions);
    const compWidthErrMessage = (0, validate_new_comp_data_1.validateCompositionDimension)('Width', size.width);
    const compHeightErrMessage = (0, validate_new_comp_data_1.validateCompositionDimension)('Height', size.height);
    const typeValues = (0, react_1.useMemo)(() => {
        return [
            {
                id: 'composition',
                keyHint: null,
                label: '<Composition />',
                leftItem: null,
                onClick: () => onTypeChanged('composition'),
                subMenu: null,
                type: 'item',
                value: 'composition',
            },
            {
                id: 'still',
                keyHint: null,
                label: '<Still />',
                leftItem: null,
                onClick: () => onTypeChanged('still'),
                subMenu: null,
                type: 'item',
                value: 'still',
            },
        ];
    }, [onTypeChanged]);
    return ((0, jsx_runtime_1.jsxs)(ModalContainer_1.ModalContainer, { onOutsideClick: onQuit, onEscape: onQuit, children: [(0, jsx_runtime_1.jsx)(ModalHeader_1.NewCompHeader, { title: "New composition" }), (0, jsx_runtime_1.jsxs)("div", { style: panelContent, children: [(0, jsx_runtime_1.jsxs)("div", { style: left, children: [(0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 3 }), (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: new_comp_layout_1.leftLabel, children: "Type" }), (0, jsx_runtime_1.jsx)("div", { style: new_comp_layout_1.inputArea, children: (0, jsx_runtime_1.jsx)(ComboBox_1.Combobox, { title: "Type of composition", style: comboBoxStyle, values: typeValues, selectedId: type }) })] }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1 }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: new_comp_layout_1.leftLabel, children: "Name" }), (0, jsx_runtime_1.jsxs)("div", { style: new_comp_layout_1.inputArea, children: [(0, jsx_runtime_1.jsx)(RemInput_1.RemotionInput, { value: name, onChange: onNameChange, type: "text", placeholder: "Composition name" }), compNameErrMessage ? ((0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { message: compNameErrMessage })) : null] })] })] }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1 }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("label", { children: (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: new_comp_layout_1.leftLabel, children: "Width" }), (0, jsx_runtime_1.jsxs)("div", { style: new_comp_layout_1.inputArea, children: [(0, jsx_runtime_1.jsx)(InputDragger_1.InputDragger, { type: "number", value: size.width, placeholder: "Width (px)", onChange: onWidthChanged, name: "width", step: 2, min: 2, max: 100000000, onValueChange: onWidthDirectlyChanged }), compWidthErrMessage ? ((0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { message: compWidthErrMessage })) : null] })] }) }) }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1 }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)("label", { children: (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", children: [(0, jsx_runtime_1.jsx)("div", { style: new_comp_layout_1.leftLabel, children: "Height" }), (0, jsx_runtime_1.jsxs)("div", { style: new_comp_layout_1.inputArea, children: [(0, jsx_runtime_1.jsx)(InputDragger_1.InputDragger, { type: "number", value: size.height, onChange: onHeightChanged, placeholder: "Height (px)", name: "height", step: 2, min: 2, max: 100000000, onValueChange: onHeightDirectlyChanged }), compHeightErrMessage ? ((0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { message: compHeightErrMessage })) : null] })] }) })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(NewCompAspectRatio_1.NewCompAspectRatio, { width: Number(size.width), height: Number(size.height), aspectRatioLocked: lockedAspectRatio, setAspectRatioLocked: setAspectRatioLocked }) })] }), (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1 }), type === 'composition' ? ((0, jsx_runtime_1.jsx)(NewCompDuration_1.NewCompDuration, { durationInFrames: durationInFrames, fps: selectedFrameRate, setDurationInFrames: setDurationInFrames })) : null, (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", {}), type === 'composition' ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1 }), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("div", { style: new_comp_layout_1.leftLabel, children: "Framerate" }), (0, jsx_runtime_1.jsx)(ComboBox_1.Combobox, { title: "Framerate", style: comboBoxStyle, values: items, selectedId: selectedFrameRate })] })] })) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { style: panelRight, children: [(0, jsx_runtime_1.jsx)("pre", { style: pre, children: (0, NewCompCode_1.getNewCompositionCode)({
                                    type,
                                    durationInFrames: Number(durationInFrames),
                                    fps: Number(selectedFrameRate),
                                    height: Number(size.height),
                                    width: Number(size.width),
                                    name,
                                    raw: false,
                                }) }), (0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", style: copyRowStyle, children: [(0, jsx_runtime_1.jsx)(CopyHint_1.CopyHint, {}), (0, jsx_runtime_1.jsx)(layout_1.Flex, {}), (0, jsx_runtime_1.jsx)(CopyButton_1.CopyButton, { label: "Copy code", labelWhenCopied: "Copied!", textToCopy: (0, NewCompCode_1.getNewCompositionCode)({
                                            type,
                                            durationInFrames: Number(durationInFrames),
                                            fps: Number(selectedFrameRate),
                                            height: Number(size.height),
                                            width: Number(size.width),
                                            name,
                                            raw: true,
                                        }) })] })] })] })] }));
};
exports.default = NewComposition;
