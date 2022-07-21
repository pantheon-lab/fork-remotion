import type { IncomingMessage, ServerResponse } from 'http';
import type { LiveEventsServer } from './live-events';
export declare const handleRoutes: ({ hash, hashPrefix, request, response, liveEventsServer, getCurrentInputProps, }: {
    hash: string;
    hashPrefix: string;
    request: IncomingMessage;
    response: ServerResponse;
    liveEventsServer: LiveEventsServer;
    getCurrentInputProps: () => object;
}) => void | Promise<void>;
