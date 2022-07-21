"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_function_1 = require("../../api/delete-function");
const deploy_function_1 = require("../../api/deploy-function");
const get_functions_1 = require("../../api/get-functions");
const mock_functions_1 = require("../../api/mock-functions");
const constants_1 = require("../../shared/constants");
const expectedFunctionName = (memory, timeout, disk) => `remotion-render-${constants_1.CURRENT_VERSION}-mem${memory}mb-disk${disk}mb-${timeout}sec`;
test('Should be able to deploy function', async () => {
    const { functionName } = await (0, deploy_function_1.deployFunction)({
        memorySizeInMb: 2048,
        region: 'us-east-1',
        timeoutInSeconds: 120,
        createCloudWatchLogGroup: true,
        architecture: 'arm64',
    });
    expect(functionName).toBe(expectedFunctionName(2048, 120, 512));
});
test('Should be able to get the function afterwards', async () => {
    (0, mock_functions_1.cleanFnStore)();
    const { functionName } = await (0, deploy_function_1.deployFunction)({
        memorySizeInMb: 2048,
        region: 'us-east-1',
        timeoutInSeconds: 120,
        createCloudWatchLogGroup: true,
        architecture: 'arm64',
    });
    expect(functionName).toBe(expectedFunctionName(2048, 120, 512));
    const fns = await (0, get_functions_1.getFunctions)({
        region: 'us-east-1',
        compatibleOnly: true,
    });
    expect(fns).toEqual([
        {
            functionName: expectedFunctionName(2048, 120, 512),
            memorySizeInMb: 2048,
            timeoutInSeconds: 120,
            version: constants_1.CURRENT_VERSION,
            region: 'us-east-1',
            diskSizeInMb: 512,
        },
    ]);
    const foreignFunctions = await (0, get_functions_1.getFunctions)({
        region: 'us-east-2',
        compatibleOnly: true,
    });
    expect(foreignFunctions).toEqual([]);
});
test('Should be able to delete the function', async () => {
    (0, mock_functions_1.cleanFnStore)();
    const { functionName } = await (0, deploy_function_1.deployFunction)({
        memorySizeInMb: 2048,
        region: 'us-east-1',
        timeoutInSeconds: 120,
        createCloudWatchLogGroup: true,
        architecture: 'arm64',
    });
    expect(functionName).toBe(expectedFunctionName(2048, 120, 512));
    await (0, delete_function_1.deleteFunction)({
        region: 'us-east-1',
        functionName: expectedFunctionName(2048, 120, 512),
    });
    const fns = await (0, get_functions_1.getFunctions)({
        region: 'us-east-1',
        compatibleOnly: true,
    });
    expect(fns).toEqual([]);
});
test('Should be able to get the function afterwards', async () => {
    (0, mock_functions_1.cleanFnStore)();
    const { functionName } = await (0, deploy_function_1.deployFunction)({
        memorySizeInMb: 2048,
        region: 'us-east-1',
        timeoutInSeconds: 120,
        createCloudWatchLogGroup: true,
        architecture: 'arm64',
    });
    expect(functionName).toBe(expectedFunctionName(2048, 120, 512));
    const fns = await (0, get_functions_1.getFunctions)({
        region: 'us-east-1',
        compatibleOnly: true,
    });
    expect(fns).toEqual([
        {
            functionName: expectedFunctionName(2048, 120, 512),
            memorySizeInMb: 2048,
            timeoutInSeconds: 120,
            version: constants_1.CURRENT_VERSION,
            region: 'us-east-1',
            diskSizeInMb: 512,
        },
    ]);
    (0, mock_functions_1.markFunctionAsIncompatible)(expectedFunctionName(2048, 120, 512));
    const compatibleFns = await (0, get_functions_1.getFunctions)({
        region: 'us-east-1',
        compatibleOnly: true,
    });
    const incompatibleFns = await (0, get_functions_1.getFunctions)({
        region: 'us-east-1',
        compatibleOnly: false,
    });
    expect(compatibleFns).toEqual([]);
    expect(incompatibleFns).toEqual([
        {
            functionName: expectedFunctionName(2048, 120, 512),
            memorySizeInMb: 2048,
            timeoutInSeconds: 120,
            version: '2021-06-23',
            region: 'us-east-1',
            diskSizeInMb: 512,
        },
    ]);
});
