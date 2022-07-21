import React from 'react';
import type { TSequence } from 'remotion';
import type { TimelineActionState } from './timeline-state-reducer';
export declare const TimelineListItem: React.FC<{
    sequence: TSequence;
    nestedDepth: number;
    beforeDepth: number;
    collapsed: boolean;
    dispatchStateChange: React.Dispatch<TimelineActionState>;
    hash: string;
    canCollapse: boolean;
}>;
