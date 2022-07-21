"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFunction = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const aws_clients_1 = require("../shared/aws-clients");
/**
 * @description Deletes a function from AWS Lambda.
 * @link https://remotion.dev/docs/lambda/deletefunction
 * @param options.region The region the function was deployed to.
 * @param options.functionName The name of the function.
 * @returns {Promise<void>} Nothing. Throws if the function failed to delete.
 */
const deleteFunction = async ({ region, functionName, }) => {
    await (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.DeleteFunctionCommand({
        FunctionName: functionName,
    }));
};
exports.deleteFunction = deleteFunction;
