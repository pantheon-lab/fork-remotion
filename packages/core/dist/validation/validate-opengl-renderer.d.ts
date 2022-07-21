declare const validRenderers: readonly ["swangle", "angle", "egl", "swiftshader"];
export declare type OpenGlRenderer = typeof validRenderers[number];
export declare const validateOpenGlRenderer: (option: OpenGlRenderer | null) => OpenGlRenderer | null;
export {};
