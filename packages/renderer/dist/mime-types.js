"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mimeContentType = exports.mimeLookup = void 0;
const path_1 = require("path");
const mime_db_1 = require("./mime-db");
const extensions = {};
const types = {};
// Populate the extensions/types maps
populateMaps(extensions, {});
function mimeLookup(path) {
    if (!path || typeof path !== 'string') {
        return false;
    }
    // get the extension ("ext" or ".ext" or full path)
    const ext = (0, path_1.extname)('.' + path)
        .toLowerCase()
        .substr(1);
    if (!ext) {
        return false;
    }
    return types[ext] || false;
}
exports.mimeLookup = mimeLookup;
/**
 * Populate the extensions and types maps.
 * @private
 */
function populateMaps(exts, _types) {
    // source preference (least -> most)
    const preference = ['nginx', 'apache', undefined, 'iana'];
    Object.keys(mime_db_1.mimeDb).forEach((type) => {
        const mime = mime_db_1.mimeDb[type];
        const _exts = mime.extensions;
        if (!_exts || !_exts.length) {
            return;
        }
        // mime -> extensions
        exts[type] = _exts;
        // extension -> mime
        for (let i = 0; i < _exts.length; i++) {
            const _ext = _exts[i];
            if (_types[_ext]) {
                const from = preference.indexOf(mime_db_1.mimeDb[_types[_ext]].source);
                const to = preference.indexOf(mime.source);
                if (_types[_ext] !== 'application/octet-stream' &&
                    (from > to ||
                        (from === to && _types[_ext].substr(0, 12) === 'application/'))) {
                    // skip the remapping
                    continue;
                }
            }
            // set the extension -> mime
            types[_ext] = type;
        }
    });
}
function mimeContentType(str) {
    if (!str || typeof str !== 'string') {
        return false;
    }
    let mime = str.indexOf('/') === -1 ? mimeLookup(str) : str;
    if (!mime) {
        return false;
    }
    if (mime.indexOf('charset') === -1) {
        const _charset = charset(mime);
        if (_charset)
            mime += '; charset=' + _charset.toLowerCase();
    }
    return mime;
}
exports.mimeContentType = mimeContentType;
const EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
const TEXT_TYPE_REGEXP = /^text\//i;
function charset(type) {
    if (!type || typeof type !== 'string') {
        return false;
    }
    const match = EXTRACT_TYPE_REGEXP.exec(type);
    const mime = match && mime_db_1.mimeDb[match[1].toLowerCase()];
    if (mime === null || mime === void 0 ? void 0 : mime.charset) {
        return mime.charset;
    }
    // default text/* to utf-8
    if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return 'UTF-8';
    }
    return false;
}
