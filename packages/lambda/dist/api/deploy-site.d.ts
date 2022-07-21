import type { WebpackOverrideFn } from 'remotion';
import type { AwsRegion } from '../pricing/aws-regions';
import type { UploadDirProgress } from './upload-dir';
export declare type DeploySiteInput = {
    entryPoint: string;
    bucketName: string;
    region: AwsRegion;
    siteName?: string;
    options?: {
        onBundleProgress?: (progress: number) => void;
        onUploadProgress?: (upload: UploadDirProgress) => void;
        webpackOverride?: WebpackOverrideFn;
        enableCaching?: boolean;
    };
};
export declare type DeploySiteOutput = Promise<{
    serveUrl: string;
    siteName: string;
}>;
/**
 * @description Deploys a Remotion project to an S3 bucket to prepare it for rendering on AWS Lambda.
 * @link https://remotion.dev/docs/lambda/deploysite
 * @param {AwsRegion} params.region The region in which the S3 bucket resides in.
 * @param {string} params.entryPoint An absolute path to the entry file of your Remotion project.
 * @param {string} params.bucketName The name of the bucket to deploy your project into.
 * @param {string} params.siteName The name of the folder in which the project gets deployed to.
 * @param {object} params.options Further options, see documentation page for this function.
 */
export declare const deploySite: ({ bucketName, entryPoint, siteName, options, region, }: DeploySiteInput) => DeploySiteOutput;
