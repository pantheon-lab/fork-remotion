import type { KeyEventType } from '../state/keybindings';
export declare const useKeybinding: () => {
    registerKeybinding: (options: {
        event: KeyEventType;
        key: string;
        commandCtrlKey: boolean;
        callback: (e: KeyboardEvent) => void;
    }) => {
        unregister: () => void;
    };
    isHighestContext: boolean;
};
