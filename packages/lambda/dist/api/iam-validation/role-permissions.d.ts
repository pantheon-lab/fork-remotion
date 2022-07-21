import type { iam } from 'aws-policies';
import { lambda, logs, s3 } from 'aws-policies';
export declare const rolePermissions: {
    actions: (s3 | iam | lambda | logs)[];
    resource: string[];
}[];
