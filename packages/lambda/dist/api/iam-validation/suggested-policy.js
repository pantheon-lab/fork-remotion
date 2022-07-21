"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolePolicy = exports.ROLE_NAME = exports.getUserPolicy = void 0;
const role_permissions_1 = require("./role-permissions");
const user_permissions_1 = require("./user-permissions");
const suggestedPolicy = {
    Version: '2012-10-17',
    Statement: [
        ...user_permissions_1.requiredPermissions.map((per) => {
            return {
                Sid: per.id,
                Effect: 'Allow',
                Action: per.actions,
                Resource: per.resource,
            };
        }),
    ],
};
const suggestedRolePolicy = {
    Version: '2012-10-17',
    Statement: [
        ...role_permissions_1.rolePermissions.map((per, i) => {
            return {
                Sid: String(i),
                Effect: 'Allow',
                Action: per.actions,
                Resource: per.resource,
            };
        }),
    ],
};
/**
 * @description Returns an inline JSON policy to be assigned to the AWS user whose credentials are being used for excuting CLI commands or calling Node.JS functions.
 * @link https://remotion.dev/docs/lambda/getuserpolicy
 */
const getUserPolicy = () => JSON.stringify(suggestedPolicy, null, 2);
exports.getUserPolicy = getUserPolicy;
exports.ROLE_NAME = 'remotion-lambda-role';
/**
 * @description Returns an inline JSON policy to be assigned to the 'remotion-lambda-role' role that needs to be created in your AWS account.
 * @link https://remotion.dev/docs/lambda/getrolepolicy
 */
const getRolePolicy = () => JSON.stringify(suggestedRolePolicy, null, 2);
exports.getRolePolicy = getRolePolicy;