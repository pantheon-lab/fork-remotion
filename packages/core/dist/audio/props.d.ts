/// <reference types="react" />
import type { VolumeProp } from '../volume-prop';
export declare type RemotionMainAudioProps = {
    startFrom?: number;
    endAt?: number;
};
export declare type RemotionAudioProps = Omit<React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>, 'autoPlay' | 'controls' | 'loop' | 'onEnded'> & {
    volume?: VolumeProp;
    playbackRate?: number;
};
