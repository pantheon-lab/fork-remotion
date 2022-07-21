"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndMapAssetsToFileUrl = exports.getSanitizedFilenameForAssetUrl = exports.markAllAssetsAsDownloaded = exports.downloadAsset = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const ensure_output_directory_1 = require("../ensure-output-directory");
const download_file_1 = require("./download-file");
const sanitize_filepath_1 = require("./sanitize-filepath");
const isDownloadingMap = {};
const hasBeenDownloadedMap = {};
const listeners = {};
const waitForAssetToBeDownloaded = ({ src, downloadDir, }) => {
    var _a, _b;
    if ((_a = hasBeenDownloadedMap[src]) === null || _a === void 0 ? void 0 : _a[downloadDir]) {
        return Promise.resolve((_b = hasBeenDownloadedMap[src]) === null || _b === void 0 ? void 0 : _b[downloadDir]);
    }
    if (!listeners[src]) {
        listeners[src] = {};
    }
    if (!listeners[src][downloadDir]) {
        listeners[src][downloadDir] = [];
    }
    return new Promise((resolve) => {
        listeners[src][downloadDir].push(() => {
            const srcMap = hasBeenDownloadedMap[src];
            if (!srcMap || !srcMap[downloadDir]) {
                throw new Error('Expected file for ' + src + 'to be available in ' + downloadDir);
            }
            resolve(srcMap[downloadDir]);
        });
    });
};
const notifyAssetIsDownloaded = ({ src, downloadDir, to, }) => {
    if (!listeners[src]) {
        listeners[src] = {};
    }
    if (!listeners[src][downloadDir]) {
        listeners[src][downloadDir] = [];
    }
    if (!isDownloadingMap[src]) {
        isDownloadingMap[src] = {};
    }
    isDownloadingMap[src][downloadDir] = true;
    if (!hasBeenDownloadedMap[src]) {
        hasBeenDownloadedMap[src] = {};
    }
    hasBeenDownloadedMap[src][downloadDir] = to;
    listeners[src][downloadDir].forEach((fn) => fn());
};
const validateMimeType = (mimeType, src) => {
    if (!mimeType.includes('/')) {
        const errMessage = [
            'A data URL was passed but did not have the correct format so that Remotion could convert it for the video to be rendered.',
            'The format of the data URL must be `data:[mime-type];[encoding],[data]`.',
            'The `mime-type` parameter must be a valid mime type.',
            'The data that was received is (truncated to 100 characters):',
            src.substr(0, 100),
        ].join(' ');
        throw new TypeError(errMessage);
    }
};
function validateBufferEncoding(potentialEncoding, dataUrl) {
    const asserted = potentialEncoding;
    const validEncodings = [
        'ascii',
        'base64',
        'base64url',
        'binary',
        'hex',
        'latin1',
        'ucs-2',
        'ucs2',
        'utf-8',
        'utf16le',
        'utf8',
    ];
    if (!validEncodings.find((en) => asserted === en)) {
        const errMessage = [
            'A data URL was passed but did not have the correct format so that Remotion could convert it for the video to be rendered.',
            'The format of the data URL must be `data:[mime-type];[encoding],[data]`.',
            'The `encoding` parameter must be one of the following:',
            `${validEncodings.join(' ')}.`,
            'The data that was received is (truncated to 100 characters):',
            dataUrl.substr(0, 100),
        ].join(' ');
        throw new TypeError(errMessage);
    }
}
const downloadAsset = async ({ src, onDownload, downloadDir, }) => {
    var _a, _b, _c;
    if (remotion_1.Internals.AssetCompression.isAssetCompressed(src)) {
        return src;
    }
    if ((_a = hasBeenDownloadedMap[src]) === null || _a === void 0 ? void 0 : _a[downloadDir]) {
        const claimedDownloadLocation = (_b = hasBeenDownloadedMap[src]) === null || _b === void 0 ? void 0 : _b[downloadDir];
        // The OS might have deleted the file since even though we marked it as downloaded. In that case we reset the state and download it again
        if (!fs_1.default.existsSync(claimedDownloadLocation)) {
            return claimedDownloadLocation;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        hasBeenDownloadedMap[src][downloadDir] = null;
        if (!isDownloadingMap[src]) {
            isDownloadingMap[src] = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        isDownloadingMap[src][downloadDir] = false;
    }
    if ((_c = isDownloadingMap[src]) === null || _c === void 0 ? void 0 : _c[downloadDir]) {
        return waitForAssetToBeDownloaded({ src, downloadDir });
    }
    if (!isDownloadingMap[src]) {
        isDownloadingMap[src] = {};
    }
    isDownloadingMap[src][downloadDir] = true;
    const onProgress = onDownload(src);
    if (src.startsWith('data:')) {
        const output = (0, exports.getSanitizedFilenameForAssetUrl)({
            contentDisposition: null,
            downloadDir,
            src,
        });
        (0, ensure_output_directory_1.ensureOutputDirectory)(output);
        const [assetDetails, assetData] = src.substring('data:'.length).split(',');
        if (!assetDetails.includes(';')) {
            const errMessage = [
                'A data URL was passed but did not have the correct format so that Remotion could convert it for the video to be rendered.',
                'The format of the data URL must be `data:[mime-type];[encoding],[data]`.',
                'The data that was received is (truncated to 100 characters):',
                src.substring(0, 100),
            ].join(' ');
            throw new TypeError(errMessage);
        }
        const [mimeType, encoding] = assetDetails.split(';');
        validateMimeType(mimeType, src);
        validateBufferEncoding(encoding, src);
        const buff = Buffer.from(assetData, encoding);
        await fs_1.default.promises.writeFile(output, buff);
        notifyAssetIsDownloaded({ src, downloadDir, to: output });
        return output;
    }
    const { to } = await (0, download_file_1.downloadFile)({
        url: src,
        onProgress: (progress) => {
            onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
        },
        to: (contentDisposition) => (0, exports.getSanitizedFilenameForAssetUrl)({ contentDisposition, downloadDir, src }),
    });
    notifyAssetIsDownloaded({ src, downloadDir, to });
    return to;
};
exports.downloadAsset = downloadAsset;
const markAllAssetsAsDownloaded = () => {
    Object.keys(hasBeenDownloadedMap).forEach((key) => {
        delete hasBeenDownloadedMap[key];
    });
    Object.keys(isDownloadingMap).forEach((key) => {
        delete isDownloadingMap[key];
    });
};
exports.markAllAssetsAsDownloaded = markAllAssetsAsDownloaded;
const getFilename = ({ contentDisposition, src, }) => {
    const filenameProbe = 'filename=';
    if (contentDisposition === null || contentDisposition === void 0 ? void 0 : contentDisposition.includes(filenameProbe)) {
        const start = contentDisposition.indexOf(filenameProbe);
        const onlyFromFileName = contentDisposition.substring(start + filenameProbe.length);
        const hasSemi = onlyFromFileName.indexOf(';');
        if (hasSemi === -1) {
            return { pathname: onlyFromFileName.trim(), search: '' };
        }
        return {
            search: '',
            pathname: onlyFromFileName.substring(0, hasSemi).trim(),
        };
    }
    const { pathname, search } = new URL(src);
    return { pathname, search };
};
const getSanitizedFilenameForAssetUrl = ({ src, downloadDir, contentDisposition, }) => {
    if (remotion_1.Internals.AssetCompression.isAssetCompressed(src)) {
        return src;
    }
    const { pathname, search } = getFilename({ contentDisposition, src });
    const split = pathname.split('.');
    const fileExtension = split.length > 1 && split[split.length - 1]
        ? `.${split[split.length - 1]}`
        : '';
    const hashedFileName = String((0, remotion_1.random)(`${pathname}${search}`)).replace('0.', '');
    const filename = hashedFileName + fileExtension;
    return path_1.default.join(downloadDir, (0, sanitize_filepath_1.sanitizeFilePath)(filename));
};
exports.getSanitizedFilenameForAssetUrl = getSanitizedFilenameForAssetUrl;
const downloadAndMapAssetsToFileUrl = async ({ asset, downloadDir, onDownload, }) => {
    const newSrc = await (0, exports.downloadAsset)({
        src: asset.src,
        downloadDir,
        onDownload,
    });
    return {
        ...asset,
        src: newSrc,
    };
};
exports.downloadAndMapAssetsToFileUrl = downloadAndMapAssetsToFileUrl;
