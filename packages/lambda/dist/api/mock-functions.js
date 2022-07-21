"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markFunctionAsIncompatible = exports.cleanFnStore = exports.getAllMockFunctions = exports.findFunction = exports.deleteMockFunction = exports.addFunction = exports.mockFunctionsStore = void 0;
exports.mockFunctionsStore = [];
const addFunction = (fn, region) => {
    exports.mockFunctionsStore.push({
        ...fn,
        region,
        version: fn.version,
    });
};
exports.addFunction = addFunction;
const deleteMockFunction = (name, region) => {
    exports.mockFunctionsStore = exports.mockFunctionsStore.filter((fn) => fn.functionName !== name && fn.region !== region);
};
exports.deleteMockFunction = deleteMockFunction;
const findFunction = (name, region) => {
    return exports.mockFunctionsStore.find((n) => n.functionName === name && region === n.region);
};
exports.findFunction = findFunction;
const getAllMockFunctions = (region, version) => {
    return exports.mockFunctionsStore.filter((f) => f.region === region && (version ? f.version === version : true));
};
exports.getAllMockFunctions = getAllMockFunctions;
const cleanFnStore = () => {
    exports.mockFunctionsStore = [];
};
exports.cleanFnStore = cleanFnStore;
const markFunctionAsIncompatible = (functionName) => {
    for (const fn of exports.mockFunctionsStore) {
        if (fn.functionName === functionName) {
            fn.version = '2021-06-23';
        }
    }
};
exports.markFunctionAsIncompatible = markFunctionAsIncompatible;
