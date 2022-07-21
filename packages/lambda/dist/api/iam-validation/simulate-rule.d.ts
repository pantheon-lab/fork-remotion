import type { AwsRegion } from '../../pricing/aws-regions';
export declare type EvalDecision = 'allowed' | 'explicitDeny' | 'implicitDeny';
export declare type SimulationResult = {
    decision: EvalDecision;
    name: string;
};
export declare const simulateRule: (options: {
    region: AwsRegion;
    actionNames: string[];
    arn: string;
    resource: string[];
    retries: number;
}) => Promise<SimulationResult[]>;
