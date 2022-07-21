import type { SyntheticEvent } from 'react';
import type { PlayerEmitter } from './event-emitter';
declare type UsePlayerMethods = {
    frameBack: (frames: number) => void;
    frameForward: (frames: number) => void;
    isLastFrame: boolean;
    emitter: PlayerEmitter;
    playing: boolean;
    play: (e?: SyntheticEvent) => void;
    pause: () => void;
    pauseAndReturnToPlayStart: () => void;
    seek: (newFrame: number) => void;
    getCurrentFrame: () => number;
    isPlaying: () => boolean;
};
export declare const usePlayer: () => UsePlayerMethods;
export {};
