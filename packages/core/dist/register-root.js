"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForRoot = exports.getRoot = exports.registerRoot = void 0;
let Root = null;
let listeners = [];
const registerRoot = (comp) => {
    if (Root) {
        throw new Error('registerRoot() was called more than once.');
    }
    Root = comp;
    listeners.forEach((l) => {
        l(comp);
    });
};
exports.registerRoot = registerRoot;
const getRoot = () => {
    return Root;
};
exports.getRoot = getRoot;
const waitForRoot = (fn) => {
    if (Root) {
        fn(Root);
        return () => undefined;
    }
    listeners.push(fn);
    return () => {
        listeners = listeners.filter((l) => l !== fn);
    };
};
exports.waitForRoot = waitForRoot;
