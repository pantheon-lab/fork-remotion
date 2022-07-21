declare type SeekPayload = {
    frame: number;
};
declare type ErrorPayload = {
    error: Error;
};
declare type TimeUpdateEventPayload = {
    frame: number;
};
declare type RateChangeEventPayload = {
    playbackRate: number;
};
declare type StateEventMap = {
    seeked: SeekPayload;
    pause: undefined;
    play: undefined;
    ratechange: RateChangeEventPayload;
    ended: undefined;
    error: ErrorPayload;
    timeupdate: TimeUpdateEventPayload;
};
export declare type EventTypes = keyof StateEventMap;
export declare type CallbackListener<T extends EventTypes> = (data: {
    detail: StateEventMap[T];
}) => void;
declare type Listeners = {
    [EventType in EventTypes]: CallbackListener<EventType>[];
};
export declare class PlayerEmitter {
    listeners: Listeners;
    addEventListener<Q extends EventTypes>(name: Q, callback: CallbackListener<Q>): void;
    removeEventListener<Q extends EventTypes>(name: Q, callback: CallbackListener<Q>): void;
    private dispatchEvent;
    dispatchSeek(frame: number): void;
    dispatchPause(): void;
    dispatchPlay(): void;
    dispatchEnded(): void;
    dispatchRatechange(playbackRate: number): void;
    dispatchError(error: Error): void;
    dispatchTimeUpdate(event: TimeUpdateEventPayload): void;
}
export {};
