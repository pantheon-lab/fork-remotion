"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderTree = exports.findItemListToPush = exports.splitParentIntoNameAndParent = void 0;
const persist_open_folders_1 = require("./persist-open-folders");
const splitParentIntoNameAndParent = (name) => {
    if (name === null) {
        return {
            name: null,
            parent: null,
        };
    }
    const splitted = name.split('/');
    const lastName = splitted[splitted.length - 1];
    const parentParentArray = splitted.slice(0, splitted.length - 1);
    const parentParent = parentParentArray.length === 0 ? null : parentParentArray.join('/');
    return {
        name: lastName,
        parent: parentParent,
    };
};
exports.splitParentIntoNameAndParent = splitParentIntoNameAndParent;
const doesFolderExist = (items, folderName, parentName) => {
    for (const item of items) {
        if (item.type === 'folder') {
            if (item.folderName === folderName && item.parentName === parentName) {
                return item.items;
            }
            const found = doesFolderExist(item.items, folderName, parentName);
            if (found !== false) {
                return found;
            }
        }
    }
    return false;
};
const findItemListToPush = (items, folderName, parentName) => {
    if (folderName === null) {
        return items;
    }
    const folder = doesFolderExist(items, folderName, parentName);
    if (!folder) {
        console.log({ items, folderName, parentName });
        throw new Error('did not find folder ' + folderName);
    }
    return folder;
};
exports.findItemListToPush = findItemListToPush;
const createFolderIfDoesNotExist = (items, availableFolders, folderItem, foldersExpanded) => {
    var _a;
    if (doesFolderExist(items, folderItem.name, folderItem.parent)) {
        return;
    }
    const splitted = (0, exports.splitParentIntoNameAndParent)(folderItem.parent);
    if (folderItem.parent) {
        const parent = availableFolders.find((f) => f.name === splitted.name && f.parent === splitted.parent);
        if (!parent) {
            throw new Error('unexpectedly did not have parent');
        }
        createFolderIfDoesNotExist(items, availableFolders, parent, foldersExpanded);
    }
    const itemList = (0, exports.findItemListToPush)(items, splitted.name, splitted.parent);
    if (!itemList) {
        throw new Error('why did folder not exist? ' + folderItem.name);
    }
    itemList.push({
        type: 'folder',
        folderName: folderItem.name,
        items: [],
        key: folderItem.name,
        expanded: (_a = foldersExpanded[(0, persist_open_folders_1.openFolderKey)(folderItem.name, folderItem.parent)]) !== null && _a !== void 0 ? _a : false,
        parentName: folderItem.parent,
    });
};
const createFolderTree = (comps, folders, foldersExpanded) => {
    const items = [];
    const uniqueFolderKeys = [];
    for (const folder of folders) {
        const folderKey = (0, persist_open_folders_1.openFolderKey)(folder.name, folder.parent);
        if (uniqueFolderKeys.includes(folderKey)) {
            if (folder.parent) {
                throw new Error(`Multiple folders with the name ${folder.name} inside the folder ${folder.parent} exist. Folder names must be unique.`);
            }
            throw new Error('Multiple folders with the name ' +
                folder.name +
                ' exist. Folder names must be unique.');
        }
        uniqueFolderKeys.push(folderKey);
        createFolderIfDoesNotExist(items, folders, folder, foldersExpanded);
    }
    for (const item of comps) {
        const toPush = {
            type: 'composition',
            composition: item,
            key: item.id,
        };
        const list = (0, exports.findItemListToPush)(items, item.folderName, item.parentFolderName);
        list.push(toPush);
    }
    return items;
};
exports.createFolderTree = createFolderTree;
