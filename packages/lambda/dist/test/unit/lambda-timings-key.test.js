"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../shared/constants");
const parse_lambda_initialized_key_1 = require("../../shared/parse-lambda-initialized-key");
test('Lambda timinings key', () => {
    const key = (0, constants_1.lambdaInitializedKey)({
        attempt: 1,
        chunk: 1,
        renderId: 'abcdef',
    });
    expect((0, parse_lambda_initialized_key_1.parseLambdaInitializedKey)(key)).toEqual({
        attempt: 1,
        chunk: 1,
        renderId: 'abcdef',
    });
});
