"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChromiumHeadlessMode = exports.getChromiumHeadlessMode = exports.setChromiumOpenGlRenderer = exports.getChromiumOpenGlRenderer = exports.setChromiumIgnoreCertificateErrors = exports.getIgnoreCertificateErrors = exports.setChromiumDisableWebSecurity = exports.getChromiumDisableWebSecurity = exports.DEFAULT_OPENGL_RENDERER = void 0;
const validate_opengl_renderer_1 = require("../validation/validate-opengl-renderer");
exports.DEFAULT_OPENGL_RENDERER = null;
let chromiumDisableWebSecurity = false;
let ignoreCertificateErrors = false;
let openGlRenderer = exports.DEFAULT_OPENGL_RENDERER;
let headlessMode = true;
const getChromiumDisableWebSecurity = () => chromiumDisableWebSecurity;
exports.getChromiumDisableWebSecurity = getChromiumDisableWebSecurity;
const setChromiumDisableWebSecurity = (should) => {
    chromiumDisableWebSecurity = should;
};
exports.setChromiumDisableWebSecurity = setChromiumDisableWebSecurity;
const getIgnoreCertificateErrors = () => ignoreCertificateErrors;
exports.getIgnoreCertificateErrors = getIgnoreCertificateErrors;
const setChromiumIgnoreCertificateErrors = (should) => {
    ignoreCertificateErrors = should;
};
exports.setChromiumIgnoreCertificateErrors = setChromiumIgnoreCertificateErrors;
const getChromiumOpenGlRenderer = () => openGlRenderer;
exports.getChromiumOpenGlRenderer = getChromiumOpenGlRenderer;
const setChromiumOpenGlRenderer = (renderer) => {
    (0, validate_opengl_renderer_1.validateOpenGlRenderer)(renderer);
    openGlRenderer = renderer;
};
exports.setChromiumOpenGlRenderer = setChromiumOpenGlRenderer;
const getChromiumHeadlessMode = () => headlessMode;
exports.getChromiumHeadlessMode = getChromiumHeadlessMode;
const setChromiumHeadlessMode = (should) => {
    headlessMode = should;
};
exports.setChromiumHeadlessMode = setChromiumHeadlessMode;
