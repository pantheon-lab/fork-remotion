"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamToString = void 0;
function streamToString(stream) {
    if (Buffer.isBuffer(stream)) {
        return stream.toString('utf-8');
    }
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
exports.streamToString = streamToString;
