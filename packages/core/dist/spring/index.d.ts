import type { SpringConfig } from './spring-utils';
/**
 * Calculates a position based on physical parameters, start and end value, and time.
 * @link https://www.remotion.dev/docs/spring
 * @param {number} frame The current time value. Most of the time you want to pass in the return value of useCurrentFrame.
 * @param {number} fps The framerate at which the animation runs. Pass in the value obtained by `useVideoConfig()`.
 * @param {?Object} config optional object that allows you to customize the physical properties of the animation.
 * @param {number} [config.mass=1] The weight of the spring. If you reduce the mass, the animation becomes faster!
 * @param {number} [config.damping=10] How hard the animation decelerates.
 * @param {number} [config.stiffness=100] Affects bounciness of the animation.
 * @param {boolean} [config.overshootClamping=false] Whether to prevent the animation going beyond the target value.
 * @param {?number} [config.from] The initial value of the animation. Default `0`
 * @param {?number} [config.to] The end value of the animation. Default `1`
 * @param {?number} [config.durationInFrames] Stretch the duration of an animation to  a set value.. Default `undefined`
 * @param {?number} [config.durationThreshold] How close to the end the animation is considered to be done. Default `0.005`
 */
export declare function spring({ frame, fps, config, from, to, durationInFrames, durationRestThreshold, }: {
    frame: number;
    fps: number;
    config?: Partial<SpringConfig>;
    from?: number;
    to?: number;
    durationInFrames?: number;
    durationRestThreshold?: number;
}): number;
export { measureSpring } from './measure-spring';
export { SpringConfig } from './spring-utils';
