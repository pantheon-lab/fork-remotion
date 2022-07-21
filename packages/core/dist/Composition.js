"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composition = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const CanUseRemotionHooks_1 = require("./CanUseRemotionHooks");
const CompositionManager_1 = require("./CompositionManager");
const input_props_1 = require("./config/input-props");
const delay_render_1 = require("./delay-render");
const Folder_1 = require("./Folder");
const get_environment_1 = require("./get-environment");
const internals_1 = require("./internals");
const loading_indicator_1 = require("./loading-indicator");
const nonce_1 = require("./nonce");
const portal_node_1 = require("./portal-node");
const use_lazy_component_1 = require("./use-lazy-component");
const use_video_1 = require("./use-video");
const validate_composition_id_1 = require("./validation/validate-composition-id");
const validate_dimensions_1 = require("./validation/validate-dimensions");
const validate_duration_in_frames_1 = require("./validation/validate-duration-in-frames");
const validate_fps_1 = require("./validation/validate-fps");
const Fallback = () => {
    (0, react_1.useEffect)(() => {
        const fallback = (0, delay_render_1.delayRender)('Waiting for Root component to unsuspend');
        return () => (0, delay_render_1.continueRender)(fallback);
    }, []);
    return null;
};
const Composition = ({ width, height, fps, durationInFrames, id, defaultProps, ...compProps }) => {
    const { registerComposition, unregisterComposition } = (0, react_1.useContext)(CompositionManager_1.CompositionManager);
    const video = (0, use_video_1.useVideo)();
    const lazy = (0, use_lazy_component_1.useLazyComponent)(compProps);
    const nonce = (0, nonce_1.useNonce)();
    const canUseComposition = (0, react_1.useContext)(internals_1.Internals.CanUseRemotionHooks);
    if (canUseComposition) {
        if (typeof window !== 'undefined' && window.remotion_isPlayer) {
            throw new Error('<Composition> was mounted inside the `component` that was passed to the <Player>. See https://remotion.dev/docs/wrong-composition-mount for help.');
        }
        throw new Error('<Composition> mounted inside another composition. See https://remotion.dev/docs/wrong-composition-mount for help.');
    }
    const { folderName, parentName } = (0, react_1.useContext)(Folder_1.FolderContext);
    (0, react_1.useEffect)(() => {
        // Ensure it's a URL safe id
        if (!id) {
            throw new Error('No id for composition passed.');
        }
        (0, validate_composition_id_1.validateCompositionId)(id);
        (0, validate_dimensions_1.validateDimension)(width, 'width', 'of the <Composition/> component');
        (0, validate_dimensions_1.validateDimension)(height, 'height', 'of the <Composition/> component');
        (0, validate_duration_in_frames_1.validateDurationInFrames)(durationInFrames, 'of the <Composition/> component');
        (0, validate_fps_1.validateFps)(fps, 'as a prop of the <Composition/> component', null);
        registerComposition({
            durationInFrames,
            fps,
            height,
            width,
            id,
            folderName,
            component: lazy,
            defaultProps,
            nonce,
            parentFolderName: parentName,
        });
        return () => {
            unregisterComposition(id);
        };
    }, [
        durationInFrames,
        fps,
        height,
        lazy,
        id,
        folderName,
        defaultProps,
        registerComposition,
        unregisterComposition,
        width,
        nonce,
        parentName,
    ]);
    if ((0, get_environment_1.getRemotionEnvironment)() === 'preview' &&
        video &&
        video.component === lazy) {
        const Comp = lazy;
        const inputProps = (0, input_props_1.getInputProps)();
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(loading_indicator_1.Loading, {}), children: (0, jsx_runtime_1.jsx)(Comp, { ...defaultProps, ...inputProps }) }) }), (0, portal_node_1.portalNode)());
    }
    if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering' &&
        video &&
        video.component === lazy) {
        const Comp = lazy;
        const inputProps = (0, input_props_1.getInputProps)();
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(Fallback, {}), children: (0, jsx_runtime_1.jsx)(Comp, { ...defaultProps, ...inputProps }) }) }), (0, portal_node_1.portalNode)());
    }
    return null;
};
exports.Composition = Composition;
