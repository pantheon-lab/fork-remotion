"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaCommand = void 0;
const initialize_render_cli_1 = require("./initialize-render-cli");
const log_1 = require("./log");
const parse_command_line_1 = require("./parse-command-line");
const get_package_manager_1 = require("./preview-server/get-package-manager");
const update_available_1 = require("./preview-server/update-available");
const lambdaCommand = async () => {
    try {
        const path = require.resolve('@remotion/lambda', {
            paths: [process.cwd()],
        });
        const { LambdaInternals } = require(path);
        await (0, initialize_render_cli_1.initializeRenderCli)('lambda');
        await LambdaInternals.executeCommand(parse_command_line_1.parsedCli._.slice(1));
        process.exit(0);
    }
    catch (err) {
        const manager = (0, get_package_manager_1.getPackageManager)();
        const installCommand = manager === 'unknown' ? 'npm i' : manager.installCommand;
        log_1.Log.error(err);
        log_1.Log.error('Remotion Lambda is not installed.');
        log_1.Log.info('');
        log_1.Log.info('You can install it using:');
        log_1.Log.info(`${installCommand} i @remotion/lambda@${(0, update_available_1.getRemotionVersion)()}`);
        process.exit(1);
    }
};
exports.lambdaCommand = lambdaCommand;
