"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_profile_1 = require("../../functions/chunk-optimization/is-valid-profile");
const optimize_profile_1 = require("../../functions/chunk-optimization/optimize-profile");
test('Should not throw ongetSimulated', () => {
    expect((0, optimize_profile_1.optimizeProfile)([
        {
            chunk: 0,
            frameRange: [0, 10],
            startDate: 1631614363572,
            timings: [200, 215, 300, 300, 110, 200, 110, 222, 130, 500, 111],
        },
    ])).toEqual([
        {
            chunk: 0,
            frameRange: [0, 10],
            startDate: 1631614363572,
            timings: [200, 215, 300, 300, 110, 200, 110, 222, 130, 500, 111],
        },
    ]);
});
test('Should not throw ongetSimulated 2', () => {
    expect((0, optimize_profile_1.optimizeProfile)([
        {
            chunk: 0,
            frameRange: [0, 5],
            startDate: 1631614363572,
            timings: [200, 415, 700, 1000, 1110, 1140],
        },
        {
            chunk: 1,
            frameRange: [6, 10],
            startDate: 1631614363572,
            timings: [200, 415, 779, 1000, 1120],
        },
    ])).toEqual([
        {
            chunk: 0,
            frameRange: [0, 3],
            startDate: 1631614363572,
            timings: [200, 415, 700, 1000],
        },
        {
            chunk: 1,
            frameRange: [4, 10],
            startDate: 1631614363572,
            timings: [110, 140, 340, 555, 919, 1140, 1260],
        },
    ]);
});
test('Should say valid profile', () => {
    expect((0, is_valid_profile_1.isValidOptimizationProfile)([
        {
            chunk: 0,
            frameRange: [0, 5],
            startDate: 1631614363572,
            timings: [200, 415, 700, 1000, 1110, 1140],
        },
        {
            chunk: 1,
            frameRange: [6, 10],
            startDate: 1631614363572,
            timings: [200, 415, 779, 1000, 1120],
        },
    ])).toEqual(true);
    expect((0, is_valid_profile_1.isValidOptimizationProfile)([
        {
            chunk: 0,
            frameRange: [0, 5],
            startDate: 1631614363572,
            timings: [200, 415, 700, 1000, 1110, 1140],
        },
        {
            chunk: 1,
            frameRange: [6, 10],
            startDate: 1631614363572,
            timings: [200, 415, 779, 1000, 1120, 900],
        },
    ])).toEqual(false);
    expect((0, is_valid_profile_1.isValidOptimizationProfile)([
        {
            chunk: 0,
            frameRange: [0, 5],
            startDate: 1631614363572,
            timings: [200, 415, 700, 1000, 1110, 1140],
        },
        {
            chunk: 1,
            frameRange: [6, 10],
            startDate: 1631614363572,
            timings: [200, 415, 779, 1000, -1120],
        },
    ])).toEqual(false);
});
