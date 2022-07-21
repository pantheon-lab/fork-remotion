"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsBeyondLastFrame = exports.isBeyondLastFrame = void 0;
const map = {};
const isBeyondLastFrame = (src, time) => {
    return map[src] && time >= map[src];
};
exports.isBeyondLastFrame = isBeyondLastFrame;
const markAsBeyondLastFrame = (src, time) => {
    map[src] = time;
};
exports.markAsBeyondLastFrame = markAsBeyondLastFrame;
