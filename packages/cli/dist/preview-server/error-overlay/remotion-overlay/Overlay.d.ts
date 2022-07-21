import React from 'react';
declare type SetErrors = {
    setErrors: (errs: State) => void;
    addError: (err: Error) => void;
};
export declare const setErrorsRef: React.RefObject<SetErrors>;
declare type State = {
    type: 'clear';
} | {
    type: 'errors';
    errors: Error[];
};
export declare const Overlay: React.FC;
export {};
