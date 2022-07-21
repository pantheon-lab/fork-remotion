"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_frames_per_lambda_param_1 = require("./best-frames-per-lambda-param");
const entries = [];
for (let i = 0; i < 18000; i += 100) {
    entries.push([i, (0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(i)]);
}
console.log(entries.map((e) => e.join(',')).join('\n'));
