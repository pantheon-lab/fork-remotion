"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProgressBar = void 0;
const makeProgressBar = (percentage) => {
    const totalBars = 20;
    const barsToShow = Math.floor(percentage * totalBars);
    return `[${'='.repeat(barsToShow).padEnd(totalBars, ' ')}]`;
};
exports.makeProgressBar = makeProgressBar;
