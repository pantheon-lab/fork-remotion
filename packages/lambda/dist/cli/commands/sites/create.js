"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitesCreateSubcommand = exports.SITES_CREATE_SUBCOMMAND = void 0;
const cli_1 = require("@remotion/cli");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const deploy_site_1 = require("../../../api/deploy-site");
const get_or_create_bucket_1 = require("../../../api/get-or-create-bucket");
const constants_1 = require("../../../shared/constants");
const validate_site_name_1 = require("../../../shared/validate-site-name");
const args_1 = require("../../args");
const get_aws_region_1 = require("../../get-aws-region");
const progress_bar_1 = require("../../helpers/progress-bar");
const quit_1 = require("../../helpers/quit");
const log_1 = require("../../log");
exports.SITES_CREATE_SUBCOMMAND = 'create';
const sitesCreateSubcommand = async (args) => {
    var _a, _b;
    const fileName = args[0];
    if (!fileName) {
        log_1.Log.error('No entry file passed.');
        log_1.Log.info('Pass an additional argument specifying the entry file of your Remotion project:');
        log_1.Log.info();
        log_1.Log.info(`${constants_1.BINARY_NAME} deploy <entry-file.ts>`);
        (0, quit_1.quit)(1);
    }
    const absoluteFile = path_1.default.join(process.cwd(), fileName);
    if (!(0, fs_1.existsSync)(absoluteFile)) {
        log_1.Log.error(`No file exists at ${absoluteFile}. Make sure the path exists and try again.`);
        (0, quit_1.quit)(1);
    }
    if ((0, fs_1.lstatSync)(absoluteFile).isDirectory()) {
        log_1.Log.error(`You passed a path ${absoluteFile} but it is a directory. Pass a file instead.`);
        (0, quit_1.quit)(1);
    }
    const desiredSiteName = (_a = args_1.parsedLambdaCli['site-name']) !== null && _a !== void 0 ? _a : undefined;
    if (desiredSiteName !== undefined) {
        (0, validate_site_name_1.validateSiteName)(desiredSiteName);
    }
    const progressBar = cli_1.CliInternals.createOverwriteableCliOutput(cli_1.CliInternals.quietFlagProvided());
    const multiProgress = {
        bundleProgress: {
            doneIn: null,
            progress: 0,
        },
        bucketProgress: {
            bucketCreated: false,
            doneIn: null,
            websiteEnabled: false,
        },
        deployProgress: {
            doneIn: null,
            totalSize: null,
            sizeUploaded: 0,
        },
    };
    const updateProgress = () => {
        progressBar.update([
            (0, progress_bar_1.makeBundleProgress)(multiProgress.bundleProgress),
            (0, progress_bar_1.makeBucketProgress)(multiProgress.bucketProgress),
            (0, progress_bar_1.makeDeployProgressBar)(multiProgress.deployProgress),
        ].join('\n'));
    };
    const bucketStart = Date.now();
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: (0, get_aws_region_1.getAwsRegion)(),
        onBucketEnsured: () => {
            multiProgress.bucketProgress.bucketCreated = true;
            updateProgress();
        },
    });
    multiProgress.bucketProgress.websiteEnabled = true;
    multiProgress.bucketProgress.doneIn = Date.now() - bucketStart;
    updateProgress();
    const bundleStart = Date.now();
    const uploadStart = Date.now();
    const { serveUrl, siteName } = await (0, deploy_site_1.deploySite)({
        entryPoint: absoluteFile,
        siteName: desiredSiteName,
        bucketName,
        options: {
            onBundleProgress: (progress) => {
                multiProgress.bundleProgress = {
                    progress,
                    doneIn: progress === 100 ? Date.now() - bundleStart : null,
                };
            },
            onUploadProgress: (p) => {
                multiProgress.deployProgress = {
                    sizeUploaded: p.sizeUploaded,
                    totalSize: p.totalSize,
                    doneIn: null,
                };
                updateProgress();
            },
            enableCaching: remotion_1.Internals.getWebpackCaching(),
            webpackOverride: (_b = remotion_1.Internals.getWebpackOverrideFn()) !== null && _b !== void 0 ? _b : remotion_1.Internals.defaultOverrideFunction,
        },
        region: (0, get_aws_region_1.getAwsRegion)(),
    });
    const uploadDuration = Date.now() - uploadStart;
    multiProgress.deployProgress = {
        sizeUploaded: 1,
        totalSize: 1,
        doneIn: uploadDuration,
    };
    updateProgress();
    log_1.Log.info();
    log_1.Log.info();
    log_1.Log.info('Deployed to S3!');
    log_1.Log.info(`Serve URL: ${serveUrl}`);
    log_1.Log.info(`Site Name: ${siteName}`);
};
exports.sitesCreateSubcommand = sitesCreateSubcommand;
