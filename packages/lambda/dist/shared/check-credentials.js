"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCredentials = void 0;
const remotion_1 = require("remotion");
const is_cli_1 = require("../cli/is-cli");
const docs_url_1 = require("./docs-url");
const messageForVariable = (variable) => {
    return [
        `You have tried to call a Remotion Lambda function, but have not set the environment variable ${variable}.`,
        (0, is_cli_1.getIsCli)()
            ? null
            : `- Environment variables from a '.env' file are not automatically read if you are calling the Node.JS APIs, in that case you need to load the file yourself or set the environment variables manually.`,
        `- Please refer to the Remotion Lambda docs (${docs_url_1.DOCS_URL}/docs/lambda/setup) to see how to generate the credentials for your AWS account and then set the environment variables.`,
        `- For more reasons see the troubleshooting page: ${docs_url_1.DOCS_URL}/docs/lambda/troubleshooting/permissions`,
    ]
        .filter(remotion_1.Internals.truthy)
        .join('\n');
};
const checkCredentials = () => {
    if (!process.env.AWS_ACCESS_KEY_ID &&
        !process.env.REMOTION_AWS_ACCESS_KEY_ID) {
        throw new Error(messageForVariable('AWS_ACCESS_KEY_ID or REMOTION_AWS_ACCESS_KEY_ID'));
    }
    if (!process.env.AWS_SECRET_ACCESS_KEY &&
        !process.env.REMOTION_AWS_SECRET_ACCESS_KEY) {
        throw new Error(messageForVariable('AWS_SECRET_ACCESS_KEY or REMOTION_AWS_SECRET_ACCESS_KEY'));
    }
};
exports.checkCredentials = checkCredentials;
