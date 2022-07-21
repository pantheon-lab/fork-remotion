"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.PlayerFn = exports.componentOrNullIfLazy = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const emitter_context_1 = require("./emitter-context");
const event_emitter_1 = require("./event-emitter");
const player_css_classname_1 = require("./player-css-classname");
const PlayerUI_1 = __importDefault(require("./PlayerUI"));
const validate_playbackrate_1 = require("./utils/validate-playbackrate");
const volume_persistance_1 = require("./volume-persistance");
remotion_1.Internals.CSSUtils.injectCSS(remotion_1.Internals.CSSUtils.makeDefaultCSS(`.${player_css_classname_1.PLAYER_CSS_CLASSNAME}`, '#fff'));
const componentOrNullIfLazy = (props) => {
    if ('component' in props) {
        return props.component;
    }
    return null;
};
exports.componentOrNullIfLazy = componentOrNullIfLazy;
const PlayerFn = ({ durationInFrames, compositionHeight, compositionWidth, fps, inputProps, style, controls = false, loop = false, autoPlay = false, showVolumeControls = true, allowFullscreen = true, clickToPlay, doubleClickToFullscreen = false, spaceKeyToPlayOrPause = true, moveToBeginningWhenEnded = true, numberOfSharedAudioTags = 5, errorFallback = () => '⚠️', playbackRate = 1, renderLoading, className, ...componentProps }, ref) => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        (0, react_1.useLayoutEffect)(() => {
            window.remotion_isPlayer = true;
        }, []);
    }
    // @ts-expect-error
    if (componentProps.defaultProps !== undefined) {
        throw new Error('The <Player /> component does not accept `defaultProps`, but some were passed. Use `inputProps` instead.');
    }
    const componentForValidation = (0, exports.componentOrNullIfLazy)(componentProps);
    // @ts-expect-error
    if ((componentForValidation === null || componentForValidation === void 0 ? void 0 : componentForValidation.type) === remotion_1.Composition) {
        throw new TypeError(`'component' should not be an instance of <Composition/>. Pass the React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
    }
    if (componentForValidation === remotion_1.Composition) {
        throw new TypeError(`'component' must not be the 'Composition' component. Pass your own React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
    }
    const component = remotion_1.Internals.useLazyComponent(componentProps);
    const [frame, setFrame] = (0, react_1.useState)(0);
    const [playing, setPlaying] = (0, react_1.useState)(false);
    const [rootId] = (0, react_1.useState)('player-comp');
    const [emitter] = (0, react_1.useState)(() => new event_emitter_1.PlayerEmitter());
    const rootRef = (0, react_1.useRef)(null);
    const [mediaMuted, setMediaMuted] = (0, react_1.useState)(false);
    const [mediaVolume, setMediaVolume] = (0, react_1.useState)((0, volume_persistance_1.getPreferredVolume)());
    const audioAndVideoTags = (0, react_1.useRef)([]);
    const imperativePlaying = (0, react_1.useRef)(false);
    if (typeof compositionHeight !== 'number') {
        throw new TypeError(`'compositionHeight' must be a number but got '${typeof compositionHeight}' instead`);
    }
    if (typeof compositionWidth !== 'number') {
        throw new TypeError(`'compositionWidth' must be a number but got '${typeof compositionWidth}' instead`);
    }
    remotion_1.Internals.validateDimension(compositionHeight, 'compositionHeight', 'of the <Player /> component');
    remotion_1.Internals.validateDimension(compositionWidth, 'compositionWidth', 'of the <Player /> component');
    remotion_1.Internals.validateDurationInFrames(durationInFrames, 'of the <Player/> component');
    remotion_1.Internals.validateFps(fps, 'as a prop of the <Player/> component', null);
    if (typeof controls !== 'boolean' && typeof controls !== 'undefined') {
        throw new TypeError(`'controls' must be a boolean or undefined but got '${typeof controls}' instead`);
    }
    if (typeof autoPlay !== 'boolean' && typeof autoPlay !== 'undefined') {
        throw new TypeError(`'autoPlay' must be a boolean or undefined but got '${typeof autoPlay}' instead`);
    }
    if (typeof loop !== 'boolean' && typeof loop !== 'undefined') {
        throw new TypeError(`'loop' must be a boolean or undefined but got '${typeof loop}' instead`);
    }
    if (typeof doubleClickToFullscreen !== 'boolean' &&
        typeof doubleClickToFullscreen !== 'undefined') {
        throw new TypeError(`'doubleClickToFullscreen' must be a boolean or undefined but got '${typeof doubleClickToFullscreen}' instead`);
    }
    if (typeof showVolumeControls !== 'boolean' &&
        typeof showVolumeControls !== 'undefined') {
        throw new TypeError(`'showVolumeControls' must be a boolean or undefined but got '${typeof showVolumeControls}' instead`);
    }
    if (typeof allowFullscreen !== 'boolean' &&
        typeof allowFullscreen !== 'undefined') {
        throw new TypeError(`'allowFullscreen' must be a boolean or undefined but got '${typeof allowFullscreen}' instead`);
    }
    if (typeof clickToPlay !== 'boolean' && typeof clickToPlay !== 'undefined') {
        throw new TypeError(`'clickToPlay' must be a boolean or undefined but got '${typeof clickToPlay}' instead`);
    }
    if (typeof spaceKeyToPlayOrPause !== 'boolean' &&
        typeof spaceKeyToPlayOrPause !== 'undefined') {
        throw new TypeError(`'spaceKeyToPlayOrPause' must be a boolean or undefined but got '${typeof spaceKeyToPlayOrPause}' instead`);
    }
    if (typeof numberOfSharedAudioTags !== 'number' ||
        numberOfSharedAudioTags % 1 !== 0 ||
        !Number.isFinite(numberOfSharedAudioTags) ||
        Number.isNaN(numberOfSharedAudioTags) ||
        numberOfSharedAudioTags < 0) {
        throw new TypeError(`'numberOfSharedAudioTags' must be an integer but got '${numberOfSharedAudioTags}' instead`);
    }
    (0, validate_playbackrate_1.validatePlaybackRate)(playbackRate);
    (0, react_1.useEffect)(() => {
        emitter.dispatchRatechange(playbackRate);
    }, [emitter, playbackRate]);
    const setMediaVolumeAndPersist = (0, react_1.useCallback)((vol) => {
        setMediaVolume(vol);
        (0, volume_persistance_1.persistVolume)(vol);
    }, []);
    (0, react_1.useImperativeHandle)(ref, () => rootRef.current);
    const timelineContextValue = (0, react_1.useMemo)(() => {
        return {
            frame,
            playing,
            rootId,
            shouldRegisterSequences: false,
            playbackRate,
            imperativePlaying,
            setPlaybackRate: () => {
                throw new Error('playback rate');
            },
            audioAndVideoTags,
        };
    }, [frame, playbackRate, playing, rootId]);
    const setTimelineContextValue = (0, react_1.useMemo)(() => {
        return {
            setFrame,
            setPlaying,
        };
    }, [setFrame]);
    const mediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            mediaMuted,
            mediaVolume,
        };
    }, [mediaMuted, mediaVolume]);
    const setMediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            setMediaMuted,
            setMediaVolume: setMediaVolumeAndPersist,
        };
    }, [setMediaVolumeAndPersist]);
    const compositionManagerContext = (0, react_1.useMemo)(() => {
        return {
            compositions: [
                {
                    component: component,
                    durationInFrames,
                    height: compositionHeight,
                    width: compositionWidth,
                    fps,
                    id: 'player-comp',
                    props: inputProps,
                    nonce: 777,
                    scale: 1,
                    folderName: null,
                    defaultProps: undefined,
                    parentFolderName: null,
                },
            ],
            folders: [],
            registerFolder: () => undefined,
            unregisterFolder: () => undefined,
            currentComposition: 'player-comp',
            registerComposition: () => undefined,
            registerSequence: () => undefined,
            sequences: [],
            setCurrentComposition: () => undefined,
            unregisterComposition: () => undefined,
            unregisterSequence: () => undefined,
            registerAsset: () => undefined,
            unregisterAsset: () => undefined,
            assets: [],
        };
    }, [
        component,
        durationInFrames,
        compositionHeight,
        compositionWidth,
        fps,
        inputProps,
    ]);
    const passedInputProps = (0, react_1.useMemo)(() => {
        return inputProps !== null && inputProps !== void 0 ? inputProps : {};
    }, [inputProps]);
    return ((0, jsx_runtime_1.jsx)(remotion_1.Internals.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.Timeline.TimelineContext.Provider, { value: timelineContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.Timeline.SetTimelineContext.Provider, { value: setTimelineContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.CompositionManager.Provider, { value: compositionManagerContext, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.MediaVolumeContext.Provider, { value: mediaVolumeContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.SetMediaVolumeContext.Provider, { value: setMediaVolumeContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.SharedAudioContextProvider, { numberOfAudioTags: numberOfSharedAudioTags, children: (0, jsx_runtime_1.jsx)(emitter_context_1.PlayerEventEmitterContext.Provider, { value: emitter, children: (0, jsx_runtime_1.jsx)(PlayerUI_1.default, { ref: rootRef, renderLoading: renderLoading, autoPlay: Boolean(autoPlay), loop: Boolean(loop), controls: Boolean(controls), errorFallback: errorFallback, style: style, inputProps: passedInputProps, allowFullscreen: Boolean(allowFullscreen), moveToBeginningWhenEnded: Boolean(moveToBeginningWhenEnded), clickToPlay: typeof clickToPlay === 'boolean'
                                            ? clickToPlay
                                            : Boolean(controls), showVolumeControls: Boolean(showVolumeControls), setMediaVolume: setMediaVolumeAndPersist, mediaVolume: mediaVolume, mediaMuted: mediaMuted, doubleClickToFullscreen: Boolean(doubleClickToFullscreen), setMediaMuted: setMediaMuted, spaceKeyToPlayOrPause: Boolean(spaceKeyToPlayOrPause), playbackRate: playbackRate, className: className !== null && className !== void 0 ? className : undefined }) }) }) }) }) }) }) }) }));
};
exports.PlayerFn = PlayerFn;
exports.Player = (0, react_1.forwardRef)(exports.PlayerFn);
