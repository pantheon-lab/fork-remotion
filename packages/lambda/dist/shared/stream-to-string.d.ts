/// <reference types="node" />
/// <reference types="node" />
import type { Readable } from 'stream';
export declare function streamToString(stream: Readable | Buffer): string | Promise<string>;
