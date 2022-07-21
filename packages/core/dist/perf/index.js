"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPerf = exports.stopPerfMeasure = exports.startPerfMeasure = void 0;
const perf = {
    'activate-target': [],
    capture: [],
    save: [],
    'extract-frame': [],
    piping: [],
};
const map = {};
const startPerfMeasure = (marker) => {
    const id = Math.random();
    map[id] = {
        id,
        marker,
        start: Date.now(),
    };
    return id;
};
exports.startPerfMeasure = startPerfMeasure;
const stopPerfMeasure = (id) => {
    const now = Date.now();
    const diff = now - map[id].start;
    perf[map[id].marker].push(diff);
    delete map[id];
};
exports.stopPerfMeasure = stopPerfMeasure;
const logPerf = () => {
    console.log('Render performance:');
    Object.keys(perf).forEach((p) => {
        console.log(`  ${p} => ${perf[p].reduce((a, b) => a + b, 0) / perf[p].length} (n = ${perf[p].length})`);
    });
};
exports.logPerf = logPerf;
