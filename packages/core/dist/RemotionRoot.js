"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemotionRoot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const shared_audio_tags_1 = require("./audio/shared-audio-tags");
const CompositionManager_1 = require("./CompositionManager");
const delay_render_1 = require("./delay-render");
const nonce_1 = require("./nonce");
const random_1 = require("./random");
const timeline_position_state_1 = require("./timeline-position-state");
const RemotionRoot = ({ children }) => {
    var _a;
    const [remotionRootId] = (0, react_1.useState)(() => String((0, random_1.random)(null)));
    const [frame, setFrame] = (0, react_1.useState)((_a = window.remotion_initialFrame) !== null && _a !== void 0 ? _a : 0);
    const [playing, setPlaying] = (0, react_1.useState)(false);
    const imperativePlaying = (0, react_1.useRef)(false);
    const [fastRefreshes, setFastRefreshes] = (0, react_1.useState)(0);
    const [playbackRate, setPlaybackRate] = (0, react_1.useState)(1);
    const audioAndVideoTags = (0, react_1.useRef)([]);
    (0, react_1.useLayoutEffect)(() => {
        if (typeof window !== 'undefined') {
            window.remotion_setFrame = (f) => {
                const id = (0, delay_render_1.delayRender)(`Setting the current frame to ${f}`);
                setFrame(f);
                requestAnimationFrame(() => (0, delay_render_1.continueRender)(id));
            };
            window.remotion_isPlayer = false;
        }
    }, []);
    const timelineContextValue = (0, react_1.useMemo)(() => {
        return {
            frame,
            playing,
            imperativePlaying,
            rootId: remotionRootId,
            playbackRate,
            setPlaybackRate,
            audioAndVideoTags,
        };
    }, [frame, playbackRate, playing, remotionRootId]);
    const setTimelineContextValue = (0, react_1.useMemo)(() => {
        return {
            setFrame,
            setPlaying,
        };
    }, []);
    const nonceContext = (0, react_1.useMemo)(() => {
        let counter = 0;
        return {
            getNonce: () => counter++,
            fastRefreshes,
        };
    }, [fastRefreshes]);
    (0, react_1.useEffect)(() => {
        if (module.hot) {
            module.hot.addStatusHandler((status) => {
                if (status === 'idle') {
                    setFastRefreshes((i) => i + 1);
                }
            });
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)(nonce_1.NonceContext.Provider, { value: nonceContext, children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: timelineContextValue, children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.SetTimelineContext.Provider, { value: setTimelineContextValue, children: (0, jsx_runtime_1.jsx)(CompositionManager_1.CompositionManagerProvider, { children: (0, jsx_runtime_1.jsx)(shared_audio_tags_1.SharedAudioContextProvider
                    // In the preview, which is mostly played on Desktop, we opt out of the autoplay policy fix as described in https://github.com/remotion-dev/remotion/pull/554, as it mostly applies to mobile.
                    , { 
                        // In the preview, which is mostly played on Desktop, we opt out of the autoplay policy fix as described in https://github.com/remotion-dev/remotion/pull/554, as it mostly applies to mobile.
                        numberOfAudioTags: 0, children: children }) }) }) }) }));
};
exports.RemotionRoot = RemotionRoot;
