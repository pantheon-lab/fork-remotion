"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioWaveform = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const media_utils_1 = require("@remotion/media-utils");
const react_1 = require("react");
const timeline_layout_1 = require("../helpers/timeline-layout");
const AudioWaveformBar_1 = require("./AudioWaveformBar");
const container = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    height: timeline_layout_1.TIMELINE_LAYER_HEIGHT,
};
const errorMessage = {
    fontSize: 13,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    alignSelf: 'flex-start',
    maxWidth: 450,
    opacity: 0.75,
};
const canvasStyle = {
    position: 'absolute',
};
const AudioWaveform = ({ src, fps, startFrom, durationInFrames, visualizationWidth, setMaxMediaDuration, volume, doesVolumeChange, }) => {
    const [metadata, setMetadata] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const mountState = (0, react_1.useRef)({ isMounted: true });
    const canvas = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const { current } = mountState;
        current.isMounted = true;
        return () => {
            current.isMounted = false;
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (!canvas.current) {
            return;
        }
        const context = canvas.current.getContext('2d');
        if (!context) {
            return;
        }
        context.clearRect(0, 0, visualizationWidth, timeline_layout_1.TIMELINE_LAYER_HEIGHT);
        if (!doesVolumeChange || typeof volume === 'number') {
            // The volume is a number, meaning it could change on each frame-
            // User did not use the (f: number) => number syntax, so we can't draw
            // a visualization.
            return;
        }
        const volumes = volume.split(',').map((v) => Number(v));
        context.beginPath();
        context.moveTo(0, timeline_layout_1.TIMELINE_LAYER_HEIGHT);
        volumes.forEach((v, index) => {
            const x = (index / (volumes.length - 1)) * visualizationWidth;
            const y = (1 - v) * (timeline_layout_1.TIMELINE_LAYER_HEIGHT - timeline_layout_1.TIMELINE_BORDER * 2) + 1;
            if (index === 0) {
                context.moveTo(x, y);
            }
            else {
                context.lineTo(x, y);
            }
        });
        context.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        context.stroke();
    }, [visualizationWidth, metadata, startFrom, volume, doesVolumeChange]);
    (0, react_1.useEffect)(() => {
        setError(null);
        (0, media_utils_1.getAudioData)(src)
            .then((data) => {
            if (mountState.current.isMounted) {
                setMaxMediaDuration(Math.floor(data.durationInSeconds * fps));
                setMetadata(data);
            }
        })
            .catch((err) => {
            console.log(err);
            if (mountState.current.isMounted) {
                setError(err);
            }
        });
    }, [fps, setMaxMediaDuration, src]);
    const normalized = (0, react_1.useMemo)(() => {
        if (!metadata || metadata.numberOfChannels === 0) {
            return [];
        }
        const numberOfSamples = Math.floor(visualizationWidth / (AudioWaveformBar_1.WAVEFORM_BAR_LENGTH + AudioWaveformBar_1.WAVEFORM_BAR_MARGIN));
        return (0, media_utils_1.getWaveformPortion)({
            audioData: metadata,
            startTimeInSeconds: startFrom / fps,
            durationInSeconds: durationInFrames / fps,
            numberOfSamples,
        });
    }, [durationInFrames, fps, metadata, startFrom, visualizationWidth]);
    if (error) {
        return ((0, jsx_runtime_1.jsx)("div", { style: container, children: (0, jsx_runtime_1.jsx)("div", { style: errorMessage, children: "No waveform available. Audio might not support CORS." }) }));
    }
    if (!metadata) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [normalized.map((w) => {
                return (0, jsx_runtime_1.jsx)(AudioWaveformBar_1.AudioWaveformBar, { amplitude: w.amplitude }, w.index);
            }), (0, jsx_runtime_1.jsx)("canvas", { ref: canvas, style: canvasStyle, width: visualizationWidth, height: timeline_layout_1.TIMELINE_LAYER_HEIGHT })] }));
};
exports.AudioWaveform = AudioWaveform;
