export declare type CountType = 'from-zero' | 'actual-frames';
export declare const getFrameOutputFileName: ({ index, frame, imageFormat, countType, lastFrame, totalFrames, }: {
    index: number;
    frame: number;
    imageFormat: 'png' | 'jpeg';
    countType: CountType;
    lastFrame: number;
    totalFrames: number;
}) => string;
export declare const getFilePadLength: ({ lastFrame, totalFrames, countType, }: {
    lastFrame: number;
    totalFrames: number;
    countType: CountType;
}) => number;
