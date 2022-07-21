"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrivacy = void 0;
function validatePrivacy(privacy) {
    if (typeof privacy !== 'string') {
        throw new TypeError('Privacy must be a string');
    }
    if (privacy !== 'private' && privacy !== 'public') {
        throw new TypeError('Privacy must be either "private" or "public-read"');
    }
}
exports.validatePrivacy = validatePrivacy;
