"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeSelector = exports.getPreviewSizeLabel = exports.commonPreviewSizes = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Checkmark_1 = require("../icons/Checkmark");
const preview_size_1 = require("../state/preview-size");
const ControlButton_1 = require("./ControlButton");
const ComboBox_1 = require("./NewComposition/ComboBox");
exports.commonPreviewSizes = ['auto', 0.25, 0.5, 1];
const getPreviewSizeLabel = (previewSize) => {
    if (previewSize === 1) {
        return '100%';
    }
    if (previewSize === 0.5) {
        return '50%';
    }
    if (previewSize === 0.25) {
        return '25%';
    }
    if (previewSize === 'auto') {
        return 'Fit';
    }
};
exports.getPreviewSizeLabel = getPreviewSizeLabel;
const accessibilityLabel = 'Preview Size';
const comboStyle = { width: 80 };
const SizeSelector = () => {
    const { size, setSize } = (0, react_1.useContext)(preview_size_1.PreviewSizeContext);
    const style = (0, react_1.useMemo)(() => {
        return {
            padding: ControlButton_1.CONTROL_BUTTON_PADDING,
        };
    }, []);
    const items = (0, react_1.useMemo)(() => {
        return exports.commonPreviewSizes.map((newSize) => {
            return {
                id: String(newSize),
                label: (0, exports.getPreviewSizeLabel)(newSize),
                onClick: () => {
                    return setSize(() => {
                        return newSize;
                    });
                },
                type: 'item',
                value: newSize,
                keyHint: null,
                leftItem: String(size) === String(newSize) ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                subMenu: null,
            };
        });
    }, [setSize, size]);
    return ((0, jsx_runtime_1.jsx)("div", { style: style, "aria-label": accessibilityLabel, children: (0, jsx_runtime_1.jsx)(ComboBox_1.Combobox, { title: accessibilityLabel, style: comboStyle, selectedId: String(size), values: items }) }));
};
exports.SizeSelector = SizeSelector;
