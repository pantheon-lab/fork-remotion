"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomHash = void 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const randomHash = (_options) => {
    return new Array(10)
        .fill(1)
        .map(() => {
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    })
        .join('');
};
exports.randomHash = randomHash;
