"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const truthy_1 = require("../truthy");
vitest_1.test.each([
    ['true', true],
    ['false', true],
    ['True', true],
    ['False', true],
    ['', false],
    ['abc', true],
    [true, true],
    [false, false],
    [null, false],
    [undefined, false],
    [0, false],
    [1, true],
    [0.5, true],
    [12, true],
    [-1, true],
    [-4, true],
])('test with %s', (input, expected) => {
    (0, vitest_1.expect)((0, truthy_1.truthy)(input)).toEqual(expected);
});
