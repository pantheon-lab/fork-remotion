import type { AwsRegion } from '../pricing/aws-regions';
export declare const getAccountId: (options: {
    region: AwsRegion;
}) => Promise<string>;
