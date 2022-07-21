declare type Environment = 'development' | 'production';
declare type CacheState = 'exists' | 'other-exists' | 'does-not-exist';
declare global {
    namespace NodeJS {
        interface ProcessVersions {
            pnp?: string;
        }
    }
}
export declare const clearCache: () => Promise<void>;
export declare const getWebpackCacheName: (environment: Environment, hash: string) => string;
export declare const cacheExists: (environment: Environment, hash: string) => CacheState;
export {};
