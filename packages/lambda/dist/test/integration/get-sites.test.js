"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_site_1 = require("../../api/deploy-site");
const get_or_create_bucket_1 = require("../../api/get-or-create-bucket");
const get_sites_1 = require("../../api/get-sites");
test('Should have no buckets at first', async () => {
    expect(await (0, get_sites_1.getSites)({
        region: 'us-east-1',
    })).toEqual({ buckets: [], sites: [] });
});
test('Should have a site after deploying', async () => {
    await (0, get_or_create_bucket_1.getOrCreateBucket)({
        region: 'eu-central-1',
    });
    expect(await (0, deploy_site_1.deploySite)({
        bucketName: 'remotionlambda-abcdef',
        entryPoint: 'first',
        region: 'eu-central-1',
        siteName: 'testing',
    })).toEqual({
        serveUrl: 'https://remotionlambda-abcdef.s3.eu-central-1.amazonaws.com/sites/testing/index.html',
        siteName: 'testing',
    });
    expect(await (0, get_sites_1.getSites)({ region: 'eu-central-1' })).toEqual({
        buckets: [
            {
                creationDate: 0,
                name: 'remotionlambda-abcdef',
                region: 'eu-central-1',
            },
        ],
        sites: [
            {
                bucketName: 'remotionlambda-abcdef',
                id: 'testing',
                lastModified: 0,
                sizeInBytes: 48,
                serveUrl: 'https://remotionlambda-abcdef.s3.eu-central-1.amazonaws.com/sites/testing/index.html',
            },
        ],
    });
});
