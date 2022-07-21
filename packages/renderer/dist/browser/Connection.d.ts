import type { Commands } from './devtools-commands';
import type { TargetInfo } from './devtools-types';
import { EventEmitter } from './EventEmitter';
import type { NodeWebSocketTransport } from './NodeWebSocketTransport';
export declare class Connection extends EventEmitter {
    #private;
    constructor(transport: NodeWebSocketTransport);
    static fromSession(session: CDPSession): Connection | undefined;
    session(sessionId: string): CDPSession | null;
    send<T extends keyof Commands>(method: T, ...paramArgs: Commands[T]['paramsType']): Promise<Commands[T]['returnType']>;
    _rawSend(message: Record<string, unknown>): number;
    dispose(): void;
    /**
     * @param targetInfo - The target info
     * @returns The CDP session that is created
     */
    createSession(targetInfo: TargetInfo): Promise<CDPSession>;
}
interface CDPSessionOnMessageObject {
    id?: number;
    method: string;
    params: Record<string, unknown>;
    error: {
        message: string;
        data: any;
        code: number;
    };
    result?: any;
}
export declare const CDPSessionEmittedEvents: {
    readonly Disconnected: symbol;
};
export declare class CDPSession extends EventEmitter {
    #private;
    constructor(connection: Connection, targetType: string, sessionId: string);
    connection(): Connection | undefined;
    send<T extends keyof Commands>(method: T, ...paramArgs: Commands[T]['paramsType']): Promise<Commands[T]['returnType']>;
    _onMessage(object: CDPSessionOnMessageObject): void;
    _onClosed(): void;
    id(): string;
}
export {};
