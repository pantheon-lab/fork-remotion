"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionInfo = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const get_function_version_1 = require("../shared/get-function-version");
const validate_aws_region_1 = require("../shared/validate-aws-region");
/**
 * @description Given a region and function name, returns information about the function such as version, memory size and timeout.
 * @link https://remotion.dev/docs/lambda/getfunctioninfo
 * @param {AwsRegion} options.region The region in which the function resides in.
 * @param {string} options.functionName The name of the function
 * @return {Promise<FunctionInfo>} Promise resolving to information about the function.
 */
const getFunctionInfo = async ({ region, functionName, }) => {
    var _a, _b, _c, _d, _e;
    (0, validate_aws_region_1.validateAwsRegion)(region);
    const [functionInfo, version] = await Promise.all([
        (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.GetFunctionCommand({
            FunctionName: functionName,
        })),
        (0, get_function_version_1.getFunctionVersion)({
            functionName,
            region,
        }),
    ]);
    return {
        functionName,
        timeoutInSeconds: (_a = functionInfo.Configuration) === null || _a === void 0 ? void 0 : _a.Timeout,
        memorySizeInMb: (_b = functionInfo.Configuration) === null || _b === void 0 ? void 0 : _b.MemorySize,
        version,
        diskSizeInMb: (_e = (_d = (_c = functionInfo.Configuration) === null || _c === void 0 ? void 0 : _c.EphemeralStorage) === null || _d === void 0 ? void 0 : _d.Size) !== null && _e !== void 0 ? _e : constants_1.DEFAULT_EPHEMERAL_STORAGE_IN_MB,
    };
};
exports.getFunctionInfo = getFunctionInfo;
