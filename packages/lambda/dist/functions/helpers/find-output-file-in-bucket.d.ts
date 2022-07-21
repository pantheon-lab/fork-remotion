import type { AwsRegion } from '../..';
import type { RenderMetadata } from '../../shared/constants';
export declare type OutputFileMetadata = {
    url: string;
    size: number;
    lastModified: number;
};
export declare const findOutputFileInBucket: ({ region, renderMetadata, bucketName, }: {
    region: AwsRegion;
    renderMetadata: RenderMetadata;
    bucketName: string;
}) => Promise<OutputFileMetadata | null>;
