"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const create_folder_tree_1 = require("../editor/helpers/create-folder-tree");
const SampleComp = () => null;
const component = react_1.default.lazy(() => Promise.resolve({ default: SampleComp }));
(0, vitest_1.test)('Should create a good folder tree with 1 item inside and 1 item outside', () => {
    const tree = (0, create_folder_tree_1.createFolderTree)([
        {
            component,
            defaultProps: {},
            durationInFrames: 200,
            folderName: 'my-folder',
            fps: 30,
            height: 1080,
            id: 'my-comp',
            nonce: 0,
            width: 1080,
            parentFolderName: null,
        },
        {
            component,
            defaultProps: {},
            durationInFrames: 200,
            folderName: null,
            fps: 30,
            height: 1080,
            id: 'second-comp',
            nonce: 0,
            width: 1080,
            parentFolderName: null,
        },
    ], [
        {
            name: 'my-folder',
            parent: null,
        },
    ], {});
    (0, vitest_1.expect)(tree).toEqual([
        {
            folderName: 'my-folder',
            items: [
                {
                    composition: {
                        component,
                        defaultProps: {},
                        durationInFrames: 200,
                        folderName: 'my-folder',
                        parentFolderName: null,
                        fps: 30,
                        height: 1080,
                        id: 'my-comp',
                        nonce: 0,
                        width: 1080,
                    },
                    key: 'my-comp',
                    type: 'composition',
                },
            ],
            expanded: false,
            key: 'my-folder',
            type: 'folder',
            parentName: null,
        },
        {
            composition: {
                component,
                defaultProps: {},
                durationInFrames: 200,
                folderName: null,
                parentFolderName: null,
                fps: 30,
                height: 1080,
                id: 'second-comp',
                nonce: 0,
                width: 1080,
            },
            key: 'second-comp',
            type: 'composition',
        },
    ]);
});
(0, vitest_1.test)('Should handle nested folders well', () => {
    const tree = (0, create_folder_tree_1.createFolderTree)([
        {
            component,
            defaultProps: {},
            durationInFrames: 200,
            folderName: 'my-folder',
            fps: 30,
            height: 1080,
            id: 'my-comp',
            nonce: 0,
            width: 1080,
            parentFolderName: 'my-third-folder/my-second-folder',
        },
    ], [
        {
            name: 'my-second-folder',
            parent: 'my-third-folder',
        },
        {
            name: 'my-third-folder',
            parent: null,
        },
        {
            name: 'my-folder',
            parent: 'my-third-folder/my-second-folder',
        },
    ], {});
    (0, vitest_1.expect)(tree).toEqual([
        {
            folderName: 'my-third-folder',
            expanded: false,
            key: 'my-third-folder',
            parentName: null,
            items: [
                {
                    type: 'folder',
                    expanded: false,
                    key: 'my-second-folder',
                    folderName: 'my-second-folder',
                    parentName: 'my-third-folder',
                    items: [
                        {
                            type: 'folder',
                            key: 'my-folder',
                            folderName: 'my-folder',
                            parentName: 'my-third-folder/my-second-folder',
                            expanded: false,
                            items: [
                                {
                                    composition: {
                                        component,
                                        defaultProps: {},
                                        durationInFrames: 200,
                                        folderName: 'my-folder',
                                        parentFolderName: 'my-third-folder/my-second-folder',
                                        fps: 30,
                                        height: 1080,
                                        id: 'my-comp',
                                        nonce: 0,
                                        width: 1080,
                                    },
                                    key: 'my-comp',
                                    type: 'composition',
                                },
                            ],
                        },
                    ],
                },
            ],
            type: 'folder',
        },
    ]);
});
(0, vitest_1.test)('Should throw if two folders with the same name', () => {
    (0, vitest_1.expect)(() => (0, create_folder_tree_1.createFolderTree)([], [
        {
            name: 'my-folder',
            parent: null,
        },
        {
            name: 'my-folder',
            parent: null,
        },
    ], {})).toThrow(/Multiple folders with the name my-folder exist. Folder names must be unique./);
});
