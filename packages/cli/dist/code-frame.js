"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCodeFrameAndStack = void 0;
const remotion_1 = require("remotion");
const chalk_1 = require("./chalk");
const log_1 = require("./log");
const makeFileName = (firstFrame) => {
    return [
        firstFrame.originalFileName,
        firstFrame.originalLineNumber,
        firstFrame.originalColumnNumber === 0
            ? null
            : firstFrame.originalColumnNumber,
    ]
        .filter(remotion_1.Internals.truthy)
        .join(':');
};
const printCodeFrame = (frame) => {
    if (!frame.originalScriptCode) {
        return;
    }
    log_1.Log.info();
    const longestLineNumber = Math.max(...frame.originalScriptCode.map((script) => script.lineNumber)).toString().length;
    log_1.Log.info('at', chalk_1.chalk.underline(makeFileName(frame)));
    const alignLeftAmount = Math.min(...frame.originalScriptCode.map((c) => c.content.length - c.content.trimStart().length));
    log_1.Log.info(`${frame.originalScriptCode
        .map((c) => {
        const content = `${String(c.lineNumber).padStart(longestLineNumber, ' ')} | ${c.content.substring(alignLeftAmount)}`;
        return c.highlight ? content : chalk_1.chalk.gray(content);
    })
        .join('\n')}`);
};
const logLine = (frame) => {
    const fileName = makeFileName(frame);
    if (!fileName) {
        return;
    }
    log_1.Log.info(chalk_1.chalk.gray(['at', frame.originalFunctionName, `${chalk_1.chalk.blueBright(`(${fileName})`)}`]
        .filter(remotion_1.Internals.truthy)
        .join(' ')));
};
const printCodeFrameAndStack = (err) => {
    var _a, _b, _c;
    if (!err.symbolicatedStackFrames) {
        log_1.Log.error(err.stack);
        return;
    }
    const firstFrame = err.symbolicatedStackFrames[0];
    log_1.Log.error(chalk_1.chalk.bgRed(chalk_1.chalk.white(` ${err.name} `)), err.message);
    printCodeFrame(firstFrame);
    log_1.Log.info();
    for (const frame of err.symbolicatedStackFrames) {
        if (frame === firstFrame) {
            continue;
        }
        logLine(frame);
    }
    if (err.delayRenderCall) {
        log_1.Log.error();
        log_1.Log.error('🕧 The delayRender() call is located at:');
        for (const frame of err.delayRenderCall) {
            const showCodeFrame = (!((_a = frame.originalFileName) === null || _a === void 0 ? void 0 : _a.includes('node_modules')) &&
                !((_b = frame.originalFileName) === null || _b === void 0 ? void 0 : _b.startsWith('webpack/'))) ||
                frame === err.delayRenderCall[0] ||
                ((_c = frame.originalScriptCode) === null || _c === void 0 ? void 0 : _c.map((c) => c.content).join('').includes('delayRender'));
            if (showCodeFrame) {
                printCodeFrame(frame);
            }
            else {
                logLine(frame);
            }
        }
    }
};
exports.printCodeFrameAndStack = printCodeFrameAndStack;
