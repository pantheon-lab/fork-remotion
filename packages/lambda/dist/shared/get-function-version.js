"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionVersion = void 0;
const call_lambda_1 = require("./call-lambda");
const constants_1 = require("./constants");
const getFunctionVersion = async ({ functionName, region, }) => {
    try {
        const result = await (0, call_lambda_1.callLambda)({
            functionName,
            payload: {
                type: constants_1.LambdaRoutines.info,
            },
            region,
            type: constants_1.LambdaRoutines.info,
        });
        return result.version;
    }
    catch (err) {
        // Prerelease versions had no info command
        if (err.message.includes(constants_1.COMMAND_NOT_FOUND)) {
            return 'n/a';
        }
        // Bug in certain version of AWS S3 kit
        if (err.message.includes('AWS CRT binary not present ')) {
            return 'n/a';
        }
        throw err;
    }
};
exports.getFunctionVersion = getFunctionVersion;
