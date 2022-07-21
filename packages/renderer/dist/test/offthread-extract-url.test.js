"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const offthread_video_server_1 = require("../offthread-video-server");
(0, vitest_1.test)('Extract URL correctly', () => {
    (0, vitest_1.expect)((0, offthread_video_server_1.extractUrlAndSourceFromUrl)('/proxy?src=http%3A%2F%2Flocalhost%3A3000%2Fpublic%2Fframermp4withoutfileextension&time=1.3&imageFormat=png')).toEqual({
        src: 'http://localhost:3000/public/framermp4withoutfileextension',
        time: 1.3,
        imageFormat: 'png',
    });
});
