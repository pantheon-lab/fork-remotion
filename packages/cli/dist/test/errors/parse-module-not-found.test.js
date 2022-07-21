"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const map_error_to_react_stack_1 = require("../../preview-server/error-overlay/react-overlay/effects/map-error-to-react-stack");
const message = "Cannot find module 'does not exist'";
const stack = "Error: Cannot find module 'does not exist'\n    at webpackMissingModule (http://localhost:3000/bundle.js:1669:50)\n    at ./src/Video.tsx (http://localhost:3000/bundle.js:1669:139)\n    at Module.options.factory (http://localhost:3000/bundle.js:142235:31)\n    at __webpack_require__ (http://localhost:3000/bundle.js:141612:33)\n    at fn (http://localhost:3000/bundle.js:141890:21)\n    at ./src/index.tsx (http://localhost:3000/bundle.js:2114:64)\n    at Module.options.factory (http://localhost:3000/bundle.js:142235:31)\n    at __webpack_require__ (http://localhost:3000/bundle.js:141612:33)\n    at http://localhost:3000/bundle.js:142842:11\n    at http://localhost:3000/bundle.js:142846:12";
(0, vitest_1.test)('Parse error stack', () => {
    (0, vitest_1.expect)((0, map_error_to_react_stack_1.getLocationFromBuildError)({
        stack,
        message,
        name: 'Error',
    })).toEqual({
        fileName: './src/Video.tsx',
        lineNumber: 1,
        columnNumber: 0,
        message: "Error: Cannot find module 'does not exist'",
    });
});
