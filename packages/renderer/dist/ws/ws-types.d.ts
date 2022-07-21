export declare class WS {
    constructor(_url: URL, _anything: unknown[], _options: {
        followRedirects: true;
        perMessageDeflate: false;
        maxPayload: number;
        headers: Record<string, string>;
    });
    addEventListener(_type: 'open' | 'error' | 'message' | 'close', _cb: (evt: {
        data: string;
    }) => void): void;
    send(msg: string): void;
    close(): void;
}
export declare const ws: typeof WS;