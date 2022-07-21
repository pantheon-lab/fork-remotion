"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const make_s3_key_1 = require("../../shared/make-s3-key");
test('makeS3Key should return POSIX syntax cross-platform', () => {
    if (process.platform === 'win32') {
        const key = (0, make_s3_key_1.makeS3Key)('renders/234kj324', 'C:\\Users\\Jonny\\Pictures', 'C:\\Users\\Jonny\\Pictures\\public\\index.mp4');
        expect(key).toEqual('renders/234kj324/public/index.mp4');
    }
    else {
        const key2 = (0, make_s3_key_1.makeS3Key)('renders/234kj324', '/tmp/test/', '/tmp/test/public/index.mp4');
        expect(key2).toEqual('renders/234kj324/public/index.mp4');
    }
});
