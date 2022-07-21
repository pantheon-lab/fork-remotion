import React from 'react';
export declare const AudioWaveform: React.FC<{
    src: string;
    visualizationWidth: number;
    fps: number;
    startFrom: number;
    durationInFrames: number;
    setMaxMediaDuration: React.Dispatch<React.SetStateAction<number>>;
    volume: string | number;
    doesVolumeChange: boolean;
}>;
