import type { AwsRegion } from '../pricing/aws-regions';
export declare const cleanItems: ({ bucket, onAfterItemDeleted, onBeforeItemDeleted, region, list, }: {
    bucket: string;
    region: AwsRegion;
    list: string[];
    onBeforeItemDeleted: (data: {
        bucketName: string;
        itemName: string;
    }) => void;
    onAfterItemDeleted: (data: {
        bucketName: string;
        itemName: string;
    }) => void;
}) => Promise<void[]>;
