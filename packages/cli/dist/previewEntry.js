"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = __importDefault(require("react-dom/client"));
const remotion_1 = require("remotion");
require("../styles/styles.css");
const Editor_1 = require("./editor/components/Editor");
const event_source_1 = require("./event-source");
remotion_1.Internals.CSSUtils.injectCSS(remotion_1.Internals.CSSUtils.makeDefaultCSS(null, '#1f2428'));
const content = ((0, jsx_runtime_1.jsx)(remotion_1.Internals.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(Editor_1.Editor, {}) }));
if (client_1.default.createRoot) {
    client_1.default.createRoot(remotion_1.Internals.getPreviewDomElement()).render(content);
}
else {
    client_1.default.render((0, jsx_runtime_1.jsx)(remotion_1.Internals.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(Editor_1.Editor, {}) }), remotion_1.Internals.getPreviewDomElement());
}
(0, event_source_1.openEventSource)();
