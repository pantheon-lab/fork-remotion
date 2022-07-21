"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const estimate_price_1 = require("../../api/estimate-price");
test('Should calculate costs accurately', () => {
    expect((0, estimate_price_1.estimatePrice)({
        region: 'us-east-1',
        durationInMiliseconds: 20000000,
        memorySizeInMb: 2048,
        architecture: 'x86_64',
        diskSizeInMb: 512,
        lambdasInvoked: 1,
    })).toEqual(0.66667);
    expect((0, estimate_price_1.estimatePrice)({
        region: 'us-east-1',
        durationInMiliseconds: 20000000,
        memorySizeInMb: 2048,
        architecture: 'x86_64',
        diskSizeInMb: 10240,
        lambdasInvoked: 1,
    })).toEqual(0.67254);
    expect((0, estimate_price_1.estimatePrice)({
        region: 'us-east-1',
        durationInMiliseconds: 20000000,
        memorySizeInMb: 2048,
        architecture: 'arm64',
        diskSizeInMb: 10240,
        lambdasInvoked: 1,
    })).toEqual(0.53921);
});
