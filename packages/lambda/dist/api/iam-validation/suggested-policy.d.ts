/**
 * @description Returns an inline JSON policy to be assigned to the AWS user whose credentials are being used for excuting CLI commands or calling Node.JS functions.
 * @link https://remotion.dev/docs/lambda/getuserpolicy
 */
export declare const getUserPolicy: () => string;
export declare const ROLE_NAME = "remotion-lambda-role";
/**
 * @description Returns an inline JSON policy to be assigned to the 'remotion-lambda-role' role that needs to be created in your AWS account.
 * @link https://remotion.dev/docs/lambda/getrolepolicy
 */
export declare const getRolePolicy: () => string;
