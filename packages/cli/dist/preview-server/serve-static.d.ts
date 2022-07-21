/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
import type { IncomingMessage, ServerResponse } from 'http';
export declare const serveStatic: (root: string, hash: string, req: IncomingMessage, res: ServerResponse) => Promise<void>;
