"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectErrors = void 0;
const remotion_1 = require("remotion");
const constants_1 = require("../../shared/constants");
const docs_url_1 = require("../../shared/docs-url");
const stream_to_string_1 = require("../../shared/stream-to-string");
const io_1 = require("./io");
const is_enosp_err_1 = require("./is-enosp-err");
const FAILED_TO_LAUNCH_TOKEN = 'Failed to launch browser.';
const getExplanation = (stack) => {
    if (stack.includes('FATAL:zygote_communication_linux.cc')) {
        return (FAILED_TO_LAUNCH_TOKEN +
            ' Will be retried - you can probably ignore this error.');
    }
    if (stack.includes('error while loading shared libraries: libnss3.so')) {
        return (FAILED_TO_LAUNCH_TOKEN +
            ' Will be retried - you can probably ignore this error.');
    }
    if (stack.includes('TooManyRequestsException')) {
        return `AWS returned an "TooManyRequestsException" error message which could mean you reached the concurrency limit of AWS Lambda. You can increase the limit - read this troubleshooting page: ${docs_url_1.DOCS_URL}/docs/lambda/troubleshooting/rate-limit`;
    }
    if ((0, is_enosp_err_1.errorIsOutOfSpaceError)(stack)) {
        return `Your lambda function reached the storage limit. Reduce the amount of space needed per lambda function or increase the storage limit: ${docs_url_1.DOCS_URL}/docs/lambda/disk-size.`;
    }
    if ((0, is_enosp_err_1.isErrInsufficientResourcesErr)(stack)) {
        return 'The lambda ran out of memory. Deploy a new function with more memory.';
    }
    if ((0, is_enosp_err_1.isBrowserCrashedError)(stack)) {
        return 'The browser crashed while rendering the video. Deploy a new function with memory to give the browser more resources.';
    }
    return null;
};
const inspectErrors = async ({ contents, bucket, region, renderId, expectedBucketOwner, }) => {
    const errs = contents
        .filter((c) => { var _a; return (_a = c.Key) === null || _a === void 0 ? void 0 : _a.startsWith((0, constants_1.getErrorKeyPrefix)(renderId)); })
        .map((c) => c.Key)
        .filter(remotion_1.Internals.truthy);
    if (errs.length === 0) {
        return [];
    }
    const errors = await Promise.all(errs.map(async (key) => {
        const Body = await (0, io_1.lambdaReadFile)({
            bucketName: bucket,
            key,
            region,
            expectedBucketOwner,
        });
        const errorLog = await (0, stream_to_string_1.streamToString)(Body);
        return errorLog;
    }));
    return errors.map((e, index) => {
        const parsed = JSON.parse(e);
        return {
            ...parsed,
            explanation: getExplanation(parsed.stack),
            s3Location: errs[index],
        };
    });
};
exports.inspectErrors = inspectErrors;
