/**
 * Get the audio file passed in parameter duration in seconds
 * @async
 * @param src path to the audio file
 * @return {number} duration of the audio file in seconds
 */
export declare const getAudioDurationInSeconds: (src: string) => Promise<number>;
/**
 * @deprecated Renamed to `getAudioDurationInSeconds`
 */
export declare const getAudioDuration: (src: string) => Promise<number>;
