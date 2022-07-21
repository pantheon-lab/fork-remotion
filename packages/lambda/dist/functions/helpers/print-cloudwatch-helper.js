"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCloudwatchHelper = void 0;
const printCloudwatchHelper = (type, data) => {
    const d = Object.keys(data).reduce((a, b) => {
        return [...a, `${b}=${data[b]}`];
    }, []);
    const msg = [`method=${type}`, ...d].join(',');
    console.log(msg);
};
exports.printCloudwatchHelper = printCloudwatchHelper;
