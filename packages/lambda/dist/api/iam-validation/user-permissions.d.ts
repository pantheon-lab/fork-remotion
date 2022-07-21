import { iam, lambda, logs, s3, servicequotas } from 'aws-policies';
export declare const requiredPermissions: {
    actions: (s3 | iam | lambda | logs | servicequotas)[];
    resource: string[];
    id: string;
}[];
