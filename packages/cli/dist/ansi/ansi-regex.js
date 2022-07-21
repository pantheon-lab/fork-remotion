"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAnsi = exports.ansiRegex = void 0;
const ansiRegex = () => {
    const pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
    ].join('|');
    return new RegExp(pattern, 'g');
};
exports.ansiRegex = ansiRegex;
const stripAnsi = (str) => {
    if (typeof str !== 'string') {
        throw new TypeError(`Expected a \`string\`, got \`${typeof str}\``);
    }
    return str.replace((0, exports.ansiRegex)(), '');
};
exports.stripAnsi = stripAnsi;
