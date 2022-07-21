"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const best_frames_per_lambda_param_1 = require("../../functions/helpers/best-frames-per-lambda-param");
test('Get reasonable framesPerLambda defaults', () => {
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(20)).toEqual(20);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(21)).toEqual(11);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(100)).toEqual(20);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(2000)).toEqual(24);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(4000)).toEqual(44);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(8000)).toEqual(74);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(10000)).toEqual(86);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(14000)).toEqual(105);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(18000)).toEqual(120);
    expect((0, best_frames_per_lambda_param_1.bestFramesPerLambdaParam)(216000)).toEqual(1440);
});
