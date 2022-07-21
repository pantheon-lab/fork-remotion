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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const alias_1 = require("lib/alias");
const remotion_1 = require("remotion");
const _22KhzAudio_1 = require("./22KhzAudio");
const BetaText_1 = __importDefault(require("./BetaText"));
const ColorInterpolation_1 = require("./ColorInterpolation");
const Context_1 = require("./Context");
const CorruptVideo_1 = __importDefault(require("./CorruptVideo"));
const ErrorOnFrame10_1 = require("./ErrorOnFrame10");
const Fonts_1 = require("./Fonts");
const Framer_1 = require("./Framer");
const FreezeExample_1 = require("./Freeze/FreezeExample");
const ManyAudio_1 = require("./ManyAudio");
const MissingImg_1 = require("./MissingImg");
const OffthreadRemoteVideo_1 = require("./OffthreadRemoteVideo/OffthreadRemoteVideo");
const Orb_1 = require("./Orb");
const ReallyLongVideo_1 = __importDefault(require("./ReallyLongVideo"));
const RemoteVideo_1 = __importDefault(require("./RemoteVideo"));
const Scripts_1 = require("./Scripts");
const SkipZeroFrame_1 = require("./SkipZeroFrame");
const base_spring_1 = require("./Spring/base-spring");
const StaggerTesting_1 = require("./StaggerTesting");
const StaticServer_1 = require("./StaticServer");
const TenFrameTester_1 = require("./TenFrameTester");
const ThreeBasic_1 = __importDefault(require("./ThreeBasic"));
const VideoOnCanvas_1 = require("./VideoOnCanvas");
const greenscreen_1 = require("./VideoOnCanvas/greenscreen");
const VideoSpeed_1 = require("./VideoSpeed");
const VideoTesting_1 = require("./VideoTesting");
if (alias_1.alias !== 'alias') {
    throw new Error('should support TS aliases');
}
// Use it to test that UI does not regress on weird CSS
// import './weird-css.css';
const Index = () => {
    var _a;
    const inputProps = (0, remotion_1.getInputProps)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "components", children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "iframe", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./IframeTest'))), width: 1080, height: 1080, fps: 30, durationInFrames: 10 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "looped", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./LoopedVideo'))), durationInFrames: 200, fps: 60, height: 1080, width: 1080 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "gif", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./GifTest'))), width: 1080, height: 1080, fps: 30, durationInFrames: 150 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "stagger-test", component: StaggerTesting_1.SeriesTesting, width: 1280, height: 720, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "freeze-example", component: FreezeExample_1.FreezeExample, width: 1280, height: 720, fps: 30, durationInFrames: 300 })] }), (0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "spring", children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "base-spring", component: base_spring_1.BaseSpring, width: 1080, height: 1080, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "spring-with-duration", component: base_spring_1.SpringWithDuration, width: 1080, height: 1080, fps: 30, durationInFrames: 100 })] }), (0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "regression-testing", children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "missing-img", component: MissingImg_1.MissingImg, width: 1080, height: 1080, fps: 30, durationInFrames: 10 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "ten-frame-tester", component: TenFrameTester_1.TenFrameTester, width: 1080, height: 1080, fps: 30, durationInFrames: 10 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "framer", component: Framer_1.Framer, width: 1080, height: 1080, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "skip-zero-frame", component: SkipZeroFrame_1.SkipZeroFrame, width: 1280, height: 720, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "scripts", component: Scripts_1.Scripts, width: 1280, height: 720, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "many-audio", component: ManyAudio_1.ManyAudio, width: 1280, height: 720, fps: 30, durationInFrames: 30 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "error-on-frame-10", component: ErrorOnFrame10_1.ErrorOnFrame10, width: 1280, height: 720, fps: 30, durationInFrames: 1000000 }), (0, jsx_runtime_1.jsx)(Context_1.MyCtx.Provider, { value: {
                            hi: () => 'hithere',
                        }, children: (0, jsx_runtime_1.jsx)(remotion_1.Still, { id: "wrapped-in-context", component: Context_1.WrappedInContext, width: 1280, height: 720 }) })] }), (0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "creatives", children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "drop-dots", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./DropDots/DropDots'))), width: 1080, height: 1080, fps: 30, durationInFrames: 180 * 30 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "tiles", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./Tiles'))), width: 1080, height: 1920, fps: 30, durationInFrames: 90 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "title", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./Title'))), width: 1080, height: 1920, fps: 30, durationInFrames: 90, defaultProps: {
                            line1: 'Test',
                            line2: 'text',
                        } }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "beta-text", component: BetaText_1.default, width: 1080, height: 1080, fps: 30, durationInFrames: 3 * 30, defaultProps: {
                            word1: (0, remotion_1.getInputProps)().word1,
                        } }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "react-svg", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./ReactSvg'))), width: 1920, height: 1080, fps: 60, durationInFrames: 300, defaultProps: {
                            transparent: true,
                        } })] }), (0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "video-tests", children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-testing-mp4", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, durationInFrames: 100, defaultProps: {
                            offthread: false,
                            codec: 'mp4',
                        } }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-testing-mp4-offthread", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, durationInFrames: 100, defaultProps: {
                            offthread: true,
                            codec: 'mp4',
                        } }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "OffthreadRemoteVideo", component: OffthreadRemoteVideo_1.OffthreadRemoteVideo, width: 1080, height: 1080, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-testing-webm", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, durationInFrames: 100, defaultProps: {
                            offthread: false,
                            codec: 'webm',
                        } }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-testing-webm-offthread", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, durationInFrames: 100, defaultProps: {
                            offthread: true,
                            codec: 'webm',
                        } }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "remote-video", component: RemoteVideo_1.default, width: 1280, height: 720, fps: 30, durationInFrames: 600 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "corrupt-video", component: CorruptVideo_1.default, width: 1280, height: 720, fps: 30, durationInFrames: 2000 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "2hrvideo", component: ReallyLongVideo_1.default, width: 1920, height: 1080, fps: 30, durationInFrames: 2 * 60 * 60 * 30 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-speed", component: VideoSpeed_1.VideoSpeed, width: 1280, height: 720, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "video-on-canvas", component: VideoOnCanvas_1.VideoOnCanvas, width: 1920, height: 1080, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "greenscreen", component: greenscreen_1.Greenscreen, width: 1920, height: 1080, fps: 30, durationInFrames: 100 })] }), (0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "features", children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "mdx-test", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./MdxTest'))), width: 1080, height: 1080, fps: 30, durationInFrames: 30 * 30 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "color-interpolation", component: ColorInterpolation_1.ColorInterpolation, width: 1280, height: 720, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Still, { id: "static-demo", component: StaticServer_1.StaticDemo, width: 1000, height: 1000 }), (0, jsx_runtime_1.jsx)(remotion_1.Still, { id: "font-demo", component: Fonts_1.FontDemo, width: 1000, height: 1000 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "dynamic-duration", component: VideoTesting_1.VideoTesting, width: 1080, height: 1080, fps: 30, 
                        // Change the duration of the video dynamically by passing
                        // `--props='{"duration": 100}'`
                        durationInFrames: (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps.duration) !== null && _a !== void 0 ? _a : 20 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "nested", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./NestedSequences'))), durationInFrames: 200, fps: 60, height: 1080, width: 1080 })] }), (0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "audio-tests", children: [(0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "22khz", component: _22KhzAudio_1.TwentyTwoKHzAudio, width: 1920, height: 1080, fps: 30, durationInFrames: 90 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "offline-audio-buffer", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./OfflineAudioBuffer'))), width: 1080, height: 1080, fps: 30, durationInFrames: 100 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "audio-testing-mute", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./AudioTestingMute'))), width: 1080, height: 1080, fps: 30, durationInFrames: 300 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "audio-testing", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./AudioTesting'))), width: 1080, height: 1080, fps: 30, durationInFrames: 300 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "audio-testing-base64", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./AudioTesting/Base64'))), width: 1080, height: 1080, fps: 30, durationInFrames: 300 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "audio-visualization", lazyComponent: () => Promise.resolve().then(() => __importStar(require('./AudioVisualization'))), width: 1080, height: 1080, fps: 30, durationInFrames: 180 * 30 })] }), (0, jsx_runtime_1.jsxs)(remotion_1.Folder, { name: "three", children: [(0, jsx_runtime_1.jsx)(remotion_1.Still, { id: "Orb", component: Orb_1.OrbScene, width: 2000, height: 2000 }), (0, jsx_runtime_1.jsx)(remotion_1.Composition, { id: "three-basic", component: ThreeBasic_1.default, width: 1280, height: 720, fps: 30, durationInFrames: 600 })] })] }));
};
exports.Index = Index;
