"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../shared/constants");
const parse_lambda_timings_key_1 = require("../../shared/parse-lambda-timings-key");
const EXPECTED = 'renders/8dakdd/lambda-timings/chunk:00000088-start:1625579377044-rendered:1625579387219.txt';
test('Should give expected file name', () => {
    expect((0, constants_1.lambdaTimingsKey)({
        chunk: 88,
        start: 1625579377044,
        rendered: 1625579387219,
        renderId: '8dakdd',
    })).toBe(EXPECTED);
});
test('Should be able to convert back to object', () => {
    expect((0, parse_lambda_timings_key_1.parseLambdaTimingsKey)(EXPECTED)).toEqual({
        chunk: 88,
        start: 1625579377044,
        rendered: 1625579387219,
        renderId: '8dakdd',
    });
});
