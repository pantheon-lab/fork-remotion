import type { AwsRegion } from './aws-regions';
export declare const pricing: {
    [key in AwsRegion]: {
        'Lambda Duration': {
            rateCode: string;
            price: string;
        };
        'Lambda Duration-Provisioned': {
            rateCode: string;
            price: string;
        };
        'Lambda Provisioned-Concurrency': {
            rateCode: string;
            price: string;
        };
        'Lambda Requests': {
            rateCode: string;
            price: string;
        };
        'Lambda Duration-ARM': {
            rateCode: string;
            price: string;
        };
        'Lambda Requests-ARM': {
            rateCode: string;
            price: string;
        };
        'Lambda Storage-Duration': {
            rateCode: string;
            price: string;
        };
        'Lambda Storage-Duration-ARM': {
            rateCode: string;
            price: string;
        };
    };
};