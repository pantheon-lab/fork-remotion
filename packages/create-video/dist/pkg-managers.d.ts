export declare type PackageManager = 'npm' | 'yarn' | 'pnpm';
export declare const selectPackageManager: () => PackageManager;
export declare const getInstallCommand: (manager: PackageManager) => "yarn" | "npm i" | "pnpm i" | undefined;
export declare const getStartCommand: (manager: PackageManager) => "npm start" | "yarn start" | "pnpm start" | undefined;
export declare const getRenderCommand: (manager: PackageManager) => "npm run build" | "yarn build" | "pnpm build" | undefined;
export declare const getUpgradeCommand: (manager: PackageManager) => "npm run upgrade" | "yarn run upgrade" | "pnpm run upgrade" | undefined;
