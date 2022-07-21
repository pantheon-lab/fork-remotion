"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndValidateNumberOfGifLoops = exports.setNumberOfGifLoops = void 0;
let currentLoop = null;
const setNumberOfGifLoops = (newLoop) => {
    if (newLoop !== null && typeof newLoop !== 'number') {
        throw new Error('--number-of-gif-loops flag must be a number.');
    }
    currentLoop = newLoop;
};
exports.setNumberOfGifLoops = setNumberOfGifLoops;
const getAndValidateNumberOfGifLoops = (codec) => {
    if (currentLoop === null) {
        return currentLoop;
    }
    if (codec !== 'gif') {
        throw new Error(`The "numberOfGifLoops" setting can only be used for GIFs. The codec is set to ${codec}`);
    }
    return currentLoop;
};
exports.getAndValidateNumberOfGifLoops = getAndValidateNumberOfGifLoops;
