"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const round_volume_to_avoid_stack_overflow_1 = require("../assets/round-volume-to-avoid-stack-overflow");
(0, vitest_1.test)('Should avoid having more than 98 possible volumes to avoid FFMPEG exception', () => {
    const thousandsOfValues = new Array(10000)
        .fill(true)
        .map((_, i) => i / 9999)
        .map((t) => (0, round_volume_to_avoid_stack_overflow_1.roundVolumeToAvoidStackOverflow)(t));
    (0, vitest_1.expect)(new Set(thousandsOfValues).size).toBe(98);
});
