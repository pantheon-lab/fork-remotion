import React from 'react';
import type { Video } from 'remotion';
import { VideoTexture } from 'three';
export declare type UseVideoTextureOptions = React.ComponentProps<typeof Video>;
export declare const useVideoTexture: (videoRef: React.RefObject<HTMLVideoElement>) => VideoTexture | null;
