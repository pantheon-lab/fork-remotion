"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stillCommand = exports.STILL_COMMAND = void 0;
const cli_1 = require("@remotion/cli");
const renderer_1 = require("@remotion/renderer");
const download_media_1 = require("../../api/download-media");
const render_still_on_lambda_1 = require("../../api/render-still-on-lambda");
const constants_1 = require("../../shared/constants");
const validate_privacy_1 = require("../../shared/validate-privacy");
const validate_retries_1 = require("../../shared/validate-retries");
const args_1 = require("../args");
const get_aws_region_1 = require("../get-aws-region");
const find_function_name_1 = require("../helpers/find-function-name");
const get_cloudwatch_stream_url_1 = require("../helpers/get-cloudwatch-stream-url");
const quit_1 = require("../helpers/quit");
const log_1 = require("../log");
exports.STILL_COMMAND = 'still';
const stillCommand = async (args) => {
    var _a, _b, _c, _d;
    const serveUrl = args[0];
    if (!serveUrl) {
        log_1.Log.error('No serve URL passed.');
        log_1.Log.info('Pass an additional argument specifying a URL where your Remotion project is hosted.');
        log_1.Log.info();
        log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.STILL_COMMAND} <serve-url> <composition-id>  [output-location]`);
        (0, quit_1.quit)(1);
    }
    const composition = args[1];
    if (!composition) {
        log_1.Log.error('No composition ID passed.');
        log_1.Log.info('Pass an additional argument specifying the composition ID.');
        log_1.Log.info();
        log_1.Log.info(`${constants_1.BINARY_NAME} ${exports.STILL_COMMAND} <serve-url> <composition-id> [output-location]`);
        (0, quit_1.quit)(1);
    }
    const outName = (_a = args[2]) !== null && _a !== void 0 ? _a : null;
    const { chromiumOptions, envVariables, imageFormat, inputProps, logLevel, puppeteerTimeout, quality, stillFrame, scale, } = await cli_1.CliInternals.getCliOptions({
        type: 'still',
        isLambda: true,
    });
    const functionName = await (0, find_function_name_1.findFunctionName)();
    const maxRetries = (_b = args_1.parsedLambdaCli['max-retries']) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_MAX_RETRIES;
    (0, validate_retries_1.validateMaxRetries)(maxRetries);
    const privacy = (_c = args_1.parsedLambdaCli.privacy) !== null && _c !== void 0 ? _c : constants_1.DEFAULT_OUTPUT_PRIVACY;
    (0, validate_privacy_1.validatePrivacy)(privacy);
    try {
        const res = await (0, render_still_on_lambda_1.renderStillOnLambda)({
            functionName,
            serveUrl,
            inputProps,
            imageFormat: imageFormat,
            composition,
            privacy,
            region: (0, get_aws_region_1.getAwsRegion)(),
            maxRetries,
            envVariables,
            frame: stillFrame,
            quality,
            logLevel,
            outName: args_1.parsedLambdaCli['out-name'],
            chromiumOptions,
            timeoutInMilliseconds: puppeteerTimeout,
            scale,
        });
        log_1.Log.verbose(cli_1.CliInternals.chalk.gray(`Bucket = ${res.bucketName}, renderId = ${res.renderId}, functionName = ${functionName}`));
        log_1.Log.verbose(`CloudWatch logs (if enabled): ${(0, get_cloudwatch_stream_url_1.getCloudwatchStreamUrl)({
            functionName,
            region: (0, get_aws_region_1.getAwsRegion)(),
            renderId: res.renderId,
            method: constants_1.LambdaRoutines.still,
        })}`);
        if (outName) {
            log_1.Log.info('Finished rendering. Downloading...');
            const { outputPath, sizeInBytes } = await (0, download_media_1.downloadMedia)({
                bucketName: res.bucketName,
                outPath: outName,
                region: (0, get_aws_region_1.getAwsRegion)(),
                renderId: res.renderId,
            });
            log_1.Log.info('Done!', outputPath, cli_1.CliInternals.formatBytes(sizeInBytes));
        }
        else {
            log_1.Log.info(`Finished still!`);
            log_1.Log.info();
            log_1.Log.info(res.url);
        }
    }
    catch (err) {
        const frames = renderer_1.RenderInternals.parseStack(((_d = err.stack) !== null && _d !== void 0 ? _d : '').split('\n'));
        const errorWithStackFrame = new renderer_1.RenderInternals.SymbolicateableError({
            message: err.message,
            frame: null,
            name: err.name,
            stack: err.stack,
            stackFrame: frames,
        });
        await cli_1.CliInternals.handleCommonError(errorWithStackFrame);
        (0, quit_1.quit)(1);
    }
};
exports.stillCommand = stillCommand;
