"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVideoTexture = void 0;
const react_1 = __importStar(require("react"));
const remotion_1 = require("remotion");
const three_1 = require("three");
let warned = false;
const warnAboutRequestVideoFrameCallback = () => {
    if (warned) {
        return false;
    }
    warned = true;
    console.warn('Browser does not support requestVideoFrameCallback. Cannot display video.');
};
const useVideoTexture = (videoRef) => {
    const [loaded] = (0, react_1.useState)(() => (0, remotion_1.delayRender)(`Waiting for texture in useVideoTexture() to be loaded`));
    const [videoTexture, setVideoTexture] = (0, react_1.useState)(null);
    const frame = (0, remotion_1.useCurrentFrame)();
    const onReady = (0, react_1.useCallback)(() => {
        if (!videoRef.current) {
            throw new Error('Video not ready');
        }
        const vt = new three_1.VideoTexture(videoRef.current);
        videoRef.current.width = videoRef.current.videoWidth;
        videoRef.current.height = videoRef.current.videoHeight;
        setVideoTexture(vt);
        (0, remotion_1.continueRender)(loaded);
    }, [loaded, videoRef]);
    react_1.default.useEffect(() => {
        if (!videoRef.current) {
            return;
        }
        if (videoRef.current.readyState >= 2) {
            onReady();
            return;
        }
        videoRef.current.addEventListener('loadeddata', () => {
            onReady();
        }, { once: true });
    }, [loaded, onReady, videoRef]);
    react_1.default.useEffect(() => {
        const { current } = videoRef;
        if (!current) {
            return;
        }
        if (!current.requestVideoFrameCallback) {
            warnAboutRequestVideoFrameCallback();
            return;
        }
        const ready = () => {
            // Now force a new render so the latest video frame shows up in the canvas
            // Allow remotion to continue
        };
        current.requestVideoFrameCallback(ready);
    }, [frame, loaded, videoRef]);
    if (typeof HTMLVideoElement === 'undefined' ||
        !HTMLVideoElement.prototype.requestVideoFrameCallback) {
        (0, remotion_1.continueRender)(loaded);
        return null;
    }
    return videoTexture;
};
exports.useVideoTexture = useVideoTexture;
