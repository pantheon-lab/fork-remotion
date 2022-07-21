"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalKeybindings = void 0;
const react_1 = require("react");
const use_keybinding_1 = require("../helpers/use-keybinding");
const checkerboard_1 = require("../state/checkerboard");
const modals_1 = require("../state/modals");
const GlobalKeybindings = () => {
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const { setCheckerboard } = (0, react_1.useContext)(checkerboard_1.CheckerboardContext);
    (0, react_1.useEffect)(() => {
        const nKey = keybindings.registerKeybinding({
            event: 'keypress',
            key: 'n',
            callback: () => {
                setSelectedModal({
                    type: 'new-comp',
                    compType: 'composition',
                });
            },
            commandCtrlKey: false,
        });
        const cKey = keybindings.registerKeybinding({
            event: 'keypress',
            key: 't',
            callback: () => {
                setCheckerboard((c) => !c);
            },
            commandCtrlKey: true,
        });
        const questionMark = keybindings.registerKeybinding({
            event: 'keypress',
            key: '?',
            callback: () => {
                setSelectedModal({
                    type: 'shortcuts',
                });
            },
            commandCtrlKey: false,
        });
        return () => {
            nKey.unregister();
            cKey.unregister();
            questionMark.unregister();
        };
    }, [keybindings, setCheckerboard, setSelectedModal]);
    return null;
};
exports.GlobalKeybindings = GlobalKeybindings;
