declare type Environment = 'development' | 'production';
declare global {
    namespace NodeJS {
        interface ProcessVersions {
            pnp?: string;
        }
    }
}
export declare const clearCache: (environment: Environment) => Promise<void>;
export declare const getWebpackCacheName: (environment: Environment) => string;
export declare const cacheExists: (environment: Environment) => boolean;
export {};
