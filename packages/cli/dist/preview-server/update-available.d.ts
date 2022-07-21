import type { PackageManager } from './get-package-manager';
declare type Info = {
    currentVersion: string;
    latestVersion: string;
    updateAvailable: boolean;
    timedOut: boolean;
    packageManager: PackageManager | 'unknown';
};
export declare const getRemotionVersion: () => any;
export declare const isUpdateAvailableWithTimeout: () => Promise<Info>;
export {};
