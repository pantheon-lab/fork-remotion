"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBundleModeAndUpdate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// In React 18, you should use createRoot() from "react-dom/client".
// In React 18, you should use render from "react-dom".
// We support both, but Webpack chooses both of them and normalizes them to "react-dom/client",
// hence why we import the right thing all the time but need to differentiate here
const client_1 = __importDefault(require("react-dom/client"));
const remotion_1 = require("remotion");
const bundle_mode_1 = require("./bundle-mode");
const homepage_1 = require("./homepage/homepage");
remotion_1.Internals.CSSUtils.injectCSS(remotion_1.Internals.CSSUtils.makeDefaultCSS(null, '#fff'));
const GetVideo = ({ state }) => {
    const video = remotion_1.Internals.useVideo();
    const compositions = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const portalContainer = (0, react_1.useRef)(null);
    const [handle] = (0, react_1.useState)(() => (0, remotion_1.delayRender)('Wait for Composition' + JSON.stringify(state)));
    (0, react_1.useEffect)(() => {
        return () => (0, remotion_1.continueRender)(handle);
    }, [handle]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (state.type !== 'composition') {
            return;
        }
        if (!video && compositions.compositions.length > 0) {
            const foundComposition = compositions.compositions.find((c) => c.id === state.compositionName);
            if (!foundComposition) {
                throw new Error('Found no composition with the name ' + state.compositionName);
            }
            compositions.setCurrentComposition((_a = foundComposition === null || foundComposition === void 0 ? void 0 : foundComposition.id) !== null && _a !== void 0 ? _a : null);
        }
    }, [compositions, compositions.compositions, state, video]);
    (0, react_1.useEffect)(() => {
        if (state.type === 'evaluation') {
            (0, remotion_1.continueRender)(handle);
        }
        else if (video) {
            (0, remotion_1.continueRender)(handle);
        }
    }, [handle, state.type, video]);
    (0, react_1.useEffect)(() => {
        if (!video) {
            return;
        }
        const { current } = portalContainer;
        if (!current) {
            throw new Error('portal did not render');
        }
        current.appendChild(remotion_1.Internals.portalNode());
        return () => {
            current.removeChild(remotion_1.Internals.portalNode());
        };
    }, [video]);
    if (!video) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: portalContainer, id: "remotion-canvas", style: {
            width: video.width,
            height: video.height,
            display: 'flex',
            backgroundColor: 'transparent',
        } }));
};
const videoContainer = document.getElementById('video-container');
const explainerContainer = document.getElementById('explainer-container');
let cleanupVideoContainer = () => {
    videoContainer.innerHTML = '';
};
let cleanupExplainerContainer = () => {
    explainerContainer.innerHTML = '';
};
const waitForRootHandle = (0, remotion_1.delayRender)('Loading root component');
const WaitForRoot = () => {
    const [Root, setRoot] = (0, react_1.useState)(() => remotion_1.Internals.getRoot());
    (0, react_1.useEffect)(() => {
        if (Root) {
            (0, remotion_1.continueRender)(waitForRootHandle);
            return;
        }
        const cleanup = remotion_1.Internals.waitForRoot((NewRoot) => {
            setRoot(() => NewRoot);
        });
        return () => cleanup();
    }, [Root]);
    if (Root === null) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(Root, {});
};
const renderContent = () => {
    const bundleMode = (0, bundle_mode_1.getBundleMode)();
    if (bundleMode.type === 'composition' || bundleMode.type === 'evaluation') {
        const markup = ((0, jsx_runtime_1.jsxs)(remotion_1.Internals.RemotionRoot, { children: [(0, jsx_runtime_1.jsx)(WaitForRoot, {}), (0, jsx_runtime_1.jsx)(GetVideo, { state: bundleMode })] }));
        if (client_1.default.createRoot) {
            const root = client_1.default.createRoot(videoContainer);
            root.render(markup);
            cleanupVideoContainer = () => {
                root.unmount();
            };
        }
        else {
            client_1.default.render(markup, videoContainer);
            cleanupVideoContainer = () => {
                client_1.default.unmountComponentAtNode(videoContainer);
            };
        }
    }
    else {
        cleanupVideoContainer();
        cleanupVideoContainer = () => {
            videoContainer.innerHTML = '';
        };
    }
    if (bundleMode.type === 'index' || bundleMode.type === 'evaluation') {
        if (client_1.default.createRoot) {
            const root = client_1.default.createRoot(explainerContainer);
            root.render((0, jsx_runtime_1.jsx)(homepage_1.Homepage, {}));
            cleanupExplainerContainer = () => {
                root.unmount();
            };
        }
        else {
            const root = client_1.default;
            root.render((0, jsx_runtime_1.jsx)(homepage_1.Homepage, {}), explainerContainer);
            cleanupExplainerContainer = () => {
                root.unmountComponentAtNode(explainerContainer);
            };
        }
    }
    else {
        cleanupExplainerContainer();
        cleanupExplainerContainer = () => {
            explainerContainer.innerHTML = '';
        };
    }
};
renderContent();
const setBundleModeAndUpdate = (state) => {
    (0, bundle_mode_1.setBundleMode)(state);
    renderContent();
};
exports.setBundleModeAndUpdate = setBundleModeAndUpdate;
if (typeof window !== 'undefined') {
    window.getStaticCompositions = () => {
        if (!remotion_1.Internals.getRoot()) {
            throw new Error('registerRoot() was never called. 1. Make sure you specified the correct entrypoint for your bundle. 2. If your registerRoot() call is deferred, use the delayRender/continueRender pattern to tell Remotion to wait.');
        }
        if (!remotion_1.Internals.compositionsRef.current) {
            throw new Error('Unexpectedly did not have a CompositionManager');
        }
        return remotion_1.Internals.compositionsRef.current
            .getCompositions()
            .map((c) => {
            return {
                defaultProps: c.defaultProps,
                durationInFrames: c.durationInFrames,
                fps: c.fps,
                height: c.height,
                id: c.id,
                width: c.width,
            };
        });
    };
    window.siteVersion = '3';
    window.setBundleMode = exports.setBundleModeAndUpdate;
}
