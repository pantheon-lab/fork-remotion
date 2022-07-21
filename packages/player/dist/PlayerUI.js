"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const remotion_1 = require("remotion");
const calculate_scale_1 = require("./calculate-scale");
const error_boundary_1 = require("./error-boundary");
const player_css_classname_1 = require("./player-css-classname");
const PlayerControls_1 = require("./PlayerControls");
const use_hover_state_1 = require("./use-hover-state");
const use_playback_1 = require("./use-playback");
const use_player_1 = require("./use-player");
const calculate_player_size_1 = require("./utils/calculate-player-size");
const is_node_1 = require("./utils/is-node");
const use_click_prevention_on_double_click_1 = require("./utils/use-click-prevention-on-double-click");
const use_element_size_1 = require("./utils/use-element-size");
const reactVersion = react_1.default.version.split('.')[0];
if (reactVersion === '0') {
    throw new Error(`Version ${reactVersion} of "react" is not supported by Remotion`);
}
const doesReactVersionSupportSuspense = parseInt(reactVersion, 10) >= 18;
const PlayerUI = ({ controls, style, loop, autoPlay, allowFullscreen, inputProps, clickToPlay, showVolumeControls, mediaVolume, mediaMuted, doubleClickToFullscreen, setMediaMuted, setMediaVolume, spaceKeyToPlayOrPause, errorFallback, playbackRate, renderLoading, className, moveToBeginningWhenEnded, }, ref) => {
    var _a, _b, _c;
    const config = remotion_1.Internals.useUnsafeVideoConfig();
    const video = remotion_1.Internals.useVideo();
    const container = (0, react_1.useRef)(null);
    const hovered = (0, use_hover_state_1.useHoverState)(container);
    const canvasSize = (0, use_element_size_1.useElementSize)(container, {
        triggerOnWindowResize: false,
        shouldApplyCssTransforms: false,
    });
    const [hasPausedToResume, setHasPausedToResume] = (0, react_1.useState)(false);
    const [shouldAutoplay, setShouldAutoPlay] = (0, react_1.useState)(autoPlay);
    const [isFullscreen, setIsFullscreen] = (0, react_1.useState)(() => false);
    (0, use_playback_1.usePlayback)({ loop, playbackRate, moveToBeginningWhenEnded });
    const player = (0, use_player_1.usePlayer)();
    (0, react_1.useEffect)(() => {
        if (hasPausedToResume && !player.playing) {
            setHasPausedToResume(false);
            player.play();
        }
    }, [hasPausedToResume, player]);
    (0, react_1.useEffect)(() => {
        const { current } = container;
        if (!current) {
            return;
        }
        const onFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === current ||
                document.webkitFullscreenElement === current);
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
        };
    }, []);
    const toggle = (0, react_1.useCallback)((e) => {
        if (player.isPlaying()) {
            player.pause();
        }
        else {
            player.play(e);
        }
    }, [player]);
    const requestFullscreen = (0, react_1.useCallback)(() => {
        if (!allowFullscreen) {
            throw new Error('allowFullscreen is false');
        }
        const supportsFullScreen = document.fullscreenEnabled || document.webkitFullscreenEnabled;
        if (!supportsFullScreen) {
            throw new Error('Browser doesnt support fullscreen');
        }
        if (!container.current) {
            throw new Error('No player ref found');
        }
        if (container.current.webkitRequestFullScreen) {
            container.current.webkitRequestFullScreen();
        }
        else {
            container.current.requestFullscreen();
        }
    }, [allowFullscreen]);
    const exitFullscreen = (0, react_1.useCallback)(() => {
        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    }, []);
    const durationInFrames = (_a = config === null || config === void 0 ? void 0 : config.durationInFrames) !== null && _a !== void 0 ? _a : 1;
    (0, react_1.useImperativeHandle)(ref, () => {
        const methods = {
            play: player.play,
            pause: player.pause,
            toggle,
            getContainerNode: () => container.current,
            getCurrentFrame: player.getCurrentFrame,
            isPlaying: () => player.playing,
            seekTo: (f) => {
                const lastFrame = durationInFrames - 1;
                const frameToSeekTo = Math.max(0, Math.min(lastFrame, f));
                if (player.isPlaying()) {
                    const pauseToResume = frameToSeekTo !== lastFrame || loop;
                    setHasPausedToResume(pauseToResume);
                    player.pause();
                }
                if (frameToSeekTo === lastFrame && !loop) {
                    player.emitter.dispatchEnded();
                }
                player.seek(frameToSeekTo);
            },
            isFullscreen: () => isFullscreen,
            requestFullscreen,
            exitFullscreen,
            getVolume: () => {
                if (mediaMuted) {
                    return 0;
                }
                return mediaVolume;
            },
            setVolume: (vol) => {
                if (typeof vol !== 'number') {
                    throw new TypeError(`setVolume() takes a number, got value of type ${typeof vol}`);
                }
                if (isNaN(vol)) {
                    throw new TypeError(`setVolume() got a number that is NaN. Volume must be between 0 and 1.`);
                }
                if (vol < 0 || vol > 1) {
                    throw new TypeError(`setVolume() got a number that is out of range. Must be between 0 and 1, got ${typeof vol}`);
                }
                setMediaVolume(vol);
            },
            isMuted: () => mediaMuted || mediaVolume === 0,
            mute: () => {
                setMediaMuted(true);
            },
            unmute: () => {
                setMediaMuted(false);
            },
        };
        return Object.assign(player.emitter, methods);
    }, [
        durationInFrames,
        exitFullscreen,
        isFullscreen,
        loop,
        mediaMuted,
        mediaVolume,
        player,
        requestFullscreen,
        setMediaMuted,
        setMediaVolume,
        toggle,
    ]);
    const VideoComponent = video ? video.component : null;
    const outerStyle = (0, react_1.useMemo)(() => {
        if (!config) {
            return {};
        }
        return {
            position: 'relative',
            overflow: 'hidden',
            ...(0, calculate_player_size_1.calculatePlayerSize)({
                compositionHeight: config.height,
                compositionWidth: config.width,
                currentSize: canvasSize,
                height: style === null || style === void 0 ? void 0 : style.height,
                width: style === null || style === void 0 ? void 0 : style.width,
            }),
            ...style,
        };
    }, [canvasSize, config, style]);
    const layout = (0, react_1.useMemo)(() => {
        if (!config || !canvasSize) {
            return null;
        }
        return (0, calculate_scale_1.calculateScale)({
            canvasSize,
            compositionHeight: config.height,
            compositionWidth: config.width,
            previewSize: 'auto',
        });
    }, [canvasSize, config]);
    const outer = (0, react_1.useMemo)(() => {
        if (!layout || !config) {
            return {};
        }
        const { centerX, centerY, scale } = layout;
        return {
            width: config.width * scale,
            height: config.height * scale,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: centerX,
            top: centerY,
            overflow: 'hidden',
        };
    }, [config, layout]);
    const containerStyle = (0, react_1.useMemo)(() => {
        if (!config || !canvasSize) {
            return {};
        }
        const { scale, xCorrection, yCorrection } = (0, calculate_scale_1.calculateScale)({
            canvasSize,
            compositionHeight: config.height,
            compositionWidth: config.width,
            previewSize: 'auto',
        });
        return {
            position: 'absolute',
            width: config.width,
            height: config.height,
            display: 'flex',
            transform: `scale(${scale})`,
            marginLeft: xCorrection,
            marginTop: yCorrection,
            overflow: 'hidden',
        };
    }, [canvasSize, config]);
    const onError = (0, react_1.useCallback)((error) => {
        player.pause();
        // Pay attention to `this context`
        player.emitter.dispatchError(error);
    }, [player]);
    const onFullscreenButtonClick = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        requestFullscreen();
    }, [requestFullscreen]);
    const onExitFullscreenButtonClick = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        exitFullscreen();
    }, [exitFullscreen]);
    const onSingleClick = (0, react_1.useCallback)((e) => {
        toggle(e);
    }, [toggle]);
    const onDoubleClick = (0, react_1.useCallback)(() => {
        if (isFullscreen) {
            exitFullscreen();
        }
        else {
            requestFullscreen();
        }
    }, [exitFullscreen, isFullscreen, requestFullscreen]);
    const [handleClick, handleDoubleClick] = (0, use_click_prevention_on_double_click_1.useClickPreventionOnDoubleClick)(onSingleClick, onDoubleClick, doubleClickToFullscreen);
    (0, react_1.useEffect)(() => {
        if (shouldAutoplay) {
            player.play();
            setShouldAutoPlay(false);
        }
    }, [shouldAutoplay, player]);
    if (!config) {
        return null;
    }
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: outer, onClick: clickToPlay ? handleClick : undefined, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : undefined, children: (0, jsx_runtime_1.jsx)("div", { style: containerStyle, className: player_css_classname_1.PLAYER_CSS_CLASSNAME, children: VideoComponent ? ((0, jsx_runtime_1.jsx)(error_boundary_1.ErrorBoundary, { onError: onError, errorFallback: errorFallback, children: (0, jsx_runtime_1.jsx)(VideoComponent, { ...((_b = video === null || video === void 0 ? void 0 : video.defaultProps) !== null && _b !== void 0 ? _b : {}), ...((_c = inputProps) !== null && _c !== void 0 ? _c : {}) }) })) : null }) }), controls ? ((0, jsx_runtime_1.jsx)(PlayerControls_1.Controls, { fps: config.fps, durationInFrames: config.durationInFrames, hovered: hovered, player: player, onFullscreenButtonClick: onFullscreenButtonClick, isFullscreen: isFullscreen, allowFullscreen: allowFullscreen, showVolumeControls: showVolumeControls, onExitFullscreenButtonClick: onExitFullscreenButtonClick, spaceKeyToPlayOrPause: spaceKeyToPlayOrPause })) : null] }));
    if (is_node_1.IS_NODE && !doesReactVersionSupportSuspense) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: container, style: outerStyle, className: className, children: content }));
    }
    const loadingMarkup = renderLoading
        ? renderLoading({
            height: outerStyle.height,
            width: outerStyle.width,
        })
        : null;
    return ((0, jsx_runtime_1.jsx)("div", { ref: container, style: outerStyle, className: className, children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: loadingMarkup, children: content }) }));
};
exports.default = (0, react_1.forwardRef)(PlayerUI);
