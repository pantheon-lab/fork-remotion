"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_site_1 = require("../../api/delete-site");
const deploy_site_1 = require("../../api/deploy-site");
const get_or_create_bucket_1 = require("../../api/get-or-create-bucket");
test('Return 0 total size if site did not exist', async () => {
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: 'eu-west-1',
    });
    expect(await (0, delete_site_1.deleteSite)({
        bucketName,
        region: 'eu-west-1',
        siteName: 'non existent',
    })).toEqual({ totalSizeInBytes: 0 });
});
test('Return more than 0 total size if site did not exist', async () => {
    const { bucketName } = await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: 'eu-west-1',
    });
    const { siteName } = await (0, deploy_site_1.deploySite)({
        bucketName,
        entryPoint: 'first',
        region: 'eu-west-1',
    });
    expect((await (0, delete_site_1.deleteSite)({
        bucketName,
        region: 'eu-west-1',
        siteName,
    })).totalSizeInBytes).toBeGreaterThan(0);
});
