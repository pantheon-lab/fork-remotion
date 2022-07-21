import type { HotMiddlewareMessage } from './types';
declare function eventSourceWrapper(): {
    addMessageListener(fn: (msg: MessageEvent) => void): void;
};
declare global {
    interface Window {
        __whmEventSourceWrapper: {
            [key: string]: ReturnType<typeof eventSourceWrapper>;
        };
        __webpack_hot_middleware_reporter__: Reporter;
    }
}
declare type Reporter = ReturnType<typeof createReporter>;
declare function createReporter(): {
    cleanProblemsCache(): void;
    problems(type: 'errors' | 'warnings', obj: HotMiddlewareMessage): boolean;
    success: () => undefined;
};
export {};
