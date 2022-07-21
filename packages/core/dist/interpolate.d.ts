declare type ExtrapolateType = 'extend' | 'identity' | 'clamp';
/**
 * Map a value from an input range to an output range.
 * @link https://www.remotion.dev/docs/interpolate
 * @param {!number} input value to interpolate
 * @param {!number[]} inputRange range of values that you expect the input to assume.
 * @param {!number[]} outputRange range of output values that you want the input to map to.
 * @param {?object} options
 * @param {?Function} options.easing easing function which allows you to customize the input, for example to apply a certain easing function. By default, the input is left unmodified, resulting in a pure linear interpolation {@link https://www.remotion.dev/docs/easing}
 * @param {string=} [options.extrapolateLeft="extend"] What should happen if the input value is outside left the input range, default: "extend" {@link https://www.remotion.dev/docs/interpolate#extrapolateleft}
 * @param {string=} [options.extrapolateRight="extend"] Same as extrapolateLeft, except for values outside right the input range {@link https://www.remotion.dev/docs/interpolate#extrapolateright}
 */
export declare function interpolate(input: number, inputRange: readonly number[], outputRange: readonly number[], options?: {
    easing?: (input: number) => number;
    extrapolateLeft?: ExtrapolateType;
    extrapolateRight?: ExtrapolateType;
}): number;
export {};
