"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homepage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const bundle_mode_1 = require("../bundle-mode");
const renderEntry_1 = require("../renderEntry");
const container = {
    width: 800,
    margin: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'sans-serif',
    lineHeight: 1.5,
};
const pre = {
    display: 'block',
    backgroundColor: '#f7f7f7',
    whiteSpace: 'nowrap',
    padding: 16,
    fontFamily: 'monospace',
    borderRadius: 5,
    fontSize: 15,
    overflowX: 'auto',
};
const AvailableCompositions = () => {
    const [comps, setComps] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let timeout = null;
        const check = () => {
            if (window.ready === true) {
                setComps(window.getStaticCompositions());
            }
            else {
                timeout = setTimeout(check, 250);
            }
        };
        check();
        return () => {
            if (!timeout) {
                return;
            }
            clearTimeout(timeout);
        };
    }, []);
    const showComps = (0, react_1.useCallback)(() => {
        (0, renderEntry_1.setBundleModeAndUpdate)({ type: 'evaluation' });
    }, []);
    if ((0, bundle_mode_1.getBundleMode)().type !== 'evaluation') {
        return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: showComps, children: "Click here to see a list of available compositions." }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [comps === null ? (0, jsx_runtime_1.jsx)("p", { children: "Loading compositions..." }) : null, (0, jsx_runtime_1.jsx)("ul", { children: comps === null
                    ? null
                    : comps.map((c) => {
                        return (0, jsx_runtime_1.jsx)("li", { children: c.id }, c.id);
                    }) })] }));
};
const Homepage = () => {
    const url = window.location.origin + window.location.pathname;
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)("h1", { children: "Remotion Bundle" }), "This is a website which contains a bundled Remotion video. You can render videos based on this URL.", (0, jsx_runtime_1.jsx)("h2", { children: "Available compositions" }), (0, jsx_runtime_1.jsx)(AvailableCompositions, {}), (0, jsx_runtime_1.jsx)("h2", { children: "How to render" }), "Locally: ", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { style: pre, children: ["npx remotion render ", url, " ", '<comp-name> <output-location>'] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), "With Remotion Lambda: ", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { style: pre, children: ["npx remotion lambda render ", url, " ", '<comp-name>'] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { children: ["You can also render still images, and use the Node.JS APIs", ' ', (0, jsx_runtime_1.jsx)("code", { children: "getCompositions()" }), ", ", (0, jsx_runtime_1.jsx)("code", { children: "renderMedia()" }), ",", ' ', (0, jsx_runtime_1.jsx)("code", { children: "renderMediaOnLambda()" }), ", ", (0, jsx_runtime_1.jsx)("code", { children: "renderStill()" }), " and", ' ', (0, jsx_runtime_1.jsx)("code", { children: "renderStillOnLambda()" }), " with this URL."] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Visit", ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://remotion.dev/docs", target: "_blank", children: "remotion.dev/docs" }), ' ', "to read the documentation."] })] }));
};
exports.Homepage = Homepage;
