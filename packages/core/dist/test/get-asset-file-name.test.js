"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_asset_file_name_1 = require("../get-asset-file-name");
(0, vitest_1.describe)('get asset file name test', () => {
    const testStrings = [
        ['assets/images/sample.png', 'sample.png'],
        ['assets\\images\\sample.png', 'sample.png'],
        ['sample.png', 'sample.png'],
    ];
    testStrings.forEach((entry) => (0, vitest_1.test)(`test for ${entry[0]}`, () => {
        (0, vitest_1.expect)((0, get_asset_file_name_1.getAssetDisplayName)(entry[0])).toEqual(entry[1]);
    }));
});
