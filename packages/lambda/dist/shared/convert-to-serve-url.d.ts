import type { AwsRegion } from '../pricing/aws-regions';
export declare const convertToServeUrl: (urlOrId: string, region: AwsRegion) => Promise<string>;
