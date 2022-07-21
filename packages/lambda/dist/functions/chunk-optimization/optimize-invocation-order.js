"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeInvocationOrder = void 0;
const sort_by_duration_1 = require("./sort-by-duration");
const optimizeInvocationOrder = (profile) => {
    const sortedByDuration = (0, sort_by_duration_1.sortProfileByDuration)(profile).reverse();
    const sortedByStartTime = profile
        .slice()
        .map((a) => a.startDate)
        .sort((a, b) => a - b);
    const result = sortedByStartTime.map((prof, i) => {
        return {
            ...sortedByDuration[i],
            startDate: prof,
        };
    });
    return result;
};
exports.optimizeInvocationOrder = optimizeInvocationOrder;
