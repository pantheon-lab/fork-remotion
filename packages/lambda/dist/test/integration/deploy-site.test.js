"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_site_1 = require("../../api/deploy-site");
const get_or_create_bucket_1 = require("../../api/get-or-create-bucket");
const upload_dir_1 = require("../../api/upload-dir");
const io_1 = require("../../functions/helpers/io");
test('Should throw on wrong prefix', async () => {
    await expect(() => (0, deploy_site_1.deploySite)({
        bucketName: 'wrongprefix',
        entryPoint: 'first',
        region: 'us-east-1',
    })).rejects.toThrow(/The bucketName parameter must start /);
});
test('Should throw if invalid region was passed', () => {
    expect(() => (0, deploy_site_1.deploySite)({
        bucketName: 'remotionlambda-testing',
        entryPoint: 'first',
        // @ts-expect-error
        region: 'ap-northeast-9',
        siteName: 'testing',
    })).rejects.toThrow(/ap-northeast-9 is not a valid AWS region/);
});
test("Should throw if bucket doesn't exist", () => {
    expect(() => (0, deploy_site_1.deploySite)({
        bucketName: 'remotionlambda-non-existed',
        entryPoint: 'first',
        region: 'ap-northeast-1',
        siteName: 'testing',
    })).rejects.toThrow(/No bucket with the name remotionlambda-non-existed exists/);
});
test('Should apply name if given', async () => {
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: 'ap-northeast-1',
    });
    expect(await (0, deploy_site_1.deploySite)({
        bucketName,
        entryPoint: 'first',
        region: 'ap-northeast-1',
        siteName: 'testing',
    })).toEqual({
        siteName: 'testing',
        serveUrl: 'https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/index.html',
    });
});
test('Should use a random hash if no siteName is given', async () => {
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: 'ap-northeast-1',
    });
    expect(await (0, deploy_site_1.deploySite)({
        bucketName,
        entryPoint: 'first',
        region: 'ap-northeast-1',
        siteName: 'testing',
    })).toEqual({
        siteName: 'testing',
        serveUrl: 'https://remotionlambda-abcdef.s3.ap-northeast-1.amazonaws.com/sites/testing/index.html',
    });
});
test('Should delete the previous site if deploying the new one', async () => {
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: 'ap-northeast-1',
    });
    await (0, deploy_site_1.deploySite)({
        bucketName,
        entryPoint: 'first',
        region: 'ap-northeast-1',
        siteName: 'testing',
    });
    await (0, deploy_site_1.deploySite)({
        bucketName,
        entryPoint: 'second',
        region: 'ap-northeast-1',
        siteName: 'testing',
    });
    const files = await (0, io_1.lambdaLs)({
        bucketName,
        expectedBucketOwner: null,
        prefix: 'sites/testing',
        region: 'ap-northeast-1',
        continuationToken: undefined,
    });
    expect(files.map((f) => {
        return f.Key;
    })).toEqual((0, upload_dir_1.getDirFiles)('/path/to/bundle-2').map((f) => {
        return 'sites/testing/' + f.name;
    }));
});
test('Should keep the previous site if deploying the new one with different ID', async () => {
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: 'ap-northeast-1',
    });
    await (0, deploy_site_1.deploySite)({
        bucketName,
        entryPoint: 'first',
        region: 'ap-northeast-1',
        siteName: 'testing',
    });
    await (0, deploy_site_1.deploySite)({
        bucketName,
        entryPoint: 'second',
        region: 'ap-northeast-1',
        siteName: 'testing-2',
    });
    const files = await (0, io_1.lambdaLs)({
        bucketName,
        expectedBucketOwner: null,
        prefix: 'sites/',
        region: 'ap-northeast-1',
        continuationToken: undefined,
    });
    expect(files.map((f) => {
        return f.Key;
    })).toEqual([
        ...(0, upload_dir_1.getDirFiles)('/path/to/bundle-1').map((f) => {
            return 'sites/testing/' + f.name;
        }),
        ...(0, upload_dir_1.getDirFiles)('/path/to/bundle-2').map((f) => {
            return 'sites/testing-2/' + f.name;
        }),
    ]);
});
