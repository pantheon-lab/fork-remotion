"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCleanupProgress = void 0;
const get_files_to_delete_1 = require("./get-files-to-delete");
const getCleanupProgress = ({ contents, output, chunkCount, renderId, }) => {
    if (output === null) {
        return null;
    }
    const filesToDelete = (0, get_files_to_delete_1.getFilesToDelete)({ chunkCount, renderId });
    const filesStillThere = contents.filter((c) => {
        return filesToDelete.find((f) => {
            var _a;
            if (f.type === 'exact') {
                return f.name === c.Key;
            }
            if (f.type === 'prefix') {
                return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith(f.name);
            }
            throw new Error('Unexpected in getCleanupProgress');
        });
    });
    const filesDeleted = Math.max(0, filesToDelete.length - filesStillThere.length);
    return {
        minFilesToDelete: filesToDelete.length,
        filesDeleted,
        // We don't know. Only if post render data is saved, we know the timing
        doneIn: null,
    };
};
exports.getCleanupProgress = getCleanupProgress;
