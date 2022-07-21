"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_disk_size_in_mb_1 = require("../../shared/validate-disk-size-in-mb");
const expect_to_throw_1 = require("../helpers/expect-to-throw");
test('Disk size tests', () => {
    expect(() => (0, validate_disk_size_in_mb_1.validateDiskSizeInMb)(512)).not.toThrow();
    expect(() => (0, validate_disk_size_in_mb_1.validateDiskSizeInMb)(10240)).not.toThrow();
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, validate_disk_size_in_mb_1.validateDiskSizeInMb)(0);
    }, /parameter 'diskSizeInMb' must be between 512 and 10240, but got 0/);
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, validate_disk_size_in_mb_1.validateDiskSizeInMb)({});
    }, /parameter 'diskSizeInMb' must be a number, got a object/);
});
