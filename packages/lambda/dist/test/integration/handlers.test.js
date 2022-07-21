"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = require("../../defaults");
const index_1 = require("../../functions/index");
test('Call function locally', async () => {
    expect(await (0, index_1.handler)({ type: defaults_1.LambdaRoutines.info }, {
        invokedFunctionArn: 'arn',
        getRemainingTimeInMillis: () => 1000,
    })).toEqual({ version: defaults_1.CURRENT_VERSION });
});
