/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { Commands } from './devtools-commands';
import { EventEmitter } from './EventEmitter';
import type { Frame } from './FrameManager';
export declare const NetworkManagerEmittedEvents: {
    readonly Request: symbol;
};
interface CDPSession extends EventEmitter {
    send<T extends keyof Commands>(method: T, ...paramArgs: Commands[T]['paramsType']): Promise<Commands[T]['returnType']>;
}
interface FrameManager {
    frame(frameId: string): Frame | null;
}
export declare class NetworkManager extends EventEmitter {
    #private;
    constructor(client: CDPSession, frameManager: FrameManager);
    initialize(): Promise<void>;
    numRequestsInProgress(): number;
}
export {};