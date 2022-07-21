declare const lambdaCodecs: readonly ["h264-mkv", "h264", "vp8", "mp3", "aac", "wav", "gif"];
export declare type LambdaCodec = typeof lambdaCodecs[number];
export declare const validateLambdaCodec: (codec: unknown) => LambdaCodec;
export {};
