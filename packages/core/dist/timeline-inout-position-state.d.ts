import type React from 'react';
export declare type TimelineInOutContextValue = {
    inFrame: number | null;
    outFrame: number | null;
};
export declare type SetTimelineInOutContextValue = {
    setInAndOutFrames: (u: React.SetStateAction<TimelineInOutContextValue>) => void;
};
export declare const TimelineInOutContext: React.Context<TimelineInOutContextValue>;
export declare const SetTimelineInOutContext: React.Context<SetTimelineInOutContextValue>;
export declare const useTimelineInOutFramePosition: () => TimelineInOutContextValue;
export declare const useTimelineSetInOutFramePosition: () => SetTimelineInOutContextValue;
