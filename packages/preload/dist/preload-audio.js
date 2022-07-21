"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadAudio = void 0;
const resolve_redirect_1 = require("./resolve-redirect");
const preloadAudio = (src) => {
    if (typeof document === 'undefined') {
        console.warn('preloadAudio() was called outside the browser. Doing nothing.');
        return () => undefined;
    }
    const resolved = (0, resolve_redirect_1.resolveRedirect)(src);
    let cancelled = false;
    if (navigator.userAgent.match(/Firefox\//)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'audio';
        resolved
            .then((realUrl) => {
            if (!cancelled) {
                link.href = realUrl;
                document.head.appendChild(link);
            }
        })
            .catch((err) => {
            console.log(`Failed to preload audio`, err);
        });
        return () => {
            cancelled = true;
            link.remove();
        };
    }
    const vid = document.createElement('audio');
    vid.preload = 'auto';
    vid.controls = true;
    vid.style.display = 'none';
    resolved
        .then((realUrl) => {
        if (!cancelled) {
            vid.src = realUrl;
            document.body.appendChild(vid);
        }
    })
        .catch((err) => {
        console.log('Failed to preload audio', err);
    });
    return () => {
        cancelled = true;
        vid.remove();
    };
};
exports.preloadAudio = preloadAudio;
