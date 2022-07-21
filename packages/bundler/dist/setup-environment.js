"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remotion_1 = require("remotion");
remotion_1.Internals.setupEnvVariables();
remotion_1.Internals.setupPuppeteerTimeout();
remotion_1.Internals.CSSUtils.injectCSS(`
  .css-reset * {
    font-size: 16px;
    line-height: 1;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
  }
`);
