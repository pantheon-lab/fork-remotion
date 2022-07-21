"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickPreventionOnDoubleClick = void 0;
const react_1 = require("react");
const cancellable_promise_1 = require("./cancellable-promise");
const delay_1 = require("./delay");
const use_cancellable_promises_1 = require("./use-cancellable-promises");
const useClickPreventionOnDoubleClick = (onClick, onDoubleClick, doubleClickToFullscreen) => {
    const api = (0, use_cancellable_promises_1.useCancellablePromises)();
    const handleClick = (0, react_1.useCallback)(async (e) => {
        api.clearPendingPromises();
        const waitForClick = (0, cancellable_promise_1.cancellablePromise)((0, delay_1.delay)(200));
        api.appendPendingPromise(waitForClick);
        try {
            await waitForClick.promise;
            api.removePendingPromise(waitForClick);
            onClick(e);
        }
        catch (errorInfo) {
            const info = errorInfo;
            api.removePendingPromise(waitForClick);
            if (!info.isCanceled) {
                throw info.error;
            }
        }
    }, [api, onClick]);
    const handleDoubleClick = (0, react_1.useCallback)(() => {
        api.clearPendingPromises();
        onDoubleClick();
    }, [api, onDoubleClick]);
    const returnValue = (0, react_1.useMemo)(() => {
        if (!doubleClickToFullscreen) {
            return [onClick, onDoubleClick];
        }
        return [handleClick, handleDoubleClick];
    }, [
        doubleClickToFullscreen,
        handleClick,
        handleDoubleClick,
        onClick,
        onDoubleClick,
    ]);
    return returnValue;
};
exports.useClickPreventionOnDoubleClick = useClickPreventionOnDoubleClick;
