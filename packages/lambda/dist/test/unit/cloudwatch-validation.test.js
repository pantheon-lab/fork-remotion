"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_retention_period_1 = require("../../shared/validate-retention-period");
const expect_to_throw_1 = require("../helpers/expect-to-throw");
test('Should be a valid cloudwatch retention period', () => {
    expect((0, validate_retention_period_1.validateCloudWatchRetentionPeriod)(1)).toBe(undefined);
    expect((0, validate_retention_period_1.validateCloudWatchRetentionPeriod)(undefined)).toBe(undefined);
    (0, expect_to_throw_1.expectToThrow)(() => (0, validate_retention_period_1.validateCloudWatchRetentionPeriod)(0), /CloudWatch retention period must be at least 1, but is 0/);
    (0, expect_to_throw_1.expectToThrow)(() => (0, validate_retention_period_1.validateCloudWatchRetentionPeriod)(1000000), /CloudWatch retention period must be at most 3650, but is 1000000/);
});
