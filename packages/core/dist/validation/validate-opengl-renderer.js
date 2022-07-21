"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOpenGlRenderer = void 0;
const validRenderers = ['swangle', 'angle', 'egl', 'swiftshader'];
const validateOpenGlRenderer = (option) => {
    if (option === null) {
        return null;
    }
    if (!validRenderers.includes(option)) {
        throw new TypeError(`${option} is not a valid GL backend. Accepted values: ${validRenderers.join(', ')}`);
    }
    return option;
};
exports.validateOpenGlRenderer = validateOpenGlRenderer;
