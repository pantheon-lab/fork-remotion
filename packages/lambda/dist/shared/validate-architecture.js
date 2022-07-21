"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArchitecture = void 0;
const validArchitectures = ['arm64', 'x86_64'];
const validateArchitecture = (architecture) => {
    if (typeof architecture !== 'string') {
        throw new TypeError('You must pass an architecture when deploying: One of ' +
            validArchitectures.join(', '));
    }
    if (!validArchitectures.find((a) => a === architecture)) {
        throw new TypeError(`You must pass an "architecture" when deploying a function: either "arm64" or "x86_64"`);
    }
};
exports.validateArchitecture = validateArchitecture;
