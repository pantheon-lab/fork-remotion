"use strict";
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NetworkManager_instances, _NetworkManager_client, _NetworkManager_frameManager, _NetworkManager_networkEventManager, _NetworkManager_onRequestWillBeSent, _NetworkManager_onRequestPaused, _NetworkManager_patchRequestEventHeaders, _NetworkManager_onRequest, _NetworkManager_onRequestServedFromCache, _NetworkManager_handleRequestRedirect, _NetworkManager_emitResponseEvent, _NetworkManager_onResponseReceived, _NetworkManager_onResponseReceivedExtraInfo, _NetworkManager_forgetRequest, _NetworkManager_onLoadingFinished, _NetworkManager_emitLoadingFinished, _NetworkManager_onLoadingFailed, _NetworkManager_emitLoadingFailed;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkManager = exports.NetworkManagerEmittedEvents = void 0;
const EventEmitter_1 = require("./EventEmitter");
const HTTPRequest_1 = require("./HTTPRequest");
const HTTPResponse_1 = require("./HTTPResponse");
const NetworkEventManager_1 = require("./NetworkEventManager");
exports.NetworkManagerEmittedEvents = {
    Request: Symbol('NetworkManager.Request'),
};
class NetworkManager extends EventEmitter_1.EventEmitter {
    constructor(client, frameManager) {
        super();
        _NetworkManager_instances.add(this);
        _NetworkManager_client.set(this, void 0);
        _NetworkManager_frameManager.set(this, void 0);
        _NetworkManager_networkEventManager.set(this, new NetworkEventManager_1.NetworkEventManager());
        __classPrivateFieldSet(this, _NetworkManager_client, client, "f");
        __classPrivateFieldSet(this, _NetworkManager_frameManager, frameManager, "f");
        __classPrivateFieldGet(this, _NetworkManager_client, "f").on('Fetch.requestPaused', __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequestPaused).bind(this));
        __classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.requestWillBeSent', __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequestWillBeSent).bind(this));
        __classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.requestServedFromCache', __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequestServedFromCache).bind(this));
        __classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.responseReceived', __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceived).bind(this));
        __classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.loadingFinished', __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFinished).bind(this));
        __classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.loadingFailed', __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFailed).bind(this));
        __classPrivateFieldGet(this, _NetworkManager_client, "f").on('Network.responseReceivedExtraInfo', __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceivedExtraInfo).bind(this));
    }
    async initialize() {
        await __classPrivateFieldGet(this, _NetworkManager_client, "f").send('Network.enable');
    }
    numRequestsInProgress() {
        return __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").numRequestsInProgress();
    }
}
exports.NetworkManager = NetworkManager;
_NetworkManager_client = new WeakMap(), _NetworkManager_frameManager = new WeakMap(), _NetworkManager_networkEventManager = new WeakMap(), _NetworkManager_instances = new WeakSet(), _NetworkManager_onRequestWillBeSent = function _NetworkManager_onRequestWillBeSent(event) {
    __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, event, undefined);
}, _NetworkManager_onRequestPaused = function _NetworkManager_onRequestPaused(event) {
    const { networkId: networkRequestId, requestId: fetchRequestId } = event;
    if (!networkRequestId) {
        return;
    }
    const requestWillBeSentEvent = (() => {
        const _requestWillBeSentEvent = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequestWillBeSent(networkRequestId);
        // redirect requests have the same `requestId`,
        if (_requestWillBeSentEvent &&
            (_requestWillBeSentEvent.request.url !== event.request.url ||
                _requestWillBeSentEvent.request.method !== event.request.method)) {
            __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forgetRequestWillBeSent(networkRequestId);
            return;
        }
        return _requestWillBeSentEvent;
    })();
    if (requestWillBeSentEvent) {
        __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_patchRequestEventHeaders).call(this, requestWillBeSentEvent, event);
        __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, requestWillBeSentEvent, fetchRequestId);
    }
    else {
        __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").storeRequestPaused(networkRequestId, event);
    }
}, _NetworkManager_patchRequestEventHeaders = function _NetworkManager_patchRequestEventHeaders(requestWillBeSentEvent, requestPausedEvent) {
    requestWillBeSentEvent.request.headers = {
        ...requestWillBeSentEvent.request.headers,
        // includes extra headers, like: Accept, Origin
        ...requestPausedEvent.request.headers,
    };
}, _NetworkManager_onRequest = function _NetworkManager_onRequest(event, fetchRequestId) {
    if (event.redirectResponse) {
        // We want to emit a response and requestfinished for the
        // redirectResponse, but we can't do so unless we have a
        // responseExtraInfo ready to pair it up with. If we don't have any
        // responseExtraInfos saved in our queue, they we have to wait until
        // the next one to emit response and requestfinished, *and* we should
        // also wait to emit this Request too because it should come after the
        // response/requestfinished.
        let redirectResponseExtraInfo = null;
        if (event.redirectHasExtraInfo) {
            redirectResponseExtraInfo = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f")
                .responseExtraInfo(event.requestId)
                .shift();
            if (!redirectResponseExtraInfo) {
                __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").queueRedirectInfo(event.requestId, {
                    event,
                    fetchRequestId,
                });
                return;
            }
        }
        const _request = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
        // If we connect late to the target, we could have missed the
        // requestWillBeSent event.
        if (_request) {
            __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_handleRequestRedirect).call(this, _request, event.redirectResponse, redirectResponseExtraInfo);
        }
    }
    const frame = event.frameId
        ? __classPrivateFieldGet(this, _NetworkManager_frameManager, "f").frame(event.frameId)
        : null;
    const request = new HTTPRequest_1.HTTPRequest(frame, event);
    __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").storeRequest(event.requestId, request);
    this.emit(exports.NetworkManagerEmittedEvents.Request, request);
}, _NetworkManager_onRequestServedFromCache = function _NetworkManager_onRequestServedFromCache(event) {
    const request = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    if (request) {
        request._fromMemoryCache = true;
    }
}, _NetworkManager_handleRequestRedirect = function _NetworkManager_handleRequestRedirect(request, responsePayload, extraInfo) {
    const response = new HTTPResponse_1.HTTPResponse(responsePayload, extraInfo);
    request._response = response;
    __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, false);
}, _NetworkManager_emitResponseEvent = function _NetworkManager_emitResponseEvent(responseReceived, extraInfo) {
    const request = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(responseReceived.requestId);
    // FileUpload sends a response without a matching request.
    if (!request) {
        return;
    }
    __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(responseReceived.requestId);
    const response = new HTTPResponse_1.HTTPResponse(responseReceived.response, extraInfo);
    request._response = response;
}, _NetworkManager_onResponseReceived = function _NetworkManager_onResponseReceived(event) {
    const request = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    let extraInfo = null;
    if (request && !request._fromMemoryCache && event.hasExtraInfo) {
        extraInfo = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f")
            .responseExtraInfo(event.requestId)
            .shift();
        if (!extraInfo) {
            // Wait until we get the corresponding ExtraInfo event.
            __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").queueEventGroup(event.requestId, {
                responseReceivedEvent: event,
            });
            return;
        }
    }
    __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, event, extraInfo);
}, _NetworkManager_onResponseReceivedExtraInfo = function _NetworkManager_onResponseReceivedExtraInfo(event) {
    // We may have skipped a redirect response/request pair due to waiting for
    // this ExtraInfo event. If so, continue that work now that we have the
    // request.
    const redirectInfo = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").takeQueuedRedirectInfo(event.requestId);
    if (redirectInfo) {
        __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
        __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, redirectInfo.event, redirectInfo.fetchRequestId);
        return;
    }
    // We may have skipped response and loading events because we didn't have
    // this ExtraInfo event yet. If so, emit those events now.
    const queuedEvents = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
        __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forgetQueuedEventGroup(event.requestId);
        __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, queuedEvents.responseReceivedEvent, event);
        if (queuedEvents.loadingFinishedEvent) {
            __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, queuedEvents.loadingFinishedEvent);
        }
        if (queuedEvents.loadingFailedEvent) {
            __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, queuedEvents.loadingFailedEvent);
        }
        return;
    }
    // Wait until we get another event that can use this ExtraInfo event.
    __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
}, _NetworkManager_forgetRequest = function _NetworkManager_forgetRequest(request, events) {
    const requestId = request._requestId;
    __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forgetRequest(requestId);
    if (events) {
        __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").forget(requestId);
    }
}, _NetworkManager_onLoadingFinished = function _NetworkManager_onLoadingFinished(event) {
    // If the response event for this request is still waiting on a
    // corresponding ExtraInfo event, then wait to emit this event too.
    const queuedEvents = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
        queuedEvents.loadingFinishedEvent = event;
    }
    else {
        __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, event);
    }
}, _NetworkManager_emitLoadingFinished = function _NetworkManager_emitLoadingFinished(event) {
    const request = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    // For certain requestIds we never receive requestWillBeSent event.
    // @see https://crbug.com/750469
    if (!request) {
        return;
    }
    __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, true);
}, _NetworkManager_onLoadingFailed = function _NetworkManager_onLoadingFailed(event) {
    // If the response event for this request is still waiting on a
    // corresponding ExtraInfo event, then wait to emit this event too.
    const queuedEvents = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
        queuedEvents.loadingFailedEvent = event;
    }
    else {
        __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, event);
    }
}, _NetworkManager_emitLoadingFailed = function _NetworkManager_emitLoadingFailed(event) {
    const request = __classPrivateFieldGet(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    // For certain requestIds we never receive requestWillBeSent event.
    // @see https://crbug.com/750469
    if (!request) {
        return;
    }
    __classPrivateFieldGet(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request, true);
};