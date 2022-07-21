"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessStdErrOutput = exports.getProcessWriteOutput = void 0;
const remotion_1 = require("remotion");
const mock_functions_1 = require("../../api/mock-functions");
let stdoutOutput = [];
let stderrOutput = [];
const getProcessWriteOutput = () => {
    return stdoutOutput
        .filter(remotion_1.Internals.truthy)
        .map((c) => c.toString())
        .join('\n');
};
exports.getProcessWriteOutput = getProcessWriteOutput;
const getProcessStdErrOutput = () => {
    return stderrOutput
        .filter(remotion_1.Internals.truthy)
        .map((c) => c.toString())
        .join('\n');
};
exports.getProcessStdErrOutput = getProcessStdErrOutput;
const originalStdout = process.stdout.write;
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalStderr = process.stderr.write;
beforeEach(() => {
    stdoutOutput = [];
    stderrOutput = [];
    (0, mock_functions_1.cleanFnStore)();
    // @ts-expect-error
    process.stdout.write = (str) => {
        //	originalStdout(str);
        stdoutOutput.push(str);
    };
    console.log = (str) => {
        // originalStdout(str);
        stdoutOutput.push(str);
    };
    console.error = (str) => {
        // originalStderr(str);
        stderrOutput.push(str);
    };
    // @ts-expect-error
    process.stderr.write = (str) => {
        // originalStderr(str);
        stderrOutput.push(str);
    };
});
afterEach(() => {
    process.stdout.write = originalStdout;
    process.stderr.write = originalStderr;
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
});
