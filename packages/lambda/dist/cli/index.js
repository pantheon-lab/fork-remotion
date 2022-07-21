"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = exports.executeCommand = void 0;
const cli_1 = require("@remotion/cli");
const suggested_policy_1 = require("../api/iam-validation/suggested-policy");
const defaults_1 = require("../defaults");
const check_credentials_1 = require("../shared/check-credentials");
const docs_url_1 = require("../shared/docs-url");
const args_1 = require("./args");
const functions_1 = require("./commands/functions");
const policies_1 = require("./commands/policies/policies");
const role_1 = require("./commands/policies/role");
const user_1 = require("./commands/policies/user");
const quotas_1 = require("./commands/quotas");
const regions_1 = require("./commands/regions");
const render_1 = require("./commands/render/render");
const sites_1 = require("./commands/sites");
const still_1 = require("./commands/still");
const help_1 = require("./help");
const quit_1 = require("./helpers/quit");
const is_cli_1 = require("./is-cli");
const log_1 = require("./log");
const requiresCredentials = (args) => {
    if (args[0] === policies_1.POLICIES_COMMAND) {
        if (args[1] === user_1.USER_SUBCOMMAND) {
            return false;
        }
        if (args[1] === role_1.ROLE_SUBCOMMAND) {
            return false;
        }
        if (args[1] === regions_1.REGIONS_COMMAND) {
            return false;
        }
    }
    return true;
};
const matchCommand = (args) => {
    if (args_1.parsedLambdaCli.help || args.length === 0) {
        (0, help_1.printHelp)();
        (0, quit_1.quit)(0);
    }
    if (requiresCredentials(args)) {
        (0, check_credentials_1.checkCredentials)();
    }
    if (args[0] === render_1.RENDER_COMMAND) {
        return (0, render_1.renderCommand)(args.slice(1));
    }
    if (args[0] === still_1.STILL_COMMAND) {
        return (0, still_1.stillCommand)(args.slice(1));
    }
    if (args[0] === functions_1.FUNCTIONS_COMMAND) {
        return (0, functions_1.functionsCommand)(args.slice(1));
    }
    if (args[0] === quotas_1.QUOTAS_COMMAND) {
        return (0, quotas_1.quotasCommand)(args.slice(1));
    }
    if (args[0] === policies_1.POLICIES_COMMAND) {
        return (0, policies_1.policiesCommand)(args.slice(1));
    }
    if (args[0] === regions_1.REGIONS_COMMAND) {
        return (0, regions_1.regionsCommand)();
    }
    if (args[0] === sites_1.SITES_COMMAND) {
        return (0, sites_1.sitesCommand)(args.slice(1));
    }
    if (args[0] === 'upload') {
        log_1.Log.info('The command has been renamed.');
        log_1.Log.info('Before: remotion-lambda upload <entry-point>');
        log_1.Log.info('After: remotion lambda sites create <entry-point>');
        (0, quit_1.quit)(1);
    }
    if (args[0] === 'deploy') {
        log_1.Log.info('The command has been renamed.');
        log_1.Log.info('Before: remotion-lambda deploy');
        log_1.Log.info('After: remotion lambda functions deploy');
        (0, quit_1.quit)(1);
    }
    if (args[0] === 'ls') {
        log_1.Log.info(`The "ls" command does not exist.`);
        log_1.Log.info(`Did you mean "functions ls" or "sites ls"?`);
    }
    if (args[0] === 'rm') {
        log_1.Log.info(`The "rm" command does not exist.`);
        log_1.Log.info(`Did you mean "functions rm" or "sites rm"?`);
    }
    if (args[0] === 'deploy') {
        log_1.Log.info(`The "deploy" command does not exist.`);
        log_1.Log.info(`Did you mean "functions deploy"?`);
    }
    log_1.Log.error(`Command ${args[0]} not found.`);
    (0, help_1.printHelp)();
    (0, quit_1.quit)(1);
};
const executeCommand = async (args) => {
    var _a, _b;
    try {
        (0, is_cli_1.setIsCli)(true);
        await matchCommand(args);
    }
    catch (err) {
        const error = err;
        if (error.message.includes('The role defined for the function cannot be assumed by Lambda')) {
            if (args_1.parsedLambdaCli['custom-role-arn']) {
                log_1.Log.error(`
	The role "${args_1.parsedLambdaCli['custom-role-arn']}" does not exist or has the wrong policy assigned to it. Do either:
	- Remove the "--custom-role-arn" parameter and set up Remotion Lambda according to the setup guide
	- Make sure the role has the same policy assigned as the one returned by "npx ${defaults_1.BINARY_NAME} ${policies_1.POLICIES_COMMAND} ${role_1.ROLE_SUBCOMMAND}"
	
	Revisit ${docs_url_1.DOCS_URL}/docs/lambda/setup and make sure you set up the role and role policy correctly. Also see the troubleshooting page: ${docs_url_1.DOCS_URL}/docs/lambda/troubleshooting/permissions. The original error message is:
	`.trim());
            }
            log_1.Log.error(`
The role "${suggested_policy_1.ROLE_NAME}" does not exist in your AWS account or has the wrong policy assigned to it. Common reasons:
- The name of the role is not "${suggested_policy_1.ROLE_NAME}"
- The policy is not exactly as specified in the setup guide

Revisit ${docs_url_1.DOCS_URL}/docs/lambda/setup and make sure you set up the role and role policy correctly. Also see the troubleshooting page: ${docs_url_1.DOCS_URL}/docs/lambda/troubleshooting/permissions. The original error message is:
`.trim());
        }
        if ((_a = error.stack) === null || _a === void 0 ? void 0 : _a.includes('AccessDenied')) {
            log_1.Log.error(`
AWS returned an "AccessDenied" error message meaning a permission is missing. Read the permissions troubleshooting page: ${docs_url_1.DOCS_URL}/docs/lambda/troubleshooting/permissions. The original error message is:
`.trim());
        }
        if ((_b = error.stack) === null || _b === void 0 ? void 0 : _b.includes('TooManyRequestsException')) {
            log_1.Log.error(`
AWS returned an "TooManyRequestsException" error message which could mean you reached the concurrency limit of AWS Lambda. You can increase the limit - read this troubleshooting page: ${docs_url_1.DOCS_URL}/docs/lambda/troubleshooting/rate-limit. The original error message is:
`.trim());
        }
        log_1.Log.error(error.stack);
        (0, quit_1.quit)(1);
    }
};
exports.executeCommand = executeCommand;
const cli = async () => {
    await cli_1.CliInternals.initializeRenderCli('lambda');
    await (0, exports.executeCommand)(args_1.parsedLambdaCli._);
};
exports.cli = cli;
