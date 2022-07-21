"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const remotion_1 = require("remotion");
const colors_1 = require("../helpers/colors");
const noop_1 = require("../helpers/noop");
const checkerboard_1 = require("../state/checkerboard");
const folders_1 = require("../state/folders");
const highest_z_index_1 = require("../state/highest-z-index");
const keybindings_1 = require("../state/keybindings");
const modals_1 = require("../state/modals");
const mute_1 = require("../state/mute");
const preview_size_1 = require("../state/preview-size");
const rich_timeline_1 = require("../state/rich-timeline");
const sidebar_1 = require("../state/sidebar");
const z_index_1 = require("../state/z-index");
const EditorContent_1 = require("./EditorContent");
const FramePersistor_1 = require("./FramePersistor");
const GlobalKeybindings_1 = require("./GlobalKeybindings");
const KeyboardShortcutsModal_1 = require("./KeyboardShortcutsModal");
const NewComposition_1 = __importDefault(require("./NewComposition/NewComposition"));
const NoRegisterRoot_1 = require("./NoRegisterRoot");
const NotificationCenter_1 = require("./Notifications/NotificationCenter");
const UpdateModal_1 = require("./UpdateModal/UpdateModal");
const background = {
    backgroundColor: colors_1.BACKGROUND,
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
};
const Editor = () => {
    const [emitter] = (0, react_1.useState)(() => new player_1.PlayerInternals.PlayerEmitter());
    const [size, setSizeState] = (0, react_1.useState)(() => (0, preview_size_1.loadPreviewSizeOption)());
    const [Root, setRoot] = (0, react_1.useState)(() => remotion_1.Internals.getRoot());
    const [waitForRoot] = (0, react_1.useState)(() => {
        if (Root) {
            return 0;
        }
        return (0, remotion_1.delayRender)('Waiting for registerRoot()');
    });
    const [checkerboard, setCheckerboardState] = (0, react_1.useState)(() => (0, checkerboard_1.loadCheckerboardOption)());
    const setCheckerboard = (0, react_1.useCallback)((newValue) => {
        setCheckerboardState((prevState) => {
            const newVal = newValue(prevState);
            (0, checkerboard_1.persistCheckerboardOption)(newVal);
            return newVal;
        });
    }, []);
    const [richTimeline, setRichTimelineState] = (0, react_1.useState)(() => (0, rich_timeline_1.loadRichTimelineOption)());
    const setRichTimeline = (0, react_1.useCallback)((newValue) => {
        setRichTimelineState((prevState) => {
            const newVal = newValue(prevState);
            (0, rich_timeline_1.persistRichTimelineOption)(newVal);
            return newVal;
        });
    }, []);
    const setSize = (0, react_1.useCallback)((newValue) => {
        setSizeState((prevState) => {
            const newVal = newValue(prevState);
            (0, preview_size_1.persistPreviewSizeOption)(newVal);
            return newVal;
        });
    }, []);
    const [inAndOutFrames, setInAndOutFrames] = (0, react_1.useState)({
        inFrame: null,
        outFrame: null,
    });
    const [mediaMuted, setMediaMuted] = (0, react_1.useState)(() => (0, mute_1.loadMuteOption)());
    const [mediaVolume, setMediaVolume] = (0, react_1.useState)(1);
    const [modalContextType, setModalContextType] = (0, react_1.useState)(null);
    const previewSizeCtx = (0, react_1.useMemo)(() => {
        return {
            size,
            setSize,
        };
    }, [setSize, size]);
    const checkerboardCtx = (0, react_1.useMemo)(() => {
        return {
            checkerboard,
            setCheckerboard,
        };
    }, [checkerboard, setCheckerboard]);
    const richTimelineCtx = (0, react_1.useMemo)(() => {
        return {
            richTimeline,
            setRichTimeline,
        };
    }, [richTimeline, setRichTimeline]);
    const timelineInOutContextValue = (0, react_1.useMemo)(() => {
        return inAndOutFrames;
    }, [inAndOutFrames]);
    const setTimelineInOutContextValue = (0, react_1.useMemo)(() => {
        return {
            setInAndOutFrames,
        };
    }, []);
    const mediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            mediaMuted,
            mediaVolume,
        };
    }, [mediaMuted, mediaVolume]);
    const setMediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            setMediaMuted,
            setMediaVolume,
        };
    }, []);
    const modalsContext = (0, react_1.useMemo)(() => {
        return {
            selectedModal: modalContextType,
            setSelectedModal: setModalContextType,
        };
    }, [modalContextType]);
    (0, react_1.useEffect)(() => {
        if (Root) {
            return;
        }
        const cleanup = remotion_1.Internals.waitForRoot((NewRoot) => {
            setRoot(() => NewRoot);
            (0, remotion_1.continueRender)(waitForRoot);
        });
        return () => cleanup();
    }, [Root, waitForRoot]);
    return ((0, jsx_runtime_1.jsx)(keybindings_1.KeybindingContextProvider, { children: (0, jsx_runtime_1.jsx)(rich_timeline_1.RichTimelineContext.Provider, { value: richTimelineCtx, children: (0, jsx_runtime_1.jsx)(checkerboard_1.CheckerboardContext.Provider, { value: checkerboardCtx, children: (0, jsx_runtime_1.jsx)(preview_size_1.PreviewSizeContext.Provider, { value: previewSizeCtx, children: (0, jsx_runtime_1.jsx)(modals_1.ModalsContext.Provider, { value: modalsContext, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.Timeline.TimelineInOutContext.Provider, { value: timelineInOutContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.Timeline.SetTimelineInOutContext.Provider, { value: setTimelineInOutContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.MediaVolumeContext.Provider, { value: mediaVolumeContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.SetMediaVolumeContext.Provider, { value: setMediaVolumeContextValue, children: (0, jsx_runtime_1.jsx)(player_1.PlayerInternals.PlayerEventEmitterContext.Provider, { value: emitter, children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarContextProvider, { children: (0, jsx_runtime_1.jsx)(folders_1.FolderContextProvider, { children: (0, jsx_runtime_1.jsx)(highest_z_index_1.HighestZIndexProvider, { children: (0, jsx_runtime_1.jsxs)(z_index_1.HigherZIndex, { onEscape: noop_1.noop, onOutsideClick: noop_1.noop, children: [(0, jsx_runtime_1.jsxs)("div", { style: background, children: [Root === null ? null : (0, jsx_runtime_1.jsx)(Root, {}), (0, jsx_runtime_1.jsxs)(remotion_1.Internals.CanUseRemotionHooksProvider, { children: [(0, jsx_runtime_1.jsx)(FramePersistor_1.FramePersistor, {}), Root === null ? ((0, jsx_runtime_1.jsx)(NoRegisterRoot_1.NoRegisterRoot, {})) : ((0, jsx_runtime_1.jsx)(EditorContent_1.EditorContent, {})), (0, jsx_runtime_1.jsx)(GlobalKeybindings_1.GlobalKeybindings, {})] })] }), (0, jsx_runtime_1.jsx)(NotificationCenter_1.NotificationCenter, {}), modalContextType &&
                                                                    modalContextType.type === 'new-comp' && ((0, jsx_runtime_1.jsx)(NewComposition_1.default, { initialCompType: modalContextType.compType })), modalContextType &&
                                                                    modalContextType.type === 'update' && ((0, jsx_runtime_1.jsx)(UpdateModal_1.UpdateModal, { info: modalContextType.info })), modalContextType &&
                                                                    modalContextType.type === 'shortcuts' && ((0, jsx_runtime_1.jsx)(KeyboardShortcutsModal_1.KeyboardShortcuts, {}))] }) }) }) }) }) }) }) }) }) }) }) }) }) }));
};
exports.Editor = Editor;
