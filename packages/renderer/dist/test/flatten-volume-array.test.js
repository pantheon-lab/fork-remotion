"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const flatten_volume_array_1 = require("../assets/flatten-volume-array");
(0, vitest_1.test)('Should be able to flatten volume array', () => {
    (0, vitest_1.expect)((0, flatten_volume_array_1.flattenVolumeArray)([1, 1, 1, 1, 1])).toBe(1);
    (0, vitest_1.expect)((0, flatten_volume_array_1.flattenVolumeArray)([1, 1, 1, 1, 0])).toEqual([1, 1, 1, 1, 0]);
    (0, vitest_1.expect)(() => (0, flatten_volume_array_1.flattenVolumeArray)([])).toThrow(/must have at least 1 number/);
});
