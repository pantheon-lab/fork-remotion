import type { AwsRegion } from '../../pricing/aws-regions';
import type { SimulationResult } from './simulate-rule';
export declare const logPermissionOutput: (output: SimulationResult) => string;
export declare type SimulatePermissionsInput = {
    region: AwsRegion;
    onSimulation?: (result: SimulationResult) => void;
};
export declare type SimulatePermissionsOutput = {
    results: SimulationResult[];
};
/**
 * @description Simulates calls using the AWS Simulator to validate the correct permissions.
 * @link http://remotion.dev/docs/lambda/simulatepermissions
 * @param {AwsRegion} options.region The region which you would like to validate
 * @param {(result: SimulationResult) => void} options.onSimulation The region which you would like to validate
 * @returns {Promise<SimulatePermissionsOutput>} See documentation for detailed response structure.
 */
export declare const simulatePermissions: (options: SimulatePermissionsInput) => Promise<SimulatePermissionsOutput>;
