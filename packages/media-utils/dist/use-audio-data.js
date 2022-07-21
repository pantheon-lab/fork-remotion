"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAudioData = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const get_audio_data_1 = require("./get-audio-data");
const useAudioData = (src) => {
    if (!src) {
        throw new TypeError("useAudioData requires a 'src' parameter");
    }
    const mountState = (0, react_1.useRef)({ isMounted: true });
    (0, react_1.useEffect)(() => {
        const { current } = mountState;
        current.isMounted = true;
        return () => {
            current.isMounted = false;
        };
    }, []);
    const [metadata, setMetadata] = (0, react_1.useState)(null);
    const fetchMetadata = (0, react_1.useCallback)(async () => {
        const handle = (0, remotion_1.delayRender)(`Waiting for audio metadata with src="${src}" to be loaded`);
        const data = await (0, get_audio_data_1.getAudioData)(src);
        if (mountState.current.isMounted) {
            setMetadata(data);
        }
        (0, remotion_1.continueRender)(handle);
    }, [src]);
    (0, react_1.useEffect)(() => {
        fetchMetadata();
    }, [fetchMetadata]);
    return metadata;
};
exports.useAudioData = useAudioData;