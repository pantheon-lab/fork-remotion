export declare type PackageManager = 'npm' | 'yarn' | 'pnpm';
declare type LockfilePath = {
    manager: PackageManager;
    path: string;
    installCommand: string;
};
export declare const lockFilePaths: LockfilePath[];
export declare const getPackageManager: () => LockfilePath | 'unknown';
export {};
