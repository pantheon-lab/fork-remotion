"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_file_source_1 = require("../../preview-server/error-overlay/react-overlay/utils/get-file-source");
(0, vitest_1.test)('Should not allow to read files outside of the project', () => {
    (0, vitest_1.expect)(() => (0, get_file_source_1.getFileSource)('/etc/passwd')).toThrow(/Not allowed to open/);
    (0, vitest_1.expect)(() => (0, get_file_source_1.getFileSource)('.env')).toThrow(/Not allowed to open/);
});
