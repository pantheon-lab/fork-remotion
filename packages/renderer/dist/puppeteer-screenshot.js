"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenshot = void 0;
const assert = __importStar(require("assert"));
const screenshot_task_1 = require("./screenshot-task");
const screenshot = (page, options) => {
    let screenshotType = null;
    // options.type takes precedence over inferring the type from options.path
    // because it may be a 0-length file with no extension created beforehand
    // (i.e. as a temp file).
    if (options.type) {
        assert.ok(options.type === 'png' || options.type === 'jpeg', 'Unknown options.type value: ' + options.type);
        screenshotType = options.type;
    }
    else if (options.path) {
        const filePath = options.path;
        const extension = filePath
            .slice(filePath.lastIndexOf('.') + 1)
            .toLowerCase();
        if (extension === 'png')
            screenshotType = 'png';
        else if (extension === 'jpg' || extension === 'jpeg')
            screenshotType = 'jpeg';
        assert.ok(screenshotType, `Unsupported screenshot type for extension \`.${extension}\``);
    }
    if (!screenshotType)
        screenshotType = 'png';
    if (options.quality) {
        assert.ok(screenshotType === 'jpeg', 'options.quality is unsupported for the ' +
            screenshotType +
            ' screenshots');
        assert.ok(typeof options.quality === 'number', 'Expected options.quality to be a number but found ' +
            typeof options.quality);
        assert.ok(Number.isInteger(options.quality), 'Expected options.quality to be an integer');
        assert.ok(options.quality >= 0 && options.quality <= 100, 'Expected options.quality to be between 0 and 100 (inclusive), got ' +
            options.quality);
    }
    if (options.clip) {
        assert.ok(typeof options.clip.x === 'number', 'Expected options.clip.x to be a number but found ' +
            typeof options.clip.x);
        assert.ok(typeof options.clip.y === 'number', 'Expected options.clip.y to be a number but found ' +
            typeof options.clip.y);
        assert.ok(typeof options.clip.width === 'number', 'Expected options.clip.width to be a number but found ' +
            typeof options.clip.width);
        assert.ok(typeof options.clip.height === 'number', 'Expected options.clip.height to be a number but found ' +
            typeof options.clip.height);
        assert.ok(options.clip.width !== 0, 'Expected options.clip.width not to be 0.');
        assert.ok(options.clip.height !== 0, 'Expected options.clip.height not to be 0.');
    }
    return page.screenshotTaskQueue.postTask(() => (0, screenshot_task_1._screenshotTask)(page, screenshotType, options));
};
exports.screenshot = screenshot;
