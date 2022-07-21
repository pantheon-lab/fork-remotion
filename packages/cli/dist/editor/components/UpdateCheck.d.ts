/// <reference types="react" />
import type { PackageManager } from '../../preview-server/get-package-manager';
export declare type UpdateInfo = {
    currentVersion: string;
    latestVersion: string;
    updateAvailable: boolean;
    timedOut: boolean;
    packageManager: PackageManager | 'unknown';
};
export declare const UpdateCheck: () => JSX.Element | null;
