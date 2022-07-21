declare const validArchitectures: readonly ["arm64", "x86_64"];
export declare type LambdaArchitecture = typeof validArchitectures[number];
export declare const validateArchitecture: (architecture: unknown) => void;
export {};
