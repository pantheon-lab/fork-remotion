"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineAudioBufferExample = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const react_1 = require("react");
const remotion_2 = require("remotion");
const media_utils_1 = require("@remotion/media-utils");
const C4_FREQUENCY = 261.63;
const sampleRate = 44100;
const OfflineAudioBufferExample = () => {
    const [handle] = (0, react_1.useState)(() => (0, remotion_2.delayRender)());
    const [audioBuffer, setAudioBuffer] = (0, react_1.useState)(null);
    const { fps, durationInFrames } = (0, remotion_2.useVideoConfig)();
    const lengthInSeconds = durationInFrames / fps;
    const renderAudio = (0, react_1.useCallback)(async () => {
        const offlineContext = new OfflineAudioContext({
            numberOfChannels: 2,
            length: sampleRate * lengthInSeconds,
            sampleRate,
        });
        const oscillatorNode = offlineContext.createOscillator();
        const gainNode = offlineContext.createGain();
        oscillatorNode.connect(gainNode);
        gainNode.connect(offlineContext.destination);
        gainNode.gain.setValueAtTime(0.5, offlineContext.currentTime);
        oscillatorNode.type = 'sine';
        oscillatorNode.frequency.value = C4_FREQUENCY;
        const { currentTime } = offlineContext;
        oscillatorNode.start(currentTime);
        oscillatorNode.stop(currentTime + lengthInSeconds);
        const buffer = await offlineContext.startRendering();
        setAudioBuffer((0, media_utils_1.audioBufferToDataUrl)(buffer));
        (0, remotion_2.continueRender)(handle);
    }, [handle, lengthInSeconds]);
    (0, react_1.useEffect)(() => {
        renderAudio();
    }, [renderAudio]);
    return ((0, jsx_runtime_1.jsxs)(remotion_1.AbsoluteFill, { children: [audioBuffer && ((0, jsx_runtime_1.jsx)(remotion_2.Audio, { src: audioBuffer, startFrom: 0, endAt: 100, volume: (f) => (0, remotion_1.interpolate)(f, [0, 50, 100], [0, 1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }) })), (0, jsx_runtime_1.jsx)(remotion_1.AbsoluteFill, { style: {
                    fontFamily: 'Helvetica, Arial',
                    fontSize: 50,
                    color: 'white',
                    justifyContent: 'center',
                    textAlign: 'center',
                }, children: "Render sound from offline audio buffer" })] }));
};
exports.OfflineAudioBufferExample = OfflineAudioBufferExample;
exports.default = exports.OfflineAudioBufferExample;
