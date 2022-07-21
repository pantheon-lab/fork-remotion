"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupFiles = void 0;
const clean_items_1 = require("../../api/clean-items");
const cleanupFiles = async ({ bucket, region, contents, jobs, }) => {
    const start = Date.now();
    await (0, clean_items_1.cleanItems)({
        bucket,
        region,
        list: jobs.map((item) => {
            var _a;
            if (item.type === 'exact') {
                return item.name;
            }
            if (item.type === 'prefix') {
                return (_a = contents.find((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith(item.name); })) === null || _a === void 0 ? void 0 : _a.Key;
            }
            throw new Error('unexpected in deleteChunks()');
        }),
        onAfterItemDeleted: () => undefined,
        onBeforeItemDeleted: () => undefined,
    });
    return Date.now() - start;
};
exports.cleanupFiles = cleanupFiles;
