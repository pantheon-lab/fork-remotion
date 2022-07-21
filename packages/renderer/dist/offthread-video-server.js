"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startOffthreadVideoServer = exports.extractUrlAndSourceFromUrl = void 0;
const remotion_1 = require("remotion");
const url_1 = require("url");
const download_and_map_assets_to_file_1 = require("./assets/download-and-map-assets-to-file");
const extract_frame_from_video_1 = require("./extract-frame-from-video");
const extractUrlAndSourceFromUrl = (url) => {
    const parsed = new URL(url, 'http://localhost');
    const query = parsed.search;
    if (!query.trim()) {
        throw new Error('Expected query from ' + url);
    }
    const params = new url_1.URLSearchParams(query);
    const src = params.get('src');
    if (!src) {
        throw new Error('Did not pass `src` parameter');
    }
    const time = params.get('time');
    if (!time) {
        throw new Error('Did not get `time` parameter');
    }
    const imageFormat = params.get('imageFormat');
    if (!imageFormat) {
        throw new TypeError('Did not get `imageFormat` parameter');
    }
    remotion_1.Internals.validateOffthreadVideoImageFormat(imageFormat);
    return {
        src,
        time: parseFloat(time),
        imageFormat: imageFormat,
    };
};
exports.extractUrlAndSourceFromUrl = extractUrlAndSourceFromUrl;
const startOffthreadVideoServer = ({ ffmpegExecutable, ffprobeExecutable, downloadDir, onDownload, onError, }) => {
    return (req, res) => {
        if (!req.url) {
            throw new Error('Request came in without URL');
        }
        if (!req.url.startsWith('/proxy')) {
            res.writeHead(404);
            res.end();
            return;
        }
        const { src, time, imageFormat } = (0, exports.extractUrlAndSourceFromUrl)(req.url);
        res.setHeader('access-control-allow-origin', '*');
        res.setHeader('content-type', `image/${imageFormat === 'jpeg' ? 'jpg' : 'png'}`);
        (0, download_and_map_assets_to_file_1.downloadAsset)({ src, downloadDir, onDownload })
            .then((to) => {
            return (0, extract_frame_from_video_1.extractFrameFromVideo)({
                time,
                src: to,
                ffmpegExecutable,
                ffprobeExecutable,
                imageFormat,
            });
        })
            .then((readable) => {
            if (!readable) {
                throw new Error('no readable from ffmpeg');
            }
            res.writeHead(200);
            res.write(readable);
            res.end();
        })
            .catch((err) => {
            res.writeHead(500);
            res.end();
            onError(err);
            console.log('Error occurred', err);
        });
    };
};
exports.startOffthreadVideoServer = startOffthreadVideoServer;
