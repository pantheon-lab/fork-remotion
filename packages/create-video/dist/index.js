"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoInternals = void 0;
const templates_1 = require("./templates");
exports.CreateVideoInternals = {
    FEATURED_TEMPLATES: templates_1.FEATURED_TEMPLATES,
};
exports.default = () => {
    throw new Error('create-video is a CLI tool only. Run `yarn create video` or `npm init video` instead!');
};
