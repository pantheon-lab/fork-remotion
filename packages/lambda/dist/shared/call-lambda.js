"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLambda = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const aws_clients_1 = require("./aws-clients");
const callLambda = async ({ functionName, type, payload, region, }) => {
    var _a;
    const res = await (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.InvokeCommand({
        FunctionName: functionName,
        // @ts-expect-error
        Payload: JSON.stringify({ type, ...payload }),
    }));
    const string = Buffer.from(res.Payload).toString();
    const json = JSON.parse(string);
    if ('errorMessage' in json) {
        const err = new Error(json.errorMessage);
        err.name = json.errorType;
        err.stack = ((_a = json.trace) !== null && _a !== void 0 ? _a : []).join('\n');
        throw err;
    }
    return json;
};
exports.callLambda = callLambda;
