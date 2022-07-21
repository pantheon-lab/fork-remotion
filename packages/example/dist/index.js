"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remotion_1 = require("remotion");
const Video_1 = require("./Video");
// Should be able to defer registerRoot()
setTimeout(() => {
    (0, remotion_1.registerRoot)(Video_1.Index);
}, 500);
