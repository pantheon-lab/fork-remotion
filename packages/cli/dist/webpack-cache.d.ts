declare type Environment = 'development' | 'production';
declare global {
    namespace NodeJS {
        interface ProcessVersions {
            pnp?: string;
        }
    }
}
export declare const clearCache: (environment: Environment, inputProps: object | null) => Promise<void>;
export declare const getWebpackCacheName: (environment: Environment, inputProps: object | null) => string;
export declare const cacheExists: (environment: Environment, inputProps: object | null) => boolean;
export {};
