"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expected_out_name_1 = require("../../functions/helpers/expected-out-name");
const expect_to_throw_1 = require("../helpers/expect-to-throw");
const bucketName = 'remotionlambda-98fsduf';
const testRenderMetadata = {
    codec: 'h264',
    compositionId: 'react-svg',
    estimatedRenderLambdaInvokations: 100,
    estimatedTotalLambdaInvokations: 100,
    framesPerLambda: 20,
    imageFormat: 'png',
    type: 'video',
    inputProps: {},
    lambdaVersion: '2022-02-14',
    memorySizeInMb: 2048,
    outName: undefined,
    region: 'eu-central-1',
    renderId: '9n8dsfafs',
    siteId: 'my-site',
    startedDate: Date.now(),
    totalChunks: 20,
    usesOptimizationProfile: false,
    videoConfig: {
        defaultProps: {},
        durationInFrames: 200,
        fps: 30,
        height: 1080,
        id: 'react-svg',
        width: 1080,
    },
};
test('Should get a custom outname', () => {
    expect((0, expected_out_name_1.getExpectedOutName)(testRenderMetadata, bucketName)).toEqual({
        renderBucketName: 'remotionlambda-98fsduf',
        key: 'renders/9n8dsfafs/out.mp4',
    });
});
test('Should save to a different outname', () => {
    const newRenderMetadata = {
        ...testRenderMetadata,
        outName: {
            bucketName: 'my-bucket',
            key: 'my-key',
        },
    };
    expect((0, expected_out_name_1.getExpectedOutName)(newRenderMetadata, bucketName)).toEqual({
        renderBucketName: 'my-bucket',
        key: 'my-key',
    });
});
test('For stills', () => {
    const newRenderMetadata = {
        ...testRenderMetadata,
        type: 'still',
    };
    expect((0, expected_out_name_1.getExpectedOutName)(newRenderMetadata, bucketName)).toEqual({
        renderBucketName: 'remotionlambda-98fsduf',
        key: 'renders/9n8dsfafs/out.png',
    });
});
test('Just a custom name', () => {
    const newRenderMetadata = {
        ...testRenderMetadata,
        outName: 'justaname.jpeg',
    };
    expect((0, expected_out_name_1.getExpectedOutName)(newRenderMetadata, bucketName)).toEqual({
        renderBucketName: 'remotionlambda-98fsduf',
        key: 'renders/9n8dsfafs/justaname.jpeg',
    });
});
test('Should throw on invalid names', () => {
    const newRenderMetadata = {
        ...testRenderMetadata,
        outName: '👺.jpeg',
    };
    (0, expect_to_throw_1.expectToThrow)(() => {
        expect((0, expected_out_name_1.getExpectedOutName)(newRenderMetadata, bucketName)).toEqual({
            renderBucketName: 'remotionlambda-98fsduf',
            key: 'renders/9n8dsfafs/justaname.jpeg',
        });
    }, /The S3 Key must match the RegExp/);
});
test('Should allow outName an outname with a slash', () => {
    const newRenderMetadata = {
        ...testRenderMetadata,
        outName: 'justa/name.jpeg',
    };
    expect((0, expected_out_name_1.getExpectedOutName)(newRenderMetadata, bucketName)).toEqual({
        key: 'renders/9n8dsfafs/justa/name.jpeg',
        renderBucketName: 'remotionlambda-98fsduf',
    });
});
