"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackRateSelector = exports.getPlaybackRateLabel = exports.commonPlaybackRates = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Checkmark_1 = require("../icons/Checkmark");
const playbackrate_1 = require("../state/playbackrate");
const ControlButton_1 = require("./ControlButton");
const ComboBox_1 = require("./NewComposition/ComboBox");
exports.commonPlaybackRates = [
    -4, -2, -1, -0.5, -0.25, 0.25, 0.5, 1, 2, 4,
];
const getPlaybackRateLabel = (playbackRate) => {
    return `${playbackRate}x`;
};
exports.getPlaybackRateLabel = getPlaybackRateLabel;
const accessibilityLabel = 'Change the playback rate';
const comboStyle = { width: 80 };
const PlaybackRateSelector = ({ playbackRate, setPlaybackRate }) => {
    const style = (0, react_1.useMemo)(() => {
        return {
            padding: ControlButton_1.CONTROL_BUTTON_PADDING,
        };
    }, []);
    const items = (0, react_1.useMemo)(() => {
        const divider = {
            type: 'divider',
            id: 'divider',
        };
        const values = exports.commonPlaybackRates.map((newPlaybackRate) => {
            return {
                id: String(newPlaybackRate),
                label: (0, exports.getPlaybackRateLabel)(newPlaybackRate),
                onClick: () => {
                    return setPlaybackRate(() => {
                        (0, playbackrate_1.persistPlaybackRate)(newPlaybackRate);
                        return newPlaybackRate;
                    });
                },
                type: 'item',
                value: newPlaybackRate,
                keyHint: null,
                leftItem: String(playbackRate) === String(newPlaybackRate) ? ((0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {})) : null,
                subMenu: null,
            };
        });
        const middle = Math.floor(exports.commonPlaybackRates.length / 2);
        return [...values.slice(0, middle), divider, ...values.slice(middle)];
    }, [playbackRate, setPlaybackRate]);
    return ((0, jsx_runtime_1.jsx)("div", { style: style, "aria-label": accessibilityLabel, children: (0, jsx_runtime_1.jsx)(ComboBox_1.Combobox, { title: accessibilityLabel, style: comboStyle, selectedId: String(playbackRate), values: items }) }));
};
exports.PlaybackRateSelector = PlaybackRateSelector;
