"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remotion_1 = require("remotion");
const index_1 = require("../../functions/index");
const constants_1 = require("../../shared/constants");
test('Info handler should return version', async () => {
    remotion_1.Internals.Logging.setLogLevel('error');
    const response = await (0, index_1.handler)({
        type: constants_1.LambdaRoutines.info,
    }, { invokedFunctionArn: '::::::', getRemainingTimeInMillis: () => 1000 });
    expect(typeof response
        .version === 'string').toBe(true);
});
