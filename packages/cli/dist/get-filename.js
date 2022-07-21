"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutputFilename = void 0;
const renderer_1 = require("@remotion/renderer");
const log_1 = require("./log");
const user_passed_output_location_1 = require("./user-passed-output-location");
const getOutputFilename = ({ codec, imageSequence, type, }) => {
    let filename = (0, user_passed_output_location_1.getUserPassedOutputLocation)();
    if (type === 'still') {
        return filename;
    }
    let extension = renderer_1.RenderInternals.getExtensionOfFilename(filename);
    if (imageSequence) {
        if (extension !== null) {
            log_1.Log.error('The output directory of the image sequence cannot have an extension. Got: ' +
                extension);
            process.exit(1);
        }
        return filename;
    }
    if (extension === null && !imageSequence) {
        if (codec === 'h264' || codec === 'h265') {
            log_1.Log.warn('No file extension specified, adding .mp4 automatically.');
            filename += '.mp4';
            extension = 'mp4';
        }
        if (codec === 'h264-mkv') {
            log_1.Log.warn('No file extension specified, adding .mkv automatically.');
            filename += '.mkv';
            extension = 'mkv';
        }
        if (codec === 'vp8' || codec === 'vp9') {
            log_1.Log.warn('No file extension specified, adding .webm automatically.');
            filename += '.webm';
            extension = 'webm';
        }
        if (codec === 'prores') {
            log_1.Log.warn('No file extension specified, adding .mov automatically.');
            filename += '.mov';
            extension = 'mov';
        }
    }
    return filename;
};
exports.getOutputFilename = getOutputFilename;
