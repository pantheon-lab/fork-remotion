"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctions = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const get_function_version_1 = require("../shared/get-function-version");
const getAllFunctions = async ({ existing, nextMarker, region, }) => {
    const allLambdas = [...existing];
    const lambdas = await (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.ListFunctionsCommand({
        Marker: nextMarker !== null && nextMarker !== void 0 ? nextMarker : undefined,
    }));
    if (!lambdas.Functions) {
        return allLambdas;
    }
    for (const lambda of lambdas.Functions) {
        allLambdas.push(lambda);
    }
    if (lambdas.NextMarker) {
        return getAllFunctions({
            existing: allLambdas,
            nextMarker: lambdas.NextMarker,
            region,
        });
    }
    return allLambdas;
};
/**
 *
 *
 * @description Lists Remotion Lambda render functions deployed to AWS Lambda.
 * @link https://remotion.dev/docs/lambda/getfunctions
 * @param options.region The region of which the functions should be listed.
 * @param options.compatibleOnly Whether only functions compatible with the installed version of Remotion Lambda should be returned.
 * @returns {Promise<FunctionInfo[]>} An array with the objects containing information about the deployed functions.
 */
const getFunctions = async (options) => {
    const lambdas = await getAllFunctions({
        existing: [],
        nextMarker: null,
        region: options.region,
    });
    const remotionLambdas = lambdas.filter((f) => {
        var _a;
        return (_a = f.FunctionName) === null || _a === void 0 ? void 0 : _a.startsWith(constants_1.RENDER_FN_PREFIX);
    });
    const configs = await Promise.all(remotionLambdas.map(async (fn) => {
        try {
            const version = await (0, get_function_version_1.getFunctionVersion)({
                functionName: fn.FunctionName,
                region: options.region,
            });
            return version;
        }
        catch (err) {
            return null;
        }
    }));
    const list = remotionLambdas.map((lambda, i) => {
        var _a, _b;
        return {
            functionName: lambda.FunctionName,
            version: configs[i],
            memorySizeInMb: lambda.MemorySize,
            timeoutInSeconds: lambda.Timeout,
            diskSizeInMb: (_b = (_a = lambda.EphemeralStorage) === null || _a === void 0 ? void 0 : _a.Size) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_EPHEMERAL_STORAGE_IN_MB,
        };
    });
    if (!options.compatibleOnly) {
        return list;
    }
    return list.filter((l) => {
        if (!options.compatibleOnly) {
            return true;
        }
        return l.version === constants_1.CURRENT_VERSION;
    });
};
exports.getFunctions = getFunctions;
