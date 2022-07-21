"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = void 0;
const formatTime = (time) => {
    return time + 'ms';
};
const timer = (label) => {
    const start = Date.now();
    return {
        end: () => {
            const end = Date.now();
            const time = end - start;
            process.stdout.write(`${label} - ${formatTime(time)}\n`);
        },
    };
};
exports.timer = timer;
