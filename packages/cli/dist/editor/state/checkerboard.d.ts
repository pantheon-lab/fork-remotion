/// <reference types="react" />
declare type State = {
    checkerboard: boolean;
    setCheckerboard: (cb: (prevState: boolean) => boolean) => void;
};
export declare const persistCheckerboardOption: (option: boolean) => void;
export declare const loadCheckerboardOption: () => boolean;
export declare const CheckerboardContext: import("react").Context<State>;
export {};
