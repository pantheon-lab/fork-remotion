"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_lambda_1 = require("@aws-sdk/client-lambda");
const aws_policies_1 = require("aws-policies");
const __1 = require("..");
const quit_1 = require("../cli/helpers/quit");
const aws_clients_1 = require("../shared/aws-clients");
const constants_1 = require("../shared/constants");
const runtimes = ['nodejs14.x'];
const archictures = ['arm64', 'x86_64'];
const layerInfo = {
    arm64: {
        'ap-northeast-1': [],
        'ap-south-1': [],
        'ap-southeast-1': [],
        'ap-southeast-2': [],
        'eu-central-1': [],
        'eu-west-1': [],
        'eu-west-2': [],
        'us-east-1': [],
        'us-east-2': [],
        'us-west-2': [],
    },
    x86_64: {
        'ap-northeast-1': [],
        'ap-south-1': [],
        'ap-southeast-1': [],
        'ap-southeast-2': [],
        'eu-central-1': [],
        'eu-west-1': [],
        'eu-west-2': [],
        'us-east-1': [],
        'us-east-2': [],
        'us-west-2': [],
    },
};
const makeLayerPublic = async () => {
    const layers = ['fonts', 'ffmpeg', 'chromium'];
    for (const architecture of archictures) {
        for (const region of (0, __1.getRegions)()) {
            for (const layer of layers) {
                const layerName = `remotion-binaries-${layer}-${architecture}`;
                const { Version, LayerArn } = await (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.PublishLayerVersionCommand({
                    Content: {
                        S3Bucket: 'remotionlambda-binaries-' + region,
                        S3Key: `remotion-layer-${layer}-v6-${architecture}.zip`,
                    },
                    LayerName: layerName,
                    LicenseInfo: layer === 'chromium'
                        ? 'Chromium 101, compiled from source. Read Chromium License: https://chromium.googlesource.com/chromium/src/+/refs/heads/main/LICENSE'
                        : layer === 'ffmpeg'
                            ? 'Compiled from FFMPEG source. Read FFMPEG license: https://ffmpeg.org/legal.html'
                            : 'Contains Noto Sans font. Read Noto Sans License: https://fonts.google.com/noto/specimen/Noto+Sans/about',
                    CompatibleRuntimes: runtimes,
                    Description: constants_1.CURRENT_VERSION,
                }));
                await (0, aws_clients_1.getLambdaClient)(region).send(new client_lambda_1.AddLayerVersionPermissionCommand({
                    Action: aws_policies_1.lambda.GetLayerVersion,
                    LayerName: layerName,
                    Principal: '*',
                    VersionNumber: Version,
                    StatementId: 'public-layer',
                }));
                if (!layerInfo[architecture][region]) {
                    layerInfo[architecture][region] = [];
                }
                if (!LayerArn) {
                    throw new Error('layerArn is null');
                }
                if (!Version) {
                    throw new Error('Version is null');
                }
                layerInfo[architecture][region].push({
                    layerArn: LayerArn,
                    version: Version,
                });
                console.log({ LayerArn, Version });
            }
        }
    }
};
makeLayerPublic()
    .then(() => {
    console.log('\n\n\n\n\n');
    console.log(JSON.stringify(layerInfo, null, 2));
})
    .catch((err) => {
    console.log(err);
    (0, quit_1.quit)(1);
});
