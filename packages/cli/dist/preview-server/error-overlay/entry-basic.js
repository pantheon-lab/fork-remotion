"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_overlay_1 = require("./react-overlay");
const remotion_overlay_1 = require("./remotion-overlay");
const Overlay_1 = require("./remotion-overlay/Overlay");
(0, react_overlay_1.startReportingRuntimeErrors)(() => {
    if (module.hot) {
        module.hot.addStatusHandler((status) => {
            var _a;
            if (status === 'apply') {
                if ((0, react_overlay_1.didUnmountReactApp)()) {
                    return window.location.reload();
                }
                (_a = Overlay_1.setErrorsRef.current) === null || _a === void 0 ? void 0 : _a.setErrors({
                    type: 'clear',
                });
            }
        });
    }
});
(0, remotion_overlay_1.mountRemotionOverlay)();
