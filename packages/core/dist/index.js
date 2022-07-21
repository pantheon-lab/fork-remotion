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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrentFrame = exports.staticFile = exports.Series = exports.Sequence = exports.registerRoot = exports.Loop = exports.interpolateColors = exports.getInputProps = void 0;
require("./asset-types");
const multiple_versions_warning_1 = require("./multiple-versions-warning");
(0, multiple_versions_warning_1.checkMultipleRemotionVersions)();
__exportStar(require("./AbsoluteFill"), exports);
__exportStar(require("./audio"), exports);
__exportStar(require("./Composition"), exports);
__exportStar(require("./config"), exports);
var input_props_1 = require("./config/input-props");
Object.defineProperty(exports, "getInputProps", { enumerable: true, get: function () { return input_props_1.getInputProps; } });
__exportStar(require("./delay-render"), exports);
__exportStar(require("./easing"), exports);
__exportStar(require("./Folder"), exports);
__exportStar(require("./freeze"), exports);
__exportStar(require("./IFrame"), exports);
__exportStar(require("./Img"), exports);
__exportStar(require("./internals"), exports);
__exportStar(require("./interpolate"), exports);
var interpolate_colors_1 = require("./interpolate-colors");
Object.defineProperty(exports, "interpolateColors", { enumerable: true, get: function () { return interpolate_colors_1.interpolateColors; } });
var loop_1 = require("./loop");
Object.defineProperty(exports, "Loop", { enumerable: true, get: function () { return loop_1.Loop; } });
__exportStar(require("./random"), exports);
var register_root_1 = require("./register-root");
Object.defineProperty(exports, "registerRoot", { enumerable: true, get: function () { return register_root_1.registerRoot; } });
var Sequence_1 = require("./Sequence");
Object.defineProperty(exports, "Sequence", { enumerable: true, get: function () { return Sequence_1.Sequence; } });
var series_1 = require("./series");
Object.defineProperty(exports, "Series", { enumerable: true, get: function () { return series_1.Series; } });
__exportStar(require("./spring"), exports);
var static_file_1 = require("./static-file");
Object.defineProperty(exports, "staticFile", { enumerable: true, get: function () { return static_file_1.staticFile; } });
__exportStar(require("./Still"), exports);
var use_current_frame_1 = require("./use-current-frame");
Object.defineProperty(exports, "useCurrentFrame", { enumerable: true, get: function () { return use_current_frame_1.useCurrentFrame; } });
__exportStar(require("./use-video-config"), exports);
__exportStar(require("./video"), exports);
__exportStar(require("./video-config"), exports);
