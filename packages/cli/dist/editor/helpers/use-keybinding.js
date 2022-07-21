"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeybinding = void 0;
const react_1 = require("react");
const keybindings_1 = require("../state/keybindings");
const z_index_1 = require("../state/z-index");
const useKeybinding = () => {
    const [paneId] = (0, react_1.useState)(() => String(Math.random()));
    const context = (0, react_1.useContext)(keybindings_1.KeybindingContext);
    const { isHighestContext } = (0, z_index_1.useZIndex)();
    const registerKeybinding = (0, react_1.useCallback)((options) => {
        if (!isHighestContext) {
            return {
                unregister: () => undefined,
            };
        }
        const listener = (e) => {
            const commandKey = window.navigator.platform.startsWith('Mac')
                ? e.metaKey
                : e.ctrlKey;
            if (e.key.toLowerCase() === options.key.toLowerCase() &&
                options.commandCtrlKey === commandKey) {
                options.callback(e);
                e.preventDefault();
            }
        };
        const toRegister = {
            registeredFromPane: paneId,
            event: options.event,
            key: options.key,
            callback: listener,
            id: String(Math.random()),
        };
        context.registerKeybinding(toRegister);
        return {
            unregister: () => context.unregisterKeybinding(toRegister),
        };
    }, [context, isHighestContext, paneId]);
    (0, react_1.useEffect)(() => {
        return () => {
            context.unregisterPane(paneId);
        };
    }, [context, paneId]);
    return (0, react_1.useMemo)(() => ({ registerKeybinding, isHighestContext }), [registerKeybinding, isHighestContext]);
};
exports.useKeybinding = useKeybinding;
