"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePresignExpiration = exports.MIN_PRESIGN_EXPIRATION = exports.MAX_PRESIGN_EXPIRATION = void 0;
exports.MAX_PRESIGN_EXPIRATION = 604800;
exports.MIN_PRESIGN_EXPIRATION = 1;
const validatePresignExpiration = (presignExpiration) => {
    if (typeof presignExpiration === 'undefined' || presignExpiration === null) {
        return;
    }
    if (typeof presignExpiration !== 'number') {
        throw new TypeError(`'expiresIn' should be a number, but is ${JSON.stringify(presignExpiration)}`);
    }
    if (Number.isNaN(presignExpiration)) {
        throw new TypeError(`'expiresIn' should not be NaN, but is NaN`);
    }
    if (!Number.isFinite(presignExpiration)) {
        throw new TypeError(`'expiresIn' should be finite but is ${presignExpiration}`);
    }
    if (presignExpiration % 1 !== 0) {
        throw new TypeError(`'expiresIn' should be an integer but is ${JSON.stringify(presignExpiration)}`);
    }
    if (presignExpiration > exports.MAX_PRESIGN_EXPIRATION) {
        throw new TypeError(`The 'expiresIn' parameter must be less or equal than ${exports.MAX_PRESIGN_EXPIRATION} (7 days) as enforced by AWS`);
    }
    if (presignExpiration < exports.MIN_PRESIGN_EXPIRATION) {
        throw new TypeError(`The 'expiresIn' parameter must be greater or equal than ${exports.MIN_PRESIGN_EXPIRATION}`);
    }
};
exports.validatePresignExpiration = validatePresignExpiration;
