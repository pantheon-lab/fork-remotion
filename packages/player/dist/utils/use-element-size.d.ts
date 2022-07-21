export declare type Size = {
    width: number;
    height: number;
    left: number;
    top: number;
};
export declare const updateAllElementsSizes: () => void;
export declare const useElementSize: (ref: React.RefObject<HTMLElement>, options: {
    triggerOnWindowResize: boolean;
    shouldApplyCssTransforms: boolean;
}) => Size | null;
