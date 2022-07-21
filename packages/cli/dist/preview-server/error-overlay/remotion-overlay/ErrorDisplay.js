"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorDisplay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const map_error_to_react_stack_1 = require("../react-overlay/effects/map-error-to-react-stack");
const AskOnDiscord_1 = require("./AskOnDiscord");
const ErrorTitle_1 = require("./ErrorTitle");
const get_help_link_1 = require("./get-help-link");
const HelpLink_1 = require("./HelpLink");
const OpenInEditor_1 = require("./OpenInEditor");
const SearchGitHubIssues_1 = require("./SearchGitHubIssues");
const StackFrame_1 = require("./StackFrame");
const stack = {
    marginTop: 17,
    overflowX: 'scroll',
    marginBottom: '10vh',
};
const spacer = {
    width: 5,
    display: 'inline-block',
};
const ErrorDisplay = ({ display, keyboardShortcuts }) => {
    const highestLineNumber = Math.max(...display.stackFrames
        .map((s) => s.originalScriptCode)
        .flat(1)
        .map((s) => { var _a; return (_a = s === null || s === void 0 ? void 0 : s.lineNumber) !== null && _a !== void 0 ? _a : 0; }));
    const message = (0, react_1.useMemo)(() => {
        // Format compilation errors
        const location = (0, map_error_to_react_stack_1.getLocationFromBuildError)(display.error);
        if (!location) {
            return display.error.message;
        }
        return location.message
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '  ')
            .replace(/^error:/, '')
            .trim();
    }, [display.error]);
    const lineNumberWidth = String(highestLineNumber).length;
    const helpLink = (0, get_help_link_1.getHelpLink)(message);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(ErrorTitle_1.ErrorTitle, { symbolicating: false, name: display.error.name, message: message }), helpLink ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(HelpLink_1.HelpLink, { link: helpLink, canHaveKeyboardShortcuts: keyboardShortcuts }), (0, jsx_runtime_1.jsx)("div", { style: spacer })] })) : null, display.stackFrames.length > 0 && window.remotion_editorName ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(OpenInEditor_1.OpenInEditor, { canHaveKeyboardShortcuts: keyboardShortcuts, stack: display.stackFrames[0] }), (0, jsx_runtime_1.jsx)("div", { style: spacer })] })) : null, (0, jsx_runtime_1.jsx)(SearchGitHubIssues_1.SearchGithubIssues, { canHaveKeyboardShortcuts: keyboardShortcuts, message: display.error.message }), (0, jsx_runtime_1.jsx)("div", { style: spacer }), (0, jsx_runtime_1.jsx)(AskOnDiscord_1.AskOnDiscord, { canHaveKeyboardShortcuts: keyboardShortcuts }), (0, jsx_runtime_1.jsx)("div", { style: stack, children: display.stackFrames.map((s, i) => {
                    return ((0, jsx_runtime_1.jsx)(StackFrame_1.StackElement
                    // eslint-disable-next-line react/no-array-index-key
                    , { isFirst: i === 0, s: s, lineNumberWidth: lineNumberWidth, defaultFunctionName: '(anonymous function)' }, i));
                }) })] }));
};
exports.ErrorDisplay = ErrorDisplay;
