"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackKeyboardShortcutsManager = void 0;
const player_1 = require("@remotion/player");
const react_1 = require("react");
const use_keybinding_1 = require("../helpers/use-keybinding");
const PlaybackKeyboardShortcutsManager = ({ setPlaybackRate }) => {
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    const { play, pause, playing } = player_1.PlayerInternals.usePlayer();
    const onJKey = (0, react_1.useCallback)(() => {
        setPlaybackRate((prevPlaybackRate) => {
            if (!playing) {
                return -1;
            }
            if (prevPlaybackRate > 0) {
                return -1;
            }
            if (prevPlaybackRate === -1) {
                return -2;
            }
            if (prevPlaybackRate === -2) {
                return -4;
            }
            if (prevPlaybackRate === -4) {
                return -4;
            }
            throw new Error('unexpected previous playrate when pressing J: ' + prevPlaybackRate);
        });
        play();
    }, [play, playing, setPlaybackRate]);
    const onKKey = (0, react_1.useCallback)(() => {
        setPlaybackRate(1);
        pause();
    }, [pause, setPlaybackRate]);
    const onLKey = (0, react_1.useCallback)(() => {
        setPlaybackRate((prevPlaybackRate) => {
            if (!playing) {
                return 1;
            }
            if (prevPlaybackRate < 0) {
                return 1;
            }
            if (prevPlaybackRate === 1) {
                return 2;
            }
            if (prevPlaybackRate === 2) {
                return 4;
            }
            if (prevPlaybackRate === 4) {
                return 4;
            }
            throw new Error('unexpected previous playrate when pressing L: ' + prevPlaybackRate);
        });
        play();
    }, [play, playing, setPlaybackRate]);
    (0, react_1.useEffect)(() => {
        const jKey = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'j',
            callback: onJKey,
            commandCtrlKey: false,
        });
        const kKey = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'k',
            callback: onKKey,
            commandCtrlKey: false,
        });
        const lKey = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'l',
            callback: onLKey,
            commandCtrlKey: false,
        });
        return () => {
            jKey.unregister();
            kKey.unregister();
            lKey.unregister();
        };
    }, [keybindings, onJKey, onKKey, onLKey]);
    return null;
};
exports.PlaybackKeyboardShortcutsManager = PlaybackKeyboardShortcutsManager;
