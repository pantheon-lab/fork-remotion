import React from 'react';
export declare const inOutHandles: React.RefObject<{
    inMarkClick: () => void;
    outMarkClick: () => void;
    clearMarks: () => void;
    setMarks: (marks: [number | null, number | null]) => void;
}>;
export declare const TimelineInOutPointToggle: React.FC;
