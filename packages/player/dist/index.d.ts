/// <reference types="react" />
import type { CallbackListener, EventTypes } from './event-emitter';
import { PlayerEmitter } from './event-emitter';
export { ErrorFallback, Player } from './Player';
export { PlayerMethods, PlayerRef } from './player-methods';
export type { RenderLoading } from './PlayerUI';
export { PreviewSize } from './utils/preview-size';
export { Size } from './utils/use-element-size';
export type { CallbackListener, EventTypes };
export declare const PlayerInternals: {
    PlayerEventEmitterContext: import("react").Context<PlayerEmitter | undefined>;
    PlayerEmitter: typeof PlayerEmitter;
    usePlayer: () => {
        frameBack: (frames: number) => void;
        frameForward: (frames: number) => void;
        isLastFrame: boolean;
        emitter: PlayerEmitter;
        playing: boolean;
        play: (e?: import("react").SyntheticEvent<Element, Event> | undefined) => void;
        pause: () => void;
        pauseAndReturnToPlayStart: () => void;
        seek: (newFrame: number) => void;
        getCurrentFrame: () => number;
        isPlaying: () => boolean;
    };
    usePlayback: ({ loop, playbackRate, moveToBeginningWhenEnded, }: {
        loop: boolean;
        playbackRate: number;
        moveToBeginningWhenEnded: boolean;
    }) => void;
    useElementSize: (ref: import("react").RefObject<HTMLElement>, options: {
        triggerOnWindowResize: boolean;
        shouldApplyCssTransforms: boolean;
    }) => import("./utils/use-element-size").Size | null;
    calculateScale: ({ previewSize, compositionWidth, compositionHeight, canvasSize, }: {
        previewSize: import("./utils/preview-size").PreviewSize;
        compositionWidth: number;
        compositionHeight: number;
        canvasSize: import("./utils/use-element-size").Size;
    }) => {
        centerX: number;
        centerY: number;
        xCorrection: number;
        yCorrection: number;
        scale: number;
    };
    useHoverState: (ref: import("react").RefObject<HTMLDivElement>) => boolean;
    updateAllElementsSizes: () => void;
};
