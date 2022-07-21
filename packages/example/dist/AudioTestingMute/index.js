"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const framer_music_mp4_1 = __importDefault(require("../resources/framer-music.mp4"));
const sound1_mp3_1 = __importDefault(require("../resources/sound1.mp3"));
const AudioTestingMute = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    /**
     * Interleave music with the movie by muting each other
     * at certain points.
     */
    const getMuteState = react_1.default.useCallback((type) => {
        const muteParts = [
            { start: Number(fps), end: 2 * fps },
            { start: 4 * fps, end: 5 * fps },
        ];
        const toMute = muteParts.some((mp) => frame >= mp.start && frame <= mp.end);
        return type === 'movie' ? toMute : !toMute;
    }, [fps, frame]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(remotion_1.Video, { src: framer_music_mp4_1.default, muted: getMuteState('movie') }), (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 20, durationInFrames: 200, children: (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 20, durationInFrames: 200, children: (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 20, durationInFrames: 200, children: (0, jsx_runtime_1.jsx)(remotion_1.Sequence, { from: 20, durationInFrames: 200, children: (0, jsx_runtime_1.jsxs)(remotion_1.Sequence, { from: 20, durationInFrames: 200, children: [(0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: sound1_mp3_1.default, muted: getMuteState('music') }), (0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: sound1_mp3_1.default, muted: getMuteState('music') }), (0, jsx_runtime_1.jsx)(remotion_1.Audio, { src: sound1_mp3_1.default, muted: getMuteState('music') })] }) }) }) }) })] }));
};
exports.default = AudioTestingMute;
