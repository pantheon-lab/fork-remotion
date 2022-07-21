/// <reference types="react" />
declare type RegressionTestContext = {
    hi: () => 'hithere';
};
export declare const MyCtx: import("react").Context<RegressionTestContext>;
export declare const WrappedInContext: React.FC;
export {};
