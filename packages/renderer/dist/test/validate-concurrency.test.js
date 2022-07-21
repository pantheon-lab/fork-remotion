"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const validate_concurrency_1 = require("../validate-concurrency");
const invalidConcurrency = 'invalidConcurrency';
(0, vitest_1.test)('setConcurrency should throw if concurrency is not a number', () => {
    (0, vitest_1.expect)(() => (0, validate_concurrency_1.validateConcurrency)(invalidConcurrency, 'concurrencyPerLambda')).toThrow(/concurrencyPerLambda must be a number but is/);
});
(0, vitest_1.test)('setConcurrency should NOT throw if concurrency is a number', () => {
    (0, vitest_1.expect)(() => (0, validate_concurrency_1.validateConcurrency)(2, 'concurrencyPerLambda')).not.toThrow();
});
(0, vitest_1.test)('setConcurrency should throw if concurrency is too high', () => {
    (0, vitest_1.expect)(() => (0, validate_concurrency_1.validateConcurrency)(50, 'concurrencyPerLambda')).toThrow(/concurrencyPerLambda is set higher than the amount of CPU cores available/);
});
