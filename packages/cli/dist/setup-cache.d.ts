import type { RenderStep } from './step';
export declare const bundleOnCli: ({ fullPath, steps, }: {
    fullPath: string;
    steps: RenderStep[];
}) => Promise<string>;
