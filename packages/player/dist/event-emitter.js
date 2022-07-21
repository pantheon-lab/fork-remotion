"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEmitter = void 0;
class PlayerEmitter {
    constructor() {
        this.listeners = {
            ended: [],
            error: [],
            pause: [],
            play: [],
            ratechange: [],
            seeked: [],
            timeupdate: [],
        };
    }
    addEventListener(name, callback) {
        this.listeners[name].push(callback);
    }
    removeEventListener(name, callback) {
        this.listeners[name] = this.listeners[name].filter((l) => l !== callback);
    }
    dispatchEvent(dispatchName, context) {
        this.listeners[dispatchName].forEach((callback) => {
            callback({ detail: context });
        });
    }
    dispatchSeek(frame) {
        this.dispatchEvent('seeked', {
            frame,
        });
    }
    dispatchPause() {
        this.dispatchEvent('pause', undefined);
    }
    dispatchPlay() {
        this.dispatchEvent('play', undefined);
    }
    dispatchEnded() {
        this.dispatchEvent('ended', undefined);
    }
    dispatchRatechange(playbackRate) {
        this.dispatchEvent('ratechange', {
            playbackRate,
        });
    }
    dispatchError(error) {
        this.dispatchEvent('error', {
            error,
        });
    }
    dispatchTimeUpdate(event) {
        this.dispatchEvent('timeupdate', event);
    }
}
exports.PlayerEmitter = PlayerEmitter;
