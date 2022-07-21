"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionSelector = exports.getKeysToExpand = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const create_folder_tree_1 = require("../helpers/create-folder-tree");
const persist_open_folders_1 = require("../helpers/persist-open-folders");
const z_index_1 = require("../state/z-index");
const CompositionSelectorItem_1 = require("./CompositionSelectorItem");
const CurrentComposition_1 = require("./CurrentComposition");
const InitialCompositionLoader_1 = require("./InitialCompositionLoader");
const container = {
    borderRight: '1px solid black',
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
};
const list = {
    padding: 5,
    height: 'calc(100% - 100px)',
    overflowY: 'auto',
};
const getKeysToExpand = (initialFolderName, parentFolderName, initial = []) => {
    initial.push((0, persist_open_folders_1.openFolderKey)(initialFolderName, parentFolderName));
    const { name, parent } = (0, create_folder_tree_1.splitParentIntoNameAndParent)(parentFolderName);
    if (!name) {
        return initial;
    }
    return (0, exports.getKeysToExpand)(name, parent, initial);
};
exports.getKeysToExpand = getKeysToExpand;
const CompositionSelector = () => {
    const { compositions, currentComposition, folders } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const [foldersExpanded, setFoldersExpanded] = (0, react_1.useState)((0, persist_open_folders_1.loadExpandedFolders)());
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const selectComposition = (0, InitialCompositionLoader_1.useSelectComposition)();
    const toggleFolder = (0, react_1.useCallback)((folderName, parentName) => {
        setFoldersExpanded((p) => {
            var _a;
            const key = (0, persist_open_folders_1.openFolderKey)(folderName, parentName);
            const prev = (_a = p[key]) !== null && _a !== void 0 ? _a : false;
            const foldersExpandedState = {
                ...p,
                [key]: !prev,
            };
            (0, persist_open_folders_1.persistExpandedFolders)(foldersExpandedState);
            return foldersExpandedState;
        });
    }, []);
    const items = (0, react_1.useMemo)(() => {
        return (0, create_folder_tree_1.createFolderTree)(compositions, folders, foldersExpanded);
    }, [compositions, folders, foldersExpanded]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)(CurrentComposition_1.CurrentComposition, {}), (0, jsx_runtime_1.jsx)("div", { style: list, children: items.map((c) => {
                    return ((0, jsx_runtime_1.jsx)(CompositionSelectorItem_1.CompositionSelectorItem, { level: 0, currentComposition: currentComposition, selectComposition: selectComposition, toggleFolder: toggleFolder, tabIndex: tabIndex, item: c }, c.key + c.type));
                }) })] }));
};
exports.CompositionSelector = CompositionSelector;
