import type { AwsRegion } from '../pricing/aws-regions';
import type { LambdaArchitecture } from './validate-architecture';
export declare const REMOTION_HOSTED_LAYER_ARN = "arn:aws:lambda:*:678892195805:layer:remotion-binaries-*";
export declare type HostedLayers = {
    [architecture in LambdaArchitecture]: {
        [region in AwsRegion]: {
            layerArn: string;
            version: number;
        }[];
    };
};
export declare const hostedLayers: HostedLayers;
