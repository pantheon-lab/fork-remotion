"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanItems = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_clients_1 = require("../shared/aws-clients");
const p_limit_1 = require("../shared/p-limit");
const limit = (0, p_limit_1.pLimit)(10);
const cleanItems = async ({ bucket, onAfterItemDeleted, onBeforeItemDeleted, region, list, }) => {
    return Promise.all(list.map((object) => limit(async () => {
        onBeforeItemDeleted({
            bucketName: bucket,
            itemName: object,
        });
        await (0, aws_clients_1.getS3Client)(region).send(new client_s3_1.DeleteObjectCommand({
            Bucket: bucket,
            Key: object,
        }));
        onAfterItemDeleted({
            bucketName: bucket,
            itemName: object,
        });
    })));
};
exports.cleanItems = cleanItems;
