"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploySite = void 0;
const remotion_1 = require("remotion");
const delete_site_1 = require("../api/delete-site");
const bundle_site_1 = require("../shared/bundle-site");
const constants_1 = require("../shared/constants");
const get_account_id_1 = require("../shared/get-account-id");
const make_s3_url_1 = require("../shared/make-s3-url");
const random_hash_1 = require("../shared/random-hash");
const validate_aws_region_1 = require("../shared/validate-aws-region");
const validate_bucketname_1 = require("../shared/validate-bucketname");
const validate_site_name_1 = require("../shared/validate-site-name");
const bucket_exists_1 = require("./bucket-exists");
const enable_s3_website_1 = require("./enable-s3-website");
const upload_dir_1 = require("./upload-dir");
/**
 * @description Deploys a Remotion project to an S3 bucket to prepare it for rendering on AWS Lambda.
 * @link https://remotion.dev/docs/lambda/deploysite
 * @param {AwsRegion} params.region The region in which the S3 bucket resides in.
 * @param {string} params.entryPoint An absolute path to the entry file of your Remotion project.
 * @param {string} params.bucketName The name of the bucket to deploy your project into.
 * @param {string} params.siteName The name of the folder in which the project gets deployed to.
 * @param {object} params.options Further options, see documentation page for this function.
 */
const deploySite = async ({ bucketName, entryPoint, siteName, options, region, }) => {
    var _a, _b, _c, _d;
    (0, validate_aws_region_1.validateAwsRegion)(region);
    (0, validate_bucketname_1.validateBucketName)(bucketName, { mustStartWithRemotion: true });
    const siteId = siteName !== null && siteName !== void 0 ? siteName : (0, random_hash_1.randomHash)();
    (0, validate_site_name_1.validateSiteName)(siteId);
    const bucketExists = await (0, bucket_exists_1.bucketExistsInRegion)({
        bucketName,
        region,
        expectedBucketOwner: await (0, get_account_id_1.getAccountId)({ region }),
    });
    if (!bucketExists) {
        throw new Error(`No bucket with the name ${bucketName} exists`);
    }
    const subFolder = (0, constants_1.getSitesKey)(siteId);
    await (0, delete_site_1.deleteSite)({
        bucketName,
        onAfterItemDeleted: () => undefined,
        region,
        siteName: siteId,
    });
    const bundled = await (0, bundle_site_1.bundleSite)(entryPoint, (_a = options === null || options === void 0 ? void 0 : options.onBundleProgress) !== null && _a !== void 0 ? _a : (() => undefined), {
        publicPath: `/${subFolder}/`,
        webpackOverride: (_b = options === null || options === void 0 ? void 0 : options.webpackOverride) !== null && _b !== void 0 ? _b : remotion_1.Internals.getWebpackOverrideFn(),
        enableCaching: (_c = options === null || options === void 0 ? void 0 : options.enableCaching) !== null && _c !== void 0 ? _c : remotion_1.Internals.getWebpackCaching(),
    });
    await Promise.all([
        (0, upload_dir_1.uploadDir)({
            bucket: bucketName,
            region,
            dir: bundled,
            onProgress: (_d = options === null || options === void 0 ? void 0 : options.onUploadProgress) !== null && _d !== void 0 ? _d : (() => undefined),
            folder: subFolder,
            privacy: 'public',
        }),
        (0, enable_s3_website_1.enableS3Website)({
            region,
            bucketName,
        }),
    ]);
    return {
        serveUrl: (0, make_s3_url_1.makeS3ServeUrl)({ bucketName, subFolder, region }),
        siteName: siteId,
    };
};
exports.deploySite = deploySite;
