"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialCompositionLoader = exports.useSelectComposition = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const folders_1 = require("../state/folders");
const marks_1 = require("../state/marks");
const CompositionSelector_1 = require("./CompositionSelector");
const FramePersistor_1 = require("./FramePersistor");
const TimelineInOutToggle_1 = require("./TimelineInOutToggle");
const useSelectComposition = () => {
    const setCurrentFrame = remotion_1.Internals.Timeline.useTimelineSetFrame();
    const { setCurrentComposition } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const { setFoldersExpanded } = (0, react_1.useContext)(folders_1.FolderContext);
    return (c) => {
        var _a;
        (_a = TimelineInOutToggle_1.inOutHandles.current) === null || _a === void 0 ? void 0 : _a.setMarks((0, marks_1.loadMarks)(c.id, c.durationInFrames));
        window.history.pushState({}, 'Preview', `/${c.id}`);
        const frame = (0, FramePersistor_1.getFrameForComposition)(c.id);
        const frameInBounds = Math.min(c.durationInFrames - 1, frame);
        setCurrentFrame(frameInBounds);
        setCurrentComposition(c.id);
        const { folderName, parentFolderName } = c;
        if (folderName !== null) {
            setFoldersExpanded((ex) => {
                const keysToExpand = (0, CompositionSelector_1.getKeysToExpand)(folderName, parentFolderName);
                const newState = {
                    ...ex,
                };
                for (const key of keysToExpand) {
                    newState[key] = true;
                }
                return newState;
            });
        }
    };
};
exports.useSelectComposition = useSelectComposition;
const InitialCompositionLoader = () => {
    const { compositions, currentComposition } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const selectComposition = (0, exports.useSelectComposition)();
    (0, react_1.useEffect)(() => {
        if (currentComposition) {
            return;
        }
        const compositionFromUrl = (0, FramePersistor_1.getCurrentCompositionFromUrl)();
        if (compositionFromUrl) {
            const exists = compositions.find((c) => c.id === compositionFromUrl);
            if (exists) {
                selectComposition(exists);
                return;
            }
        }
        if (compositions.length > 0) {
            selectComposition(compositions[0]);
        }
    }, [compositions, currentComposition, selectComposition]);
    return null;
};
exports.InitialCompositionLoader = InitialCompositionLoader;
